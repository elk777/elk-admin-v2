/*
 * @Author: elk 1185725133@qq.com
 * @Date: 2024-01-26 10:33:39
 * @LastEditors: elk LYF_elk@163.com@qq.com
 * @LastEditTime: 2024-01-30 14:05:38
 * @FilePath: /vue2_project/src/directive/permission/index.js
 * @Description: 
 *    按钮权限 - 自定义指令 「 https://v2.cn.vuejs.org/v2/guide/custom-directive.html 」
 */

import store from "@/store";

export default {
	inserted: function (el, binding) {
		let { value } = binding,                // 拿到指令绑定的值
			all_permission = "*:*:*",          // 代表全部权限「admin」
		permissions = store.getters.permissions;  // 当前账号按钮权限列表
		
		if (value && value instanceof Array && value.length > 0) {
			const permissionFlag = value;

            // 判断当前账号按钮权限列表中是否含有指令绑定的值
			const hasPermissions = permissions.some((permission) => {
				return all_permission === permission || permissionFlag.includes(permission);
			});

			if (!hasPermissions) {
                // 如果没有，就移除元素
				el.parentNode && el.parentNode.removeChild(el);
			}
		} else {
			throw new Error(`请设置操作权限标签值`);
		}
	},
};
