<template>
	<div>孙子组件1</div>
</template>

<script>
export default {
	name: "Gran1",
	inject: {
		public: {
			type: String,
		},
	},
	data() {
		return {};
	},

	mounted() {
		console.log("孙子能否获得爷爷给父亲传递的数组-attrs:", this.$attrs);
		console.log("孙子能否获得爷爷给父亲传递的数组-listeners:", this.$listeners);
		console.log("祖先组件定义的provide-public-孙子组件:", this.public);
	},

	methods: {},
};
</script>
