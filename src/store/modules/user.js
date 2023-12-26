// 用户信息模块

import { login, getUserInfo, logout } from '@/api/login';
// import { setToken, getToken, removeToken } from '@/utils/auth';

const defaultState = () => {
    return {
        token: '',  //登录权限
        avatar: '', //头像
        name: '',  //姓名
        roles: [], // 角色权限列表
        permissions: [], // 按钮权限列表
        unserInfo: {}, //用户基本信息
    }
}

const state = defaultState();

const mutations = {
    RESET_STATE: (state) => {
        Object.assign(state, defaultState());
    },
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_NAME: (state, name) => {
        state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
        state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
        state.permissions = permissions;
    }
}

const actions = {
    // 登录系统
    async Login({ commit }, userInfo) {
        const { username, password } = userInfo;
        try {
            const loginData = await login({ username: username.trim(), password: password });
            // 拿到token后 vuex存储 (持久化本地存储)
            commit('SET_TOKEN', loginData.data.token);
            return loginData
        } catch (err) {
            return new Error(err);
            // console.log('登录的错误', err)
        }
    },
    // 登出系统
    async Logout({ commit, state }) {
        console.log("user-Logout");
        try {
            const logoutElk = await logout();
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            commit('SET_PERMISSIONS', [])
            return logoutElk
        } catch (err) {
            return new Error(err);
        }
    },
    // 获取用户信息
    async GetInfo({ commit, state }) {
        // 获取用户的基本信息： 姓名、头像、角色列表、按钮权限列表 
        try {
            const userInfo = await getUserInfo(state.token);
            const { name, avatar, roles, permissions } = userInfo.data;
            if (roles && roles.length > 0) {
                commit('SET_ROLES', roles);
                commit('SET_PERMISSIONS', permissions);
            } else {
                commit('SET_ROLES', ["ROLE_DEFAULT"]);
            }
            commit("SET_NAME", name);
            commit("SET_AVATAR", avatar);
        } catch (error) {
            return new Error(error);
        }
    },
}

export default {
    state,
    mutations,
    actions
}