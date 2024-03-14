<template>
  <!-- 自定义界面 -->
  <div class="bodydemo" ref="bodydemo">
    <!-- 自定义栅格布局 -->
      <div class="defined_layout" id="main_l">
        <!-- 顶部左侧倒计时 -->
        <div class="left_down">
          <div class="left_down_out">
            <!-- <div class="xial">
              <span>项目编号</span>
              <select id="selectBH"></select>
            </div> -->
            <div class="title"><span id="crewOneName"></span><span class="num" id="crewOneNum"></span>天</div>
            <div class="title"><span id="crewTwoName"></span><span class="num" id="crewTwoNum"></span>天</div>
            <!-- <div class="title">本项目工程已经连续安全运行<span>788</span>天</div> -->
          </div>
        </div>
        <!-- 顶部右侧年月日、星期时间 -->
        <div class="right_week"><span id="time"></span></div>


        <div class="layout">
            <a-row v-for="rowItem in rowArr.row" >
              <a-col class="col_class" :class="colItem.className" v-for="colItem in rowItem.col" :span="colItem.val">
                <div v-if="colItem.srcURL === ''" class="img_show" :class="colItem.height" >
                  <img @click="showModal(rowArr.value,colItem.position)" src="./images/tj.png" alt="">
                </div>
                <div v-else  class="iframe_class">
                  <div class="menu_class" style="position:absolute;color: #fff;">
                      <a class="ant-dropdown-link" @click="showModal(rowArr.value,colItem.position)">切换指标</a><a-icon type="down"></a-icon>
                  </div>
                  <iframe  v-if="iframeShow" :src="colItem.srcURL" id="layout11" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation
                    " width="100%" height="100%" scrolling="no" marginwidth="0px" marginheight="0px" frameborder="0" seamless>
                  </iframe>
                </div>
              </a-col>
            </a-row>
        </div>
      </div>
      <div v-show="layoutShow" class="loadingA">
        <a-spin size="large" />
      </div>
    <!-- 固定设置点击界面 -->
    <div @click="handelSet" class="btm_set">
      <img src="./images/defined_set.png" alt="">
    </div>

    <!-- 抽屉弹出 -->
    <div class="bodydemo_drawer">
      <a-drawer title="自定义展板设置"  placement="right" :closable="false" :visible="drawer" :get-container="false"
        :wrap-style="{ position: 'absolute' }" @close="onClose">
        <!-- 展示布局的样式 -->
        <div class="bodydemo_drawer_top">
          <div class="bdt_blue">
            <p style="margin-bottom:10px">选择方案: </p>
            <div class="bdt_blue_select">
              <a-select placeholder = "请选择方案" v-model="buleVal" :allowClear="true" @change="blueChange" style="width:270px" >
                <a-select-option v-for="item in layouAllList" :key="item.scheme_id">{{item.scheme_type}}-{{item.scheme_name}}</a-select-option>
              </a-select> 
              <a-popover content="确认">
                <a-icon @click="ensureBtn"  class="bdtb_icon" type="check" ></a-icon>
              </a-popover>
            </div>
            <p v-show="ensureShow" style="margin:10px 0px">当前方案: </p>
            <div class="bdt_blue_set" v-show="ensureShow">
              <div class="bdt_blue_set_title">
                <a-popover v-if="isDefault" content="此为默认方案">
                  <a-icon class="icon" type="exclamation-circle" />
                </a-popover>
                
                <!-- <a-popover :content="ensureTitle"> -->
                  <p class="bbst_content">{{ensureTitle}}</p> 
                <!-- </a-popover> -->
                </div>
              <div>
                <a-popover content="设置默认方案">
                  <a-icon @click="setDfault"  class="bdtb_icon" type="check-circle" ></a-icon>
                </a-popover>
                <a-popover content="修改方案">
                  <a-icon @click="setAmend"  class="bdtb_icon" type="edit" ></a-icon>
                </a-popover>
                <a-popover content="删除方案">
                  <a-icon @click="setDel" class="bdtb_icon" type="close" ></a-icon>
                </a-popover>
              </div>
            </div>
          </div>
          <div class="bodydemo_drawer_top_layinfo">
            <!-- <p v-if="layoutList.length !== 0" >当前默认方案: <span >{{layoutList[0].scheme_name}}</span></p> -->
          </div>
          <p class="bdt_layout">布局: </p>
          <div class="radio_layout">
            <a-radio-group @change="handelRadio" v-model="radVal">
              <a-radio :disabled="addBlueShow" class="radio_item" v-for="item in layoutArr" :value="item.value">
                <!-- <img :src="imgSrc(item.img)" alt=""> -->
                <span>{{item.value}}</span>
              </a-radio>
            </a-radio-group>
          </div>
          <!-- 显示布局名称 -->
          <!-- <div class="bodydemo_drawer_top_layinfo"> -->
            <!-- <p v-if="layoutList.length !== 0" >当前默认方案: <span >{{layoutList[0].scheme_name}}</span></p> -->
          <!-- </div> -->
        </div>
        <p class="bdt_layout">操作: </p>
        <div class="btm_btn">
          <a-button class="btn_item" :disabled ="addBlueShow" @click="savaLayout">保存方案</a-button>
          <a-button class="btn_item" @click="addLayout">创建方案</a-button>
        </div>
      </a-drawer>
    </div>

    <!-- 新增图片点击出现选择框 -->
    <a-modal :visible="visibleModal" title="指标信息" :confirm-loading="confirmLoading" @ok="handleOK(1)" @cancel="handelCancel">
      <div class="addTarget">
         <a-select class="aSelect" @change="changeGetDataArr" style="width:200px" placeholder="请选择领域分类">
          <a-select-option   v-for="item in dictDomainList" :key="item.dictType">{{item.dictName}}</a-select-option>
        </a-select>
        <a-select class="aSelect" v-model = "targetInfo"  @change="handelChange" style="width:200px;margin-left: 15px;" placeholder="请选择指标">
          <a-select-option  v-for="item in dataArr" :key="item.dictDataId">{{item.dataName}}</a-select-option>
        </a-select>
      </div>
    </a-modal>

    <!-- 保存方案 调取方案 设置默认方案 信息出现的选择框 :confirm-loading="loadingLayout" -->
    <a-modal width="485px" :getContainer = "() => $refs.bodydemo"  :visible="layoutModal" :title="layoutTitle" @ok="handleLayout" @cancel="handelCancel"  >
      <template slot="footer">
        <a-button key="back" @click="handelCancel">取消</a-button>
        <a-button @click="handleLayout" :loading="loadingLayout">确定</a-button>
      </template>
      <div class="bodydemo_modal_top">
        <div>
          <span style="width:80px">方案名称: </span>
          <a-input :disabled="modalRadio !== ''"   v-model="newName" placeholder="请输入方案名称" style="width:373px"></a-input>
        </div>

      </div>
    </a-modal>

  </div>
