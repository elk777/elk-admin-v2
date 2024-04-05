<template>
	<el-dialog class="mainDialog" :title="title" :visible.sync="open" width="600px" append-to-body>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="角色名称" prop="roleName">
						<el-input v-model="form.roleName" placeholder="请输入角色名称" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="角色标识" prop="roleLable">
						<el-input v-model="form.roleLable" placeholder="请输入角色标识" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="排序" prop="orderNum">
						<el-input-number v-model="form.orderNum" :min="0" controls-position="right" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="状态" prop="status">
						<el-switch :active-value="1" :inactive-value="0" v-model="form.status" />
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="角色描述" prop="remark">
						<el-input type="textarea" :rows="3" v-model="form.remark" placeholder="请输入角色描述" />
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="菜单权限" prop="roleKey">
						<el-tree
							class="tree-border"
							node-key="menuId"
							:data="menuData"
							ref="menu"
							show-checkbox
							:expand-on-click-node="false"
						>
							<span slot-scope="{ node, data }">
								{{ data.menuName }}
							</span>
						</el-tree>
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
import { updateRole, addRole } from "@/api/system/role";
import { listMenu } from "@/api/system/menu";
export default {
	name: "Dialog",
	data() {
		return {
			title: "",
			open: false,
			form: {},
			loading: false,
			rules: {
				roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
				roleLable: [{ required: true, message: "请输入角色标识", trigger: "blur" }],
				orderNum: [{ required: true, message: "请输入排序", trigger: "blur" }],
			},
			menuData: [],
		};
	},

	mounted() {
		this.getList();
	},
	watch: {
		form: {
			handler(val) {
				const { roleId, roleKey } = val;
				this.$nextTick(() => {
					if (roleId != null && roleKey != null) {
						this.$refs.menu.setCheckedKeys(roleKey);
					} else {
						this.$refs.menu.setCheckedKeys([]);
					}
				});
			},
			deep: true,
		},
	},
	methods: {
		/* 获取menu菜单 */
		getList() {
			listMenu().then((res) => {
				const { data } = res;
				const tree = this.$handleTree(data);
				this.menuData = tree;
			});
		},
		/* 获取menu-tree选择节点 */
		getMenuTreeCheckedKeys() {
			let checkedKeys = this.$refs.menu.getCheckedKeys();
			let halfCheckedKeys = this.$refs.menu.getHalfCheckedKeys();
			checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
			return checkedKeys;
		},
		/* 重置 */
		reset() {
			this.form = {
				roleId: null,
				roleName: null,
				roleLable: null,
				orderNum: 0,
				status: 1,
				roleKey: null,
				remark: null,
			};
			this.$resetForm(this, "form");
		},
		/* 关闭菜单 */
		cancel() {
			this.open = false;
			this.reset();
		},
		/* 提交表单 */
		submitForm() {
			console.log("form", this.form);
			this.$refs["form"].validate((valid) => {
				if (valid) {
					this.loading = true;
					if (this.form.roleId != null) {
                        this.form.roleKey = this.getMenuTreeCheckedKeys();
						updateRole(this.form).then((res) => {
							this.loading = false;
							this.open = false;
							this.$emit("getList");
							this.$message({
								message: "修改成功",
								type: "success",
							});
						});
					} else {
						this.form.roleKey = this.getMenuTreeCheckedKeys();
						addRole(this.form).then((res) => {
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

<style lang="scss" scoped>
.tree-border {
	height: 200px;
	overflow-y: auto;
}
</style>
