<style scoped>
  * {
  touch-action:none !important;
}

.menu-frame{
  display:flex;
  flex-direction:column;
  align-items: center;
}
.menu-top{
  display:flex;
  width:90%;
  margin-top: 40px;
  justify-content: space-between;
}
.menu-datetime .menu-time{
  font-size: 40px;
  font-weight: bold
}
.menu-datetime .menu-date{
  font-size:20px;font-weight: bold
}
.menu-top .menu-tools{
  display:flex;
  justify-content: space-between
}
.menu-setting{
  width:70px;
  height:70px;
  background-image: url(../../static/image/de_icon/setting_normal.png);
  background-size:cover;
}
.menu-setting:hover{
  background-image: url(../../static/image/de_icon/setting_hover.png);
}
.menu-box{
  display:flex;
  flex-direction: column;
  justify-content:space-between;
  align-items:center;
  width:90%;
  height:830px;
  margin-top: 20px;
  
}
.menu-box .menu-item{
  display:flex;
  flex-direction:column;
  justify-content:flex-end;
  align-items: center;
  width:530px;
  height:400px;
  /* background-color: #222121; */
  background-color: #2c2c2c;
  border-radius:20px;
  box-shadow: 10px 10px 20px #1a1a1a;
  border:3px solid #5c5edc;
  cursor: pointer;
  /* border:2px solid #ffffff; */
  /* border:3px solid #5c5edc; */
}
.menu-box .menu-item:hover{
  /* border:2px solid #f4ea2a; */
  border:3px solid #f4ea2a;
  background-color: #2c2c2c;
}
.menu-box .menu-item .menu-item-title{
  height:100px;
  line-height:100px;
  font-size:30px;
  color:#d1d1d1;
  font-weight: bold;
}
.menu-box .menu-item .menu-hr-line{
  /* margin:0 auto; */
  /* margin-top:450px; */
  height: 0.3rem;
  width: 85%;
  background: radial-gradient(#5c5edc 3%, transparent  100%);
}
.menu-item .menu-add-shiyan{
  width:300px;
  height:500px !important;
  background-image: url(../../static/image/de_icon/menu_shiyan_logo.png);
  background-size: 230px 260px;
  background-repeat: no-repeat;
  background-position:center center;
}
.menu-item .menu-report{
  width:300px;
  height:500px !important;
  background-image: url(../../static/image/de_icon/menu_report_logo.png);
  background-size: 220px 270px;
  background-repeat: no-repeat;
  background-position:center center;
}
.menu-item .menu-qingxi{
  width:300px;
  height:500px !important;
  background-image: url(../../static/image/de_icon/menu_qingxi.png);
  background-size: 210px 260px;
  background-repeat: no-repeat;
  background-position:center center;
}
.menu-item .menu-current-run{
  font-size:200px;
  height:55%;
  line-height: 80%;
}
.menu-tools .user-opera{
  width:180px;
  height:80px;
  line-height: 80px;
  font-size: 25px;
  font-weight: bold;
  /* background-image: url(../../static/image/de_icon/user_opera_normal.png); */
  background-image: url(../../static/image/de_icon/user_opera_hover.png);
  background-size: 60px 60px;
  background-position: 0px center;
  background-repeat: no-repeat;
  text-indent: 70px;
  /* color:#9797a5 */
  color: #f4ea2a;
}
.menu-tools .user-opera:hover{
  color: #f4ea2a;
  background-image: url(../../static/image/de_icon/user_opera_hover.png);
}
.menu-bottom{
  width:90%;
  display:flex;
  justify-content:space-between;
  margin-top:100px;
}
.menu-bottom .menu-logo{
  width:230px;
  height:75px;
  background-image: url(../../static/image/de_icon/yanyi_logo.png);
  background-size: cover;
  background-position: 18px center;
}

</style>
<style>

</style>



<template>
  <!--页面主体，内容区域-->
  <div class="content">

    <div class="body">
      <div class="menu-frame">
        <div class="menu-top">
          <div class="menu-datetime"> <span class="menu-time">{{timeStr}}</span> <span class="menu-date"> {{dateStr}}</span></div>
          <div class="menu-tools">
            <div class="user-opera" @click="user_opera_open = !user_opera_open">{{this.$parent.userInfo.real_name}}<span style="font-size:30px"></span>
              <mu-menu cover placement="bottom-end" :open.sync="user_opera_open" style="margin-top: 80px;">
                  <mu-list slot="content" style="zoom: 1.3;">
                    <mu-list-item button v-if='this.$parent.userInfo.user_role == 1' @click="btnUserManage()">
                      <mu-list-item-title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;用户管理&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button @click="btnLogout()">
                      <mu-list-item-title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注销登录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</mu-list-item-title>
                    </mu-list-item>
                    <mu-list-item button @click="powerOff()">
                      <mu-list-item-title>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;关机&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</mu-list-item-title>
                    </mu-list-item>
                  </mu-list>
              </mu-menu>
            </div>
          </div>
        </div>
       <div class="menu-box">
          <div class="menu-item" style=" border:3px solid rgb(27 27 24) !important;" @click="addExperiment()">
            <div class="menu-add-shiyan"></div>
            <div class="menu-hr-line"></div>
            <div class="menu-item-title">添加设备试验</div>
          </div>
          <!-- <div class="menu-item" @click="viewExperimentList(that.$parent.runClientList.length)">
            <div class="menu-current-run">{{this.$parent.runClientList.length}}</div>
            <div class="menu-hr-line"></div>
            <div class="menu-item-title">查看进行中试验</div>
          </div> -->
          <div style="display:flex;justify-content:space-between;width:530px">
            <!-- rgb(169 168 154) -->
          <div class="menu-item"  style="width:250px; border:3px solid rgb(27 27 24) !important;" @click="cleaningProcess()">
            <div class="menu-qingxi"></div>
            <div class="menu-hr-line"></div>
            <div class="menu-item-title">清洗系统</div>
          </div>
          <div class="menu-item" style="width:250px; border:3px solid rgb(27 27 24) !important;" @click="viewReportList()">
            <div class="menu-report"></div>
            <div class="menu-hr-line"></div>
            <div class="menu-item-title">历史试验数据</div>
          </div>
        </div>
        </div> 
        <div class="menu-bottom">
          <div></div>
          <div class="menu-logo"></div>
          <!-- <div class="menu-setting"></div> -->
        </div>
      </div>
    </div>
    <el-dialog title="预备试验参数" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
        <el-form-item label="样品名称" prop="material_name">
          <el-input placeholder="请输入"  v-model="form.material_name"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="试验时长" prop="set_experiment_time">
          <el-input placeholder="请输入"  v-model="form.set_experiment_time" type="number" step="1"  min="1" max="60">
            <template slot="append">min</template>
          </el-input>
        </el-form-item>
        <el-form-item label="氮气流量" prop="set_flow">
          <el-input placeholder="请输入"  v-model="form.set_flow" type="number" step="0.1"  min="0" max="600">
            <template slot="append">ml/min</template>
          </el-input>
        </el-form-item>
        <el-form-item label="搅拌转速" prop="set_rpm">
          <el-input placeholder="请输入"  v-model="form.set_rpm" type="number" step="0.1" min="0" max="350">
            <template slot="append">rpm</template>
          </el-input>
        </el-form-item>
        <el-form-item label="试验模式">
          <el-radio-group v-model="form.set_moshi">
            <el-radio label="1" border value="1">自动抽硫酸</el-radio>
            <el-radio label="2" border value="2">手动抽硫酸</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="抽取速度" v-show="form.set_moshi=='1'" prop="set_liusuan_rpm">
          <el-input placeholder="请输入"  v-model="form.set_liusuan_rpm" type="number" step="0.1" min="0" max="350">
            <template slot="append">ml/min</template>
          </el-input>
          <el-link type="info">共需 50ml 硫酸溶液，当前速度需抽取{{Math.ceil(50/form.set_liusuan_rpm*60)}}秒</el-link>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('form')">取 消</el-button>
        <el-button type="primary" @click="setLiuSuanValve()">调硫酸阀</el-button>
        <el-button type="primary" @click="submitForm('form')">开始试验</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设备清洗程序" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="dialogFormVisible1">
      <div style="display:flex">
      <div class="block" style="width:160px;">
        <el-timeline>
          <el-timeline-item
            v-for="(activity, index) in activities"
            :key="index"
            :icon="activity.icon"
            :type="activity.type"
            :color="activity.color"
            :size="activity.size"
            :timestamp="activity.timestamp">
            {{activity.content}}
          </el-timeline-item>
        </el-timeline>
      </div>
      <div style="margin-top:0px" v-show="qingxiFlag">
        <img style="width:300px;height:360px" src="../../static/image/loading.gif">
      </div>
    </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('form')" v-show="qingxiFlag==false">取 消</el-button>
        <el-button type="primary" @click="setLiuSuanValve()">调水阀</el-button>
        <el-button type="primary" @click="qingxi()">{{qingxiFlag==false ? "开始清洗" : "中止清洗"}}</el-button>
      </div>
    </el-dialog>

  </div>

</template>
<script>
  export default {
    extends: extend,
    name: "menu",
    data:function() {
      return {
        user_opera_open: false,
        swiperOption: {
          disableScroll: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          }
        },
        pageTitle: "认证成功",
        formLabelWidth: '110px',
        dialogFormVisible: false,
        dialogFormVisible1: false,
        qingxiFlag:false,
        qingxiStep:0,
        form: {
            material_name: '',
            set_experiment_time: 30,
            set_flow: 60,
            set_rpm: 30,
            set_moshi:'1',
            set_liusuan_rpm:350,

        },
        activities: [{
          content: '抽取清水',
          timestamp: '未开始',
          size: 'large',
          // type: 'success',
          // color: '#494bc7'
        }, {
          content: '注入清水',
          timestamp: '未开始',
          size: 'large',
          // color: '#494bc7'
          // color: '#0bbd87'
        }, {
          content: '开启搅拌',
          timestamp: '未开始',
          size: 'large'
        }, {
          content: '等待1分钟',
          timestamp: '未开始'
        }, {
          content: '完成',
          timestamp: '未开始'
        }
      ],
        rules: {
          material_name: [
            { required: true, message: '请输入样品名称', trigger: 'blur' }
          ],
          set_experiment_time: [
            { required: true, message: '请输入试验时长', trigger: 'blur' }
          ],
          set_flow: [
            { required: true, message: '请输入氮气流量', trigger: 'blur' }
          ],
          set_rpm: [
            { required: true, message: '请输入搅拌转速', trigger: 'blur' }
          ],
          set_liusuan_rpm: [
            { required: true, message: '请输入硫酸搅抽取速度', trigger: 'blur' }
          ],
        },
        timeStr: "",
        dateStr: "",
        userInfoText: "",
        module_list: '',
        countDownTimerMax: 180,
        use: 0,
        that:this,
        intervalId:null,
        qingxiInterval:null,

      };
    },
    watch: {
        form: {
    　　　　handler(newValue, oldValue) {
    　　　　　　if(newValue.set_moshi=='1'){
                  this.rules.set_liusuan_rpm[0].required=true;
                }else{
                  this.rules.set_liusuan_rpm[0].required=false;
                }
    　　　　},
    　　　　deep: true
    　　}
    },
    computed: {

    },
    methods: {
      getTimeDefaultFormat: function () {
        return (
          padLeft(getHours(), 2, "0") +
          ":" +
          padLeft(getMinutes(), 2, "0") +''
          // ":" +
          // padLeft(getSeconds(), 2, "0")
        );
      },
      //获得默认格式的日期
      getDateDefaultFormat: function () {
        return (
          getDay()+"，"+
          getMonth() +
          "月" +
          getDate() +
          "日" 
        );
      },
      //日期时间更新方法
      updateDateTime: function () {
        this.timeStr = this.getTimeDefaultFormat();
        this.dateStr = this.getDateDefaultFormat();
      },
      btnLogout:function(){
        this.go("/login");
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
      },
      isAdmin: function () {
        var obj = JSON.parse(ClientApi.IsAdmin());
        if (obj.Status == 1) {
          return "ok";
        } else {
          return "no";
        }
      },

      //——————————菜单跳转————————————
      //添加设备试验
      addExperiment: function () {
        this.dialogFormVisible=true;
      },
      cleaningProcess: function () {
        this.dialogFormVisible1=true;
      },
      //查看设备试验列表
      viewExperimentList:function(syCount){
        if(syCount==0){
          this.$message.error('暂无进行中试验设备！');
        }else{
          this.go("/experimentList");
        }
        
      },
      viewReportList:function () {
        // this.$message.error('暂无报表数据！');
        this.go("/stockDBManagement");
      },
      btnUserManage:function () {
        this.go("/userManagement");
      },
      powerOff(){
        var that=this;
          this.$confirm('确认关机么?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            appx.powerOff();
          }).catch(() => {

          });
      },
      qingxi(){
        var that=this;
        that.qingxiStep=0;
        that.activities.forEach(element => {
          element.timestamp="未开始";
          element.type="";
        });
        if(!this.qingxiFlag){
         that.qingxiInterval=setInterval(() => {
            switch (that.qingxiStep) {
            case 0:
              that.qingxiStep=1;
              that.activities[0].timestamp="正在进行";
              that.activities[0].type="primary";
              
              $.get(that.$parent.apiAddress  + "/sulfuricAcid",{'value':350},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    setTimeout(() => {
                      $.get(that.$parent.apiAddress  + "/stopSulfuricAcid",{},
                      function (res1) {
                        var obj1 = JSON.parse(res1);
                        if (obj1.status == 1) {
                          that.qingxiStep=2;
                        }
                        // console.log('res:',res);
                    });
                      
                    }, 35000);
                  }
                  // console.log('res:',res);
              });
              // $.get(that.$parent.apiAddress  + "/openNitrogen",{},
              //   function (res) {
              //     var obj = JSON.parse(res);
              //     if (obj.status == 1) {
              //       that.qingxiStep=2;
              //     }
              // });
              break;
            case 2:
              that.qingxiStep=3;
              that.activities[0].timestamp="已完成";
              that.activities[0].type="success";
              that.activities[1].timestamp="正在进行";
              that.activities[1].type="primary ";
              $.get(that.$parent.apiAddress  + "/injectAcid",{},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    setTimeout(() => {
                      that.qingxiStep=4;
                    }, 30000);
                  }
              });
              break;
            case 4:
              that.qingxiStep=5;
              that.activities[1].timestamp="已完成";
              that.activities[1].type="success";

              that.activities[2].timestamp="正在进行";
              that.activities[2].type="primary ";
              $.get(that.$parent.apiAddress  + "/openStir",{'value':5000},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.qingxiStep=6;
                  }
                  // console.log('res:',res);
              });
             
              break;
            case 6:
              that.qingxiStep=7;
              that.activities[2].timestamp="已完成";
              that.activities[2].type="success";

              that.activities[3].timestamp="正在进行";
              that.activities[3].type="primary ";
              setTimeout(() => {
                that.qingxiStep=8;
              }, 60*1000);
              
              break;
            case 8:
              that.qingxiStep=9;
              that.activities[3].timestamp="已完成";
              that.activities[3].type="success";
              that.activities[4].timestamp="已完成";
              that.activities[4].type="success ";
              $.get(that.$parent.apiAddress  + "/closeDevice",{},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.qingxiStep=10;
                  }
                  // console.log('res:',res);
              });
              
              break;
            case 10:
              that.qingxiFlag=false;
              clearInterval(that.qingxiInterval);
              break;
            default:
              break;
          }
          }, 1000);
        }
        else
        {
          if(that.qingxiInterval){
            clearInterval(that.qingxiInterval);
          }
          $.get(that.$parent.apiAddress  + "/closeDevice",{},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.qingxiStep=0;
                  }
                  // console.log('res:',res);
          });
          
        }
        this.qingxiFlag=!this.qingxiFlag;
      },
      setLiuSuanValve(){
        var that=this;
        $.get(that.$parent.apiAddress  + "/setLiuSuanValve",{},
          function (res) {
            var obj = JSON.parse(res);
            if (obj.status == 1) {
              that.$message.success('已执行!');
            }
        });
      },
      submitForm(formName) {
          var that=this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              that.dialogFormVisible = false;
              that.$parent.layerIndex=layer.load(2);
              $.ajax({
                        url: that.$parent.apiAddress + "/insertExperiment",
                        type:"get",
                        data: {
                            material_name: that.form.material_name,experiment_code: '',
                            set_experiment_time:that.form.set_experiment_time,set_flow:that.form.set_flow,
                            set_stir_time:that.form.set_rpm,set_drainage_time:'0~0',
                            set_waterin_time:'0~0',
                            device_ip_address:'',device_mac_address:'',
                            description: '',
                            user_id: that.$parent.userInfo.user_id, user_name: that.$parent.userInfo.real_name
                        },
                        complete:function(){
                          layer.close(that.$parent.layerIndex);
                        },
                        success: function (res) {
                          layer.close(that.$parent.layerIndex);
                          var obj = JSON.parse(res);
                          if (obj.status == 1) {
                              sessionStorage.set_liusuan_rpm=that.form.set_liusuan_rpm;
                              sessionStorage.set_moshi=that.form.set_moshi;
                              that.$parent.currentExperimentId=obj.data;
                              // pushClient.experimentId=obj.data;
                              // that.$parent.runClientList.push(pushClient);
                              // that.$parent.compareClientList.push(JSON.parse(JSON.stringify(that.readyDeviceInfo)));
                              // console.log('runClientList:',that.$parent.runClientList);
                              that.go('/experimentList');
                            }else{
                              layer.alert(JSON.stringify(res));
                            }

                          },
                          error: function (XMLHttpRequest, textStatus, errorThrown) {
                            layer.close(that.$parent.layerIndex);
                            alert(errorThrown);
                          }
                      });
              
            } else {
              console.log('error submit!!');
              return false;
            }
          });
      },
      cancelForm(formName){
          this.dialogFormVisible = false;
          this.dialogFormVisible1 = false;
      }

    },
    mounted: function () {
      var that=this;
      console.log("runClientList:",that.$parent.runClientList);
      that.updateDateTime();
      this.intervalId=setInterval(function () {
        that.updateDateTime();
      }, 1000);
    },
    beforeDestroy: function () {
      clearInterval(this.intervalId);
    },
  };
</script>