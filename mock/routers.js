const Mock = require("mockjs");

const routers = [
	{
		id: Mock.Random.increment(),
		title: "系统管理",
		name: "system",
		path: "/system",
		link: null,
		icon: "system",
		redirect: "noRedirect",
		children: [
			{
				id: Mock.Random.increment(),
				title: "菜单管理",
				name: "Menu",
				path: "menu",
				icon: "menu",
				link: "/system/menu",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "用户管理",
				name: "User",
				path: "user",
				icon: "user",
				link: "/system/user",
				affix: false,
				noCache:true
			},
			{
				id: Mock.Random.increment(),
				title: "角色管理",
				name: "Role",
				path: "role",
				icon: "role",
				link: "/system/role",
				affix: false,
				noCache:true
			},
			{
				id: Mock.Random.increment(),
				title: "部门管理",
				name: "Dept",
				path: "dept",
				icon: "dept",
				link: "/system/dept",
				affix: false,
				noCache:true
			},
			{
				id: Mock.Random.increment(),
				title: "字典管理",
				name: "Dic",
				path: "dic",
				icon: "dic",
				link: "/system/dic",
				affix: false,
				noCache:true
			},
		],
	},
	{
		id: Mock.Random.increment(),
		title: "功能",
		name: "fun",
		path: "/fun",
		icon: "fun",
		link: null,
		redirect: "noRedirect",
		children: [
			{
				id: Mock.Random.increment(),
				title: "周报、月报",
				name: "DesignClarification",
				path: "report",
				icon: "menu",
				link: "/fun/report",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "自定义展示",
				name: "CustomLayout",
				path: "custom",
				icon: "menu",
				link: "/fun/custom",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "echarts",
				name: "Echarts",
				path: "echarts",
				icon: "menu",
				link: "/fun/echarts",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "demo",
				name: "Demo",
				path: "demo",
				icon: "menu",
				link: "/fun/demo",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "Editor编辑器",
				name: "Editor",
				path: "editor",
				icon: "editor",
				link: "/fun/editor",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "打印",
				name: "Print",
				path: "print",
				icon: "print",
				link: "/fun/print",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "图片裁剪",
				name: "Cropper",
				path: "cropper",
				icon: "cropper",
				link: "/fun/cropper",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "图片预览",
				name: "Preview",
				path: "preview",	
				icon: "preview",
				link: "/fun/preview",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "二维码生成",
				name: "Qrcode",
				path: "qrcode",
				icon: "qrcode",
				link: "/fun/qrcode",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "大文件上传",
				name: "Uploading",
				path: "uploading",
				icon: "uploading",
				link: "/fun/uploading",
				affix: false,
				noCache:false
			},
			{
				id: Mock.Random.increment(),
				title: "文件下载",
				name: "Download",
				path: "download",
				icon: "download",
				link: "/fun/download",
				affix: false,
				noCache:false
			},
		],
	},
	{
		id: Mock.Random.increment(),
		title: "外链",
		name: "link",
		path: "/link",
		icon: "link",
		link: "/link",
		redirect: "noRedirect",
		children: [
			{
				id: Mock.Random.increment(),
				title: "vue2官网「内嵌」",
				name: "Vue",
				path: "vue",
				icon: "vue",
				isLink: "https://v2.cn.vuejs.org/",
				affix: false,
				noCache:true
			},
			{
				id: Mock.Random.increment(),
				title: "GitHub 仓库",
				name: "GitHub",
				path: "git",
				icon: "git",
				isLink: "https://github.com/elk777/elk-admin-v2",
				affix: false,
				noCache:true
			},
			{
				id: Mock.Random.increment(),
				title: "稀土-掘金",
				name: "JueJin",
				path: "juejin",
				icon: "juejin",
				isLink: "https://juejin.cn/user/3940246036416872",
				affix: false,
				noCache:true
			},
		],
	},
];

module.exports = [
	{
		url: "/vue-elk-admin/generateRouters",
		type: "get",
		response: () => {
			return {
				code: 200,
				data: routers,
			};
		},
	},
];
