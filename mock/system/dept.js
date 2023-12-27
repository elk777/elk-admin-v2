const depts = [
	{
		deptId: 1,
		parentId: 0,
		deptName: "集团总部",
		leader: "elk",
		orderNum: 0,
		phone: 12323345421,
		email: "elk@123.com",
		status: 1,
		remark: "备注",
	},
    {
		deptId: 2,
		parentId: 1,
		deptName: "北京分公司",
		leader: "lucky",
		orderNum: 0,
		phone: 12323345421,
		email: "lucky@123.com",
		status: 1,
		remark: "",
	},
    {
		deptId: 3,
		parentId: 1,
		deptName: "上海分公司",
		leader: "baby",
		orderNum: 0,
		phone: 1213345421,
		email: "baby@123.com",
		status: 1,
		remark: "",
	},
    {
		deptId: 4,
		parentId: 2,
		deptName: "研发部门",
		leader: "tom",
		orderNum: 0,
		phone: 1213345421,
		email: "tom@123.com",
		status: 1,
		remark: "",
	},
    {
		deptId: 5,
		parentId: 2,
		deptName: "测试部门",
		leader: "toky",
		orderNum: 0,
		phone: 1213345421,
		email: "toky@123.com",
		status: 1,
		remark: "",
	},
    {
		deptId: 6,
		parentId: 3,
		deptName: "市场部门",
		leader: "join",
		orderNum: 0,
		phone: 1213345421,
		email: "join@123.com",
		status: 1,
		remark: "",
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
			const id = config.url.match(/dept\/([^&#]+)/)[1];
			const data = depts.find((item) => item.deptId == id);
			return {
				code: 200,
				data,
			};
		},
	},
	/* 新增部门列表 */
	{
		url: "vue-elk-admin/system/adddept",
		type: "post",
		response: (config) => {
			const data = JSON.parse(config.body);
			data.deptId = depts.length + 1;
			depts.push(data);
			return {
				code: 200,
				data,
			};
		},
	},
	/* 修改部门列表 */
	{
		url: "vue-elk-admin/system/updatedept",
		type: "put",
		response: (config) => {
			const data = JSON.parse(config.body);
			const index = depts.indexOf(depts.find((item) => item.deptId == data.deptId));
			depts.splice(index, 1, data);
			return {
				code: 200,
				mes: "修改成功",
			};
		},
	},
	/* 删除部门列表 */
	{
		url: "vue-elk-admin/system/deldept\.*",
		type: "delete",
		response: (config) => {
			const id = config.url.match(/deldept\/([^&#]+)/)[1];
			const index = depts.indexOf(depts.find((item) => item.deptId == id));
			depts.splice(index, 1);
			return {
				code: 200,
				mes: "删除成功",
			};
		},
	},
];
