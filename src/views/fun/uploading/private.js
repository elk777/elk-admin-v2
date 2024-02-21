/*
 * @Author: elk 1185725133@qq.com
 * @Date: 2024-01-19 16:15:39
 * @LastEditors: elk LYF_elk@163.com@qq.com
 * @LastEditTime: 2024-02-19 09:02:50
 * @FilePath: /vue2_project/src/views/fun/uploading/index.js
 * @Description: 文件上传组件「uploading」 私有方法
 */

import SparkMD5 from "spark-md5";

/**
 * @description: 截取文件后缀名 「 xxx.png  -> png 」
 * @param {string} name  文件全名
 * @return {*}
 */
const getSuffix = (name) => {
	return /\.([a-zA-Z0-9]+)$/.exec(name)[1];
};

/**
 * @description: 计算进度条的进度值
 * @param {Array} chunks 切片集合
 * @param {boolean} type 计算取值类型
 * @return {*}
 */
const calPercentage = (chunks, type) => {
	let loaded = chunks
		.map((item) => {
			return type ? item.loaded : item.file.size;
		})
		.reduce((pre = 0, cur) => {
			return pre + cur;
		});
	return loaded;
};

/**
 * @description: 过滤切片集合
 * @param {Array} alreadys: 已经上传的切片集合
 * @param {Array} chunks: 切片的总集合
 * @param {Boolean} type: true：过滤相同 false: 过滤不同
 * @return {*}
 */
const filterChunks = (alreadys, chunks, type) => {
	return chunks.filter((item) => (type ? !alreadys.includes(item.fileName) : alreadys.includes(item.fileName)));
};

/**
 * @description: 生成切片列表
 * 	大文件切片「根据文件实际大小而定」
    默认大小: 2MB  1024 * 1024 * 2
    利用file对象的slice方法进行切片
    * @param {Blob} file: 文件对象
    * @param {number} size: 切片大小
    * @return {*} chunks: 文件切片集合
*/
const fileSection = (file, size = 1024 * 1024 * 2, hash) => {
	let index = 0,
		count = 0,
		chunks = [];
	const name = getSuffix(file.name);
	while (count < file.size) {
		if (count + size > file.size) {
			chunks.push({
				count: index + 1,
				file: file.slice(count, file.size),
				fileName: hash && `${hash}_${index + 1}.${name}`,
			});
			break;
		}
		chunks.push({
			file: file.slice(count, count + size),
			count: index + 1,
			fileName: hash && `${hash}_${index + 1}.${name}`,
		});
		count += size;
		index++;
	}
	return chunks;
};

/**
 * @description: 时间切片「requestIdleCallback」：管理hash值的生成
 * @param {Blob} file: 切片集合
 * @return {*}
 */
const calTimeSliceHash = (file) => {
	return new Promise((resolve, reject) => {
		const spark = new SparkMD5.ArrayBuffer();
		let count = 0;
		let chunks = fileSection(file);
		// 追加切片
		const appendToSpark = (chunk) => {
			return new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsArrayBuffer(chunk);
				// 成功
				reader.onload = (e) => {
					spark.append(e.target.result);
					resolve();
				};
				// 失败
				reader.onerror = (error) => {
					reject(error);
				};
			});
		};
		const workLoop = async (IdleDeadline) => {
			// 有任务，并且当前帧还没结束
			while (count < chunks.length && IdleDeadline.timeRemaining() > 1) {
				await extractChunkSlice(chunks[count].file, count, chunks.length - 1);
				count++;
				// 当执行结束之后，生成hash值
				if (count >= chunks.length) {
					resolve(spark.end());
				}
			}
			window.requestIdleCallback(workLoop);
		};
		/* 抽取切片 */
		const extractChunkSlice = (chunk, index, maxIndex) => {
			return new Promise(async (resolve, reject) => {
				if (index === 0 || maxIndex === index) {
					await appendToSpark(chunk);
					resolve();
				} else {
					let CHUNK_OFFSET = 2,
						size = chunk.size,
						offsetChuks = [];
					offsetChuks.push(chunk.slice(0, CHUNK_OFFSET));
					offsetChuks.push(chunk.slice(size - CHUNK_OFFSET, size));
					await appendToSpark(...offsetChuks);
					resolve();
				}
			});
		};

		window.requestIdleCallback(workLoop);
	});
};

export { getSuffix, fileSection, filterChunks, calPercentage, calTimeSliceHash };
