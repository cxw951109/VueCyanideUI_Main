<style scoped>
a,abbr,acronym,address,applet,article,aside,audio,big,blockquote,body,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,table,tbody,td,tfoot,th,thead,time,tr,tt,u,ul,var,video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}
body{line-height:1}
ol,ul{list-style:none}
blockquote,q{quotes:none}
blockquote:after,blockquote:before,q:after,q:before{content:'';content:none}
table{border-collapse:collapse;border-spacing:0}
body{font-family:"Microsoft YaHei","Microsoft JhengHei",STHeiti,MingLiu;}
.login-container{margin:200px auto 0 auto;text-align:center;}
.register-container{margin:6% auto 0 auto}
@media (min-width:670px){
	.login-container {margin: 13% auto 0 auto;}
}
h1{font-size:30px;font-weight:700;text-shadow:0 1px 4px rgba(0,0,0,.2)}
form{position:relative;width:305px;margin:15px auto 0 auto;text-align:center}
input{ width:300px;height:52px;line-height:52px;margin-top:25px;padding:0 15px;background:#e8f0fe;-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;border:1px solid #3d3d3d;border:1px solid rgba(255,255,255,.15);-moz-box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset;-webkit-box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset;box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset;font-family:"Microsoft YaHei",Helvetica,Arial,sans-serif;font-size:20px;text-shadow:0 1px 2px rgba(0,0,0,.1);}
input:-moz-placeholder{color:rgb(151, 143, 143)}
input:-ms-input-placeholder{color:rgb(151, 143, 143)}
input::-webkit-input-placeholder{color:rgb(151, 143, 143)}
input:focus{outline:0;-moz-box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset,0 2px 7px 0 rgba(0,0,0,.2);-webkit-box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset,0 2px 7px 0 rgba(0,0,0,.2);box-shadow:0 2px 3px 0 rgba(0,0,0,.1) inset,0 2px 7px 0 rgba(0,0,0,.2)}
button{cursor:pointer;width:300px;height:54px;margin-top:25px;padding:0;  background: rgba(6, 127, 228, 0.71);-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;border:0;-moz-box-shadow:0 15px 30px 0 rgba(255,255,255,.25) inset,0 2px 7px 0 rgba(0,0,0,.2);font-family:"Microsoft YaHei",Helvetica,Arial,sans-serif;font-size:22px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.1);-o-transition:all .2s;-moz-transition:all .2s;-webkit-transition:all .2s;-ms-transition:all .2s}
button:hover{-moz-box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2);-webkit-box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2);box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2)}
button:active{-moz-box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2);-webkit-box-shadow:0 15px 30px 0 rgba(255,255,255,.15) inset,0 2px 7px 0 rgba(0,0,0,.2);box-shadow:0 5px 8px 0 rgba(0,0,0,.1) inset,0 1px 4px 0 rgba(0,0,0,.1);border:0 solid #016FCB}
.connect{margin-top: 18px; width: 100%; font-size: 18px; text-shadow: 0 1px 3px rgba(0,0,0,.2);}
/* .connect p{position:relative;left:-140%;top:0;margin-top:20px} */
.connect p{position:relative;top:-140%;top:0;margin-top:20px}
.connect a{display:inline-block;width:32px;height:35px;margin-top:15px;}


.login-container {
        z-index: 2;
        position: absolute;
        padding-top: 40px;
        width: 370px;
        border-radius: 5px;
        height: 480px;
        background: #222121e0;
        box-shadow: 0 0 5px #333;
        top: 50%;
        left: 50%;
        margin-top: -250px;
        margin-left: -185px;
        zoom: 1.2;
        /* transition: all 1s;
        -moz-transition: all 1s;
        -webkit-transition: all 1s;
        -o-transition: all 1s; */
    }
</style>
<template>

  <!--页面主体，内容区域-->
  <div class="content">
    <div class="body">
      <div class="frame">
        <div class="login-container">
          <h1 style="color:#c9c4c4">登录</h1>
      
          <div class="connect">
              <p style="color:#c9c4c4">欢迎使用</p>
          </div>
      
          <form action="" method="post" id="loginForm">
              <div>
                  <input type="text" name="username" value="" id="userAccount" class="username" placeholder="用户名" autocomplete="off" />
              </div>
              <div>
                  <input type="password" name="password" value="" id="userPassword" class="password" placeholder="密码"
                      oncontextmenu="return false" onpaste="return false" />
              </div>
              <button id="submit" @click="loginBtnClick()" type="button">登 录</button>
          </form>
      
      </div>
      </div>
    </div>
  </div>

</template>
<script>
  
  export default {
    extends: extend,
    name: "login",
    data: function () {
      return {
        pageTitle: "氰化物试验系统",
        countDownTimerMax: 100,
        userName: "",
        password: "",
      }
    },
    methods: {
      //获得条码事件
      getBarCodeEvent: function () {
        alert("fdfdfdf");
      },
      //用户登录
      loginBtnClick: function () {
        var that=this;
        if ($.trim($("#userAccount").val()) == "") {
          this.$message.error('请输入合法的用户名！');
          // this.$toast.error('请输入合法的用户名！');
          return;
        }
        if ($.trim($("#userPassword").val()) == "") {
          this.$message.error('请输入合法的用户密码！');
          // this.$toast.error('请输入合法的用户密码！');
          return;
        }
        that.$parent.layerIndex=layer.load(2);
        $.ajax({
            url: this.$parent.apiAddress + "/userLogin",
            type:"get",
            timeout:2000,
            data:{ userName: $("#userAccount").val().trim(), userPwd: $("#userPassword").val().trim() },
            success:function(res) {
              var obj = JSON.parse(res);
              if (obj.status == 0) {
                that.$message.error(obj.message);
                layer.close(that.$parent.layerIndex);
              }
              else {
                console.log(obj.data);
                that.$parent.userInfo=obj.data;
                // $("#userTitle").text((obj.data.user_role == 1 ? "管理员" : "普通用户") + "-" + obj.data.real_name);
                layer.close(that.$parent.layerIndex);
                that.go('/menu');
              }
            },
            error:function(jqXHR, textStatus, errorThrown){
              that.$message.error("登录失败！"+ jqXHR.statusText);
            },
            complete:function () {
              layer.close(that.$parent.layerIndex);
            }
        });
      },
      //用户登录回调
      userLoginCallback: function (obj) {
        layer.close(this.layerIndex);
     
        if (obj.status == 1) {
          this.$toast.error(obj.message);
        } else {
          this.$parent.userInfo=obj.data;
          this.$parent.currentInfo = {
            UserId: this.$parent.userInfo.UserId,
            RoleId: this.$parent.userInfo.RoleId,
            UserRealName: this.$parent.userInfo.RealName,
            RoleName: this.$parent.userInfo.RoleName,
            Sex: this.$parent.userInfo.Sex,
            QQ: this.$parent.userInfo.QQ,
            CreateDate: this.$parent.userInfo.CreateDate,
            Mobile: this.$parent.userInfo.Mobile,
            ClientId: this.$parent.clientInfo.ClientId,
            ClientCode: this.$parent.clientInfo.ClientCode,
            CustomerId:this.$parent.clientInfo.CustomerId,
          };
          // 记录用户登录成功日志
          P_User.loginLog(JSON.stringify(this.$parent.currentInfo))
          this.go("/menu");
        }
        return;
      },
    },
    mounted: function () {

      var that = this;

    }
  };
</script>