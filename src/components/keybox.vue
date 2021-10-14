<template>
  <div class="wrapper">
    <div class="wrapper-content" v-for="(item,index) in 20" @click ="chose(index)">
      <img src="../../static/image/keycard.png" style="width:100%;height: 100%"  alt="">
<!--      <span style="position: absolute; top: 0; left: 5px;color: red">{{index+1}}</span>-->
    </div>
  </div>
</template>

<script>
export default {
  extends:extend,
  name: "keybox",
  data:function (){
    return{
      pageTitle:'钥匙柜'
    }
  },
  methods:{
    // 选择钥匙柜
    chose: function (index){
      this.$message({
        message:index+1+'号柜门已打开！',
        type:"success",
      });
      console.log(index+1)
    },
  }
}
</script>

<style scoped>
.wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
.wrapper-content{
  width: 18%;
  height: 20%;
  position: relative;
  margin-right: 0.5%;
  margin-left: 0.5%;
  border: solid 1px black;
  border-radius: 20px;
}
</style>