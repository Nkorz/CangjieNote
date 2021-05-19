# database

- [database](#database)
  - [Poetry](#poetry)
    - [诗经](#诗经)
  - [Comments](#comments)
  - [Users](#users)
  - [WordsSplit](#wordssplit)
  - [PoetryComments](#poetrycomments)

## Poetry

> 诗词对应的 collection

```json
{
    '_id': "唯一标识",
    'title': "题目",
    'content': ["诗词的每一句", ...],
    'flag': "标识 additional_data 属于何种类型",
    'stars': 0, // 总共点赞的人数
    'additional_data': {
        // 不同的 flag 具有不同的数据类型
    } 
}
```

### 诗经
```json
{
    'flag': "诗经",
    'additional_data': {
        'chapter': "国风",
        'section': "周南",
    },
    ...
}
```

## Comments

> 评论对应的 collection

```json
{
    '_id': "唯一标识",
    'poem_id': "评论对应诗词的id",
    'user_id': "评论对应的用户id",
    'comment': "评论内容",
    'time': "xxxx-xx-xx,xx:xx:xx", // 对应格式的时间字符串
    'stars': 0 // 点赞数
}
```

## Users

> 用户的 collection

```json
{
    '_id': "唯一标识, user 的 app id"
    'userInfo': {
        // 微信自带的 userInfo
    },
    'stars': ["Comments 对应的 _id", ...], // 点赞的清单
    'collection': ["Poetry 对应的 _id", ...], // 收藏的清单
    'comments': ["Comments 对应的 _id", ...] // 评论的清单
}
```

## WordsSplit

> 拆字的 collection

```json
{
    '_id': "唯一标识",
    'character': "对应的字",
    'radicals': [
        ["部首1", ...], // 每一个子列表都是一个可行的拆字方案
        ...
    ]
}
```

## PoetryComments

> 诗词的注释

```json
{
    '_id': "xxx", // 唯一标识
    'poem_id': "xxx", // 对应的诗词id
    'fanyi': ["xxx", ...], // 可能有一条或者多条翻译
    'shangxi': ["xxx", ...], // 可能有一条或者多条赏析
}
```