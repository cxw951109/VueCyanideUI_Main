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
  
    .rightText{
      margin-left: 20px;
    }
  </style>
  <template>
      <!--页面主体，内容区域-->
      <div class="content">
        <div class="body">
          <div class="frame">
            <div class="listArea" style="height:690px !important">
              <ul>
                <li>
                  <span class="leftText">药剂柜编号</span>
                  <span class="rightText">{{infoData.ClientCode}}</span>
                </li>
                <li>
                  <span class="leftText">负责人</span>
                  <span class="rightText">{{infoData.ContactPeopleName}}</span>
                </li>
                <li>
                  <span class="leftText">负责人联系方式</span>
                  <span class="rightText">{{infoData.ContactPhone}}</span>
                </li>
                <li>
                  <span class="leftText">药剂柜存放地址</span>
                  <span class="rightText">{{infoData.Place}}</span>
                </li>
                <li>
                  <span class="leftText">备注</span>
                  <span class="rightText">{{infoData.Description}}</span>
                </li>
                <li>
                  <span class="leftText">今日领用数量</span>
                  <span class="rightText">{{infoData.todayUseCount}}</span>
                </li>
                <li>
                  <span class="leftText">今日归还数量</span>
                  <span class="rightText">{{infoData.todayReturnCount}}</span>
                </li>
                <li>
                  <span class="leftText">今日入库数量</span>
                  <span class="rightText">{{infoData.todayPutInCount}}</span>
                </li>
                <li>
                  <span class="leftText">过期药剂数量</span>
                  <span class="rightText">{{infoData.expiredDrugCount}}</span>
                </li>
                <li>
                  <span class="leftText">生产商</span>
                  <span class="rightText">杭州研一智控科技有限公司</span>
                </li>
                <!-- <li>
                  <span class="leftText">售后联系方式</span>
                  <span class="rightText">15068888163</span>
                </li> -->
                <li>
                  <span class="leftText">版本号</span>
                  <span class="rightText">v2.3</span>
                </li>
              <li>
                <span class="leftText">本机IP</span>
                <span class="rightText">{{infoData.localIP}}</span>
              </li>
              <li>
                <span class="leftText">当前设置服务器IP</span>
                <span class="rightText">{{infoData.serverIP}}</span>
              </li>
              </ul>
            </div>
            <!--<div v-if="isAdmin()=='ok'">
                                  <div class="btn-bottom-left" @click="btnUpdateSystemClickEvent">更新系统</div>
                              </div>-->
            <!--<div class="btn-bottom2" @click="btnHelperClickEvent">帮助手册</div>-->
          <button v-show="userInfo.Account=='admin'" class="btn btn-danger btn-lg list-btn-bottom-right" style="left:20px !important" @click="btnClearData" type="button">清空数据</button>
          <button v-show="userInfo.Account=='admin'" class="btn btn-primary btn-lg list-btn-bottom-right" style="left:160px" @click="btnResetServerClickEvent" type="button">重置服务器</button>
          <button v-show="userInfo.RoleName=='管理员'" class="btn btn-danger btn-lg list-btn-bottom-right" style="left:300px !important" @click="btnUpdateSystem" type="button">更新系统</button>
          <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
          </div>

        </div>
      </div>
  </template>
  <script>
    export default {
      name: "about",
      extends: extend,
      data: function () {
        return {
          pageTitle: "关于本柜",
          countDownTimerMax: 120,
          infoData: {},
          userInfo:this.$parent.userInfo,
        };
      },
      computed: {
  
      },
      methods: {
      btnUpdateSystem:function(){
        layer.confirm('您确定要更新系统么，软件将关闭？', {
          btn: ['确定','取消'], skin: 'layer-custom', title: '提示' //按钮
        }, function(){
          //  P_User.exit()
          P_Client.updateSystem();
        }, function(){
          return
        });
        
        },
        btnClearData:function(){
          this.layerIndex = layer.load(2);
          P_Client.clearData();
          
        },
        clearDataCallback:function(obj){

          layer.close(this.layerIndex);
          if (obj.status != 0) {
            this.$toast.error(obj.message);
          } else {
            this.$toast.info(obj.message);
          }
        },
        btnResetServerClickEvent:function(){
        layer.confirm('您确定要重启服务器设置么，软件将重启？', {
          btn: ['确定','取消'], skin: 'layer-custom', title: '提示' //按钮
        }, function(){
          //  P_User.exit()
          P_Client.resetServer();
        }, function(){
          return
        });
        
      }
      },
      mounted: function () {
          var that=this;
          P_Client.getSystemAboutInfo(JSON.stringify(this.$parent.currentInfo),function(result){
            var obj = JSON.parse(result);
            if (obj.status != 0) {
              that.$toast.error(obj.message);
          } else {
              that.infoData = obj.data;
          }
        });
      }
    };
  
  </script>
  
