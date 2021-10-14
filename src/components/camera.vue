<style scoped>
  .videoArea {
  margin-top: 10px;
  height: 300px;
  width: 599px !important;
  border: solid 1px #FFF;
  border-radius: 10px;
  /* margin-left: 20px;
  margin-right: 20px; */
  overflow-y: auto;
  display: flex;
  flex-wrap: wrap;
}

.videoArea .videoFile {
  width: 150px;
  height: 110px;
  background: linear-gradient(to bottom, #98d55c, #6ea352);
  border-radius: 15px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: #6ea352 0px 0px 5px;
}

.videoArea .videoFileActive {
  width: 150px;
  height: 110px;
  background: linear-gradient(to bottom, #76a84f, #4a6f37);
  border-radius: 15px;
  margin: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: #4a6f37 0px 0px 5px;
}

.videoArea .videoFile img {
  width: 90px;
  height: 90px;
}

.videoArea .videoFile span {
  font-size: 16px;
}
.videoArea .videoFileActive img {
  width: 90px;
  height: 90px;
}


.videoArea .videoFileActive span {
  font-size: 16px;
}
.videoDisplay{
position: relative;
width: 480px;
height: 313px !important;
margin-left: auto;
margin-right: auto;
border-radius: 10px;

}

.videoDisplay img{
  -webkit-user-select: none;
   width: 480px !important;
   height: 313px !important;
   border-radius: 10px;
   border: #FFFFFF 1px solid !important
}
.videoDisplay .videoDisplayTitle{
  position:absolute;
  z-index: 999999;
  color: #FFF;
  font-size: 30px;
  -webkit-text-stroke: 0.2px #FFF;
  left:15px;
  top: 10px;

}
.video-select-tool{
  margin-top: 60px;
width: 1040px;
margin-left: auto;
margin-right: auto;
}
.video-select-tool span{
  color: #FFF;
  font-size: 20px;
  font-weight: bold;
}
.form-control.focus, .form-control:focus{
border-color: #FFF
}

.mu-input{
  color: #fff !important;
}

</style>
<style>
.mu-input.has-label .mu-input-label.float{
  color: #fff !important;
}
.mu-input.has-label{
  min-height: 0px !important;
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
.mu-text-field-input{
  color: #fff !important;
}
</style>
<template>
  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame">
        <div class="videoDisplay">
          <div class="videoDisplayTitle">实时监控预览</div>
          <!-- <img class="img" :src="'http://127.0.0.1:8002/?action=snapshot&t='+t" /> -->
          <div id="webcam"><noscript><img class="img" src="#" /></noscript></div>
        </div>
        <div class="video-select-tool">
          
          <mu-row gutter>

            <mu-col span="12" sm="3">
              <mu-date-input  icon="today" @change="dateTimeChange" v-model="startTime" color="#fff" underline-color="#fff" label="起始日期" container="bottomSheet" label-float full-width></mu-date-input>
            </mu-col>
            <mu-col span="12" sm="3">
              <mu-date-input  icon="today" @change="dateTimeChange" v-model="endTime" color="#fff"  underline-color="#fff" label="结束日期" container="bottomSheet" label-float full-width></mu-date-input>
            </mu-col>
          </mu-row>
        </div>
        <div class="videoArea">
          <div @click="videoFileClickEvent(item, index)" v-for="(item, index) in videoFileList" :key="index" :class="(index == curVideoIndex) ? 'videoFileActive' : 'videoFile'">
            <img src="../../static/image/icon/video.png" />
            <span>{{item}}</span>
          </div>
        </div>
      <!-- <div class="btn-bottom1" @click="btnDeleteClickEvent">删除视频</div>
      <div class="btn-bottom2" @click="btnWatchClickEvent">返回监控</div> -->
      <!-- <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 178px !important" @click="btnDeleteVideoEvent"
        type="button">删除视频</button> -->
      <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 320px !important" @click="btnExportVideoEvent"
        type="button">导出视频</button>
      <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 460px !important" @click="btnWatchClickEvent"
        type="button">返回监控</button>
      <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 180px !important" @click="btnBackClickEvent" type="button">返回主菜单</button>
      <!-- <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 68px !important" @click="btnBackClickEvent" type="button">导出视频</button> -->
    </div>
  </div>
  </div>
</template>
<script>
  export default {
    name: "camera",
    extends: extend,
    data: function () {
      return {
        pageTitle: "监控视频",
        countDownTimerMax: 300,
        curVideoIndex: -1,
        videoFileList: [],
        videoInterval: null,
        pickerValue: null,
        startTime: '',
        endTime: '',
        t: 0,

      };
    },
    computed: {

    },
    methods: {
      openPicker() {
        this.$refs.picker.open();
      },
      dateTimeChange:function(value){
        this.getVideoList();
      },
      getVideoList: function () {

        P_Client.getVideoList(getFormatDate(this.startTime), getFormatDate(this.endTime));
      },
      getVideoListCallback: function (obj) {

        this.videoFileList = obj.data;
      },
      videoFileClickEvent: function (videoPath, index) {
        this.curVideoIndex = index;
        P_Client.setVideo(videoPath);
      },
      btnWatchClickEvent: function () {
        P_Client.stopVideo();
        this.curVideoIndex = -1;
      },
      btnExportVideoEvent: function(){
        this.$toast.info("视频已开始导出！");
        var self_=this;
        P_Client.exportVideo(getFormatDate(this.startTime), getFormatDate(this.endTime));
      },
      btnDeleteVideoEvent: function () {
        if (this.curVideoIndex == -1) {
          this.$toast.error("请选中要删除的视频！");
          return;
        }
        P_Client.stopVideo();
        var that = this;
        setTimeout(function () {
          P_Client.deleteVideo(that.videoFileList[that.curVideoIndex]);
          that.videoFileList.splice(that.curVideoIndex, 1);
          that.curVideoIndex = -1;
        }, 500);
      },
      btnBackClickEvent: function () {
        //P_Client.stopVideo("0");
        this.curVideoIndex = -1;
        this.pageBack();
      }
    },
    beforeDestroy: function () {
      clearInterval(this.videoInterval);
    },
    mounted: function () {
      var that = this;
      // //选择时间和日期
      // $(".form-datetime").datetimepicker({
      //   weekStart: 1,
      //   todayBtn: 1,
        
      //   todayHighlight: 1,
      //   startView: 2,
      //   forceParse: 0,
      //   showMeridian: 3,
      //   autoclose: true,
      //   format: "yyyy-mm-dd hh:ii"
      // }).on('changeDate', function (ev) {
      //   that.getVideoList();

      // });
      var date = new Date();
      date.setDate(date.getDate() - 1);
      that.startTime=date;
      that.endTime=new Date();
      // that.startTime=getFormatDate(date).substring(0,10);
      // that.endTime=getFormatDate(new Date()).substring(0,10);


      // this.videoInterval = setInterval(() => {
      //   that.t++;
      // }, 100);
      P_Client.showCamera();
      this.getVideoList();
      // setTimeout(function() {
      //   P_Client.stopVideo("1");
      // }, 200);
    }
  };
</script>
