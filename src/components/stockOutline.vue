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
              <mu-card-title title="库存概要" sub-title=""></mu-card-title>
              <mu-card-text>
                <mu-container>
                  <mu-paper :z-depth="1" style="width:100% !important;overflow-x:scroll !important">
                    <mu-data-table border id="myDataTable" :style="{width:getTableWidth().toString()+'px'}" selectable select-all :selects.sync="selects"  :columns="columns"
                      :sort.sync="sort" @sort-change="handleSortChange" :data="list">
                      <template slot-scope="scope">
                        <td>{{scope.row.Name}}</td>
                        <td class="is-center">{{scope.row.CASNumber}}</td>
                        <td class="is-center">{{scope.row.Purity}}</td>
                        <td class="is-center">{{scope.row.IsSupervise}}</td>
                        <td class="is-center">{{scope.row.NormalCount}}</td>
                        <td class="is-center">{{scope.row.UseCount}}</td>
                        <td class="is-center">{{scope.row.TotalCount}}</td>
                        <td class="is-center">{{scope.row.StockPrice}}</td>
                        <td class="is-center">{{scope.row.QuarterlyPutInCount}}</td>
                        <td class="is-center">{{scope.row.YearPutInCount}}</td>
                        <td class="is-center">{{scope.row.QuarterlyEmptyCount}}</td>
                        <td class="is-center">{{scope.row.YearEmptyCount}}</td>
                        <td class="is-center">{{scope.row.QuarterlyEmptyPrice}}</td>
                        <td class="is-center">{{scope.row.YearEmptyPrice}}</td>
                      </template>
                    </mu-data-table>
                  </mu-paper>
                </mu-container>
                <mu-container style="min-width: 100% !important">
                  <mu-flex style="margin: 20px 0;">
                    <mu-pagination id="myDrugPage" raised :total="totalCount" @change="drugVarietyReportPageChange" :page-size="pageSize" :page-count="6" :current.sync="current"></mu-pagination>
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
    name: "stockOutline",
    data: function () {
      return {
        current: 1,
        pageSize: 10000,
        totalCount:0,
        selects: [],
        sort: {
          name: '',
          order: 'asc'
        },
        columns: [
          {
            title: '名称',
            name: 'Name',
            width: '150px',
          },
          {
            title: 'CAS',
            name: 'CASNumber',
            width: '200px',
            align:'center',
          },
          {
            title: '纯度',
            name: 'Purity',
            width: '100px',
            align:'center',
          },
          {
            title: '是否监管',
            name: 'IsSupervise',
            width: '150px',
            align:'center',
          },
          {
            title: '在库数量',
            name: 'NormalCount',
            width: '150px',
            align:'center',
          },
          {
            title: '借出数量',
            name: 'UseCount',
            width: '150px',
            align:'center',
          },
          {
            title: '库存数量',
            name: 'TotalCount',
            width: '150px',
            align:'center',
          },
          {
            title: '库存价值',
            name: 'StockPrice',
            width: '150px',
            align:'center',
          },
          {
            title: '月度库存数量',
            name: 'QuarterlyPutInCount',
            width: '180px',
            align:'center',
          },
          {
            title: '年度库存数量',
            name: 'YearPutInCount',
            width: '180px',
            align:'center',
          },
          {
            title: '月度消耗数量',
            name: 'QuarterlyEmptyCount',
            width: '180px',
            align:'center',
          },
          {
            title: '年度消耗数量',
            name: 'YearEmptyCount',
            width: '180px',
            align:'center',
          },
          {
            title: '月度消耗价值',
            name: 'QuarterlyEmptyPrice',
            width: '180px',
            align:'center',
          },
          {
            title: '年度消耗价值',
            name: 'YearEmptyPrice',
            width: '180px',
            align:'center',
          },
        ],
        list: [],
        pageTitle: "库存概要",
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
      getTableWidth:function(){
        var tableWidth=0;
        this.columns.forEach(function(value,index,data) {
          tableWidth+= parseInt(value.width.replace('px',''));
        });
        return tableWidth;

      },
      drugVarietyReportPageChange: function () {

        this.layerIndex = layer.load(2);
        P_Report.drugVarietyReport();

      },
      drugVarietyReportCallback: function (obj) {
        layer.close(this.layerIndex);
        this.totalCount = obj.data.totalCount;
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.list = obj.data.jsonData;
        }
      },
      downloadDrugCategoryReportCallback: function (obj) {
        layer.close(this.layerIndex);
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.$toast.info('导出成功！');
        }
      },
      btnExport:function(){
        this.layerIndex = layer.load(2);
        P_Report.downloadDrugCategoryReport();
      }
    },
    mounted: function () {

      this.drugVarietyReportPageChange();

    }
  };
</script>