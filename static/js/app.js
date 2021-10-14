function ddd(d) {

  alert(d);
}

function padLeft(str, len, ch) {
  ch = ch.substring(0, 1);
  for (i = str.length; i < len; ++i) {
    str = ch + str;
  }
  return str;
}

function padRight(str, len, ch) {
  ch = ch.substring(0, 1);
  for (i = str.length; i < len; ++i) {
    str = str + ch;
  }
  return str;
}

function getYear() {
  return (new Date().getYear() + 1900).toString();
}

function getMonth() {
  return (new Date().getMonth() + 1).toString();
}

function getDate() {
  return (new Date().getDate()).toString();
}

function getHours() {
  return (new Date().getHours()).toString();
}

function getMinutes() {
  return (new Date().getMinutes()).toString();
}

function getSeconds() {
  return (new Date().getSeconds()).toString();
}

function getDay() {
  var day = new Date().getDay();
  switch (day) {
    case 0:
      {
        return "星期天";
      }
    case 1:
      {
        return "星期一";
      }
    case 2:
      {
        return "星期二";
      }
    case 3:
      {
        return "星期三";
      }
    case 4:
      {
        return "星期四";
      }
    case 5:
      {
        return "星期五";
      }
    case 6:
      {
        return "星期六";
      }
    default:
      {
        return "错误";
      }
  }
}

function getTimeStamp() {
  return new Date().getTime();
}
// $(".win10vkb").focus(function () {
//     alert(1);
//     VirtualKeyboard.Show();
// });

// $(".win10vkb").blur(function () {
//     alert(2);
//     VirtualKeyboard.Hide();
// });

function setUser(text) {
  sessionStorage.setItem("userInfo", text);
}

function getUser() {
  var text = sessionStorage.getItem("userInfo");
  return text ? text : "";
}

function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function goto(url) {
  location.assign(url);
}

function doNothing() {
  window.event.returnValue = false;
  return false;
}

function setMenuIndex(curMenu) {
  sessionStorage.setItem("menuIndex", curMenu.toString());
}

function getMenuIndex() {
  return Math.floor(Number(sessionStorage.getItem("menuIndex")));
}

function prefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

function getUrlStr(name) {
  /**
   * 获取地址栏参数
   */
  var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
  if (reg.test(window.location.href)) {
    return unescape(RegExp.$2.replace(/\+/g, " "))
  }
  return undefined
}
function deepCopy(obj){
  if(typeof obj != 'object'){
      return obj;
  }
  var newobj = {};
  for ( var attr in obj) {
      newobj[attr] = deepCopy(obj[attr]);
  }
  return newobj;
}


// 摄像头显示脚本
var imageNr = 0; // Serial number of current image
var finished = new Array(); // References to img objects which have finished downloading
var paused = false;
var videoIp;
function createImageLayer(ip) {
  videoIp=ip;
  var img = new Image();
  img.style.position = "absolute";
  img.style.zIndex = -1;
  img.onload = imageOnload;
  img.onclick = imageOnclick;
  img.src = "http://"+ip+"/?action=snapshot&n=" + (++imageNr);
  var webcam = document.getElementById("webcam");
  webcam.insertBefore(img, webcam.firstChild);
}

// Two layers are always present (except at the very beginning), to avoid flicker
function imageOnload() {
  this.style.zIndex = imageNr; // Image finished, bring to front!
  while (1 < finished.length) {
    var del = finished.shift(); // Delete old image(s) from document
    del.parentNode.removeChild(del);
  }
  finished.push(this);
  if (!paused) createImageLayer(videoIp);
}

function imageOnclick() { // Clicking on the image will pause the stream
  paused = !paused;
  if (!paused) createImageLayer(videoIp);
}

