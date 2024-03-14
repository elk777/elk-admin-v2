import axios from "@/libs/utils/request";
const api = {
	reportList: "/report/list", //获取报告列表
	reportDownload: "/report/download/",
	reportRemove: "/report/remove/", //单个报告删除
	evaluationList: "/evaluation/list", //获取管理状态
	evaluationAdd: "/evaluation/add", //新增管理状态
	evaluationEdit: "/evaluation/edit", //修改管理状态
	checkList: "/check/list", //获取检查情况
	checkAdd: "/check/add", //新增检查情况
	checkEdit: "/check/edit", //修改检查情况
	checkDel: "/check/remove/", //删除安全检查情况  ---- 12.22
	genMonthReport: "/gen/monthreport", //生成周报接口
	genWeekReport: "/gen/weekreport", //生成月报接口
	addUnit: "/injuredept/add", //新增轻微伤统计分析情况---单位接口
	listUnit: "/injuredept/list", //获取轻微伤统计分析情况---单位接口
	addType: "/injuretype/add", //新增轻微伤统计分析情况---受伤类型接口
	listType: "/injuretype/list", //获取轻微伤统计分析情况---受伤类型接口
	otherAdd: "/other/add", //新增 安全管理状态情况信息
	otherUpdate: "/other/edit",
	otherList: "/other/list",
	summaryAdd: "/summary/add", //良好实践汇总
	summaryList: "/summary/list",
	summaryUpdate: "/summary/update",
	summaryDelete: "/summary/delete/",
	patrolAdd: "/patrol/add", //领导巡查情况
	patrolList: "/patrol/list", //领导巡查情况
	patrolRemove: "/patrol/remove/", //领导巡查情况
	workList: "/work", //获取高风险作业监督
	workAdd: "/work", //获取高风险作业监督
	workEdit: "/work", //获取高风险作业监督
	workDel: "/work/remove/", //获取高风险作业监督
};
// 报告列表请求
export function reportList(parameter) {
	return axios({
		url: api.reportList,
		method: "get",
		params: parameter,
	});
}
// 单个报告下载
export function reportDownload(id) {
	return axios({
		url: api.reportDownload + id,
		method: "get",
		responseType: "blob",
	});
}
//  单个报告删除
export function reportRemove(ids) {
	return axios({
		url: api.reportRemove + ids,
		method: "delete",
	});
}
//  1.1_获取管理状态
export function getEvaluationList(parameter) {
	return axios({
		url: api.evaluationList,
		method: "get",
		baseUrl: "mock",  // 2024 0306新增
		params: parameter,
	});
}
//  1.2_新增管理状态
export function setEvaluationAdd(data) {
	return axios({
		url: api.evaluationAdd,
		method: "post",
		data,
	});
}
//  1.3_修改安全管理状态
export function EvaluationUpdate(data) {
	return axios({
		url: api.evaluationEdit,
		method: "put",
		data,
	});
}
//  2.1_获取安全检查情况
export function getCheckList(parameter) {
	return axios({
		url: api.checkList,
		method: "get",
		baseUrl: "mock",  // 2024 0306新增
		params: parameter,
	});
}
//  2.2_新增安全检查情况
export function setCheckAdd(data) {
	return axios({
		url: api.checkAdd,
		method: "post",
		data,
	});
}
//  2.3_修改安全检查情况
export function checkUpdate(data) {
	return axios({
		url: api.checkEdit,
		method: "put",
		data,
	});
}
//  2.4_删除安全检查情况 12.22
export function checkDel(id) {
	return axios({
		url: api.checkDel + id,
		method: "delete",
	});
}
// 3.1_生成周报
export function setGenWeekReport(parameter) {
	return axios({
		url: api.genWeekReport,
		method: "get",
		params: parameter,
		responseType: "blob",
	});
}
// 3.2_生成月报
export function setGenMonthReport(parameter) {
	return axios({
		url: api.genMonthReport,
		method: "get",
		params: parameter,
		responseType: "blob",
	});
}
// 4.1_轻微伤统计分析情况---单位---新增
export function setUnitAdd(data) {
	return axios({
		url: api.addUnit,
		method: "post",
		data,
	});
}
// 4.2_轻微伤统计分析情况---单位---获取
export function getUnitList(parameter) {
	return axios({
		url: api.listUnit,
		method: "get",
		params: parameter,
	});
}
// 5.1_轻微伤统计分析情况---受伤类型---新增
export function setTypeAdd(data) {
	return axios({
		url: api.addType,
		method: "post",
		data,
	});
}
// 5.2_轻微伤统计分析情况---受伤类型---获取
export function getTypeList(parameter) {
	return axios({
		url: api.listType,
		method: "get",
		params: parameter,
	});
}
// 6.1安全管理状态评分情况--新增
export function setOtherAdd(data) {
	return axios({
		url: api.otherAdd,
		method: "post",
		headers: {
			"content-Type": "multipart/form-data",
		},
		data,
	});
}
// 6.1安全管理状态评分情况--修改
export function setOtherUpdate(data) {
	return axios({
		url: api.otherUpdate,
		method: "put",
		headers: {
			"content-Type": "multipart/form-data",
		},
		data,
	});
}
// 6.1安全管理状态评分情况--查找
export function getOtherList(parameter) {
	return axios({
		url: api.otherList,
		method: "get",
		params: parameter,
	});
}
// 7_1 良好实践汇总--新增
export function setSummaryAdd(data) {
	return axios({
		url: api.summaryAdd,
		method: "post",
		headers: {
			"content-Type": "multipart/form-data",
		},
		data,
	});
}
// 7_2 良好实践汇总--查看
export function getSummaryList(parameter) {
	return axios({
		url: api.summaryList,
		method: "get",
		params: parameter,
	});
}
// 7_3 良好实践汇总--更新
export function setSummaryUpdate(data) {
	return axios({
		url: api.summaryUpdate,
		method: "put",
		headers: {
			"content-Type": "multipart/form-data",
		},
		data,
	});
}
// 7_4 良好实践汇总--删除
export function delSummary(id) {
	return axios({
		url: api.summaryDelete + id,
		method: "delete",
	});
}
// 8_1 领导巡查情况--新增 修改
export function patrolAdd(data) {
	return axios({
		url: api.patrolAdd,
		method: "post",
		data,
	});
}
// 8_1 领导巡查情况--获取
export function patrolList(parameter) {
	return axios({
		url: api.patrolList,
		method: "get",
		baseUrl: "mock",  // 2024 0306新增
		params: parameter,
	});
}
// 8_1 领导巡查情况--删除
export function patrolDelete(id) {
	return axios({
		url: api.patrolRemove + id,
		method: "delete",
	});
}

// 9_1 高风险作业监督--新增
export function workAdd(data) {
	return axios({
		url: api.workAdd,
		method: "post",
		data,
	});
}
// 9_2 高风险作业监督--修改
export function workEdit(data) {
	return axios({
		url: api.workEdit,
		method: "put",
		data,
	});
}
// 9.3 高风险作业监督--删除
export function workDel(id) {
	return axios({
		url: api.workDel + id,
		method: "delete",
	});
}
// 9.4 高风险作业监督--获取
export function workList(parameter) {
	return axios({
		url: api.workList,
		method: "get",
		params: parameter,
	});
}
