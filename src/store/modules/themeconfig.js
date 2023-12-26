/*
 * @Author: elk 1185725133@qq.com
 * @Date: 2023-11-21 15:09:56
 * @LastEditors: elk 1185725133@qq.com
 * @LastEditTime: 2023-12-06 14:14:57
 * @FilePath: /vue2_project/src/store/modules/themeconfig.js
 * @Description: 布局设置参数配置
 */
import variables from '@/style/element-variables.scss';

const defaultState = () => {
    return {
        themeConfig: {
            /**
             *  主题风格「 亮白、暗色 暗黑 」 默认暗色
             *  亮白：theme-light
             *  暗色：theme-dead
             *  暗黑：theme-dark
            */
            themeStyle: 'theme-light',
            /**
             *  主题颜色「默认为elementui 主色」
            */
            themeColor: variables.theme,
            /**
             *  界面显示 
             *  isBreadcrumb：是否显示面包屑导航
             *  isTagsviews：是否显示标签类导航
             *  isHeader：是否固定navbar
            */
            isBreadcrumb: true,
            isTagsviews: true,
            isHeader: false,
            /**
             * 布局样式
             * 默认： default   vertical
             * 横向： crosswise  horizontal
            */
            layoutStyle: 'vertical'
        }
    }
}

const state = defaultState();

const mutations = {
    SET_THEMM_CONFIG: (state, { key, value }) => {
        if (state.themeConfig.hasOwnProperty(key)) {
            state.themeConfig[key] = value;
        }
    }
}

const actions = {
    setThemeConfig({ commit }, data) {
        commit("SET_THEMM_CONFIG", data);
    }
}

export default {
    state,
    mutations,
    actions
}