<template>
  <div class="app-main" :style="{backgroundImage: imgUrl}">
    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-card :elevation="hover ? 16 : 2">
        <v-card-title>
          <h2>开始</h2>
        </v-card-title>
        <v-card-subtitle>
          <span>键入房间号以开始观测</span>
        </v-card-subtitle>
        <v-card-text>
          <v-text-field label="房间号" outlined :rules="[isNum]" v-model="room_id"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            depressed
            text
            color="primary"
            style="font-weight:bold;"
            @click="runOb(`/ob/${room_id}`)"
          >开始观测</v-btn>
        </v-card-actions>
      </v-card>
    </v-hover>

    <div style="height:200px"></div>
  </div>
</template>

<script>
const path = require("path");
export default {
  name: "BLO_V-MAIN",
  data() {
    return {
      imgUrl: path.join(process.env.BASE_URL, "defBG.jpg"),
      room_id: null
    };
  },
  mounted() {},
  methods: {
    isNum(value) {
      const age = /^[0-9]*$/;
      if (!age.test(value)) {
        return "房间号只能为数字";
      } else {
        return true;
      }
    },
    runOb(path) {
      console.log(path);
      const age = /^[0-9]*$/;
      if (!age.test(this.room_id)) {
        this.room_id = null;
      } else {
        this.$router.push(path)
      }
    }
  }
};
</script>

<style>
.app-main {
  position: absolute;
  top: 64px;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  background-image: url("/lib/defBG.jpg");
  background-position: top;
  background-size: cover;
}
.app-main .maincard {
  padding: 6px 18px;
}
.app-main .set-obmothel {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.app-main .reset {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.app-main .reset > div {
  width: 100%;
  display: flex;
  align-items: center;
}
</style>