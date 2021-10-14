<style scoped>
    * {
    touch-action:none !important;
  }
  .search-devices-frame{
    display:flex;
    flex-direction:column;
    align-items: center;
    height:85%;
    margin-top: 40px;
  }

  .search-devices-box{
    display:flex;
    justify-content:space-around;
    width:80%;
    margin-top: 20px;

  }
  .search-devices-box{
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items: center;
    /* width:400px; */
    height:100%;
    background-color: #222121;
    border-radius:10px;
    box-shadow: 10px 10px 10px #1a1a1a;
    border:2px solid #5c5edc;
    cursor: pointer;
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
    width:80%;
    /* background-image: url(../../static/image/de_icon/menu_shiyan_logo.png);
    background-size: 230px 260px;
    background-repeat: no-repeat;
    background-position:center center; */
  }
  .search-devices-list ul{
    list-style:none;
    margin:0;
    padding:0;
    margin-top: 50px;

  }
  .search-devices-list li{
    margin-top:20px;
    border-radius: 5px;
    height:80px;
    line-height: 80px;
    background-color: rgba(209, 209, 209, 0.1);
    background-image: url(../../static/image/de_icon/search_device_logo.png);
    background-size: 50px 50px;
    background-repeat: no-repeat;
    background-position:20px center;
    color:#fff;
    font-size: 25px;
    text-indent: 70px;
    display:flex;
    justify-content:space-between;
    padding:0 20px;
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

            <div class="search-devices-title">可进行试验的设备列表（正在搜索设备...）</div>
            <div class="menu-hr-line"></div>
            <div class="search-devices-list">
                <ul v-for="(item, index) in deviceList">
                    <li v-show="item.macAddress!=null"><div>{{item.macAddress}}（{{item.clientIp}}）</div><div><el-button type="warning" @click="readyStart(item)" >准备试验</el-button></div></li>
                </ul>
            </div>
          </div>
        </div>
      </div>
      <el-dialog title="试验参数" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="样品名称" prop="material_name" :label-width="formLabelWidth">
            <el-input placeholder="请输入"  v-model="form.material_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="试验时长" prop="set_experiment_time" :label-width="formLabelWidth">
            <el-input placeholder="请输入"  type="number" v-model="form.set_experiment_time"  min="0" max="360">
              <template slot="append">天</template>
            </el-input>
          </el-form-item>
          <el-form-item label="试验范围" prop="set_flow" :label-width="formLabelWidth">
            <el-radio v-model="form.set_fyp_range" label="1" border>1-9号反应瓶</el-radio>
            <el-radio v-model="form.set_fyp_range" label="2" border>1-6号反应瓶</el-radio>
            <el-radio v-model="form.set_fyp_range" label="3" border>1-3号反应瓶</el-radio>
          </el-form-item>
          <el-form-item label="设定空气流量" prop="set_flow" :label-width="formLabelWidth">
            <el-input placeholder="请输入"  type="number" v-model="form.set_flow" min="0" max="200">
              <template slot="append">ppm</template>
            </el-input>
          </el-form-item>
          <el-form-item label="设定搅拌时间" prop="set_stir_interval" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-form-item prop="set_stir_interval">
                <el-input placeholder="搅拌间隔时间"  type="number" v-model="form.set_stir_interval" min="0" max="200">
                  <template slot="append">小时</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" style="text-align:center;line-height:50px" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="set_stir_run">
                <el-input placeholder="搅拌运行时间"  type="number" v-model="form.set_stir_run" min="0" max="200">
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="设定注水时间" prop="set_waterin_interval" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-form-item prop="set_waterin_interval">
                <el-input placeholder="注水间隔时间"  type="number" v-model="form.set_waterin_interval" min="0" max="200">
                  <template slot="append">小时</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" style="text-align:center;line-height:50px" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="set_waterin_run">
                <el-input placeholder="注水运行时间"  type="number" v-model="form.set_waterin_run" min="0" max="200">
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="设定排水时间" prop="set_drainage_interval" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-form-item prop="set_drainage_interval">
                <el-input placeholder="排水间隔时间"  type="number" v-model="form.set_drainage_interval" min="0" max="200">
                  <template slot="append">小时</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" style="text-align:center;line-height:50px" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="set_drainage_run">
                <el-input placeholder="排水运行时间"  type="number" v-model="form.set_drainage_run" min="0" max="200">
                  <template slot="append">秒</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelForm('form')">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确认开始试验</el-button>
        </div>
      </el-dialog>
    </div>

  </template>

  <script>
    export default {
      extends: extend,
      name: "searchDevices",
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
          pageTitle: "搜索设备列表",
          timeStr: "",
          dateStr: "",
          userInfoText: "",
          module_list: '',
          countDownTimerMax: 180,
          use: 0,
          dialogFormVisible: false,
          form: {
            material_name: '',
            set_experiment_time:180,
            set_flow:50,
            set_fyp_range: '1',
            set_stir_interval:96,
            set_stir_run:100,
            set_waterin_interval:96,
            set_waterin_run:100,
            set_drainage_interval:96,
            set_drainage_run:100,


        },
        rules: {
          material_name: [
            { required: true, message: '请输入样品', trigger: 'blur' }
          ],
          set_experiment_time: [
            { required: true, message: '请输入试验时长', trigger: 'blur' }
          ],
          set_flow: [
          { required: true, message: '请输入设定流量', trigger: 'blur' }
          ],
          set_stir_interval: [
          { required: true, message: '请输入搅拌间隔时间', trigger: 'blur' }
          ],
          set_stir_run: [
          { required: true, message: '请输入搅拌运行时间', trigger: 'blur' }
          ],
          set_waterin_interval: [
          { required: true, message: '请输入注水间隔时间', trigger: 'blur' }
          ],
          set_waterin_run: [
          { required: true, message: '请输入注水间隔时间', trigger: 'blur' }
          ],
          set_drainage_interval: [
          { required: true, message: '请输入排水间隔时间', trigger: 'blur' }
          ],
          set_drainage_run: [
          { required: true, message: '请输入排水间隔时间', trigger: 'blur' }
          ],
        },
        formLabelWidth: '120px',
        deviceList:[],
        intervalId:null,
        readyDeviceInfo:null,

        };
      },
      computed: {

      },
      methods: {
        btnLogout:function(){
          this.go("/standby");
        },
        //关机
        closeSystem: function () {
          this.popupYNAlert("关闭", "是否关闭电源？", 3000, function () {
            ClientApi.CloseSystem();
          });
        },
        //退出系统
        quitSystem: function () {
          this.$toast.error("dsdsddddddd");

        },
        isAdmin: function () {
          var obj = JSON.parse(ClientApi.IsAdmin());
          if (obj.Status == 1) {
            return "ok";
          } else {
            return "no";
          }
        },
        submitForm(formName) {
          var that=this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              // alert('submit!');
              const pushClient=JSON.parse(JSON.stringify(that.readyDeviceInfo));
              this.dialogFormVisible = false;

              var startCMD='start';
              switch (that.form.set_fyp_range) {
                case '1':
                  startCMD='start';
                  break;
                case '2':
                  startCMD='kaib';
                  break;
                case '3':
                  startCMD='kaia';
                  break;
                default:
                  break;
              }
              $.ajax({
                url: that.readyDeviceInfo.clientApiAddress + "/sendSerialData?cmd="+startCMD,
                type:"get",
                timeout:2000,
                data:{},
                success:function(res1) {
                  var obj1 =JSON.parse(res1);
                  if (obj1.status == 1) {

                  }else{
                    that.$message.error(obj1.message);
                  }
                },
                error:function(){
                  that.$message.error("开启设备失败");
                }

              });
              that.$parent.layerIndex=layer.load(2);
                    $.ajax({
                        url: that.$parent.apiAddress + "/insertExperiment",
                        type:"get",
                        data: {
                            material_name: that.form.material_name,experiment_code: '',
                            set_experiment_time:that.form.set_experiment_time,set_flow:that.form.set_flow,
                            set_stir_time:that.form.set_stir_interval+'~'+that.form.set_stir_run,set_drainage_time:that.form.set_drainage_interval+'~'+that.form.set_drainage_run,
                            set_waterin_time:that.form.set_waterin_interval+'~'+that.form.set_waterin_run,
                            device_ip_address:that.readyDeviceInfo.clientIp,device_mac_address:that.readyDeviceInfo.macAddress,
                            description: '',
                            user_id: that.$parent.userInfo.user_id, user_name: that.$parent.userInfo.real_name
                        },
                        complete:function(){
                          layer.close(that.$parent.layerIndex);
                        },
                        success: function (res) {
                          layer.close(that.$parent.layerIndex);
                          var obj = JSON.parse(res);
                          if (obj.status == 1) {
                              pushClient.experimentId=obj.data;
                              that.$parent.runClientList.push(pushClient);
                              that.$parent.compareClientList.push(JSON.parse(JSON.stringify(that.readyDeviceInfo)));
                              console.log('runClientList:',that.$parent.runClientList);
                              that.go('/experimentList');
                            }else{
                              layer.alert(JSON.stringify(res));
                            }

                          },
                          error: function (XMLHttpRequest, textStatus, errorThrown) {
                            layer.close(that.$parent.layerIndex);
                            alert(errorThrown);
                          }
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
        readyStart(item){
          // this.readyDeviceInfo=JSLINQ(this.deviceList).Where(p=>p.macAddress==macAddress);
          this.readyDeviceInfo=item;
          this.dialogFormVisible = true;

        }
      },
      mounted: function () {
        var that=this;
        this.intervalId=setInterval(function(){
          $.get(
            that.$parent.apiAddress + "/getDeviceList",{},
          function (res) {
          var obj = JSON.parse(res);
          if (obj.status == 1) {
            // console.log("obj.data:",obj.data);
            // console.log("that.$parent.runClientList:",that.$parent.runClientList);
            that.deviceList=getJsonArrayDifference(obj.data,that.$parent.compareClientList);
            console.log("that.deviceList:",that.deviceList)
          }

        });


        },2000);
      },
      beforeDestroy: function () {
        clearInterval(this.intervalId);
      },
    };
  </script>
