<style scoped>
  .myReagentArea  .useContent {
  height: 350px;
  margin: 15px;
  overflow-y: auto;
}
.myReagentArea   .useContent  ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0px !important;
  margin: 0px !important;
}
.myReagentArea   .useContent  ul  li {
  position: relative;
  width: 140px;
  height: 140px;
  border-radius: 10px;
  /* background: linear-gradient(to bottom, #98d55c, #6ea352); */
  background-color: #6ea352;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  text-align: center;
  margin: 20px;
  padding: 10px;
  color:#1d1c18;
  box-shadow: #6ea352 0px 0px 10px;
}
.myReagentArea   .useContent  ul  li  img {
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
.myReagentArea   .useContent  ul  li  span:first-child {
  color: white;
  font-weight: bold;
}
.myReagentArea  .useContent  ul  li  span:nth-child(3) {
  font-size: 10px;
}
.myReagentArea   .useContent  ul  li  div {
  position: absolute;
  top: -11px;
  left: 5px;
  background: linear-gradient(to bottom, #d5ab21, #ac891b);
  padding: 3px;
  border-radius: 5px;
  font-size: 12px;
}
.barCode{
  border: 1px solid #337ab7;
  border-radius: 5px;
  background-color: #337ab7;
    color: #FFFFFF;
    display: inline-block;
    width: auto;
    height: auto;
    color: #FFFFFF;
}
</style>

<template>
  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame">
        <div class="myReagentArea">
          <mu-container style="min-width: 99% !important">
            <mu-card id="myCard" style="width: 100%;  margin: 0 auto;">
              <mu-card-title title="已领用" sub-title=""></mu-card-title>
              <mu-card-text style="margin-bottom: 10px">
                <div class="useContent">
                  <ul style="margin-left: 39px !important;line-height: 15px;">
                    <li v-for="item in useDrugList" :key="item.BarCode">
                      <img src="../../static/image/icon/reagent.png" />
                      <span>{{item.Name}}({{item.BarCode}})</span>
                      <span >{{item.ByUserDate}} 借出</span>
                      <!-- <div>重点监管</div> -->
                    </li>
                    <!-- <li v-for="item in useReagentList" @click="reagentClick(item)" :key="item.RFID">
                                <img src="../../static/image/icon/reagent.png" />
                                <span>{{item.Name + "（" + item.RFID + "）"}}</span>
                                <span>{{item.ByUserDate.replace("T", " ")}} 借出</span>
                                <div v-if="item.IsSupervise == 1">重点监管</div>
                              </li> -->
                             
                  </ul>
                </div>
              </mu-card-text>
              <mu-card-title title="我的记录" sub-title=""></mu-card-title>
              <mu-card-text>
                <mu-container>
                  <mu-paper :z-depth="1">
                    <mu-data-table id="myDataTable" selectable select-all :selects.sync="selects" fit :columns="columns"
                      :sort.sync="sort" @sort-change="handleSortChange" :data="list">
                      <template slot-scope="scope">
                        <td><div class="barCode">{{cutString(scope.row.BarCode,8)}}</div></td>
                        <td class="is-center">{{cutString(scope.row.CASNumber,16)}}</td>
                        <td class="is-center">{{cutString(scope.row.Name,16)}}</td>
                        <td class="is-center">{{scope.row.Purity}}</td>
                        <td class="is-center">{{cutString(formatSqlTime(scope.row.CreateDate),11)}}</td>
                        <td class="is-center">{{getDrugRecordTypeByCode(scope.row.RecordType)}}</td>
                      </template>
                    </mu-data-table>
                  </mu-paper>
                </mu-container>
                <mu-container style="min-width: 100% !important">
                  <mu-flex style="margin: 20px 0;">
                    <mu-pagination id="myDrugPage" raised :total="totalCount" @change="drugRecordPageChange" :page-size="pageSize" :page-count="6" :current.sync="current"></mu-pagination>
                  </mu-flex>
                </mu-container>
              </mu-card-text>
            </mu-card>
          </mu-container>
        </div>
        <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    extends: extend,
    name: "myReagent",
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
            title: '条码',
            width: 135,
            name: 'BarCode'
          },
          {
            title: 'CAS号/',
            name: 'CASNumber',
            width: 200,
            align: 'center',
            sortable: true
          },
          {
            title: '名称',
            name: 'Name',
            width: 200,
            align: 'center',
            sortable: true
          },
          {
            title: '纯度',
            name: 'Purity',
            width: 100,
            align: 'center',
            sortable: true
          },
          {
            title: '时间',
            name: 'CreateDate',
            width: 160,
            align: 'center',
            sortable: true
          },
          {
            title: '操作',
            name: 'RecordType',
            width: 116,
            align: 'center',
            sortable: true
          }
        ],
        list: [],
        pageTitle: "我的药剂",


        countDownTimerMax: 60,

        useDrugList: [],
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
      drugRecordPageChange: function () {

        this.layerIndex = layer.load(2);
        P_Drug.getUserDrugRecordList(this.current, this.pageSize,JSON.stringify(this.$parent.currentInfo));

      },
      getUserDrugRecordListCallback:function(obj){
        layer.close(this.layerIndex);
        this.totalCount=obj.data.totalCount;
        if(obj.status!=0)
        {
          this.$toast.error(obj.message);
        }
        else
        {
          this.list=obj.data.jsonData;
        }
      },
      getUserUseDrugListCallback: function (obj) {
        if (obj.status == 0) {
          this.useDrugList = obj.data;

        } else {
          this.$toast.error(obj.message);
        }
      },
      formatSqlTime(params){
     
          return params.replace('T', ' ')
      }

    },
    mounted: function () {

      //获取当前用户已领用药剂列表
      P_Drug.getUserUseDrugList(this.$parent.currentInfo.UserId)
      this.drugRecordPageChange();
      
    }
  };
</script>