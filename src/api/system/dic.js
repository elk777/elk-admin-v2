import request from "@/libs/utils/request";

const apis = {
	listDic: "/system/dic/list",
	getDic: "/system/dic/",
	addDic: "/system/adddic",
	updateDic: "/system/updatedic",
	delDic: "/system/deldic/",
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
export { listDic, getDic, addDic, updateDic, delDic };
