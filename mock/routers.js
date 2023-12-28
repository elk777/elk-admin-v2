const Mock = require("mockjs");

const routers = [
	{
		id: Mock.Random.increment(),
		title: "系统管理",
		name: "system",
		path: "/system",
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
			},
			{
				id: Mock.Random.increment(),
				title: "用户管理",
				name: "User",
				path: "user",
				icon: "user",
				link: "/system/user",
				affix: false,
			},
			{
				id: Mock.Random.increment(),
				title: "角色管理",
				name: "Role",
				path: "role",
				icon: "role",
				link: "/system/role",
				affix: false,
			},
			{
				id: Mock.Random.increment(),
				title: "部门管理",
				name: "Dept",
				path: "dept",
				icon: "dept",
				link: "/system/dept",
				affix: false,
			},
			{
				id: Mock.Random.increment(),
				title: "字典管理",
				name: "Dic",
				path: "dic",
				icon: "dic",
				link: "/system/dic",
				affix: false,
			},
		],
	},
	{
		id: Mock.Random.increment(),
		title: "功能",
		name: "fun",
		path: "/fun",
		icon: "fun",
		redirect: "noRedirect",
		children: [
			// {
			// 	id: Mock.Random.increment(),
			// 	title: "在线用户",
			// 	name: "Online",
			// 	path: "online",
			// 	icon: "online",
			// 	link: "/monitor/online",
			// 	affix: false,
			// },
		],
	},
	{
		id: Mock.Random.increment(),
		title: "系统监控",
		name: "monitor",
		path: "/monitor",
		icon: "monitor",
		redirect: "noRedirect",
		children: [
			{
				id: Mock.Random.increment(),
				title: "在线用户",
				name: "Online",
				path: "online",
				icon: "online",
				link: "/monitor/online",
				affix: false,
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
