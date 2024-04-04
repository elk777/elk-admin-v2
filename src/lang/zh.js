import zhLocale from "element-ui/lib/locale/lang/zh-CN";

export default {
	/* 侧边导航栏 */
	menus: {
		Index: "首页",
		system: "系统管理",
		Menu: "菜单管理",
		User: "用户管理",
		Role: "角色管理",
		Dept: "部门管理",
		Dic: "字典管理",
		fun: "功能",
        Editor: "Editor编辑器",
        Print: "页面打印",
        Cropper: "图片裁剪",
        Preview: "图片预览",
        Qrcode: "二维码生成",
        Uploading: "文件上传",
        Download: "文件下载",
		UserProfile: '个人中心',
		Demo: 'demo',
		Echarts: 'echarts',
		CustomLayout: '自定义展示',
		DesignClarification: "周报、月报",
		link: '外链',
		Vue: 'vue',
		GitHub: 'GitHub仓库',
		JueJin: '稀土-掘金',
	},
	/* 顶部工具栏 */
	toolsMenus: {
		search: "搜索",
		default: "大型",
		medium: "默认",
		small: "小型",
		mini: "迷你",
	},
	/* 布局设置 */
	themeConfig: {
		title: "布局设置",
		themeStyle: "主题风格",
		themeColor: "主题颜色",
		isBreadcrumb: "是否显示面包屑",
		isTagsviews: "是否显示标签栏",
		isHeader: "是否固定头",
		layoutStyle: "布局样式",
	},
	/* 标签栏-工具配置 */
	tagsViews: {
		refresh: "刷新当前",
		close: "关闭当前",
		closeOther: "关闭其他",
		closeAll: "关闭全部",
	},
	...zhLocale,
};
