<template>
  <v-app>
    <v-card class="app-window">
      <v-app-bar
        absolute
        color="teal"
        dark
        elevate-on-scroll
        scroll-target="#scrolling-techniques-7"
        class="app-nav"
      >
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-app-bar-nav-icon v-show="$route.path != '/'" to="/" v-on="on">
              <v-icon>mdi-home</v-icon>
            </v-app-bar-nav-icon>
          </template>
          <span>回到首页</span>
        </v-tooltip>

        <v-toolbar-title>BiliLiveObserver</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" to="/docs">
              <v-icon>mdi-file-document-outline</v-icon>
            </v-btn>
          </template>
          <span>使用说明</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" disabled>
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>
          <span>地区与语言</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="minisizeApp()">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <span>最小化</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" @click="exitApp()">
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>关闭</span>
        </v-tooltip>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense>
          <v-list-item-group active-class="deep-purple--text text--accent-4">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Home</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-account</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Account</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
      <v-sheet
        id="scrolling-techniques-7"
        class="app-view"
        max-height="100%"
        style="overflow-y: auto;"
      >
        <router-view></router-view>
      </v-sheet>
      <v-snackbar v-model="snackbar" top>{{ snacktext }}</v-snackbar>
    </v-card>
  </v-app>
</template>

<script>
const req = require("request");
const { BrowserWindow, ipcRenderer: ipc } = require("electron");
export default {
  name: "App",
  data() {
    return {
      drawer: false,
      snackbar: false,
      snacktext: "Information."
    };
  },
  components: {},
  methods: {
    exitApp() {
      ipc.send("close");
    },
    minisizeApp() {
      ipc.send("min");
    },
    onWebsite(url, isNewWindow = false) {
      isNewWindow;
      let win = new BrowserWindow({
        width: 1280,
        height: 720,
        titleBarStyle: "hidden"
      });
      win.loadURL(url);
    }
  },
  created() {
    req("https://api.live.bilibili.com/sign/GetSignInfo", (e, r, b) => {
      b = JSON.parse(b);
      console.log(b);
      if (b.code != 0) {
        this.snacktext = "账号未登陆，可能会影响到部分功能的使用。";
        this.snackbar = true;
      }
    });
  }
};
</script>

<style>
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 8px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  background: #535353;
}
::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  background: #ededed;
}
* {
  margin: 0;
  padding: 0;
}
html {
  overflow-y: hidden !important;
}
.app-window {
  height: 100vh;
  width: 100%;
  background-color: white;
  color: rgb(20, 20, 20);
  overflow-y: auto;
  overflow-y: hidden !important;
}
.app-nav {
  user-select: none;
  -webkit-app-region: drag;
}
.app-nav a,
.app-nav button {
  -webkit-app-region: no-drag;
}
.app-view {
  height: calc(100% - 64px);
  margin-top: 64px;
  padding: 16px;
}
</style>
