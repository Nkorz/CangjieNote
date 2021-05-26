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
})

const db = cloud.database();
const MAX_NUM = 50;
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const size = event.size > MAX_NUM ? MAX_NUM : event.size;
  const openid = wxContext.OPENID;
  // 随机获取指定大小的数据
  var rand_poems = await db.collection("Poetry")
                           .aggregate()
                           .sample({
                             size: size
                           })
                           .limit(size)
                           .end();
  rand_poems = rand_poems.list;
  // 标识用户是否收藏
  var res = await db.collection("Users")
                    .where({
                      "_id": _.eq(openid)
                    })
                    .get();
  res = res.data;
  if (res.length == 0) {
    return {
      code: -1,
      err: "No such user!",
      data: null
    };
  }
  const star_list = res[0]["collection"];
  
  var formatted_data = [];
  rand_poems.forEach((poem) => {
    var author = "佚名";
    if (poem["additional_data"].hasOwnProperty("author")) 
      author = poem["additional_data"]["author"];
    else if (poem.hasOwnProperty("flag")) 
      author = "「" + poem["flag"] + "」";
    formatted_data.push({
      id: poem["_id"],
      title: poem["title"],
      author: author,
      star: star_list.includes(poem["_id"]),
      starNum: poem["stars"],
      content: poem["content"],
      // TODO: 只支持诗经
      addDataStr: "「" + poem["flag"] + "·" 
                       + poem["additional_data"]["chapter"] + "·" 
                       + poem["additional_data"]["section"] +  "」"
    });
  });

  return {
    code: 0,
    err: null,
    data: formatted_data
  };
}