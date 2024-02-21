<template>
	<div class="navbar-container">
		<div class="nav-menu">
			<!-- 显隐侧边导航栏图标 -->
			<Hamburger v-if="themeConfig.layoutStyle === 'vertical'" />
			<!-- 面包屑导航 -->
			<Breadcrumb v-if="themeConfig.layoutStyle === 'vertical' && themeConfig.isBreadcrumb" />
			<!-- 侧边导航 -->
			<Horizontal v-if="themeConfig.layoutStyle !== 'vertical'" :style="{ backgroundColor: formatStyle }" />
		</div>
		<div class="nav-menu">
			<!-- 顶部工具类导航 -->
			<ToolsMenu />
			<!-- 头像和 个人中心、退出登录、布局设置 -->
			<el-dropdown class="avater-container" trigger="hover">
				<div class="avater-wrapper">
					<img :src="avatar" class="avater-img" />
					<span style="margin: 0 3px 0 0">{{ name }}</span>
					<i class="el-icon-caret-bottom" />
				</div>
				<el-dropdown-menu>
					<router-link to="/index"><el-dropdown-item>首页</el-dropdown-item></router-link>
					<router-link to="/user/profile">
						<el-dropdown-item>个人中心</el-dropdown-item>
					</router-link>
					<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
import Horizontal from "@/layout/components/Sidebar/Horizontal";
import Hamburger from "./components/Hamburger";
import Breadcrumb from "./components/Breadcrumb";
import ToolsMenu from "./components/ToolsMenu";
import variables from "@/style/variable.module.scss";
import { mapGetters } from "vuex";
export default {
	name: "Navbar",
	components: {
		Horizontal,
		Hamburger,
		Breadcrumb,
		ToolsMenu,
	},
	computed: {
		...mapGetters(["avatar", "name", "themeConfig"]),
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
	methods: {
		/* 退出登录 */
		logout() {
			this.$confirm("确定要注销退出系统吗？", "提示", {
				type: "warning",
			}).then(() => {
				this.$store.dispatch("Logout").then((res) => {
					if (res.code === 200) {
						location.href = "/index";
					}
				});
			});
		},
	},
};
</script>

<style lang="scss" scoped>
.navbar-container {
	width: 100%;
	height: 50px;
	background-color: #fff;
	transition: background-color 0.3s;
	overflow: hidden;
	box-shadow: 0px 1px 4px rgba(0, 21, 41, 0.08);
	display: flex;
	align-items: center;
	justify-content: space-between;
	.nav-menu {
		display: flex;
		align-items: center;
		height: 100%;
	}
	.avater-container {
		padding: 0 10px;
		.avater-wrapper {
			display: flex;
			align-items: center;
			.avater-img {
				cursor: pointer;
				width: 25px;
				height: 25px;
				border-radius: 100%;
				margin-right: 5px;
			}
		}
	}
}
</style>
