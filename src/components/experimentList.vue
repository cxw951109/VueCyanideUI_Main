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
    width:95%;
    margin-top: 0px;

  }
  .search-devices-box{
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items: center;
    /* width:400px; */
    height:100%;
    background-color: #22212100;
    /* background-color: rgba(36, 39, 39, 0.876); */
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
    width:95%;
    background-color: rgba(36, 39, 39, 0.876);
    border-radius:3px;
    /* min-height: 800px; */
    display:flex;
    flex-direction:column;
    justify-content:start;
  }
  .charts-Box{
    /* display:flex;
    justify-content:space-between;
    height:100%; */
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
    /* padding:8px 10px; */
    font-size:25px;
  }
  .deviceExperimentOpera{
    /* padding:0px 10px; */
    margin-bottom: 10px;
  }
  .deviceExperimentInfo-item-vel{
    display:flex;
    background-color: rgba(36, 39, 39, 0.876);
    margin-bottom: 0px !important;
    /* padding-bottom: 2px; */
    font-size:21px !important;
    /* text-indent: 5px; */
    /* font-style: italic; */
    padding:5px;
  }
  .deviceExperimentInfo-item-vel .deviceExperimentInfo-item-title
  {
    color:#f0f8f7 !important;
  }
  .deviceExperimentInfo-item-vel .deviceExperimentInfo-item-value
  {
    font-size:20px !important;
    color:#f0f8f7 !important;
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
  .choice {
    height: 38px;
    line-height: 38px;
    border: 1px solid #d2d2d2;
    padding: 0 18px;
    background-color: #fff;
    color: #000;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
  }
  .choice:focus {
    background-color: #009688;
  }
  .choice:hover {
    border-color: #009688;
  }

  .btn-small{
    font-size:20px !important;
    line-height:1 !important;
  }
  .choice {
    height: 38px;
    line-height: 38px;
    border: 1px solid #d2d2d2;
    padding: 0 18px;
    background-color: #fff;
    color: #000;
    white-space: nowrap;
    text-align: center;
    font-size: 14px;
    border-radius: 2px;
    cursor: pointer;
    width: 150px;
  }
  .choice:focus {
    background-color: #494bc7;
  }
  .choice:hover {
    border-color: #494bc7;
  }
  .is_show {
    width: 100%;
    height: 100%;
    background-color: #696969;
    z-index: 1000;
    position: absolute;
    opacity: 0.5;

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
      <div class="is_show" v-show="is_show!=0">

      </div>
      <div style="width: 520px;height: 380px;background-color: #fff;margin-left: 700px;margin-top: 300px;padding: 20px;position: absolute;z-index: 2000" v-show="is_show==1">
        <button type="button" class="choice" @click="choice('a')">注水阀1</button>
        <button type="button" class="choice" @click="choice('b')">注水阀2</button>
        <button type="button" class="choice" @click="choice('c')">注水阀3</button>
        <button type="button" class="choice" @click="choice('d')">注水阀4</button>
        <button type="button" class="choice" @click="choice('e')">注水阀5</button>
        <button type="button" class="choice" @click="choice('f')">注水阀6</button>
        <button type="button" class="choice" @click="choice('g')">注水阀7</button>
        <button type="button" class="choice" @click="choice('h')">注水阀8</button>
        <button type="button" class="choice" @click="choice('i')">注水阀9</button>
        <button type="button" class="choice" @click="cancel()" style="margin-top: 80px;background-color: #494bc7;color: #fff">取消</button>
        <button type="button" class="choice" @click="sendCommand()" style="margin-left: 162px; background-color: #494bc7;color: #fff">开始注水</button>
      </div>
      <div style="width: 520px;height: 380px;background-color: #fff;margin-left: 700px;margin-top: 300px;padding: 20px;position: absolute;z-index: 2000" v-show="is_show==2">
        <button type="button" class="choice" @click="choice('a')">电机上升1-3</button>
        <button type="button" class="choice" @click="choice('b')">电机上升4-6</button>
        <button type="button" class="choice" @click="choice('c')">电机上升7-9</button>
        <button type="button" class="choice" @click="cancel()" style="margin-top: 215px;background-color: #494bc7;color: #fff">取消</button>
        <button type="button" class="choice" @click="sendCommand()" style="margin-left: 162px; background-color: #494bc7;color: #fff">开始上升</button>
      </div>
      <div style="width: 520px;height: 380px;background-color: #fff;margin-left: 700px;margin-top: 300px;padding: 20px;position: absolute;z-index: 2000" v-show="is_show==3">
        <button type="button" class="choice" @click="choice('a')">电机下降1-3</button>
        <button type="button" class="choice" @click="choice('b')">电机下降4-6</button>
        <button type="button" class="choice" @click="choice('c')">电机下降7-9</button>
        <button type="button" class="choice" @click="cancel()" style="margin-top: 215px;background-color: #494bc7;color: #fff">取消</button>
        <button type="button" class="choice" @click="sendCommand()" style="margin-left: 162px; background-color: #494bc7;color: #fff">开始下降</button>
      </div>
      <div class="body">

        <div class="search-devices-frame">
          <div class="search-devices-box">
            <el-tabs style="padding:10px;width:98%" value="first">
              <el-tab-pane label="基本信息" name="first">
                <div class="deviceExperimentInfo">
                  <!-- <div class="deviceExperimentInfo-item">
                    <div class="deviceExperimentInfo-item-title">设备试验开始时间：</div>
                    <div class="deviceExperimentInfo-item-value">{{experimentInfo.start_time}}</div>
                  </div> -->
                  <div class="deviceExperimentInfo-item deviceExperimentInfo-item-vel">
                    <div class="deviceExperimentInfo-item-title">设定试验等待时长：</div>
                    <div class="deviceExperimentInfo-item-value">{{experimentInfo.set_experiment_time}} 分钟 —— {{set_moshi}}</div>
                  </div>
                  <div class="deviceExperimentInfo-item deviceExperimentInfo-item-vel">
                    <div class="deviceExperimentInfo-item-title">设定氮气流量（ml/min）：</div>
                    <div class="deviceExperimentInfo-item-value">{{experimentInfo.set_flow}}</div>
                  </div>
                  <div class="deviceExperimentInfo-item deviceExperimentInfo-item-vel">
                    <div class="deviceExperimentInfo-item-title">设定搅拌转速（rpm）：</div>
                    <div class="deviceExperimentInfo-item-value">{{experimentInfo.set_stir_time}}</div>
                  </div>
                  <div class="deviceExperimentInfo-item" style="margin-top:10px">
                    <div class="deviceExperimentInfo-item-title">当前氮气流量（ml/min）：</div>
                    <div class="deviceExperimentInfo-item-value" style="font-size:40px">{{currentDeviceData.flowValue}} </div>
                  </div>
                  <div class="deviceExperimentInfo-item">
                    <div class="deviceExperimentInfo-item-title">试验运行状态：</div>
                    <div class="deviceExperimentInfo-item-value" style="font-size:35px">
                      <!-- 等待时长：{{experimentInfo.real_experiment_time}} -->
                      <span class="experimentStatus">{{experimentStatusStr}}</span>
                      <el-button style="width:180px;height:50px;font-size:18px" v-show="h2so4BtnDispaly"  @click="h2so4Complete()">确认硫酸注入完成</el-button>
                    </div>
                  </div>
                  <div class="deviceExperimentInfo-item">
                    <div class="deviceExperimentInfo-item-title">试验过程氮气流量变化折线图：</div>
                    <div class="deviceExperimentInfo-item-value">
                      <div class="charts-Box" style="margin-top:10px">
                        <div id="co2_count_Chart" style="width:550px; height:290px"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="deviceExperimentOpera"><el-button style="width:100%;height:60px" type="danger" @click="endExperiment()">提前中止试验</el-button></div>
              </el-tab-pane>
              <!-- <el-tab-pane label="设备控制" name="second">
                <div class="deviceExperimentOpera">
                  <el-button style="width:100%;height:60px" type="primary" @click="deviceCMDControl('djss')">电机上升</el-button>
                </div>
                <div class="deviceExperimentOpera">
                  <el-button style="width:100%;height:60px" type="primary" @click="deviceCMDControl('djxj')">电机下降</el-button>
                </div>
                <div class="deviceExperimentOpera">
                  <el-button style="width:100%;height:60px" type="primary" @click="deviceCMDControl('djtz')">电机停止</el-button>
                </div>
                <div class="deviceExperimentOpera">
                  <el-button style="width:100%;height:60px" type="primary" @click="deviceCMDControl('zsks')">注水开始</el-button>
                </div>
                <div class="deviceExperimentOpera">
                  <el-button style="width:100%;height:60px" type="primary" @click="deviceCMDControl('psks')">排水开始</el-button>
                </div>
              </el-tab-pane> -->
              <el-tab-pane label="参数设置" class="params-setting" name="three">
                <el-form :model="form" style="padding-right:20px;margin-top: 20px;" ref="form">
                  <el-form-item label="氮气流量" :label-width="formLabelWidth">
                    <el-input placeholder="请输入"  type="number" v-model="experimentInfo.set_flow" min="0" max="300">
                      <template slot="append">ml/min</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="" style="margin-bottom: 50px;" :label-width="formLabelWidth">
                    <el-button style="width:50%;height:50px" type="primary" @click="setDevice_flow()">设定</el-button>
                  </el-form-item>
                  <el-form-item label="搅拌转速" :label-width="formLabelWidth">
                    <el-input placeholder="请输入"  type="number" v-model="experimentInfo.set_stir_time" min="0" max="300">
                      <template slot="append">rpm</template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="" style="margin-bottom: 50px;" :label-width="formLabelWidth">
                    <el-button style="width:50%;height:50px" type="primary" @click="setDevice_zs()">设定</el-button>
                  </el-form-item>

                </el-form>
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
      name: "experimentList",
      data:function() {
        return {
          is_show: false,
          command: "",
          line: "",
          zsks: 0,
          psks: 0,
          dj_type: 0,
          is_electric: 0,
          user_opera_open: false,
          swiperOption: {
            disableScroll: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            }
          },
          pageTitle: "试验进行信息",
          timeStr: "",
          dateStr: "",
          userInfoText: "",
          module_list: '',
          countDownTimerMax: 180,
          use: 0,
          intervalId:null,
          intervalId1:null,
          intervalId2:null,
          set_moshi:'抽取硫酸模式',
          experimentInfo:{
            start_time:'-',
            set_experiment_time:'-',
            set_flow:'-',
            set_stir_time:'-',
            real_experiment_time:'-',
            
          },
          currentDeviceData:{
            flowValue:'-',
          },
          curSelectItem:[0,0,0,0,0,0,0,0],
          curSelectItemIndex:-1,
          experimentCharts:{
            co2_count:null,
            co2_conc:null,
            instant_flow:null,
            total_flow:null,
          },
          curExperimentStep:0,
          h2so4BtnDispaly:false,
          waitForExperimentStartTime:0,
          experimentStatusStr:'-',
          chartLoading:false,
          formLabelWidth: '90px',
          form: {
            set_flow:50,
            set_stir_interval:96,
            set_stir_run:100, // 搅拌运行时间（秒）
            set_waterin_interval:96,
            set_waterin_run:100, // 注水运行时间（秒）
            set_drainage_interval:96,
            set_drainage_run:100, // 排水运行时间（秒）
          },
          chartData:[],
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
        doEndExperiment:function(){
          var that=this;
          // console.log(that.$parent.runClientList[0].clientApiAddress + "/stopDevice")
          that.$parent.layerIndex=layer.load(2);
          $.get(that.$parent.apiAddress  + "/closeDevice",{},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                  }
                  // console.log('res:',res);
              });
          $.ajax({
              url: that.$parent.apiAddress + "/endExperiment",
              type:"get",
              timeout:2000,
              data:{experiment_id:that.experimentInfo.experiment_id},
              success:function(res) {
                var obj = JSON.parse(res);
                if (obj.status == 0) {
                  that.$message.error(obj.message);
                }
                else {
                  that.$message.success(obj.message);
                  that.go('/stockDetailNew',{experimentId:that.experimentInfo.experiment_id})
                }
              },
              error:function(jqXHR, textStatus, errorThrown){
                that.$message.error("失败！"+ jqXHR.statusText);
              },
              complete:function () {
                layer.close(that.$parent.layerIndex);
              }
          });

        },
        endExperiment:function () {
          var that=this;
          this.$confirm('此操作不可逆，确定提前中止试验?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            that.doEndExperiment();
          }).catch(() => {

          });
        },
        setDevice_liu:function (){
          if(this.form.set_flow==''){
            this.$message.error('设定值不能为空！');
            return;
          }
          const setCMD='liu'+prefixInteger(this.form.set_flow,3);
          this.deviceCMDControls(setCMD);
        },
        setDevice_jbs:function (){
          if(this.form.set_stir_interval=='' || this.form.set_stir_run==''){
            this.$message.error('设定值不能为空！');
            return;
          }
          const setCMD='jbs'+prefixInteger(this.form.set_stir_interval,3)+'~'+prefixInteger(this.form.set_stir_run,3);
          this.deviceCMDControls(setCMD);
        },
        setDevice_zss:function (){
          if(this.form.set_waterin_interval=='' || this.form.set_waterin_run==''){
            this.$message.error('设定值不能为空！');
            return;
          }
          const setCMD='zss'+prefixInteger(this.form.set_waterin_interval,3)+'~'+prefixInteger(this.form.set_waterin_run,3);
          this.deviceCMDControls(setCMD);
        },
        setDevice_pss:function (){
          if(this.form.set_drainage_interval=='' || this.form.set_drainage_run==''){
            this.$message.error('设定值不能为空！');
            return;
          }
          const setCMD='pss'+prefixInteger(this.form.set_drainage_interval,3)+'~'+prefixInteger(this.form.set_drainage_run,3);
          this.deviceCMDControls(setCMD);
        },
        choice: function(par){
          var that=this;
          that.line = par
        },
        deviceCMDControls: function(fixed){
          var that = this
          $.ajax({
            url: that.$parent.runClientList[0].clientApiAddress + "/sendSerialData?cmd="+fixed,
            type:"get",
            timeout:2000,
            data:{},
            success:function(res) {
              var obj = JSON.parse(res);
              if (obj.status == 0) {
                that.$message.error(obj.message);
              }
              else {
                that.$message.success(obj.message);
              }
            },
            error:function(jqXHR, textStatus, errorThrown){
              that.$message.error("执行失败！"+ jqXHR.statusText);
            },
            complete:function () {
              layer.close(that.$parent.layerIndex);
            }
          });
        },
        sendCommand: function(){
          var that=this;
          that.is_show = 0
          that.$parent.layerIndex=layer.load(2);
          $.ajax({
            url: that.$parent.runClientList[0].clientApiAddress + "/sendSerialData?cmd="+(that.command+that.line),
            type:"get",
            timeout:2000,
            data:{},
            success:function(res) {
              var obj = JSON.parse(res);
              if (obj.status == 0) {
                that.$message.error(obj.message);
              }
              else {
                that.$message.success(obj.message);

                if (that.command == "zsks"){
                  that.zsks = 1
                  that.zsksSetTimeout()
                }else if (that.command == "djss"){
                  that.djSetTimeout()
                }else if (that.command == "djxj"){
                  that.djSetTimeout()
                }else if (that.command == "djtz"){
                  that.djstop()
                }else if (that.command == "psks"){
                  that.psks = 1
                  that.psksSetTimeout()

                }
              }
            },
            error:function(jqXHR, textStatus, errorThrown){
              that.$message.error("执行失败！"+ jqXHR.statusText);
            },
            complete:function () {
              layer.close(that.$parent.layerIndex);
            }
          });
        },

        djSetTimeout:function(){
          var that = this
          that.dj_type = setTimeout(function () {
            that.dj_type = 0
          }, that.form.set_stir_run*1000)
        },
        djstop:function(){
          clearInterval(this.dj_type);
          this.dj_type = 0
        },
        psksSetTimeout:function(){
          var that = this
          setTimeout(function () {
            that.psks = 0
          }, that.form.set_drainage_run*1000)
        },
        zsksSetTimeout:function(){
          var that = this
          setTimeout(function () {
            that.zsks = 0
          }, that.form.set_waterin_run*1000)
        },
        //设备命令控制
        deviceCMDControl: function (cmd) {
          var that=this;
          that.command = cmd
          if (cmd == "zsks"){
            if (that.zsks != 0){
              that.$message.error("请等待注水完成后在开启其他注水阀");
              return
            }
            that.is_show = 1
          }else if (cmd == "djss"){
            if (that.dj_type != 0){
              that.$message.error("当前电机正在上升或下降中,请暂停或等待完成在执行电机操作");
              return
            }
            that.is_show = 2
          }else if (cmd == "djxj"){
            if (that.dj_type != 0){
              that.$message.error("当前电机正在上升或下降中,请暂停或等待完成在执行电机操作");
              return
            }
            that.is_show = 3
          }else if (cmd == "djtz"){
            that.line = ""
            that.sendCommand()
          }else if (cmd == "psks"){
            if (that.psks != 0){
              that.$message.error("当前已在排水,请勿重复操作");
              return
            }
            that.line = ""
            that.sendCommand()
          }
        },
        cancel:function(){
          this.is_show = 0
        },
        backMainBaseInfo:function () {
          this.curSelectItemIndex=-1;
          $(".charts-Box").fadeOut(2);
          $(".experimentList-Box").fadeIn();

        },
        setDevice_flow(){
          var that=this;
          $.get(that.$parent.apiAddress  + "/setFlow",{'value':that.experimentInfo.set_flow},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.$message.success('设置成功');
                  }
          });

        },
        setDevice_zs(){
          var that=this;
          $.get(that.$parent.apiAddress  + "/setZs",{'value':experimentInfo.set_stir_time},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.$message.success('设置成功');
                  }
          });
        },
        h2so4Complete(){
          this.curExperimentStep=4;
          this.h2so4BtnDispaly=false;
        },
        initCharts(){
        this.experimentCharts.co2_count=this.$echarts.init(document.getElementById('co2_count_Chart'));
        const chartOption={
            title: { text: '' },
            tooltip: {
            trigger: 'axis',
            formatter: function (params) {
              
            },
            axisPointer: {
                animation: false
            }
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: true
                }
            },
            series: [{
                name: '值',
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                smooth: true,
                data: this.chartData,
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
        })
        if(sessionStorage.set_moshi=='1'){
          that.set_moshi="自动抽取硫酸模式";
        }else{
          that.set_moshi="手动抽取硫酸模式";
        }
        // $(".charts-Box").hide();
        $(".experimentList-left").height($(".search-devices-box").height()-90);
        $(".experimentList-right").height($(".search-devices-box").height()-90);

        $(".charts-left").height($(".search-devices-box").height()-90);
        $(".charts-right").height($(".search-devices-box").height()-90);
        window.onresize = function () {
          $(".experimentList-left").height($(".search-devices-box").height()-90);
          $(".experimentList-right").height($(".search-devices-box").height()-90);

          $(".charts-left").height($(".search-devices-box").height()-90);
          $(".charts-right").height($(".search-devices-box").height()-90);
        }
        $.get(
          that.$parent.apiAddress + "/getExperimentInfo",{experiment_id: that.$parent.currentExperimentId},
          function (res) {
          var obj =JSON.parse(res);
          if (obj.status == 1) {
            that.experimentInfo=obj.data;
            that.experimentInfo.real_experiment_time='-';
            console.log('that.experimentInfo:',that.experimentInfo)
          }
        });
        var chartUpdateTime=0;
        this.intervalId=setInterval(function(){
          $.get(
              that.$parent.apiAddress + "/getDeviceData",{},
            function (res) {
            var obj = JSON.parse(res);
            if (obj.status == 1) {
              chartUpdateTime+=1;
              that.commonData=obj.data.flowValue;
              that.currentDeviceData.flowValue=obj.data.flowValue;
              if(that.experimentInfo.start_time!='-')
              {              
                const experimentStartTime = new Date(that.experimentInfo.start_time).getTime();
                const jsTime = new Date().getTime() - experimentStartTime;
                const t =parseInt(jsTime / 1000);
                that.chartData.push({
                  name: '1',
                  value: [
                      t.toString(),
                      obj.data.flowValue
                  ]
                });
                if(chartUpdateTime%3==0){
                  that.experimentCharts.co2_count.setOption({
                    series: [{
                        data: that.chartData
                    }]
                  }); 
                }
              }
            }

          });
        },1000);

        this.intervalId2=setInterval(function(){
          if(that.curExperimentStep==4){
            const jsTime = new Date().getTime() - that.waitForExperimentStartTime;
            const t = parseInt(jsTime / 1000);
            $.get(
              that.$parent.apiAddress  + "/writeJsonData",{
                  str_data:JSON.stringify({'experiment_time':t,'flow_data':that.currentDeviceData.flowValue})
                },
                function (res) {
                  // console.log('res:',res);
            });
          }
        },1000);

        this.intervalId1=setInterval(function(){
          switch (that.curExperimentStep) {
            case 0:
              that.curExperimentStep=1;
              that.experimentStatusStr='正在开启氮气通入';
              $.get(that.$parent.apiAddress  + "/openNitrogen",{},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.curExperimentStep=2;
                  }
                  // console.log('res:',res);
              });
              break;
            case 2:
              that.curExperimentStep=3;
              if(sessionStorage.set_moshi=='1'){
                that.experimentStatusStr='正在自动抽取硫酸';
                $.get(that.$parent.apiAddress  + "/sulfuricAcid",{'value':parseInt(sessionStorage.set_liusuan_rpm)},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {

                  }
                  // console.log('res:',res);
                });
                var jsCount=0;
                var totalCount=Math.ceil(50/parseInt(sessionStorage.set_liusuan_rpm)*60);
                var jsInterval= setInterval(() => {
                  that.experimentStatusStr='正在自动抽取硫酸，倒计时'+(totalCount-jsCount)+'秒';
                  if(jsCount>=totalCount)
                  {
                    $.get(that.$parent.apiAddress  + "/stopSulfuricAcid",{},
                      function (res) {
                        var obj = JSON.parse(res);
                        if (obj.status == 1) {
                          that.curExperimentStep=4;
                        }
                        // console.log('res:',res);
                    });
                    clearInterval(jsInterval);
                  }else{
                    jsCount+=1;
                  }
                  
                }, 1000);

              }else{
                that.experimentStatusStr='请将硫酸注入到分液漏斗';
                that.h2so4BtnDispaly=true;
              }
              break;
            case 4:
              that.curExperimentStep=5;
              that.experimentStatusStr='正在注入硫酸';
              $.get(that.$parent.apiAddress  + "/injectAcid",{},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.curExperimentStep=6;
                  }
                  // console.log('res:',res);
              });
              break;
            case 6:
              that.curExperimentStep=7;
              that.experimentStatusStr='正在开启搅拌';
              $.get(that.$parent.apiAddress  + "/openStir",{},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.curExperimentStep=8;
                    that.waitForExperimentStartTime=new Date().getTime();
                  }
                  // console.log('res:',res);
              });
              break;
            case 8:
              if(that.waitForExperimentStartTime!=0){
                const jsTime = new Date().getTime() - that.waitForExperimentStartTime;
                const t = jsTime / 1000;
                that.experimentStatusStr='等待时长：'+Math.floor((t % 3600)/60) + "分" + Math.floor(t % 60) + "秒";
                if(Math.floor((t / 60))>=parseInt(that.experimentInfo.set_experiment_time)){
                  that.curExperimentStep=9;
                  that.doEndExperiment();
                }
              }
              break;
            case 9:
              that.curExperimentStep=10;
              that.experimentStatusStr='正在停止氮气与搅拌';
              $.get(that.$parent.apiAddress  + "/closeDevice",{},
                function (res) {
                  var obj = JSON.parse(res);
                  if (obj.status == 1) {
                    that.curExperimentStep=11;
                  }
                  // console.log('res:',res);
              });
              break;
            case 11:
              that.experimentStatusStr='试验完成';
              that.doEndExperiment();
              break;
            default:
              break;
          }

        },1000);

      },
      beforeDestroy: function () {
        clearInterval(this.intervalId);
        clearInterval(this.intervalId1);
        clearInterval(this.intervalId2);
      },
    };
  </script>
