import request from "@/libs/utils/request";

const apis = {
	listRole: "/system/role/list",
	getRole: "/system/role/",
	addRole: "/system/addrole",
	updateRole: "/system/updaterole",
	delRole: "/system/delrole/",
};
/* 获取角色列表 */
function listRole(params) {
	return request({
		url: apis.listRole,
		method: "get",
		params,
	});
}
/* 获取角色详情 */
function getRole(id) {
	return request({
		url: apis.getRole + id,
		method: "get",
	});
}
/* 新增角色 */
function addRole(data) {
	return request({
		url: apis.addRole,
		method: "post",
		data,
	});
}
/* 修改角色 */
function updateRole(data) {
	return request({
		url: apis.updateRole,
		method: "put",
		data,
	});
}
/* 删除角色 */
function delRole(id) {
	return request({
		url: apis.delRole + id,
		method: "delete",
	});
}
export { listRole, getRole, addRole, updateRole, delRole };
