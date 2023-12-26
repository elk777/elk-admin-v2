import request from "@/libs/utils/request";

const apis = {
	listUser: "/system/user/list",
	getUser: "/system/user/",
	addUser: "/system/adduser",
	updateUser: "/system/updateuser",
	delUser: "/system/deluser/",
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
