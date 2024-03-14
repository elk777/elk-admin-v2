<template>
	<!-- 公共table组件 -->
	<div class="editable-cell">
		<!-- selectenRowKeys:selectenRowKeys,onChange:onSelectChange -->
		<!-- :row-selection=" editList[0] ==  'implementation' ? rowSelection : null"   12.22 -->
		<a-table
			:rowKey="(record, index) => (editList[0] == 'implementation' ? record.id : index)"
			:columns="managecolumns.length == 0 ? columnManage : managecolumns"
			:data-source="data"
			bordered
			size="small"
			:pagination="false"
			:scroll="scrollval"
		>
			<template v-for="col in editList" :slot="col" slot-scope="text, record, index">
				<div>
					<div v-if="record.editable && !uploadShow" style="position: relative">
						<a-input
							v-if="col !== 'checkDate' && col !== 'imgUrl' && col !== 'beginDate'"
							:value="text"
							@change="(e) => handelChange(e.target.value, record.id, col, 0, index)"
						/>
						<a-date-picker
							v-else
							@change="(date, dateString) => handelChange(dateString, index, col, 1)"
							placeholder="请选择检查日期"
						/>
					</div>
					<template v-else>
						{{ text }}
					</template>
				</div>
			</template>
			<template slot="operation" slot-scope="text, record, index">
				<div>
					<span v-if="record.editable">
						<a
							style="margin-right: 8px"
							:class="uploading ? 'cliUpload' : ''"
							@click="() => save(record.id, '', index)"
						>
							<a-icon v-if="uploading" type="loading" />确定
						</a>
						<a-popconfirm
							v-if="montype !== 0"
							title="是否删除当前行的数据？"
							:class="uploading ? 'cliUpload' : ''"
							@confirm="() => cancel(record.id, index)"
						>
							<a>删除</a>
						</a-popconfirm>
					</span>
					<span v-else>
						<a :disabled="editingKey !== ''" @click="() => edit(record.id, '', index, record)">编辑</a>
						<a
							v-if="defaultTitle && radioVal === 2"
							style="margin-left: 8px"
							:disabled="editingKey !== ''"
							@click="() => add(record, '', index)"
							>新增</a
						>
					</span>
				</div>
			</template>
		</a-table>
	</div>
</template>
<script>
// import { EvaluationUpdate }  from "@/api/monthly"

