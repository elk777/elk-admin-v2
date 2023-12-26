<template>
	<div class="dept-container layout-container">
		<el-card shadow="hover" class="layout-container-auto">
			<div class="title-search mb15">
				<el-input
					style="max-width: 180px; margin-right: 10px"
					v-model="val"
					placeholder="请输入字典名称"
				></el-input>
				<el-button type="primary" icon="el-icon-search">查询</el-button>
				<el-button type="success" icon="el-icon-folder-add" @click="handelAdd">新增字典</el-button>
			</div>

			<el-table v-loading="loading" :data="deptList">
				<el-table-column prop="dicName" label="字典名称" align="center" show-overflow-tooltip />
				<el-table-column prop="dicType" label="字典类型" align="center" show-overflow-tooltip />
				<el-table-column prop="status" label="字典状态" align="center">
					<template slot-scope="scope">
						<el-tag :type="scope.row.status ? 'default' : 'danger'">{{
							scope.row.status ? "启用" : "停用"
						}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="用户描述" align="center" show-overflow-tooltip />
				<el-table-column label="操作" align="center" width="130">
					<template slot-scope="scope">
						<el-button type="text" @click="handleUpdate(scope.row)">修改</el-button>
						<el-button type="text" @click="handleDelete(scope.row)">删除</el-button>
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

			<DeptDialog ref="deptdialog" @getList="getList" />
		</el-card>
	</div>
</template>

<script>
import DeptDialog from "./dialog.vue";
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
		getList() {},
		handelAdd() {},
		handleUpdate() {},
		handleDelete() {},
	},
};
</script>

<style lang="scss" scoped></style>
