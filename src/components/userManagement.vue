<style scoped>
  * {
  touch-action:none !important;
}
.search-devices-frame{
  display:flex;
  flex-direction:column;
  align-items: center;
  height:90%;
  margin-top: 40px;
}

.search-devices-box{
  display:flex;
  justify-content:space-around;
  width:95%;
  margin-top: 20px;
  
}
.search-devices-box{
  display:flex;
  flex-direction:column;
  justify-content:flex-start;
  align-items: center;
  /* width:400px; */
  height:100%;
  background-color: #ffffff;
  border-radius:8px;
  box-shadow: 10px 10px 10px #1a1a1a;
  border:3px solid #5c5edc;
  cursor: pointer;
  overflow: hidden;
  /* border:2px solid #ffffff; */
  /* border:3px solid #5c5edc; */
}
.search-devices-box:hover{
  /* border:2px solid #f4ea2a; */
  /* border:3px solid #f4ea2a;
  background-color: #2c2c2c; */
}
.search-devices-box .search-devices-title{
  height:100px;
  line-height:100px;
  font-size:30px;
  color:#d1d1d1;
  font-weight: bold;
}
.search-devices-box .menu-hr-line{
  /* margin:0 auto; */
  /* margin-top:450px; */
  height: 0.3rem;
  width: 60%;
  background: radial-gradient(#5c5edc 3%, transparent  100%);
}
.search-devices-box .search-devices-list{
  width:95%;
  /* background-image: url(../../static/image/de_icon/menu_shiyan_logo.png);
  background-size: 230px 260px;
  background-repeat: no-repeat;
  background-position:center center; */
}


</style>
<style>

</style>



<template>
  <!--页面主体，内容区域-->
  <div class="content">

    <div class="body">
        
      <div class="search-devices-frame">
        <div class="search-devices-box">
          <div class="search-devices-list">
            <el-button type="primary" @click="addUserForm()">新增用户</el-button>
              <el-table stripe="true" border="true"
              :data="tableData"
              style="width: 100%;margin-top: 20px;"
              max-height="600">
              <el-table-column
                fixed
                prop="user_name"
                label="账号"
                width="230">
              </el-table-column>
              <el-table-column
                prop="real_name"
                label="姓名"
                width="200">
              </el-table-column>
              <el-table-column
                prop="user_sex"
                label="性别"
                width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.user_sex==1?'男':'女' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="user_role"
                label="角色"
                width="150">
                <template slot-scope="scope">
                  <span>{{ scope.row.user_role==1?'管理员':'普通用户' }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="user_phone"
                label="电话"
                width="200">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="380">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editUser(scope.row)" size="small" type="primary">
                    编辑
                  </el-button>
                  <el-button
                    @click.native.prevent="deleteUser(scope.$index,scope.row.user_id)" size="small" type="danger">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="用户信息" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="form" :model="form" :label-width="formLabelWidth">
        <el-form-item label="账号" prop="user_name">
          <el-input v-model="form.user_name"></el-input>
        </el-form-item>
        <el-form-item label="用户姓名" prop="real_name">
          <el-input v-model="form.real_name"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="form.user_role" placeholder="请选择角色">
            <el-option label="普通用户" value="2"></el-option>
            <el-option label="管理员" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.user_sex">
            <el-radio label="男" value="1"></el-radio>
            <el-radio label="女" value="0"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="user_phone">
          <el-input v-model="form.user_phone"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm('form')">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  export default {
    extends: extend,
    name: "userManagement",
    data:function() {
      return {
        user_opera_open: false,
        swiperOption: {
          disableScroll: true,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          }
        },
        pageTitle: "用户数据",
        timeStr: "",
        dateStr: "",
        userInfoText: "",
        module_list: '',
        countDownTimerMax: 180,
        use: 0,
        dialogFormVisible: false,
        rules: {
          user_name: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          real_name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          user_role: [
          { required: true, message: '请选择用户角色', trigger: 'blur' }
          ],
          user_sex: [
          { required: true, message: '请选择用户性别', trigger: 'blur' }
          ],
        },
        form: {
          user_id:'0',
          user_name: '',
          real_name: '',
          user_role: '2',
          user_sex: '1',
          user_phone: '',
      },
      formLabelWidth: '100px',
      deviceList:[],
      intervalId:null,
      readyDeviceInfo:null,
      tableData: [{
        user_name: 'admin',
        real_name: '张三',
        user_sex: '男',
        user_role: '管理员',
        user_phone: '888888',
      }
      ]
      };
    },
    computed: {

    },
    methods: {
      btnLogout:function(){
        this.go("/standby");
      },
      deleteRow(index, rows) {
      rows.splice(index, 1);
      },
      deleteUser(index,user_id,rows){
        var that=this;
          this.$confirm('确定要删除此报表数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$parent.layerIndex=layer.load(2);
            $.ajax({
                url: that.$parent.apiAddress + "/deleteUser",
                type:"get",
                timeout:2000,
                data:{
                  userId: user_id
                },
                success:function(res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 0) {
                    that.$message.error(obj.message);
                  }
                  else {
                    that.$message.success(obj.message);
                    that.tableData.splice(index, 1);
                  }
                },
                error:function(jqXHR, textStatus, errorThrown){
                  that.$message.error("删除失败！"+ jqXHR.statusText);
                },
                complete:function () {
                  layer.close(that.$parent.layerIndex);
                }
            });
          }).catch(() => {
         
          });
      },
      editUser(userInfo){
        this.dialogFormVisible=true;
        this.form=userInfo;
      },
      submitForm(formName) {
          var that=this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              that.dialogFormVisible = false;
              that.$parent.layerIndex=layer.load(2);
              $.ajax({
                url: that.$parent.apiAddress + "/saveUser",
                type:"get",
                timeout:2000,
                data:{
                  userId: that.form.user_id,
                  userName: that.form.user_name,
                  realName: that.form.real_name,
                  userSex: 1,
                  userRole: parseInt(that.form.user_role),
                  userPhone: that.form.user_phone,
                  remark:'',
                },
                success:function(res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.$message.success(obj.message);
                    that.getUserList();
                  }else{
                    that.$message.error(obj.message);
                  }
                },
                error:function(jqXHR, textStatus, errorThrown){
                  that.$message.error("失败！"+ jqXHR.statusText);
                },
                complete:function(){
                  layer.close(that.$parent.layerIndex);
                },
              });
              
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      cancelForm(formName){
          this.dialogFormVisible = false;
          this.$refs[formName].resetFields();
        },

      addUserForm(){
        this.dialogFormVisible=true;
      },
      getUserList(){
          var that=this;
          that.$parent.layerIndex=layer.load(2);
          $.ajax({
              url: that.$parent.apiAddress + "/getUserList",
              type:"get",
              timeout:3000,
              data:{searchValue:''},
              success:function(res) {
                var obj = JSON.parse(res);
                if (obj.status == 0) {
                  that.$message.error(obj.message);
                }
                else {
                  that.tableData=obj.data;
                }
              },
              error:function(jqXHR, textStatus, errorThrown){
                that.$message.error("获取数据失败！"+ jqXHR.statusText);
              },
              complete:function () {
                layer.close(that.$parent.layerIndex);
              }
          });

        },
      viewReportInfo(){
          this.go('/stockDetailNew');
      }
    },
    mounted: function () {
      var that=this;
      this.getUserList();

    },
    beforeDestroy: function () {
      clearInterval(this.intervalId);
    },
  };
</script>