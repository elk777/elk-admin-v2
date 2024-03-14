<template>
	<div>
		<el-option :key="source.value" :label="source.label" :value="source.value"> </el-option>
	</div>
</template>

<script>
export default {
	name: "ItemOption",
	props: {
		index: {
			// index of current item
			type: Number,
		},
		source: {
			// here is: {uid: 'unique_1', text: 'abc'}
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {};
	},

	mounted() {},

	methods: {},
};
</script>

<style lang="scss" scoped></style>
