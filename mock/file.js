module.exports = [
	/* 文件流的下载 */
	{
		url: "vue-elk-admin/downloadData",
		type: "post",
		response: (config) => {
			const blob = new Blob(["hello world!"], { type: "text/plain" });
			return {
				code: 200,
				data: "1",
			};
		},
	},
	/* 文件地址的下载 */
	{
		url: "vue-elk-admin/downloadURL",
		type: "get",
		response: (config) => {
			return {
				code: 200,
				data: "1",
			};
		},
	},
	/* base64流下载 */
	{
		url: "vue-elk-admin/downloadBase64",
		type: "post",
		response: (config) => {
			return {
				code: 200,
				data: "1",
			};
		},
	},
];
