/*
 * @Author: elk
 * @Date: 2026-05-08 19:13:06
 * @LastEditors: elk 
 * @LastEditTime: 2026-05-08 19:32:28
 * @FilePath: /vue2_project/src/lang/zh.js
 * @Description: 文件内容描述语
 */
import zhLocale from "element-ui/lib/locale/lang/zh-CN";

export default {
	/* 侧边导航栏 */
	menus: {
		Index: "首页",
		system: "系统管理",
		menu: "菜单管理",
		user: "用户管理",
		role: "角色管理",
		dept: "部门管理",
		dic: "字典管理",
		fun: "功能",
        editor: "Editor编辑器",
        print: "页面打印",
        cropper: "图片裁剪",
        preview: "图片预览",
        qrcode: "二维码生成",
        uploading: "文件上传",
        download: "文件下载",
		userProfile: '个人中心',
		demo: 'demo',
		echarts: 'echarts',
		custom: '自定义展示',
		report: "周报、月报",
		link: '外链',
		vue: 'vue',
		github: 'GitHub仓库',
		jueJin: '稀土-掘金',
		lowCode: '低代码管理',
		metadata:'元数据管理',
		datalist: '列表管理',
		dataform: '表单管理',
		affair: '事务管理',
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
