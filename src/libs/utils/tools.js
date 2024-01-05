/*
 * @Author: elk 1185725133@qq.com
 * @Date: 2023-11-30 14:48:24
 * @LastEditors: elk 1185725133@qq.com
 * @LastEditTime: 2024-01-05 16:53:00
 * @FilePath: /vue2_project/src/libs/utils/tools.js
 * @Description: 工具类函数库
 */

/**
 * @description: 格式化 国际化
 * @param:
 *    @type: 参数类型「归属于什么模块下的国际化语言」
 *    @key:  对应模块下的key值，根据key展示对应的value
 * @return {*} 返回国际化处理后的value值
 */
const formatI18n = ($this, type, key) => {
	return $this.$t(`${type}.${key}`);
};

/**
 * @description: 正则匹配
 * @return {*}
 */
const regexMatch = (str, reg) => {
	let regex = new RegExp(str.toLowerCase());
	return regex.test(reg.toLowerCase());
};
/**
 * @description: el-form重置表单
 * @param
 *     @$this: 当前vue实例
 *     @form:  当前表单的ref
 * @return {*}
 */
const resetForm = ($this, form) => {
	if ($this.$refs[form]) {
		$this.$refs[form].resetFields();
	}
};

/**
 * @description: 树形结构的改造「菜单权限」
 * @param
 *      @data : 需要改造的data数据
 * @return {*}
 */
const handleTree = (data, key) => {
	let id = key || "menuId";
	let cloneData = JSON.parse(JSON.stringify(data));
	const tree = cloneData.filter((father) => {
		let branch = cloneData.filter((child) => {
			return father[id] === child.parentId;
		});
		branch.length > 0 ? (father.children = branch) : "";
		return father.parentId === 0;
	});
	return tree !== "" ? tree : data;
};

/**
 * @description: get 通用下载方法
 * @return {*}
 */
const download = (fileName) => {
	window.location.href = `${process.env.VUE_APP_BASE_API}/common/download?fileName=${encodeURI(
		fileName
	)}&delete=true`;
};

export { formatI18n, regexMatch, resetForm, handleTree, download };
