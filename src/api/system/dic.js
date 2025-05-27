/*
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-05-14 14:10:16
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-27 10:09:45
 * @FilePath: \elk-admin-web\src\api\system\dic.js
 */
import request from "@/libs/utils/request";

const apis = {
	listDic: "/system/dic/list",
	getDic: "/system/dic/",
	getDicData: "/system/dic/dicData",
	addDic: "/system/dic/create",
	updateDic: "/system/dic",
	delDic: "/system/dic/",
};
/* 获取字典列表 */
function listDic(params) {
	return request({
		url: apis.listDic,
		method: "get",
		params,
	});
}
/* 获取字典详情 */
function getDic(id) {
	return request({
		url: apis.getDic + id,
		method: "get",
	});
}
/* 获取字典数据详情 */
function getDicData(dicType) {
	return request({
		url: apis.getDicData,
		method: "get",
		params: dicType
	});
}
/* 新增字典 */
function addDic(data) {
	return request({
		url: apis.addDic,
		method: "post",
		data,
	});
}
/* 修改字典 */
function updateDic(data) {
	return request({
		url: apis.updateDic,
		method: "put",
		data,
	});
}
/* 删除字典 */
function delDic(id) {
	return request({
		url: apis.delDic + id,
		method: "delete",
	});
}
export { listDic, getDic, getDicData, addDic, updateDic, delDic };
