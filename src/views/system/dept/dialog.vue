<template>
	<el-dialog :title="title" :visible.sync="open" width="650px" append-to-body>
		<el-form ref="form" :model="form" :rules="rules" label-width="85px">
			<el-row>
				<el-col :span="24">
					<el-form-item label="上级部门">
						<el-cascader
							style="width: 100%"
							:value="form.deptId"
							:props="{ checkStrictly: true, value: 'deptId', label: 'deptName' }"
							:options="MenuOptions"
							@change="handelCascader"
							clearable
							placeholder="请选择上级部门"
						></el-cascader>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="部门名称" prop="deptName">
						<el-input v-model="form.deptName" placeholder="请输入部门名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="负责人" prop="leader">
						<el-input v-model="form.leader" placeholder="请输入负责人" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="form.phone" placeholder="请输入手机号" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="form.email" placeholder="请输入邮箱" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="排序" prop="orderNum">
						<el-input-number
							v-model="form.orderNum"
							placeholder="请输入部门排序"
							:min="0"
							controls-position="right"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="部门状态" prop="status">
						<el-switch :active-value="1" :inactive-value="0" v-model="form.status" />
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="部门描述" prop="remark">
						<el-input type="textarea" :rows="3" v-model="form.remark" placeholder="请输入部门描述" />
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
import { addDept, updateDept } from "@/api/system/dept";
export default {
	name: "Dialog",
	data() {
		return {
			title: "",
			open: false,
			form: {},
			rules: {
				parentId: [{ required: true, message: "请选择上级部门", trigger: "blur" }],
				deptName: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
				orderNum: [{ required: true, message: "请选择上级部门", trigger: "blur" }],
			},
			loading: false,
			MenuOptions: [],
		};
	},
	mounted() {},
	methods: {
		reset() {
			this.form = {
				deptId: null,
				parentId: 0,
				deptName: null,
				leader: null,
				orderNum: 0,
				phone: null,
				email: null,
				status: 1,
				remark: null,
			};
			this.$resetForm(this, "form");
		},
		/* 上级菜单选择事件 */
		handelCascader(val) {
			console.log("上级菜单选择事件数值1：", val);
			this.form.parentId = val[0];
		},
		cancel() {
			this.open = false;
			this.reset();
		},
		submitForm() {
			this.$refs["form"].validate((valid) => {
				if (valid) {
					this.loading = true;
					if (this.form.deptId != null) {
						updateDept(this.form).then((res) => {
							this.loading = false;
							this.open = false;
							this.$message.success("修改成功");
                            this.$emit("getList");
						});
					} else {
						addDept(this.form).then((res) => {
							this.loading = false;
							this.open = false;
							this.$message.success("新增成功");
                            this.$emit("getList");
						});
					}
				}
			});
		},
	},
};
</script>
