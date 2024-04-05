
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
        <link-view v-else :to="formatPath(item)" >
            <el-menu-item  :index="formatPath(item)">
                <Item  :icon="formatItem('icon', item)" :title="formatItem('title', item)" />
            </el-menu-item>
        </link-view>
</template>

<script>
import Item from './Item.vue';
import LinkView from './Link.vue'
import mixins from '../mixins'
export default {
    name: 'SidebarItem',
    mixins: [mixins],
    props: {
        item: Object,
        path: String
    },
    components: {
        Item,
        LinkView
    }
};
</script>