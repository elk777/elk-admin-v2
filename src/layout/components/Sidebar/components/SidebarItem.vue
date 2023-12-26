<template>
        <!--
             1.没有children: 直接就是一个跳转链接
             2.含有children: 父级点击是打开列表
                + 二级菜单： 子菜单点击是个链接
                + 三级菜单： 嵌套
        -->
        <el-submenu
        v-if="item.children && item.children.length > 0 && item.redirect === 'noRedirect'"
        :index="item.path" popper-append-to-body>
            <template slot="title">
                <Item v-if="item.meta" :icon="item.meta.icon" :title="formatItem('multi',item.name)" />
            </template>
            <sidebar-item v-for="(route, index) of item.children" :key="index" :item="route"
                :path="route.path">
            </sidebar-item>
        </el-submenu>
        <el-menu-item v-else :index="formatPath(item)">
            <Item :icon="formatItem('icon', item)" :title="formatItem('title', item)" />
        </el-menu-item>
</template>

<script>
import Item from './Item.vue';
export default {
    name: 'SidebarItem',
    props: {
        item: Object,
        path: String
    },
    components: {
        Item
    },
    methods: {
        /* 格式化item */
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
        /* 格式化path */
        formatPath(item) {
            if (item.redirect) {
                return item.children[0].path
            }
            return item.path
        },

    },
};
</script>