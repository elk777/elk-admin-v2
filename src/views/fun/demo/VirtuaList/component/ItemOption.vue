<!--
 * @Author: elk
 * @Date: 2026-05-07 15:31:13
 * @LastEditors: elk 
 * @LastEditTime: 2026-05-07 15:41:27
 * @FilePath: /vue2_project/src/views/fun/demo/VirtuaList/component/ItemOption.vue
 * @Description: 文件内容描述语
-->
<template>
	<div :style="{ height: height + 'px' }" class="item-option-container">
		<!-- 撑开容器 -->
	</div>
</template>

<script>
export default {
	name: "Vue2ProjectItemOption",
    props: {
        // 项的高度
		height: {
			type: Number | String,
            default: 250,
		},
        // 列表数据
		dataList: {
			type: Array,
			default: () => [],
		},
	},
	data() {
		return {};
	},

	mounted() {},

	methods: {},
};
</script>
<style scoped lang="less">
.item-option-container {
    width: 100%;
    overflow: auto;
    position: relative;
    top: 0;
    left: 0;
}
</style>