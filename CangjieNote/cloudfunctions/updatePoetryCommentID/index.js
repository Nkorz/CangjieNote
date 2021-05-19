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

const getPoemIdByTitle = async (t) => {
  var res = await db.collection("Poetry")
                    .where({
                      "title": t
                    })
                    .get();
  if (res.data.length == 0) return "";
  return res.data[0]._id;
};

// 云函数入口函数
exports.main = async (event, context) => {
  var all_cmt = await db.collection('PoetryComments')
                        .limit(350)
                        .get();
  all_cmt = all_cmt.data;
  try {
    for(var i = 0; i < all_cmt.length; ++i) {
      var cmt = all_cmt[i];
      var p_id = await getPoemIdByTitle(cmt.title);
      db.collection('PoetryComments')
        .where({
          "_id": _.eq(cmt._id)
        })
        .update({
          data: {
            "poem_id": p_id
          }
        });
    }
  } catch (e) {
    return {
      code: -1,
      err: e.toString()
    };
  }

  return {
    code: 0,
    err: null
  };
}