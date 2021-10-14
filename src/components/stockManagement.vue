<style scoped>
    * {
  touch-action:none !important;
}
  .menuContainer {
    width: 900px;
    height: 500px;
    border: solid 1px #333;
    overflow: hidden;
    padding: 0px;
    padding-right: 20px;
    margin-right: auto;
    margin-left: auto;
    margin: 0px;
  }

  .metro-layout .box {
    box-shadow: #111 0px 0px 5px;

  }

  .metro-layout .box span {
    font-size: 25px !important;

  }

  .metro-layout .items {
    margin-left: 10px !important;
    padding: 0 20px !important;
  }

  .metro-layout .box .icon {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -62px;
    margin-top: -62px;
    z-index: 7;
    font-size: 26px;
  }

  .swiper-container {

    height: 1280px !important;
  }

  .swiper-pagination-bullet {

    width: 16px !important;
    height: 16px !important;
    margin: 0 10px !important;
  }
</style>
<style>
  .swiper-pagination-bullet {

    width: 16px !important;
    height: 16px !important;
    margin: 0 10px !important;
  }
</style>
<style scoped src="../../static/css/metro.css"></style>
<script>
  import {
    swiper,
    swiperSlide
  } from 'vue-awesome-swiper'
</script>

<template>
  <!--页面主体，内容区域-->
  <div class="content">

    <div class="body">
      <div class="frame">


        <div class="metro-layout horizontal" style="padding-top:55px">


          <div class="content clearfix">
            <swiper :options="swiperOption">
              <swiper-slide>

                <div class="items">

                      <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('stockDetail').toPageUrl)">
                        <span>库存明细</span>
                        <div class="icon">
                          <i class="fa fa-list-alt fa-5x"></i>
                        </div>
                      </a>
                  <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('stockRecord').toPageUrl)">
                    <span>流转记录</span>
                    <div class="icon">
                      <i class="fa fa-list-alt fa-5x"></i>
                    </div>
                  </a>
                                      <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('stockOutline').toPageUrl)">
                        <span>库存概要</span>
                        <div class="icon">
                          <i class="fa fa-list-alt fa-5x"></i>
                        </div>
                      </a>
                  <a v-show="['620','820','old820'].indexOf(ClientUseCode)!=-1" class="box" href="javascript:void(0)" @click="go(getMenuInfo('stockEnvironment').toPageUrl)">
                    <span>环境记录</span>
                    <div class="icon">
                      <i class="fa fa-list-alt fa-5x"></i>
                    </div>
                  </a>
                  <!-- <a class="box width2" href="javascript:void(0)" @click="btnExport">
                      <span>导出综合报表数据</span>
                      <div class="icon">
                        <i class="fa fa-download fa-5x"></i>
                      </div>
                    </a> -->
                </div>

              </swiper-slide>

              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

          </div>

        </div>
        <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
      </div>
    
    </div>
  </div>

</template>
<script>
  export default {
    extends: extend,
    name: "stockManagement",
    data:function() {
      return {
        swiperOption: {
          disableScroll: true,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        ClientUseCode:this.$parent.clientInfo.ClientUseCode,
        pageTitle: "数据报表",
        timeStr: "",
        dateStr: "",
        userInfoText: "",

        countDownTimerMax: 80,

      };
    },
    computed: {

    },
    methods: {
      tan: function () {
        alert("fdfdf");

      },

      getMenuInfo: function (moduleCode) {
        switch (moduleCode) {
          case "stockOutline":
            {
              return {
                iconUrl: require("../../static/image/icon/reagentUse.png"),
                toPageUrl: "/stockOutline"
              };
            }
          case "stockDetail":
            {
              return {
                iconUrl: require("../../static/image/icon/reagentReturn.png"),
                toPageUrl: "/stockDetailNew"
              };
            }
          case "stockRecord":
            {
              return {
                iconUrl: require("../../static/image/icon/reagentPutIn.png"),
                toPageUrl: "/stockRecordNew"
              };
            }
          case "stockEnvironment":
            {
              return {
                iconUrl: require("../../static/image/icon/myReagent.png"),
                toPageUrl: "/stockEnvironment"
              };
            }
          default:
            {
              return {};
            }
        }
      },

      //菜单功能————————————————————————————————————————————————————————————————————————————————————————————————————
      menuPage: function (pageIndex) {
        return this.menuList.slice(pageIndex * 6, pageIndex * 6 + 6);
      },
      menuRow: function (pageIndex, rowIndex) {
        return this.menuPage(pageIndex).slice(rowIndex * 2, rowIndex * 2 + 2);
      },
      menuTd: function (pageIndex, rowIndex, tdIndex) {
        var obj = this.menuRow(pageIndex, rowIndex)[tdIndex];
        var code = obj.moduleCode;
        var info = this.getMenuInfo(code);
        info.text = obj.moduleName;
        info.code = code;
        return info;
      },


      afterPageClickEvent: function () {
        this.menuPageCurIndex--;
        if (this.menuPageCurIndex < 0) {
          this.menuPageCurIndex = this.menuPageLength - 1;
        }
        setMenuIndex(this.menuPageCurIndex);
      },
      nextPageClickEvent: function () {
        this.menuPageCurIndex++;
        if (this.menuPageCurIndex == this.menuPageLength) {
          this.menuPageCurIndex = 0;
        }
        setMenuIndex(this.menuPageCurIndex);
      },

      //用户自定义方法————————————————————————————————————————————————————————————————————————————————————————————————
      initMenu: function () {
        var jsonStr = ClientApi.GetSysModule();
        this.menuList = JSON.parse(jsonStr).Data;

        //菜单切换缓存处理
        try {
          var index = getMenuIndex();
          if (index) {
            this.menuPageCurIndex = index;
          } else {
            this.menuPageCurIndex = 0;
          }
        } catch (e) {
          this.menuPageCurIndex = 0;
        }

        sessionStorage.removeItem("useReagentData");
        sessionStorage.removeItem("useReagentDoorStatus");
        sessionStorage.removeItem("returnReagentList");
        sessionStorage.removeItem("putTmpData");
        sessionStorage.removeItem("putCurTmpIndex");
        sessionStorage.removeItem("putCurReagentIndex");
        sessionStorage.removeItem("userList");
        sessionStorage.removeItem("curUser");
      },
      //用户关闭系统点击事件
      closeSystemClickEvent: function () {
        this.popupYNAlert("关闭", "是否关闭电源？", 3000, function () {
          ClientApi.CloseSystem();
        });
      },
      isAdmin: function () {
        var obj = JSON.parse(ClientApi.IsAdmin());
        if (obj.Status == 1) {
          return "ok";
        } else {
          return "no";
        }
      },
      changeLayoutMode: function () {
        var $layout = $('.metro-layout');
        var isHorizontal = false;
        $('.items', $layout).removeAttr('style');
        if (isHorizontal) {
          $('.items', $layout).css({
            width: $('.items', $layout).outerWidth()
          })
        } else {
          $('.items', $layout).css({
            width: 'auto'
          })
        }
      },
      downloadAllReportCallback: function (obj) {
        layer.close(this.layerIndex);
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.$toast.info('导出成功！');
        }
      },
      btnExport:function(){
        this.layerIndex = layer.load(2);
        P_Report.downloadAllReport();
      }
    },
    mounted: function () {

      //解除document的条码扫描监测事件绑定
      $(document).unbind("barCodeScanerModeEnter");
      //window.$('.numkeyboard').unbind("keyboard");
      this.changeLayoutMode();
      sessionStorage.setItem("inUse", undefined);
      sessionStorage.setItem("inUseNone", undefined);
    }
  };
</script>