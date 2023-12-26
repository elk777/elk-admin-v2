<template>
	<el-dialog class="mainDialog" :title="title" :visible.sync="open" width="650px" append-to-body>
		<el-form ref="form" :model="form" :rules="rules" label-width="85px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="字典名称" prop="dicName">
						<el-input v-model="form.dicName" placeholder="请输入字典名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="字典类型" prop="dicType">
						<el-input v-model="form.dicType" placeholder="请输入字典类型"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="状态" prop="status">
						<el-switch :active-value="1" :inactive-value="0" v-model="form.status" />
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-row v-for="(v, k) in form.dicData" :key="k">
						<el-col :span="12">
							<el-form-item label="字段">
								<template #label>
									<el-button circle type="primary" v-if="k == 0" @click="onAddRow">
										<i class="el-icon-plus"></i>
									</el-button>
									<el-button circle type="danger" v-else @click="onDelRow(k)">
										<i class="el-icon-delete"></i>
									</el-button>
								</template>
								<el-input v-model="v.label" placeholder="请输入字段名"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="属性">
								<el-input v-model="v.value" placeholder="请输入属性值"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-col>
				<el-col :span="24">
					<el-form-item label="字典描述" prop="remark">
						<el-input
							type="textarea"
							:rows="3"
							v-model="form.remark"
							placeholder="请输入字典描述"
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
				dicName: [{ required: true, message: "字典名称不能为空", trigger: "blur" }],
				dicType: [{ required: true, message: "字典类型不能为空", trigger: "blur" }],
			},
			loading: false,
		};
	},
	watch: {
		form: {
			handler(val) {
				const { dicData } = val;
				if (dicData.length == 0) {
					this.form.dicData.push({
						value: null,
						label: null,
					});
				}
			},
			deep: true,
		},
	},
	methods: {
		/* 重置form表单 */
		reset() {
			this.form = {
				dicId: null,
				dicName: null,
				dicType: null,
				dicData: [],
				status: 1,
				remark: null,
			};
			this.$resetForm(this, "form");
		},
		/* 关闭dialog */
		cancel() {
			this.open = false;
			this.reset();
		},
		/* 新增dicData */
		onAddRow() {
			this.form.dicData.push({
				value: null,
				label: null,
			});
		},
		/* 删除dicData */
		onDelRow(index) {
			this.form.dicData.splice(index, 1);
		},
		/* 确定提交 */
		submitForm() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
					console.log("发送的dicForm", this.form);
					this.loading = true;
					if (this.form.dicId != null) {
						updateDic(this.form).then((res) => {
							this.loading = false;
							this.open = false;
							this.$emit("getList");
							this.$message({
								message: "修改成功",
								type: "success",
							});
						});
					} else {
						addDic(this.form).then((res) => {
							this.loading = false;
							this.open = false;
							this.$emit("getList");
							this.$message({
								message: "新增成功",
								type: "success",
							});
						});
					}
				}
			});
		},
	},
};
</script>

<style lang="sass" scoped></style>
