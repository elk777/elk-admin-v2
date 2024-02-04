<template>
	<div class="dept-container layout-container">
		<el-card shadow="hover" class="layout-container-auto">
			<div class="title-search mb15">
				<el-input
					style="max-width: 180px; margin-right: 10px"
					v-model="val"
					placeholder="请输入部门名称"
				></el-input>
				<el-button v-permission="['system:dept:query']" type="primary" icon="el-icon-search">查询</el-button>
				<el-button v-permission="['system:dept:add']" type="success" icon="el-icon-folder-add" @click="handelAdd">新增部门</el-button>
			</div>

			<el-table
				v-loading="loading"
				:data="deptList"
				row-key="deptId"
				:tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
			>
				<el-table-column prop="deptName" label="部门名称" align="center" show-overflow-tooltip />
				<el-table-column prop="leader" label="负责人" align="center" show-overflow-tooltip />
				<el-table-column prop="phone" label="手机号" align="center" show-overflow-tooltip />
				<el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip />
				<el-table-column prop="orderNum" label="排序" align="center" show-overflow-tooltip />
				<el-table-column prop="status" label="部门状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.status ? 'default' : 'danger'">{{
							scope.row.status ? "启用" : "停用"
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="部门描述" align="center" show-overflow-tooltip />
				<el-table-column label="操作" align="center" width="130">
					<template slot-scope="scope">
						<el-button v-permission="['system:dept:edit']" type="text" @click="handleUpdate(scope.row)">修改</el-button>
						<el-button v-permission="['system:dept:remove']" type="text" @click="handleDelete(scope.row)">删除</el-button>
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

			<DeptDialog ref="deptdialog" @getList="getList" />
		</el-card>
	</div>
</template>

<script>
import DeptDialog from "./dialog.vue";
import { listDept, getDept, delDept } from "@/api/system/dept";
export default {
	name: "Dept",
	components: {
		DeptDialog,
	},
	data() {
		return {
			val: "",
			total: 0,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
			},
			deptList: [],
			loading: false,
		};
	},

	mounted() {
		this.getList();
	},

	methods: {
		getList() {
			this.loading = true;
			listDept(this.queryParams).then((res) => {
				this.loading = false;
				const tree = this.$handleTree(res.data, "deptId");
				this.deptList = tree;
				this.$refs.deptdialog.MenuOptions = tree;
				console.log("部门树形结构", tree);
				this.total = res.data.length;
			});
		},
		handelAdd() {
			const deptdialog = this.$refs.deptdialog;
			deptdialog.reset();
			deptdialog.title = "新增部门";
			deptdialog.open = true;
		},
		handleUpdate(row) {
			const deptdialog = this.$refs.deptdialog;
			getDept(row.deptId).then((res) => {
				deptdialog.title = "修改部门";
				deptdialog.open = true;
				deptdialog.form = res.data;
			});
		},
		handleDelete(row) {
			this.$confirm(`是否删除部门名称为${row.deptName}的数据`, "警告", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "waring",
			})
				.then(() => {
					return delDept(row.deptId);
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

