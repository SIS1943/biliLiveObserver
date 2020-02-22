# BiBliLiveObserver

> 这是一个预留的坑，目前还没开发完。

这个应用可以观测指定房间号/用户的开播情况，当然也可以获取自己所关注的主播的开播列表，然后~~翻牌子~~进去康康或者下载直播流.

## 技术栈

- 使用了Vue.js，并使用Vue-CLI手脚架进行搭建
- 使用了Vue官方的Vuex、Vue-Router来进行集成式状态管理和前端路由
- 在HTTP请求上，请使用NodeJs的模块request。
- UI使用的是Vuetify，一个Material Design风格的ui框架。
- 使用了 vue-cli-plugin-electron-builder 插件，可以在Vue-cli手脚架中直接编译项目。(Vue-CLI > 3.0)
    - Win平台下请确保 `C:\Users\<Username>\AppData\Local\electron-builder\Cache`目录下有 `nsis\nsis-3.0.3.2` 、 `nsis\nsis-resources-3.4.1` 、 `WinCodeSign\winCodeSign-2.5.0` 。（可能天朝国内网络环境无法下载，自行寻找8）
- 直播流的播放使用了 bilibili 开源的 `flv.js`

## 挖坑与填坑

- 直播流的缓存
- 对于不存在的直播的处理
- 多画质的切换
- 如果缓存失败时，尝试选择最大化视频并更改大小至原视频？> 用以OBS等软件的直接录制？
- 贴合B站特色的主题颜色
- 画面还是巨简陋了，需要好好润色一番。
- 查看原房间是新开一个浏览器窗口？还是打开自带浏览器？
- 多国语言
- 关注列表的显示？
- 对于需要Cookie的请求，如何获取到Cookie？


## License

MPL-2.0 License.
