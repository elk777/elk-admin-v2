<template>
	<el-dialog class="mainDialog" :title="title" :visible.sync="open" width="600px" append-to-body>
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-row>
				<el-col :span="24">
					<el-form-item label="上级菜单">
						<el-cascader
							style="width: 100%"
							:value="form.menuId"
							:props="{ checkStrictly: true, value: 'menuId', label: 'menuName' }"
							:options="MenuOptions"
							@change="handelCascader"
							clearable
							placeholder="请选择上级菜单"
						></el-cascader>
					</el-form-item>
				</el-col>
				<el-col :span="24">
					<el-form-item label="菜单类型" prop="menuType">
						<el-radio-group v-model="form.menuType">
							<el-radio label="M">目录</el-radio>
							<el-radio label="C">菜单</el-radio>
							<el-radio label="A">按钮</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="24" v-if="form.menuType != 'A'">
					<el-form-item label="菜单图标" prop="icon">
						<IconSelector v-if="form.icon" :iconName="form.icon" />
						<IconSelector v-else />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单名称" prop="menuName">
						<el-input v-model="form.menuName" placeholder="请输入菜单名称"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="菜单排序" prop="orderNum">
						<el-input-number
							v-model="form.orderNum"
							placeholder="请输入菜单排序"
							:min="0"
							controls-position="right"
						></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 'A'">
					<el-form-item label="是否外链">
						<el-radio-group v-model="form.isFrame">
							<el-radio label="0">是</el-radio>
							<el-radio label="1">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 'A'">
					<el-form-item label="路由地址" prop="path" :show-overflow-tooltip="true">
						<el-input v-model="form.path" placeholder="请输入路由地址"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType === 'C'">
					<el-form-item label="组件路径" prop="component" :show-overflow-tooltip="true">
						<el-input v-model="form.component" placeholder="请输入组件地址"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 'M'">
					<el-form-item label="权限标识" prop="perms">
						<el-input v-model="form.perms" placeholder="请输入权限标识"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 'A'">
					<el-form-item label="显示状态" prop="visible">
						<el-radio-group v-model="form.visible">
							<el-radio label="0">显示</el-radio>
							<el-radio label="1">隐藏</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 'A'">
					<el-form-item label="菜单状态" prop="status">
						<el-radio-group v-model="form.status">
							<el-radio label="0">正常</el-radio>
							<el-radio label="1">停用</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="12" v-if="form.menuType != 'A'">
					<el-form-item label="是否缓存" prop="isCache">
						<el-radio-group v-model="form.isCache">
							<el-radio label="0">缓存</el-radio>
							<el-radio label="1">不缓存</el-radio>
						</el-radio-group>
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
import { addMenu, updateMenu } from "@/api/system/menu";
import IconSelector from "@/components/IconSelector";
export default {
	name: "MenuDialog",
	components: {
		IconSelector,
	},
	data() {
		return {
			title: "",
			open: false,
			form: {},
			loading: false,
			rules: {
				menuName: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
				orderNum: [{ required: true, message: "请输入菜单", trigger: "blur" }],
				path: [{ required: true, message: "请输入路由地址", trigger: "blur" }],
			},
			MenuOptions: [],
		};
	},

	mounted() {
		// this.reset();
	},

	methods: {
		/* 重置表单 */
		reset() {
			this.form = {
				menuId: null,
				parentId: 0,
				menuType: "M",
				menuName: null,
				icon: null,
				orderNum: 0,
				isFrame: "1",
				path: null,
				component: null,
				perms: null,
				visible: "0",
				status: "0",
				isCache: "0",
			};
			this.$resetForm(this, "form");
		},
		/* 取消按钮事件 */
		cancel() {
			this.open = false;
			this.reset();
		},
		/* 上级菜单选择事件 */
		handelCascader(val) {
			console.log("上级菜单选择事件数值1：", val);
			this.form.parentId = val[0];
		},
		/* 提交表单事件 */
		submitForm() {
			console.log("form", this.form);
			this.$refs["form"].validate((valid) => {
				if (valid) {
					this.loading = true;
					if (this.form.menuId != null || undefined) {
						updateMenu(this.form).then((res) => {
							this.loading = false;
							this.open = false;
							this.msgSuccess("修改成功");
							this.$emit("getList");
						});
					} else {
						addMenu(this.form).then((res) => {
							this.loading = false;
							this.open = false;
							this.msgSuccess("新增成功");
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
