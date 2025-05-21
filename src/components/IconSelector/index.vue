<!--
 * @Description: 
 * @Autor: lyf
 * @Date: 2025-05-14 14:10:16
 * @LastEditors: lyf
 * @LastEditTime: 2025-05-21 19:49:48
 * @FilePath: \elk-admin-web\src\components\IconSelector\index.vue
-->
<template>
	<div class="icon-selector">
		<el-input v-model="iconInput" placeholder="请选择图标" @focus="focusInput" @blur="blurInput">
			<template slot="prepend">
				<svg-icon :icon-class="iconSvg" />
			</template>
		</el-input>
		<el-popover trigger="manual" placement="bottom" title="请选择图标" v-model="open" visible-arrow>
			<template>
				<IconList @getIcon="getIcon" />
			</template>
		</el-popover>
	</div>
</template>

<script>
import IconList from "./iconList.vue";
export default {
	name: "IconSelector",
	props: {
		iconName: {
			type: String,
			default: "default",
		},
	},
	components: {
		IconList,
	},
	watch: {
		iconName: {
			handler(val) {
				console.log("🚀 ~ handler ~ val:", val)
				if (val !== "default") {
					this.iconInput = val;
					this.iconSvg = val;
				} else {
					this.iconInput = "";
					this.iconSvg = val;
				}
			},
			deep: true,
		},
	},
	data() {
		return {
			iconInput: "",
			iconSvg: this.iconName,
			open: false,
		};
	},
	methods: {
		/* 获取焦点 */
		focusInput() {
			this.open = true;
		},
		/* 失去焦点 */
		blurInput() {
			this.open = false;
		},
		/* 回显input */
		getIcon(name) {
			this.iconInput = name;
			this.iconSvg = name;
			this.$emit("getIconName", name);
		},
	},
};
</script>

<style lang="scss" scoped>
.icon-selector {
	& ::v-deep .el-popover {
		margin-top: 10px;
	}
}
</style>
