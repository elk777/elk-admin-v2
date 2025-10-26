<!--
 * @Author: elk
 * @Date: 2025-10-25 12:33:37
 * @LastEditors: elk 
 * @LastEditTime: 2025-10-26 18:37:29
 * @FilePath: /vue2_project/src/views/lowcode/metadata/index.vue
 * @Description: 元数据管理
-->
<template>
	<div class="metadata-container layout-container">
		<el-card shadow="hover" class="layout-container-auto">
			<div class="title-search mb15">
				<el-input
					style="max-width: 180px; margin-right: 10px"
					v-model="val"
					placeholder="请输入元数据信息"
				></el-input>
				<el-button v-permission="['lowcode:metadata:query']" type="primary" icon="el-icon-search">查询</el-button>
				<el-button
					v-permission="['lowcode:metadata:add']"
					type="success"
					icon="el-icon-folder-add"
					@click="handelAdd"
					>新增元数据</el-button
				>
			</div>

            <el-table v-loading="loading" :data="dicList">
				<el-table-column prop="metaId" label="元数据ID" align="center" show-overflow-tooltip />
				<el-table-column prop="metaName" label="元数据名称" align="center" show-overflow-tooltip />
				<el-table-column prop="metaLabel" label="元数据标识" align="center" show-overflow-tooltip />
				<el-table-column prop="remark" label="元数据描述" align="center" show-overflow-tooltip />
				<el-table-column label="操作" align="center" width="130">
					<template slot-scope="scope">
                        <el-button v-permission="['lowcode:metadata:edit']" type="text" @click="handleUpdate(scope.row)"
							>修改</el-button
						>
						<el-button v-permission="['lowcode:metadata:config']" type="text" @click="handleConfig(scope.row)"
							>配置</el-button
						>
						<el-button v-permission="['lowcode:metadata:remove']" type="text" @click="handleDelete(scope.row)"
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

        <MetaDialog ref="metadialog" />
        <ConfigDialog ref="configdialog" />
	</div>
</template>

<script>
import MetaDialog from './dialog.vue'
import ConfigDialog from './config.vue'
export default {
    components: {
        MetaDialog,
        ConfigDialog
    },
	data() {
		return {
			val: '',
            loading: false,
            dicList: [
                {
                    metaId: '1232323232323232',
                    metaName: '列表管理',
                    metaLabel: 'lowcode_datalist',
                    remark: '元数据1描述',
                }
            ],
            total: 20,
            queryParams: {
                pageNum: 1,
                pageSize: 10,
            },
		}
	},
	methods: {
        getList() {},
        /**
         * @description: 新增元数据
         * @return {*}
         */        
		handelAdd() {
			const metadialog = this.$refs.metadialog;
			metadialog.open = true;
			metadialog.title = "新增元数据";
			metadialog.reset();
		},
        /**
         * @description: 修改元数据
         * @param {*} row
         * @return {*}
         */
		handleUpdate(row) {
			const metadialog = this.$refs.metadialog;
			metadialog.open = true;
			metadialog.title = "修改元数据";
			metadialog.reset();
		},
        /**
         * @description: 配置元数据
         * @param {*} row
         * @return {*}
         */        
		handleConfig(row) {
			const configdialog = this.$refs.configdialog;
			configdialog.open = true;
		},
        /**
         * @description: 删除元数据
         * @param {*} row
         * @return {*}
         */
		handleDelete(row) {
			this.$confirm('确定删除元数据 ' + row.metaName + ' 吗？', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			}).then(() => {
				// 确认删除
				this.$message({
					type: 'success',
					message: '删除成功',
				});
			}).catch(() => {
				// 取消删除
				this.$message({
					type: 'info',
					message: '已取消删除',
				});
			});
		},
	},
}
</script>

<style lang="scss" scoped></style>
