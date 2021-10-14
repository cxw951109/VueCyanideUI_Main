<style scoped> 



</style>

<style>

/* 定义keyframe动画，命名为blink */
@keyframes blink{
  0%{opacity: 1;}
  100%{opacity: 0;} 
}
/* 添加兼容性前缀 */
@-webkit-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
@-moz-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
@-ms-keyframes blink {
    0% {opacity: 1; } 
    100% { opacity: 0;}
}
@-o-keyframes blink {
    0% { opacity: 1; }
    100% { opacity: 0; }
}
/* 定义blink类*/
.blink{
    color: #dd4814;
    animation: blink 1s linear infinite;  
    /* 其它浏览器兼容性前缀 */
    -webkit-animation: blink 1s linear infinite;
    -moz-animation: blink 1s linear infinite;
    -ms-animation: blink 1s linear infinite;
    -o-animation: blink 1s linear infinite;
}
.common-top{
  height:75px;
  line-height:75px;
  background: rgba(0, 0, 0, 0.51);
  padding:0 15px;
  color: #d1d1d1;
  font-weight:bold;
  display: flex;
  justify-content:space-between;
}
.common-top .common-top-title{
  font-size:28px;
}
.common-top-btn{
  line-height:60px;
}
.common-bottom{
  height:70px;
  line-height:70px;
  background: rgba(0, 0, 0, 0.51);
  display: flex;
  justify-content:space-between;
  font-size:20px;
  padding: 0 20px;
}
/* .content{
  display:flex;
  flex-direction: column;
  justify-content: space-between;
} */
[class^="el-icon-fa"], [class*=" el-icon-fa"] {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome!important;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

</style>


<template>
  
  <div id="app">
    <!-- <div class="app-bg"></div> -->
    <div class="app" v-cloak>
      <!--页面主体，头部区域-->
      <div class="common-top" v-show="!(path ==='/menu') ">
        <div class="common-top-title">{{pageTitle}}</div>
        <!-- icon="el-icon-fa fa-mail-reply" -->
        <div class="common-top-btn"><el-button type="primary" v-show="!(path ==='/login') " @click="goBack()" >返回主界面</el-button></div>
      </div>
      <router-view ref="child" />
      <div class="common-bottom" v-show="!(path ==='/menu') ">
        <div>{{dateStr+' '+timeStr}}</div>
        <div>杭州研一智控科技有限公司</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "App",
    data() {
      return {
        path:'',
        pageTitle: "",
        timeStr: "",
        dateStr: "",
        countDownTimer: 60,
        userInfo: null,
        warningStr:'',
        layerIndex:0,
        serverIp:'127.0.0.1',
        apiAddress:'http://127.0.0.1:5556',
        currentExperimentId:'',
        compareClientList:[],
        runClientList:[],
        writeDataIntervalId:null,
        commonData:[0,0],
        deviceData:[[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]],
      }
    },
    computed: {
      timeDefaultFormat: function () {
        return (
          padLeft(getHours(), 2, "0") +
          ":" +
          padLeft(getMinutes(), 2, "0") +
          ":" +
          padLeft(getSeconds(), 2, "0")
        );
      },
      dateDefaultFormat: function () {
        return (
          padLeft(getYear(), 4, "0") +
          "-" +
          padLeft(getMonth(), 2, "0") +
          "-" +
          padLeft(getDate(), 2, "0") +
          " " +
          getDay()
        );
      },
    },
    methods: {
      filterNoWarningToday: function () {
        Cab.FilterNoWarningToday();
      },
      //内置功能————————————————————————————————————————————————————————————————————————————————————————————————————
      //获得默认格式的时间
      getTimeDefaultFormat: function () {
        return (
          padLeft(getHours(), 2, "0") +
          ":" +
          padLeft(getMinutes(), 2, "0") +
          ":" +
          padLeft(getSeconds(), 2, "0")
        );
      },
      //获得默认格式的日期
      getDateDefaultFormat: function () {
        return (
          padLeft(getYear(), 4, "0") +
          "-" +
          padLeft(getMonth(), 2, "0") +
          "-" +
          padLeft(getDate(), 2, "0") +
          " " +
          getDay()
        );
      },
      //日期时间更新方法
      updateDateTime: function () {
        this.timeStr = this.getTimeDefaultFormat();
        this.dateStr = this.getDateDefaultFormat();
      },
      //倒计时更新方法，调用倒计时超时事件
      updateCountDownTimer: function () {
        this.countDownTimer--;
        if (this.countDownTimer == 0) {
          this.countDownTimerEvent();
        }
      },
      goBack:function(){
        // this.$router.go(-1) 
        this.go('/menu');

      },
      //用户退出方法
      userSignOut: function () {
        this.userInfo = null;
        this.go("/standby");
      },
    },
    mounted: function () {
      var that=this;
      this.path= this.$refs.child.$route.path;
      window.$('body').virtualkeyboard();
      // $.get(
      //       that.apiAddress + "/getRunExperimentList",{},
      //       function (res) {
      //         console.log('res:',res);
      //       var obj =JSON.parse(res);
      //       if (obj.status == 1) {
      //         that.compareClientList=obj.data.compareClientList;
      //         that.runClientList=obj.data.runClientList;

      //         console.log('runClientList:',that.runClientList);
      //       }
      // });

      that.updateDateTime();
      setInterval(function () {
        that.updateDateTime();
      }, 1000);
      // setInterval(function(){
      //   if(that.runClientList.length!=0){
      //     $.get(
      //       that.runClientList[0].clientApiAddress + "/getDeviceDataList",{},
      //     function (res) {
      //     var obj = JSON.parse(res);
      //     if (obj.status == 1) {
      //       that.commonData=obj.data.commonData;
      //       that.deviceData=obj.data.deviceData;
      //     }

      //   });

      //   }
      // },2000);

      // setInterval(function(){
      //   if(that.runClientList.length!=0){
      //     $.get(
      //         that.apiAddress + "/writeJsonData",{
      //           experiment_id:that.runClientList[0].experimentId,
      //           str_data:JSON.stringify(that.deviceData)
      //         },
      //         function (res) {
      //           // console.log('res:',res);
      //         });

      //   }
      // },60*1000);

    },
    watch:{
      $route(to,from){
          this.path = to.path;
      }
    }
  };
</script>
