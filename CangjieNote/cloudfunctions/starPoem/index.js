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

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;
  const poemid = event.poemid;
  
  var poem = await db.collection("Poetry")
                     .where({
                       _id: poemid
                     })
                     .get();
  poem = poem.data;
  if (poem.length == 0) {
    return {
      code: -2,
      err: "No such poem!",
      data: -1
    };
  }
  var res = await db.collection("Users")
                    .where({
                      _id: openid
                    })
                    .get();
  var poem_star_count = poem["starts"];
  const old_poem_star_count = poem_star_count;
  res = res.data;
  if (res.length == 0) {
    return {
      code: -1,
      err: "No such user!",
      data: old_poem_star_count
    };
  }
  const star_list = res[0]["collection"];
  var index = star_list.indexOf(poemid);
  
  if (index == -1) {
    poem_star_count++;
    star_list.push(poemid);
  } else {
    poem_star_count--;
    star_list.splice(index, 1);
  }
  
  db.collection("Users")
    .where({
      _id: openid
    })
    .update({
      collection: star_list,
    })
    .then( (res) => {
      db.collection("Poetry")
      .where({
        _id: poemid
      })
      .update({
        stars: poem_star_count,
      })
      .then((res) => {
        return {
          code: 0,
          err: null,
          data: poem_star_count
        };
      })
      .catch((err) => {
        return {
          code: -4,
          err: err,
          data: old_poem_star_count
        };
      });
    })
    .catch((err) => {
      return {
        code: -3,
        err: err,
        data: old_poem_star_count
      };
    });
}