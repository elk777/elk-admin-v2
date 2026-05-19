export default {
    data() {
        return {
            defaultTitle: 1,
            dateval: typeof this.dateValue === 'string' ? [...[this.dateValue]] : this.dateValue,
            tabList: [
                { id:1, name:"安全管理状态", type:1,refName:"manage"},
                { id:2, name:"安全检查情况", type:1,refName:"examine"},
                { id:3, name:"领导巡查情况", type:2,refName:"patrol"},
                { id:5, name:"高风险作业监督情况", type:1,refName:"jobmonitor"},
                { id:4, name:"安全管理状态评价情况", type:2,refName:"evaluate"},
                { id:7, name:"良好实践汇总", type:2,refName:"praxis"},
            ],
        /* --------------S 安全管理状态 ------------------- */
            columnManage:[],
            manageData:[],
            manageShow:false,  
            isManNull: false,
            editList:["reasonDeduction","scoreDeduction","responsibleUnit","implementSituation"],    
            description:"无",
            /* --------------- S 安全检查情况 ------------------*/
            columns:[
                { title:"序号",dataIndex:"index",width:35, align:"center",customRender: (text, record, index) => `${index+1}` },
                { title:"安全检查情况",dataIndex:"questionDescription",width:700,scopedSlots:{ customRender: "questionDescription" } },
                { title:"检查日期",dataIndex:"checkDate",width:70,align:"center",scopedSlots:{ customRender: "checkDate" } },
                { title:"落实情况",dataIndex:"implementation",align:"center",width:70,scopedSlots:{ customRender: "implementation" } },
                { title:"操作",dataIndex:"operation",width:70,align:"center",scopedSlots:{ customRender: "operation" } },
            ],
            examineShow:false,
            examineData:[],      //安全检查情况数据
            examinEditList:['implementation', 'checkDate','questionDescription'],   
            editingKey:"",       //安全检查情况
            /* --------------- S 领导检查情况 ------------------*/
            patrolShow: false,
            patrolColumns: [
                { title:"序号",dataIndex:"index",width:35, align:"center",customRender: (text, record, index) => `${index+1}` },
                { title:"巡查领导",dataIndex:"leaderName",align:"center",width:75,scopedSlots:{ customRender: "leaderName" } }, 
                { title:"区域",dataIndex:"area",width:150,align:"center", scopedSlots:{ customRender: "area" } },
                { title:"处理时间",dataIndex:"beginDate",align:"center",width:75,scopedSlots:{ customRender: "beginDate" } }, 
                { title:"备注",dataIndex:"note",width:50, align:"center",width:75,scopedSlots:{ customRender: "note" } }, 
                // { title:"操作",dataIndex:"operation",width:50,align:"center",scopedSlots:{ customRender: "operation" } },
            ],
            patrolData: [],
            patrolEditList: ["area", "beginDate", "leaderName","note"],
            /* --------------- S 高风险作业监督情况 ------------------*/
            jobmonitorShow: false,
            jobmonitorColumns: [
                { title:"序号",dataIndex:"index",width:35, align:"center",customRender: (text, record, index) => `${index+1}` },
                { title:"内容",dataIndex:"workInfo",align:"center",width:75,scopedSlots:{ customRender: "workInfo" } }, 
                { title:"类型/等级",dataIndex:"workType",width:150,align:"center", scopedSlots:{ customRender: "workType" } },
                { title:"作业单位",dataIndex:"workDept",align:"center",width:75,scopedSlots:{ customRender: "workDept" } }, 
                { title:"监护人是否在现场履职",dataIndex:"isWork",width:50, align:"center",width:75,scopedSlots:{ customRender: "isWork" } }, 
                { title:"存在的问题",dataIndex:"workQuestion",width:50, align:"center",width:75,scopedSlots:{ customRender: "workQuestion" } }, 
                { title:"操作",dataIndex:"operation",width:50,align:"center",scopedSlots:{ customRender: "operation" } },
            ],
            jobmonitorData: [],
            jobmonitorEditList: ["workInfo", "workType", "workDept","isWork","workQuestion"],
            /* --------------- S 安全管理状态评价情况 ------------------*/
            evaluateData: { 
                id: null,
                checkDate:null,
                advantage: "无",
                inferiority:"无",
            },
            riskGovern:"",
            evaluateFileList:[],
            evaluateLoading:false,
            imgInfo:null,
         /* --------------- s 良好社会实践 ------------------*/
            practiceColumns: [
                { title:"序号",dataIndex:"index",width:55, align:"center",customRender: (text, record, index) => `${index+1}` },
                { title:"文字内容",dataIndex:"practiceSummaryInfo",width:750 ,align:"center", scopedSlots:{ customRender: "practiceSummaryInfo" } },
                // { title:"图片",dataIndex:"imgUrl",width:350,scopedSlots:{ customRender: "imgUrl" } }, //,align:"center"
                { title:"操作",dataIndex:"operation",width:90,align:"center",scopedSlots:{ customRender: "operation" } },
            ],
            practiceData: [],
            practiceEditList: ["imgUrl","practiceSummaryInfo"],
            practiceShow: false,
            fileList: [], //良好实践汇总上传
            practiceConent: '', //良好实践富文本框内容
            previewVisible: false,
            previewImage: '',
            textUploadShow: false,
            urlPrefix: null,
            isUpload: false,
        };
    }
}