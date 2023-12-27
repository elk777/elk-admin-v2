<template>
	<el-dialog class="mainDialog" :title="title" :visible.sync="open" width="700px" append-to-body>
		<el-form ref="form" :model="form" :rules="rules" label-width="85px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="用户名称" prop="userName">
						<el-input v-model="form.userName" placeholder="请输入用户名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="用户昵称" prop="nickName">
						<el-input v-model="form.nickName" placeholder="请输入用户昵称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="关联角色" prop="roleIds">
						<el-select style="width: 100%" v-model="form.roleIds" placeholder="请选择关联角色">
							<el-option
								v-for="role in roles"
								:key="role.roleName"
								:label="role.roleName"
								:value="role.roleId"
							>
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="部门" prop="deptIds">
						<!-- <el-input v-model="form.deptName" placeholder="请输入部门" /> -->
						<el-cascader
							style="width: 100%"
							:value="form.deptIds"
							:props="{ checkStrictly: true, value: 'deptId', label: 'deptName' }"
							:options="depts"
							@change="handelCascader"
							clearable
							placeholder="请选择部门"
						></el-cascader>
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
					<el-form-item label="性别" prop="sex">
						<el-select style="width: 100%" v-model="form.sex" placeholder="请选择性别">
							<el-option v-for="sex in dics" :key="sex.dicName" :label="sex.label" :value="sex.value">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="用户密码" prop="password">
						<el-input v-model="form.password" placeholder="请输入用户密码" show-password />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="用户状态" prop="status">
						<el-switch :active-value="1" :inactive-value="0" v-model="form.status" />
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="用户描述" prop="remark">
						<el-input type="textarea" :rows="3" v-model="form.remark" placeholder="请输入用户描述" />
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
import { addUser, updateUser } from "@/api/system/user";
import { listRole } from "@/api/system/role";
import { listDept } from "@/api/system/dept";
import { getDic } from "@/api/system/dic";
export default {
	name: "UserDialog",
	data() {
		return {
			title: "",
			open: false,
			form: {},
			rules: {
				userName: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
				nickName: [{ required: true, message: "请输入用户昵称", trigger: "blur" }],
				password: [{ required: true, message: "请输入用户密码", trigger: "blur" }],
			},
			loading: false,
			roles: [],
			depts: [],
			dics: [],
		};
	},

	mounted() {
		this.getAllList();
	},

	methods: {
		async getAllList() {
			const roleData = await listRole();
			const deptData = await listDept();
			const dicData = await getDic("sys_user_sex");
			this.roles = roleData.data;
			this.depts = this.$handleTree(deptData.data, "deptId");
			this.dics = dicData.data.dicData;
		},
		/* 重置form */
		reset() {
			this.form = {
				userId: null,
				userName: null,
				nickName: null,
				roleIds: null,
				deptIds: null,
				phone: null,
				email: null,
				sex: null,
				password: "123456",
				status: 1,
				remark: null,
			};
			this.$resetForm(this, "form");
		},
		handelCascader(val) {
			console.log("用户管理：上级菜单选择事件数值：", val);
			this.form.deptIds = [...val];
		},
		/* 提交表单取消按钮 */
		cancel() {
			this.open = false;
			this.reset();
		},
		/* 提交表单确定按钮 */
		submitForm() {
			console.log("用户管理：form", this.form);
			this.$refs["form"].validate((valid) => {
				this.loading = true;
				if (valid) {
					if (this.form.userId != null) {
						updateUser(this.form).then((res) => {
							this.loading = false;
							this.$message({
								type: "success",
								message: "修改成功",
							});
							this.open = false;
							this.$emit("getList");
						});
					} else {
						addUser(this.form).then((res) => {
							this.loading = false;
							this.$message({
								type: "success",
								message: "新增成功",
							});
							this.open = false;
							this.$emit("getList");
						});
					}
				}
			});
		},
	},
};
</script>

<style lang="scss" scoped></style>
