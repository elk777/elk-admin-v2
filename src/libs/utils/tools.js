/*
 * @Author: elk 1185725133@qq.com
 * @Date: 2023-11-30 14:48:24
 * @LastEditors: elk LYF_elk@163.com@qq.com
 * @LastEditTime: 2024-02-06 10:18:58
 * @FilePath: /vue2_project/src/libs/utils/tools.js
 * @Description: 工具类函数库
 */
import SparkMD5 from "spark-md5";

/**
 * @description: 格式化 国际化
 * @param {*} type: 参数类型「归属于什么模块下的国际化语言」
 * @param {*} key: 对应模块下的key值，根据key展示对应的value
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
 * @param {*} $this: 当前vue实例
 * @param {*} form: 当前表单的ref
 */
const resetForm = ($this, form) => {
	if ($this.$refs[form]) {
		$this.$refs[form].resetFields();
	}
};

/**
 * @description: 树形结构的改造「菜单权限」
 * @param {Array} data : 需要改造的data数据
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
 * @description: 通用url地址下载方法
 * @return {*}
 */
const download = (fileName) => {
	window.location.href = `${process.env.VUE_APP_BASE_API}/common/download?fileName=${encodeURI(
		fileName
	)}&delete=true`;
};

/**
 * @description: 转base64格式
 * @param {Blob} file 文件对象
 * @return {*}
 */
const getBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		let fileResult = "";
		reader.readAsDataURL(file);
		// 开始转
		reader.onload = () => {
			fileResult = reader.result;
		};
		// 成功
		reader.onloadend = () => {
			resolve(fileResult);
		};
		// 失败
		reader.onerror = (error) => {
			reject(error);
		};
	});
};
/**
 * @description: 根据spark-MD5 生成文件hash值
 * @param {Blob} file : 文件对象
 * @return {*}
 */
const calculateHashFile = (file) => {
	return new Promise((resolve, reject) => {
		const spark = new SparkMD5.ArrayBuffer();
		const fileReader = new FileReader();
		fileReader.readAsArrayBuffer(file);
		fileReader.onload = () => {
			spark.append(fileReader.result);
			resolve(spark.end());
		};
		// 失败
		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

/**
 * @description: 大文件spark-MD5 抽样获取hash「牺牲一些命中率，提升计算效率」
 * 	 文件的头尾切片取全部，中间的切片抽取开头的2Kb和结尾的2kb
 * @param {*} chunks : 切片对象集合
 * @return {*}
 */
const calculateHashSample = (chunks) => {
	return new Promise((resolve, reject) => {
		const spark = new SparkMD5.ArrayBuffer();
		const reader = new FileReader();
		const CHUNK_OFFSET = 2;
		let maxIdx = chunks.length - 1;
		const sampleChunks = chunks
			.map((chunk, index) => {
				let file = chunk.file,
					size = file.size;
				if (index !== 0 && index !== maxIdx) {
					let offsetChuks = [];
					offsetChuks.push(file.slice(0, CHUNK_OFFSET));
					offsetChuks.push(file.slice(size - CHUNK_OFFSET, size));
					return [...offsetChuks];
				}
				return chunk.file;
			})
			.flat();
		reader.readAsArrayBuffer(new Blob(sampleChunks));
		reader.onload = (e) => {
			spark.append(e.target.result);
			resolve(spark.end());
		};
		// 失败
		reader.onerror = (error) => {
			reject(error);
		};
	});
};

export { formatI18n, regexMatch, resetForm, handleTree, download, getBase64, calculateHashFile, calculateHashSample };
