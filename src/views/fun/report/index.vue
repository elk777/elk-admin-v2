<template>
<!-- 周报/月报列表界面 -->
    <div class="monthly">
        <!-- 1_S 周报月报列表 -->
        <div class="monthly_list" v-if="showAdd">
            <!-- / 顶部选择框和按钮信息 -->
            <div class="monthly_list_top">
                <div class="monthly_list_top_pub monthly_list_top_date">
                    <div class="mltp_title" >选择日期: </div>
                    <a-range-picker v-if="radioVal == 1" style="width:250px" @change="dateChange"></a-range-picker>
                    <a-date-picker v-else style="width:250px" @change="dateChange" ></a-date-picker>
                </div>
                <div class="monthly_list_top_pub monthly_list_top_select">
                    <div class="mltp_title" >报告类型: </div>
                    <a-radio-group class="monthly_add_radio" @change="changeRadio" v-model="radioVal">
                        <a-radio :value="1">周报</a-radio>
                        <a-radio :value="2">月报</a-radio>
                    </a-radio-group>
                </div>
                <div class="monthly_list_top_btn">
                    <a-button type="primary" @click="addMonthly(1)">新增</a-button>
                </div>
            </div>
            <!-- / 列表table信息 bordered  -->
            <a-table :row-selection="rowSelection" :pagination="reportPagination" :loading="reportLoading" :customRow="rowClick" :rowKey="(record,index) => record.id" :data-source="data" size="small"> 
                    <a-table-column width="75px" key="index" :custom-render="(text, record, index) => `${index+1}`" data-index="index" align="center">
                        <span slot="title">序号</span>
                    </a-table-column>
                    <a-table-column key="safetyReport" data-index="reportType" align="center">
                        <span slot="title">周/月报</span>
                    </a-table-column>
                    <a-table-column class="name" key="reportName"  data-index="reportName" align="center">
                        <span slot="title">报告名称</span>
                    </a-table-column>
                    <a-table-column key="reportDate" data-index="reportDate" align="center">
                        <span slot="title">报告日期</span>
                    </a-table-column>
                    <a-table-column key="createDate" data-index="createDate" align="center">
                        <span slot="title">生成日期</span>
                    </a-table-column>
                    <a-table-column key="action" title="操作" align="center">
                        <template slot-scope="text,record">
                            <a-popconfirm title="是否删除当前行的数据？"   @confirm=" () => cancel(record.id)">
                                <a>删除</a>
                            </a-popconfirm>
                        </template>
                    </a-table-column>
            </a-table>     
            <a-button class="monthly_list_pubButton" type="primary" @click="cancel()" >删除</a-button> 
        </div>
        <!-- 1_E 周报月报列表 -->
        <!-- 2_S 周报月报新增信息 -->
        <div class="monthly_add" v-else>
            <div class="monthly_add_title" >当前生成报告的信息: {{radioVal == 1 ? '周报' : '月报' }},{{dateval}} </div>
            <div class="monthly_add_btn">
                <a-button type="primary" @click="addMonthly(0)">返回</a-button> 
                <a-button class="monthly_add_radio" type="primary" @click="createMonthly">生成</a-button> 
            </div>
            <a-tabs type="card" @change="callback">
                <a-tab-pane v-for="item in tabList" :key="item.id" :tab="item.name">
                    <monthlyInfo ref="monthlyinfo" :dateValue="dateValue" :radioVal="radioVal" v-if="item.id === 1"></monthlyInfo>
                    <div v-else>暂无内容</div>
                </a-tab-pane>
            </a-tabs>
        </div>
        <!-- 2_E 周报月报新增信息 -->
    </div>
