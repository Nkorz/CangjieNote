# api

- [api](#api)
  - [starPoem](#starpoem)
    - [param](#param)
    - [result](#result)
  - [login](#login)
    - [param](#param-1)
    - [result](#result-1)
  - [poemCardView](#poemcardview)
    - [param](#param-2)
    - [result](#result-2)

## starPoem

### param

```json
{
    'poemid': "xxx" // 想要点赞的诗词 id
}
```

### result

```json
{
    code: 0, // 请求成功为0，反之则为负数
    err: null, // 若请求有误则返回错误的字符串，反之则为null
    data: 10 // 整形，点赞后的点赞数，若poemid有误，则返回-1
}
```

## login

### param

```json
{
    'cloudID': wx.cloud.CloudID(res.cloudID), // res 为 wx.getUserInfo 的返回值
}
```

### result

```json
{
    userInfo: {
        ... // wx 的用户信息
    },
    openid: "xxx", // openid
    appid: "xxx", // appis
    unionid: "xxx", // unionid
}
```

## poemCardView

### param

```json
{
    'size': 10, // int, 表示需要请求的数据
}
```

### result

```json
{
    code: 0, // 请求成功为0，反之则为负数
    err: null // 若请求有误则返回错误的字符串，反之则为null
    data: [
        {
            id: "xxx", // 诗词的唯一标识
            title: "xxx", // 诗词的标题
            author: "xxx", // 诗词的作者，若没有则为出处
            star: true, // 请求的用户是否收藏
            starNum: 0, // 诗词被点赞的次数
            content: ["xxx", ...] // 诗词的每句
        }
    ] // 一个有 size 大小的数组
}
```