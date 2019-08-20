// var moment = require('moment');

export default {

  getCode(code) {
    var locations = location + ""; 
    // if (locations.indexOf('/?#/') > 0) {//处理在支付页面授权时，获取code失败
    // 	locations = locations.replace('/?#/', '/#/')
    // }
    if (locations.indexOf("?") == -1) {
      return false
    }
    var params = locations.split("?");
    var queryArr = params[1].split("&");
    var queryMap = {};
    for (var index in queryArr) {
      var k = queryArr[index].split("=")[0];
      var v = queryArr[index].split("=")[1];
      var s =v.split("#");
      queryMap[k] = s[0];
    }
    return queryMap[code];
  },
  weixinauth (appid,url) {
    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=CD-IMIS#wechat_redirect'
  },
  // itcTiem(el) {
  //   return moment(el).format('YYYY-MM-DD');
  // },
}