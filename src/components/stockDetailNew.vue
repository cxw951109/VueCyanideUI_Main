<style scoped>
  * {
    touch-action:none !important;
  }

  .search-devices-frame{
    display:flex;
    flex-direction:column;
    align-items: center;
    height:98%;
    margin-top: 10px;
  }

  .search-devices-box{
    display:flex;
    justify-content:space-around;
    width:98%;
    margin-top: 0px;
    
  }
  .search-devices-box{
    display:flex;
    justify-content:space-between;
    /* width:400px; */
    height:100%;
    background-color: #22212100;
    border-radius:10px;
    /* box-shadow: 10px 10px 10px #1a1a1a; */
    /* border:3px solid #0c0b0b; */
    border:3px solid #2c2c2f;
    cursor: pointer;
    /* border:2px solid #ffffff; */
    /* border:3px solid #5c5edc; */
  }

  .search-devices-box .menu-hr-line{
    /* margin:0 auto; */
    /* margin-top:450px; */
    height: 0.3rem;
    width: 60%;
    background: radial-gradient(#5c5edc 3%, transparent  100%);
  }
  .experimentList-Box{
    display:flex;
    justify-content:space-between;
    height:100%;
  }

  .experimentList-Box .experimentList-left{
    width:80%;
    display:flex;
    flex-direction:row;
    align-items:center;
    height:100%;
    justify-content:space-around;
    /* min-height: 800px; */
  }
  .experimentList-Box .experimentList-right{
    width:25%;
    background-color: rgba(36, 39, 39, 0.876);
    border-radius:3px;
    /* min-height: 800px; */
    display:flex;
    flex-direction:column;
    justify-content:start;
  }
  .charts-Box{
    display:flex;
    justify-content:space-between;
    height:100%;
    width:100%;
    padding: 0 20px;
    background-color: rgba(36, 39, 39, 0.876);
  }
  .charts-Box .charts-left{
    width:20%;
    background-color: rgba(36, 39, 39, 0.876);
    border-radius:3px;
    /* min-height: 800px; */
    display:flex;
    flex-direction:column;
    justify-content:start;
  }
  .charts-Box .charts-right{
    width:80%;
    background-color: rgba(36, 39, 39, 0.876);
    display:flex;
    flex-direction:row;
    align-items:center;
    height:100%;
    justify-content:space-around;
    border-left: 2px solid black;
    /* min-height: 800px; */
  }
  .experimentList-group{
    display:flex;
    flex-direction:column;
    width:96%;
    justify-content:space-between;
    height:100%;
    /* margin-bottom: 20px; */
  }
  .experiment-item{
    width:410px;
    height:239px;
    background-color: #5c5edc;
    border-radius:5px;
    display:flex;
    padding:10px;
    margin-right: 10px;
    border: 2px solid #5c5edc;
  }
  .experiment-item:hover{
    border: 2px solid #f4ea2a;
  }
  .experiment-item-box{
    width:40%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    /* border: 2px solid #91919b; */
    margin-right: 20px;
  }
  .experiment-item-detail{
    border: 2px solid #91919b;
    background-color:#0a0b49;
    padding:8px;
    width:50%;
  }
  .experiment-item-box img{
    width:40%;
  }
  .experiment-item-title{
    font-size:25px;
    text-align:center;
  }
  .experiment-item-detail .experiment-item-detail-title{
    font-size:18px;
    text-align: center;
  }
  .experiment-item-detail .experiment-item-detail-value{
    font-size:26px;
    text-align:center;
  }
  .deviceExperimentInfo{
    list-style: none;
    padding:8px 30px;
    font-size:25px;
  }
  .deviceExperimentOpera{
    padding:8px 30px;
    margin-bottom: 10px;
  }
  .deviceExperimentInfo-item{
    margin-bottom:10px;
  }
  .deviceExperimentInfo-item-title{
    color:rgb(153, 152, 152);
  }
  .deviceExperimentInfo-item-value{
    font-size:26px;
    color:#f4ea2a;
  }

  .btn-small{
    font-size:20px !important;
    line-height:1 !important;
  }

  </style>
  <style>
  .params-setting .el-form-item__label{
    font-size:18px;
    color:rgb(153, 152, 152) ;
  }
  </style>
  
  
  
  <template>
    <!--页面主体，内容区域-->
    <div class="content">

      <div class="body">
          
        <div class="search-devices-frame">
          <div class="search-devices-box">

            <el-tabs style="padding:10px;width:100%" value="first">
              <el-tab-pane label="基本信息" name="first">
                <div style="width:100%;background-color: rgb(23 27 27 / 88%);border-radius:3px">
                  <div class="deviceExperimentInfo">
                    <!-- <div style="margin-bottom:20px;font-weight:bold">试验基本信息</div> -->
                    <div class="deviceExperimentInfo-item">
                      <div class="deviceExperimentInfo-item-title">开始时间：</div>
                      <div class="deviceExperimentInfo-item-value">{{experimentInfo.start_time}}</div>
                    </div>
                    <div class="deviceExperimentInfo-item">
                      <div class="deviceExperimentInfo-item-title">结束时间：</div>
                      <div class="deviceExperimentInfo-item-value">{{experimentInfo.end_time}}</div>
                    </div>
                    <div class="deviceExperimentInfo-item">
                      <div class="deviceExperimentInfo-item-title">试验样品名称：</div>
                      <!-- <div class="deviceExperimentInfo-item-value">{{curSelectItem[3]*curSelectItem[1]==0?0:numRound(curSelectItem[3]*curSelectItem[1]/24.5*44/1000000,3)}}</div> -->
                      <div class="deviceExperimentInfo-item-value">{{experimentInfo.material_name}}</div>
                    </div>
                    <div class="deviceExperimentInfo-item">
                      <div class="deviceExperimentInfo-item-title">设定试验等待时长(min)：</div>
                      <div class="deviceExperimentInfo-item-value">{{experimentInfo.set_experiment_time}}</div>
                    </div>
                    <div class="deviceExperimentInfo-item">
                      <div class="deviceExperimentInfo-item-title">设定氮气流量(ml/min)：</div>
                      <div class="deviceExperimentInfo-item-value">{{experimentInfo.set_flow}}</div>
                    </div>
                    <div class="deviceExperimentInfo-item">
                      <div class="deviceExperimentInfo-item-title">设定搅拌速度(rpm)：</div>
                      <div class="deviceExperimentInfo-item-value">{{experimentInfo.set_stir_time}}</div>
                    </div>
                    <div class="deviceExperimentInfo-item">
                      <div class="deviceExperimentInfo-item-title">试验人：</div>
                      <div class="deviceExperimentInfo-item-value">{{experimentInfo.experiment_user_name}}</div>
                    </div>
                  </div>
                  <div class="deviceExperimentOpera"><el-button style="width:100%;height:60px" type="primary" @click="backMainBaseInfo()" >⬅返回历史试验数据列表</el-button></div>
                </div>
    
              </el-tab-pane>
              <el-tab-pane label="氮气流量变化曲线" class="params-setting" name="three">
                <div class="charts-Box" style="margin-top:10px">
                  <div id="co2_count_Chart" style="width:550px; height:290px"></div>
                </div>
              </el-tab-pane>
            </el-tabs>



          </div>
        </div>
      </div>
    </div>

  </template>

  <script>
    export default {
      extends: extend,
      name: "stockDetailNew",
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
          pageTitle: "历史试验数据详细信息",
          timeStr: "",
          dateStr: "",
          userInfoText: "",
          module_list: '',
          countDownTimerMax: 180,
          use: 0,
          intervalId:null,
          intervalId1:null,
          
          experimentInfo:{
            start_time:'-',
            set_experiment_time:'-',
            real_experiment_time:'-',
          },
          curSelectItem:[0,0,0,0,0,0,0,0],
          curSelectItemIndex:-1,
          experimentCharts:{
            co2_count:null,
            co2_conc:null,
            instant_flow:null,
            total_flow:null,
          },
          chartLoading:false,
          formLabelWidth: '90px',
          form: {
            set_flow:50,
            set_stir_interval:96,
            set_stir_run:100,
            set_waterin_interval:96,
            set_waterin_run:100,
            set_drainage_interval:96,
            set_drainage_run:100,
          },
          fypBaseInfo:{
            co2_count:0,
            co2_conc:0,
            instant_flow:0,
            total_flow:0,
            o2_conc:0,
          },
        };
      },
      computed: {
  
      },
      methods: {
        btnLogout:function(){
          this.go("/standby");
        },
        //退出系统
        quitSystem: function () {
          this.$toast.error("dsdsddddddd");
        },
        backMainBaseInfo:function () {
          this.go('/stockDBManagement');
        },
        clickFYPTab:function (tab) {
          var that = this;
          that.selectItem(parseInt(tab.name.replace('fyp',''))-1);
        },
        selectItem:function (index) {
          var that=this;
          this.curSelectItem=this.$parent.deviceData[index];
          this.curSelectItemIndex=index;
          this.chartLoading=true;
          setTimeout(() => {
            $.get(
                that.$parent.apiAddress + "/getReportFYPData",{experiment_id: that.$route.query.experimentId,fyp_index:index},
                function (res) {
                var obj =JSON.parse(res);
                if (obj.status == 1) {
                  const chartOption={
                      title: { text: '' },
                      tooltip: {
                          trigger: 'axis'
                      },
                      xAxis: {
                          data: []
                      },
                      yAxis: {},
                      series: [{
                          name: '值',
                          type: 'line',
                          smooth: true,
                          data: []
                      }]
                  };
                  chartOption.xAxis.data=obj.data.flow_data[0];
                  chartOption.series[0].data=obj.data.flow_data[1];
                  that.experimentCharts.co2_count.setOption(chartOption);
                  that.chartLoading=false;
                  $(".experimentList-Box").fadeOut(2);
                  $(".charts-Box").fadeIn();
                }
              }); 
          }, 200);
        },
        initCharts(){
        this.experimentCharts.co2_count=this.$echarts.init(document.getElementById('co2_count_Chart'));

        const chartOption={
            title: { text: '' },
            tooltip: {
                trigger:'axis'
            },
            xAxis: {
                data: []
            },
            yAxis: {},
            series: [{
                name: '值',
                type: 'line',
                smooth: true,
                data: []
            }]
        };
        // 绘制图表
        this.experimentCharts.co2_count.setOption(chartOption);
      }

      },
      mounted: function () {
        var that=this;
        $(function () {
          that.initCharts();
          that.selectItem(0);
        })

        $(".experimentList-left").height($(".search-devices-box").height()-95);
        $(".experimentList-right").height($(".search-devices-box").height()-95);

        $(".charts-left").height($(".search-devices-box").height()-95);
        $(".charts-right").height($(".search-devices-box").height()-95);
        window.onresize = function () {
          $(".experimentList-left").height($(".search-devices-box").height()-95);
          $(".experimentList-right").height($(".search-devices-box").height()-95);

          $(".charts-left").height($(".search-devices-box").height()-95);
          $(".charts-right").height($(".search-devices-box").height()-95);
        }
        $.get(
          that.$parent.apiAddress + "/getExperimentInfo",{experiment_id: that.$route.query.experimentId},
          function (res) {
          var obj =JSON.parse(res);
          if (obj.status == 1) {
            that.experimentInfo=obj.data;
          }
        });


      },

    };
  </script>