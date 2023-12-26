
const users = [
	{
		userId: 1,
		userName: "admin",
		nickName: "超级管理员",
		roleName: null,
		deptName: null,
		phone: "12334342323",
		email: "vueElkAdmin@123.com",
		sex: 1,
		password: "123456",
		status: 1,
		remark: "不可删除",
	},
	{
		userId: 2,
		userName: "test",
		nickName: "测试人员",
		roleName: null,
		deptName: null,
		phone: "13099999999",
		email: "vueElkTest@123.com",
		sex: 0,
		password: "123456",
		status: 1,
		remark: "测试人员",
	},
];

module.exports = [
	/* 获取用户列表 */
	{
		url: "vue-elk-admin/system/user/list",
		type: "get",
		response: (config) => {
			return {
				code: 200,
				data: users,
			};
		},
	},
	/* 获取用户详情信息 */
	{
		url: "vue-elk-admin/system/user\.*",
		type: "get",
		response: (config) => {
			const id = config.url.match(/user\/([^&#]+)/)[1];
			const user = users.find((item) => item.userId == id);
			return {
				code: 200,
				data: user,
			};
		},
	},
	/* 新增用户信息 */
	{
		url: "vue-elk-admin/system/adduser",
		type: "post",
		response: (config) => {
			const data = JSON.parse(config.body);
			data.userId = users.length + 1;
			users.push(data);
			return {
				code: 200,
				data: users,
			};
		},
	},
	/* 修改用户信息 */
	{
		url: "vue-elk-admin/system/updateuser",
		type: "put",
		response: (config) => {
			const data = JSON.parse(config.body);
			const index = users.indexOf(users.find((item) => item.userId === data.userId));
			users.splice(index, 1, data);
			return {
				code: 200,
				mssage: "修改成功",
			};
		},
	},
	/* 删除用户信息 */
    {
        url: "vue-elk-admin/system/deluser\.*",
        type: 'delete',
        response: config => {
            const id = config.url.match(/deluser\/([^&#]+)/)[1];
            const index = users.indexOf(users.find((item) => item.userId === data.userId));
            users.splice(index, 1);
            return {
				code: 200,
				mssage: "删除成功",
			};
        }
    }
];
