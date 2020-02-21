<template>
  <v-row class="app-setting">
    <v-col cols="3">
      <v-list>
        <v-list-item-group v-model="item" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i">
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
        <div class="app-setting-box">
            2333
        </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    item: 1,
    items: [
      { text: "本体", icon: "mdi-monitor" },
      { text: "下载", icon: "mdi-download" },
      { text: "观测", icon: "mdi-looks" },
      { text: "关于", icon: "mdi-information" },
    ]
  })
};
</script>

<style>
.app-setting {
  position: absolute;
  top: 44px;
  left: 0;
  bottom: 0;
  right: 0;
}
.app-setting .app-setting-box{
    padding: 16px 0;
}
</style>