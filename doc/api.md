# api

- [api](#api)
  - [gameInit](#gameinit)
    - [param](#param)
    - [result](#result)
  - [getPoemComments](#getpoemcomments)
    - [param](#param-1)
    - [result](#result-1)
  - [comment](#comment)
    - [param](#param-2)
    - [result](#result-2)
  - [getPoemUseId](#getpoemuseid)
    - [param](#param-3)
    - [result](#result-3)
  - [starPoem](#starpoem)
    - [param](#param-4)
    - [result](#result-4)
  - [login](#login)
    - [param](#param-5)
    - [result](#result-5)
  - [poemCardView](#poemcardview)
    - [param](#param-6)
    - [result](#result-6)

## gameInit

> 目前还没有干扰项

### param

```json
{
    sentence: "xxx", // 需要查询的字符串
}
```

### result

```json
{
    code: 0,
    err: null,
    data: [
        {
            ans: 0, // 答案在sentence中的坐标
            char: "一" // 部首
        },
        ...
    ] // 按照指定排序方案排序好的评论列表
}
```

## getPoemComments

### param

```json
{
    'poem_id': "xxx", // 想要查询评论的诗词
    'sort_by_time': true, // 布尔值，标识返回的是否按时间排序
    'sort_by_stars': false, // 布尔值，标识返回的是否按点赞数排序
    /*****
     * 这里注意，如果 sort_by_time 和 sort_by_stars 同时为 true 的话
     * 则优先按照时间排序
     *****/
}
```

### result

```json
{
    code: 0,
    err: null,
    data: [
        {
            ... // comment 的对象，详见 database.md
        },
        ...
    ] // 按照指定排序方案排序好的评论列表
}
```

## comment

### param

```json
{
    'poemid': "xxx",  // 想要评论的诗词 id
    'comment': "xxx", // 评论内容
}
```

### result

```json
{
    code: 0, // 请求成功为0，反之则为负数
    err: null, // 若请求有误则返回错误的字符串，反之则为null
    data: {
      id: new_id, // 插入的评论的 _id
      time: time // 插入评论的时间
    }
}
```

## getPoemUseId

### param

```json
{
    'poemid': "xxx" // 想要获取信息的诗词 id
}
```

### result

```json
{
    code: 0, // 请求成功为0，反之则为负数
    err: null, // 若请求有误则返回错误的字符串，反之则为null
    data: {
        ...
    } // poem 的相关信息
}
```

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