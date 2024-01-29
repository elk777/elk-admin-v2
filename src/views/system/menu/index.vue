<template>
	<div class="menu-container layout-container">
		<el-card shadow="hover" style="overflow-y: auto; min-height: 100%;">
			<div class="title-search mb15">
				<el-input
					style="max-width: 180px; margin-right: 10px"
					v-model="val"
					placeholder="请输入菜单名称"
				></el-input>
				<el-button type="primary" icon="el-icon-search">查询</el-button>
				<el-button type="success" icon="el-icon-folder-add" @click="handleAdd">新增菜单</el-button>
			</div>

			<el-table
				v-loading="loading"
				:data="menuList"
				row-key="menuId"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column prop="menuName" label="菜单名称" align="left" width="160"></el-table-column>
				<el-table-column prop="icon" label="图标" align="center">
					<template slot-scope="scope">
						<svg-icon :icon-class="scope.row.icon" />
					</template>
				</el-table-column>
				<el-table-column prop="orderNum" label="排序" align="center"></el-table-column>
				<el-table-column prop="perms" label="权限标识" align="center"></el-table-column>
				<el-table-column prop="component" label="组件路径" align="center"></el-table-column>
				<el-table-column prop="status" label="状态" align="center"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column label="操作" align="center" width="130">
					<template slot-scope="scope">
						<el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
						<el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

			<!-- <Pagination
				v-show="total > 0"
				:total="total"
				:page.sync="queryParams.pageNum"
				:size.sync="queryParams.pageSize"
				@pagination="getList"
			/> -->
		</el-card>

		<MenuDialog ref="menudialog" @getList="getList" />
	</div>
</template>

<script>
import { listMenu, getMenu, delMenu } from "@/api/system/menu";
import MenuDialog from "./dialog";
export default {
	name: "Menu",
	components: {
		MenuDialog,
	},
	data() {
		return {
			menuList: [],
			val: "",
			loading: false,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
			},
			total: 100,
		};
	},

	mounted() {
		this.getList();
	},

	methods: {
		/* 获取menu列表 */
		getList() {
			this.loading = true;
			listMenu(this.queryParams).then((res) => {
				const { data } = res;
				const tree = this.$handleTree(data);
				this.menuList = tree;
				this.$refs.menudialog.MenuOptions = tree;
				this.loading = false;
			});
		},
		/* 新增表单 */
		handleAdd() {
			let menudialog = this.$refs.menudialog;
			menudialog.title = "新增菜单";
			menudialog.reset();
			menudialog.open = true;
		},
		/* 修改当前表单 */
		handleUpdate(row) {
			let menudialog = this.$refs.menudialog;
			getMenu(row.menuId).then((res) => {
				menudialog.title = "修改菜单";
				menudialog.open = true;
				menudialog.form = res.data;
			});
		},
		/* 删除当前表单 */
		handleDelete(row) {
			this.$confirm("是否删除", "警告", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					return delMenu(row.menuId);
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