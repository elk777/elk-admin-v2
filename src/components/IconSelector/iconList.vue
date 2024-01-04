<template>
	<div class="icon-selector-list">
		<el-scrollbar style="height: 100%">
			<el-row>
				<el-col :span="4" v-for="(icon, k) in icons" :key="k">
					<div class="icon-selector-item" @click="handelClick(icon)">
						<svg-icon :icon-class="icon" />
					</div>
				</el-col>
			</el-row>
		</el-scrollbar>
	</div>
</template>

<script>
import icons from "./requireIcons";
export default {
	name: "iconList",
	data() {
		return {
			icons: [],
		};
	},
	computed: {
		color() {
			return this.$store.getters.themeConfig.themeColor
		}
	},

	mounted() {
		this.icons = icons;
	},

	methods: {
		/* 点击图标 */
		handelClick(icon) {
			this.$emit("getIcon", icon);
		},
	},
};
</script>

<style lang="scss" scoped>
.icon-selector-list {
	height: 230px;
	overflow: hidden;
	.el-col {
		display: flex;
		justify-content: center;
	}
	.el-scrollbar__bar.is-horizontal {
		display: none;
	}
	.icon-selector-item {
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #dcdfe6;
		border-radius: 5px;
		margin: 10px 0px;
		width: 35px;
		height: 35px;
		&:hover {
			cursor: pointer;
			border: 1px solid v-bind(color);
			.svg-icon {
				color: v-bind(color);
			}
		}
	}
}
</style>
