const menus = [
	{
		menuId: 1,
		parentId: 0,
		menuType: "M",
		menuName: "系统管理",
		icon: null,
		orderNum: 0,
		isFrame: "1",
		path: "system",
		component: null,
		perms: null,
		visible: "0",
		status: "0",
		isCache: "0",
	},
	{
		menuId: 2,
		parentId: 0,
		menuType: "M",
		menuName: "系统监控",
		icon: null,
		orderNum: 0,
		isFrame: "1",
		path: "monitor",
		component: null,
		perms: null,
		visible: "0",
		status: "0",
		isCache: "0",
	},
	{
		menuId: 3,
		parentId: 1,
		menuType: "C",
		menuName: "菜单管理",
		icon: null,
		orderNum: 0,
		isFrame: "1",
		path: "menu",
		component: "/system/menu",
		perms: null,
		visible: "0",
		status: "0",
		isCache: "0",
	},
	{
		menuId: 4,
		parentId: 1,
		menuType: "C",
		menuName: "用户管理",
		icon: null,
		orderNum: 1,
		isFrame: "1",
		path: "user",
		component: "/system/user",
		perms: null,
		visible: "0",
		status: "0",
		isCache: "0",
	},
	{
		menuId: 5,
		parentId: 1,
		menuType: "C",
		menuName: "角色管理",
		icon: null,
		orderNum: 2,
		isFrame: "1",
		path: "role",
		component: "/system/role",
		perms: null,
		visible: "0",
		status: "0",
		isCache: "0",
	},
	{
		menuId: 6,
		parentId: 1,
		menuType: "C",
		menuName: "部门管理",
		icon: null,
		orderNum: 3,
		isFrame: "1",
		path: "dept",
		component: "/system/dept",
		perms: null,
		visible: "0",
		status: "0",
		isCache: "0",
	},
    {
		menuId: 7,
		parentId: 1,
		menuType: "C",
		menuName: "字典管理",
		icon: null,
		orderNum: 3,
		isFrame: "1",
		path: "dic",
		component: "/system/dic",
		perms: null,
		visible: "0",
		status: "0",
		isCache: "0",
	},
	{
		menuId: 8,
		parentId: 2,
		menuType: "C",
		menuName: "在线用户",
		icon: null,
		orderNum: 0,
		isFrame: "1",
		path: "online",
		component: "/system/online",
		perms: null,
		visible: "0",
		status: "0",
		isCache: "0",
	},
];

module.exports = [
	/* 获取列表接口 */
	{
		url: "/vue-elk-admin/system/menu/list",
		type: "get",
		response: (config) => {
			return {
				code: 200,
				data: menus.sort((a, b) => a.orderNum - b.orderNum),
			};
		},
	},
	/* 根据id获取列表详情 */
	{
		url: "/vue-elk-admin/system/menu\.*",
		type: "get",
		response: (config) => {
			const id = config.url.match(/menu\/([^&#]+)/)[1];
			const filterMenu = menus.filter((item) => item.menuId == id)[0];
			return {
				code: 200,
				data: filterMenu,
			};
		},
	},
	/* 新增列表接口 */
	{
		url: "/vue-elk-admin/system/addmenu",
		type: "post",
		response: (config) => {
			const data = JSON.parse(config.body);
			data.menuId = menus.length + 2;
			menus.push(data);
			return {
				code: 200,
				data: menus.sort((a, b) => a.orderNum - b.orderNum),
			};
		},
	},
	/* 修改列表接口 */
	{
		url: "/vue-elk-admin/system/updatemenu",
		type: "put",
		response: (config) => {
			const data = JSON.parse(config.body);
			const index = menus.indexOf(menus.filter((item) => item.menuId == data.menuId)[0]);
			menus.splice(index, 1, data);
			return {
				code: 200,
				message: "修改成功",
			};
		},
	},
	/* 删除列表接口 */
	{
		url: "vue-elk-admin/system/delmenu\.*",
		type: "delete",
		response: (config) => {
			const id = config.url.match(/delmenu\/([^&#]+)/)[1];
			const index = menus.indexOf(menus.filter((item) => item.menuId == id)[0]);
			menus.splice(index, 1);
			return {
				code: 200,
				message: "删除成功",
			};
		},
	},
];
