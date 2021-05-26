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
const _ = db.command;

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const poemid = event.poemid;

  // 根据ID获取诗词内容
  var poem = await db.collection("Poetry")
                     .where({
                       "_id": _.eq(poemid)
                     })
                     .get();
  poem = poem.data;
  if (poem.length == 0) {
    return {
      code: -2,
      err: "No such poem!",
      data: null
    };
  }
  poem = poem[0];
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

  var formatted_data;

  var author = "佚名";
  if (poem["additional_data"].hasOwnProperty("author")) 
  author = poem["additional_data"]["author"];
  else if (poem.hasOwnProperty("flag")) 
  author = "「" + poem["flag"] + "·" + 
                  poem["additional_data"]["chapter"] + "·" + 
                  poem["additional_data"]["section"] + "」";
  formatted_data={
    id: poemid,
    title: poem["title"],
    author: author,
    star: star_list.includes(poemid),
    starNum: poem["stars"],
    content: poem["content"]
  };
  return {
    code:0,
    err:null,
    data:formatted_data
  };
}