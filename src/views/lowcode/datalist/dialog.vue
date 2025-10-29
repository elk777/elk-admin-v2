<!--
 * @Author: elk
 * @Date: 2025-10-29 19:23:34
 * @LastEditors: elk 
 * @LastEditTime: 2025-10-29 20:05:25
 * @FilePath: /vue2_project/src/views/lowcode/datalist/dialog.vue
 * @Description: 列表管理编辑弹窗
-->
<template>
	<el-dialog :title="title" :visible.sync="open" width="600px" append-to-body :close-on-click-modal="false">
		<el-form ref="form" :model="form" :rules="rules" label-width="100px">
			<el-form-item label="列表名称" prop="dataName">
				<el-input v-model="form.dataName" placeholder="请输入列表名称" />
			</el-form-item>
			<el-form-item label="列表来源" prop="dataSource">
				<el-input v-model="form.dataSource" placeholder="请输入列表来源" />
			</el-form-item>
			<el-form-item label="列表描述" prop="remark">
				<el-input v-model="form.remark" type="textarea" placeholder="请输入列表描述" />
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
	name: "DataListDialog",
	data() {
		return {
            open: false,
            title: '',
			form: {
				dataId: "",
				dataName: "",
				dataSource: "",
				remark: "",
			},
			rules: {
				dataId: [{ required: true, message: "列表ID不能为空", trigger: "blur" }],
				dataName: [{ required: true, message: "列表名称不能为空", trigger: "blur" }],
				dataSource: [{ required: true, message: "列表来源不能为空", trigger: "blur" }],
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
				dataId: "",
				dataName: "",
				dataSource: "",
				remark: "",
			};
			this.$resetForm(this, "form");
		},
	},
};
</script>

<style scoped>
.dialog-footer {
	text-align: right;
}
</style>
