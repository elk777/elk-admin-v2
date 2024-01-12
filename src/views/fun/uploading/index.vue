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
				<el-card shadow="hover" header="多文件上传" class="uploading-card">
					<el-upload
						ref="uploadmulti"
						class="upload-demo"
						name="files"
						:action="uploadMulti.url"
						:file-list="multiFileList"
						:auto-upload="false"
						:on-change="onChange"
						:on-remove="onRemove"
						:http-request="onUploadMulti"
						multiple
					>
						<el-button :loading="loadingMulti" slot="trigger" size="small" type="primary"
							>点击上传</el-button
						>
						<el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload"
							>上传到服务器</el-button
						>
					</el-upload>
				</el-card>
				<el-card shadow="hover" header="大文件切片上传" class="uploading-card">
					<el-upload 
                        class="upload-demo" 
                        drag 
                        action=""
                        :auto-upload="false"
                        :http-request="onUploadBig"
                    >
						<i class="el-icon-upload"></i>
						<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
					</el-upload>
				</el-card>
			</div>
		</el-card>
	</div>
</template>

<script>
import { uploadFormData, uploadBase64, uploadMulti } from "@/api/file";
import { getBase64 } from "@/libs/utils/tools";
export default {
	name: "Uploading",
	data() {
		return {
			loadingFormData: false,
			loadingBase64: false,
			loadingBig: false,
			loadingMulti: false,
			uploadFormData: {
				/* 上传地址 */
				url: process.env.VUE_APP_BASE_FILE_URL + process.env.VUE_APP_BASE_API + "/upload/fromdata",
				/* 上传文件类型 */
				fileType: ".pdf, .docx, .xlsx, .doc, .pptx",
				/* 上传文件大小 */
				fileSize: 10,
				/* 上传文件大小类型 */
				fileSizeType: "MB",
				// 设置上传的请求头部
				headers: { Authorization: "Bearer " + this.token },
			},
			uploadBase64: {
				/* 上传地址 */
				url: process.env.VUE_APP_BASE_FILE_URL + process.env.VUE_APP_BASE_API + "/upload/base64",
				/* 上传文件类型 */
				fileType: ".jpg, .png, .gif, .bmp, .jpeg",
				/* 上传文件大小 */
				fileSize: 10,
				/* 上传文件大小类型 */
				fileSizeType: "MB",
				// 设置上传的请求头部
				headers: { Authorization: "Bearer " + this.token },
			},
			imageUrl: "",
			file: null,
			uploadMulti: {
				/* 上传地址 */
				url: process.env.VUE_APP_BASE_FILE_URL + process.env.VUE_APP_BASE_API + "/upload/multifile",
				// 设置上传的请求头部
				headers: { Authorization: "Bearer " + this.token },
			},
			multiFileList: [],
			uploadBig: {
				/* 上传地址 */
				url: process.env.VUE_APP_BASE_FILE_URL + process.env.VUE_APP_BASE_API + "/upload",
				// 设置上传的请求头部
				headers: { Authorization: "Bearer " + this.token },
			},
		};
	},
	computed: {
		token() {
			return this.$store.getters.token;
		},
	},
	mounted() {},

	methods: {
		/* formdata 自定义上传 */
		onUploadFormData() {
            const file = this.file;
            let formdata = new FormData();
            formdata.append("file", file);
            uploadFormData(formdata).then( res => {
                this.$message({
                    type: res.code === 200 ? "success" : "error",
                    message: res.msg
                });
                this.onLoading("FormData", false);
            })
        },
		/* base64 自定义上传 */
		async onUploadBase64() {
			const file = this.file;
			const base64 = await getBase64(file);
			const upload = await uploadBase64({ base64, fileName: file.name });
			try {
				this.$message.success(upload.msg);
				this.imageUrl = process.env.VUE_APP_BASE_FILE_URL + upload.data.url;
			} catch (error) {
				this.$message.error(error);
			}
			this.onLoading("Base64", false);
		},
		/* 上传多文件 自定义 */
		onUploadMulti() {
			const fileList = this.multiFileList;
			let formdata = new FormData();
			fileList.map((item) => {
				formdata.append("files", item.raw);
			});
			this.onLoading("Multi", true);
			uploadMulti(formdata).then((res) => {
				this.$message({
                    type: res.code === 200 ? "success" : "error",
                    message: res.msg
                });
				this.multiFileList = [];
				this.$refs.uploadmulti.clearFiles();
				this.onLoading("Multi", false);
			});
		},
        /* 大文件上传 自定义 */
        onUploadBig() {
            
        },
		/* loading状态切换 */
		onLoading(type, status) {
			this["loading" + type] = status;
		},
        /* 文件上传前的验证 「fromdata上传、sbase64上传」 */
		onBeforeUpload(type, file) {
			this.file = file;
			const isLt2M = file.size / 1024 / 1024 < 10;
			if (!isLt2M) {
				this.$message.error("上传头像图片大小不能超过 10MB!");
				return isLt2M;
			}
			this.onLoading(type, true);
		},
        /* 多文件上传：手动点击按钮上传到服务器 */
		submitUpload() {
			let uploadmulti = this.$refs.uploadmulti;
			if (uploadmulti.fileList.length === 0) return this.$message.error("请先选择上传文件");
			this.onUploadMulti();
		},
        /* 文件状态变化时的事件 「多文件上传」 */
		onChange(file, fileList) {
			console.log("fielList", fileList);
			this.multiFileList = [...fileList];
		},
		/* 移除文件事件 「多文件上传」 */
		onRemove(file, fileList) {
			this.multiFileList = [...fileList];
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
}
</style>
