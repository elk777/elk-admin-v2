import Vue from 'vue';
import Vuex from 'vuex';

import createPersistedState from 'vuex-persistedstate';

import getters from './getters';
import user from './modules/user';
import permission from './modules/permission';
import app from './modules/app';
import tagsview from './modules/tagsview';
import themeconfig from './modules/themeconfig';
import toolsmenu from './modules/toolsmenu';

Vue.use(Vuex);

const state = {}

const mutations = {}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
    user,
    permission,
    app,
    tagsview,
    themeconfig,
    toolsmenu
  },
  // vuex持久化配置
  plugins: [
    /**
     *  通过查询找到了三种用法「一般都是个别进行持久化存储,下面方法针对于部分持久化」
     *  1、直接使用paths参数，里面写对应状态的路径
     *  2、使用reducer函数，返回一个对象「key：value」对应状态的路径
     *  3、key+paths，多个对象
     */
    createPersistedState({
      paths:[
          'user.token',
          'app.sidebar.collapse',
          'themeconfig.themeConfig', // 持久化存储当前模块下的themeConfig对象下所有的状态
          'toolsmenu.languageType',
          'toolsmenu.componentSize'
        ],
      // reducer(val) {
      //   return {
      //     token: val.user.token,
      //     collapse: val.app.sidebar.collapse,
      //     themeConfig: val.themeconfig.themeConfig,
      //   }
      // }
    })
    // createPersistedState(
    //   {
    //     key: 'token',
    //     paths: ['user.token']
    //   },
    //   {
    //     key: 'collapse',
    //     paths: ['app.sidebar.collapse']
    //   },
    //   {
    //     key: 'themeConfig',
    //     paths: [
    //       'themeconfig.themeConfig',
    //     ]
    //   }
    // )
  ]
})

export default store
