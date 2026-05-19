<!--
 * @Author: elk
 * @Date: 2026-05-07 15:21:17
 * @LastEditors: elk 
 * @LastEditTime: 2026-05-07 15:38:40
 * @FilePath: /vue2_project/src/views/fun/demo/VirtuaList/index.vue
 * @Description: 文件内容描述语
-->
<template>
	<div class="virtual-list-scroll-container">
		<el-select
			filterable
			clearable
			remote
			@visible-change="visibleChange"
			:remote-method="remoteMethod"
			placeholder="请选择"
			v-model="val"
		>
			<ItemOption :height="250" :dataList="dataList" />
		</el-select>
	</div>
</template>

<script>
import ItemOption from "./component/ItemOption.vue";
export default {
	name: "Vue2ProjectIndex",
	components: {
		ItemOption,
	},
	data() {
		return {
            dataList: [
                {
                    id: 1,
                    name: "1",
                },
                {
                    id: 2,
                    name: "2",
                },
                {
                    id: 3,
                    name: "3",
                },
                {
                    id: 4,
                    name: "4",
                },
                {
                    id: 5,
                    name: "5",
                }
            ]
        };
	},

	mounted() {},

	methods: {
		visibleChange(bool) {
			console.log("🚀 ~ bool:", bool);
		},
		remoteMethod(query) {
			console.log("🚀 ~ query:", query);
		},
	},
};
</script>
<style scoped lang="scss">
.virtual-list-scroll-container {
}
</style>
