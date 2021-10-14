<style scoped>
    .inputBar {
      display: flex;
      justify-content: flex-start;
      margin-top: 40px;
    }
    
  
    .inputBar>.inputIcon {
      width: 130px;
      height: 130px;
      /* background: linear-gradient(to bottom, #98d55c, #6ea352); */
      background-color: #ea644a;
      border-radius: 10px 0px 0px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: #333 0px 0px 10px;
    }
  
  
    .inputBar>.inputArea {
      height: 130px;
      width: 770px;
      background-color: #eee;
      border-radius: 0px 20px 20px 0px;
      box-shadow: #333 0px 0px 10px;
    }
  
    .inputBar>.inputArea>input {
      border-style: none;
      font-size: 30px;
      height: 130px;
      line-height: 130px;
      width: 740px;
      margin-left: 13px;
      /* margin-top: 15px; */
      background-color: #eee;
      outline: none;
    }
  
    .loginBtn {
      margin-top: 50px;
      width: 900px;
      height: 120px;
      /* background: linear-gradient(to bottom, #98d55c, #6ea352); */
      /* background-color: #98d55c; */
      border-radius: 0px;
      text-align: center;
      font-size: 36px;
      font-weight: bold;
      /* box-shadow: #333 0px 0px 10px; */
    }
  </style>
  <style>
  .el-form-item__label{
    font-size: 20px;
  }
  </style>
  <template>
  
    <!--页面主体，内容区域-->
    <div class="content">
      <div class="body">
        <div class="frame">
                <div class="listArea" style="height:800px">
                        <div class="form-box" style="width:90%;margin-left:auto;margin-right:auto;">
                    <el-form :label-position="labelPosition"  >
                      
                          <!-- <el-form-item label="药柜负责人*">
                            <el-input  v-model="CabinetLeader" class="numkeyboard"></el-input>
                          </el-form-item>
                          <el-form-item label="负责人联系方式*">
                            <el-input class="numkeyboard" v-model="LeaderMobile"></el-input>
                          </el-form-item>
                        
                            <el-form-item label="药剂柜存放地址">
                            <el-input  v-model="CabinetPlace" class="numkeyboard"></el-input>
                          </el-form-item>
                             
                              <el-form-item label="备注">
                            <el-input type="text" class="numkeyboard" v-model="Remark"></el-input>
                          </el-form-item>
                            <el-form-item>
                            <button class="btn btn-primary btn-lg normal-btn" @click="onSubmit" type="button">进入系统</button>
                          </el-form-item> -->

                          <el-form-item label="本机IP">
                            <el-input  v-model="localIP" disabled></el-input>
                          </el-form-item>
                          <el-form-item label="输入服务器IP">
                            <el-input  v-model="serverIP" id="serverIP" class="numkeyboard"></el-input>
                          </el-form-item>
                            <el-form-item>
                            <button class="btn btn-primary btn-lg normal-btn" @click="registerAction" type="button">注册</button>
                          </el-form-item>
                        </el-form>
                        </div>
                        </div>
                  
        </div>
      </div>
    </div>
  
  </template>
  <script>
    
    export default {
      extends: extend,
      name: "login",
      data: function () {
        return {
          pageTitle: "组网设置",
          CabinetLeader: '',
          LeaderMobile: '',
          CabinetPlace: '',
          AfterSale: '',
          Remark: '',
          localIP:'',
          serverIP:'',
        }
      },
      methods: {
        // 用户提交表单
        onSubmit(){
            if(this.CabinetLeader == ""){
                this.$toast.error('药柜负责人不能为空！');
                return  false
            }
            if(this.LeaderMobile == ""){
                this.$toast.error('药柜负责人联系方式不能为空！');
                return  false
            }
            var CabinetInfo = {
                CabinetLeader: this.CabinetLeader,
                LeaderMobile: this.LeaderMobile,
                CabinetPlace: this.CabinetPlace,
                AfterSale: this.AfterSale,
                Remark: this.Remark,
            }
            P_Client.SaveCabinetInfo(JSON.stringify(CabinetInfo))
        },
        SaveCabinetInfoCallBack(e){
            if(e.status==0){
                this.$toast.info('保存成功！')
                this.go('/')
            }else{
              this.$toast.error('数据异常，请联系售后服务！')
                
            }
        },
        registerAction:function(){
            if ($.trim($("#serverIP").val()) == "") {
              this.$toast.error('服务器IP不能为空！');
              return false;
            }
            var that = this;
            P_Client.registerAction($.trim($("#serverIP").val()),function(result){
              var obj = JSON.parse(result);
                if (obj.status != 0) {
                  that.$toast.error(obj.message);
              } else {
                  that.$toast.info('注册成功！2秒后将自动重启软件');
                  setTimeout(function() {
                    P_Client.restartSelf();
                  }, 2000);
              }
            });
        }
      },
      mounted: function () {
        console.log(8888888888888)
        // P_Client.supervision_start_thread()
        
        var that = this;
        window.$('.el-input__inner').keyboard(keyBordSetting);
        P_Client.getLocalIp(function(result){
          that.localIP=result;
        });
      }
    };
  </script>