import request from "@/libs/utils/request";

const apis = {
	downloadData: "/downloadData",
	downloadURL: "/downloadURL",
	downloadBase64: "/downloadBase64",
	uploadFormData: "/upload/formdata",
	uploadBase64: "/upload/base64",
	uploadMulti: "/upload/multifile",
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

/* fromdata 自定义文件上传 */
const uploadFormData = (data) => {
	console.log("fromdata上传", data);
	return request({
		url: apis.uploadFormData,
		method: "post",
		baseUrl: "file",
		data,
	});
};
/* base64 自定义文件上传 */
const uploadBase64 = (data) => {
	console.log("base64上传", data);
	return request({
		url: apis.uploadBase64,
		method: "post",
		baseUrl: "file",
		data,
	});
};
/* 多文件 自定义上传 */
const uploadMulti = (data) => {
	return request({
		url: apis.uploadMulti,
		method: "post",
		baseUrl: "file",
		data,
	});
};

export { downloadData, downloadURL, downloadBase64, uploadFormData, uploadBase64, uploadMulti };
