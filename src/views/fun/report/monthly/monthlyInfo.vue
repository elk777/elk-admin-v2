<template>
	<!-- 周报/月报新增: 单个内容 -->
	<div class="monthlyInfo">
		<!-- 1_ S 左侧标签页 -->
		<a-tabs style="height: 100vh" tab-position="left" @change="callback" v-model="defaultTitle">
			<a-tab-pane v-for="item in tabList" :key="item.id" :tab="item.name">
				<!-- 安全管理状态 -->
				<div class="monthlyInfo_manage" v-show="defaultTitle == 1">
					<a-button class="monthlyInfo_btn" @click="saveMonthly('manage')">保存</a-button>
					<!-- <a-button @click="handelCompile" >编辑</a-button> -->
					<editable-cell
						:columns="columnManage"
						v-if="manageShow"
						:ref="item.refName + 'Ref'"
						:handData="manageData"
						:editList="editList"
						:monType="0"
						@setManagData="setManagData"
						:isManNull="isManNull"
						:radioVal="radioVal"
						:defaultTitle="defaultTitle"
						:dateval="dateval"
					></editable-cell>
					<div class="monthlyInfo_manage_describe">
						<div class="monthlyInfo_manage_describe_title">事件描述:</div>
						<a-textarea :rows="5" v-model="description"></a-textarea>
					</div>
				</div>
				<!-- :columns="columnManage"  -->
				<!-- 安全检查情况 -->
				<div class="monthlyInfo_examine" v-show="defaultTitle == 2">
					<div class="monthlyInfo_examine_title">
						<a-button class="monthlyInfo_btn" @click="saveMonthly('examine')">保存</a-button>
						<a-button @click="handleAdd('examine')">新增</a-button>
					</div>
					<editable-cell
						:loading="examineShow"
						v-if="examineShow"
						:ref="item.refName + 'safetyRef'"
						:columns="columns"
						:handData="examineData"
						@examineCheck="examineCheck"
						@setManagData="setManagData"
						@childrenDel="childrenDel"
						:editList="examinEditList"
						:monType="1"
					></editable-cell>
					<div style="height: 100vh" v-else>
						<a-spin class="spinLoading"></a-spin>
					</div>
				</div>
				<!-- 领导巡查情况 -->
				<div class="monthlyInfo_examine" v-show="defaultTitle == 3">
					<editable-cell
						v-if="patrolShow"
						:ref="item.refName + 'leadRef'"
						:columns="patrolColumns"
						:handData="patrolData"
						:editList="patrolEditList"
						:monType="1"
					></editable-cell>
					<div style="height: 100vh" v-else>
						<a-spin class="spinLoading"></a-spin>
					</div>
				</div>
				<!-- 高风险作业监督情况 -->
				<div class="monthlyInfo_examine" v-show="defaultTitle == 5">
					<div class="monthlyInfo_examine_title">
						<a-button class="monthlyInfo_btn" @click="saveMonthly('jobmonitor')">保存</a-button>
						<a-button @click="handleAdd('jobmonitor')">新增</a-button>
					</div>
					<editable-cell
						v-if="jobmonitorShow"
						:ref="item.refName + 'highRef'"
						:columns="jobmonitorColumns"
						:handData="jobmonitorData"
						:editList="jobmonitorEditList"
						:dateval="dateval"
						:monType="1"
						@childrenDel="childrenDel"
						@setManagData="setManagData"
					></editable-cell>
					<div style="height: 100vh" v-else>
						<a-spin class="spinLoading"></a-spin>
					</div>
				</div>
				<!-- 安全管理状态评价情况 限于月报-->
				<div class="monthlyInfo_evaluate monthlyInfo_evaluate_scroll" v-show="defaultTitle == 4">
					<div>
						<a-button style="margin-right: 15px" :loading="evaluateLoading" @click="saveMonthly('evaluate')"
							>保存</a-button
						>
						<span>{{ imgInfo }}</span>
						<!-- <a-button type="primary" :loading="evaluateUploading" @click="evaluateUpload()"> 上传 </a-button> -->
					</div>
					<div class="monthlyInfo_evaluate_title">优势:</div>
					<a-textarea :rows="10" v-model="evaluateData.advantage"></a-textarea>
					<div class="monthlyInfo_evaluate_title">短板:</div>
					<a-textarea :rows="10" v-model="evaluateData.inferiority"></a-textarea>
					<div class="monthlyInfo_evaluate_upload">
						<a-upload-dragger
							name="files"
							:multiple="true"
							:before-upload="evaluateBeforeUpload"
							:file-list="evaluateFileList"
							:remove="evaluateBeforeRemove"
						>
							<!--图标 -->
							<p class="ant-upload-drag-icon">
								<a-icon type="inbox" />
							</p>
							<p class="ant-upload-text">点击或文件拖拽进行上传!</p>
						</a-upload-dragger>
					</div>
				</div>
				<!-- 良好实践汇总 -->
				<div class="monthlyInfo_evaluate" v-show="defaultTitle == 7">
					<div class="monthlyInfo_examine_title">
						<a-button style="margin-bottom: 15px" @click="handleAdd('practice')">新增</a-button>
					</div>
					<editable-cell
						style="height: 342px"
						v-if="practiceShow"
						:ref="item.refName + 'practiceRef'"
						:columns="practiceColumns"
						:handData="practiceData"
						:editList="practiceEditList"
						@upLoad="upLoad"
						@cententEcho="handelEcho"
						:monType="2"
						:uploadShow="1"
					></editable-cell>
					<div v-if="textUploadShow" class="monthlyInfo_evaluate_edit">
						<!-- 富文本文字内容 -->
						<div class="mee_text">
							<a-textarea placeholder="请输入文字内容" v-model="practiceConent" rows="20"></a-textarea>
						</div>
						<!-- 图片上传 -->
						<div v-if="fileList.length < 1" class="mee_upload">
							<a-upload
								accept=".jpg,.jpeg,.png,.gif,.bmp,.JPG,.PBG,.GIF,.BMP"
								name="files"
								:multiple="false"
								:file-list="fileList"
								:before-upload="beforeUpload"
								:remove="handelRemove"
								@preview="handelPreview"
							>
								<div>
									<a-icon type="plus"></a-icon>
									<div class="ant-upload-text">上传图片</div>
								</div>
							</a-upload>
						</div>
						<div v-else class="mee_upload">
							<div class="to-img">
								<tokenImg :authSrc="previewImage"> </tokenImg>
								<div class="tokenimg-class">
									<a-icon
										class="close-icon"
										@click="(e) => (fileList = [])"
										:style="{ fontSize: '25px' }"
										type="close"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</a-tab-pane>
		</a-tabs>
		<!-- 1_ E 左侧标签页 -->
	</div>
