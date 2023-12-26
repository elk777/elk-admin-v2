import request from "@/libs/utils/request";

const apis = {
	login: "/user/login",
	getUserInfo: "/user/info",
	logout: "/user/logout",
};

function login(data) {
	return request({
		url: apis.login,
		method: "post",
		data,
	});
}

function getUserInfo(token) {
	return request({
		url: apis.getUserInfo,
		method: "get",
		params: { token },
	});
}

function logout() {
	return request({
		url: apis.logout,
		method: "post",
	});
}

export { login, getUserInfo, logout };
