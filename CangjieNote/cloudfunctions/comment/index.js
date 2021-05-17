// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）    
  //env: '你的环境ID',
  env: 'cloud0-backend-7gnbnkiz459f6b99',
  traceUser: true,
});

const db = cloud.database();
const _ = db.command;

const currTime = () => {
  const date = new Date();
  var fmt = "yyyy-MM-dd,hh:mm:ss";
  var o = { 
    "M+" : date.getMonth()+1,                 //月份 
    "d+" : date.getDate(),                    //日 
    "h+" : date.getHours(),                   //小时 
    "m+" : date.getMinutes(),                 //分 
    "s+" : date.getSeconds(),                 //秒 
    "q+" : Math.floor((date.getMonth()+3)/3), //季度 
    "S"  : date.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  }
  for(var k in o) {
      if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
  return fmt; 
};

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const poemid = event.poemid;
  const comment = event.comment;
  const time = currTime();

  try {
    var new_id = await db.collection("Comments")
                          .add({
                            data: {
                              poem_id: poemid,
                              user_id: openid,
                              comment: comment,
                              time: time, // 对应格式的时间字符串
                              stars: 0 // 点赞数
                            }
                          });
    new_id = new_id._id;
  } catch(e) {
    return {
      code: -1,
      err: e
    };
  }

  return {
    code: 0,
    err: null,
    data: {
      id: new_id,
      time: time
    }
  };
}