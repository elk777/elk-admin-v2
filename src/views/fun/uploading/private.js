/*
 * @Author: elk 1185725133@qq.com
 * @Date: 2024-01-19 16:15:39
 * @LastEditors: elk 1185725133@qq.com
 * @LastEditTime: 2024-01-25 09:51:38
 * @FilePath: /vue2_project/src/views/fun/uploading/index.js
 * @Description: 文件上传组件「uploading」 私有方法
 */

/**
 * @description: 截取文件后缀名 「 xxx.png  -> png 」
 * @param {*} name  文件全名
 * @return {*}
 */
const getSuffix = (name) => {
	return /\.([a-zA-Z0-9]+)$/.exec(name)[1];
};

/**
 * @description:
 * 	大文件切片「根据文件实际大小而定」
    固定大小: 2MB  1024 * 1024 * 2
    最大数量: 100
    先按固定大小去拆，当拆出来的数量超过最大数量，则按最大数量去拆各个大小
    利用file对象的slice方法进行切片
    * @param {*} file: 文件对象
    * @param {*} hash: 文件hash值
    * @return {*} chunks: 文件切片集合
*/
const fileSection = (file, hash) => {
	let { size, name } = file,
		maxCount = 100,
		maxSize = 1024 * 1024 * 2,
		sectionCount = Math.ceil(size / maxSize),
		sectionSize = 0,
		index = 0,
		chunks = [];
	if (sectionCount > maxCount) {
		sectionCount = maxCount;
		sectionSize = size / maxCount;
	} else {
		sectionSize = maxSize;
	}
	while (index < sectionCount) {
		chunks.push({
			file: file.slice(maxSize * index, maxSize * (index + 1)),
			fileName: `${hash}_${index + 1}.${getSuffix(name)}`,
			count: index + 1,
		});
		index++;
	}
	return chunks;
};
export { getSuffix, fileSection };
