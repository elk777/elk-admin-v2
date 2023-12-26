
const defaultState = () => {
    return {
        sidebar: {
            collapse: true  //控制侧边导航展开、折叠
        }
    }
}

const state = defaultState();

const mutations = {
    SET_COLLAPSE: (state, collapse) => {
        state.sidebar.collapse = !state.sidebar.collapse
    }
}

const actions = {
    /* 控制侧边导航栏： 展开|折叠 */
    changeCollapse({ commit }) {
        commit('SET_COLLAPSE')
    }
}

export default {
    state,
    mutations,
    actions
}