/*
 * @Author: elk 1185725133@qq.com
 * @Date: 2024-01-06 11:24:14
 * @LastEditors: elk 1185725133@qq.com
 * @LastEditTime: 2024-01-25 09:45:16
 * @FilePath: /vue2_project/src/api/file.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from "@/libs/utils/request";

const apis = {
	downloadData: "/downloadData",
	downloadURL: "/downloadURL",
	downloadBase64: "/downloadBase64",

	uploadFormData: "/upload/single",
	uploadBase64: "/upload/single_base64",
	uploadChunk: "/upload/chunk",
	uploadMerge: "/upload/merge",
};
/* 文件流下载 */
const downloadData = (data) => {
	return request({
		url: apis.downloadData,
		method: "post",
		responseType: "blob",
		baseUrl: "file",
		data,
	});
};
/* 文件地址下载 */
const downloadURL = (param) => {
	return request({
		url: apis.downloadURL,
		method: "get",
		baseUrl: "file",
		param,
	});
};
/* base64流下载 */
const downloadBase64 = (data) => {
	return request({
		url: apis.downloadBase64,
		method: "post",
		responseType: "blob",
		baseUrl: "file",
		data,
	});
};

/* fromdata 单文件上传 */
const uploadFormData = (data, { callback } = {}) => {
	return request({
		url: apis.uploadFormData,/*  */
		method: "post",
		baseUrl: "file",
		headers: {
			"Content-Type": "multipart/form-data",
		},
		data,
		onUploadProgress: (progressEvent) => {
			// 获取进度参数
			if (callback) {
				callback({ loaded: progressEvent.loaded, total: progressEvent.total });
			}
		},
	});
};
/* base64 文件上传 */
const uploadBase64 = (data) => {
	console.log("base64上传", data);
	return request({
		url: apis.uploadBase64,
		method: "post",
		baseUrl: "file",
		data,
	});
};
/* 大文件切片 自定义上传 */
const uploadChunk = (data, { fileName }) => {
	return request({
		url: apis.uploadChunk,
		method: "post",
		baseUrl: "file",
		data,
		headers: {
			"Content-MD5": fileName,
			"Content-fileType": "chunk",
			"Content-Type": "multipart/form-data",
		},
	});
};
/* 大文件合并 自定义上传 */
const uploadMerge = (data) => {
	return request({
		url: apis.uploadMerge,
		method: "post",
		baseUrl: "file",
		data
	});
};

export { downloadData, downloadURL, downloadBase64, uploadFormData, uploadBase64, uploadChunk, uploadMerge };
