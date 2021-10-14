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
              <mu-card-title title="流转记录" sub-title=""></mu-card-title>
              <mu-card-text>
                <mu-container>
                  <mu-paper :z-depth="1">
                    <mu-data-table border id="myDataTable" selectable select-all :selects.sync="selects" :columns="columns"
                      :sort.sync="sort" @sort-change="handleSortChange" :data="list">
                      <template slot-scope="scope">
                        <td>{{scope.row.BarCode}}</td>
                        <td class="is-center">{{scope.row.Name}}</td>
                        <td class="is-center">{{scope.row.RecordType | format_record_type}}</td>
                        <td class="is-center">{{scope.row.CreateDate | format_time}}</td>
                        <td class="is-center">{{scope.row.CreateUserName}}</td>
                        <td class="is-center">{{scope.row.ClientCode}}</td>
                      </template>
                    </mu-data-table>
                  </mu-paper>
                </mu-container>
                <mu-container style="min-width: 100% !important">
                  <mu-flex style="margin: 20px 0;">
                    <mu-pagination id="myDrugPage" raised :total="totalCount" @change="drugReportPageChange"
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
    name: "stockRecordNew",
    data: function () {
      return {
        current: 1,
        pageSize: 13,
        totalCount: 0,
        selects: [],
        sort: {
          name: '',
          order: 'asc'
        },
        columns: [{
            title: '条码',
            width: 150,
            name: 'BarCode'
          },
          {
            title: '药剂名称',
            name: 'Name',
            width: 150,
            align: 'center',
            sortable: true,
            align:'center',
          },
          {
            title: '操作',
            name: 'RecordType',
            width: 100,
            align: 'center',
            sortable: true,
            align:'center',
          },
          {
            title: '时间',
            name: 'CreateDate',
            width: 260,
            align: 'center',
            sortable: true,
            align:'center',
          },
          {
            title: '用户',
            name: 'CreateUserName',
            width: 160,
            align: 'center',
            sortable: true,
            align:'center',
          },
          {
            title: '柜号',
            name: 'Purity',
            width: 150,
            align: 'CabinetNo',
            sortable: true,
            align:'center',
          },
        ],
        list: [],
        pageTitle: "流转记录",
        countDownTimerMax: 60,

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
      drugReportPageChange: function () {
        console.log(11111111)
        this.layerIndex = layer.load(2);
        P_Report.drugRecordReport(this.current, this.pageSize, JSON.stringify(this.$parent.currentInfo));

      },
      drugRecordReportCallback: function (obj) {
        layer.close(this.layerIndex);
        this.totalCount = obj.data.totalCount;
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.list = obj.data.jsonData;
        }
      },
      downloadDrugRecordReportCallback: function (obj) {
        layer.close(this.layerIndex);
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.$toast.info('导出成功！');
        }
      },
      btnExport:function(){
        this.layerIndex = layer.load(2);
        P_Report.downloadDrugRecordReport();
      }

    },
    mounted: function () {
      this.drugReportPageChange();

    }
  };
</script>