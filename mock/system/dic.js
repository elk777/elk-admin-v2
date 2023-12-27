const dics = [
	{
		dicId: 1,
		dicName: "用户性别",
		dicType: "sys_user_sex",
		dicData: [
			{ label: "男", value: 0 },
			{ label: "女", value: 1 },
		],
		status: 1,
		remark: "用户性别字典",
	},
    {
		dicId: 2,
		dicName: "菜单状态",
		dicType: "sys_show_hide",
		dicData: [
			{ label: "显示", value: 0 },
			{ label: "隐藏", value: 1 },
		],
		status: 1,
		remark: "菜单状态字典",
	},
];

module.exports = [
	/* 获取角色列表信息 */
	{
		url: "vue-elk-admin/system/dic/list",
		type: "get",
		response: (config) => {
			return {
				code: 200,
				data: dics,
			};
		},
	},
	/* 获取角色详情信息 */
	{
		url: "vue-elk-admin/system/dic.*",
		type: "get",
		response: (config) => {
			console.log("config", config);
			const id = config.url.match(/dic\/([^&#]+)/)[1];
			const data = dics.find((item) => item.dicId == id || item.dicType == id);
			return {
				code: 200,
				data,
			};
		},
	},
	/* 新增角色信息 */
	{
		url: "vue-elk-admin/system/adddic",
		type: "post",
		response: (config) => {
			const data = JSON.parse(config.body);
			data.dicId = dics.length + 1;
			return {
				code: 200,
				message: "新增成功",
			};
		},
	},
	/* 修改角色信息 */
	{
		url: "vue-elk-admin/system/updatedic",
		type: "put",
		response: (config) => {
			const data = JSON.parse(config.body);
			const index = dics.indexOf(dics.find((item) => item.dicId == data.dicId));
			dics.splice(index, 1, data);
			return {
				code: 200,
				messages: "修改成功",
			};
		},
	},
	/* 删除角色信息 */
	{
		url: "vue-elk-admin/system/deldic.*",
		type: "delete",
		response: (config) => {
			const id = config.url.match(/dic\/([^&#]+)/)[1];
			const index = dics.indexOf(dics.find((item) => item.dicId == id));
			dics.splice(index, 1);
			return {
				code: 200,
				messages: "删除成功",
			};
		},
	},
];