</template>
<script>
import { getDictDomainList, getDictDataByDictType, getDefaultLayout, getAllLayout, setNewLayout, setDefaultLayout, delLayoutInfo } from '@/api/customLayout'
// import json  from '/public/server_copy.json'
import minin from './mixins/minin'
import { getTime, fillZero } from './js/time'
import { Gczhzx } from './js/gczhzx'
export default {
  // name: 'customLayout',  
  mixins:[minin],
  watch: {
    buleVal(newName,oldName) {
      // newName == null ? '' : this.addBlueShow = true;
      if( newName == null ) {
        this.ensureShow = false; 
        return
      }
      // this.ensureShow = true; 
      this.addBlueShow = true;
    }
  },
  computed: {},
  created() { 
    // this.layoutArr = json.data.target_repo;
    this.layoutArr = this.deepCopy(  this.initData.target_repo );
    this.getList(1);
    this.getList(0);
    this.getTarget();

    getTime();
    fillZero();
    Gczhzx().getSelectOptionList();
  },
  mounted() {
  },
  methods: {
    //获取指标信息
    getTarget(){
      //获取数据字典中的领域分类
       getDictDomainList({key:'domain'}).then(res =>{
           this.dictDomainList = res.data
       })
    },
    // 获取方案信息
    getList(type) {
      let data  = { 
        userId:this.userID
      }
      if(type){
        // 获取默认方案
        getDefaultLayout(data).then( res => { 
          this.layoutList = res.data.value;
          this.layoutShow = false;
          this.$forceUpdate();
          this.formattingStyle(0);
        })
        return
      }  
      // 获取所有方案
      getAllLayout(data).then( res => { 
       res.data.value.sort( (a,b) => { 
          let x = a.scheme_type.split("*");
          let y = b.scheme_type.split("*");
          if( x[0] < y[0] && x[1] < y[1] ) {
            return -1;
          }
          if(x[0] > y[0] && x[1] > y[1]  ) {
            return 1;
          }
          return 0;
        });
        this.layouAllList = this.deepCopy(res.data.value);
      })
    },
    // 将后端请求数据转为前端展示界面需要的格式 
    formattingStyle(type,arr) {
      if( this.layoutList.length == 0 ) {
        this.rowArr = this.layoutArr[0]
        return
      }
      // 请求得到的格式,第一个作为默认进入界面展示的布局
      let layoutList = type ? arr : this.layoutList;
      if( layoutList[0].layoutinfo[0].srcURL == undefined ) {
        layoutList[0].layoutinfo =  JSON.parse(layoutList[0].layoutinfo);
      }
      let layoutArr = this.deepCopy(this.initData.target_repo ); 
      let rowArr = {}
      rowArr = layoutArr.find( item => {
        return item.value === layoutList[0].scheme_type
      })
      rowArr.row.forEach(list => {
        list.col.forEach(item => {
          layoutList.find( (it) => {
            it.layoutinfo.find( i => {
              if( item.position === i.position &&  rowArr.value === it.scheme_type ){
                item.srcURL = i.srcURL
              }
            })
          })
        })
      });
      this.rowArr = rowArr;
      console.log( "转换后的格式:",rowArr)
    },
    // 前端格式转换发送给后端
    frontFormatting(name,arr,isdefault) {  
      let data = {
        ID:"",
        userID: this.userID,
        name,
        type: arr.value,
        isdefault:isdefault,
        // isdefault:0,
        layoutInfo: []  
      }
      arr.row.forEach( list => {
        list.col.forEach( item => {
          if( item.srcURL !== ""){
            let obj = {}
            obj.type = arr.label
            obj.position = item.position
            obj.srcURL = item.srcURL
            data.layoutInfo.push(obj)
          }
        })
      })
      return data 
    },
    // 深拷贝数据
    deepCopy(data) {
      //string,number,bool,null,undefined,symbol
      //object,array,date
      if (data && typeof data === "object") {
        //针对函数的拷贝
        if (typeof data === "function") {
          let tempFunc = data.bind(null);
          tempFunc.prototype = this.deepCopy(data.prototype);
          return tempFunc;
        }
        switch (Object.prototype.toString.call(data)) {
          case "[object String]":
            return data.toString();
          case "[object Number]":
            return Number(data.toString());
          case "[object Boolean]":
            return new Boolean(data.toString());
          case "[object Date]":
            return new Date(data.getTime());
          case "[object Array]":
            var arr = [];
            for (let i = 0; i < data.length; i++) {
              arr[i] = this.deepCopy(data[i]);
            }
            return arr;
          //js自带对象或用户自定义类实例
          case "[object Object]":
            var obj = {};
            for (let key in data) {
              //会遍历原型链上的属性方法，可以用hasOwnProperty来控制
              obj[key] = this.deepCopy(data[key]);
            }
            return obj;
        }
      } else {
        //string,number,bool,null,undefined,symbol
        return data; 
      }
    },
  /* ------------------------------------------------------------------- */
    // 2   点击图片出现弹出设置界面
    handelSet() {
      this.drawer = true;
      // this.addBlueShow = true;
      // this.buleVal = undefined;
      // this.radVal = null;
    },
    // 自定义布局设置抽屉的隐藏
    onClose() {
      this.drawer = false;
    },
    // 图片路径转换
    imgSrc(item) {
      return `./images/${item}`
    },
  /* -------------------------------------------------------------------- */
    // 3   点击单选框切换样式
    handelRadio(event) {
      // 得到选择的样式，筛选得出对应赋值展示
      let radVal = this.radVal;
      let layoutArr = this.deepCopy(   this.initData.target_repo  );
      let arr = layoutArr.find( item => {
        return  item.value == radVal
      }) 
      this.rowArr = {...arr};
    },
  /* ---------------------------------------------------------------- */
    // 4  转换层级结构
    shiftTier() {
      let layoutList = this.layouAllList;
      let list = [];
      if( layoutList.length == 0 ) { 
        this.pullList = list;
        return
       }
      layoutList.forEach( (item,index) => {
        let arr = [];
        let obj = {};
        let chobj = {};
        obj.title = item.scheme_type;
        obj.value = item.scheme_type;
        obj.label = item.scheme_type;
        obj.type = item.scheme_type;
        chobj.layoutInfo = item.layoutinfo;
        chobj.title = item.scheme_name;
        chobj.value = item.scheme_id;
        chobj.label = item.scheme_name;
        chobj.type = item.scheme_type;
        if(  obj.type == chobj.type ){ 
          arr.push(chobj)
          obj.children = arr
          list.push(obj)
        }
      })
      // 数组对象含有相同某个属性进行合并并且排序
      list = list.map( (item,index,list) => {
        const i = list.find( _item =>  item.type === _item.type );
        if( i !== item ) {
          i.children.push( item.children[0] );
          return undefined
        } else {
          return i
        }
      }).filter( item => item !== undefined )
      .sort( (a,b) => { 
        let x = a.type.split("*");
        let y = b.type.split("*");
        if( x[0] < y[0] && x[1] < y[1] ) {
          return -1;
        }
        if(x[0] > y[0] && x[1] > y[1]  ) {
          return 1;
        }
        return 0;
      });
      this.pullList = list;
    },
    // 点击确定 
    ensureBtn() {
      if( this.buleVal == null ) {
        this.$message.warning( "当前不可用,请选择方案" )
        return
      }
      let arr = [];
      arr.push(this.layouAllList.find( item => { return  this.buleVal == item.scheme_id }));
      this.formattingStyle(1,arr);
      arr[0].scheme_id == this.layoutList[0].scheme_id ? this.isDefault = true : this.isDefault = false;
      this.iframeShow = false;
      setTimeout(() => {
        this.$message.success('调取方案成功');
        this.iframeShow = true;
        this.handelCancel()
      }, 100);
      this.ensureShow = true; 
      this.ensureTitle = `${arr[0].scheme_type}-${arr[0].scheme_name}`

    },
    // 创建方案
    addLayout() {
      // 点击创建方案之后 方案下拉选择 可用  保存方案按钮可用
      this.addBlueShow = false;
      this.buleVal = undefined;
    },
    // 设置默认方案
    setDfault() {
      if( this.buleVal == null ) {
        this.$message.warning( "当前不可用,请选择方案" )
        return
      }
      // this.layoutModal = true;
      // this.layoutTitle = "设置默认方案信息";
      // this.layoutCut = false;
      // this.getIScfm = false;
      // this.pullList = [];
      // this.shiftTier();

      let _this = this
      if( this.buleVal == null ) {
        this.$message.warning( "当前不可用,请选择方案" )
        return
      }
      // 提示是否将当前方案设为默认方案
      this.$confirm({
        title:"是否将当前方案设为默认方案",
        okText:"确定",
        okType:"default",
        cancelText:"取消",
        onOk() {
          // 点击确定 将数组id 发送给后端 来删除选中 方案
          return new Promise (( resolve,reject ) => {
            const res = _this.setdfault(resolve,reject);
            return res;
          })        
        },
        autoFocusButton: null,
        onCancel() {
        }
      })
    },
    // 设置默认方案-接口调用
    setdfault(resolve,reject) {
      let data = {
        userId:this.userID,
        ID:Number(this.buleVal),
      }
      setDefaultLayout(data).then( res => {
        resolve();
        if( res.data.message == "OK"){
          this.$message.success('设置默认方案成功');
          this.getList(1);
          this.drawer = false;
        }
      }).catch( err => { 
        Error(err)
      })
    },
    // 修改方案-接口调用
    setlayout(resolve,reject) {
      let _this = this;
      let data = { target:{} };
      // 点击确定 修改方案 相当于v1的替换方案,将内容替换
      let id = _this.buleVal;
      let _name = _this.layouAllList.find( item =>{ return item.scheme_id == id }).scheme_name
      let _isdefault = _this.layouAllList.find( item =>{ return item.scheme_id == id }).isdefault
      data.target = _this.frontFormatting(_name,_this.rowArr,_isdefault);
      data.target.ID = id;
      setNewLayout(data).then( res => {
        resolve();
        if( res.data.message == "OK") {
            _this.getList(0);
            _this.$message.success('修改成功');
            _this.drawer = false;
          }
      }).catch( err => { 
        Error(err)
      })
    },
    // 修改方案按钮
    setAmend() {
      let _this = this;
      if( this.buleVal == null ) {
        this.$message.warning( "当前不可用,请选择方案" )
        return
      }
      // 提示是否修改
      this.$confirm({
        title:"是否修改当前方案",
        okText:"确定",
        okType:"default",
        cancelText:"取消",
        onOk() {
          return new Promise (( resolve,reject ) => {
            const res = _this.setlayout(resolve,reject);
            return res;
          })
        },
        autoFocusButton: null,
        onCancel() {
        }
      })
    },
    // 删除方案
    setDel() {
      if( this.buleVal == null ) {
        this.$message.warning( "当前不可用,请选择方案" )
        return
      }
      // this.delModal = true;
      // this.treeVal = [];
      // this.shiftTier();


      let _this = this;
      if( this.buleVal == null ) {
        this.$message.warning( "当前不可用,请选择方案" )
        return
      }
      // 提示是否修改
      this.$confirm({
        title:"是否删除当前方案",
        okText:"确定",
        okType:"default",
        cancelText:"取消",
        onOk() {
          return new Promise (( resolve,reject ) => {
            const res = _this.setdel(resolve,reject);
            return res;
          })
        },
        autoFocusButton: null,
        onCancel() {
        }
      })
    },
    // 删除方案-接口调用
    setdel(resolve,reject) {
      let ID = [];
      ID.push(this.buleVal.toString())
      let data = {
        userId:this.userID,
        ID
      }
      delLayoutInfo(data).then( res => {
        resolve();
        if( res.data.message == "OK"){
          this.getList(1);
          this.getList(0);
          this.$message.success('删除方案成功');
          this.drawer = false;
        }  
      })
      .catch( err => { Error(err)})
    },
    // 保存方案按钮
    savaLayout() {
      this.layoutModal = true;
      this.layoutCut = true;
      this.newName = "";
      this.modalRadio ="";
      this.layoutTitle = "保存方案信息";
    },

  /* ------------------弹出框系列----------------------------------- */
    // 5  img图片打开弹出框
    showModal(type,position) {
      // this.dictDomainList = [];
      // this.targetInfo = [];
      this.modelPosition = { type,position };
      this.visibleModal = true;
    },
    // 点击图片弹出框-点击确定按钮
    handleOK(val,obj) {
      let rowArr = this.rowArr;
      let selectURL = this.selectURL;
      if( selectURL == null || selectURL == "" ){
        // 提示用户选择内容
        this.$message.warning('请选择指标')
        return
      }
      let { type,position } = val ? this.modelPosition : obj;
      rowArr.row.find( list => {
        list.col.find( item => {
          if( item.position === position &&  rowArr.value === type  ){
            item.srcURL = selectURL;
          }
        })
      })
      this.visibleModal = false;
    },
    // 点击遮罩层 取消 × 关闭弹出框
    handelCancel() {
      this.visibleModal = false;
      // this.delModal = false;
      this.layoutModal = false;
    },
    //根据领域获取数据字典 
    changeGetDataArr(val){
      this.targetInfo = [];
      getDictDataByDictType({dictType:val}).then(res =>{
          this.dataArr = res.data
      })
    },
    // 点击图片弹出框-选择下拉框
    handelChange(val) {
      let dataarr  = this.dataArr;
      // this.selectURL = dataarr.find( (item) => { return item.id === val  }).url
      this.selectURL = dataarr.find( (item) => { return item.dictDataId === val  }).dataValue
    },
    // 顶部方案下拉按钮
    blueChange(event){
      if( event == undefined ) {
        this.getList(1);
        return
      }
      this.radVal = null;
      // 选择完之后切换到指定方案内容
      // let arr = [];
      // arr.push(this.layouAllList.find( item => { return  event == item.scheme_id }));
      // this.formattingStyle(1,arr)
      // setTimeout(() => {
      //   this.$message.success('调取方案成功');
      //   this.handelCancel()
      // }, 200);
    },
  /* ---------------------------------------------------------------------- */
    // 6  保存方案 获取方案 设置默认方案 弹出框-点击确定按钮
    handleLayout() {
      this.radVal = null;
      // 在根据 name 判断 走 保存为新方案 还是 替换旧方案
      let name = this.newName;
      // 走保存新方案流程
        if( name == '') {
          this.$message.warning('请输入名称');
          return
        }    
        let data = { target:{} };
        data.target =  this.frontFormatting(name,this.rowArr,0);
        this.loadingLayout = true;
        setNewLayout(data).then( res => {
          if( res.data.message == "OK") {
            this.getList(0);
            // this.getList(1);
            this.loadingLayout = false;
            this.$message.success('保存成功');
            this.drawer = false;
            this.layoutModal = false;
          }
        })
    },
  /* ---------------------------------------------------------------- */
    // 7  切换标准按钮
    onClickMenu(event,type,position) {
      // 点击切换标准 需要 拿到当前的 布局类型 和 布局位置信息
      let obj = { type,position }
      let dataarr  = this.dataArr;
      this.selectURL = dataarr.find( (item) => { return item.id == event.key }).url
      this.handleOK(0,obj)
    }, 
  /* ------------------------------------------------------------------ */
  },
}
</script>
<style scoped lang="scss">

