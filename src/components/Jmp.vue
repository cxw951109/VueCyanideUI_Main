<template>
  <div style="color: #FFFFFF;text-align: center;line-height: 30px;margin-top:100px;font-size: 30px">{{initMessage}}</div>
</template>
<script>
  export default {
    extends: extend,
    name: "Jmp",

    data: function () {
      return {
        initMessage:'请稍后...',
        msg: "Welcome"
      }
    },
    methods: {
      //获取终端信息回调
      getClientInfoCallback: function (obj) {
        try {
          if (obj.status == 0) {
            this.$parent.clientInfo=obj.data;
            this.$parent.startRunTime=obj.data.TotalRunTime;
            P_Client.supervision_start_thread(JSON.stringify(this.$parent.clientInfo));
            P_Client.startCamera();
            this.go("/standby");
          } else if(obj.status == 2) {
            // this.initMessage='终端初始化失败：'+ obj.message;
            this.go('/registerCabinet')
          }
          else{
            // this.$toast.error({
            //   message:obj.message,
            //   time: 2000,// 显示的时长
            // });
              // 如果中断未注册， 则跳转到注册终端页面
          if(obj.message=='该终端ID未注册！'){
            console.log('123333333333')
            // this.go('/registerCabinet')
            var CabinetInfo = {
                CabinetLeader: '-',
                LeaderMobile: '-',
                CabinetPlace: '实验室',
                AfterSale: '',
                Remark: '',
            }
            P_Client.SaveCabinetInfo(JSON.stringify(CabinetInfo))
            }
          }
        } catch (e) {
          this.initMessage='终端初始化失败：'+ e.message;
          this.go('/registerCabinet')
        }
      },
      SaveCabinetInfoCallBack(e){
            if(e.status==0){
                // this.$toast.info('保存成功！')
                // this.go('/')
                P_Client.getClientInfo();
            }else{
              this.$toast.error('数据异常，请联系售后服务！')
                
            }
      }
    },
    mounted: function () {
      //获取终端信息
      // setTimeout(function (){
      //   P_Client.getClientInfo();       
      // }, 1000);
      this.go('/login');
    }
  };
</script>
