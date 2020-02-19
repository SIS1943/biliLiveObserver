<template>
  <div class="app-ob">
    <v-row>
      <v-col cols="4">
        <v-row style="margin: -12px;">
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <h4>OB>观测者</h4>
              </v-card-title>
              <v-card-text>
                已观测{{obNum}}次。
                <br />
                观测间隔{{$store.state.OB_Time}}秒
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-img
                class="white--text align-end"
                :src="'https://cdn.vuetifyjs.com/images/cards/docks.jpg'"
                position="center"
                :aspect-ratio="16/9"
              >
                <v-card-title>{{obInfo.title}}</v-card-title>
              </v-img>
              <v-card-text>
                <div>状态：{{obInfo.isLive ? '直播' : '离线'}}</div>
                <div>分区：{{obInfo.parent_area_name+'>'+obInfo.area_name}}</div>
                <div>主播：{{obInfo.room_up}}</div>
                <div>房间号：{{obInfo.room_id}}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8">
        <v-row style="margin: -12px;">
          <v-col cols="12">
            <v-card>
              <v-card-title>
                <span>生放送</span>
              </v-card-title>
              <v-card-text>
                <video src></video>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-card-title>
                <span>操作</span>
              </v-card-title>
              <v-card-text>串流：{{obInfo.live_url}}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios-jsonp-pro";
var hrequest = require('request');

export default {
  name: "BLO_V-MAIN",
  data() {
    return {
      oid: this.$route.params.id,
      obInfo: {
        title: "房间标题",
        isLive: false,
        parent_area_name: "主分区",
        area_name: "细分分区",
        room_up: "主播",
        room_id: "123456",
        live_url: "https://aaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        live_time: "2020-02-17 20:20:30",
        userImg: "https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      },
      obReqData: "",
      obNum: 0
    };
  },
  mounted() {
    this.obNum++;

    // axios
    //   .get(
    //     "https://api.live.bilibili.com/room/v1/Room/get_info?room_id=" +
    //       this.oid
    //   )
    //   .then(r => {
    //     let oi = this.obInfo;
    //     let d = r.data.data;
    //     oi.title = d.title;
    //     oi.isLive = d.live_status == 1 ? true : false;
    //     oi.parent_area_name = d.parent_area_name;
    //     oi.area_name = d.area_name;
    //     oi.room_id = d.room_id;
    //     oi.live_time = d.live_time;
    //     oi.userImg = d.user_cover;
    //     oi.live_url = this.getLiveUri(this.obInfo.room_id);
    //   });
    //let self = this;
    hrequest('https://api.live.bilibili.com/room/v1/Room/playUrl?cid=5441&quality=4&platform=web&otype=json', (error, response, body) => {
      console.log('======>')
      console.log(JSON.parse(body));
    })

    let time = this.$store.state.OB_Time * 1000;
    const observer = setInterval(() => {
      this.obNum++;
    }, time);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(observer);
    });
  },
  methods: {
    getLiveUri(oid) {
      axios
        .get("/api/bili/room/getPlayUrl", {
          params: {
            cid: oid,
            qn: 0,
            platform: "web"
          }
        })
        .then(r => {
          return r.data.data.durl[0].url;
        })
        .catch(e => {
          return "Error:" + e;
        });
    }
  },
  getLiveCoverImg(oid) {
    oid;
  }
};
</script>

<style>
.app-ob .v-responsive__content {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>