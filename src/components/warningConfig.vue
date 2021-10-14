<style scoped>


  .info-display {

    /* width: 95%; */
    background: rgba(13, 161, 154, 0.6);
    box-shadow: #111 0px 0px 10px;
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

  .box-tilte{
    color:rgb(177, 174, 174);
    font-size:20px;
    padding:5px;
    font-style: italic;
    
  }
  .box-content1{
    color:#FFF;
    font-size: 100px;
    text-align: center;
    line-height: 180px;
  }
  .box-content2{
    color:#FFF;
    font-size: 32px;
    text-align: center;
    line-height: 60px;
  }
  .box-content3{
    position:absolute;
    color:#FFF;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    right: 10px; 
  }
  #runtime{
      /* text-shadow:
    0px 1px 0px #c0c0c0,
    0px 2px 0px #b0b0b0,
    0px 3px 0px #a0a0a0,
    0px 4px 0px #909090,
    0px 5px 10px rgba(0, 0, 0, 0.6); */
    color:#fff;
    font-size: 23px;
  }

</style>
<template>
  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame" style="position: relative;">


        <div class="rows info-display" style="width:200px;height:240px;position:absolute;top:30px;left:130px;background: rgba(15, 50, 50, 0.8);">
          <div class="box-tilte">初始进液量(500)</div>
          <div class="box-content2">{{speedValue}}</div>
          <button class="button button--ujarak button--border-thin button--inverted button--text-thick speedButton" id="speedAddButton" @click="speedAdd()">+</button>
          <button class="button button--ujarak button--border-thin button--inverted button--text-thick speedButton" id="speedReduceButon" @click="speedReduce()">-</button>
        </div>
        <div class="rows info-display" style="width:200px;height:240px;position:absolute;top:30px;left:530px;background: rgba(15, 50, 50, 0.8);">
          <div class="box-tilte">默认搅拌速度(0~10)</div>
          <div class="box-content2">{{speedValue}}</div>
          <button class="button button--ujarak button--border-thin button--inverted button--text-thick speedButton" id="speedAddButton" @click="speedAdd()">+</button>
          <button class="button button--ujarak button--border-thin button--inverted button--text-thick speedButton" id="speedReduceButon" @click="speedReduce()">-</button>
        </div>
        <!-- <div class="rows info-display" style="width:760px;height:80px;position:absolute;top:240px;left:20px;background: rgba(15, 50, 50, 0.8);">
          <div class="box-tilte" style="position:absolute;font-style: normal;line-height:70px">本次已处理时长</div>
          <div class="box-content3" id="runtime">{{runTimeInfo}}</div>
        </div> -->
        <div class="mainButtonBox">
          <div style="position:absolute;top:320px;left:6px">
            <button class="button button--ujarak button--border-thin button--inverted button--text-thick mainButton" @click="btnBackClickEvent">返回</button>
          </div>
          <div style="position:absolute;top:320px;right:8px">
            <button class="button button--ujarak button--border-thin button--inverted button--text-thick mainButton mainHover" id="startButton" @click="startRun()">系统更新</button>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>
