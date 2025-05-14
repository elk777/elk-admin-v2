/*
 * @Author: elk
 * @Date: 2023-05-26 16:57:52
 * @LastEditors: elk 
 * @LastEditTime: 2025-05-06 16:02:25
 * @FilePath: /vue2_project/src/api/login.js
 * @Description: 文件内容描述语
 */
import request from "@/libs/utils/request";

const apis = {
	login: "/auth/login",
	getUserInfo: "/getUserInfo",
	logout: "/auth/logout",
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
		// params: { token },
	});
}

function logout() {
	return request({
		url: apis.logout,
		method: "post",
	});
}

export { login, getUserInfo, logout };
