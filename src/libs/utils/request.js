// axios的二次封装 https://www.axios-http.cn/
import axios from "axios";
import store from "@/store";
import { MessageBox, Message } from "element-ui";
import errorCode from "./errorCode";

// 创建axios实例
const service = axios.create({
	// baseURL: process.env.VUE_APP_BASE_URL + process.env.VUE_APP_BASE_API,
	timeout: 5000,
});

// 请求拦截器
service.interceptors.request.use(
	(config) => {
		let baseUrl = config.baseUrl;
        /* 根据接口传递baseUrl参数去配置对应的后端接口域名 */
		switch (baseUrl) {
			case "file":
				config.baseURL = process.env.VUE_APP_BASE_FILE_URL + process.env.VUE_APP_BASE_API ;
				break;
			case "mock":
			    config.baseURL = process.env.VUE_APP_BASE_MOCK_URL;
				break;
			default:
                config.baseURL = process.env.VUE_APP_BASE_API ;
				break;
		}
		// 判断是否携带token验证
		const isToken = (config.headers || {}).isToken === false;
		// vuex中的token 借用vuex-persistedstate 已经持久存储
		if (store.getters.token && !isToken) {
			config.headers["Authorization"] = "Bearer " + store.getters.token;
		}
		return config;
	},
	(error) => {
		// 处理错误的请求
		return Promise.reject(error);
	}
);

// 响应拦截器
service.interceptors.response.use(
	(response) => {
		// 不同的状态码，不同的处理
		const res = response.data,
			code = res.code || 200,
			msg = errorCode[code] || res.msg || errorCode['default'];
		if (code === 401) {
			MessageBox.confirm("登录状态已过期！请重新登陆哦", "系统提示", {
				confirmButtonText: "重新登陆",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				// 调用登出接口，返回登录界面
				store.dispatch("Logout").then(() => {
					location.href = "/index";
				});
			});
			return Promise.reject("error");
		}
		if(code === 500) {
			Message({
				message: msg || "Error",
				type: "error",
				duration: 5 * 1000,
			});
			return Promise.reject(new Error(msg));
		}
		if (code !== 200) {
			Message({
				message: msg || "Error",
				type: "error",
				duration: 5 * 1000,
			});
			return Promise.reject("Error");
		}
		// 成功响应数据处理
		return res;
	},
	(error) => {
		// 不同的msg响应 对应的处理
		console.log("统一err" + error);
		let { message } = error;
		if (message == "Network Error") {
			message = "后端接口连接异常";
		} else if (message.includes("timeout")) {
			message = "系统接口请求超时";
		} else if (message.includes("Request failed with status code")) {
			message = "系统接口" + message.substr(message.length - 3) + "异常";
		}
		Message({
			message,
			type: "error",
			duration: 5 * 1000,
		});
		return Promise.reject(error);
	}
);

export default service;
