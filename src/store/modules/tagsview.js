
const defaultState = () => {
    return {
        visitedViews: [],      // 访问过的tags路由
        cacheViews: []         // 需要缓存的路由
    }
}
const state = defaultState();

const mutations = {
    /**  
     * 需排除重复添加的数据的情况
     * 将view和{title: xxx}合并到一个新的空对象push到visitedViews中
    */
    ADD_VISITED_VIEW: (state, view) => {
        if (state.visitedViews.some((item) => item.path === view.path)) return
        state.visitedViews.push(
            Object.assign({}, view, {
                title: view.meta.title || 'no-name'
            })
        )
    },
    /**
     * includes：判断cacheViews数组中是否含有这个值，防止重复添加
     * 将开启缓存的组件的name添加到cacheViews中去
     */
    ADD_CACHE_VIEW: (state, view) => {
        if (state.cacheViews.includes(view.name)) return
        if (!view.meta.noCache) {
            state.cacheViews.push(view.name)
        }
    },
    UPDATE_VISITED_VIEW: (state, view) => {
        state.visitedViews = [];
        state.visitedViews.push(
            Object.assign({}, view, {
                title: view.meta.title || 'no-name'
            })
        )
    },
    /* 
        state.visitedViews = state.visitedViews.filter( item => item.name !== view.name );
        state.visitedViews.splice(state.visitedViews.indexOf(view),1);
        直接使用这两种方法时删除，如果删除前面、中间的tags出现了下面错误
            Duplicate keys detected: 'tab-/system/role'. This may cause an update error
            经过排查发现是 TagsView组件中el-tab-pane for循环 key使用的index会出现，换成其他唯一标识即可
    */
    DEL_VISITED_VIEW: (state, view) => {
        state.visitedViews.splice(state.visitedViews.indexOf(view.name), 1);
    },
    DEL_CACHE_VIEW: (state, view) => {
        state.cacheViews.splice(state.cacheViews.indexOf(view.name), 1);
    },
    /* 移除其他visited：将这个view和固定在标签「affix为true」的过滤出来并重新赋值给visitedViews即可 */
    DEL_OTHER_VISITED_VIEW: (state, view) => {
        state.visitedViews = state.visitedViews.filter( v => v.meta.affix || v.path === view.path)
    },
    /* 移除其他cache */
    DEL_OTHER_CACHE_VIEW: (state, view) => {
        state.cacheViews = state.cacheViews.filter( v => v === view.name)
    },
    /* 移除全部visited: 过滤出固定在标签「affix为true」重新赋值给visitedViews */
    DEL_ALL_VISITED_VIEW: (state,view) => {
        state.visitedViews = state.visitedViews.filter( v => v.meta.affix)
    },
    /* 移除全部cache */
    DEL_ALL_CACHE_VIEW: (state,view) => {
        state.cacheViews = [];
    }
};

const actions = {
    addView({ dispatch, commit }, view) {
        commit("ADD_VISITED_VIEW", view);
        commit("ADD_CACHE_VIEW", view);
    },
    addVisitedView({ commit }, view) {
        commit("ADD_VISITED_VIEW", view);
    },
    delView({ commit }, view) {
        return new Promise( resolve => {
            commit("DEL_VISITED_VIEW", view);
            commit("DEL_CACHE_VIEW", view);
            resolve();
        })
    },
    delVisitedView({ commit }, view) {
        commit("DEL_VISITED_VIEW", view)
    },
    delCacheView({commit}, view) {
        return new Promise ( resolve => {
            commit("DEL_CACHE_VIEW", view);
            resolve();
        })
    },
    upVisitedView({ commit }, view) {
        commit("UPDATE_VISITED_VIEW", view);
    },
    closeOtherView({dispatch,commit},view) {
        return new Promise( resolve => {
            commit("DEL_OTHER_VISITED_VIEW",view);
            commit("DEL_OTHER_CACHE_VIEW",view);
            resolve();
        })
    },
    closeAllView({dispatch,commit},view) {
        return new Promise( resolve => {
            commit("DEL_ALL_VISITED_VIEW");
            commit("DEL_ALL_CACHE_VIEW");
            resolve();
        })  
    },
}


export default {
    state,
    mutations,
    actions
}