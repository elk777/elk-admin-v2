import Vue from "vue";
import SvgIcon from '@/components/SvgIcon';
// 全局注册组件
Vue.component("svg-icon", SvgIcon);

/* 
    require.context()
        参数1： 需要检索的目录
        参数2： 是否检索子目录
        参数3： 匹配文件的正则表达式
    返回一个方法 webpackContext
    返回匹配成功模块的名字组成的数组
    [ Moudel, Moudel ...]
*/
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
// console.log(requireAll(req));

