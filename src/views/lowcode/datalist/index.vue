<!--
 * @Author: elk
 * @Date: 2025-10-29 19:23:34
 * @LastEditors: elk 
 * @LastEditTime: 2026-03-24 10:23:06
 * @FilePath: /vue2_project/src/views/lowcode/datalist/index.vue
 * @Description: 列表管理
-->
<template>
	<div class="datalist-container layout-container">
		<el-card shadow="hover" class="layout-container-auto">
			<div class="title-search mb15">
				<el-input
					style="max-width: 180px; margin-right: 10px"
					v-model="val"
					placeholder="请输入列表信息"
					clearable
				></el-input>
				<el-button v-permission="['lowcode:datalist:query']" type="primary" @click="handelSearch"
					>查询</el-button
				>
				<el-button
					v-permission="['lowcode:datalist:add']"
					type="success"
					@click="handelAdd"
					icon="el-icon-folder-add"
					>新增列表</el-button
				>
			</div>
			<el-table v-loading="loading" :data="dataList">
				<el-table-column prop="dataId" label="列表ID" align="center" show-overflow-tooltip />
				<el-table-column prop="dataName" label="列表名称" align="center" show-overflow-tooltip />
				<el-table-column prop="dataSource" label="列表来源" align="center" show-overflow-tooltip />
				<el-table-column prop="remark" label="列表描述" align="center" show-overflow-tooltip />
				<el-table-column label="操作" align="center" width="130">
					<template slot-scope="scope">
						<el-button v-permission="['lowcode:datalist:edit']" type="text" @click="handleUpdate(scope.row)"
							>修改</el-button
						>
						<el-button
							v-permission="['lowcode:datalist:config']"
							type="text"
							@click="handleConfig(scope.row)"
							>配置</el-button
						>
						<el-button
							v-permission="['lowcode:datalist:remove']"
							type="text"
							@click="handleDelete(scope.row)"
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

		<DataDialog ref="dataDialog"/>
	</div>
</template>

<script>
import DataDialog from "./dialog.vue";
export default {
	name: "Vue2ProjectIndex",
	components: {
		DataDialog,
	},
	data() {
		return {
			val: "",
			dataList: [
				{
					dataId: "1",
					dataName: "列表1",
					dataSource: "sys_user",
					remark: "列表1描述",
				},
			],
			loading: false,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
			},
			total: 20,
		};
	},

	mounted() {},

	methods: {
		getList() {
			console.log("列表管理");
		},
		handelSearch() {
			console.log(this.val);
		},
		handelAdd() {
            this.$refs.dataDialog.open = true;
            this.$refs.dataDialog.reset();
            this.$refs.dataDialog.title = "新增列表";
		},
		handleUpdate(row) {
			this.$refs.dataDialog.open = true;
            this.$refs.dataDialog.title = "修改列表";
		},
		handleConfig(row) {
			console.log(row);
		},
		handleDelete(row) {
			console.log(row);
		},
	},
};
</script>
