<style scoped>


  .info-display {

    margin-top: 10px;
    width: 95%;
    background: rgba(13, 161, 154, 0.4);
    box-shadow: #111 0px 0px 5px;
  }

  .info-display .info-box {

    height: 190px;
    line-height: 190px;
    font-size: 30px;
    text-align: center;
    color: #fff;

  }

  .frame>.rows>.col-xs-5 {

    padding-left: 0px;
    padding-right: 0px;

  }

  .autoControl .btn {

    padding: 10px 25px;
    font-size: 22px;
  }

  .line-simple {

    height: 1px;
    background-color: #FFF;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }



  
.hi-icon-wrap {
	text-align: center;
	margin: 0 auto;
	padding: 2em 0 3em;
}

.hi-icon {
	display: inline-block;
  font-size: 38px;
  line-height: 150px;
	cursor: pointer;
	margin: 15px 30px;
	width: 160px;
	height: 160px;
	border-radius: 50%;
	text-align: center;
	position: relative;
	z-index: 1;
  color: #fff;
  box-shadow: #111 0px 0px 10px;
}

.hi-icon:after {
	pointer-events: none;
	position: absolute;
	width: 100%;
	height: 100%;
	border-radius: 50%;
	content: '';
	-webkit-box-sizing: content-box; 
	-moz-box-sizing: content-box; 
	box-sizing: content-box;
}

.hi-icon:before {
	font-family: 'ecoicon';
	speak: none;
	font-size: 48px;
	line-height: 90px;
	font-style: normal;
	font-weight: normal;
	font-variant: normal;
	text-transform: none;
	display: block;
	-webkit-font-smoothing: antialiased;
}



/* Effect 1 */
.hi-icon-effect-1 .hi-icon {
	background: rgba(255,255,255,0.3);
	-webkit-transition: background 0.2s, color 0.2s;
	-moz-transition: background 0.2s, color 0.2s;
	transition: background 0.2s, color 0.2s;
}

.hi-icon-effect-1 .hi-icon:after {
	top: -7px;
	left: -7px;
	padding: 7px;
	box-shadow: 0 0 0 4px #fff;
	-webkit-transition: -webkit-transform 0.2s, opacity 0.2s;
	-webkit-transform: scale(.8);
	-moz-transition: -moz-transform 0.2s, opacity 0.2s;
	-moz-transform: scale(.8);
	-ms-transform: scale(.8);
	transition: transform 0.2s, opacity 0.2s;
	transform: scale(.8);
	opacity: 0;
}

/* Effect 1a */
.hi-icon-effect-1a .hi-icon:hover,.mainHover  {
	background: rgba(255,255,255,1) !important;
	color: #41ab6b !important;
}

.hi-icon-effect-1a .hi-icon:hover:after,.mainHover:after {
	-webkit-transform: scale(1) !important;
	-moz-transform: scale(1) !important;
	-ms-transform: scale(1) !important;
	transform: scale(1) !important;
	opacity: 1 !important;
}

/* Effect 1b */
.hi-icon-effect-1b .hi-icon:hover,.mainHover {
	background: rgba(255,255,255,1) !important;
	color: #41ab6b !important;
}

.hi-icon-effect-1b .hi-icon:after {
	-webkit-transform: scale(1.2);
	-moz-transform: scale(1.2);
	-ms-transform: scale(1.2);
	transform: scale(1.2);
}

.hi-icon-effect-1b .hi-icon:hover:after,.mainHover:after {
	-webkit-transform: scale(1) !important;
	-moz-transform: scale(1) !important;
	-ms-transform: scale(1) !important;
	transform: scale(1) !important;
	opacity: 1 !important;
}

</style>
<template>
  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame">

      <!-- <div class="rows col-center-block info-display">
          <div class="info-box">温度：{{overviewInfo.tem}}</div>

        </div> -->
        <div style="color:rgb(200, 200, 200);font-size:30px;text-align:center">功能选项</div>
        <div class="rows col-center-block" style="width: 97%;margin-top: 30px">
          			<section id="set-1">
                  <div class="hi-icon-wrap hi-icon-effect-1 hi-icon-effect-1a mainButtonBox">
                    <span class="hi-icon hi-icon-mobile mainButton mainHover" @click="startReady(1)">酸</span>
                    <span class="hi-icon hi-icon-screen mainButton" @click="startReady(2)">碱</span>
                  </div>
                </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    extends: extend,
    name: "standby",
    data: function () {
      return {
        cabNum: -1,
        pageTitle: "",
        intervalId: null,
        temControlflowStr:this.$parent.temControlflowStr,
        overviewInfo: {
          returnNum: 0,
          putNum: 0,
          useNum: 0,
          expireNum: 0,
          tem: null,
          hum:null,
        }
      };
    },
    computed: {
      //运行时长显示
      runTimeInfo: function () {

        try {
            console.log(122121212121, this.$parent.clientInfo)
            var totalRunTime = this.$parent.clientInfo.TotalRunTime;

            var h = Math.floor(totalRunTime / 60 / 60);
            var m = Math.floor((totalRunTime - h * 60 * 60) / 60);
            var s = Math.floor((totalRunTime - h * 60 * 60 - m * 60));
            return parseInt(h / 24) + "天" + (h % 24) + "小时" + m + "分钟" + s + "秒";
            // return {
            //   d: parseInt(h / 24),
            //   h: h,
            //   m: m,
            //   s: s
            // }; 
        } catch (error) {
            return"-天-小时-分钟-秒";
        }

      }
    },
    methods: {
      //进入身份验证界面
      toLogin: function () {
        //this.$router.push({ path: '/Login' });
        this.go("/login");
        //this.countDownTimer = this.countDownTimerMax;
      },
      toFaceLogin:function(){

        this.go("/faceLogin");
      },
      //返回按钮点击事件
      btnBackClickEvent: function () {
        //this.popupInAlert("提示信息", "请输入", 3000, function (str) {alert(str);}, function () {alert(2);}, function () {alert(3);});
        //this.showToast("请关门");
        //this.useCabinet();
        this.pageBack();
      },
      //刷新按钮点击事件
      btnUpdateEvent: function () {
        this.updateUserInfoData();
      },
      //用户自定义方法————————————————————————————————————————————————————————————————————————————————————————————————
      updateInfo: function () {
        try {
          CabOpt.GetMainInfo();
        } catch (e) {}
      },
      setMainInfo: function (jsonStr) {
        var jsonObj = JSON.parse(jsonStr);
        if (jsonObj.Status == 1) {
          $("#putNum").text(jsonObj.Data.todayPutInCount);
          $("#useNum").text(jsonObj.Data.todayUseCount);
          $("#returnNum").text(jsonObj.Data.todayReturnCount);
          $("#expireNum").text(jsonObj.Data.expiredDrugCount);
          $("#temHum").text(
            Cab.GetTem().toString() + " " + Cab.GetHum().toString()
          );
          //this.overviewInfo.putNum = jsonObj.Data.todayPutInCount;
          //this.overviewInfo.useNum = jsonObj.Data.todayUseCount;
          //this.overviewInfo.returnNum = jsonObj.Data.todayReturnCount;
          //this.overviewInfo.expireNum = jsonObj.Data.expiredDrugCount;
          //this.overviewInfo.temHum = Cab.GetTem().toString() + " " + Cab.GetHum().toString();
        }
      },
      getStandbyInfoCallback:function(obj){
        if(obj.status!=0)
        {
        
          this.$toast.error(obj.message);
        
        }
        else 
        {
          this.overviewInfo.putNum = obj.data.todayPutInCount;
          this.overviewInfo.useNum = obj.data.todayUseCount;
          this.overviewInfo.returnNum = obj.data.todayReturnCount;
          this.overviewInfo.expireNum = obj.data.expiredDrugCount;
        }
      },
      startReady:function(type)
      {
        this.$parent.processType=type;
        this.go("/first");
        // if(type==1)
        // {
        //   this.go("/first");
        // }
        // else{
        //   this.go("/warningConfig");
        // }
      },
      temControlDisplay:function(flowIndex){
 	       switch (flowIndex) {
 	         case '1':
              this.temControlflowStr= this.$parent.temControlflowStr="正在控温...";
 	            break;
 	          case '2':
              this.temControlflowStr= this.$parent.temControlflowStr="正在化霜...";
               break;
 	          case '3':
              this.temControlflowStr= this.$parent.temControlflowStr="未进行";
 	            break;
 	        
 	          default:
 	            break;
 	        }
 	
 	      },
      beforeDestroy: function () {
      clearInterval(this.intervalId);
    },
    },
    mounted: function () {
      console.log(9999999999999999999999)
      this.$parent.userInfo = null;
      this.$parent.currentStatusStr='';
      var that = this;
    }
  };
</script>
