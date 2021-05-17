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

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const poemid = event.poemid;
  const sort_by_time = event.sort_by_time;
  const sort_by_stars = event.sort_by_stars;
  
  var res = db.collection("Comments")
              .where({
                poem_id: _.eq(poemid)
              })
              .get();           
  if (sort_by_time) {
    res.sort((a, b) => {
      return new Date(a.time) < new Date(b.time) ? 1 : -1;
    });
  } else if (sort_by_stars) {
    res.sort((a, b) => {
      return a.stars < b.stars ? 1 : -1;
    });
  }

  return {
    code: 0,
    err: null,
    data: res
  }
}