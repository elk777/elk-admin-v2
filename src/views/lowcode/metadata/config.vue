<!--
 * @Author: elk
 * @Date: 2025-10-25 14:23:52
 * @LastEditors: elk 
 * @LastEditTime: 2025-10-27 20:01:55
 * @FilePath: /vue2_project/src/views/lowcode/metadata/config.vue
 * @Description: 元数据配置
-->
<template>
	<el-dialog
		class="mainDialog"
		title="元数据配置"
		top="0"
		:fullscreen="true"
		:visible.sync="open"
		width="100%"
		append-to-body
	>
		<div class="metadata-config-container layout-container">
			<!-- 按钮系列 -->
			<div class="btn-series">
				<el-button
					v-permission="['lowcode:metadata:add']"
					type="success"
					@click="handelAdd"
					>新增字段</el-button
				>
			</div>
			<!-- 表格系列 -->
			<el-table :data="metalist" border stripe highlight-current-row width="100%">
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column label="是否主键"  width="85">
					<template slot-scope="scope">
						<el-switch :disabled="scope.row.isDefault" v-model="scope.row.isPrimaryKey"></el-switch>
					</template>
				</el-table-column>
				<el-table-column label="字段英文" >
					<template slot-scope="scope">
                        <EditableCell :value="scope.row.filedEn" :prop="'filedEn'" :tableIndex="scope.$index" :isDefault="scope.row.isDefault">
                            <!-- <el-input v-model="scope.row.filedEn"></el-input> -->
                        </EditableCell>
					</template>
				</el-table-column>
				<el-table-column label="字段中文" >
					<template slot-scope="scope">
                        <EditableCell @save="save" :prop="'filedZh'" :tableIndex="scope.$index" :value="scope.row.filedZh" :isDefault="scope.row.isDefault">
                            <!-- <el-input v-model="scope.row.filedZh"></el-input> -->
                        </EditableCell>
					</template>
				</el-table-column>
                <el-table-column label="字段类型" >
                    <template slot-scope="scope">
                        <EditableCell :value="scope.row.filedType">
                            <el-select :disabled="scope.row.isDefault" v-model="scope.row.filedType" placeholder="请选择字段类型">
                                <el-option
                                    v-for="item in filedTypes"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                />
                            </el-select>
                        </EditableCell>
                    </template>
                </el-table-column>
				<el-table-column label="字段长度" >
					<template v-slot:default="scope">
                        <EditableCell :value="scope.row.filedLength">
                            <el-input-number :disabled="scope.row.isDefault" :min="0" controls-position="right" :value="255" v-model="scope.row.filedLength"></el-input-number>
                        </EditableCell>
					</template>
				</el-table-column>
				<el-table-column label="精度长度">
					<template slot-scope="scope">
                        <EditableCell :value="scope.row.precision">
                            <el-input-number :disabled="precisionEdit(scope.row)" :min="0" controls-position="right" v-model="scope.row.precision"></el-input-number>
                        </EditableCell>
					</template>
				</el-table-column>
                <el-table-column  width="60" align="center">
                    <template slot-scope="scope">
                        <el-button @click="handleFiledDelete(scope.row)" :disabled="scope.row.isDefault" type="danger" icon="el-icon-delete" circle></el-button>
                    </template>
                </el-table-column>
			</el-table>
		</div>
		<div slot="footer">
			<el-button @click="cancel">取消</el-button>
			<el-button :loading="loading" type="primary" @click="submitForm">保存</el-button>
		</div>
	</el-dialog>
</template>

<script>
import EditableCell from './components/EditableCell.vue'
export default {
	name: "Vue2ProjectConfig",
    components: {
		EditableCell,
	},
	data() {
		return {
			metalist: [
				{
					isPrimaryKey: true,
					filedEn: "id",
					filedZh: "主键",
					filedType: "int",
					filedLength: "11",
                    precision: 100,
                    isDefault: true
				},
			],
            filedTypes: [
                {
                    label: "int",
                    value: "int"
                },
                {
                    label: "varchar",
                    value: "varchar"
                },
                {
                    label: "date",
                    value: "date"
                },
                {
                    label: "number",
                    value: "number"
                },
            ],
			open: false,
			loading: false,
		};
	},
    computed: {
        // 精度编辑框
        precisionEdit() {
            return (row) => {
                if( row.isDefault || row.filedType !== "number") {
                    return true;
                } else {
                    return false;
                }
            }
        }
    },

	mounted() {},

	methods: {
        /**
         * @description: 关闭弹窗
         * @return {*}
         */
		cancel() {
			this.open = false;
		},
        /**
         * @description: 新增字段
         * @return {*}
         */
		handelAdd() {
            this.metalist.push({
                isPrimaryKey: false,
                filedEn: "",
                filedZh: "",
                filedType: "varchar",
                filedLength: "255",
                precision: 0,
                isDefault: false
            })
        },
		submitForm() {
            console.log("🚀 ~ this.metalist:", this.metalist)
        },
        /**
         * @description: 保存字段
         * @param {*} value 字段值
         * @param {*} index 索引
         * @param {*} prop  字段属性
         * @return {*}
         */
        save(value, index, prop) {
            this.metalist[index][prop] = value;
        },
        /**
         * @description: 删除字段
         * @param {*} row
         * @return {*}
         */
        handleFiledDelete(row) {

        }
	},
};
</script>
<style lang="scss" scoped>
.mainDialog {
    ::v-deep .el-dialog__body {
        padding: 5px 20px !important;
        height: calc(100vh - 120px);
        overflow-y: auto;
    }
    .btn-series {
        margin-bottom: 10px;
    }
}
</style>
