import { fileSection, filterChunks, calPercentage, calTimeSliceHash } from "./private";
import { uploadChunk, uploadMerge, uploadAlready } from "@/api/file";
export const Mixins = {
	data() {
		return {
			loadingChunk: false,
			percentageChunks: [], // 大文件切片上传进度列表
			alreadyChunks: [], // 大文件已经上传切片列表
			hash: null,
		};
	},
	computed: {
		/* 大文件切片上传进度值 */
		percentageChunk: function () {
			const { size } = this.file;
			let percentage = 0;
			let alreadyChunks = this.alreadyChunks;
			if (this.percentageChunks.length > 0) {
				// 判断是否已经上传过切片
				alreadyChunks.length > 0 && (percentage += calPercentage(alreadyChunks, false));
				percentage += calPercentage(this.percentageChunks, true);

				return Math.floor((percentage / size) * 100);
			}
			return percentage;
		},
	},
	methods: {
		/* 切片上传成功 */
		complete(count) {
			let hash = this.hash;
			// 当所有切片上传成功，通知服务器合并切片
			uploadMerge({ hash, count })
				.then((res) => {
					if (res.code === 200) {
						this.$message.success(res.msg);
						this.percentageChunks = [];
					}
				})
				.catch((err) => {
					console.log("合并错误", err);
				}).finally( () => {
					this.onLoading("Chunk", false);
                })
		},
		/* 大文件切片上传 自定义 */
		async onUploadChunk() {
			const file = this.file;
			// let index = 0;
			try {
				let HASH = await calTimeSliceHash(file),
					chunks = fileSection(file,undefined,HASH),
					alreadyData = await uploadAlready({ hash: HASH }),
					alreadys = alreadyData.data.chunkList,
					filterChunk = filterChunks(alreadys, chunks, true);
				this.hash = HASH;
				// 保存已上传切片，回显上传进度
				this.alreadyChunks = filterChunks(alreadys, chunks, false);
				const chunkAll = filterChunk.map((item, idx) => {
					let formdata = new FormData();
					formdata.append("file", item.file);
					formdata.append("fileName", item.fileName);
					formdata.append("count", item.count);
					formdata.append("hash", HASH);
					return { formdata, idx };
				});
				await this.concurrenceRequest(chunkAll, 3);
			} catch (error) {
				this.onLoading("Chunk", false);
			}
		},

		/**
		 * @description: 并发控制切片请求「任务队列」
		 * @param {Array} chunkAll: 切片formdata集合
		 * @param {number} max: 最大并发数量
		 * @return {*}
		 */
		concurrenceRequest(chunkAll, max = 3) {
			return new Promise((resolve, reject) => {
				let idx = 0, // 下一个请求的下标
					len = chunkAll.length, //集合长度
					count = 0; // 已完成任务数量
				if (len === 0) {
					resolve([]);
					return [];
				}
				if (chunkAll.length < max) {
					max = chunkAll.length;
				}
				// 任务队列
				const taskQueue = async () => {
					// 任务执行
					while (idx < len && max > 0) {
						max--; // 占用通道
                        let formdata = chunkAll[idx].formdata;
                        let index = chunkAll[idx].idx;
                        idx++;
						// 发送请求
						uploadChunk(formdata, {
							callback: ({ loaded, total }) => {
								this.$nextTick(() => {
									this.$set(this.percentageChunks, index, {
										loaded: loaded,
										size: total,
									});
								});
							},
						}).then(() => {
                            max++; // 释放通道
                            count++;
							if (count === len) {
								this.complete(chunkAll.length);
                                resolve();
							} else {
								taskQueue();
							}
						})
					}
				};
				taskQueue();
			});
		},
	},
};
