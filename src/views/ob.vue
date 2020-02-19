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
                已观测 {{obNum}} 次。
                <br />
                观测间隔 {{$store.state.OB_Time}} 秒
              </v-card-text>
            </v-card>
          </v-col>
          <v-col>
            <v-card>
              <v-img
                class="white--text align-end"
                :src="obInfo.live_cover"
                position="center"
                :aspect-ratio="16/9"
              >
                <v-card-title>{{obInfo.title}}</v-card-title>
              </v-img>
              <v-card-text>
                <div>状态：{{obInfo.isLive ? '直播' : '离线'}}</div>
                <div>分区：{{obInfo.parent_area_name+'>'+obInfo.area_name}}</div>
                <div>主播：{{obInfo.room_up}}</div>
                <div>房间号：{{oid}}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="8">
        <v-row style="margin: -12px;">
          <v-col cols="12">
            <v-card>
              <!--LivePlayer!-->
              <video id="videoElement" controls muted autoplay width="100%" v-if="obInfo.isLive"></video>
              <v-card-text v-else>
                <div class="no-live">
                  <div><h2>{{noLiveTips}}</h2></div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn depressed color="primary" :disabled="!obInfo.isLive">原直播间</v-btn>
                <v-btn depressed color="primary" :disabled="!obInfo.isLive">缓存直播</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
var hrequest = require("request");
import flvjs from "flv.js";
export default {
  name: "BLO_V-MAIN",
  data() {
    return {
      oid: this.$route.params.id,
      live_url: "",
      obInfo: {
        title: "房间标题",
        isLive: false,
        parent_area_name: "主分区",
        area_name: "细分分区",
        room_up: "主播",
        room_id: "123456",
        live_time: "2020-02-17 20:20:30",
        live_cover_uri: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        live_cover: ""
      },
      noLiveTips: "主播不在哦...",
      obReqData: "",
      obNum: 0,
      livePlayInit: 0
    };
  },
  created() {
    this.setLiveInfo(this.oid);
    let time = this.$store.state.OB_Time * 1000;
    const observer = setInterval(() => {
      this.setLiveInfo(this.oid);
    }, time);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(observer);
    });
  },
  updated() {
    //this.playLive(this.playLive++);
  },
  mounted() {
    this.getLiveUri(this.oid, true);
    if (!this.obInfo.isLive){
      this.setNoLiveTips()
    }
  },
  methods: {
    getLiveUri(oid, isPlayLive = false) {
      let r;
      hrequest(
        `https://api.live.bilibili.com/room/v1/Room/playUrl?cid=${oid}&quality=4&platform=web&otype=json`,
        (error, response, body) => {
          r = JSON.parse(body);
          console.log(r);
          if (r.code == 0) {
            this.live_url = r.data.durl[0].url;
            if (isPlayLive) {
              this.playLive(this.live_url);
            }
          } else {
            this.live_url = "";
          }
        }
      );
    },
    setLiveInfo(oid) {
      let cover_uri;
      let oi = this.obInfo;
      this.obNum++;
      hrequest(
        `https://api.live.bilibili.com/room/v1/Room/get_info?room_id=${oid}`,
        (error, response, body) => {
          body = JSON.parse(body);
          let d = body.data;
          oi.title = d.title;
          oi.isLive = d.live_status == 1 ? true : false;
          oi.parent_area_name = d.parent_area_name;
          oi.area_name = d.area_name;
          oi.room_id = d.room_id;
          oi.live_time = d.live_time;
          cover_uri = d.user_cover;
          hrequest(
            { url: cover_uri, method: "GET", encoding: null },
            (e, r, b) => {
              oi.live_cover =
                "data:image/png;base64," + Buffer.from(b).toString("base64"); //通过Base64转码来规避获取封面403的问题。
            }
          );
        }
      );
    },
    setNoLiveTips(){
      hrequest(`https://api.live.bilibili.com/room/v1/room/get_recommend_by_room?room_id=${this.oid}`, (e,r,b)=>{
        b = JSON.parse(b)
        this.noLiveTips = b.data.tips
      })
    },
    playLive(uri) {
      console.log(uri);
      setTimeout(() => {
        if (flvjs.isSupported()) {
          if (this.obInfo.live_url != "") {
            let videoElement = document.getElementById("videoElement");
            let flvPlayer = flvjs.createPlayer({
              type: "flv",
              isLive: true,
              hasAudio: false,
              url: uri
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
          }
        }
      }, 50);
    }
  }
};
</script>

<style>
.app-ob .v-responsive__content {
  background-color: rgba(0, 0, 0, 0.3);
}
.app-ob .no-live{
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background-color: rgb(19, 19, 19);
}
.app-ob .no-live div{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.685);
}
</style>