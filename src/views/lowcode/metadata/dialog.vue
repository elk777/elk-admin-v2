<!--
 * @Author: elk
 * @Date: 2025-06-06 17:18:30
 * @LastEditors: elk 
 * @LastEditTime: 2025-10-25 14:08:23
 * @FilePath: /vue2_project/src/views/lowcode/metadata/dialog.vue
 * @Description: 新增元数据弹窗
-->
<template>
	<el-dialog class="mainDialog" :title="title" :visible.sync="open" width="750px" append-to-body>
		<el-form ref="form" :model="form" :rules="rules" label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="元数据名称" prop="metaName">
						<el-input v-model="form.metaName" placeholder="请输入元数据名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-tooltip
						class="item"
						effect="dark"
						content="代表数据库的表名，按规范命名，如：sys_user"
						placement="top"
					>
						<el-form-item label="元数据标识" prop="metaLabel">
							<el-input v-model="form.metaLabel" placeholder="请输入元数据标识"></el-input>
						</el-form-item>
					</el-tooltip>
				</el-col>
				<el-col :span="24">
					<el-form-item label="元数据描述" prop="remark">
						<el-input
							type="textarea"
							:rows="4"
							v-model="form.remark"
							placeholder="请输入元数据描述"
						></el-input>
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
import { addDic, updateDic } from "@/api/system/dic";
export default {
	name: "Dialog",
	data() {
		return {
			title: "",
			open: false,
			form: {},
			rules: {
				metaName: [{ required: true, message: "元数据名称不能为空", trigger: "blur" }],
				metaLabel: [{ required: true, message: "元数据标识不能为空", trigger: "blur" }],
			},
			loading: false,
		};
	},
	methods: {
		/* 重置form表单 */
		reset() {
			this.form = {
				metaID: null,
				metaName: null,
				metaLabel: null,
				remark: null,
			};
			this.$resetForm(this, "form");
		},
		/* 关闭dialog */
		cancel() {
			this.open = false;
			this.reset();
		},
		/* 确定提交 */
		submitForm() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
					console.log("发送的dicForm", this.form);
					this.loading = true;
					addMeta(this.form).then((res) => {
						this.loading = false;
						this.open = false;
						this.$emit("getList");
						this.$message({
							message: "新增成功",
							type: "success",
						});
					});
				}
			});
		},
	},
};
</script>

<style lang="sass" scoped></style>
