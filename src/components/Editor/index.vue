<template>
	<div style="border: 1px solid #ccc">
		<!-- 工具栏 -->
		<Toolbar style="border-bottom: 1px solid #ccc" :editor="editor" :defaultConfig="toolbarConfig" :mode="mode" />
		<!-- 编辑器 -->
		<Editor
			style="height: 350px; overflow-y: hidden; text-align: left"
			v-model="html"
			:defaultConfig="editorConfig"
			:mode="mode"
			@onCreated="onCreated"
		/>
	</div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
export default {
	name: "WangEditor",
	components: {
		Toolbar,
		Editor,
	},
	data() {
		return {
			editor: null, // 实例
			html: "<p>hello</p>", // 初始内容
			// 工具类配置
			toolbarConfig: {},
			// 编辑器配置
			editorConfig: {
				placeholder: "请输入内容...",
				// 菜单配置
				MENU_CONF: {
					/* 上传图片配置 */
					uploadImage: {
						// 后端上传地址： 必填
						server: "xxx",
						// 后端接口参数名称
						fieldName: "file",
						// 单个文件最大体积限制, 默认 2M
						maxFileSize: 1 * 1024 * 1024,
						// 最多可上传几个文件 默认 100
						maxNumberOfFiles: 10,
						// 选择文件时的类型限制 ,不想限制： []
						allowedFileTypes: [],
						// 超时时间
						timeout: 15 * 1000,
						// 自定义上传参数
						// meta: {
						// 	token: "xxx",
						// 	xxx: 'xxx'
						// },
						// 是否将meta拼接到url 默认 false
						// metaWithUrl: false,
						// 自定义headers
						// headers: {
						// 	Accept: "text/x-json",
						// 	otherKey: "xxx",
						// },
						// 跨域是否传递 cookie ，默认为 false
						// withCredentials: false,
					},
					/* 上传视频配置 */
					uploadVideo: {
						// 后端上传地址，必填
						server: "xxx",
						// 后端接口参数名称
						fieldName: "file",
						// 文件大小限制，默认10M
						maxFileSize: 5 * 1024 * 1024,
						// 最多可上传几个文件，默认为 5
						maxNumberOfFiles: 3,
						// 选择文件时的类型限制，默认为 ['video/*'] 。如不想限制，则设置为 []
						allowedFileTypes: [],
						// 15 秒，超时时间，默认为 30 秒
						timeout: 15 * 1000,
						// 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
						// meta: {
						//     token: 'xxx',
						//     xxx: 'xxx'
						// },
						// 将 meta 拼接到 url 参数中，默认 false
						// metaWithUrl: false,
						// 自定义增加 http  header
						// headers: {
						//     Accept: 'text/x-json',
						//     otherKey: 'xxx'
						// },
						// 跨域是否传递 cookie ，默认为 false
						// withCredentials: false,
					},
				},
			},
			mode: "default", // or 'simple'   // 模式
		};
	},

	mounted() {
		// 模拟 ajax 请求，异步渲染编辑器
		setTimeout(() => {
			this.html = "<p>模拟 Ajax 异步设置内容 HTML</p>";
		}, 1500);
	},

	methods: {
		onCreated(editor) {
			this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
		},
	},
	beforeDestroy() {
		const editor = this.editor;
		if (editor == null) return;
		editor.destroy(); // 组件销毁时，及时销毁编辑器
	},
};
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
