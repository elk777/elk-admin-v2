<!-- svg图标 公共组件 -->
<template>
	<!-- <div :style="styleExternalIcon" class="svg-icon svg-external-icon" /> -->
	<svg :class="svgClass" aria-hidden="true">
		<use :xlink:href="iconName" />
	</svg>
</template>

<script>
export default {
	name: "SvgIcon",
	props: {
		iconClass: {
			type: [String, null],
			// required: true,
		},
		className: {
			type: String,
			default: "",
		},
	},
	computed: {
		svgClass() {
			if (this.className) {
				return `svg-icon ${this.className}`;
			}
			return "svg-icon";
		},
		iconName() {
			if (this.iconClass) {
				return `#icon-${this.iconClass}`;
			}
		},
		// styleExternalIcon() {
		// 	return {
		// 		mask: `url(${this.iconClass}) no-repeat 50% 50%`,
		// 		"-webkit-mask": `url(${this.iconClass}) no-repeat 50% 50%`,
		// 	};
		// },
	},
};
</script>

<style lang="scss" scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	vertical-align: -0.15em;
	fill: currentColor;
	overflow: hidden;
}
.svg-external-icon {
	background-color: currentColor;
	mask-size: cover !important;
	display: inline-block;
}
</style>
