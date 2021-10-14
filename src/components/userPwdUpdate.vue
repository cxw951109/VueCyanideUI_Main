<style scoped>
    .menuContainer {
      width: 900px;
      height: 500px;
      border: solid 1px #333;
      overflow: hidden;
      padding: 0px;
      padding-right: 20px;
      margin-right: auto;
      margin-left: auto;
      margin: 0px;
    }
  
  </style>
  <style>
  .form-box{
      margin-top:50px;
  }
    .form-box .el-form-item__label{
        font-size: 25px !important;
        margin:0px !important;
        padding:0px !important;
    }
    .form-box .el-input__inner{
        height: 62px !important;
        line-height:62px!important;
        font-size:20px;
    }
      .form-box .el-input-number{
        height: 60px !important;
        line-height:60px !important;
    }
  </style>
  
  <template>
      <!--页面主体，内容区域-->
      <div class="content">
          
        <div class="body">
          <div class="frame">
              <div class="listArea">
                  <div class="form-box" style="width:90%;margin-left:auto;margin-right:auto">
  
          <el-form :label-position="labelPosition"   :model="formLabelAlign">
              
          <el-form-item label="旧密码">
          <el-input type="password" placeholder="请输入旧密码" id="oldPwd" v-model="oldPwd" class="numkeyboard"></el-input>
          </el-form-item>
  
          <el-form-item label="新密码">
              <el-input type="password" placeholder="请输入新密码" id="newPwd" v-model="newPwd" class="numkeyboard"></el-input>
          </el-form-item>
  
          <el-form-item label="确认密码">
              <el-input type="password" placeholder="请输入确认密码" id="rePwd" v-model="rePwd" class="numkeyboard"></el-input>
          </el-form-item>
          
          
  
      <el-form-item>
       <button class="btn btn-primary btn-lg normal-btn" @click="onSubmit" type="button">保存</button>
    </el-form-item>
  </el-form>
            <!--<div v-if="isAdmin()=='ok'">
                                  <div class="btn-bottom-left" @click="btnUpdateSystemClickEvent">更新系统</div>
                              </div>-->
            <!--<div class="btn-bottom2" @click="btnHelperClickEvent">帮助手册</div>-->
                  </div>
              </div>
          </div>
          <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
        </div>
      </div>
  </template>
  <script>
    export default {
      
      name: "userinfo",
      extends: extend,
      data: function () {
        return {
          pageTitle: "用户信息",
          UserId: this.$parent.currentInfo.UserId,
          oldPwd: null,
          newPwd: null,
          rePwd: null,
        };
      },
      computed: {
       
      },
      methods: {
      onSubmit() {
          var UserId = this.UserId;
          var oldPwd = $("#oldPwd").val();
          var newPwd = $("#newPwd").val();
          var rePwd = $("#rePwd").val();
          console.log(oldPwd, newPwd, rePwd, 1111111)
          if (!oldPwd||!newPwd||!rePwd){
              this.$toast.error('密码不能为空');
              return 
          }
          if(newPwd != rePwd){
              this.$toast.error('新密码与确认密码不一致, 请重新输入');
              return
          }
          var userData = {
              UserId: UserId,
              oldPwd: oldPwd,
              newPwd: newPwd,
              rePwd:rePwd,
          }
          console.log(userData, 2134)
          P_User.savePwdUpdate(JSON.stringify(userData))
        },
        userPwdUpdateCallBack: function(obj){
          
          if(obj.status==0){
              this.$toast.info('密码修改成功！');
              this.go('/login')
          }else{
               this.$toast.error(obj.message);
          }
  
        },
        
  
      
    },
    
  
      mounted: function () {
          window.$('.el-input__inner').keyboard(keyBordSetting);
      },
  }
  </script>
  
