# BiBliLiveObserver

> 这是一个预留的坑，目前还没开发完，暂时搁置一会儿。

本打算整成在线版本的，后来发现死活过不了Referer这一关，就给折腾成Electron了。

这个应用可以观测指定房间号/用户的开播情况，当然也可以获取自己所关注的主播的开播列表，然后~~翻牌子~~进去康康或者下载直播流。\
↑ \
这是本来的设想，终究还是自己技术力太菜了....

- ### 所以，有无大佬能够帮忙解决一下Electron的header问题......

## 技术栈

- 使用了Vue.js，并使用Vue-CLI手脚架进行搭建
- 使用了Vue官方的Vuex、Vue-Router来进行集成式状态管理和前端路由
- 在HTTP请求上使用了Axios
- UI使用的是Vuetify，一个Material Design风格的ui框架。
- 使用了 vue-cli-plugin-electron-builder 插件，可以直接在Vue-cli手脚架中直接编译项目。
    - 仅在Windows 10 1909下进行过编译
    - Win平台下请确保 `C:\Users\<Username>\AppData\Local\electron-builder\Cache`目录下有 `nsis\nsis-3.0.3.2` 、 `nsis\nsis-resources-3.4.1` 、 `WinCodeSign\winCodeSign-2.5.0` 。（可能天朝国内网络环境无法下载，自行寻找8）