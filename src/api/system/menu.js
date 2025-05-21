/*
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-05-14 14:10:16
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-21 19:12:38
 * @FilePath: \elk-admin-web\src\api\system\menu.js
 */
import request from "@/libs/utils/request";

const apis = {
	listMenu: "/system/menu/list",
	getMenu: "/system/menu/",
	addMenu: "/system/menu/create",
	updateMenu: "/system/menu",
	delMenu: "/system/menu/"
};
/* 获取菜单列表信息 */
function listMenu(params) {
	return request({
		url: apis.listMenu,
		method: "get",
		params,
	});
}
/* 获取菜单详情 */
function getMenu(menuId) {
	return request({
		url: apis.getMenu + menuId,
		method: "get",
	});
}
/* 新增菜单 */
function addMenu(data) {
	return request({
		url: apis.addMenu,
		method: "post",
		data,
	});
}
/* 修改菜单 */
function updateMenu(data) {
	return request({
		url: apis.updateMenu,
		method: "put",
		data,
	});
}
/* 删除菜单 */
function delMenu(menuId) {
	return request({
		url: apis.delMenu + menuId,
		method: "delete",
	});
}
export { listMenu, getMenu, addMenu, updateMenu, delMenu };
