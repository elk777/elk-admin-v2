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
				link: "/system/menu",
				affix: false,
			},
			{
				id: Mock.Random.increment(),
				title: "用户管理",
				name: "User",
				path: "user",
				link: "/system/user",
				affix: false,
			},
			{
				id: Mock.Random.increment(),
				title: "角色管理",
				name: "Role",
				path: "role",
				link: "/system/role",
				affix: false,
			},
			{
				id: Mock.Random.increment(),
				title: "部门管理",
				name: "Dept",
				path: "dept",
				link: "/system/dept",
				affix: false,
			},
			{
				id: Mock.Random.increment(),
				title: "字典管理",
				name: "Dic",
				path: "dic",
				link: "/system/dic",
				affix: false,
			},
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
