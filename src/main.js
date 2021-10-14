// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast';
import Message from 'muse-ui-message';
import zui from '../static/plugins/zui/js/zui.min'
import App from './App'
import * as echarts from 'echarts';
import router from './router'
// import 'echarts/lib/chart/line'
import $ from 'jquery'
import '../static/js/jquery-migrate-1.2.1'
// import '../static/js/jquery.isotope.min'
import ElementUI from 'element-ui';
import base from './base'
import 'muse-ui/dist/muse-ui.css';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import "../static/plugins/zui/lib/chosen/chosen"
// import "../static/plugins/keyboard/js/jquery.keyboard.min.js"
import "../static/plugins/zui/lib/datetimepicker/datetimepicker"
import 'font-awesome/css/font-awesome.css'



Vue.use(base);
Vue.use(MuseUI);
Vue.use(ElementUI);
// Vue.use(Toast,{
//   position: 'top',               // 弹出的位置
//   time: 2000,                       // 显示的时长
//   closeIcon: 'close',               // 关闭的图标
//   close: false,                      // 是否显示关闭按钮
//   successIcon: 'check_circle',      // 成功信息图标
//   infoIcon: 'info',                 // 信息信息图标
//   warningIcon: 'priority_high',     // 提醒信息图标
//   errorIcon: 'warning'              // 错误信息图标
// });
// Vue.use(Message,{
//   successIcon: 'check_circle',                    // 成功图标
//   infoIcon: 'info',                               // 信息图标
//   warningIcon: 'priority_high',                   // 提醒图标
//   errorIcon: 'warning',                           // 错误图标
//   iconSize: 24,                                   // 图标大小
//   width: 350,                                     // 对话框的宽度
//   maxWidth: '80%',                                // 对话框最大宽度
//   className: '',                                  // 对话框的样式
//   okLabel: '确定',                                 // 对话框确定按钮文字
//   cancelLabel: '取消',                             // 对话框取消按钮文字
//   transition: 'fade'                             // 对话框显示的动画 'slide-left', 'slide-right', 'fade', 'scale'
// });
Vue.use(VueAwesomeSwiper)

// require('element-ui/lib/theme-chalk/index.css')
require('../static/plugins/element-ui-theme/style/theme/index.css')
require('muse-ui-message/dist/muse-ui-message.css')
require('font-awesome-webpack')
require('../node_modules/swiper/dist/css/swiper.css')
require("../static/css/app.css")
// require("../static/plugins/zui/css/zui.min.css")
require("../static/plugins/zui/lib/chosen/chosen.min.css")
require('material-icons')

//require("muse-ui/dist/muse-ui.css")
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */

// 自定义过滤入库类型
Vue.filter('format_record_type', function(rec){
  switch(rec){
    case 1:
    return '入库';
    case 2:
    return '领用';
    case 3:
    return '归还';
    default:
    return rec;
  }
})
// 自定义过滤sqlachemy时间格式
Vue.filter('format_time', function(sql_time){
  return sql_time.replace('T', ' ')
})

// 自定义过滤器格式化药剂状态
Vue.filter('format_status', function(rec){
  switch(rec){
    case 1:
    return '在库';
    case 2:
    return '出库';
    case 3:
    return '空瓶';
    default:
    return rec;
  }
})

var myApp= new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>',
  mounted: function () {

    window.vue = this;
  }
})
