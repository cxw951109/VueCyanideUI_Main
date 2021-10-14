export default {
  install(Vue, options) {
    // 跳转页面
    Vue.prototype.go = function (url, param = null) {
      this.$router.push({
        path: url,
        query: param
      });
    }
  }
}


