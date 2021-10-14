<style scoped>
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
            <div class="modal-dialog" style="margin-top: 192.333px;">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">药剂归还-“{{returnBoxTitle}}”</h4>
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
                    <label for="exampleInputPassword1">药剂余量：</label>
                    <div class="input-group">
                      <input type="number" class="form-control numkeyboard" id="drugRemain" placeholder="">
                      <span class="input-group-addon">g/ml</span>
                    </div>
                  </div>
                  <div class="form-group">
                    <div style="border: 1px solid #ccc; padding: 10px">
                      <div class="switch text-left">
                        <input id="isEmpty" type="checkbox">
                        <label>是否空瓶：</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-lg btn-default" id="btnCancel" @click="cancelConfirm"  style="padding:0!important">取消</button>
                  <button type="button" class="btn btn-lg btn-primary" id="btnConfirm" @click="confirmRetrun($event)"  style="padding:0!important">确定</button>
                </div>
              </div>
            </div>
          </div>
          <div class="selectArea">
            <div class="selectDiv">
              请扫描您可以归还的药剂
            </div>
            <div class="listDiv">
              <div class="rows drug-row" v-for="(item, index) in reagentList" :class="bindClass(item.StatusFlag)" :key="index">
                <div class="col-xs-10">
                  <div class="col-xs-2 iconSeg-col">
                    <div class="iconSeg">
                      <img src="../../static/image/icon/reagent.png" />
                    </div>
                  </div>
                  <div class="col-xs-10">
                    <div class="contentSeg">
                      <div class="contentSegTitle">{{item.Name + "&nbsp;(" + item.BarCode + ")"+ "&nbsp;[" +
                        (item.StatusFlag || "未归还") + "]"
                        +(item.Place==null||item.StatusFlag!="已归还"?"":item.Place)}}</div>
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
        <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
      </div>
    </div>
    </div>
  </template>
  <script>
    export default {
      extends: extend,
      name: "reagentReturn",
      data: function () {
        return {
          pageTitle: "药剂归还",
          returnBoxTitle: "",
          reagentList: [],
          waitConfirmDrugIndex: 0,
          countDownTimerMax: 120,
        }
      },
      methods: {
        reagentIsExistent: function (barCode) {
          for (i = this.reagentList.length - 1; i > -1; --i) {
            console.log(this.reagentList[i].BarCode, barCode, 99999999999999)
            if (this.reagentList[i].BarCode == barCode) {
              break;
            }
          }
          return i;
        },
        //扫描条码归还
        returnDrugByCode: function (barCode) {
  
          try {
            var index = this.reagentIsExistent(barCode);
            console.log(index, 77777777777777777777)
            if (index == -1) {
              this.$toast.error("待归还列表不存在此药剂编号！");
              return;
            }
            var dstObj = this.reagentList[index];
            this.returnBoxTitle = dstObj.Name + '(' + barCode + ')';
            this.waitConfirmDrugIndex = index;
            $(document).barCodeScanerModeExit();
            $('#myModal').modal('show');
            setTimeout(function(){
              $("#btnCancel").removeAttr("disabled");
              $("#btnConfirm").removeAttr("disabled");
              $('#drugRemain').focus();
            }, 300);
  
          } catch (e) {
            this.$toast.error(e.message);
          }
        },
        cancelConfirm: function () {
          $("#btnCancel").attr("disabled", "disabled");
          $('#myModal').modal('hide');
          var that = this;
          $(document).barCodeScanerModeEnter(function (barCode) {
            that.$parent.appActive();
            console.log(barCode, 66666666666666)
            that.returnDrugByCode(barCode);
          });
        },
        //确认归还
        confirmRetrun: function (e) {
          try {
            // if($("#drugRemain").val()==""){
            //   this.$toast.error('药剂余量不能为空！');
            //   $('#drugRemain').focus();
            //   return;
            // }
            var that=this;
            P_Drug.returnDrug(this.reagentList[this.waitConfirmDrugIndex].BarCode, $(
              "input[name='place']:checked").val(), JSON.stringify(this.$parent.currentInfo), $("#drugRemain").val(),
              $(
                "#isEmpty").prop("checked"),function(result){
                  var obj = JSON.parse(result);
              if (obj.status == 0) {
                that.$set(that.reagentList[that.waitConfirmDrugIndex],"Place",$("input[name='place']:checked").val());
                that.$set(that.reagentList[that.waitConfirmDrugIndex],"StatusFlag",$("#isEmpty").prop("checked") ? "已空瓶" : "已归还");
              $("#drugRemain").val('');
              $("#drugRemain").removeAttr("disabled");
              that.$toast.info('归还成功！')
              P_ClientCom.useClient();
            } else {
              $("#drugRemain").val('');
              $("#drugRemain").removeAttr("disabled");
              that.$toast.error(obj.message);
            }
            $("#isEmpty").prop("checked", false);
          });
          $(document).barCodeScanerModeEnter(function (barCode) {
            that.$parent.appActive();
            console.log(barCode, 66666666666666)
            that.returnDrugByCode(barCode);
          });
          $('#myModal').modal('hide');
          $("#btnConfirm").attr("disabled","disabled");
  
          } catch (e) {
            this.$toast.error(e.message);
          }
  
        },
        tmpSelectChangeEvent: function () {
          this.curReagentIndex = 0;
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
        //获取等待归还药剂列表回调
        getWaitRetrunDrugListCallback: function (obj) {
          layer.close(this.layerIndex);
          this.reagentList = obj.data
          //挂钩jquery插件，实现条码识别
          var that = this;
          $(document).barCodeScanerModeEnter(function (barCode) {
            that.$parent.appActive();
            console.log(barCode, 66666666666666)
            that.returnDrugByCode(barCode);
          });
        }
      },
      mounted: function () {
        window.$('.numkeyboard').keyboard(keyBordSetting);
        $('#myModal').modal({
          backdrop: 'static',
          keyboard: false,
          show: false,
        });
        $("#isEmpty").click(function () {
  
          if ($(this).prop("checked")) {
            $("#drugRemain").val(0);
            $("#drugRemain").attr("disabled", "disabled");
          } else {
  
            $("#drugRemain").removeAttr("disabled");
          }
  
        });
        //获取等待归还药剂列表
        this.layerIndex = layer.load(2);
        P_Drug.getWaitRetrunDrugList(JSON.stringify(this.$parent.currentInfo));
      },
      // 模板创建执行函数
      created() {
        P_User.reagentReturnLog(JSON.stringify(this.$parent.currentInfo))
      },
    };
  </script>