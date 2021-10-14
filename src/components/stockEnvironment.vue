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
              <mu-card-title title="环境记录" sub-title=""></mu-card-title>
              <mu-card-text>
                <mu-container>
                  <mu-paper :z-depth="1" style="width:100% !important;overflow-x:scroll !important">
                    <mu-data-table border id="myDataTable"  :style="{width:getTableWidth().toString()+'px'}" selectable select-all :selects.sync="selects" :columns="columns"
                      :sort.sync="sort" @fit="fitFalse" @sort-change="handleSortChange" :data="list">
                      <template slot-scope="scope">
                        <td>{{scope.row.RecordDate | format_time}}</td>
                        <td class="is-center">{{scope.row.ClientName}}</td>
                        <td class="is-center">{{scope.row.Temperature}}</td>
                      </template>
                    </mu-data-table>
                  </mu-paper>
                </mu-container>
                <mu-container style="min-width: 100% !important">
                  <mu-flex style="margin: 20px 0;">
                    <mu-pagination id="myDrugPage" raised :total="totalCount" @change="humitureReportPageChange"
                      :page-size="pageSize" :page-count="15" :current.sync="current"></mu-pagination>
                  </mu-flex>
                </mu-container>
              </mu-card-text>
            </mu-card>
          </mu-container>
        </div>
        <button class="btn btn-danger btn-lg list-btn-bottom-right" style="left: 680px !important" @click="btnExport" type="button">导出</button>
        <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    extends: extend,
    name: "stockEnvironment",
    data: function () {
      return {
        current: 1,
        pageSize: 13,
        totalCount: 0,
        selects: [],
        fitFalse:false,
        sort: {
          name: '',
          order: 'asc'
        },
        columns: [{
            title: '记录时间',
            width: '360px',
            name: 'RecordDate'
          },
          {
            title: '终端编号',
            name: 'ClientCode',
            width: '260px',
            sortable: true,
            align:'center',
          },
          {
            title: '温度值',
            name: 'Temperature',
            width: '260px',
            sortable: true,
            align:'center',
          },
        ],
        list: [],
        pageTitle: "环境记录",
        countDownTimerMax: 300,

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
      getTableWidth:function(){
        var tableWidth=0;
        this.columns.forEach(function(value,index,data) {
          tableWidth+= parseInt(value.width.replace('px',''));
        });
        return tableWidth;

      },
      humitureReportPageChange: function () {

        this.layerIndex = layer.load(2);
        P_Report.humitureReport(this.current, this.pageSize, JSON.stringify(this.$parent.currentInfo));

      },
      humitureReportCallback: function (obj) {
        layer.close(this.layerIndex);
        this.totalCount = obj.data.totalCount;
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.list = obj.data.jsonData;
        }
      },
      downloadHumitureReportCallback: function (obj) {
        layer.close(this.layerIndex);
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.$toast.info('导出成功！');
        }
      },
      btnExport:function(){
        this.layerIndex = layer.load(2);
        P_Report.downloadHumitureReport();
      }
    },
    mounted: function () {
      this.getTableWidth();
      this.humitureReportPageChange();
    }
  };
</script>