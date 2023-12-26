
/* 
    将不同模块下的vuex数据集中化
    vue组件中: this.$store.getters.xxx 直接获得 
        无需在 this.$store.模块名.xxx 获得
*/
export default {
    token: state => state.user.token,
    name: state => state.user.name,
    avatar: state => state.user.avatar,
    roles: state => state.user.roles,
    sidebarRouters: state => state.permission.sidebarRouters,
    themeConfig: state => state.themeconfig.themeConfig,
    languageType: state => state.toolsmenu.languageType,
    componentSize: state => state.toolsmenu.componentSize,
    isThemeConfig: state => state.toolsmenu.isThemeConfig,
    isSearch: state => state.toolsmenu.isSearch,
    routers: state => state.permission.routers,
    sidebar: state => state.app.sidebar,
    visitedViews: state => state.tagsview.visitedViews,
    cacheViews: state => state.tagsview.cacheViews
}