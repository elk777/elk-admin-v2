const depts = [
	{
		deptId: 1,
		deptName: "",
	},
];

module.exports = [
    /* 获取部门列表 */
	{
		url: "vue-elk-admin/system/dept/list",
		type: "get",
		response: (config) => {
			return {
				code: 200,
				data: depts,
			};
		},
	},
    /* 根据id获取部门详情 */
	{
		url: "vue-elk-admin/system/dept\.*",
		type: "get",
		response: (config) => {
			const id = config.url.metch(/dept\/([^&#]+)/)[1];
			const data = depts.find((item) => item.deptId === id);
			return {
				code: 200,
				data,
			};
		},
	},
    /* 新增部门列表 */
    /* 修改部门列表 */
    /* 删除部门列表 */
];
