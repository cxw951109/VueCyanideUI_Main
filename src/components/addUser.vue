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
  select{
    border: 1px solid #c0c4cc;
    border-radius: 10px;
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
  
  <el-form-item label="工号 *">
    <el-input v-model="UserCode" id="UserCode" class="numkeyboard" placeholder="请输入用户工号" required></el-input>
  </el-form-item>
  <el-form-item label="条码 *">
    <el-input v-model="BarCode" id="BarCode" class="numkeyboard" placeholder="请输入用户条码" required></el-input>
  </el-form-item>
  <el-form-item label="姓名 *">
    <el-input v-model="RealName" id="RealName" class="numkeyboard" placeholder="请输入用户姓名" required></el-input>
  </el-form-item>
  <el-form-item label="用户角色">
  <select class="numkeyboard" v-model="RoleId" style="margin-left: 20px;font-size:25px;color: #333333;">
    <option value="b0c86811-ec53-4d7e-bd81-84f146e43dce" style="height: 30px" selected>普通用户</option>
    <option value="19535c92-8da4-4645-88c5-9a4ee3fdb22e" style="height: 30px">管理员</option>
  </select>
</el-form-item>
    <el-form-item label="性别">
     <input type="radio" value="1" v-model="Sex" name="Sex" style="margin-left: 20px;width: 18px;line-height: 50px;" checked> <span style="font-size: 25px;">男</span>   
     <input type="radio" value="0" v-model="Sex" name="Sex" style="margin-left: 20px;"> <span style="font-size: 25px;">女</span>
  </el-form-item>

      <el-form-item label="用户QQ">
    <el-input v-model="QQ" class="numkeyboard" id="QQ" placeholder="请输入用户QQ" ></el-input>
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

    name: "addUser",
    extends: extend,
    data: function () {
      return {
        pageTitle: "用户信息",
        countDownTimerMax: 120,
        BarCode: '',
        UserCode: '',
        RealName: '',
        RoleId: 'b0c86811-ec53-4d7e-bd81-84f146e43dce',
        QQ: '',
        Sex: '1',
      };
    },
    computed: {
     
    },
    methods: {
    onSubmit() {
        var UserCode = $("#UserCode").val();
        var BarCode = $("#BarCode").val();
        var RealName = $("#RealName").val();
        var Sex = this.Sex;
        var QQ = this.QQ;
        var RoleId = this.RoleId;
        // if(!Mobile || !UserRealName || !Sex || ！QQ){
        //     this.$toast.error('请完善表单信息')
        // }
        var userData = {
            UserCode: UserCode,
            BarCode: BarCode,
            RealName:RealName,
            Sex:Sex,
            QQ:QQ,
            RoleId:RoleId,
        }
        if(UserCode=="" || BarCode == "" || RealName == ""){
          this.$toast.error('请完善表单信息 带*号是必填项');
          return
        }
       P_User.addUser(JSON.stringify(userData))
      },
     
      // 格式化sqlAcheml时间
      formatSqlTime: function(params){
        if(params){
          console.log(params, 123141234242)
          return params.replace('T', ' ')
        }
      },
      addUserCallback(obj){
        if(obj.status == '0'){
          this.$toast.info('保存成功')
          this.go('/userManagement')
        }else{
          this.$toast.error(obj.message)
        }
      }
     
    },
    mounted: function () {
      window.$('.el-input__inner').keyboard(keyBordSetting);
    },
    
  };

</script>
