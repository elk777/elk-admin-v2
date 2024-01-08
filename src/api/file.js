import request from "@/libs/utils/request";

const apis = {
	downloadData: "/downloadData",
	downloadURL: "/downloadURL",
	downloadBase64: "/downloadBase64",
};
/* 文件流下载 */
const downloadData = (data) => {
	return request({
		url: apis.downloadData,
		method: "post",
		responseType: "blob",
		baseUrl: 'file',
		data,
	});
};
/* 文件地址下载 */
const downloadURL = (param) => {
	return request({
		url: apis.downloadURL,
		method: "get",
		baseUrl: 'file',
		param,
	});
};
/* base64流下载 */
const downloadBase64 = (data) => {
	return request({
		url: apis.downloadBase64,
		method: "post",
		responseType: "blob",
		baseUrl: 'file',
		data,
	});
};


export { downloadData, downloadURL, downloadBase64 };
