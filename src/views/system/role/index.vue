<template>
	<div class="role-container layout-container">
		<el-card shadow="hover" class="layout-container-auto">
			<div class="title-search mb15">
				<el-input
					style="max-width: 180px; margin-right: 10px"
					v-model="val"
					placeholder="请输入角色名称"
				></el-input>
				<el-button v-permission="['system:role:query']" type="primary" icon="el-icon-search">查询</el-button>
				<el-button
					v-permission="['system:role:add']"
					type="success"
					icon="el-icon-folder-add"
					@click="handelAdd"
					:disabled="selectionLength()"
					>新增角色</el-button
				>
			</div>

			<el-table
				ref="multipleTable"
				v-loading="loading"
				:data="roleList"
				@selection-change="handleSelectionChange"
			>
				<el-table-column type="selection" width="55"> </el-table-column>
				<el-table-column
					prop="roleName"
					label="角色名称"
					align="center"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="roleLabel"
					label="角色标识"
					align="center"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column prop="orderNum" label="排序" align="center"></el-table-column>
				<el-table-column prop="status" label="角色状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="Number(scope.row.status) ? 'default' : 'danger'">{{
							Number(scope.row.status) ? "启用" : "停用"
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="用户描述" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" align="center" width="130">
					<template slot-scope="scope">
						<el-button v-permission="['system:role:edit']" type="text" @click="handleUpdate(scope.row)"
							>修改</el-button
						>
						<el-button v-permission="['system:role:remove']" type="text" @click="handleDelete(scope.row)"
							>删除</el-button
						>
					</template>
				</el-table-column>
			</el-table>

			<Pagination
				v-show="total > 0"
				:total="total"
				:page.sync="queryParams.pageNum"
				:size.sync="queryParams.pageSize"
				@pagination="getList"
			/>
		</el-card>
		<UserDialog ref="userdialog" @getList="getList" />
	</div>
</template>

<script>
import { listRole, getRole, delRole } from "@/api/system/role";
import UserDialog from "./dialog";
export default {
	name: "role",
	components: {
		UserDialog,
	},
	data() {
		return {
			val: "",
			total: 0,
			loading: false,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
			},
			roleList: [],
			checked: [],
		};
	},

	mounted() {
		this.getList();
	},
	computed: {
		// 获取选中的行数
		selectionLength(type) {
			return (type) => {
				if (type == "radio") {
					return !(this.checked.length === 1);
				} else if (type == "checkbox") {
					return !(this.checked.length > 0);
				}
				return false;
			};
		},
	},

	methods: {
		toggleSelection(rows) {
			if (rows) {
				rows.forEach((row) => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			this.checked = val;
		},
		/* 获取角色列表 */
		getList() {
			this.loading = true;
			listRole(this.queryParams).then((res) => {
				this.total = res.data.length;
				this.roleList = res.data;
				this.$nextTick(() => {
					this.toggleSelection([res.data[0]]);
				});
				this.loading = false;
			});
		},
		/* 新增角色 */
		handelAdd() {
			const userdialog = this.$refs.userdialog;
			userdialog.open = true;
			userdialog.title = "新增角色";
			userdialog.reset();
		},
		/* 修改角色 */
		handleUpdate(row) {
			const userdialog = this.$refs.userdialog;
			getRole(row.roleId).then((res) => {
				userdialog.open = true;
				userdialog.title = "修改角色";
				userdialog.form = res.data;
			});
		},
		/* 删除角色 */
		handleDelete(row) {
			this.$confirm(`将删除当前角色名称为${row.roleName}的角色`, "警告", {
				cancelButtonText: "取消",
				confirmButtonText: "确定",
				type: "warning",
			})
				.then(() => {
					return delRole(row.roleId);
				})
				.then(() => {
					this.getList();
					this.$message({
						message: "删除成功",
						type: "success",
					});
				});
		},
	},
};
</script>

<style lang="scss" scoped></style>
