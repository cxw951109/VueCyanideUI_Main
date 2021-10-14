<style scoped>

</style>
<template>
  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame">
        <div class="myReagentArea">
          <mu-container style="min-width: 99% !important;">
            <mu-card id="myCard" style="width: 100%;  margin: 0 auto;border-radius:10px !important">
              <mu-card-title title="系统日志" sub-title=""></mu-card-title>
              <mu-card-text>
                <mu-container>
                  <mu-paper :z-depth="1">
                    <mu-data-table id="myDataTable" selectable select-all :selects.sync="selects" fit :columns="columns"
                      :sort.sync="sort" @sort-change="handleSortChange" :data="list">
                      <template slot-scope="scope">
                        <td>{{formatSqlTime(scope.row.OperateDate)}}</td>
                        <td class="is-center">{{scope.row.OperateUserName}}</td>
                        <td class="is-center">{{scope.row.OperateType}}</td>
                        <td class="is-center">{{scope.row.ExecuteResult}}</td>
                      </template>
                    </mu-data-table>
                  </mu-paper>
                </mu-container>
                <mu-container style="min-width: 100% !important">
                  <mu-flex style="margin: 20px 0;">
                    <mu-pagination id="myDrugPage" raised :total="totalCount" @change="logListPageChange" :page-size="pageSize" :page-count="6" :current.sync="current"></mu-pagination>
                  </mu-flex>
                </mu-container>
              </mu-card-text>
            </mu-card>
          </mu-container>
        </div>
        <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 680px !important" @click="btnClearData" type="button">清空演示数据</button>
        <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    extends: extend,
    name: "sysMaintenance",
    data: function () {
      return {
        current: 1,
        pageSize: 8,
        totalCount:0,
        selects: [],
        sort: {
          name: '',
          order: 'asc'
        },
        columns: [{
            title: '操作时间',
            width: 250,
            name: 'OperateDate'
          },
          {
            title: '用户',
            name: 'OperateUserName',
            width: 150,
            align: 'center',
            sortable: true
          },
          {
            title: '类型',
            name: 'OperateType',
            width: 150,
            align: 'center',
            sortable: true
          },
          {
            title: '内容',
            name: 'ExecuteResult',
            width: 450,
            align: 'center',
            sortable: true
          }
        ],
        list: [],
        pageTitle: "系统日志",
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
      logListPageChange: function () {
        this.layerIndex = layer.load(2);
        P_Client.getLogList(this.$parent.currentInfo.CustomerId,this.current, this.pageSize);
      },
      btnClearData:function(){
        this.layerIndex = layer.load(2);
        P_Client.clearData();
        
      },
      clearDataCallback:function(obj){

        layer.close(this.layerIndex);
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.$toast.info(obj.message);
        }
      },
      getLogListCallback: function (obj) {
        layer.close(this.layerIndex);
        this.totalCount = obj.data.totalCount;
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.list = obj.data.jsonData;
        }
      },
      formatSqlTime(params){
        return params.replace('T', ' ')
      },
    },
    mounted: function () {
      this.logListPageChange();
    }
  };
</script>