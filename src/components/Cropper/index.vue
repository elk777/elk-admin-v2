<template>
	<div class="vue-cropper-container">
		<el-row>
			<el-col :xs="24" :md="12" class="vue-cropper-style">
				<vueCropper
					ref="cropper"
					:img="option.img"
					:outputSize="option.size"
					:outputType="option.outputType"
					:autoCrop="option.autoCrop"
					:autoCropWidth="option.autoCropWidth"
					:autoCropHeight="option.autoCropHeight"
					:fixedBox="option.fixedBox"
					@realTime="realTime"
				></vueCropper>
			</el-col>
			<el-col :xs="24" :md="12">
				<div class="avatar-upload-preview" style="border-radius: 50%">
					<img :src="previews.url" :style="previews.img" />
				</div>
				<div class="avatar-upload-preview" style="transform: translate(200%, -50%)">
					<img :src="previews.url" :style="previews.img" />
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import stroe from "@/store";
import { VueCropper } from "vue-cropper";
export default {
	name: "Vuecropper",
	components: {
		VueCropper,
	},
	data() {
		return {
			option: {
				img: stroe.getters.avatar,
				size: 1, // 裁剪生成图片的质量
				outputType: "jpg", // 裁剪生成图片的格式
				info: true, // 裁剪框的大小信息
				autoCrop: true, //是否默认生成截图框
				autoCropWidth: 200, // 默认生成截图框宽度
				autoCropHeight: 200, // 默认生成截图框高度
				fixedBox: true, // 固定截图框大小 不允许改变
			},
			previews: {},
		};
	},

	mounted() {},

	methods: {
		/* 实时预览 */
		realTime(data) {
			this.previews = data;
		},
	},
};
</script>

<style lang="scss" scoped>
.vue-cropper-container {
	position: relative;
	.vue-cropper-style {
		width: 300px;
		height: 300px;
	}
}
</style>
