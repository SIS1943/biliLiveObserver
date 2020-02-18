# BiBliLiveObserver

这是一个在线的应用，实际的运行极其依赖本地的bilibili的Cookie等相关数据，请在加载完全后进行操作。

这个应用可以观测指定房间号/用户的开播情况，并可以直接下载这个直播流。（造福录播组）
当然也可以获取自己所关注的主播的开播列表，然后~~翻牌子~~进去康康或者下载直播流。

## 食用方法

### 我关注的直播：
- `GET：`
```
https://blo.app.lonay.me/list/
```
### 观察指定的房间：
- `GET:`
```
https://blo.app.lonay.me/ob/[房间号/用户UUID]/
```
- 额外的请求参数：

| 字段     | 类型     | 参考值 | 描述
| -------- | ------- | ------ | ----
| watch    | boolean | true   | 是否直接观看这个直播（需要打包flv.js）
| danmaku  | boolean | true   | 开启弹幕列表

## 技术栈

- 使用了Vue.js，并使用Vue-CLI手脚架进行搭建
- 使用了Vue官方的Vuex、Vue-Router来进行集成式状态管理和前端路由
- 在HTTP请求上使用了Axios
- [ ] 可以自行将本项目移植至vue-electron/Electron，请自行解决登陆问题
    - 敬告：本项目是基于B站官方公开的API进行请求，并且依赖B站官方Cookie。请跳转至官方的登陆页面来解决登陆问题; 请不要采集、使用任何B站官方的用户数据
- 所有数据来自于B站官方正在使用的API。