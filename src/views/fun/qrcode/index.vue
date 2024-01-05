<template>
	<div class="layout-container qrcode-container">
		<el-card shadow="hover" header="qrcodejs2二维码生成" style="height: 500px">
			<div class="qrcode-item">
				<el-card shadow="hover">
					<div style="margin-bottom: 10px; font-weight: 600">基础用法</div>
					<div id="qrcode" ref="qrcode"></div>
				</el-card>
			</div>
			<div class="qrcode-item">
				<el-card shadow="hover">
					<div style="margin-bottom: 10px; font-weight: 600">携带Logo</div>
					<div id="qrcodeLogo" ref="qrcodeLogo"></div>
				</el-card>
			</div>
		</el-card>
	</div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
	name: "Qrcode",

	data() {
		return {};
	},

	mounted() {
		this.createQrCode();
		this.createLogoQrCode();
	},

	methods: {
		createQrCode() {
			const qrcode = new QRCode(this.$refs.qrcode, {
				text: "https://github.com/elk777/vue2-element-admin",
				width: 128,
				height: 128,
				colorDark: "#000000",
				colorLight: "#ffffff",
				correctLevel: QRCode.CorrectLevel.H,
			});
		},
		createLogoQrCode() {
			this.$nextTick(() => {
				const qrcode = new QRCode(this.$refs.qrcodeLogo, {
					text: "https://github.com/elk777/vue2-element-admin",
					width: 128,
					height: 128,
					colorDark: "#000000",
					colorLight: "#ffffff",
					correctLevel: QRCode.CorrectLevel.H,
				});
				let logo = new Image();
				logo.crossOrigin = "Anonymous";
				logo.src = require("@/assets/icons/logo.png");
				logo.onload = () => {
					let qrImg = qrcode._el.getElementsByTagName("img")[0]; // 获取二维码
					let canvas = qrcode._el.getElementsByTagName("canvas")[0]; // 获取canvas
					let ctx = canvas.getContext("2d");
					ctx.drawImage(logo, 128 * 0.5 - 22, 128 * 0.5 - 22, 44, 44); // 写入logo
					qrImg.src = canvas.toDataURL();
				};
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.qrcode-container {
	::v-deep .el-card__header + .el-card__body {
		display: flex;
	}
	.qrcode-item {
		width: 200px;
		height: 200px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
}
</style>
