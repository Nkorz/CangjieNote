# api

- [api](#api)
  - [poemCardView](#poemcardview)
    - [param](#param)
    - [result](#result)

## poemCardView

### param

```json
{
    'size': 10, // int, 表示需要请求的数据
    'openid': "xxx" // String, 表示用户的 openid
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