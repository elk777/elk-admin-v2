const roles = [
	{
		roleId: 1,
		roleName: "超级管理员",
		roleLable: "admin",
		orderNum: 0,
		status: 1,
		roleKey: [1, 2, 3, 4, 5, 6, 7, 8],
		remark: null,
	},
	{
		roleId: 2,
		roleName: "测试人员",
		roleLable: "test",
		orderNum: 1,
		status: 1,
		roleKey: [1, 3, 4, 5],
		remark: null,
	},
];

module.exports = [
	/* 获取角色列表信息 */
	{
		url: "vue-elk-admin/system/role/list",
		type: "get",
		response: (config) => {
			return {
				code: 200,
				data: roles,
			};
		},
	},
	/* 获取角色详情信息 */
	{
		url: "vue-elk-admin/system/role.*",
		type: "get",
		response: (config) => {
			const id = config.url.match(/role\/([^&#]+)/)[1];
			const data = roles.find((item) => item.roleId == id);
			return {
				code: 200,
				data,
			};
		},
	},
	/* 新增角色信息 */
	{
		url: "vue-elk-admin/system/addrole",
		type: "post",
		response: (config) => {
			const data = JSON.parse(config.body);
			data.roleId = roles.length + 1;
			return {
				code: 200,
				message: "新增成功",
			};
		},
	},
	/* 修改角色信息 */
	{
		url: "vue-elk-admin/system/updaterole",
		type: "put",
		response: (config) => {
			const data = JSON.parse(config.body);
			const index = roles.indexOf(roles.find((item) => item.roleId == data.roleId));
			roles.splice(index, 1, data);
			return {
				code: 200,
				messages: "修改成功",
			};
		},
	},
	/* 删除角色信息 */
	{
		url: "vue-elk-admin/system/delrole.*",
		type: "delete",
		response: (config) => {
			const id = config.url.match(/role\/([^&#]+)/)[1];
			const index = roles.indexOf(roles.find((item) => item.roleId == id));
			roles.splice(index, 1);
			return {
				code: 200,
				messages: "删除成功",
			};
		},
	},
];
