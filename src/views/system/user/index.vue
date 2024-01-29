<template>
	<div class="user-container layout-container">
		<el-card shadow="hover" class="layout-container-auto">
			<div class="title-search mb15">
				<el-input
					style="max-width: 180px; margin-right: 10px"
					v-model="val"
					placeholder="请输入用户名称"
				></el-input>
				<el-button type="primary" icon="el-icon-search">查询</el-button>
				<el-button type="success" icon="el-icon-folder-add" @click="handelAdd">新增用户</el-button>
			</div>

			<el-table v-loading="loading" :data="userList">
				<el-table-column
					prop="userName"
					label="用户名称"
					align="center"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="nickName"
					label="用户昵称"
					align="center"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column
					prop="roleIds"
					label="关联角色"
					align="center"
					show-overflow-tooltip
				></el-table-column>
				<el-table-column prop="deptIds" label="部门" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="phone" label="手机号" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column prop="status" label="用户状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.status ? 'default' : 'danger'">{{
							scope.row.status ? "启用" : "停用"
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="用户描述" align="center" show-overflow-tooltip></el-table-column>
				<el-table-column label="操作" align="center" width="130">
					<template slot-scope="scope">
						<el-button :disabled="scope.row.userName === 'admin'" type="text" @click="handleUpdate(scope.row)">修改</el-button>
						<el-button :disabled="scope.row.userName === 'admin'" type="text" @click="handleDelete(scope.row)">删除</el-button>
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
import { listUser, getUser, delUser } from "@/api/system/user";
import UserDialog from "./dialog";
export default {
	name: "User",
	components: {
		UserDialog,
	},
	data() {
		return {
			val: "",
			total: 0,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
			},
			loading: false,
			userList: [],
		};
	},

	mounted() {
		this.getList();
	},

	methods: {
		/* 获取用户列表 */
		getList() {
			this.loading = true;
			listUser(this.queryParams).then((res) => {
				this.loading = false;
				if (res.code === 200) {
					this.userList = res.data;
					this.total = res.data.length;
				}
			});
		},
		/* 新增用户按钮 */
		handelAdd() {
			let userdialog = this.$refs.userdialog;
			userdialog.title = "新增用户";
			userdialog.reset();
			userdialog.open = true;
		},
		/* 修改 */
		handleUpdate(row) {
			let userdialog = this.$refs.userdialog;
			getUser(row.userId).then( res => {
				userdialog.title = "修改用户";
				userdialog.open = true;
				userdialog.form = res.data;
			})
		},
		/* 删除 */
		handleDelete(row) {
			this.$confirm("关闭", "警告", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					return delUser(row.userId);
				})
				.then(() => {
					this.getList();
					this.$message({
						type: "success",
						message: "删除成功!",
					});
				});
		},
	},
};
</script>

<style lang="scss" scoped></style>
