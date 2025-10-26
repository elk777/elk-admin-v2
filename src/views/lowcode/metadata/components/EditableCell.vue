<!--
 * @Author: elk
 * @Date: 2025-10-26 15:02:57
 * @LastEditors: elk 
 * @LastEditTime: 2025-10-26 22:50:23
 * @FilePath: /vue2_project/src/views/lowcode/metadata/components/EditableCell.vue
 * @Description: 可编辑单元格组件
-->
<template>
	<div class="editable-cell">
		<span v-if="!editStatus">{{ value }} : {{ tableIndex }}</span>
		<!-- 这个标签使用的是插槽 -->
		<!-- <slot v-else /> -->
		<slot v-else>
			<el-input v-model="currentValue" @blur="save" @keyup.enter.native="save" ref="input"></el-input>
		</slot>
	</div>
</template>
<script>
export default {
	props: {
        // 列属性名
        prop: {
			type: String,
			// 必传
			// required: true,
		},
        // 行索引
		tableIndex: {
			type: [Number, String],
			// required: true,
		},
        // 列值
		value: {
			type: [String, Number, Boolean],
			default: "",
		},
        // 是否处于编辑状态
		editStatus: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			// editStatus: false,
			currentValue: this.value,
		};
	},
	methods: {
		/**
		 * @description: 保存编辑的值
		 * @param {*} e 事件对象
		 * @return {*} value 编辑后的值 index 行索引 prop 列属性名
		 */
		save(e) {
			const value = e.target.value;
			console.log("🚀 ~save - value:", value);
			console.log("🚀 ~ this.tableIndex:", this.tableIndex)
			this.$emit("save", this.currentValue, this.tableIndex, this.prop);
		},
	},
};
</script>
