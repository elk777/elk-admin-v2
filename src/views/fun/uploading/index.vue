<template>
	<div class="layout-container uploading-container">
		<el-card shadow="hover" header="文件上传">
			<div class="uploading-container-card">
				<el-card shadow="hover" header="FormData上传" class="uploading-card">
					<el-upload
						drag
						v-loading="loadingFormData"
						:accept="uploadFormData.fileType"
						action=""
						:show-file-list="false"
						:http-request="onUploadFormData"
						:before-upload="
							(file) => {
								return onBeforeUpload('FormData', file);
							}
						"
					>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">只能上传pdf/docx/xlsx/doc/pptx文件,且不超过10MB</div>
					</el-upload>
				</el-card>
				<el-card shadow="hover" header="base64上传 只适用于图片" class="uploading-card">
					<el-upload
						class="avatar-uploader"
						v-loading="loadingBase64"
						:accept="uploadBase64.fileType"
						action=""
						:show-file-list="false"
						:http-request="onUploadBase64"
						:before-upload="
							(file) => {
								return onBeforeUpload('Base64', file);
							}
						"
					>
						<img v-if="imageUrl" :src="imageUrl" class="avatar" />
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
						<div class="el-upload__tip" slot="tip">只能上传jpg/png/jpeg/gif/bmp文件，且不超过10MB</div>
					</el-upload>
				</el-card>
				<el-card shadow="hover" header="图片缩列图上传「前端处理生成文件名」" class="uploading-card">
					<el-upload
						ref="uploadpicture"
						class="upload-demo"
						action=""
						:file-list="pictureFileList"
						list-type="picture"
						:accept="uploadBase64.fileType"
						:auto-upload="false"
						:on-change="
							(file, fileList) => {
								return onChange(file, fileList, 'pictureFileList');
							}
						"
						:on-remove="
							(file, fileList) => {
								return onRemove(file, fileList, 'pictureFileList');
							}
						"
						:http-request="onUploadPicture"
						multiple
					>
						<el-button :disabled="loadingPicture" slot="trigger" size="small" type="primary"
							>点击上传</el-button
						>
						<el-button
							style="margin-left: 10px"
							size="small"
							type="success"
							:loading="loadingPicture"
							@click="submitUpload('uploadpicture')"
							>上传到服务器</el-button
						>
					</el-upload>
				</el-card>
				<el-card shadow="hover" header="单文件上传及进度展示" class="uploading-card">
					<el-upload
						v-if="!loadingSchedule"
						drag
						:accept="uploadFormData.fileType"
						action=""
						:show-file-list="false"
						:http-request="onUploadSchedule"
						:before-upload="
							(file) => {
								return onBeforeUpload('Schedule', file);
							}
						"
					>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">只能上传pdf/docx/xlsx/doc/pptx文件,且不超过10MB</div>
					</el-upload>
					<div v-else class="el-upload_progress">
						<el-progress type="circle" :percentage="percentage"></el-progress>
						<div class="progress_text">正在上传中...</div>
					</div>
				</el-card>
				<!-- 多文件上传及进度展示 -->
				<el-card shadow="hover" class="uploading-card">
					<template #header>
						<div style="display: flex; justify-content: space-around">
							<span>多文件上传及进度展示</span>
							<el-switch v-model="showProgress" active-text="开启展示" inactive-text="关闭展示">
							</el-switch>
						</div>
					</template>
					<el-upload
						ref="uploadmulti"
						class="upload-demo"
						name="files"
						action=" "
						:file-list="multiFileList"
						:auto-upload="false"
						:on-change="
							(file, fileList) => {
								return onChange(file, fileList, 'multiFileList');
							}
						"
						:on-remove="
							(file, fileList) => {
								return onRemove(file, fileList, 'multiFileList');
							}
						"
						:http-request="onUploadMulti"
						multiple
					>
						<el-button :disabled="loadingMulti" slot="trigger" size="small" type="primary"
							>点击上传</el-button
						>
						<el-button
							:loading="loadingMulti"
							style="margin-left: 10px"
							size="small"
							type="success"
							@click="submitUpload('uploadmulti')"
							>上传到服务器</el-button
						>
					</el-upload>
				</el-card>
				<el-card shadow="hover" header="大文件切片上传" class="uploading-card">
					<!-- :auto-upload="false" -->
					<el-upload
						class="upload-demo"
						v-if="!loadingChunk"
						drag
						action=""
						:show-file-list="false"
						:http-request="onUploadChunk"
						:before-upload="
							(file) => {
								return onBeforeUpload('Chunk', file);
							}
						"
					>
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
						<div class="el-upload__tip" slot="tip">使用大文件上传，当前上传的文件不能小于4MB</div>
					</el-upload>
					<div v-else class="el-upload_progress">
						<el-progress type="circle" :percentage="percentageChunk"></el-progress>
						<div class="progress_text">正在上传中...</div>
					</div>
				</el-card>
			</div>
		</el-card>
	</div>
