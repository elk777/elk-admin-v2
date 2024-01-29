const tokens = {
	admin: {
		token: "admin-token",
	},
	test: {
		token: "test-token",
	},
};
const users = {
	"admin-token": {
		avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
		introduction: "I am a super administrator",
		name: "Super Admin",
		permissions: ["*:*:*"],
		roles: ["admin"],
	},
	"test-token": {
		avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
		introduction: "I am a super tester",
		name: "Super Test",
		roles: ["test"],
	},
};

module.exports = [
	/* 登录接口 */
	{
		url: "/vue-elk-admin/user/login",
		type: "post",
		response: (config) => {
			const { username } = JSON.parse(config.body);
			const token = tokens[username];
			if (!token) {
				return {
					code: 60204,
					message: "账号或者密码不正确",
				};
			}

			return {
				code: 200,
				data: token,
			};
		},
	},
	/* 
		获取用户信息 
		mockjs get请求 不会拿到params的参数，需要在get请求接口后面添加.*，正则去匹配这个路径，然后自行截取
	*/
	{
		url: "/vue-elk-admin/user/info\.*",
		type: "get",
		response: (config) => {
			const token  = config.url.match(/token=([^&#]+)/)[1];
			const info = users[token];
			if (!info) {
				return {
					code: 50008,
					message: "获取失败，无法获取当前用户信息",
				};
			}
			return {
				code: 200,
				data: info,
			};
		},
	},
	/* 退出登录 */
	{
		url: "/vue-elk-admin/user/logout",
		type: "post",
		response: () => {
			return {
				code: 200,
				data: "success",
			};
		},
	},
];
