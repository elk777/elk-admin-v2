import request from "@/libs/utils/request";

const apis = {
	listDept: "/system/dept/list",
	getDept: "/system/dept/",
	addDept: "/system/adddept",
	updateDept: "/system/updatedept",
	delDept: "/system/deldept/",
};
/* 获取部门列表 */
function listDept(params) {
	return request({
		url: apis.listDept,
		method: "get",
		params,
	});
}
/* 获取部门详情 */
function getDept(id) {
	return request({
		url: apis.getDept + id,
		method: "get",
	});
}
/* 新增部门 */
function addDept(data) {
	return request({
		url: apis.addDept,
		method: "post",
		data,
	});
}
/* 修改部门 */
function updateDept(data) {
	return request({
		url: apis.updateDept,
		method: "put",
		data,
	});
}
/* 删除部门 */
function delDept(id) {
	return request({
		url: apis.delDept + id,
		method: "delete",
	});
}
export { listDept, getDept, addDept, updateDept, delDept };