export default {
	props: [
		"columns",
		"handData",
		"editList",
		"monType",
		"uploadShow",
		"defaultTitle",
		"radioVal",
		"isManNull",
		"dateval",
	],
	data() {
		return {
			data: this.handData,
			montype: this.monType,
			changData: [],
			managecolumns: this.columns,
			editingKey: "",
			count: 2, //问题描述个数
			scrollval: {},
			uploading: false,
			columnManage: [
				{
					title: "领域",
					dataIndex: "engineField",
					width: 120,
					align: "center",
					customRender: (value, row, index) => {
						const obj = { children: value, attrs: [] };
						if (index === 0) {
							obj.attrs.rowSpan = this.data.length; //这个是个动态的数字
						}
						if (index > 0) {
							obj.attrs.rowSpan = 0;
						}
						return obj;
					},
				},
				{
					title: "最终得分",
					dataIndex: "finalSocre",
					width: 85,
					align: "center",
					customRender: (value, row, index) => {
						const obj = { children: value, attrs: [] };
						if (index === 0) {
							obj.attrs.rowSpan = this.data.length; //这个是个动态的数字
						}
						if (index > 0) {
							obj.attrs.rowSpan = 0;
						}
						return obj;
					},
				},
				{
					title: "层级",
					dataIndex: "hierarchy",
					width: 85,
					align: "center",
					customRender: (value, row, index) => {
						const obj = { children: value, attrs: [] };
						if (index === 0) {
							// 表示一级的第一个
							obj.attrs.rowSpan = this.hierarchyObj.oneNum; //这个是个动态的数字
						}
						if (index === this.hierarchyObj.oneNum) {
							// 表示二级的第一个
							obj.attrs.rowSpan = this.hierarchyObj.twoNum; //这个是个动态的数字
						}
						if (index === this.hierarchyObj.oneNum + this.hierarchyObj.twoNum) {
							// 表示三级的第一个
							obj.attrs.rowSpan = this.hierarchyObj.threeNum; //这个是个动态的数字
						}
						if (
							index !== 0 &&
							index !== this.hierarchyObj.oneNum &&
							index !== this.hierarchyObj.oneNum + this.hierarchyObj.twoNum
						) {
							obj.attrs.rowSpan = 0;
						}
						return obj;
					},
				},
				{
					title: "指标",
					dataIndex: "norm",
					width: 250,
					align: "center",
					customRender: (value, row, index) => {
						console.log("指标行", row);
						// 返回一个对象, value表示指标内容, rowSpan 表示当前列合并数值
						return {
							children: `${value}`,
							attrs: {
								rowSpan: row.normRowSpan,
							},
						};
					},
				},
				{
					title: "扣分事由",
					dataIndex: "reasonDeduction",
					align: "center",
					scopedSlots: { customRender: "reasonDeduction" },
				},
				{
					title: "扣分数值",
					dataIndex: "scoreDeduction",
					width: 85,
					align: "center",
					scopedSlots: { customRender: "scoreDeduction" },
				},
				{
					title: "责任单位",
					dataIndex: "responsibleUnit",
					width: 125,
					align: "center",
					scopedSlots: { customRender: "responsibleUnit" },
				},
				{
					title: "落实情况",
					dataIndex: "implementSituation",
					width: 125,
					align: "center",
					scopedSlots: { customRender: "implementSituation" },
				},
				{
					title: "操作",
					dataIndex: "operation",
					width: 150,
					align: "center",
					scopedSlots: { customRender: "operation" },
				},
			],
			hierarchyObj: {
				oneNum: null,
				twoNum: null,
				threeNum: null,
			},
			inputChange: false,
			selectenRowKeys: [],
		};
	},
	created() {
		console.log(this.columns);
		// 只有当时安全管理状态的数据过来,才调用这两个函数
		if (this.managecolumns.length == 0) {
			this.managDataBmp(this.data);
			this.managDataNorm("norm");
		}
		// 去掉安全检查情况多选框内容 --  12.22
		// if( this.editList[0] ==  'implementation' ) {
		//     let data = [...this.data]
		//     let selectenRowKeys = this.selectenRowKeys
		//     data.map( (item,index) => {
		//        item.visibleFlag == '1' ? selectenRowKeys.push(item.id) : null
		//     })
		//     this.selectenRowKeys = selectenRowKeys
		// }
		if (this.monType === 0) {
			this.scrollval = {};
		}
		if (this.monType === 1) {
			this.scrollval = { y: 720 };
		}
		if (this.monType === 2) {
			this.scrollval = { y: 300 };
		}
	},
	// computed: {
	//     rowSelection() {
	//         const { selectenRowKeys } = this;
	//         return {
	//             selectenRowKeys,
	//             onChange:this.onSelectChange,
	//             onSelect:this.onSelect,
	//             hideDefaultSelections: true,
	//             getCheckboxProps: record => {
	//                 return {
	//                     props: {
	//                         defaultChecked: selectenRowKeys.includes(record.id)
	//                     }
	//                 }
	//             }
	//         }
	//     }
	// },
	methods: {
		// 表格 多选框 手动选择 去掉12.22
		// onSelect(record,selected,rows,event) {
		//     this.$emit('examineCheck',record)
		// },
		// 表格 多选框 选中变化  去掉12.22
		// onSelectChange(keys,rows) {
		//     let selectenRowKeys = []
		//     rows.map( (item,index) => {
		//         selectenRowKeys.push(item.id)
		//     })
		//     this.selectenRowKeys = selectenRowKeys
		// },
		// 安全管理状态数据: 层级合并的方法
		managDataBmp(data) {
			this.hierarchyObj.oneNum = data.filter((item) => item.hierarchy === "一级").length;
			this.hierarchyObj.twoNum = data.filter((item) => item.hierarchy === "二级").length;
			this.hierarchyObj.threeNum = data.filter((item) => item.hierarchy === "三级").length;
		},
		// 安全管理状态数据: 指标合并的方法
		managDataNorm(key) {
			let list = [...this.data];
			list.forEach((item) => delete item.normRowSpan);
			let _num = []; //将相同指标的数据放到一起处理
			let indexList = []; //相同数据的下标数组
			for (let i = 0; i < list.length; i++) {
				let downKey = list[i + 1] ? list[i + 1][key] : "";
				// 当前数据和下条数据不同时,将当前数据添加到_num中,并进行处理
				if (list[i][key] !== downKey) {
					_num.push(list[i]);
					indexList.push(i);
					// 遍历相同数组的数组,动态添加 合并的列数值
					for (let j = 0; j < _num.length; j++) {
						// 第一条数据设置要合并的列数值
						list[indexList[0]][`${key}RowSpan`] = _num.length;
						// 其他的设置为0
						if (j !== 0) {
							list[indexList[j]][`${key}RowSpan`] = 0;
						}
					}
					_num = [];
					indexList = [];
					continue;
				} else {
					_num.push(list[i]);
					indexList.push(i);
				}
			}
			this.data = list;
		},
		// 最终得分的增减
		controlScroe() {
			const data = [...this.data];
			let score = data.reduce((prev, cur, index) => {
				return prev + Number(cur.scoreDeduction);
			}, 0);
			data.forEach((item) => (item.finalSocre = 100 - score));
		},
		//  安全管理状态新增
		add(id, val, index) {

			const data = [...this.data];
			let target = data.find((item, i) => i === index);
			const { engineField, finalSocre, hierarchy, norm, questionDate, normSort } = target;
			let item = {
				engineField,
				finalSocre,
				hierarchy,
				norm,
				normSort,
				questionDate: this.dateval[0],
				implementSituation: "",
				reasonDeduction: "",
				responsibleUnit: "",
				scoreDeduction: null,
				id: null,
			};
			item.editable = true;
			data.splice(index + 1, 0, item);
			this.data = data;
			// this.editingKey = '1';
			console.log("新增的data",data);
			this.managDataBmp(data);
			this.managDataNorm("norm");
		},
		//  新增一行
		handleAdd(type) {
			const { data, count } = this;
			// 新增良好实践汇总
			if (this.uploadShow) {
				if (data.length > 0) {
					let edit = data.find((item) => item.editable === true);
					if (data[data.length - 1].id === null || edit) {
						this.$message.info(`请先完成当前操作`);
						return;
					}
				}
			}
			const newData = {};
			switch (type) {
				case "practice":
					newData.id = null;
					newData.checkDate = null;
					newData.practiceSummaryInfo = null;
					newData.imgUrl = null;
					break;
				case "jobmonitor":
					newData.id = null;
					newData.isWork = null;
					newData.workDate = this.dateval[0]; //时间
					newData.workDept = null;
					newData.workInfo = null;
					newData.workQuestion = null;
					newData.workType = null;
					break;
				default:
					newData.id = null;
					newData.questionDescription = null;
					newData.checkDate = null;
					newData.implementation = null;
					newData.visibleFlag = 1;
					break;
			}
			newData.editable = true;
			this.editingKey = "1";
			this.data = [...data, newData];
			// console.log("newdata",newData)
			// console.log("此时的data",this.data)
		},
		//  修改行内容,输入input框
		handelChange(value, key, column, type, index) {
			// console.log( value, key, column,type )
			const data = [...this.data];
			this.inputChange = true;
			if (type) {
				// 走的是文本框
				const cahTarget = data.find((item, index) => key === index);
				if (cahTarget) {
					cahTarget[column] = value;
					this.data = data;
				}
				return;
			}
			// 走的是时间选择器
			let target = {};
			key == null
				? (target = data.find((item, i) => i === index))
				: (target = data.find((item) => key === item.id));
			if (target) {
				column === "pointsNumber" || column === "num"
					? (target[column] = value.replace(/[^0-9.]/g, ""))
					: (target[column] = value);
				this.data = data;
			}
		},
		// 点击修改按钮
		edit(key, editState, index, record) {
			const data = [...this.data];
			if (record.norm !== undefined) {
				// 走判断
				let filterData = data.filter((item) => {
					return item.norm === record.norm;
				});
				this.montype = filterData.length > 1 ? 1 : 0;
			}
			let target = {};
			this.editingKey = key;
			key == null
				? (target = data.find((item, i) => i === index))
				: (target = data.find((item) => key === item.id));
			key == null ? (this.editingKey = index) : (this.editingKey = key);
			// editState为1,统一进入编辑状态
			if (editState) {
				data.forEach((item) => {
					item.editable = true;
				});
				this.data = [...data];
				return;
			}
			if (target) {
				// // 如果是良好实践汇总
				if (this.uploadShow) {
					// 将当前内容发送给父组件回显
					this.$emit("cententEcho", target, 1);
				}
				target.editable = true;
				this.data = [...data];
			}
		},
		// 点击确定按钮
		save(key, editState, index) {
			const data = [...this.data];
			const cacheData = [...this.data.map((item) => ({ ...item }))];
			let target = {};
			let cacheTarget = {};
			if (key == null) {
				target = data.find((item, i) => i === index);
				cacheTarget = cacheData.find((item, i) => i === index);
			} else {
				target = data.find((item) => key === item.id);
				cacheTarget = cacheData.find((item) => key === item.id);
			}
			// 如果为 1 ,点击了确定按钮，统一进入非编辑状态
			if (editState) {
				data.forEach((item) => {
					delete item.editable;
				});
				this.data = [...data];
				this.controlScroe();
				this.editingKey = "";
				return;
			}
			// 这个是非统一处理
			if (target && cacheTarget) {
				// 表示走良好社会实践:上传
				if (this.uploadShow) {
					this.$emit("upLoad", cacheTarget);
					return;
				}
				//  表示走安全管理状态 或者 安全检查情况
				if (
					this.managecolumns.length === 0 ||
					this.editList[2] === "questionDescription" ||
					this.editList[2] === "workDept"
				) {
					// data数据有值,才发修改的数据 ,表示这条数据修改过  !this.isManNull
					if (target.id == null && this.inputChange) {
						// 走新增
						this.changData.push(cacheTarget);
					}
					if (target.id !== null && this.inputChange) {
						// 走修改
						target.type = this.editList;
						this.$emit("setManagData", target);
					}
					delete cacheTarget.editable;
					delete target.editable;
					this.data = [...cacheData];
					this.editingKey = "";
					this.controlScroe();
					return;
				}
				// 表示走其他
				delete cacheTarget.editable;
				this.data = [...cacheData];
				this.editingKey = "";
			}
		},
		// 点击删除按钮
		cancel(key, index) {
			const data = [...this.data];
			const cacheData = [...this.data.map((item) => ({ ...item }))];
			let target = {};
			let cahtarget = {};
			key == null
				? (target = data.find((item, i) => i === index))
				: (target = data.find((item) => key === item.id));
			key == null
				? (cahtarget = cacheData.find((item, i) => i === index))
				: (cahtarget = cacheData.find((item) => key === item.id));
			this.editingKey = "";
			// console.log("点击了删除:",key,index,target,cahtarget)
			if (target) {
				Object.assign(target, cahtarget);
				delete target.editable;
				this.data.splice(
					data.findIndex((item, i) => i === index),
					1
				);
				// 如果是安全管理状态需要调用合并方法
				if (this.managecolumns.length == 0) {
					this.managDataBmp(this.data);
					this.managDataNorm("norm");
				}
				// // 如果是良好实践汇总
				if (this.uploadShow) {
					// 将当前内容发送给父组件回显
					this.$emit("cententEcho", target, 1, 1);
					return;
				}
				// 将当前内容发送给父组件回显
				this.$emit("childrenDel", target, this.editList[0]);
			}
			// console.log("删除后的data:",this.data)
		},
	},
};
</script>
<style scoped lang="scss">
.editable-cell {
	position: relative;
	& ::v-deep .ant-upload-list {
		position: absolute;
		top: -4px;
		left: 120px;
	}
	& ::v-deep .ant-table tr td {
		// max-width: 300px;
		white-space: wrap;
		overflow: hidden;
		text-overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
	}
	& ::v-deep .ant-upload-list-item .anticon-close {
		position: absolute;
		top: 6px;
		right: -14px;
		font-size: 14px;
	}
	.cliUpload {
		pointer-events: none;
		cursor: default;
		color: gray;
	}
}
</style>
