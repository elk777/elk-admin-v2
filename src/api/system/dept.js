/*
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-05-14 14:10:16
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-23 14:19:51
 * @FilePath: \elk-admin-web\src\api\system\dept.js
 */
import request from "@/libs/utils/request";

const apis = {
	listDept: "/system/dept/list",
	getDept: "/system/dept/",
	addDept: "/system/dept",
	updateDept: "/system/dept",
	delDept: "/system/dept/",
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
