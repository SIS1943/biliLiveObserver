<template>
  <v-row class="app-setting">
    <v-col cols="3">
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(item, i) in settings" :key="i" :to="item.to" replace>
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-col>
    <v-col>
      <router-view class="app-setting-box"></router-view>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    item: 1,
    settings: [
      { text: "本体", icon: "mdi-monitor", to: "/setting/app" },
      { text: "下载", icon: "mdi-download", to: "/setting/download" },
      { text: "观测", icon: "mdi-looks", to: "/setting/observer" },
      { text: "关于", icon: "mdi-information", to: "/setting/about" },
    ],
  }),
};
</script>

<style>
.app-setting {
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url("/lib/defBG.jpg");
  background-position: center;
  background-size: cover;
}
.app-setting .v-list{
  height: 100vh;
}
.app-setting .app-setting-box {
  padding: 16px 0;
}
</style>