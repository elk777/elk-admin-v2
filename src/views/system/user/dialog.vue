<template>
	<el-dialog class="mainDialog" :title="title" :visible.sync="open" width="700px" append-to-body>
		<el-form ref="form" :model="form" :rules="rules" label-width="100px">
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
					<el-form-item label="关联角色" prop="roleName">
						<el-input v-model="form.roleName" placeholder="请输入关联角色" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="部门" prop="deptName">
						<el-input v-model="form.deptName" placeholder="请输入部门" />
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
						<el-input v-model="form.sex" placeholder="请输入性别" />
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
import { addUser,updateUser } from '@/api/system/user';
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
		};
	},

	mounted() {},

	methods: {
		/* 重置form */
		reset() {
			this.form = {
				userId: null,
				userName: null,
				nickName: null,
				roleName: null,
				deptName: null,
				phone: null,
				email: null,
				sex: null,
				password: "123456",
				status: 1,
				remark: null,
			};
			this.$resetForm(this, "form");
		},
		/* 提交表单取消按钮 */
		cancel() {
			this.open = false;
			this.reset();
		},
		/* 提交表单确定按钮 */
		submitForm() {
			console.log("form", this.form);
			this.$refs['form'].validate( (valid) => {
				this.loading = true;
				if(valid) {
					if(this.form.userId != null) {
						updateUser(this.form).then( res => {
							this.loading = false;
							this.$message({
								type: 'success',
								message: '修改成功'
							});
							this.open = false;
							this.$emit("getList");
						})
					} else {
						addUser(this.form).then( res => {
							this.loading = false;
							this.$message({
								type: 'success',
								message: '新增成功'
							});
							this.open = false;
							this.$emit("getList");
						})
					}
				}
			})
		},
	},
};
</script>

<style lang="scss" scoped></style>
