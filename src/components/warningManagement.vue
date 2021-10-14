<style scoped>
.is-right{
  font-size: 16px !important; 
}
.isSolve{
  border: 1px solid #f8ac59;
  background-color: #f8ac59;
  width: 40px;
  height: 30px;
    color: #FFFFFF;
    display: inline-block;
}
.notSolve{
  border: 1px solid #d1dade;
  background-color: #d1dade;
  width: 40px;
  height: 30px;
  display: inline-block;
}
</style>
<template>
  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame">
        <div class="myReagentArea" style="height:580px !important">
          <mu-container style="min-width: 99% !important;">
            <mu-card id="myCard" style="width: 100%;  margin: 0 auto;border-radius:10px !important">
              <mu-card-title title="预警管理" sub-title=""></mu-card-title>
              <mu-card-text>
                <mu-container>
                  <mu-paper :z-depth="1">
                    <mu-data-table id="myDataTable" selectable select-all :selects.sync="selects" :columns="columns"
                      :sort.sync="sort" @sort-change="handleSortChange" :data="list">
                      <template slot-scope="scope">
                        <td>{{formatObjectType(scope.row.ObjectType)}}</td>
                        <td class="is-center">{{scope.row.WarningContent}}</td>
                        <td class="is-right">{{formatSqlTime(scope.row.WarningDate)}}</td>                    
                      </template>
                    </mu-data-table>
                  </mu-paper>
                </mu-container>
                <mu-container style="min-width: 100% !important">
                  <mu-flex style="margin: 20px 0;">
                    <mu-pagination id="myDrugPage" raised :total="totalCount" @change="warningListPageChange"
                      :page-size="pageSize" :page-count="6" :current.sync="current"></mu-pagination>
                  </mu-flex>
                </mu-container>
              </mu-card-text>
            </mu-card>
          </mu-container>
        </div>
        <!-- <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 680px !important" @click="btnWarningConfig" type="button">预警参数</button> -->
        <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    extends: extend,
    name: "warningManagement",
    data: function () {
      return {
        current: 1,
        pageSize: 5,
        totalCount: 0,
        selects: [],
        sort: {
          name: '',
          order: 'asc'
        },
        columns: [{
            title: '预警类型',
            width: 200,
            name: 'ObjectType'
          },
          {
            title: '预警内容',
            name: 'WarningContent',
            width: 500,
            align: 'center',
            sortable: true
          },
          {
            title: '预警时间',
            name: 'WarningDate',
            width: 200,
            align: 'center',
            sortable: true
          },
        ],
        list: [],
        pageTitle: "预警管理",
        countDownTimerMax: 60,
        useReagentList: [],
        myRecordList: [],

      };
    },
    computed: {

    },
    methods: {
      handleSortChange({
        name,
        order
      }) {
        this.list = this.list.sort((a, b) => order === 'asc' ? a[name] - b[name] : b[name] - a[name]);
      },
      removeSelect(selectIndex) {
        const index = this.selects.indexOf(selectIndex);
        this.selects.splice(index, 1);
      },
      warningListPageChange: function () {

        this.layerIndex = layer.load(2);
        P_Client.getWarningList(this.$parent.currentInfo.CustomerId, this.current, this.pageSize);
      },
      getWarningListCallback: function (obj) {
        layer.close(this.layerIndex);
        this.totalCount = obj.data.totalCount;
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.list = obj.data.jsonData;
        }
      },
      btnWarningConfig: function () {

        this.go("/warningConfig")
      },
      formatSqlTime(params){
        return params.replace('T', ' ')
      },
      formatObjectType(params){
        switch(params){
          case '1':
            return '药剂保质期预警';
          case '2':
            return '药剂过期报警';
          case '3':
            return '药剂余量预警';
          case '4':
            return '药柜温湿度预警';
          case '5':
            return '药柜滤芯保质期预警';
          case '6':
            return '药剂出库超期预警';
          case '7':
            return '违规领用药剂预警';
          default:
            return params
        
        }
      }
    
    },
    mounted: function () {

      this.warningListPageChange();

    }
  };
</script>