
export default {
    methods: {
        /**
         * @description: 格式化item: 菜单国际化 「标题+图标」
         * @return {*}
         */
        formatItem(type, item) {
            if (type === 'multi') {
                return this.$formatI18n(this,'menus',item);
            }
            if (item.children) {
                if (type === 'icon') {
                    return item.children[0].meta.icon;
                }
                let title = item.children[0].name;
                return this.$formatI18n(this,'menus',title);
            } else {
                if (type === 'icon') {
                    return item.meta.icon;
                }
                let title = item.name;
                return this.$formatI18n(this,'menus',title);
            }
        },
        /**
         * @description: 格式化路由item
         * @params {object} item: 路由item对象
         * @return {*}
         */
        formatPath(item) {
            if (item.redirect) {
                return item.children[0].path
            }
            if(item.isLink) {
                return item.isLink
            }
            return item.path
        }
    }
}