</template>
<script>
import monthlyInfo from './monthly/monthlyInfo'
import { setGenWeekReport, setGenMonthReport, reportList, reportDownload, reportRemove }  from "@/api/monthly"
import fileDownload from "js-file-download"
import { Modal } from 'ant-design-vue'
    export default {
        name: 'DesignClarification',
        components: {
            monthlyInfo,
        },
        data() {
            return {
                showAdd: true, //切换list和add
                dateInfo:"",  // 时间信息
                data:[],      //列表table信息
                tabList:[     //标签页信息
                    { id:1, name:"安全",},
                ],
                reportLoading:false,
                dateValue:[],  //选择日期value
                dateval: '',
                radioVal:2,  //选择报告类型value
                reportPagination: {   //表格的分页功能
                    position: 'bottom',
                    pageSize: 18,
                    current: 1,
                    total: 0,
                    onChange: (current,pageSize) => {
                        this.reportPagination.current = current;
                        this.getReportList();
                    } 
                },
                rowSelection: {
                    onSelect:this.onSelect,
                    onSelectAll:this.onSelectAll,
                    hideDefaultSelections: true,
                },
                ids:[],
            };
        },
        created() {
            this.getReportList();
        },
        methods: {
            // 报告类型
            changeRadio(val) {
                this.getReportList()
            },
            // 获取生成周报月报的列表
            getReportList() {
                const { current,pageSize } = this.reportPagination
                let parReport = {
                    pageNum: current,
                    pageSize,
                    reportFlag: this.radioVal === 1 ? 0  : 1
                }
                this.reportLoading = true;
                reportList(parReport).then( res => {
                    if( res.message === 'success') {
                        this.reportLoading = false;
                        this.data = res.data.records;
                        this.reportPagination.total = res.data.total;
                        if( res.data.records.length > 0 ){
                            res.data.records.forEach( item => {
                                item.reportType = item.reportFlag === 0 ? '周报' : '月报'
                            })
                        }
                    }
                }).catch( err => {
                    this.reportLoading = false
                    Error(err)
                })
            },
            onSelect(record,selected,selectrows){
                this.ids = selectrows.map( item => {
                    return item.id
                })
            },
            onSelectAll(records,selected,selectrows) {
                this.ids = selected.map( item => {
                    return item.id
                })
            },
            // 删除报告信息
            delReportList(id) {
                reportRemove(id).then( res => {
                    if( res.message === 'success') {
                        this.$message.success(`删除成功`);
                        this.getReportList();
                    }
                })
            },
            // 删除按钮操作
            cancel(sinId){ 
                const { ids } = this;
                if( sinId === undefined ) {
                    if ( ids.length === 0   ){
                        this.$message.info(`请勾选要删除的数据`);
                        return
                    }
                    Modal.confirm( { 
                        title:"是否删除选中的数据信息",
                        okText:"确定",
                        // cancelText:"取消",
                        onOk: () => {
                            this.delReportList(ids)  
                        },
                        onCancel() {
                        },
                    })
                    return
                }
                this.delReportList(sinId)
            },
            // 时间的选择
            dateChange(date, dateString) {
                this.dateValue = dateString;
                this.radioVal == 1 ? this.dateval = `${this.dateValue[0]}-${this.dateValue[1]}` : this.dateval = this.dateValue
            },
            // 新增周报/月报按钮
            addMonthly(type){
                let _this = this
                if ( type ) {
                    // 这边走的是 新增 操作
                    if(_this.dateValue.length <= 0){
                        _this.$message.warning('请选择日期');
                        return
                    }
                    _this.showAdd = false;
                    return
                }
                _this.dateValue = [];
                Modal.confirm( { 
                    title:"是否保存录入的信息",
                    okText:"确定",
                    // cancelText:"取消",
                    onOk: () => {
                        this.getReportList();
                        _this.showAdd = true;
                    },
                    onCancel: () => {
                        _this.showAdd = false;
                    },
                })
                // const modal = Modal.confirm( { 
                //     title:"是否保存录入的信息",
                //     okText:"确定",
                //     // cancelText:"取消",
                //     onOk: () => {
                //         modal.destroy();
                //         this.getReportList();
                //         _this.showAdd = true;
                //     },
                //     onCancel() {
                //         modal.destroy();
                //     },
                // })
            },

            // 点击生成周报/月报
            createMonthly() {
                const genModal = Modal.confirm({
                    title:"请确定信息录入完成并已保存",
                    okText:"生成",
                    cancelText:"取消",
                    onOk: () => {
                        let data = {
                            description:this.$refs.monthlyinfo[0].description,
                        }   
                        data[this.radioVal == 1 ? 'checkDate' : 'startDate']  =  this.dateValue;
                        // 返回一个promise对象,产生loading效果
                        if(this.radioVal == 1 ) {
                            return setGenWeekReport(data).then( (res) => {
                                if( res.type === 'application/json') {
                                    let blobTest = new FileReader();
                                    blobTest.readAsText(res);
                                    blobTest.onload = () => { 
                                        this.$message.info(`${JSON.parse(blobTest.result).data == null ? '系统错误' : JSON.parse(blobTest.result).data}`)  
                                    };
                                    genModal.destroy()
                                    return
                                }
                                genModal.destroy()
                                this.$message.success('生成成功,正在下载');
                                fileDownload(res,`${data.checkDate}安全管理周报.doc`);
                            })
                        }
                        return  setGenMonthReport(data).then(res => {
                                    if( res.type === 'application/json') {
                                        let blobTest = new FileReader();
                                        blobTest.readAsText(res);
                                        blobTest.onload = () => { 
                                            this.$message.info(`${JSON.parse(blobTest.result).data == null ? '系统错误' : JSON.parse(blobTest.result).data}`)  
                                        };
                                        genModal.destroy()
                                        return
                                     }
                                     genModal.destroy()
                                    this.$message.success('生成成功,正在下载');
                                    fileDownload(res,`${data.startDate}安全管理月报.doc`);
                                })
                    },
                    onCancel() {
                        genModal.destroy()
                    }
                })
            },
            // 点击标签页
            callback(key){},
            // 设置点击名称哪行触发事件
            rowClick: function(record, index) {
                return {
                    on: {
                        click: (event) => {
                            if( event.target.className === 'name') {
                                const { id, reportName } = record;
                                setTimeout(() => {                    
                                    reportDownload(id).then( res => {
                                        this.$message.success('下载成功');
                                        fileDownload(res,reportName);
                                    })
                                }, 1000);
                            }
                        }
                    }
                }
            },
        }
    }
