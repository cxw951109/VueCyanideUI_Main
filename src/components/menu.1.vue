<style scoped>
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
import loginVue from './login.vue';
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
                  <a class="box height2" v-show="use==1" href="javascript:void(0)" @click="go(getMenuInfo('DrugUse').toPageUrl)" style="background: #4c5e51;">
                    <span>领用</span>
                    <div class="icon">
                      <i class="fa fa-hand-lizard-o fa-5x"></i>
                    </div>

                  </a>
                  <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('DrugReturn').toPageUrl)" style="background: #3c5b9b;">
                    <span>归还</span>
                    <div class="icon">
                      <i class="fa fa-share-square-o fa-5x"></i>
                    </div>
                  </a>

                  <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('DrugPutIn').toPageUrl)" style="background: #ffc808;">
                    <span>入库</span>
                    <div class="icon">
                      <i class="fa fa-plus-square fa-5x"></i>
                    </div>
                  </a>

                  <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('MyDrug').toPageUrl)" style="background: #00a9ec;">
                    <span>我的药剂</span>
                    <div class="icon">
                      <i class="fa fa-cubes fa-5x"></i>
                    </div>
                  </a>

                  <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('DrugView').toPageUrl)" style="background: #f874a4;">
                    <span>药剂查询</span>
                    <div class="icon">
                      <i class="fa fa-search fa-5x"></i>
                    </div>
                  </a>
                  <a class="box width2" href="javascript:void(0)" @click="go(getMenuInfo('DataReport').toPageUrl)">
                    <span>报表数据</span>
                    <div class="icon">
                      <i class="fa fa-bar-chart-o fa-5x"></i>
                    </div>
                  </a>
                  <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('WarningData').toPageUrl)" style="background: #6b6b6b;">
                    <span>预警管理</span>
                    <div class="icon">
                      <i class="fa fa-exclamation-triangle fa-5x"></i>
                    </div>
                  </a>
                  <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('Camera').toPageUrl)" ref='video' style="background: #3c5b9b;">
                    <span>视频监控</span>
                    <div class="icon">
                      <i class="fa fa-video-camera fa-5x"></i>
                    </div>
                  </a>
                </div>

              </swiper-slide>
              <swiper-slide>

                <div class="items">
                    <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('UserManage').toPageUrl)" style="background: #3c5b9b;">
                        <span>用户管理</span>
                        <div class="icon">
                          <i class="fa fa-users fa-5x"></i>
                        </div>
                      </a>
                      <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('RemoteManage').toPageUrl)" style="background: #4c5e51;">
                        <span>远程管理</span>
                        <div class="icon">
                          <i class="fa fa-wifi fa-5x"></i>
                        </div>
                      </a>
                  <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('SysSetting').toPageUrl)" style="background: #ffc808;">
                    <span>系统日志</span>
                    <div class="icon">
                      <i class="fa fa-file-text fa-5x"></i>
                    </div>
                  </a>
                  <a class="box" href="javascript:void(0)" @click="go(getMenuInfo('About').toPageUrl)" style="background: #640f6c;">
                    <span>关于系统</span>
                    <div class="icon">
                      <i class="fa fa-cog fa-5x"></i>
                    </div>
                  </a>
                  <a class="box" href="javascript:void(0)" @click="quitSystem" style="background: #0e010f;">
                      <span>退出系统</span>
                      <div class="icon">
                        <i class="fa fa-cog fa-5x"></i>
                      </div>
                    </a>
                </div>

              </swiper-slide>

              <div class="swiper-pagination" slot="pagination"></div>
            </swiper>

          </div>

        </div>

      </div>
    </div>
  </div>

</template>
<script>
  export default {
    extends: extend,
    name: "menu",
    data:function() {
      return {
        swiperOption: {
          disableScroll: true,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        pageTitle: "主菜单",
        timeStr: "",
        dateStr: "",
        userInfoText: "",
        module_list: '',
        countDownTimerMax: 150,
        use: 0,

      };
    },
    computed: {

    },
    methods: {
      tan: function () {
        alert("fdfdf");

      },

      userModuleCallBack: function(obj){
        console.log(obj.data, 1111111111)
        module_list = obj.data

        this.$ref.video.hide()

      },

      getMenuInfo: function (moduleCode) {
        switch (moduleCode) {
          case "DrugUse":
            {
              return {
                iconUrl: require("../../static/image/icon/reagentUse.png"),
                toPageUrl: "/reagentUse"
              };
            }
          case "DrugReturn":
            {
              return {
                iconUrl: require("../../static/image/icon/reagentReturn.png"),
                toPageUrl: "/reagentReturn"
              };
            }
          case "DrugPutIn":
            {
              return {
                iconUrl: require("../../static/image/icon/reagentPutIn.png"),
                toPageUrl: "/reagentPut"
              };
            }
          case "MyDrug":
            {
              return {
                iconUrl: require("../../static/image/icon/myReagent.png"),
                toPageUrl: "/myReagent"
              };
            }
          case "DataReport":
            {
              return {
                iconUrl: require("../../static/image/icon/stockOverview.png"),
                toPageUrl: "/stockManagement"
              };
            }
          case "DrugView":
            {
              return {
                iconUrl: require("../../static/image/icon/reagentQuery.png"),
                toPageUrl: "/reagentSearch"
              };
            }
          case "WarningData":
            {
              return {
                iconUrl: require("../../static/image/icon/warningManagement.png"),
                toPageUrl: "/warningManagement"
              };
            }
          case "UserManage":
            {
              return {
                iconUrl: require("../../static/image/icon/userManagement.png"),
                toPageUrl: "/userManagement"
              };
            }
            case "RemoteManage":
            {
              return {
                iconUrl: require("../../static/image/icon/userManagement.png"),
                toPageUrl: "/remoteManage"
              };
            }
          case "Camera":
            {
              return {
                iconUrl: require("../../static/image/icon/videoSurveillance.png"),
                toPageUrl: "/camera"
              };
            }
          case "About":
            {
              return {
                iconUrl: require("../../static/image/icon/about.png"),
                toPageUrl: "/about"
              };
            }
          case "SysSetting":
            {
              return {
                iconUrl: require("../../static/image/icon/sysConfig.png"),
                toPageUrl: "/sysMaintenance"
              };
            }
          case "QiutSystem":
            {
              return {
                iconUrl: require("../../static/image/icon/quitSystem.png"),
                toPageUrl: "/QuitSystem"
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
      //关机
      closeSystem: function () {
        this.popupYNAlert("关闭", "是否关闭电源？", 3000, function () {
          ClientApi.CloseSystem();
        });
      },
      //退出系统
      quitSystem: function () {
        this.$toast.error("dsdsddddddd");
        
        // this.$confirm('确定要退出系统？', '提示', {
        //         type: 'warning'
        //       }).then(function (result) {
        //         if (result) {

        //         }
        //       });
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
      }
    },
    mounted: function () {
    
      var UserId = this.$parent.userInfo.UserId
      P_User.userPower(UserId)
    
      //解除document的条码扫描监测事件绑定
      $(document).unbind("barCodeScanerModeEnter");
      //window.$('.numkeyboard').unbind("keyboard");
      this.changeLayoutMode();
      P_ClientCom.cancelUseClient();
    }
  };
</script>