<template>
	<div class="app-main" :class="{ 'app-main-tage': themeConfig.isTagsviews }">
		<transition>
			<keep-alive :include="cacheViews">
				<router-view />
			</keep-alive>
		</transition>
	</div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	name: "AppMain",
	computed: {
		...mapGetters(["themeConfig"]),
		cacheViews() {
			return this.$store.getters.cacheViews;
		},
	},
};
</script>
<style lang="scss" scoped>
.app-main {
	width: 100%;
	overflow: auto;
	min-height: calc(100vh - 50px);
	background-color: #f8f8f8;
	position: relative;
}
.app-main-tage {
	min-height: calc(100vh - 85px);
}
.fixed-header + .app-main {
	height: calc(100vh - 85px) !important;
}
</style>