</template>
<script>
import {
	getEvaluationList,
	setEvaluationAdd,
	EvaluationUpdate,
	getCheckList,
	setCheckAdd,
	checkUpdate,
	checkDel,
	setUnitAdd,
	setTypeAdd,
	setOtherAdd,
	setOtherUpdate,
	getOtherList,
	setSummaryAdd,
	getSummaryList,
	setSummaryUpdate,
	delSummary,
	patrolAdd,
	patrolList,
	patrolDelete,
	workList,
	workAdd,
	workEdit,
	workDel,
} from "@/api/monthly";
// import { baseHost } from '@/utils/request'
import EditableCell from "./EditableCell"; //引入修改输入框公共组件
import tokenImg from "./tokenImg";
import minin from "./monthlyMinin";
export default {
	mixins: [minin],
	components: {
		EditableCell,
		tokenImg,
	},
	props: ["dateValue", "radioVal"],
	created() {
		this.urlPrefix = "http://10.24.5.13:8999";
		this.getManagList();
		// 组件渲染之前-- 如果选择的是周报,只展示周报内容,否则全部展示
		if (this.radioVal == 1) {
			let tablist = [...this.tabList];
			this.tabList = tablist.filter((item, index) => {
				return item.type == 1;
			});
		}
	},
	methods: {
		//  安全管理状态数据格式处理
		managDataMkfs(mkfsdata, managedata) {
			// mkfsdata 请求得到的data,  managedata 前端模拟的14条基础data
			let list = [...managedata];
			list.forEach((item, index) => {
				let ind = mkfsdata.find((it, i) => item.normSort === it.normSort);
				let filterArr = mkfsdata.filter((it, i) => item.normSort === it.normSort);
				if (ind !== undefined) {
					let i = managedata.indexOf(item);
					managedata.splice(i, 1, ...filterArr);
				}
			});
			this.manageData = managedata;
		},
		// 请求 安全管理状态数据
		getManagList() {
			const manageData = [
				{
					id: null,
					key: 1,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "一级",
					norm: "重伤及以上事故",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 0,
				},
				{
					id: null,
					key: 2,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "二级",
					norm: "轻松事件",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 1,
				},
				{
					id: null,
					key: 3,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "二级",
					norm: "未遂事件",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 2,
				},
				{
					id: null,
					key: 4,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "红线违章",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 3,
				},
				{
					id: null,
					key: 5,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "高风险作业管控",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 4,
				},
				{
					id: null,
					key: 6,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "特种设备检验率",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 5,
				},
				{
					id: null,
					key: 7,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "特种人员持证率",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 6,
				},
				{
					id: null,
					key: 8,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "人员三级安全教育",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 7,
				},
				{
					id: null,
					key: 9,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "现场医疗处置事件",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 8,
				},
				{
					id: null,
					key: 10,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "隐患排查按期整改率",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 9,
				},
				{
					id: null,
					key: 11,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "关键隐患排查与治理",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 10,
				},
				{
					id: null,
					key: 12,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "一般以上施工方案及安全技术交底",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 11,
				},
				{
					id: null,
					key: 13,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "安全生产费用投入",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 12,
				},
				{
					id: null,
					key: 14,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "典型隐患数量",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 13,
				},
				{
					id: null,
					key: 15,
					engineField: "核电工程安全",
					finalSocre: 100,
					hierarchy: "三级",
					norm: "停工令(含口头停工)",
					questionDate: "",
					reasonDeduction: "",
					scoreDeduction: "",
					responsibleUnit: "",
					implementSituation: "",
					normSort: 14,
				},
			];
			manageData.forEach((item) => {
				item.questionDate = this.dateval[0];
			});
			let cahData = {
				questionDate: this.dateval,
			};

			// this.manageShow = true;
			// this.manageData = manageData;
			// console.log("this.manageData", manageData);
			// return;

			this.manageShow = false;
			getEvaluationList(cahData)
				.then((res) => {
					if (res.data.length !== 0) {
						this.managDataMkfs(res.data, manageData);
						this.manageShow = true;
						this.isManNull = false;
						return;
					}
					this.manageData = manageData;
					this.isManNull = true;
					this.manageShow = true;
				})
				.catch((err) => {
					this.manageData = manageData;
					this.manageData = true;
					Error(err);
				});
		},
		// 修改 安全管理状态数据 或者 安全检查情况
		setManagData(target) {
			const { type } = target;
			// console.log("此时的target",type)
			if (type[0] === "reasonDeduction") {
				EvaluationUpdate(target)
					.then((res) => {
						if (res.message === "success") {
							this.getManagList();
							this.$refs.manageRef[0].inputChange = false;
						}
					})
					.catch((err) => {
						Error(err);
						this.$refs.manageRef[0].inputChange = false;
					});
				return;
			}
			// 高风险作业监督情况
			if (type[0] == "workInfo") {
				workEdit(target)
					.then((res) => {
						if (res.message === "success") {
							this.getWorkList();
							this.$refs.jobmonitorhighRef[0].inputChange = false;
						}
					})
					.catch((err) => {
						Error(err);
						this.$refs.jobmonitorhighRef[0].inputChange = false;
					});
				return;
			}
			// 走的是安全检查情况
			checkUpdate(target)
				.then((res) => {
					if (res.message === "success") {
						this.getExamineList();
						this.$refs.examinesafetyRef[0].inputChange = false;
					}
				})
				.catch((err) => {
					Error(err);
					this.$refs.examinesafetyRef[0].inputChange = false;
				});
		},
		// 安全检查情况选择框修改
		examineCheck(dataObj) {
			let data = { ...dataObj };
			data.visibleFlag = dataObj.visibleFlag == "1" ? "0" : "1";
			checkUpdate(data).then((res) => {
				if (res.message === "success") {
					// this.getExamineList();
					this.$message.success(`修改成功`);
					// this.$refs.examinesafetyRef[0].inputChange = false;
				}
			});
		},
		// 请求 安全检查情况
		getExamineList() {
			let cahData = {
				checkDate: this.dateval,
			};
			this.examineShow = false;
			// this.examineShow = true;

			getCheckList(cahData)
				.then((res) => {
					if (res.data.length !== 0) {
						this.examineData = res.data;
						console.log("res",res);
					}
					this.examineShow = true;
				})
				.catch((err) => Error(err));
		},
		// 请求 安全管理状态评分情况
		getScoreList() {
			let data = {
				checkDate: this.dateval,
			};
			getOtherList(data)
				.then((res) => {
					if (res.data.length !== 0) {
						const { id, advantage, inferiority } = res.data.inputInfoList[0];
						this.evaluateData.id = id;
						this.evaluateData.advantage = advantage;
						this.evaluateData.inferiority = inferiority;
						res.data.infoImageList.length > 0
							? (this.imgInfo = "已上传过图片")
							: (this.imgInfo = "未上传图片");
						// this.evaluateData.hazardSource = res.data[0].hazardSource;
						// this.evaluateData.practiceSummary = res.data[0].practiceSummary;
						return;
					}
					this.evaluateData = {
						id: null,
						checkDate: null,
						advantage: "",
						inferiority: "",
					};
				})
				.catch((err) => Error(err));
		},
		// 请求 领导巡查情况
		getPatrolList() {
			let data = {
				beginDate: this.dateval,
			};
			this.patrolShow = false;
			patrolList(data)
				.then((res) => {
					if (res.code === 200) {
						this.patrolData = res.data;
					}
					this.patrolShow = true;
				})
				.catch((err) => {
					this.patrolShow = true;
					Error(err);
				});
		},
		// 请求 高风险作业监督情况
		getWorkList() {
			let data = {
				workDate: this.dateval,
			};
			this.jobmonitorShow = false;
			workList(data)
				.then((res) => {
					if (res.message == "success") {
						this.jobmonitorData = res.data;
					}
					this.jobmonitorShow = true;
				})
				.catch((err) => {
					this.jobmonitorShow = true;
					Error(err);
				});
		},
		// 删除 高风险作业监督情况   12.22
		childrenDel(target, edit) {
			const { id } = target;
			if (id != null) {
				switch (edit) {
					case "workInfo":
						workDel(id)
							.then((res) => {
								if (res.message == "success") {
									this.getWorkList();
								}
							})
							.catch((err) => {
								Error(err);
							});
						break;
					case "implementation":
						// 安全检查情况的删除  12.22
						checkDel(id)
							.then((res) => {
								if (res.message == "success") {
									this.getExamineList();
								}
							})
							.catch((err) => {
								Error(err);
							});
						break;
					default:
						break;
				}
			}
		},
		// 请求 良好实践汇总
		getSummaryList() {
			let data = {
				checkDate: this.dateval,
			};
			this.practiceShow = false;
			getSummaryList(data)
				.then((res) => {
					if (res.message == "success") {
						this.practiceData = res.data;
					}
					this.practiceShow = true;
				})
				.catch((err) => {
					Error(err);
					this.practiceShow = true;
				});
		},
		/* ---------------上传图片处理------------------------------------ */
		// 安全管理状态上传前处理
		evaluateBeforeUpload(file) {
			// console.log("上传前文件",file)
			this.evaluateFileList = [...this.evaluateFileList, file];
			return false;
		},
		evaluateBeforeRemove(file) {
			// console.log("删除文件",file)
			const index = this.evaluateFileList.indexOf(file);
			const newFileList = this.evaluateFileList.slice();
			newFileList.splice(index, 1);
			this.evaluateFileList = newFileList;
		},
		// 安全管理状态评价情况上传
		evaluateUpload() {
			const { evaluateFileList } = this;
			if (evaluateFileList.length == 0) {
				this.$message.info(`请先选择上传图片`);
				return;
			}
			this.evaluateUploading = true;
			setTimeout(() => {
				this.evaluateUploading = false;
			}, 1000);
		},
		// 清空内容
		clearConent() {
			this.fileList = [];
			this.practiceConent = "";
		},
		// 良好社会实践- 上传
		upLoad(uploadData) {
			const formdata = new FormData();
			formdata.append("checkDate", this.dateval[0]);
			formdata.append("practiceSummaryInfo", this.practiceConent);
			this.$refs.praxispracticeRef[0].uploading = true;
			// 如果内容没有输入,提示用户
			if (this.practiceConent === "") {
				this.$message.warning(`请输入文字内容`);
				this.$refs.praxispracticeRef[0].uploading = false;
				return;
			}
			// 一个走的新增一个走的修改
			if (uploadData.id != null) {
				// 修改上传
				// console.log("此时的type:",this.fileList)
				if (this.fileList.length === 0) {
					formdata.append("file", null);
					formdata.append("imgUrl", null);
				} else {
					formdata.append("file", this.fileList[0].type ? this.fileList[0] : null);
					formdata.append(
						"imgUrl",
						this.fileList[0].type ? null : this.fileList[0].url.match(/8999(\S*)/)[1]
					);
				}
				formdata.append("id", uploadData.id);
				setSummaryUpdate(formdata)
					.then((res) => {
						if (res.message === "success") {
							this.$refs.praxispracticeRef[0].uploading = false;
							this.$message.success(`修改成功`);
							this.$refs.praxispracticeRef[0].editingKey = "";
							this.getSummaryList();
							this.clearConent();
							this.textUploadShow = false;
						}
					})
					.catch((err) => {
						this.$refs.praxispracticeRef[0].uploading = false;
						Error(err);
					});
			} else {
				// 新增上传
				formdata.append("file", this.fileList[0]);
				setSummaryAdd(formdata)
					.then((res) => {
						if (res.message === "success") {
							this.$refs.praxispracticeRef[0].uploading = false;
							this.$message.success(`新增成功`);
							this.$refs.praxispracticeRef[0].editingKey = "";
							this.getSummaryList();
							this.clearConent();
							this.textUploadShow = false;
						}
					})
					.catch((err) => {
						this.$refs.praxispracticeRef[0].uploading = false;
						Error(err);
					});
			}
		},

		// 预览图标关闭按钮
		handelCancel(file) {
			// console.log("点击预览",file)
			this.previewVisible = false;
		},
		// 预览图标触发的事件
		handelPreview(file) {
			this.previewVisible = true;
		},
		// 上传前的处理
		beforeUpload(file) {
			// 进行图片的格式验证和大小验证,最后返回false 手动上传
			this.isUpload = true;
			let imgurl = URL.createObjectURL(file);
			this.previewImage = imgurl;
			this.fileList = [...this.fileList, file];
			this.fileList[0].url = imgurl;
			return false;
		},
		// 点击移除前的回调
		handelRemove(file) {
			const index = this.fileList.indexOf(file);
			const newFileList = this.fileList.slice();
			newFileList.splice(index, 1);
			this.fileList = newFileList;
		},
		// 点击编辑得到良好实践汇总的内容
		handelEcho(val, hide, del) {
			if (del) {
				// 代表点击删除的按钮
				delSummary(val.id).then((res) => {
					if (res.message === "success") {
						this.clearConent();
						this.textUploadShow = false;
						this.$message.success("删除成功");
						// this.getSummaryList()
					}
				});
				return;
			}
			this.textUploadShow = hide;
			if (val.id !== null) {
				// 这是上传成功之后回显图片
				this.practiceConent = val.practiceSummaryInfo;
				this.fileList = [];
				if (val.imgUrl !== null) {
					let obj = {
						uid: "-1",
						name: "1.png",
						status: "done",
						url: this.urlPrefix + val.imgUrl,
					};
					// console.log("path",this.fileList)
					this.fileList.push(obj);
					this.previewImage = obj.url;
				}
			}
		},

		/* ---------------------------------------------------------------- */
		// 统一新增更新手动输入内容
		unifyUpdateIn(data, id) {
			const formdata = new FormData();
			if (data.files.length > 0) {
				data.files.forEach((item, index) => {
					formdata.append("files", data.files[index]);
				});
			}
			// formdata.append('files',data.files)
			// formdata.append('otherInfo',JSON.stringify(data.otherInfo))
			formdata.append("advantage", data.otherInfo.advantage);
			formdata.append("inferiority", data.otherInfo.inferiority);
			formdata.append("checkDate", data.otherInfo.checkDate);
			this.evaluateLoading = true;
			if (id == null || id == undefined) {
				// 新增
				delete data.otherInfo.id;
				setOtherAdd(formdata)
					.then((res) => {
						if (res.message === "success") {
							this.evaluateLoading = false;
							this.$message.success("保存成功");
							this.evaluateFileList = [];
							this.getScoreList();
						}
					})
					.catch((err) => {
						Error(err);
						this.evaluateLoading = false;
					});
				return;
			}
			// 走修改
			formdata.append("id", data.otherInfo.id);
			setOtherUpdate(formdata)
				.then((res) => {
					if (res.message === "success") {
						this.evaluateLoading = false;
						this.evaluateFileList = [];
						this.$message.success("保存成功");
						this.getScoreList();
					}
				})
				.catch((err) => {
					Error(err);
					this.evaluateLoading = false;
				});
		},
		/*     unifyUpdateIn(id,addData,editData) {
            if( id == null ){
                // 新增
                setOtherAdd(addData).then( res => {
                    if( res.message === 'success') {
                        this.$message.success('保存成功');
                    }
                }).catch( err => Error(err))
                return
            }
            // 走修改
            setOtherUpdate(editData).then( res => {
                if( res.message === 'success') {
                    this.$message.success('保存成功');
                }
            }).catch( err => Error(err))
        }, */

		// 点击标签页
		callback(key) {
			switch (key) {
				case 1: // 安全管理状态
					this.getManagList();
					break;
				case 2: // 安全检查情况
					this.getExamineList();
					break;
				case 3: // 领导巡查情况
					this.getPatrolList();
					break;
				case 4: // 安全管理状态评价情况 -- 月
					this.getScoreList();
					break;
				case 5: // 高风险作业监督情况 -- 月/周
					this.getWorkList();
					break;
				case 7: // 良好实践汇总 -- 月
					this.getSummaryList();
					this.clearConent();
					this.textUploadShow = false;
					break;
				default:
					break;
			}
		},
		//  统一保存按钮 处理
		saveMonthly(type) {
			// practiceSummary hazardSource   evaluateFileList
			const {
				evaluateData: { id, advantage, inferiority },
				evaluateFileList,
			} = this;
			switch (type) {
				//  1_ 安全管理状态
				case "manage":
					// this.$refs.manageRef[0].save("",1)
					if (this.$refs.manageRef[0].changData.length !== 0) {
						// 实际走了新增
						let data = this.$refs.manageRef[0].changData;
						setEvaluationAdd(data)
							.then((res) => {
								this.$message.success("保存成功");
								this.getManagList();
								this.$refs.manageRef[0].changData = [];
							})
							.catch((err) => {
								Error(err);
								this.manageShow = true;
							});
						return;
					}
					this.$message.success("保存成功");
					break;
				//  2_ 安全检查情况
				case "examine":
					// this.$refs.examinesafetyRef[0].save("",1)
					if (this.$refs.examinesafetyRef[0].changData.length !== 0) {
						let exaData = this.$refs.examinesafetyRef[0].changData;
						setCheckAdd(exaData)
							.then((res) => {
								if (res.message === "success") {
									this.$message.success("保存成功");
									this.getExamineList();
									this.$refs.examinesafetyRef[0].changData = [];
								}
							})
							.catch((err) => {
								Error(err);
								this.examineShow = true;
							});
						return;
					}
					this.$message.success("保存成功");
					break;
				//  5_ 高风险作业监督情况 -- 月/周
				case "jobmonitor":
					if (this.$refs.jobmonitorhighRef[0].changData.length !== 0) {
						let exaData = this.$refs.jobmonitorhighRef[0].changData;
						workAdd(exaData)
							.then((res) => {
								if (res.message === "success") {
									this.$message.success("保存成功");
									this.getWorkList();
									this.$refs.jobmonitorhighRef[0].changData = [];
								}
							})
							.catch((err) => {
								Error(err);
								this.jobmonitorShow = true;
							});
						return;
					}
					this.$message.success("保存成功");
					break;
				//  4_ 安全管理状态评价情况 -- 月
				case "evaluate":
					// let evaluateadd  = { advantage,inferiority,checkDate: this.dateval[0] };
					// let evaluateedit  = { id, advantage,inferiority,checkDate: this.dateval[0] };
					let data = {
						files: this.evaluateFileList,
						otherInfo: {
							id,
							advantage,
							inferiority,
							checkDate: this.dateval[0],
						},
					};
					// this.unifyUpdateIn(id,evaluateadd,evaluateedit)
					this.unifyUpdateIn(data, id);
					// 保存并上传图片
					break;
				default:
					break;
			}
		},
		//  安全管理状态  统一编辑按钮 处理
		handelCompile() {
			this.$refs.manageRef[0].edit("", 1);
		},
		/* -------------------- S  安全检查情况相关操作------------------------------------------------------ */
		// 点击新增表格内容
		handleAdd(type) {
			switch (type) {
				case "examine": //安全检查情况
					this.$refs.examinesafetyRef[0].handleAdd();
					break;
				case "jobmonitor": //高风险作业监督情况
					this.$refs.jobmonitorhighRef[0].handleAdd("jobmonitor");
					break;
				case "practice": //良好实践汇总
					this.$refs.praxispracticeRef[0].handleAdd("practice");
					this.textUploadShow = true;
					break;
				default:
					break;
			}
		},
	},
};
</script>
<style scoped lang="scss">
.monthlyInfo {
	height: 100vh;
	& ::v-deep .ant-table-selection {
		display: none;
	}
	// 安全管理状态
	.monthlyInfo_btn {
		margin: 0px 15px 15px 0px;
	}
	.monthlyInfo_manage {
		height: 85vh;
		overflow-y: scroll;
		.monthlyInfo_manage_describe {
			.monthlyInfo_manage_describe_title {
				margin: 15px 0px 8px;
				font-weight: 600;
			}
		}
	}
	// 安全检查情况
	.monthlyInfo_examine {
		position: relative;
		.spinLoading {
			position: absolute;
			top: 30vh;
			left: 85vh;
			z-index: 999;
		}
	}
	// 安全管理状态评价情况
	.monthlyInfo_evaluate {
		.monthlyInfo_evaluate_upload {
			margin: 10px 0px 0px;
			& ::v-deep .ant-upload {
				width: 500px;
				height: 285px;
			}
			& ::v-deep .ant-upload-list {
				width: 350px;
				height: 285px;
				overflow-y: scroll;
			}
			span {
				display: flex;
			}
		}
		// 良好实践汇总编辑文本
		.monthlyInfo_evaluate_edit {
			display: flex;
			margin-top: 1vh;
			height: 100%;
			.mee_text {
				flex: 1;
			}
			.mee_upload {
				position: relative;
				flex: 1;
				margin-left: 10px;
				width: 100%;
				border: 1px #1890ff solid;
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				.tokenimg-class {
					position: absolute;
					display: none;
					top: 0px;
					height: 0px;
					width: 100%;
					height: 100%;
					background: rgba(0, 0, 0, 0.4);
					// z-index: 200;
				}
				.to-img {
					// z-index: 100;
				}
				.to-img:hover .tokenimg-class {
					display: block;
				}
				& ::v-deep .ant-upload.ant-upload-select-picture-card {
					width: 100%;
					height: 100%;
				}
				& ::v-deep .ant-upload-list-picture-card .ant-upload-list-item {
					width: 100%;
					height: 100%;
				}
				// .mee_upload_btn{
				//     flex:1;
				//     width: 100%;
				//     height: 100%;
				// }
				.close-icon {
					position: absolute;
					top: 20vh;
					left: 42vh;
				}
			}
		}
	}
	// .monthlyInfo_evaluate_scroll{
	//     overflow-y: scroll;
	//     height: 92vh;
	// }
}
</style>
