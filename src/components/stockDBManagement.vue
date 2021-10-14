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
    <div class="content"  v-loading="exportLoading" element-loading-text="正在导出数据报表,请耐心等待..." element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">

      <div class="body">
          
        <div class="search-devices-frame">
          <div class="search-devices-box">
            <div class="search-devices-list">
                <el-table stripe="true" border="true"
                :data="tableData"
                style="width: 100%;margin-top: 40px;"
                max-height="600">
                <el-table-column
                  fixed
                  prop="start_time"
                  label="开始时间"
                  width="200">
                </el-table-column>
                <!-- <el-table-column
                  prop="material_name"
                  label="样品名称"
                  width="200">
                </el-table-column> -->
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="340">
                  <template slot-scope="scope">
                    <el-button
                      @click.native.prevent="viewReportInfo(scope.row.experiment_id)" size="small">
                      查看详情
                    </el-button>
                    <!-- <el-button
                    @click.native.prevent="exportReportInfo(scope.row.experiment_id)" size="small">
                    导出
                  </el-button> -->
                    <el-button
                      @click.native.prevent="deleteReportInfo(scope.$index,scope.row.experiment_id)" size="small" type="danger">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </template>

  <script>
    export default {
      extends: extend,
      name: "stockDBManagement",
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
          pageTitle: "历史试验数据",
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
            set_stir_interval:96,
            set_stir_run:100,
            set_waterin_interval:96,
            set_waterin_run:100,
            set_drainage_interval:96,
            set_drainage_run:100,


        },
        formLabelWidth: '120px',
        deviceList:[],
        intervalId:null,
        readyDeviceInfo:null,
        tableData: [{
          start_time: '2021-06-10 13:59:20',
          material_name: '试样',
          set_experiment_time: '180',
          real_experiment_time: '2',
          set_flow: '50',
          experiment_user_name: '张三'
        }
        ],
        exportLoading:false,
        };
      },
      computed: {
  
      },
      methods: {
        btnLogout:function(){
          this.go("/standby");
        },
        deleteReportInfo(index, _experimentId) {
          var that=this;
          this.$confirm('确定要删除此报表数据吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.$parent.layerIndex=layer.load(2);
            $.ajax({
                url: that.$parent.apiAddress + "/deleteExperiment",
                type:"get",
                timeout:2000,
                data:{
                  experiment_id: _experimentId
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
        cancelForm(formName){
          this.dialogFormVisible = false;
          this.$refs[formName].resetFields();
        },
        getExperimentList(){
          var that=this;
          that.$parent.layerIndex=layer.load(2);
          $.ajax({
              url: that.$parent.apiAddress + "/getExperimentList",
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
        exportReportInfo(_experimentId){
          var that=this;

          // that.$parent.layerIndex=layer.msg('正在导出数据报表，请耐心等待...', {
          //   icon: 16
          //   ,shade: 0.01
          // });
          that.exportLoading=true;
          $.ajax({
              url: that.$parent.apiAddress + "/exportReport",
              type:"get",
              timeout:3600000,
              data:{experiment_id:_experimentId},
              success:function(res) {
                var obj = JSON.parse(res);
                if (obj.status == 0) {
                  that.$message.error(obj.message);
                }
                else {
                  that.$alert(obj.message, '数据导出提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                  });
                }
              },
              error:function(jqXHR, textStatus, errorThrown){
                that.$message.error("导出数据失败！"+ jqXHR.statusText);
              },
              complete:function () {
                // layer.close(that.$parent.layerIndex);
                that.exportLoading=false;
              }
          });
        },
        viewReportInfo(_experimentId){
          this.go('/stockDetailNew',{experimentId:_experimentId})
        }
      },
      mounted: function () {
        var that=this;
        that.getExperimentList();
      },
      beforeDestroy: function () {
        clearInterval(this.intervalId);
      },
    };
  </script>