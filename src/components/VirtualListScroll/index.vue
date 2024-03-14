<template>
	<div class="virtual-list-scroll-container">
		<el-select
			filterable
			:clearable="true"
			v-model="value"
			remote
			@visible-change="visibleChange"
			:remote-method="remoteMethod"
			placeholder="请选择"
		>
			<virtua-list
				style="height: 245px; overflow-y: auto"
				ref="virtualList"
				:data-key="'id'"
				:data-sources="realData"
				:data-component="item"
				:keeps="20"
			>
			</virtua-list>
		</el-select>
	</div>
</template>

<script>
import VirtualList from "vue-virtual-scroll-list";
import ItemOption from "./component/ItemOption.vue";
export default {
	name: "VirtualListScroll",
	components: {
		"virtua-list": VirtualList,
	},
	props: {
		/* 父组件传递的渲染总数据「全部」 */
		dataList: {
			type: Array,
			default: () => [],
		},
		/* 回显值 */
		defaultValue: {
			type: String,
			default: "",
		},
	},
	data() {
		return {
			item: ItemOption,
			value: this.defaultValue,
			realData: [], // 真实渲染的数据
			start: 0,
		};
	},
	created() {
		// console.log("created dataList", this.dataList);
	},
	methods: {
		/* 搜索列表 */
		remoteMethod(query) {
			if (query !== "") {
				this.realData = this.dataList.filter((item) => {
					return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
				});
			} else {
				this.realData = this.dataList;
			}
		},
		// 下拉框的打开和关闭
		visibleChange(bool) {
			if (bool) {
				this.$refs.virtualList.reset();
				if (this.value == "") {
					setTimeout(() => {
						this.realData = this.dataList;
					}, 100);
				} else {
					let data = this.dataList.find((item) => {
						return item.value === this.value;
					});
					let realData = []
					if (data) {
						realData.push(data);
					}
					realData.push(
						...this.dataList.filter((item) => {
							return item.value !== this.value;
						})
					);
					setTimeout(() => {
						this.realData = realData;
					}, 100);
				}
			}
		},
	},
};
</script>

<style lang="scss" scoped>
.virtual-list-scroll-container {
}
</style>
