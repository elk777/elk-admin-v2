const defaultState = () => {
  return {
    languageType: "en", // 语言切换
    componentSize: "small", // 组件大小
    isThemeConfig: false, // 布局开关
    isSearch: false, // 搜索开关
  };
};
const state = defaultState();

const mutations = {
  SET_TOOLS_MENU: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value === null ? !state[key] : value;
    }
  },
};

const actions = {
  setToolsMenu({ commit }, data) {
    return new Promise((resolve) => {
      commit("SET_TOOLS_MENU", data);
      resolve();
    });
  },
};

export default {
  state,
  mutations,
  actions,
};
