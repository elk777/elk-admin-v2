<!--
 * @Author: elk
 * @Date: 2025-10-29 20:07:54
 * @LastEditors: elk 
 * @LastEditTime: 2025-10-29 20:20:13
 * @FilePath: /vue2_project/src/views/lowcode/dataform/index.vue
 * @Description: 表单列表
-->
<template>
	<div class="dataform-container layout-container">
		<el-card shadow="hover" class="layout-container-auto">
			<div class="title-search mb15">
				<el-input
					style="max-width: 180px; margin-right: 10px"
					v-model="val"
					placeholder="请输入表单信息"
				></el-input>
				<el-button v-permission="['lowcode:dataform:query']" type="primary" icon="el-icon-search"
					>查询</el-button
				>
				<el-button
					v-permission="['lowcode:dataform:add']"
					type="success"
					icon="el-icon-folder-add"
					@click="handelAdd"
					>新增表单</el-button
				>
			</div>

			<el-table v-loading="loading" :data="dataformList">
				<el-table-column prop="formId" label="表单ID" align="center" show-overflow-tooltip />
				<el-table-column prop="formName" label="表单名称" align="center" show-overflow-tooltip />
				<el-table-column prop="formSource" label="表单来源" align="center" show-overflow-tooltip />
				<el-table-column prop="remark" label="表单描述" align="center" show-overflow-tooltip />
				<el-table-column label="操作" align="center" width="130">
					<template slot-scope="scope">
						<el-button v-permission="['lowcode:dataform:edit']" type="text" @click="handleUpdate(scope.row)"
							>修改</el-button
						>
						<el-button
							v-permission="['lowcode:dataform:config']"
							type="text"
							@click="handleConfig(scope.row)"
							>配置</el-button
						>
						<el-button
							v-permission="['lowcode:dataform:remove']"
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

        <DataFormDialog ref="dataformdialog" />
	</div>
</template>

<script>
import DataFormDialog from './dialog.vue'
export default {
	name: "Vue2ProjectIndex",
    components: {
		DataFormDialog,
	},
    data() {
		return {
			val: "",
			dataformList: [
                {
                    formId: "1",
                    formName: "表单1",
                    formSource: "sys_user",
                    remark: "这是一个表单",
                },
            ],
			total: 15,
			queryParams: {
				pageNum: 1,
				pageSize: 10,
			},
			loading: false,
		};
	},

	mounted() {},

	methods: {
		/**
		 * @description: 新增表单
		 * @return {*}
		 */
		handelAdd() {
            const dataformdialog = this.$refs.dataformdialog;
            dataformdialog.open = true;
            dataformdialog.title = "新增表单";
            dataformdialog.reset();
        },
		/**
		 * @description: 修改表单
		 * @param {*} row
		 * @return {*}
		 */
		handleUpdate(row) {
            const dataformdialog = this.$refs.dataformdialog;
            dataformdialog.open = true;
            dataformdialog.title = "修改表单";
        },
		/**
		 * @description: 配置表单
		 * @param {*} row
		 * @return {*}
		 */
		handleConfig(row) {
			console.log(row);
		},
		/**
		 * @description: 删除表单
		 * @param {*} row
		 * @return {*}
		 */
		handleDelete(row) {
			console.log(row);
		},
		/**
		 * @description: 查询表单列表
		 * @return {*}
		 */
		getList() {},
	},
};
</script>