</script>
<style scoped lang="scss">
.monthly{
    & ::v-deep .ant-table-fixed-header .ant-table-scroll .ant-table-header {
        overflow: hidden !important
    }
    // 周报月报列表
    .monthly_list{
        position: relative;
        & ::v-deep .ant-table{
            height: 80vh;
        }
        .monthly_list_pubButton{
            position: absolute;
            bottom: 12px;
            left: 30px;
        }
        // 顶部选择框和按钮信息
        .monthly_list_top{
            margin: 10px 5px;
            display: flex;
            align-items: center;
            text-align: center;
            .monthly_list_top_pub{
                display: flex;
                align-items: center;
                .mltp_title{
                    font-weight: 700;
                    margin: 0px 10px;
                }
            }
            .monthly_list_top_btn{
                margin: 0px 30px;
                text-align: center;
            }
        }
        & ::v-deep .ant-table-tbody  .name{
            color: #1890ff ;
            cursor: pointer ;
            text-decoration: underline;
        }
        & ::v-deep .ant-spin-nested-loading > div > .ant-spin{
            height: 100vh;
        }
    }
    // 周报月报新增
    .monthly_add{
        margin: 10px;
        position: relative;
        .monthly_add_title{
            position: absolute;
            top: 5px;
            left: 215px;
        }
        .monthly_add_btn{
            position: absolute;
            right: 0px;
            top: 0px;
            z-index: 999;
            display: flex;
            align-items: center;
            margin: 0px 0px 10px;
            .monthly_add_radio{
                margin: 0px 0px 0px 50px;
            }
        }
    }
}
</style>