<script>
  export default {
    extends: extend,
    name: "warningConfig",
    data: function () {
      return {
        cabNum: -1,
        pageTitle: '设置',
        intervalId: null,
        startUpTime: 0,
        TotalRunTime:0,
        isStart:false,
        speedValue:4,
        fyPumpTotalCapValue:'0',
        phValue:'...',
        tempValue:'...'
      };
    },
    computed: {
      //运行时长显示
      runTimeInfo: function () {

        try {
          if(this.isStart)
          {
            var totalRunTime = this.TotalRunTime;
            var h = Math.floor(totalRunTime / 60 / 60);
            var m = Math.floor((totalRunTime - h * 60 * 60) / 60);
            var s = Math.floor((totalRunTime - h * 60 * 60 - m * 60));
            return parseInt(h / 24) + " 天 " + (h % 24) + " 小时 " + m + " 分钟 " + s + " 秒";
          }
          else{
            return '未开始';
          }
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
      beforeDestroy: function () {
        clearInterval(this.intervalId);
      },
      startRun:function(){
        var that=this;
        that.startUpTime = getTimeStamp();
        that.TotalRunTime = parseInt((getTimeStamp() - this.startUpTime) / 1000);
        $(".mainButton").removeClass('mainHover')
        $("#messageOKButton").addClass("mainHover");
        this.$parent.messageConfim('确定开始么？',function(){
            var result= sys.startExpriment(that.$parent.processType);
            if(result!='')
            {
              setTimeout(function(){
                layer.msg(result,{icon:5,shade:[0.6,'#393D49']},function(){
                  $(".mainButton").removeClass('mainHover')
                  $("#startButton").addClass("mainHover");
                });
              },100);
            }
            else{
            that.isStart=true;
            sys.setStirSpeed(that.speedValue);
            $(".mainButton").removeClass('mainHover')
            $("#stopButton").addClass("mainHover");
            that.$parent.currentStatusStr='正在进行中和处理...';
            }
        },function(){
          $(".mainButton").removeClass('mainHover')
          $("#startButton").addClass("mainHover");
        });
      },
      stopRun:function(){
        var that=this;
        $(".mainButton").removeClass('mainHover')
        $("#messageOKButton").addClass("mainHover");
        this.$parent.messageConfim('确定停止么？',function(){
          that.isStart=false;
          sys.setStirSpeed(0);
          $(".mainButton").removeClass('mainHover')
          $("#startButton").addClass("mainHover");
          layer.msg('正在停止...',{icon:0,time:5000,shade:[0.6,'#393D49']},function(){
            
          });
          setTimeout(function(){
            sys.stopExpriment();
          },1000)
          
          that.$parent.currentStatusStr='';
        },function(){
          $(".mainButton").removeClass('mainHover')
          $("#stopButton").addClass("mainHover");
        });

      },
      completeProcess:function(str){
        var that=this;
        that.isStart=false;
        sys.setStirSpeed(0);
        $(".mainButton").removeClass('mainHover')
        $("#messageOKButton").addClass("mainHover");
        that.$parent.currentStatusStr='';
        this.$parent.messageAlert(str,function(){
          $(".mainButton").removeClass('mainHover')
          $("#startButton").addClass("mainHover");
        });

      },
      speedAdd:function(){
        if(this.speedValue<10)
        {
          this.speedValue=this.speedValue+1;
          if(this.isStart==true)
          {
            sys.setStirSpeed(this.speedValue);
          }
        }
      },
      speedReduce:function(){
        if(this.speedValue>0)
        {
          this.speedValue=this.speedValue-1;
          if(this.isStart==true)
          {
            sys.setStirSpeed(this.speedValue);
          }
        }
      },
      qingxiMouseDown:function()
      {
        sys.qingxiControl(1);
      },
      qingxiMouseUp:function()
      {
        sys.qingxiControl(0);
      },
      paiyeMouseDown()
      {
        sys.paiyeControl(1);
      },
      paiyeMouseUp()
      {
        sys.paiyeControl(0);
      }
    },
    mounted: function () {
      $(".mainButton,.speedButton").mousedown(function(){
        $(this).addClass("main-button-down");

      });
      $(".mainButton,.speedButton").mouseup(function(){
        $(this).removeClass("main-button-down");

      });
      $("#qingxiButton").mousedown(function(){
        sys.qingxiControl(1);

      });
      $("#qingxiButton").mouseup(function(){
        sys.qingxiControl(0);

      });
      $("#paiyeButton").mousedown(function(){
        sys.paiyeControl(1);

      });
      $("#paiyeButton").mouseup(function(){
        sys.paiyeControl(0);

      });
      console.log(9999999999999999999999)
      this.$parent.userInfo = null;
      
      this.startUpTime = getTimeStamp();
      var that = this;

      this.intervalId=setInterval(function(){
        if(that.isStart)
        {
          that.TotalRunTime = parseInt((getTimeStamp() - that.startUpTime) / 1000);
        }
      },1000);
      //$("#startButton").trigger("click");
    }
  };
</script>