.bodydemo {
  position: relative;
  background: #01162F url(./images/bg10.jpg) no-repeat center top;
  background-repeat: round;
  background-size: 100% 100%;
  overflow: hidden;
  padding: 60px 0 0;
  height: 92vh;

  .loadingA{
    position: absolute;
    top: 40vh;
    left: 49vw;
  }
  /deep/ .ant-drawer-content-wrapper{
    width: 335px !important;
  }
  
  // 1-自定义栅格布局
  .defined_layout {
    // 顶部左侧倒计时
    .left_down{
      position: absolute;
      top: 7.5px;
      left: 40px;
      width: 20%;
      color: #FFFFFF;
	    font-size: 12px;
      .left_down_out{
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .xial {
        display: flex;
        width: 50%;
        align-items: center;
      }
      .xial select {
        color: #FFFFFF;
        border: none;
        height: 18px;
        line-height: 18px;
        text-align: center;
        font-size: 12px;
        background: #09457b;
        margin: 0 2%;
      }
       .title {
        display: flex;
        font-size: 12px;
        align-items: center;
        width: 65%;
          margin-right: -30px
      }
       .title .num {
        color: #ff3300;
        margin: 0 2%;
        font-size: 12px;
        font-family: 'yjsz';
      }
    }
    // 顶部右侧星期信息
    .right_week{
      position: absolute;
      top: 7.5px;
      right: 10px;
      width: 20%;
      height: 20px;
      line-height: 20px;
      font-size: 12px;
    	color:#ffffff;
    }
    .layout_bj_left {
      background: url(./images/kuang.png) no-repeat center;
      background-size: 100% 100%;
      overflow: hidden;
    }

    .layout_bj_right {
      background: url(./images/kuang2.png) no-repeat center;
      background-size: 100% 100%;
      overflow: hidden;
    }
    .layout_bj_right_bt{
      position: absolute;
      right: 0px;
      bottom: 0px;
      background: url(./images/kuang2.png) no-repeat center;
      background-size: 100% 100%;
      overflow: hidden;
    }

    .layout {
      overflow: hidden;
      .col_class{
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .img_show{
        text-align: center;
        img{
          width: 65%;
        }
        img:hover{
          cursor: pointer;  
        }
      }
      .iframe_class{
        overflow: hidden;
        margin: 6%;
        width: 88%;
        height: 80%; 
        .menu_class{
          position: absolute;
          right: 7%;
          top: 10%;   
          z-index: 666;
          opacity: 0;
          &:hover{
            opacity: 1;
          }
          a{
            color: #02c5fb;
          }
        }
      }
      //  布局1*1
      .layout_bj_1 {
        width: 100%;
        height: 85.5vh;
      }

      // 布局2*2
      .layout_bj_2 {
        width: 50%;
        height: 43vh;
      }
      .layout_bj_2_3{
        width: 33.3%;
        height: 43vh;
      }
      .layout_bj_3 {
        width: 33.3%;
        height: 28.5vh;
      }
      .layout_bj_3_4 {
        width: 25%;
        height: 28.5vh;
      }
      .layout_bj_4{
        width: 25%;
        height: 21.45vh;
      }
      .layout_bj_4_qg{
        width: 24%;
        height: 21.45vh;
      }
      .layout_bj_4_bt{
        width: 28%;
        height: 43vh;
      }
      .layout_bj_4_3{
        width: 33.3%;
        height: 21.45vh;
      }
    }

  }

  // 2-布局配置界面- 选择样式布局
  // 6-抽屉布局
  .bodydemo_drawer{
    .bodydemo_drawer_top{
      // display: flex;
      // flex-direction: column;
      // align-items: center;
      height: 60vh;
      position: relative;
      .bdt_layout{
        margin: 20px 0px 0px 0px;
      }
      .bdt_blue{
        // display: flex;
        // flex-direction: column;
        // align-items: center;
        .bdt_blue_select{
          display: flex;
          align-items: center;
        }
        .bdt_blue_set{
          display: flex;
          // align-items: center;
          // justify-content: space-between;
          margin: 0px 0px 0px 0px;
          .bdt_blue_set_title{
            position: relative;
            display: flex;
            // align-items: center;
            margin: 0px 38px 0px 2px;
            .bbst_content{
              width: 176px !important;
              // overflow: hidden;
              // white-space: nowrap;
              // text-overflow: ellipsis;
            }
            .icon{
              position: absolute;
              top:4.5px;
              left: -23px;
              width: 25px;
              height: 25px;
            }
          }
        }
        .bdtb_icon{
          margin: 0px 1px 0px 8px;
        }
        .bdtb_icon:hover{
          cursor: pointer;
        }
      }
      .radio_layout {
        border: 1px solid #aeb1ae;
        border-radius: 4px;
        margin: 10px 0px 0px 0px;
        padding: 35px 0px 35px 45px;
        .radio_item {
          margin: 0px 20px 15px 0px;
        }
      }
      .bodydemo_drawer_top_layinfo{
        margin: 20vh 0px 0px;
        .bdtl_lfet{
          margin: 0 10px;
        }
      }
    }
  }

  // 3-布局配置界面 - 底部 预览 确定按钮样式
  .btm_btn {
    text-align: center;
    .btn_item{
      width: 150px;
      margin-bottom: 25px;
    }
    .btn_top{
      display: flex;
      align-items: center;
    }
  }

  // 4-底部 打开自定义配置图片按钮样式
  .btm_set {
    position: fixed;
    right: 15px;
    bottom: 15px;
    img {
      width: 80%;
    }
  }
  // 5-保存方案按钮 布局弹出框样式信息
  /deep/ .ant-modal{
    .bodydemo_modal_top{
      display: flex;
      flex-direction: column;
    }
    .bmt_radio{
      display: flex;
      // justify-content: center;
      height: 80px;
      overflow-y: scroll;
      margin:30px 0px 0px 0px;
      .bmt_radio_sty{
        margin:2px 0px;
        width:235px;
      }
    }
    .bodydemo_modal_btm{
      .bmb_cas{
        width: 260px;
      }
    }
  }

  // 添加指标
  .addTarget{
    display: flex;
    .aSelect{
      margin:  0 auto;
    }
  }
  
  
}
</style>