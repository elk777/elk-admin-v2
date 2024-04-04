<template>
	<div class="app-wapper">
    	<!-- 侧边导航栏 -->
		<SideBar v-if="themeConfig.layoutStyle === 'vertical'" :style="{ backgroundColor: formatStyle }" />
		<div
			:style="themeConfig.layoutStyle === 'horizontal' && 'margin-left: 0px'"
			class="main-container"
			:class="sidebar.collapse && 'main-collapse'"
		>
			<div :class="themeConfig.isHeader && 'fixed-header'">
				<!-- 顶部导航栏 -->
				<NavBar />
				<!-- 顶部标签导航栏 -->
				<TagsView v-if="themeConfig.isTagsviews" />
			</div>
			<!-- 中心main -->
			<AppMain />
			<!-- 布局设置抽屉组件 -->
			<ThemeConfig />
			<!-- 搜索组件 -->
			<Search />
		</div>
	</div>
</template>

<script>
import SideBar from "@/layout/components/Sidebar/Vertical";
import NavBar from "@/layout/components/Navbar";
import TagsView from "@/layout/components/TagsView";
import AppMain from "@/layout/components/AppMain";
import ThemeConfig from "@/layout/components/Navbar/components/ThemeConfig";
import Search from "./components/Navbar/components/Search";
import { mapGetters } from "vuex";
import variables from "@/style/variable.module.scss";
export default {
	name: "Layout",
	components: {
		SideBar,
		NavBar,
		TagsView,
		AppMain,
		ThemeConfig,
		Search,
	},
	computed: {
		...mapGetters(["sidebar", "themeConfig", "isSearch"]),
		formatStyle() {
			const { themeStyle } = this.themeConfig;
			switch (themeStyle) {
				case "theme-light":
					return variables.sideBarBg;
				case "theme-dead":
					return variables.sideBarDeadBg;
				default:
					return variables.sideBarBg;
			}
		},
	},
};
</script>
