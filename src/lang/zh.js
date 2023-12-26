
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

export default {
    /* 侧边导航栏 */
    menus: {
        Index: '首页',
        system: '系统管理',
        Menu: '菜单管理',
        User: '用户管理',
        Role: '角色管理',
        Dept: '部门管理',
        Dic: '字典管理',
        monitor: '系统监控',
        Online: '在线用户'
    },
    /* 顶部工具栏 */
    toolsMenus: {
        search: '搜索',
        default: '大型',
        medium: '默认',
        small: '小型',
        mini: '迷你',
    },
    /* 布局设置 */
    themeConfig: {
        title: '布局设置',
        themeStyle: '主题风格',
        themeColor: '主题颜色',
        isBreadcrumb: '是否显示面包屑',
        isTagsviews: '是否显示标签栏',
        isHeader: '是否固定头',
        layoutStyle: '布局样式'
    },
    /* 标签栏-工具配置 */
    tagsViews: {
        refresh: '刷新当前',
        close: '关闭当前',
        closeOther: '关闭其他',
        closeAll: '关闭全部'
    },
    ...zhLocale,
}