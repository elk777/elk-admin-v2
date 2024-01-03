import enLocale from 'element-ui/lib/locale/lang/en';

export default {
    /* 侧边导航栏 */
    menus: {
        Index: 'home',
        system: 'system',
        Menu: 'systemMenu',
        User: 'systemUser',
        Role: 'systemRole',
        Dept: 'systemDept',
        Dic: 'systemDic',
        fun: "function",
        Editor: "Editor编辑器",
        Print: "print",
        Cropper: "cropper",
        Preview: "preview",
        Qrcode: "qrcode",
        Uploading: "uploading",
        Download: "download",
        monitor: 'monitor',
        Online: 'monitorOnline'
    },
    /* 顶部工具栏 */
    toolsMenus: {
        search: 'Menu search',
        default: 'big',
        medium: 'default',
        mini: 'mini',
        small: 'small',
    },
    /* 布局设置 */
    themeConfig: {
        title: 'Layout configuration',
        themeStyle: 'Theme style',
        themeColor: 'Theme color',
        isBreadcrumb: 'Is breadcrumb',
        isTagsviews: 'Is tagsviews',
        isHeader: 'Is fixedHeader',
        layoutStyle: 'Layout style'
    },
    /* 标签栏-工具配置 */
    tagsViews: {
        refresh: 'refresh',
        close: 'close',
        closeOther: 'closeOther',
        closeAll: 'closeAll'
    },
    ...enLocale,
}