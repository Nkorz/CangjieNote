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
const $ = _.aggregate;
const MAX_NUM = 50;

// 云函数入口函数
exports.main = async (event, context) => {
  const key = event.key;
  const size = event.size > MAX_NUM ? MAX_NUM : event.size;
  
  try {
    var res = await db.collection('Poetry')
                      .aggregate()
                      .project({
                        id: '$_id',
                        content: '$content',
                        flag: '$flag',
                        title: '$title',
                        stars: '$stars',
                        array: $.objectToArray('$additional_data')
                      })
                      .match(_.or([
                        {
                          array: _.elemMatch({
                            "v": _.eq(key)
                          })
                        },
                        {
                          flag: _.eq(key)
                        },
                        {
                          title: _.eq(key)
                        }
                      ]))
                      .limit(size)
                      .end()
  } catch(e) {
    return {
      code: -1,
      err: e.toString(),
      data: []
    }
  }

  res = res.list;
  for (let i = 0; i < res.length; ++i) {
    // TODO: 目前只支持诗经
    let arr = res[i].array;
    res[i]["addDataStr"] = res[i].flag + "·" + arr[0]["v"] + "·" + arr[1]["v"];
  }
                
  return {
    code: 0,
    err: null,
    data: res
  }
}