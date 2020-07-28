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
              <video
                ref="videoPlayer"
                id="videoElement"
                muted
                autoplay
                tabindex="-1"
                width="100%"
                @timeupdate="updateTime"
                v-if="obInfo.isLive"
              ></video>
              <v-card-text v-else>
                <div class="no-live">
                  <div>
                    <h2>{{noLiveTips}}</h2>
                  </div>
                </div>
              </v-card-text>
              <v-card-actions>
                <v-btn icon>
                  <v-icon>{{'mdi-pause'}}</v-icon>
                </v-btn>
                <span>{{currentTime}}</span>
                <!--Audio-->
                <v-slider
                  class="l-volume"
                  height="24"
                  :prepend-icon="volume == 0 ? 'mdi-volume-off' :'mdi-volume-high'"
                  style="width:120px"
                  v-model="volume"
                  thumb-label
                ></v-slider>
                <v-spacer></v-spacer>
                <!--画质菜单-->
                <v-menu top>
                  <template v-slot:activator="{ on: menu, attrs }">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                          text
                          v-bind="attrs"
                          v-on="{ ...tooltip, ...menu }"
                        >{{qnlist[live_quality]}}</v-btn>
                      </template>
                      <span>直播画质选择</span>
                    </v-tooltip>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(item, index) in obInfo.live_qualitys"
                      :key="index"
                      @click="getLiveUri(oid, true, item.qn)"
                    >
                      <v-list-item-title>{{ item.desc }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
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
  name: "OB",
  data() {
    return {
      oid: this.$route.params.id,
      live_url: "",
      volume: 100,
      live_quality: 10000,
      currentTime: 0,
      qnlist: {
        "10000": "原画",
        "400": "蓝光",
        "250": "超清",
        "150": "高清",
        "80": "流畅",
      },
      obInfo: {
        title: "房间标题",
        isLive: false,
        parent_area_name: "主分区",
        area_name: "细分分区",
        room_up: "主播",
        room_id: "123456",
        live_time: "2020-02-17 20:20:30",
        live_cover_uri: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        live_cover: "",
        live_qualitys: {},
      },
      noLiveTips: "主播不在哦...",
      obReqData: "",
      obNum: 0,
      livePlayInit: 0,
      // $player: null,
    };
  },

  watch: {
    volume() {
      let videoElement = document.getElementById("videoElement");
      videoElement.volume = this.volume / 100;
    },
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
  mounted() {
    this.getLiveUri(this.oid, true);
    if (!this.obInfo.isLive) {
      this.setNoLiveTips();
    }
  },
  methods: {
    getLiveUri(oid, isPlayLive = false, qn = "10000") {
      let r;
      hrequest(
        `https://api.live.bilibili.com/room/v1/Room/playUrl?cid=${oid}&quality=4&platform=web&otype=json&qn=${qn}`,
        (error, response, body) => {
          r = JSON.parse(body);
          console.log(r);
          if (r.code == 0) {
            this.live_url = r.data.durl[0].url;
            this.live_quality = r.data.current_qn;
            this.obInfo.live_qualitys = r.data.quality_description;
            if (isPlayLive) {
              //开始播放直播
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
          // console.log(d);
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
    setNoLiveTips() {
      hrequest(
        `https://api.live.bilibili.com/room/v1/room/get_recommend_by_room?room_id=${this.oid}`,
        (e, r, b) => {
          b = JSON.parse(b);
          this.noLiveTips = b.data.tips;
        }
      );
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
              hasAudio: true,
              url: uri,
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
            videoElement.muted = false;
          }
        }
      }, 50);
    },
    updateTime(e) {
      e
      //自带播放时间，弃用
      // this.currentTime = formatSeconds(Math.ceil(e.target.currentTime));
      //根据B站返回的开播时间来计算时间差
      let thisTime = new Date().getTime();
      let liveTime = new Date(this.obInfo.live_time).getTime();
      this.currentTime = formatSeconds(Math.ceil((thisTime - liveTime) / 1000));
    },
  },
};
function formatSeconds(value) {
  let result = parseInt(value);
  let h =
    Math.floor(result / 3600) < 10
      ? "0" + Math.floor(result / 3600)
      : Math.floor(result / 3600);
  let m =
    Math.floor((result / 60) % 60) < 10
      ? "0" + Math.floor((result / 60) % 60)
      : Math.floor((result / 60) % 60);
  let s =
    Math.floor(result % 60) < 10
      ? "0" + Math.floor(result % 60)
      : Math.floor(result % 60);
  
  return `${h}:${m}:${s}`;
}
</script>

<style>
.app-ob .v-responsive__content {
  background-color: rgba(0, 0, 0, 0.3);
}
.app-ob .no-live {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background-color: rgb(19, 19, 19);
}
.app-ob .no-live div {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: rgba(255, 255, 255, 0.685);
}
.l-volume {
  margin-left: 12px;
}
.l-volume .v-input__control {
  max-width: 120px;
}
.l-volume .v-input__control .v-input__slot {
  margin-bottom: 4px;
  margin-top: 4px;
  margin-left: -9px;
}
.l-volume .v-input__control .v-messages {
  display: none;
}
</style>