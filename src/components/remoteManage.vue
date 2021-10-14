<style scoped>

    </style>
    <template>
      <!--页面主体，内容区域-->
      <div class="content">
        <div class="body">
          <div class="frame">
            <div class="rows col-center-block" style="width: 90%; height: 980px;padding-top: 30px;background-color: transparent;border-radius: 15px">
              <div class="col-center-block" style="width: 900px;height: 600px;">

                <div style="text-align: center;margin-top: 160px">

                   <div><span style="font-size:26px;color:#FFF;line-height: 160px">请在您的远程设备浏览器地址栏输入以下地址</span><br>
                    <span class="label label-warning" style="font-size: 36px">http://{{ipAddress}}:9000</span>
                </div> 

                <div style="margin-top:260px">
                    
                        <div class="icon"  style="font-size:40px;color: aquamarine">
                          <i class="fa fa-wifi fa-5x"></i>
                        </div>
                        <span style="color:#FFF;font-size: 23px">请确保您的远程设备与本柜处于同一局域网络</span>
                </div>
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
        </div>
      </div>
    </template>
    <script>
      export default {
        extends: extend,
        name: "remoteManage",
        data: function () {
          return {
            pageTitle: "远程管理",
            countDownTimerMax: 200,
            t:0,
            videoInterval:null,
            ipAddress:'0.0.0.0',
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
          var that=this;
          P_Client.getLocalIp(function(result){
            that.ipAddress=result;
          });
          this.cUserInfo.userName=this.$route.query.userInfo.RealName;
          this.cUserInfo.userCode=this.$route.query.userInfo.UserCode;

          this.videoInterval = setInterval(() => {
            that.t++;
          }, 100);
          setTimeout(function() {
            P_Face.startAddFace(that.$route.query.userInfo.UserId);
          }, 1000);
    
        }
      };
    </script>