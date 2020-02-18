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
        <v-app-bar-nav-icon v-show="$route.path != '/'" to="/"><v-icon>mdi-home</v-icon></v-app-bar-nav-icon>

        <v-toolbar-title>BiliLiveObserver - Online</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on" to="/docs">
              <v-icon>mdi-file-document-outline</v-icon>
            </v-btn>
          </template>
          <span>Document.</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-translate</v-icon>
            </v-btn>
          </template>
          <span>Set app language.</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-code-tags</v-icon>
            </v-btn>
          </template>
          <span>View code in Github.</span>
        </v-tooltip>
        <v-tooltip left>
          <template v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>Exit app.</span>
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
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      drawer: false
    };
  },
  components: {},
  created(){
    // setInterval(() => {
    //   this.$store.dispatch('setTimer', 1);
    // }, 10);
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
#app .v-application--wrap {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(95, 95, 95);
}
.app-window {
  height: 70%;
  width: 1080px;
  background-color: white;
  color: rgb(20, 20, 20);
  overflow-y: auto;
  overflow-y: hidden !important;
}
.app-nav{
  user-select:none;
}
.app-view {
  height: calc(100% - 64px);;
  margin-top: 64px;
  padding: 16px;
}
</style>
