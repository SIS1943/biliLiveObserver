# 使用说明

### 观测模式：

单推模式：

- 即只关注某一个主播

DD模式：

- 即同时关注许多主播（事DD）

### 我关注的直播：

- `GET`

```
https://blo.app.lonay.me/list/
```

### 观察指定的房间：

- `GET`

```
https://blo.app.lonay.me/ob/[房间号]/
```
- 额外的请求参数：

| 字段     | 类型     | 参考值 | 描述
| -------- | ------- | ------ | ----
| watch    | boolean | true   | 是否直接观看这个直播（需要打包flv.js）
| danmaku  | boolean | true   | 开启弹幕列表