<style scoped>

</style>
<template>

  <!--页面主体，内容区域-->
  <div class="content">

    <div class="body">
      <div class="frame">
        <div class="selectArea">
          <div class="selectDiv">
            请取出您需领用的药剂并扫描
          </div>
          <div class="listDiv">
            <div class="rows drug-row" v-for="(item, index) in reagentList" :key="index">
              <div class="col-xs-10">
                <div class="col-xs-2 iconSeg-col">
                  <div class="iconSeg">
                    <img src="../../static/image/icon/reagent.png" />
                  </div>
                </div>
                <div class="col-xs-10">
                  <div class="contentSeg">
                    <div class="contentSegTitle">{{item.Name + "&nbsp;(" + item.BarCode + ")"}}</div>
                    <div class="contentSegContext">{{item.EnglishName}}</div>
                  </div>
                </div>
              </div>
              <div class="col-xs-2">
                <div class="statusSeg2" v-if="item.IsSupervise == 1">重点监管</div>
              </div>
            </div>

          </div>
          <ul>
            <li @click="reagentClickEvent()">
              <div class="frontDiv">

              </div>
              <div class="backDiv">

              </div>
            </li>
          </ul>
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
    name: "reagentUse",
    data: function () {
      return {
        pageTitle: "药剂领用",
        countDownTimerMax: 120,
        reagentList: [],
        doorOpened: false
      }
    },
    methods: {
      //向领用列表添加药剂
      pushUseReagent: function (durgInfo) {
        try {
          if (durgInfo != null) {
            this.reagentList.push(durgInfo);
          } else {

          }
        } catch (e) {

        }
      },
      //判断药剂是否存在于领用列表
      reagentIsExistent: function (barCode) {
        for (i = this.reagentList.length - 1; i > -1; --i) {
          if (this.reagentList[i].BarCode == barCode) {
            break;
          }
        }
        return i;
      },
      //扫码领用事件
      useDrugByCode: function (barCode) {
        try {
          //如果存在，则取消领用
          var index;
          if ((index = this.reagentIsExistent(barCode)) > -1) {
            try {
          
              // var lay_ = layer.confirm('确定要取消领用药剂“' + barCode + '”？', {
              //   btn: ['确定','取消'], skin: 'layer-custom', title: '提示' //按钮
              //     }, function(){
              //       var obj = JSON.parse(P_Drug.cancelUseDrug(barCode, JSON.stringify(self_.$parent.currentInfo)));
              //     if (obj.status == 0) {
              //       layer.close(lay_)
              //       self_.$toast.error("取消成功");
              //       self_.reagentList.splice(index, 1);
              //     }
              //     }, function(){
              //       return
              //     });
              var self_ = this;
              layer.confirm('确定要取消领用药剂“' + barCode + '”？', {
          btn: ['确定','取消'], skin: 'layer-custom', title: '提示' //按钮
        }, function(index){
          var obj = JSON.parse(P_Drug.cancelUseDrug(barCode, JSON.stringify(self_.$parent.currentInfo)));
                  if (obj.status == 0) {
                    self_.$toast.error("取消成功! ");
                    self_.reagentList.splice(index, 1);
                  }else{
                    self_.$toast.error(obj.message);
                  }
                  layer.close(index);
        }, function(){
          return
        });
            } catch (e) {
              this.$toast.error(e.message);
            }
          } else {
            try {
              var self_ = this;
              P_Drug.useDrug(barCode, JSON.stringify(this.$parent.currentInfo), false,function(result){
                var obj=JSON.parse(result);
                if (obj.status == 0) {
                  self_.pushUseReagent(obj.data);

              } else if (obj.status == 2) {
                // this.$toast.info(obj.message);
                
              layer.confirm(obj.message+";是否仍要领用此药剂？", {
          btn: ['确定','取消'], skin: 'layer-custom', title: '提示' //按钮
        }, function(index){
          P_Drug.useDrug(barCode, JSON.stringify(that.$parent.currentInfo), true,function(result1){
            var obj1 = JSON.parse(result1);
            if (obj1.status == 0) {
                    self_.pushUseReagent(obj1.data);
                  }else{
                    self_.$toast.error(obj1.message);
                  }
                  layer.close(index);
          });
         

        }, function(){
          return
        });
              } else {
                self_.$toast.error(obj.message);
              }
        });
       
            

            } catch (e) {
              this.$toast.error(e.message);
            }
          }
        } catch (e) {
          this.$toast.error(e.message);
        }
      },
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
      reagentClickEvent: function (item) {
        sessionStorage.setItem("useReagentData", JSON.stringify(this.reagentList));
        sessionStorage.setItem("useReagentDoorStatus", this.doorOpened);
        goto("reagentDetail.html?barCode=" + item.RFID);
      },
    },
    mounted: function () {
      var that = this;
      //挂钩jquery插件，实现条码识别
      $(document).barCodeScanerModeEnter(function (barCode) {
        that.$parent.appActive();
        that.useDrugByCode(barCode);
      });
      P_ClientCom.useClient();
    },
    // 模板创建执行函数
    created() {
      P_User.reagentUseLog(JSON.stringify(this.$parent.currentInfo))
    },
  };
</script>