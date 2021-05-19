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
const _ = db.command

// 云函数入口函数
exports.main = async (event, context) => {
  
  // 如果用户从未登陆，则创建新 entry
  var res = await db.collection("Users")
                    .where({
                      _id: _.eq(event.OPENID)
                    })
                    .get();
  if (!res) {
    console.log("add");
    db.collection("Users").add({
      data: {
        _id: event.OPENID,
        userInfo: event.userInfo,
        stars: [], // 点赞的清单
        collection: [], // 收藏的清单
        comments: [] // 评论的清单
      }
    });
  }else{
    console.log("update");
    db.collection("Users").doc(event.OPENID).update({
      data: {
        userInfo: event.userInfo,
        stars: [], // 点赞的清单
        collection: [], // 收藏的清单
        comments: [] // 评论的清单
      },
      success:res=>{
        console.log("更新成功");
      },
      faile:res=>{
        console.log("更新失败");
      }
    })
  }
  return {
    res
  }
}