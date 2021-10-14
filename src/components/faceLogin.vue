<style scoped>
.addFace{
    /* width: 800px; */
    height: 400px;
    overflow: hidden;
    border-radius: 10px;
    /* border: #FFFFFF 1px solid !important; */
}
.addFace .faceImg{
    /* border-radius: 100px;
    border: #FFFFFF 1px solid !important; */
    width: 100%;
    height: 100%;
    position: absolute;

    /* transform:rotate(90deg); */
} 
</style>
<template>

  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame">
        <div class="rows col-center-block" style="width: 90%; padding-top: 0px;">
          <div style="position: relative;" class="addFace">
            <!-- <img class="faceImg" :src="'http://127.0.0.1:8001/?action=snapshot&t='+t" /> -->
            <!-- <img style="width: 390px;height: 440px;position: absolute;z-index: 9999999;left:18px;top: -30px" class="img"
              src="../../static/image/faceBox.png" /> -->
          </div>
          <!-- <div class="col-center-block" style="width: 500px;height: 600px;">
            <img style="width: 900px;height: 600px;" src="../../static/image/facelogin.gif">
          </div> -->
        </div>
        <button class="btn btn-danger btn-lg btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    extends: extend,
    name: "faceLogin",
    data: function () {
      return {
        pageTitle: "人脸认证",
        countDownTimerMax: 200,
        t: 0,
        videoInterval: null,
      }
    },
    methods: {
faceLoginCallback:function(obj){
        if (obj.status == 1) {
          this.$toast.error(obj.message);
          this.go("/standby");
        } else {
          this.$parent.userInfo=obj.data;
          this.$toast.info("验证成功："+this.$parent.userInfo.RealName);
         
          this.$parent.currentInfo = {
            UserId: this.$parent.userInfo.UserId,
            RoleId: this.$parent.userInfo.RoleId,
            UserRealName: this.$parent.userInfo.RealName,
            RoleName: this.$parent.userInfo.RoleName,
            Sex: this.$parent.userInfo.Sex,
            QQ: this.$parent.userInfo.QQ,
            CreateDate: this.$parent.userInfo.CreateDate,
            Mobile: this.$parent.userInfo.Mobile,
            ClientId: this.$parent.clientInfo.ClientId,
            ClientCode: this.$parent.clientInfo.ClientCode,
            CustomerId:this.$parent.clientInfo.CustomerId,

          };
          // 记录用户登录成功日志
          P_User.loginLog(JSON.stringify(this.$parent.currentInfo))
          this.go("/menu");
        }

},
btnBackClickEvent:function(){
  P_Face.stopWork();
  this.pageBack();

}

    },
    beforeDestroy: function () {
      clearInterval(this.videoInterval);
    },
    mounted: function () {
      var that=this;
      P_Face.initFaceList(that.$parent.clientInfo.CustomerId);
      // this.videoInterval = setInterval(() => {
      //   that.t++;
      // }, 100);
      // setTimeout(function() {
      //   P_Face.startFaceReco();
      // }, 500);
      P_Face.startFaceReco();

    }
  };
</script>