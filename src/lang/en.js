/*
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-05-14 14:10:16
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-16 16:44:56
 * @FilePath: \elk-admin-web\src\lang\en.js
 */
import enLocale from 'element-ui/lib/locale/lang/en';

export default {
    /* 侧边导航栏 */
    menus: {
        Index: 'home',
        system: 'system',
        menu: 'systemMenu',
        user: 'systemUser',
        role: 'systemRole',
        dept: 'systemDept',
        dic: 'systemDic',
        fun: "function",
        editor: "Editor",
        print: "print",
        cropper: "cropper",
        Preview: "preview",
        qrcode: "qrcode",
        uploading: "uploading",
        download: "download",
        userProfile: 'UserProfile',
        demo: 'demo',
        echarts: 'echarts',
        customLayout: 'CustomLayout',
        designClarification: 'DesignClarification',
        link: 'link',
		vue: 'Vue',
		github: 'GitHub',
		jueJin: 'xitu-juejin',
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