/*
 * @Author: elk 1185725133@qq.com
 * @Date: 2024-01-26 10:15:10
 * @LastEditors: elk 1185725133@qq.com
 * @LastEditTime: 2024-01-26 15:17:43
 * @FilePath: /vue2_project/src/directive/index.js
 * @Description: 自定义指令统一处理
 */
import permission from "./permission";

const directives = {
	permission,
};

export default {
	install(Vue) {
		Object.keys(directives).forEach((key) => {
			Vue.directive(key, directives[key]);
		});
	}
};
