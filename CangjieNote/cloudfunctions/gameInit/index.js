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

const randIndex = (length) => {
  return Math.floor(Math.random() * length);
};


// 云函数入口函数
exports.main = async (event, context) => {
  const sentence = event.sentence;
  var s = sentence.split('');
  
  // 获取所有字的信息
  var res = await db.collection("WordsSplit")
                    .where({
                      character: _.in(s)
                    })
                    .get();
  res = res.data;
  if (res.length == 0) {
    return {
      code: -1,
      err: "No enough characters!",
      data: []
    };
  }
  
  var characters = [];
  for (var i = 0; i < s.length; ++i) {
    var char_idx = 0;
    for (; char_idx < res.length; ++char_idx) {
      if (res[char_idx].character == s[i]) break;
    } 
    if (char_idx == res.length) {
      s[i] = -1;
      continue;
    }
    var r = res[char_idx];
    const radical_index = randIndex(r.radicals.length);
    r.radicals[radical_index].forEach((a) => {
      characters.push({
        ans: i,
        char: a,
        count: r.radicals[radical_index].length
      });
    });
  }
  // res.forEach((r) => {
  //   const ans_index = s.indexOf(r.character);
  //   const radical_index = randIndex(r.radicals.length);
  //   r.radicals[radical_index].forEach((a) => {
  //     characters.push({
  //       ans: ans_index,
  //       char: a
  //     });
  //   });
  //   // 防止被重复录入
  //   s[ans_index] = -1;
  // });

  return {
    code: 0,
    err: null,
    data: characters,
    shuffle_str: s 
  };
}