/*
 * @Description:
 * @Autor: lyf
 * @Date: 2025-05-14 14:10:16
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-20 20:26:40
 * @FilePath: \elk-admin-web\src\api\system\role.js
 */
import request from "@/libs/utils/request";

const apis = {
    listRole: "/system/role/list",
    getRole: "/system/role/",
    addRole: "/system/addrole",
    updateRole: "/system/role",
    delRole: "/system/role",
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
function delRole(data) {
    return request({
        url: apis.delRole,
        method: "delete",
        data,
    });
}
export { listRole, getRole, addRole, updateRole, delRole };
