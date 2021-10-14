<style scoped>
  .selectDiv .dropdown-menu a {

    height: 60px;
    line-height: 60px;
    font-size: 18px;
  }
  .contentSegTitle{
    margin-top: 30px;
  }
.btn-primary, .btn-default{
  height: 60px !important;
  width: 80px!important;
  line-height: 50px!important; 
  font-size: 25px!important;
}


</style>

<template>

  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame">
        <div class="modal modal-for-page" id="myModal" aria-hidden="true" style="display: none;">
          <div class="modal-dialog" style="margin-top: 192px;">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">药剂入库</h4>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label for="exampleInputAccount1">归还层号：</label>
                  <div class="form-group">
                    <div class="btn-group" data-toggle="buttons">
                      <label class="btn btn-primary active">
                        <input type="radio" name="place" value="1层" id="option1" checked> 1 层
                      </label>
                      <label class="btn btn-primary">
                        <input type="radio" name="place" value="2层" id="option2"> 2 层
                      </label>
                      <label class="btn btn-primary">
                        <input type="radio" name="place" value="3层" id="option3"> 3 层
                      </label>
                      </label>
                      <label class="btn btn-primary">
                        <input type="radio" name="place" value="4层" id="option3"> 4 层
                      </label>
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="drugName">药剂名称：</label>
                  <input type="text" class="form-control" name="drugName" id="drugName" v-model="currentDrugName"
                    disabled="disabled" placeholder="">
                </div>
                <div class="form-group">
                  <label for="drugCode">绑定编号：</label>
                  <input type="text" class="form-control" name="drugCode" id="drugCode" v-model="currentBarCode"
                    disabled="disabled" placeholder="">
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-lg btn-default" id="btnCancel" @click="cancelConfirm" style="padding:0!important">取消</button>
                <button type="button" class="btn btn-lg btn-primary" id="btnConfirm" @click="confirmPutIn" style="padding:0!important">确定</button>
              </div>
            </div>
          </div>
        </div>
        <div class="selectArea">
          <div class="selectDiv" style="margin-bottom: 10px">
            <div class="dropdown">
              <button class="btn" style="width: 100%; height: 70px;font-size: 22px" type="button" data-toggle="dropdown">
                {{drugTemplateSelectIndex==-1?"请选择入库单":"入库单_"+drugTemplateList[drugTemplateSelectIndex].CreateDate}}
                <span class="caret"></span></button>
              <ul class="dropdown-menu" style="width: 100%;">
                <li v-for="(item, index) in drugTemplateList" :value="index" @click="changePutInTemplate(index)"><a
                    href="javascript:void(0)">入库单_{{item.CreateDate}}</a></li>
              </ul>
            </div>
          </div>
          <div v-if="drugTemplateSelectIndex!=-1" class="listDiv">
            <div class="rows drug-row" v-for="(item, index) in putInDrugList" :key="index" :class="item.BarCode?'already':''">
              <div class="col-xs-10">
                <div class="col-xs-2 iconSeg-col">
                  <div class="iconSeg">
                    <img src="../../static/image/icon/reagent.png" />
                  </div>
                </div>
                <div class="col-xs-10">
                  <div class="contentSeg">
                    <div class="contentSegTitle">{{item.Name + "&nbsp;(" + (item.BarCode||"未绑定") + ")"
                      +(item.Place==null?"":item.Place)}}
                    </div>
                    <div class="contentSegContext">{{item.EnglishName}}</div>
                  </div>
                </div>
              </div>
              <div class="col-xs-2">
                <div class="statusSeg2" v-if="item.IsSupervise == 1">重点监管</div>
              </div>
            </div>

          </div>
        </div>
        <!-- <div class="listDiv">
                <ul>
                  <li v-for="(item, index) in reagentList" :key="index" @click="reagentClickEvent(item)">
                    <div class="frontDiv">
                      <div class="iconSeg">
                        <img src="../../static/image/icon/reagent.png" />
                      </div>
                      <div class="lineSeg"></div>
                      <div class="contentSeg">
                        <div class="contentSegTitle">{{item.Name + "&nbsp;(" + item.RFID + ")"}}</div>
                        <div class="contentSegContext">{{item.EnglishName}}</div>
                      </div>
                    </div>
                    <div class="backDiv">
                      <div v-if="item.IsSupervise == 1" class="statusSeg2">重点监管</div>
                    </div>
                  </li>
                </ul>
              </div> -->
      </div>
      <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 480px !important" @click="btnDeleteCurrent" id="btnDeleteCurrent" type="button">删除当前入库单</button>
      <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 680px !important" @click="btnExceport" id="btnExceport" type="button">导入入库单</button>
      <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    extends: extend,
    name: "reagentPut",
    data: function () {
      return {
        pageTitle: "药剂入库",
        countDownTimerMax: 120,
        reagentList: [],
        putInDrugList: [],
        currentDrugName: '',
        currentBarCode: 0,
        drugBindIndex: -1, //当前绑定药剂序号
        drugTemplateList: [], //药剂模板列表
        drugTemplateSelectIndex: -1, //当前选择模板序号
        index: '',   //layer index层
      }
    },
    computed: {



    },
    methods: {
      changePutInTemplate: function (index) {
        this.drugTemplateSelectIndex = index;
        var list = new Array();
        if (this.drugTemplateList.length != 0 && this.drugTemplateSelectIndex != -1) {
          var templateContent = JSON.parse(this.drugTemplateList[this.drugTemplateSelectIndex].TemplateContent);
          for (var i = 0; i < templateContent.length; i++) {
            var drugObj = templateContent[i];
            for (var index = 0; index < parseInt(drugObj.ExportCount); index++) {
              list.push(deepCopy(drugObj));
            }
          }
        }
        this.putInDrugList = list;
        this.drugBindIndex=-1;
      },
      reagentIsExistent: function (barCode) {
        for (i = this.reagentList.length - 1; i > -1; --i) {
          if (this.reagentList[i].RFID == barCode) {
            break;
          }
        }
        return i;
      },
      // 时间函数
    //   interval_time:function(){
    //   setInterval(function(){
    //     $('#myModal').modal('hide');
    //   }, 119000);
    //  },
      //入库确认取消
      cancelConfirm: function () {
        $("#btnCancel").attr("disabled", "disabled");
        $('#myModal').modal('hide');
      },
      //入库确认
      confirmPutIn: function () {
        var drugInfo = this.putInDrugList[this.drugBindIndex + 1];
        this.$set(drugInfo, "Place", $("input[name='place']:checked").val());
        var that=this;
        P_Drug.putInDrug(this.currentBarCode, JSON.stringify(drugInfo), JSON.stringify(this.$parent.currentInfo),function(result){
          var obj=JSON.parse(result);
            if (obj.status == 0) {
              that.$set(drugInfo, "BarCode", that.currentBarCode);
              that.drugBindIndex++;
              P_ClientCom.useClient();
              if (that.drugBindIndex + 1 >= that.putInDrugList.length) {
                P_Drug.deleteDrugTemplate(that.drugTemplateList[that.drugTemplateSelectIndex].TemplateId,function(){

                  P_Drug.getWaitPutInDrugTemplateList(JSON.stringify(that.$parent.currentInfo));
                });
                }
          } else {
            that.$set(drugInfo, "Place", '');
            that.$toast.error(obj.message);
          }
          $('#myModal').modal('hide');
          $("#btnConfirm").attr("disabled", "disabled");
        });
       

      },
      //扫描条码入库
      putInDrugByCode: function (barCode) {
        try {
          if (this.drugBindIndex + 1 >= this.putInDrugList.length) {
            this.$toast.info("此入库单已全部绑定！");
            return;
          }
          var drugInfo = this.putInDrugList[this.drugBindIndex + 1];
          this.currentBarCode = barCode;
          this.currentDrugName = drugInfo.Name;
       
          $('#myModal').modal('show');
          var self_ = this
          setTimeout(function () {
            $("#btnCancel").removeAttr("disabled");
            $("#btnConfirm").removeAttr("disabled");
            // self_.interval_time()
          }, 300);
        } catch (e) {
          this.$toast.error(e.message);
        }

      },
      // 删除当前入库单
      btnDeleteCurrent(){
          if(this.drugTemplateList.length==0)
          {
            this.$toast.error("当前无入库单！");
            return;

          }
          P_Drug.deleteDrugTemplate(this.drugTemplateList[this.drugTemplateSelectIndex].TemplateId,function(){

            P_Drug.getWaitPutInDrugTemplateList(JSON.stringify(this.$parent.currentInfo));
            });
      },

      // 导入入库单
      btnExceport(){

        this.index = layer.load(1, {shade: 0.01})
        var ClientId = this.$parent.clientInfo.ClientId
        var ClientName = this.$parent.clientInfo.ClientName
        var CustomerId = this.$parent.clientInfo.CustomerId
        P_User.importTemplate(ClientId, ClientName, CustomerId)
      },
      // 导入入库单成功回调
      ImportTemplateCallback(data){
        $('#btnExceport').blur()
        layer.close(this.index)
        console.log(data.status, 98988989)
        if(data.status==0){
          this.$toast.info(data.message);
          P_Drug.getWaitPutInDrugTemplateList(JSON.stringify(this.$parent.currentInfo));
        }else{

          this.$toast.error(data.message);
          return;
        }
      },
      //用户自定义方法————————————————————————————————————————————————————————————————————————————————————————————————

      tmpSelectChangeEvent: function () {
        this.curReagentIndex = 0;
      },
      getReagentClass: function (item, index) {
        if (index == this.curReagentIndex) {
          return "active";
        } else {
          if (item.barCode) {
            return "already";
          } else {
            return "";
          }
        }
      },
      bindClass: function (statusFlag) {
        if (!statusFlag) {
          return "";
        } else if (statusFlag == "已归还") {
          return "already";
        } else if (statusFlag == "已空瓶") {
          return "empty";
        } else {
          return "";
        }
      },
      getWaitPutInDrugTemplateListCallback: function (obj) {
        layer.close(this.layerIndex);
        if(obj.status!=0)
        {
          this.$toast.error(obj.message);
          return;
        }
        this.drugTemplateList = obj.data;
        this.changePutInTemplate(0);
        //挂钩jquery插件，实现条码识别
        var that = this;
        $(document).barCodeScanerModeEnter(function (barCode) {
          that.$parent.appActive();
          that.putInDrugByCode(barCode);
        });
      }
    },
    created() {
      P_User.reagentPutLog(JSON.stringify(this.$parent.currentInfo))
    },
    mounted: function () {
      $('#myModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: false,
      });
      //获取等待入库药剂模板列表
      this.layerIndex = layer.load(2);
      P_Drug.getWaitPutInDrugTemplateList(JSON.stringify(this.$parent.currentInfo));
    },
  };
</script>
