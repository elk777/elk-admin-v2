<template>
	<el-breadcrumb class="breadcrumb-container" separator="/">
		<transition-group name="breadcrumb">
			<el-breadcrumb-item v-for="(item, index) in pathList" :key="index">
				<span v-if="item.redirect == 'noRedirect' || index == pathList.length - 1" class="no-redirect">{{
					formatI18n(item.name)
				}}</span>
				<a v-else @click.prevent="handelLink(item)">{{ formatI18n(item.name) }}</a>
			</el-breadcrumb-item>
		</transition-group>
	</el-breadcrumb>
</template>

<script>
export default {
	name: "Breadcrumb",
	watch: {
		$route(route) {
			/* 排除重定向路径 */
			if (route.path.startsWith("/redirect")) {
				return;
			}
			this.getBreadcrumbList();
		},
	},
	data() {
		return {
			pathList: [],
		};
	},
	computed: {
		formatI18n() {
			return (key) => {
				return this.$formatI18n(this, "menus", key);
			};
		},
	},
	mounted() {
		this.getBreadcrumbList();
	},
	methods: {
		/* 获取面包屑列表*/
		getBreadcrumbList() {
			let matcheds = this.$route.matched.filter((item) => item.meta && item.meta.title);
			const start = matcheds[0];
			let home = [{ path: "/index", meta: { title: "首页" }, name: "Index" }];
			if (start.meta.title !== "首页") {
				matcheds = home.concat(matcheds);
			}
			this.pathList = matcheds;
		},
		/* a标签跳转指定路由 */
		handelLink(item) {
			const { path } = item;
			this.$router.push({ path });
		},
	},
};
</script>

<style lang="scss" scoped>
.breadcrumb-container {
	line-height: 50px;
	float: left;

	.no-redirect {
		color: #97a8be;
		cursor: text;
	}
}
</style>
