<template>
	<el-dialog :title="title" :visible.sync="open" width="600px" append-to-body :close-on-click-modal="false">
		<el-form ref="form" :model="form" :rules="rules" label-width="100px">
			<el-form-item label="表单名称" prop="formName">
				<el-input v-model="form.formName" placeholder="请输入表单名称" />
			</el-form-item>
			<el-form-item label="表单来源" prop="formSource">
				<el-input v-model="form.formSource" placeholder="请输入表单来源" />
			</el-form-item>
			<el-form-item label="表单描述" prop="remark">
				<el-input v-model="form.remark" type="textarea" placeholder="请输入表单描述" />
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button type="primary" @click="submitForm">确 定</el-button>
			<el-button @click="cancel">取 消</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
	name: "DataFormDialog",
	data() {
		return {
			open: false,
			title: "",
			form: {
				formId: "",
				formName: "",
				formSource: "",
				remark: "",
			},
			rules: {
				formId: [{ required: true, message: "表单ID不能为空", trigger: "blur" }],
				formName: [{ required: true, message: "表单名称不能为空", trigger: "blur" }],
				formSource: [{ required: true, message: "表单来源不能为空", trigger: "blur" }],
			},
		};
	},
	methods: {
		// 表单提交
		submitForm() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
					this.$emit("submit", this.form);
				}
			});
		},
		// 取消按钮
		cancel() {
			this.open = false;
			this.reset();
		},
		// 表单重置
		reset() {
			this.form = {
				formId: "",
				formName: "",
				formSource: "",
				remark: "",
			};
			this.$resetForm(this, "form");
		},
	},
};
</script>

<style scoped>

</style>
