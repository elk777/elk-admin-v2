// import { USER_ID } from '@/store/mutation-types'
const USER_ID = 12321312
import Vue from 'vue'
export default {
    data() {
        return {
            initData: {
                target_repo: [
                    {
                        "id": 0,
                        "value": "1*1",
                        "label": "1*1",
                        "img": "1-1.jpg",
                        "row": [
                            {
                                "rowId": 0,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 24,
                                        "className": "layout_bj_left layout_bj_1",
                                        "srcURL": "",
                                        "position": "1-1"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "value": "2*2",
                        "label": "2*2",
                        "img": "2-2.png",
                        "row": [
                            {
                                "rowId": 0,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 12,
                                        "className": "layout_bj_left layout_bj_2",
                                        "srcURL": "",
                                        "position": "1-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 12,
                                        "className": "layout_bj_right layout_bj_2",
                                        "srcURL": "",
                                        "position": "1-2"
                                    }
                                ]
                            },
                            {
                                "rowId": 1,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 12,
                                        "className": "layout_bj_left layout_bj_2",
                                        "srcURL": "",
                                        "position": "2-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 12,
                                        "className": "layout_bj_right layout_bj_2",
                                        "srcURL": "",
                                        "position": "2-2"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 2,
                        "value": "2*3",
                        "label": "2*3",
                        "img": "2-2.png",
                        "row": [
                            {
                                "rowId": 0,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_2_3",
                                        "srcURL": "",
                                        "position": "1-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_2_3",
                                        "srcURL": "",
                                        "position": "1-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_2_3",
                                        "srcURL": "",
                                        "position": "1-3"
                                    }
                                ]
                            },
                            {
                                "rowId": 1,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_2_3",
                                        "srcURL": "",
                                        "position": "2-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_2_3",
                                        "srcURL": "",
                                        "position": "2-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_2_3",
                                        "srcURL": "",
                                        "position": "2-3"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 3,
                        "value": "3*3",
                        "label": "3*3",
                        "img": "3-3.png",
                        "row": [
                            {
                                "rowId": 0,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_3",
                                        "srcURL": "",
                                        "position": "1-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_3",
                                        "srcURL": "",
                                        "position": "1-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_3",
                                        "srcURL": "",
                                        "position": "1-3"
                                    }
                                ]
                            },
                            {
                                "rowId": 1,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_3",
                                        "srcURL": "",
                                        "position": "2-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_3",
                                        "srcURL": "",
                                        "position": "2-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_3",
                                        "srcURL": "",
                                        "position": "2-3"
                                    }
                                ]
                            },
                            {
                                "rowId": 2,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_3",
                                        "srcURL": "",
                                        "position": "3-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_3",
                                        "srcURL": "",
                                        "position": "3-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_3",
                                        "srcURL": "",
                                        "position": "3-3"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 4,
                        "value": "3*4",
                        "label": "3*4",
                        "img": "3-3.png",
                        "row": [
                            {
                                "rowId": 0,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "1-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "1-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "1-3"
                                    },
                                    {
                                        "colId": 3,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "1-4"
                                    }
                                ]
                            },
                            {
                                "rowId": 1,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "2-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "2-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "2-3"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "2-4"
                                    }
                                ]
                            },
                            {
                                "rowId": 2,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "3-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "3-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "3-3"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_3_4",
                                        "srcURL": "",
                                        "position": "3-4"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 5,
                        "value": "4*3",
                        "label": "4*3",
                        "img": "4-4.png",
                        "row": [
                            {
                                "rowId": 0,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "1-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "1-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "1-3"
                                    }
                                ]
                            },
                            {
                                "rowId": 1,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "2-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "2-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "2-3"
                                    }
                                ]
                            },
                            {
                                "rowId": 2,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "3-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "3-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "3-3"
                                    }
                                ]
                            },
                            {
                                "rowId": 3,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "4-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "4-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_4_3",
                                        "srcURL": "",
                                        "position": "4-3"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 6,
                        "value": "4*4",
                        "label": "4*4",
                        "img": "4-4.png",
                        "row": [
                            {
                                "rowId": 0,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "1-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "1-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "1-3"
                                    },
                                    {
                                        "colId": 3,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "1-4"
                                    }
                                ]
                            },
                            {
                                "rowId": 1,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "2-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "2-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "2-3"
                                    },
                                    {
                                        "colId": 3,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "2-4"
                                    }
                                ]
                            },
                            {
                                "rowId": 2,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "3-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "3-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "3-3"
                                    },
                                    {
                                        "colId": 3,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "3-4"
                                    }
                                ]
                            },
                            {
                                "rowId": 3,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "4-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "4-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "4-3"
                                    },
                                    {
                                        "colId": 3,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "4-4"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 7,
                        "value": "5*5",
                        "label": "5*5",
                        "img": "4-4.png",
                        "row": [
                            {
                                "rowId": 0,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "1-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "1-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "1-3"
                                    },
                                    {
                                        "colId": 3,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "1-4"
                                    }
                                ]
                            },
                            {
                                "rowId": 1,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "2-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4",
                                        "srcURL": "",
                                        "position": "2-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "2-3"
                                    },
                                    {
                                        "colId": 3,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4",
                                        "srcURL": "",
                                        "position": "2-4"
                                    }
                                ]
                            },
                            {
                                "rowId": 2,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_qg",
                                        "srcURL": "",
                                        "position": "3-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 8,
                                        "className": "layout_bj_left layout_bj_4_qg",
                                        "srcURL": "",
                                        "position": "3-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 8,
                                        "className": "layout_bj_right layout_bj_4_qg",
                                        "srcURL": "",
                                        "position": "3-3"
                                    }

                                ]
                            },
                            {
                                "rowId": 3,
                                "col": [
                                    {
                                        "colId": 0,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4_qg",
                                        "srcURL": "",
                                        "position": "4-1"
                                    },
                                    {
                                        "colId": 1,
                                        "val": 6,
                                        "className": "layout_bj_left layout_bj_4_qg",
                                        "srcURL": "",
                                        "position": "4-2"
                                    },
                                    {
                                        "colId": 2,
                                        "val": 6,
                                        "className": "layout_bj_right layout_bj_4_qg",
                                        "srcURL": "",
                                        "position": "4-3"
                                    },
                                    {
                                        "colId": 3,
                                        "val": 6,
                                        "className": "layout_bj_right_bt layout_bj_4_bt",
                                        "srcURL": "",
                                        "position": "4-4"
                                    }
                                ]
                            }
                        ]
                    }
                ],
            },
            layoutShow:true, //整体loadig
            // userID:Vue.ls.get(USER_ID),
            userID:USER_ID,
            // 展示布局的格式
            layoutArr: [],
            //发送给后端保存格式的内容 
            layoutList:[],
            layouAllList:[],
            rowArr: {}, //默认进入展示的布局
            dataArr:[],
            targetInfo:[], 
            dictDomainList:[], // 指标分类
            newName:"", //保存新方案 名称
            drawer: false, //控制抽屉的显隐
            iframeShow:true, //控制iframe组件的刷新
            radVal: null,
            modalRadio:"",
            visibleModal:false,// 控制点击新增图片选择框的显隐
            layoutModal:false,// 控制布局信息选择框的显隐
            loadingLayout:false, // 替换旧方案  保存新方案 获取方案 loading效果
            layoutTitle:"",  // 布局信息选择框的标题
            layoutCut:true, //控制切换 拉取布局 和 存储布局 弹出框内容
            confirmLoading:false, //选择框确定按钮loading样式
            selectURL:null, //简介保存url
            modelPosition:{
              type:null,
              position:null,
            },
            pullList:[],  //拉取方案格式列表
            pullset:[], //拉取下拉选择内容
            getIScfm:null, //替换 还是 获取
            treeVal:[], //删除方案 双向绑定值
            delModal:false,
            addBlueShow:true, //通过创建方案按钮控制权限
            buleVal:undefined,// 下拉布局内容
            ensureShow:false,
            ensureTitle:"",
            curveProgram:"",//当前方案名称
            isDefault:false,
        }
    }
}