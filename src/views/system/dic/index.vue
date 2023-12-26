<template>
	<div class="dic-container layout-container">
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

			<el-table v-loading="loading" :data="dicList">
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
		</el-card>

		<DicDialog ref="dicdialog" @getList="getList" />
	</div>
</template>

<script>
import { listDic, getDic, delDic } from "@/api/system/dic";
import DicDialog from "./dialog";

export default {
	name: "Dic",
	components: {
		DicDialog,
	},
	data() {
		return {
			val: "",
			loading: false,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
			},
			total: 0,
			dicList: [],
		};
	},

	mounted() {
		this.getList();
	},

	methods: {
		/* 获取列表 */
		getList() {
			this.loading = true;
			listDic(this.queryParams).then((res) => {
				this.dicList = res.data;
				this.total = res.data.length;
				this.loading = false;
			});
		},
		/* 新增 */
		handelAdd() {
			const dicdialog = this.$refs.dicdialog;
			dicdialog.open = true;
			dicdialog.title = "新增字典";
			dicdialog.reset();
		},
		/* 修改 */
		handleUpdate(row) {
			const dicdialog = this.$refs.dicdialog;
			getDic(row.dicId).then((res) => {
				dicdialog.title = "修改字典";
				dicdialog.open = true;
				dicdialog.form = res.data;
			});
		},
		/* 删除 */
		handleDelete(row) {
			this.$confirm(`将删除字典名称为${row.dicName}的数据`, "警告", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			})
				.then(() => {
					return delDic(row.dicId);
				})
				.then(() => {
					this.getList();
					this.$message({
						message: "删除成功",
						type: "sueecss",
					});
				});
		},
	},
};
</script>

<style lang="scss" scoped></style>
