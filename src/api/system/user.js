/*
 * @Author: elk
 * @Date: 2023-12-14 09:11:40
 * @LastEditors: elk 
 * @LastEditTime: 2025-06-07 21:33:20
 * @FilePath: /vue2_project/src/api/system/user.js
 * @Description: 文件内容描述语
 */
import request from "@/libs/utils/request";

const apis = {
	listUser: "/system/user/list",
	getUser: "/system/user/",
	addUser: "/system/user/create",
	updateUser: "/system/user",
	delUser: "/system/user/",
};

/* 获取菜单列表信息 */
function listUser(params) {
	return request({
		url: apis.listUser,
		method: "get",
		params,
	});
}
/* 获取菜单详情 */
function getUser(id) {
	return request({
		url: apis.getUser + id,
		method: "get",
	});
}
/* 新增菜单 */
function addUser(data) {
	return request({
		url: apis.addUser,
		method: "post",
		data,
	});
}
/* 修改菜单 */
function updateUser(data) {
	return request({
		url: apis.updateUser,
		method: "put",
		data,
	});
}
/* 删除菜单 */
function delUser(id) {
	return request({
		url: apis.delUser + id,
		method: "delete",
	});
}
export { listUser, getUser, addUser, updateUser, delUser };
