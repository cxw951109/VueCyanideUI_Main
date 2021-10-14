<style scoped>
.addFace{
  height: 430px;
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
.face-userinfo{
    margin-top:240px;
    color: #FFF;
    font-size: 50px;

}
.face-userinfo li{
    list-style-type: none;
}
</style>
<template>
  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame">
        <div class="rows col-center-block" style="width: 90%; padding-top: 30px;background-color: transparent;border-radius: 15px">
            <div style="position: relative;" class="addFace">
                <!-- <img class="faceImg" :src="'http://127.0.0.1:8001/?action=snapshot&t='+t" /> -->
                <!-- <img style="width: 390px;height: 440px;position: absolute;z-index: 9999999;left:18px;top: -30px" class="img" src="../../static/image/faceBox.png" /> -->
            </div>
            <div style="text-align: center">
                <span style="font-size:30px;color:rgb(233, 27, 27)">请稍等,正在自动检测并录入人脸信息......</span>
            </div>
        </div>
      </div>
      <button class="btn btn-danger btn-lg btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
    </div>
  </div>
</template>
<script>
  export default {
    extends: extend,
    name: "addFace",
    data: function () {
      return {
        pageTitle: "人脸录入",
        countDownTimerMax: 200,
        t:0,
        videoInterval:null,
        cUserInfo:{
            userName:'',
            userCode:'',
        },
      }
    },
    methods: {
        completeAddFace:function(obj){
            clearInterval(this.videoInterval);
            this.$toast.error('人脸录入完成！');
        }
    },
    beforeDestroy: function () {
      clearInterval(this.videoInterval);
    },
    mounted: function () {
      this.cUserInfo.userName=this.$parent.userInfo.RealName;
      this.cUserInfo.userCode=this.$parent.userInfo.UserCode;
      var that=this;
      // this.videoInterval = setInterval(() => {
      //   that.t++;
      // }, 100);
      // setTimeout(function() {
      //   P_Face.startAddFace(that.$parent.userInfo.UserId);
      // }, 1000);
      P_Face.startAddFace(that.$parent.userInfo.UserId);

    }
  };
</script>