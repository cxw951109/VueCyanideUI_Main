var extend = {
  data: function () {
    return {
      //弹窗编号
      layerIndex: 0,
    }
  },
  created: function () {


  },
  computed: {

  },
  methods: {
    //页面返回方法
    pageBack: function () {
      window.history.back();
      //this.$router.go(-1)
    },
    btnBackClickEvent: function () {
      this.pageBack();

    },
    //根据流转记录代码获取流转记录名称
    getDrugRecordTypeByCode: function (code) {
      switch (code) {
        case 1:
          return "入库"
          break;
        case 2:
          return "领用"
          break;
        case 3:
          return "归还"
          break;

        default:
          return "未知"
          break;
      }
    },
    cutString:function (str, len) { 
 
      //length属性读出来的汉字长度为1 
    
      if(str.length*2 <= len) { 
    
        return str; 
    
      } 
    
      var strlen = 0; 
    
      var s = ""; 
    
      for(var i = 0;i < str.length; i++) { 
    
        s = s + str.charAt(i); 
    
        if (str.charCodeAt(i) > 128) { 
    
          strlen = strlen + 2; 
    
          if(strlen >= len){ 
    
            return s.substring(0,s.length-1) + "..."; 
    
          } 
    
        } else { 
    
          strlen = strlen + 1; 
    
          if(strlen >= len){ 
    
            return s.substring(0,s.length-2) + "..."; 
    
          } 
    
        } 
    
      } 
    
      return s; 
    
    },

  },
  mounted: function () {
    this.$parent.pageTitle = this.pageTitle;
    if (this.countDownTimerMax == undefined || this.countDownTimerMax == "undefined") {
      this.$parent.countDownTimer = -1;
    } else {
      this.$parent.countDownTimer = this.countDownTimerMax;
    }

  }

}