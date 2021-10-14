<style scoped>
  .swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    font-size: 18px;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 30px;
  }

</style>
<style>
  #drugSearchPage .mu-pagination-btn.mu-button
  {
 height: 62px !important;
 min-width: 62px !important;
  }
 #drugSearchPage .mu-pagination-item.mu-button
  {
    height: 62px !important;
 min-width: 62px !important;
  }
</style>
<template>

  <!--页面主体，内容区域-->
<div class="content">

    <div class="body">
      <div class="frame">
        <div class="selectArea">
          <div class="selectDiv" style="margin-bottom: 10px">
            <div class="input-control search-box search-box-circle has-icon-left has-icon-right" id="searchboxExample">
              <input id="inputSearchExample1" type="search" v-model="searchWord" class="form-control search-input numkeyboard" style="height:70px;text-indent:20px;font-size: 20px"
                placeholder="搜索 “名称、英文名称、CAS码、条码、备注等信息”" />
              <label for="inputSearchExample1" class="input-control-icon-left search-icon" style="top: 17px;left:15px">
                <i class="icon icon-search" style="color: #353536;font-size: 20px"></i></label>
              <!-- <a href="#" class="input-control-icon-right search-clear-btn" style="top: 15px"><i class="icon icon-remove"></i></a> -->
              <button class="btn btn-primary input-control-icon-right" style="width:100px;height: 69px;background-color: #3280fc !important" id="search-btn" type="button">搜索</button>
            </div>

          </div>           
          <div class="listDiv">

            <div class="rows drug-row" v-for="(item, index) in reagentList" @click="drugClick(item.MedicamentId)" :class="bindClass(item.Status)" :key="index">
              <div class="col-xs-10">
                <div class="col-xs-2 iconSeg-col">
                  <div class="iconSeg">
                    <img src="../../static/image/icon/reagent.png" />
                  </div>
                </div>
                <div class="col-xs-10">
                  <div class="contentSeg">
                    <div class="contentSegTitle">{{cutString(item.Name,12) + "&nbsp;(" + cutString(item.BarCode,8) + ")"+ "&nbsp;[" +
                      getStatusName(item.Status) + "]"
                      +(item.Status!=1?"":item.ClientCode+"号柜"+item.Place)}}</div>
                    <div class="contentSegContext">{{item.EnglishName}}</div>
                  </div>
                </div>
              </div>
              <div class="col-xs-2">
                <div class="statusSeg2" v-if="item.IsSupervise == 1">重点监管</div>
              </div>
            </div>

          </div>


        </div>
        <div class="niceLine" style="margin-top:4px;width:1080px">
          <div class="or-spacer">
            <div class="mask"></div>
          </div>
        </div>
        <mu-container style="min-width: 1080px !important">
          <mu-flex style="margin: 5px 48px 0;">
            <mu-pagination id="drugSearchPage" raised :total="totalCount" @change="pageChange" :page-size="pageSize" :page-count="6" :current.sync="current"></mu-pagination>
          </mu-flex>
        </mu-container>
        <!-- <div class="listDiv">
                <ul>
                  <li v-for="(item, index) in reagentList" :key="index" @click="reagentClickEvent(item)">
                    <div class="frontDiv">
                      <div class="iconSeg">
                        <img src="../../static/image/icon/reagent.png" />
                      </div>
                      <div class="lineSeg"></div>
                      <div class="contentSeg">
                        <div class="contentSegTitle">{{item.Name + "&nbsp;(" + item.RFID + ")"}}</div>
                        <div class="contentSegContext">{{item.EnglishName}}</div>
                      </div>
                    </div>
                    <div class="backDiv">
                      <div v-if="item.IsSupervise == 1" class="statusSeg2">重点监管</div>
                    </div>
                  </li>
                </ul>
              </div> -->
      </div>
      <button class="btn btn-danger btn-lg list-btn-bottom-right" @click="btnBackClickEvent" type="button">返回</button>
    </div>
</div>
</template>
<script>
  export default {
    extends: extend,
    name: "reagentSearch",
    data: function () {
      return {
        current: 1,
        totalCount:0,
        pageSize:9,
        searchWord:'',
        swiperOption: {
          direction: 'vertical',
          slidesPerView: 'auto',
          freeMode: true,
          scrollbar: {
            el: '.swiper-scrollbar'
          },
          mousewheel: true,

        },
        pageTitle: "药剂查询",
        countDownTimerMax: 120,
        reagentList: [],
      }
    },
    watch:{
      searchWord:function(val){
      this.pageChange();
      }
    },
    methods: {
      reagentIsExistent: function (barCode) {
        for (i = this.reagentList.length - 1; i > -1; --i) {
          if (this.reagentList[i].RFID == barCode) {
            break;
          }
        }
        return i;
      },
      getReagentClass: function (item, index) {
        if (index == this.curReagentIndex) {
          return "active";
        } else {
          if (item.barCode) {
            return "already";
          } else {
            return "";
          }
        }
      },
      drugClick: function (_drugId) {
        this.go('/reagentDetail',{drugId:_drugId});
      },
      pageChange:function(){

        this.layerIndex = layer.load(2);
        // layer.alert("fdfd");
        P_Drug.searchDrugList(this.searchWord,this.current,this.pageSize,JSON.stringify(this.$parent.currentInfo));

      },
      searchDrugListCallback:function(obj){
        layer.close(this.layerIndex);
        this.totalCount=obj.data.totalCount;
        if(obj.status!=0)
        {
          this.$toast.error('数据异常！');
        }
        else 
        {
          this.reagentList=obj.data.jsonData;
        }
      },
      bindClass: function (statusFlag) {
        if (!statusFlag) {
          return "";
        } else if (statusFlag == 2) {
          return "already";
        } else if (statusFlag == 3) {
          return "empty";
        } else {
          return "";
        }
      },
      getStatusName: function (statusFlag) {
        switch (statusFlag) {
          case 1:
            return "在库"
            break;
          case 2:
            return "使用中"
            break;
          case 3:
            return "空瓶"
            break;
          default:
            return "在库"
            break;
        }
      },
    },
    mounted: function () {
      window.$('.numkeyboard').keyboard(keyBordSetting);
      // $('#myPager').pager({
      //   page: 1,
      //   recTotal: 100,
      //   maxNavCount: 5,
      // });
      //挂钩jquery插件，实现条码识别
      // $(document).barCodeScanerModeEnter(function (barCode) {
      //   that.appActive();
      //   that.getBarCodeEvent(barCode);
      // });
      // 初始化搜索框，并在选项中指定搜索文本变更事件回调函数，这样当搜索框文本发送变化时获得通知。
      var that=this;
      $('#searchboxExample').searchBox({
        escToClear: true, // 设置点击 ESC 键清空搜索框
        onSearchChange: function (searchKey, isEmpty) {
          console.log('搜索框文本变更：', searchKey);
          that.$toast.error(searchKey);
          that.searchWord=searchKey;
        }
      });
      $("#search-btn").click(function(){
        that.searchWord=$("#inputSearchExample1").val();
      })
      //获取药剂列表
      this.pageChange();

    }

  };
</script>