<template>
    <div class="horizontal-container">
        <el-menu
            :default-active="routeMenu"
            mode="horizontal"
            :text-color="formatClass('text')"
            :background-color="formatClass('bg')"
            :active-text-color="themeConfig.themeColor"
        >
            <template v-for="item in sidebarRouters">
                <el-submenu
                    v-if="item.children && item.children.length > 0 && item.redirect === 'noRedirect'"
                    :index="item.path"
                    popper-append-to-body
                    :key="item.path"
                >
                    <template slot="title">
                        <Item v-if="item.meta" :icon="item.meta.icon" :title="formatItem('multi',item.name)" />
                    </template>
                    <sidebar-item 
                        v-for="(route, index) of item.children"
                        :key="index"
                        :item="route"
                        :path="route.path"
                    ></sidebar-item>
                </el-submenu>
                <template v-else>
                    <link-view :to="formatPath(item)">
                        <el-menu-item :index="formatPath(item)">
                            <Item :icon="formatItem('icon', item)" :title="formatItem('title', item)" />
                        </el-menu-item>
                    </link-view>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
import Item from './components/Item.vue';
import SidebarItem from '@/layout/components/Sidebar/components/SidebarItem';
import LinkView from './components/Link.vue'
import variables from '@/style/variable.module.scss';
import mixins from './mixins'
export default {
    name: 'Horizontal',
    mixins: [mixins],
    components: {
        Item,
        SidebarItem,
        LinkView
    },
    computed: {
        // 当前路由路径
        routeMenu() {
            const route = this.$route;
            const { path } = route
            return path;
        },
        // 匹配布局主题风格样式表
        formatClass() {
            const { themeStyle } = this.themeConfig;
            return (type) => {
                switch (themeStyle) {
                    case 'theme-light':
                        return type === 'text' ? variables.sideBarText : variables.sideBarBg;
                    case 'theme-dead':
                        return type === 'text' ? variables.siderBarDeadText : variables.sideBarDeadBg;
                    case 'theme-dark':
                        return type === 'text' ? variables.siderBarDeadText : variables.sideBarDarkBg;
                    default:
                        return variables.sideBarBg;
                }
            }
        },
        // 布局配置参数
        themeConfig() {
            return this.$store.getters.themeConfig;
        },
        // 过滤侧边导航栏菜单
        sidebarRouters() {
            return  this.$store.getters.sidebarRouters.filter(item => !item.hidden);
        },
    },
    methods: {
        /* 格式化item */
        // formatItem(type, item) {
        //     if (type === 'multi') {
        //         return this.$formatI18n(this,'menus',item);
        //     }
        //     if (item.children) {
        //         if (type === 'icon') {
        //             return item.children[0].meta.icon;
        //         }
        //         let title = item.children[0].name;
        //         return this.$formatI18n(this,'menus',title);
        //     } else {
        //         if (type === 'icon') {
        //             return item.meta.icon;
        //         }
        //         let title = item.name;
        //         return this.$formatI18n(this,'menus',title);
        //     }
        // }
    },
};
</script>