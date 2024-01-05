<template>
	<div class="layout-container">
		<el-card shadow="hover" header="el-image大图预览">
			<el-image style="width: 100px; height: 100px" :src="url" :preview-src-list="srcList"> </el-image>
		</el-card>
	</div>
</template>

<script>
export default {
	name: "Preview",
	computed: {
		url() {
			return this.$store.getters.avatar;
		},
		srcList() {
			return [this.$store.getters.avatar];
		},
	}
};
</script>