function getFormatDate(date) {
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  var strHours = date.getHours();
  var strMinutes = date.getMinutes();
  var strSeconds = date.getSeconds();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  if (strHours >= 0 && strHours <= 9) {
    strHours = "0" + strHours;
  }
  if (strMinutes >= 0 && strMinutes <= 9) {
    strMinutes = "0" + strMinutes;
  }
  if (strSeconds >= 0 && strSeconds <= 9) {
    strSeconds = "0" + strSeconds;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + " " + strHours + seperator2 + strMinutes
          + seperator2 + strSeconds;
  return currentdate;
}

var keyBordSetting = {

  display: {
      'bksp': '\u2190',
      'accept': 'return',
      'normal': 'ABC',
      'shift': '\u21d1',
      'meta1': '.?123',
      'meta2': '#+='
  },

  layout: 'custom',

  customLayout: {

      'normal': [
          'q w e r t y u i o {bksp}',
          'a s d f g h j k l p',
          '{s} z x c v b n m . ',
          '{meta1} {space} {accept}'
      ],
      'shift': [
          'Q W E R T Y U I O {bksp}',
          'A S D F G H J K L P',
          '{s} Z X C V B N M ! ?',
          '{meta1} {space} {accept}'
      ],
      'meta1': [
          '1 2 3 4 5 6 7 8 9 {bksp}',
          '0 - / : ; ( ) \u20ac & @',
          ' . , ? ! \' " {meta2} ',
          '{normal} {space} {accept}'
      ],
      'meta2': [
          '[ ] { } # % ^ * + = {bksp}',
          '_ \\ | ~ < > $ \u00a3 \u00a5 {enter}',
          '{meta1} . , ? ! \' " {meta1}',
          '{normal} {space} {normal} {accept}'
      ]

  },
  userClosed: true,
  visible: function () {

      SimpleInputMethod.init('.numkeyboard');
  }

}

function array_remove_repeat(a) { // 去重
  var r = [];
  for(var i = 0; i < a.length; i ++) {
      var flag = true;
      var temp = a[i];
      for(var j = 0; j < r.length; j ++) {
          if(temp === r[j]) {
              flag = false;
              break;
          }
      }
      if(flag) {
          r.push(temp);
      }
  }
  return r;
}

function array_intersection(a, b) { // 交集
  // var result = [];
  // for(var i = 0; i < b.length; i ++) {
  //     var temp = b[i];
  //     for(var j = 0; j < a.length; j ++) {
  //         if(temp === a[j]) {
  //             result.push(temp);
  //             break;
  //         }
  //     }
  // }
  // return array_remove_repeat(result);
  var arr3 = a.filter(function(v){
    return b.indexOf(v)!==-1 // 利用filter方法来遍历是否有相同的元素
  });
  return arr3;
}

function array_union(a, b) { // 并集
  return array_remove_repeat(a.concat(b));
}

function array_difference(a, b) { // 差集 a - b
  clone = a
  if(a.length==0)
  {
    return [];
  }
  if(b.length==0)
  {
    return a;
  }
  var clone = a.slice(0);
  for(var i = 0; i < b.length; i ++) {
      var temp = b[i];
      for(var j = 0; j < clone.length; j ++) {
          if(temp === clone[j]) {
              //remove clone[j]
              clone.splice(j,1);
          }
      }
  }
  return array_remove_repeat(clone);
  // var result = a.concat(b).filter(function (v) {
  //   return b.indexOf(v)===-1
  // });
  // return result

  //    var set1 = new Set(arr1);
  //    var set2 = new Set(arr2);
 
  //   var subset = [];
 
  //    for (let item of set1) {
  //        if (!set2.has(item)) {
  //            subset.push(item);
  //        }
  //    }
 
  //    return subset;

}
function equalObject(o1, o2) {
  for(const attr in o1) {
      if(o1.hasOwnProperty(attr)) {

          if(o1[attr] !== o2[attr]) return false
      }
  }
  return true
}
function getJsonArrayDifference(arr1,arr2){
  if(!Array.isArray(arr1) || !Array.isArray(arr2)) return null;

  const longArr = arr1.length > arr2.length ? arr1 : arr2;

  const diffCollect = longArr.reduce((acc, cv, index, arr) => {
      if(!arr1[index] || !arr2[index]) acc.push(cv)
      if(arr1[index] && arr2[index] && !equalObject(arr1[index], arr2[index])) acc.push(cv)
      return acc

  }, [])
  return diffCollect;
}
