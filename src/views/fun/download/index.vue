<template>
	<div class="layout-container download-container">
		<el-card shadow="hover" header="文件下载实例">
			<div class="download-item">
				<el-alert type="success" title="根据文件流下载" :closable="false"></el-alert>
				<el-button
					style="width: 150px; margin-top: 15px; margin-right: 15px"
					type="primary"
					plain
					@click="downloadData"
					>文件流下载</el-button
				>
			</div>
			<div class="download-item">
				<el-alert type="success" title="根据文件地址下载" :closable="false"></el-alert>
				<el-button style="width: 150px; margin-top: 15px" type="primary" plain @click="downloadURL"
					>文件地址下载</el-button
				>
			</div>
			<div class="download-item">
				<el-alert type="success" title="根据base64流下载" :closable="false"></el-alert>
				<el-button style="width: 150px; margin-top: 15px" type="primary" plain @click="downloadBase64"
					>bese64流下载</el-button
				>
			</div>
		</el-card>
	</div>
</template>

<script>
import { downloadData, downloadURL, downloadBase64 } from "@/api/file";
export default {
	name: "Download",

	data() {
		return {};
	},

	mounted() {},

	methods: {
		/* 文件流下载 */
		downloadData() {
			downloadData().then((res) => {
				const blob = new Blob([res], { type: "application/vnd.ms-docx" });
				this.downloadBlob(blob, "filename.docx");
			});
		},
		/* 文件地址下载 */
		downloadURL() {
			downloadURL().then((res) => {
				console.log("文件地址", res);
				window.location.href = "http://localhost:5001" + res;
			});
		},
		/* base64流下载 */
		downloadBase64() {
			downloadBase64().then((res) => {
				const { type, data, name } = JSON.parse(res);
				let base64 = `data:image/${type};base64,${data}`;
				let blob = this.base64ToBlob(base64, type);
				this.downloadBlob(blob,name);
			});
		},
		/* blob文件下载 */
		downloadBlob(blob, fileName) {
			// 创建一个a标签，并设置其属性
			const link = document.createElement("a");
			link.href = window.URL.createObjectURL(blob);
			link.download = fileName; // 设置下载的文件名
			// 将a标签添加到页面中，并模拟点击下载文件
			document.body.appendChild(link);
			link.click();
			// 移除a标签
			document.body.removeChild(link);
		},
		/* base64对象转blob文件对象 */
		base64ToBlob(urlData, type) {
			let arr = urlData.split(",");
			let array = arr[0].match(/:(.*?);/);
			let mime = (array && array.length > 1 ? array[1] : type) || type;
			// 去掉url的头，并转化为byte
			let bytes = window.atob(arr[1]);
			// 处理异常,将ascii码小于0的转换为大于0
			let ab = new ArrayBuffer(bytes.length);
			// 生成视图（直接针对内存）：8位无符号整数，长度1个字节
			let ia = new Uint8Array(ab);
			for (let i = 0; i < bytes.length; i++) {
				ia[i] = bytes.charCodeAt(i);
			}
			return new Blob([ab], {
				type: mime,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.download-container {
	.download-item {
		display: flex;
		flex-direction: column;
		margin-bottom: 20px;
	}
	::v-deep .el-alert__title {
		font-size: 14px;
		line-height: 25px;
	}
}
</style>
