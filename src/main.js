import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入分页公共组件
import Pagination from "@/components/Pagination";
// 引入公共函数
import { formatI18n, resetForm, handleTree } from "./libs/utils/tools";
// css重置样式
import "@/style/index.scss";

// 路由权限
import "@/libs/permission/permissionRouter";

import i18n from "./lang";
import ElementUI from "element-ui";
import "@/style/element-variables.scss";
// import 'element-ui/lib/theme-chalk/index.css';
import antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'
Vue.use(antd);

// 全局注册自定义指令
import directive from "./directive";
Vue.use(directive);

// 全局注册 消息提示框
Vue.prototype.msgSuccess = function (msg) {
	this.$message({ showClose: true, message: msg, type: "success" });
};

Vue.prototype.msgError = function (msg) {
	this.$message({ showClose: true, message: msg, type: "error" });
};

Vue.prototype.msgInfo = function (msg) {
	this.$message.info(msg);
};
// 全局注册公共组件
Vue.component("Pagination", Pagination);

// 全局注册函数
Vue.prototype.$formatI18n = formatI18n;
Vue.prototype.$resetForm = resetForm;
Vue.prototype.$handleTree = handleTree;

// 使用Mockjs
import "../mock/index";

// 引入svg插件
import "@/assets/icons/index";

Vue.config.productionTip = false;

Vue.use(ElementUI, {
	i18n: (key, value) => i18n.t(key, value),
	size: store.getters.componentSize || "medium",
});

new Vue({
	router,
	store,
	i18n,
	render: (h) => h(App),
}).$mount("#app");
