<template>
	<el-dialog :title="title" :visible.sync="open" width="600" append-to-body>
		<el-form ref="form" :model="form" label-width="80px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="部门名称" prop="deptName">
						<el-input v-model="form.deptName" placeholder="请输入部门名称" />
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div slot="footer">
			<el-button @click="cancel">取消</el-button>
			<el-button :loading="loading" type="primary" @click="submitForm">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
	name: "Dialog",

	data() {
		return {
			title: "",
			open: false,
			form: {},
			loading: false,
		};
	},

	mounted() {},

	methods: {
		reset() {
			this.form = {};
			this.$resetForm(this, "form");
		},
		cancel() {
			this.open = false;
			this.reset();
		},
		submitForm() {},
	},
};
</script>

<style lang="scss" scoped></style>
