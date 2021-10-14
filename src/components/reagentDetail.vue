<style scoped>
</style>
<template>

  <div class="content">

    <div class="body">
      <div class="frame">
        <div class="listArea">
          <ul>
            <li>
              <span class="leftText">中文名</span>
              <span class="rightText">{{reagentDetailData.Name}}</span>
            </li>
            <li>
              <span class="leftText">条码</span>
              <span class="rightText">{{reagentDetailData.BarCode}}</span>
            </li>
            <li>
              <span class="leftText">纯度</span>
              <span class="rightText">{{reagentDetailData.Purity}}</span>
            </li>
            <li>
              <span class="leftText">英文名</span>
              <span class="rightText">{{reagentDetailData.EnglishName}}</span>
            </li>
            <li>
              <span class="leftText">状态</span>
              <span class="rightText">{{reagentDetailData.Status | format_status}}</span>
            </li>
            <li>
              <span class="leftText">重点监管</span>
              <span class="rightText">{{reagentDetailData.IsSupervise == 1 ? "是" : "否"}}</span>
            </li>
            <li>
              <span class="leftText">CAS号</span>
              <span class="rightText">{{reagentDetailData.CASNumber}}</span>
            </li>
            <li>
              <span class="leftText">生产时间</span>
              <span class="rightText">{{reagentDetailData.ProductionDate ?reagentDetailData.ProductionDate.replace("T", " ") : ""}}</span>
            </li>
            <li>
              <span class="leftText">过期时间</span>
              <span class="rightText">{{reagentDetailData.ExpirationDate ?reagentDetailData.ExpirationDate.replace("T", " ") : ""}}</span>
            </li>
            <li>
              <span class="leftText">保质期</span>
              <span class="rightText">{{reagentDetailData.ShelfLife}}</span>
            </li>
            <li>
              <span class="leftText">生产厂家</span>
              <span class="rightText">{{reagentDetailData.Manufacturer}}</span>
            </li>
            <li>
              <span class="leftText">经销商</span>
              <span class="rightText">{{reagentDetailData.Distributor}}</span>
            </li>
            <li>
              <span class="leftText">价格（元）</span>
              <span class="rightText">{{reagentDetailData.Price}}</span>
            </li>
            <li>
              <span class="leftText">余量</span>
              <span class="rightText">{{reagentDetailData.Remain}}</span>
            </li>
            <li>
              <span class="leftText">存放地点</span>
              <span class="rightText">{{reagentDetailData.Status==1? reagentDetailData.ClientCode+"号柜"+reagentDetailData.Place:"未在库"}}</span>
            </li>
            <li>
              <span class="leftText">备注</span>
              <span class="rightText">{{reagentDetailData.Remark1}} {{reagentDetailData.Remark2}} {{reagentDetailData.Remark3}}</span>
            </li>
          </ul>
        </div>
      </div>
      <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
    </div>
  </div>

</template>
<script>
  export default {
    name: "reagentDetail",
    extends: extend,
    data: function () {
      return {
        pageTitle: "药剂详情",
        countDownTimerMax: 120,
        reagentDetailData: {}
      };
    },
    computed: {

    },
    methods: {

    },
    mounted: function () {
      P_Drug.getDrugInfo(this.$route.query.drugId,function(result){
        var obj = JSON.parse(result);
        if (obj.status != 0) {
          this.$toast.error(obj.message);
        } else {
          this.reagentDetailData = obj.data;
        }
      });

    }
  };
</script>