</template>

<script>
import { uploadFormData, uploadBase64, uploadChunk, uploadMerge } from "@/api/file";
import { getBase64, getFileMD5 } from "@/libs/utils/tools";
import { getSuffix, fileSection } from "./private";
export default {
	name: "Uploading",
	data() {
		return {
			/* 按钮状态集合 */
			loadingFormData: false,
			loadingBase64: false,
			loadingPicture: false,
			loadingSchedule: false,
			loadingChunk: false,
			loadingMulti: false,
			percentage: 0, // 单文件上传进度值
			percentageChunk: 0, // 大文件切片上传进度值
			showProgress: false, // 多文件是否开启进度展示
			uploadFormData: {
				/* 上传地址 */
				url: process.env.VUE_APP_BASE_FILE_URL + process.env.VUE_APP_BASE_API + "/upload/fromdata",
				/* 上传文件类型 */
				fileType: ".pdf, .docx, .xlsx, .doc, .pptx",
				// 设置上传的请求头部
				headers: { Authorization: "Bearer " + this.token },
			},
			uploadBase64: {
				/* 上传地址 */
				url: process.env.VUE_APP_BASE_FILE_URL + process.env.VUE_APP_BASE_API + "/upload/base64",
				/* 上传文件类型 */
				fileType: ".jpg, .png, .gif, .bmp, .jpeg",
				// 设置上传的请求头部
				headers: { Authorization: "Bearer " + this.token },
			},
			imageUrl: "", //base64上传图片路径
			file: null, //文件对象
			pictureFileList: [], // 缩列图文件列表
			multiFileList: [], // 多文件上传列表
		};
	},
	computed: {
		token() {
			return this.$store.getters.token;
		},
	},
	methods: {
		/* formdata 自定义上传 */
		onUploadFormData() {
			const file = this.file;
			let formdata = new FormData();
			formdata.append("file", file);
			uploadFormData(formdata)
				.then((res) => {
					this.$message({
						type: res.code === 200 ? "success" : "error",
						message: res.msg,
					});
				})
				.finally(() => {
					this.onLoading("FormData", false);
				});
		},
		/* base64 自定义上传 */
		async onUploadBase64() {
			const file = this.file;
			try {
				const base64 = await getBase64(file);
				const upload = await uploadBase64({ base64: encodeURIComponent(base64), fileName: file.name });
				if (upload.code === 200) {
					this.$message.success(upload.msg);
					this.imageUrl = process.env.VUE_APP_BASE_FILE_URL + upload.data.url;
					return;
				}
			} finally {
				this.onLoading("Base64", false);
			}
		},
		/* 文件缩列图「自行处理文件名」 自定义 */
		async onUploadPicture() {
			const fileList = this.pictureFileList;
			const files = fileList.map((item) => item.raw);
			let formdata = new FormData();
			let hashs = [];
			this.onLoading("Picture", true);
			for (let i = 0; i < files.length; i++) {
				let item = files[i];
				const md5 = await getFileMD5(item);
				const suffix = getSuffix(item.name);
				const fileName = `${md5}.${suffix}`;
				formdata.append("files", item);
				hashs.push(fileName);
				formdata.append("fileNames", fileName);
			}
			try {
				const upload = await uploadFormData(formdata, { hashs });
				if (upload.code === 200) {
					this.$message.success(upload.msg);
					this.pictureFileList = [];
					this.$refs.uploadpicture.clearFiles();
				}
			} catch (error) {
				// this.$message.error(error);
			} finally {
				this.onLoading("Picture", false);
			}
		},
		/* 单文件上传进度展示 自定义 */
		onUploadSchedule() {
			const file = this.file;
			let formdata = new FormData();
			formdata.append("file", file);
			this.percentage = 0;
			uploadFormData(formdata, {
				callback: ({ loaded, total }) => {
					this.percentage = Math.floor((loaded / total) * 100);
				},
			})
				.then((res) => {
					this.$message({
						type: res.code === 200 ? "success" : "error",
						message: res.msg,
					});
				})
				.catch((err) => {})
				.finally(() => {
					this.onLoading("Schedule", false);
				});
		},
		/* 多文件上传按钮 处理 */
		onUploadMulti() {
			const fileList = this.multiFileList;
			this.onLoading("Multi", true);
			this.showProgress ? this.onUploadMultiProgress(fileList) : this.onUploadMultis(fileList);
		},
		/* 多文件上传 自定义 */
		onUploadMultis(fileList) {
			let formdata = new FormData();
			fileList.map((item) => {
				formdata.append("files", item.raw);
			});
			uploadFormData(formdata)
				.then((res) => {
					if (res.code === 200) {
						this.$message({
							type: "success",
							message: res.msg,
						});
						return;
					}
					throw res.msg;
				})
				.catch((err) => {
					this.$message({
						type: "error",
						message: err,
					});
				})
				.finally(() => {
					this.onLoading("Multi", false);
					this.multiFileList = [];
					this.$refs.uploadmulti.clearFiles();
				});
		},
		/* 多文件上传展示进度 自定义 */
		onUploadMultiProgress(fileList) {
			const _files = fileList.map((item) => {
				let formdata = new FormData();
				// 手动修改将el-upload组件upload-list中的el-progress显示出来 进度为0开始
				item.status = "uploading";
				item.percentage = 0;
				formdata.append("file", item.raw);
				formdata.append("fileName", item.name);
				return uploadFormData(formdata, {
					callback: ({ loaded, total }) => {
						item.percentage = Math.floor((loaded / total) * 100);
					},
				}).then((res) => {
					if (res.code === 200) {
						return res;
					}
					return Promise.reject();
				});
			});
			// 用promise.all接住所有请求，做统一的处理
			Promise.all(_files)
				.then((res) => {
					if (res.length === fileList.length) {
						this.$message({
							type: "success",
							message: "全部上传成功",
						});
					}
				})
				.catch((err) => {
					this.$message({
						type: "error",
						message: "上传失败，请稍后再试！！",
					});
				})
				.finally(() => {
					this.onLoading("Multi", false);
					this.multiFileList = [];
					this.$refs.uploadmulti.clearFiles();
				});
		},
		/* 切片上传成功 */
		complete(index, count, hash) {
			// 管理进度条
			this.percentageChunk = Math.ceil((index / count) * 100);
			// 当所有切片上传成功，通知服务器合并切片
			if (index === count) {
				uploadMerge({ hash, count })
					.then((res) => {
						if (res.code === 200) {
							this.$message.success(res.msg);
						}
						this.onLoading("Chunk", false);
					})
					.catch((err) => {
						console.log("合并错误", err);
						this.onLoading("Chunk", false);
					});
			}
		},
		/* 大文件切片上传 自定义 */
		async onUploadChunk() {
			const file = this.file;
			console.log("file", file);
			let index = 0;
			this.percentageChunk = 0;
			let HASH = await getFileMD5(file);
			let chunks = fileSection(file, HASH);
			chunks.forEach((item) => {
				item.file.filename = item.fileName;
				let formdata = new FormData();
				formdata.append("file", item.file);
				formdata.append("fileName", item.fileName);
				formdata.append("count", item.count);
				uploadChunk(formdata, { fileName: item.fileName })
					.then((res) => {
						if (res.code === 200) {
							index++;
							this.complete(index, chunks.length, HASH);
							return;
						}
					})
					.catch((err) => {
						this.onLoading("Chunk", false);
					});
			});
		},
		/* loading状态切换 */
		onLoading(type, status) {
			this["loading" + type] = status;
		},
		/* 文件上传前的验证 「fromdata上传、sbase64上传」 */
		onBeforeUpload(type, file) {
			this.file = file;
			const isLt10M = file.size / 1024 / 1024 < 10,
				isLt4M = file.size / 1024 / 1024 > 4;
			if (type == "Chunk") {
				this.$message.error("上传文件大小不能小于 4MB!");
				return isLt4M;
			}
			if (!isLt10M) {
				this.$message.error("上传头像图片大小不能超过 10MB!");
				return isLt10M;
			}
			this.onLoading(type, true);
		},
		/* 多文件上传：手动点击按钮上传到服务器 */
		submitUpload(type) {
			let ref = this.$refs[type];
			if (ref.fileList.length === 0) return this.$message.error("请先选择上传文件");
			type === "uploadmulti" ? this.onUploadMulti() : this.onUploadPicture();
		},
		/* 文件状态变化时的事件 「多文件上传」 */
		onChange(file, fileList, type) {
			this[type] = [...fileList];
		},
		/* 移除文件事件 「多文件上传」 */
		onRemove(file, fileList, type) {
			this[type] = [...fileList];
		},
	},
};
</script>

<style lang="scss" scoped>
.uploading-container {
	overflow: auto;
	.uploading-container-card {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	.avatar-uploader ::v-deep .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader ::v-deep .el-upload:hover {
		border-color: #409eff;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}
	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
}
.uploading-card {
	width: 480px;
	height: 350px;
	margin-bottom: 30px;
	overflow: auto;
	.el-upload_progress {
		.progress_text {
			margin-top: 15px;
		}
	}
}
</style>
