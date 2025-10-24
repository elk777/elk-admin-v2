<!--
 * @Author: elk
 * @Date: 2023-10-30 10:44:53
 * @LastEditors: elk 
 * @LastEditTime: 2025-10-23 22:14:40
 * @FilePath: /vue2_project/src/layout/components/Sidebar/Vertical.vue
 * @Description: 侧边垂直布局
-->
<template>
	<div class="sidebar-container" :class="formatSidebar">
		<logo  :isCollapse="sidebar.collapse" :themeColor="themeConfig.themeColor" />
		<el-scrollbar :style="{ height: 'calc(100% - 51px)'}" wrap-class="scrollbar-wrapper">
			<!-- router -->
			<el-menu
				:default-active="routeMenu"
				mode="vertical"
				:collapse="sidebar.collapse"
				:unique-opened="false"
				:collapse-transition="false"
				:text-color="formatClass('text')"
				:background-color="formatClass('bg')" 
			>
				<template v-for="item in sidebarRouters">
					<el-submenu
						v-if="item.children && item.children.length > 0 && item.redirect === 'noRedirect'"
						:index="item.path"
						popper-append-to-body
						:key="item.path"
					>
						<template slot="title">
							<Item v-if="item.meta" :icon="item.meta.icon" :title="formatItem('multi', item.name)" />
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
		</el-scrollbar>
	</div>
</template>

<script>
import Item from "./components/Item.vue";
import Logo from './components/Logo.vue';
import SidebarItem from "@/layout/components/Sidebar/components/SidebarItem";
import LinkView from './components/Link.vue'
import { mapGetters } from "vuex";
import mixins from './mixins'
import variables from "@/style/variable.module.scss";
export default {
	name: "Sidebar",
	mixins: [mixins],
	components: {
		Item,
		Logo,
		SidebarItem,
		LinkView
	},
	computed: {
		...mapGetters(["sidebar", "themeConfig"]),
		routeMenu() {
			const route = this.$route;
			const { path } = route;
			return path;
		},
		sidebarRouters() {
			return this.$store.getters.sidebarRouters.filter((item) => !item.hidden);
		},
		formatClass() {
			const { themeStyle } = this.themeConfig;
			return (type) => {
				switch (themeStyle) {
					case "theme-light":
						return type === "text" ? variables.sideBarText : variables.sideBarBg;
					case "theme-dead":
						return type === "text" ? variables.siderBarDeadText : variables.sideBarDeadBg;
					case "theme-dark":
						return type === "text" ? variables.siderBarDeadText : variables.sideBarDarkBg;
					default:
						return variables.sideBarBg;
				}
			};
		},
		formatSidebar() {
			const { collapse } = this.sidebar;
			if (collapse) {
				return "sidebar-vertical-container sidebar-collapse";
			}
			return "sidebar-vertical-container";
		},
	}
};
</script>
