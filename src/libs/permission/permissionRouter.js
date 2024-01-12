/* 
    路由权限的控制
    1.开启全局前置守卫
      + token存在
        + 路径来源是否为login：如果是直接放行
        + 路径来源不是login：
            + 角色列表是否为空 store.getters.roles.length === 0
                去获取getInfo 然后动态获取routers
            + 直接放行
      + token不存在
        + 是否在白名单：在白名单 直接通过进入
        + 不在白名单： 重定向到登录界面
*/

import Vue from 'vue';
import store from '@/store';
import router from '@/router';
import { Message } from 'element-ui';
// 页面加载进度条
import NProgress from "nprogress";
import 'nprogress/nprogress.css';
// 去掉 圆圈加载
NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];     // 白名单

// 全局前置路由
router.beforeEach((to, from, next) => {
    NProgress.start();
    const token = store.getters.token,
        roles = store.getters.roles;
    if (token) {
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done();
        } else {
            if (roles.length === 0) {
                store.dispatch("GetInfo").then(() => {
                    store.dispatch("GenerateRouter").then(res => {
                        // 添加routers
                        router.addRoutes(res); 
                        next({ ...to, replace: true });
                    })
                }).catch(err => {
                    store.dispatch("Logout").then(() => {
                        Message.error(err);
                        next({ path: '/' })
                    })
                })
            } else {
                next();
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
        } else {
            next(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
            NProgress.done();
        }
    }
})
router.afterEach( () => {
    NProgress.done();
})

