
<style scoped>

    </style>
    <template>
        <div class="app" v-cloak @click="appActive">
        <!--页面主体，底部区域-->
        <div class="top">
            <div class="title">
                <img src="../../static/image/icon/cabinetIcon.png" class="appIcon">
                <span class="appName">AI610信息化试剂管理柜</span>
            </div>
            <div class="datetime">
                <div style="transform: skewX(10deg);margin-right: 25px">
                    <span class="time">{{timeStr}}</span>
                    <span class="data">{{dateStr}}</span>
                </div>
            </div>
        </div>

        <!--页面主体，下衬线区域-->
        <div class="line"></div>

        <!--页面主体，内容区域-->
        <div class="content">
            <div class="head">
                <span class="countTimer">{{countDownTimer + "s"}}</span>
            </div>
            <div class="body">
                <div class="frame">
                    <div class="moduleTitle">
                        <div style="transform: skewX(20deg);">{{pageTitle}}</div>
                    </div>
                    <div class="userInfo" @click="userInfoClickEvent">
                        <a class="fa fa-user-circle-o"></a>
                        <span>{{userInfoText ? userInfoText : "错误"}}</span>
                    </div>
                    <transition enter-active-class="animated fadeIn"
                                leave-active-class="animated fadeOut">
                        <div class="userMenu" v-if="userMenuShow" style="{height:(isAdmin()=='ok'?185:123).toString() + 'px'}">
                            <ul style="list-style-type: none;margin-top: 5px;">
                                <li @click="userDetailClickEvent"><a class="fa fa-info-circle"></a>&nbsp;用户信息</li>
                                <li>
                                    <div style="width: 300px;height: 1px;background-color: #aaa;margin-top: 5px;margin-left: -40px;"></div>
                                </li>
                                <li @click="signOutClickEvent"><a class="fa fa-sign-out"></a>&nbsp;注销登录</li>
                                <div v-if="isAdmin()=='ok'">
                                    <li>
                                        <div style="width: 300px;height: 1px;background-color: #aaa;margin-top: 5px;margin-left: -40px;"></div>
                                    </li>
                                    <li @click="closeSystemClickEvent"><a class="fa fa-power-off"></a>&nbsp;关闭电源</li>
                                </div>
                            </ul>
                        </div>
                    </transition>
                    <div class="niceLine">
                        <div class="or-spacer">
                            <div class="mask"></div>
                        </div>
                    </div>
                    <div class="btn-bottom2" @click="btnUpdateEvent">刷新</div>
                    <div class="btn-bottom-right" @click="btnBackClickEvent">返回</div>
                </div>
            </div>
        </div>

        <!--页面主体，底部区域-->
        <div class="bottom">
            <div class="copyright">
                Copyright(C) 研一智控 All Rights Reserved
            </div>
        </div>

        <!--Mask与弹框区域-->
        <transition enter-active-class="animated fadeIn"
                    leave-active-class="animated fadeOut">
            <div class="mask" v-show="popupShow > 0">
                <div class="popup" v-show="popupShow == 1">
                    <div class="popupTitle">
                        <div style="margin-left: 15px;display: flex;align-items: center;">
                            <a class="fa fa-info-circle fa-2x"></a>
                            <span style="margin-left: 20px;">{{popupTitle}}</span>
                        </div>
                        <a class="fa fa-close fa-2x" style="margin-right: 15px;" @click="popupCancle"></a>
                    </div>
                    <div class="popupIcon" style="display: flex;justify-content: center;margin-top: -30px;">
                        <a class="fa fa-info-circle fa-2x" style="color: #ddd;"></a>
                    </div>
                    <div class="popupInfo" style="display: flex;justify-content: center;margin-top: -20px;">
                        <span style="color: #333;">{{popupInfo}}</span>
                    </div>
                    <div class="popupBtn" style="display: flex;justify-content: center;">
                        <div class="btn-free" style="margin-bottom: 20px;" @click="popupYes">确定</div>
                    </div>
                </div>
                <div class="popup" v-show="popupShow == 2">
                    <div class="popupTitle">
                        <div style="margin-left: 15px;display: flex;align-items: center;">
                            <a class="fa fa-info-circle fa-2x"></a>
                            <span style="margin-left: 20px;">{{popupTitle}}</span>
                        </div>
                        <a class="fa fa-close fa-2x" style="margin-right: 15px;" @click="popupCancle"></a>
                    </div>
                    <div class="popupInfo" style="display: flex;justify-content: center;margin-top: -90px;">
                        <span style="color: #333;">{{popupInfo}}</span>
                    </div>
                    <div class="popupBtn" style="display: flex;justify-content: center;">
                        <div class="btn-free" style="margin-bottom: 20px;margin-right: 400px;" @click="popupNo">否</div>
                        <div class="btn-free" style="margin-bottom: 20px;" @click="popupYes">是</div>
                    </div>
                </div>
                <div class="popup" v-show="popupShow == 3">
                    <div class="popupTitle">
                        <div style="margin-left: 15px;display: flex;align-items: center;">
                            <a class="fa fa-info-circle fa-2x"></a>
                            <span style="margin-left: 20px;">{{popupTitle}}</span>
                        </div>
                        <a class="fa fa-close fa-2x" style="margin-right: 15px;" @click="popupCancle"></a>
                    </div>
                    <div class="popupInfo" style="display: flex;justify-content: center;">
                        <span style="color: #333;">{{popupInfo}}</span>
                    </div>
                    <div style="display: flex;justify-content: center;">
                        <input type="text" v-model="popupInputValue" style="width: 90%;font-size: 52px;padding: 10px;border-radius: 10px;" />
                    </div>
                    <div class="popupBtn" style="display: flex;justify-content: center;">
                        <div class="btn-free" style="margin-bottom: 20px;margin-right: 400px;" @click="popupNo">取消</div>
                        <div class="btn-free" style="margin-bottom: 20px;" @click="popupYes()">确定</div>
                    </div>
                </div>
            </div>
        </transition>

    </div>
 </template>
    <script>
    export default {
    name: "template",
    data:function(){
        return{
                pageTitle: "模板",
                timeStr: "",
                dateStr: "",
                userInfoText: "",

                countDownTimerMax: 60,
                countDownTimer: 0,

                userMenuShow: false,

                popupShow: 0,
                popupTitle: "",
                popupInfo: "",
                popupCanCancle: true,
                popupYesFunction: undefined,
                popupNoFunction: undefined,
                popupCancleFunction: undefined,
                popupInputValue: "",
                popupTimer: -1,

                toastShow: false,
                toastInfo: "",


        }
                },
            computed: {
                timeDefaultFormat: function () {
                    return padLeft(getHours(), 2, "0") + ":" + padLeft(getMinutes(), 2, "0") + ":" + padLeft(getSeconds(), 2, "0");
                },
                dateDefaultFormat: function () {
                    return padLeft(getYear(), 4, "0") + "-" + padLeft(getMonth(), 2, "0") + "-" + padLeft(getDate(), 2, "0") + " " + getDay();
                },
                menuPageLength: function () {
                    return Math.floor((this.menuList.length + 5) / 6);
                },
            },
            methods: {                filterNoWarningToday: function () {                    Cab.FilterNoWarningToday();                },
                //通知功能————————————————————————————————————————————————————————————————————————————————————————————————————
                //显示通知，通知10秒钟之后自动关闭
                showToast: function (info) {
                    this.toastShow = true;
                    this.toastInfo = info;
                    var that = this;
                    setTimeout(function () {
                        that.closeToast();
                    }, 6000);
                },
                //关闭通知
                closeToast: function () {
                    this.toastShow = false;
                    this.toastInfo = "";
                },

                //弹框功能————————————————————————————————————————————————————————————————————————————————————————————————————
                //普通弹框
                popupAlert: function (title, info, cancle, yesFunc, cancleFunc) {
                    if (this.popupShow == 0) {
                        this.popupTitle = title;
                        this.popupInfo = info;
                        this.popupYesFunction = yesFunc;
                        this.popupCancleFunction = cancleFunc;
                        this.popupShow = 1;

                        if (cancle != undefined && cancle != null) {
                            if (cancle < 0) {
                                this.popupCanCancle = false;
                            }
                            else if (cancle == 0) {
                                this.popupCanCanCle = true;
                            }
                            else {
                                this.popupCanCanCle = true;
                                var that = this;
                                that.popupTimer = setTimeout(function () {
                                    that.popupCancle();
                                }, cancle);
                            }
                        }
                        else {
                            this.popupCanCancle = true;
                        }
                    }
                },
                //询问弹框
                popupYNAlert: function (title, info, cancle, yesFunc, noFunc, cancleFunc) {
                    if (this.popupShow == 0) {
                        this.popupTitle = title;
                        this.popupInfo = info;
                        this.popupYesFunction = yesFunc;
                        this.popupNoFunction = noFunc;
                        this.popupCancleFunction = cancleFunc;
                        this.popupShow = 2;

                        if (cancle != undefined && cancle != null) {
                            if (cancle < 0) {
                                this.popupCanCancle = false;
                            }
                            else if (cancle == 0) {
                                this.popupCanCanCle = true;
                            }
                            else {
                                this.popupCanCanCle = true;
                                var that = this;
                                that.popupTimer = setTimeout(function () {
                                    that.popupCancle();
                                }, cancle);
                            }
                        }
                        else {
                            this.popupCanCancle = true;
                        }
                    }
                },
                //输入弹框
                popupInAlert: function (title, info, cancle, yesFunc, noFunc, cancleFunc) {
                    if (this.popupShow == 0) {
                        this.popupTitle = title;
                        this.popupInfo = info;
                        this.popupYesFunction = yesFunc;
                        this.popupNoFunction = noFunc;
                        this.popupCancleFunction = cancleFunc;
                        this.popupShow = 3;

                        if (cancle != undefined && cancle != null) {
                            if (cancle < 0) {
                                this.popupCanCancle = false;
                            }
                            else if (cancle == 0) {
                                this.popupCanCanCle = true;
                            }
                            else {
                                this.popupCanCanCle = true;
                                var that = this;
                                that.popupTimer = setTimeout(function () {
                                    that.popupCancle();
                                }, cancle);
                            }
                        }
                        else {
                            this.popupCanCancle = true;
                        }
                    }
                },
                popupYes: function () {
                    if (this.popupYesFunction) {
                        this.popupYesFunction(this.popupInputValue);
                    }
                    this.popupClose();
                },
                popupNo: function () {
                    if (this.popupNoFunction) {
                        this.popupNoFunction();
                    }
                    this.popupClose();
                },
                popupClose: function () {
                    this.popupTitle = "";
                    this.popupInfo = "";
                    this.popupYesFunction = undefined;
                    this.popupNoFunction = undefined;
                    this.popupCancleFunction = undefined;
                    this.popupCanCancle = true;
                    this.popupShow = 0;
                    this.popupInputValue = "";
                    clearTimeout(this.popupTimer);
                },
                popupCancle: function () {
                    if (this.popupCanCancle) {
                        if (this.popupCancleFunction) {
                            this.popupCancleFunction();
                        }
                        this.popupClose();
                    }
                },

                //内置功能————————————————————————————————————————————————————————————————————————————————————————————————————
                //获得默认格式的时间
                getTimeDefaultFormat: function () {
                    return padLeft(getHours(), 2, "0") + ":" + padLeft(getMinutes(), 2, "0") + ":" + padLeft(getSeconds(), 2, "0");
                },
                //获得默认格式的日期
                getDateDefaultFormat: function () {
                    return padLeft(getYear(), 4, "0") + "-" + padLeft(getMonth(), 2, "0") + "-" + padLeft(getDate(), 2, "0") + " " + getDay();
                },
                //日期时间更新方法
                updateDateTime: function () {
                    this.timeStr = this.getTimeDefaultFormat();
                    this.dateStr = this.getDateDefaultFormat();
                },
                //倒计时更新方法，调用倒计时超时事件
                updateCountDownTimer: function () {
                    this.countDownTimer--;
                    if (this.countDownTimer == 0) {
                        this.countDownTimerEvent();
                    }
                },
                //用户退出方法
                userSignOut: function () {
                    location.href = "standby.html";
                },
                //页面返回方法
                pageBack: function () {
                    window.history.back();
                    location.reload();
                },
                //使用药剂柜方法
                useCabinet: function () {
                    try {
                        Cab.Use();
                    }
                    catch (e) { }
                },
                //离开药剂柜方法
                leaveCabinet: function () {
                    try {
                        Cab.Leave();
                    }
                    catch (e) { }
                },

                //事件————————————————————————————————————————————————————————————————————————————————————————————————————————
                //激活App操作界面事件，用户点击或者是条码扫描
                appActive: function () {
                    this.countDownTimer = this.countDownTimerMax;
                },
                //倒计时结束事件
                countDownTimerEvent: function () {
                    goto("standby.html");
                },
                //获得条码事件
                getBarCodeEvent: function (barCode) {
                    alert("获得条码：" + barCode);
                },
                //开门事件
                doorOpenEvent: function () {
                    alert("门开");
                },
                //关门事件
                doorCloseEvent: function () {
                    alert("门关");
                },
                //门没关预警事件
                doorNotCloseWarningEvent: function () {
                    this.showToast("柜门长时间未关闭，请关闭柜门");
                },
                //滤芯预警事件
                filterWarningEvent: function (info) {
                    this.showToast("滤芯即将到期：" + info);
                },
                //湿度超高预警事件
                humMaxWarningEvent: function (num) {
                    this.showToast("当前湿度 " + num + "% 超过湿度最大值！");
                },
                //湿度超低预警事件
                humMinWarningEvent: function (num) {
                    this.showToast("当前湿度 " + num + "% 低于湿度最小值！");
                },
                //温度超高预警事件
                temMaxWarningEvent: function (num) {
                    this.showToast("当前温度 " + num + "℃ 超过温度最大值！");
                },
                //温度抄底预警事件
                temMinWarningEvent: function (num) {
                    this.showToast("当前温度 " + num + "℃ 超过温度最小值！");
                },
                //用户信息点击事件
                userInfoClickEvent: function () {
                    this.userMenuShow = !this.userMenuShow;
                    if (this.userMenuShow) {
                        var that = this;
                        setTimeout(function () {
                            that.userMenuShow = false;
                        }, 6000);
                    }
                },
                //用户详细信息菜单点击事件
                userDetailClickEvent: function () {
                    goto("userInfoDetail.html");
                },
                //用户登出菜单点击事件
                signOutClickEvent: function () {
                    this.popupYNAlert("退出登录", "确定退出登录？", 3000, function () {
                        this.userSignOut();
                    });
                },
                //返回按钮点击事件
                btnBackClickEvent: function () {
                    //this.popupInAlert("提示信息", "请输入", 3000, function (str) {alert(str);}, function () {alert(2);}, function () {alert(3);});
                    //this.showToast("请关门");
                    //this.useCabinet();
                    this.pageBack();
                },
                //刷新按钮点击事件
                btnUpdateEvent: function () {
                    this.updateUserInfoData();
                },

                //用户自定义方法————————————————————————————————————————————————————————————————————————————————————————————————
                //用户关闭系统点击事件
                closeSystemClickEvent: function () {
                    this.popupYNAlert("关闭", "是否关闭电源？", 3000, function () {
                        ClientApi.CloseSystem();
                    });
                },
                isAdmin: function () {
                    
                    return ClientApi.IsAdmin();
                }
            },
            mounted: function () {
                //初始化与更新日期时间，定时器
                this.countDownTimer = this.countDownTimerMax;
                var that = this;
                that.updateDateTime();
                setInterval(function () {
                    that.updateDateTime();
                    that.updateCountDownTimer();
                }, 1000);

                //双击页面刷新，这个是调试的时候使用的
                $(document).dblclick(function () {
                    location.reload();
                });

                //挂钩jquery插件，实现条码识别
                $(document).barCodeScanerModeEnter(function (barCode) {
                    that.appActive();
                    that.getBarCodeEvent(barCode);
                });

                this.userInfoText = getUser();

            }

            };
    </script>