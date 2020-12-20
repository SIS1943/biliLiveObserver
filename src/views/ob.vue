<template>
  <div class="app-ob">
    <v-row>
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
                </v-btn >
                 <v-btn icon @click="playLive(live_url)">
                  <v-icon>{{'mdi-refresh'}}</v-icon>
                </v-btn>
                <span class="ml-4">{{currentTime}}</span>
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
      <v-col cols="4">
        <v-row style="margin: -12px;">
          <!-- <v-col cols="12">
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
          </v-col> -->
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
                <div><span>主播：</span> <v-chip class="pa-1 text-subtitle-1" small label outlined color="pink">UP {{'40'}}</v-chip> <span>{{obInfo.room_up}}</span></div>
                <div>房间号：{{oid}}</div>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import flvjs from "flv.js";
import biliapi from '../plugins/biliapi'
export default {
  name: "OB",
  data() {
    return {
      //房间ID
      oid: this.$route.params.id,
      //直播地址
      live_url: "",
      //直播状态
      isLive: false,
      //音量
      volume: 100,
      //直播间清晰度
      live_quality: 10000,
      qnlist: {
        "10000": "原画",
        "400": "蓝光",
        "250": "超清",
        "150": "高清",
        "80": "流畅",
      },
      //直播线路
      liveUriId: 0,
      //开播时间？
      currentTime: 0,
      //直播间信息
      obInfo: {
        title: "房间标题",
        parent_area_name: "主分区",
        area_name: "细分分区",
        room_up: "主播",
        room_up_id: 0,
        room_id: "123456",
        live_time: "2020-02-17 20:20:30",
        live_cover_uri: "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
        live_cover_base64: "",
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
      //同步音量信息给video
      let videoElement = document.getElementById("videoElement");
      videoElement.volume = this.volume / 100;
    },
    isLive(){
      if(this.isLive){
          this.playLive(this.live_url); //开始播放
      }
    }
  },

  created() {
    let time = this.$store.state.OB_Time * 1000;
    let obi = this.obInfo;
    const observer = setInterval(() => {
      //获取开播状态
      biliapi.liver.getLiver(this.oid).then(iLiver => {
        console.log(iLiver)
        obi.title = iLiver.info.title;
        this.isLive = iLiver.info.live_status;
        obi.parent_area_name = iLiver.info.parent_area_name;
        obi.area_name = iLiver.info.area_name;
        obi.live_time = iLiver.info.live_time;
        obi.room_id = iLiver.info.room_id;
        obi.live_cover_uri = iLiver.info.live_cover_uri;
        obi.live_cover_base64 = iLiver.info.live_cover_base64;
        obi.room_up_id = iLiver.info.room_up;
      })
    }, time);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(observer);
    });
  },
  mounted() {
    biliapi.liver.getLiveUrl(this.oid, this.live_quality).then(res => {
      console.log(res)
    })
  },
  methods: {
    //开始直播
    xPLay(){
      this.live_url = biliapi.liver.getLiveUrl(this.oid, this.live_quality).durl[this.liveUriId].url;
      this.playLive();
    },
    //播放直播
    playLive() {
      setTimeout(() => {
        if (flvjs.isSupported()) {
          if (this.obInfo.live_url != "") {
            let videoElement = document.getElementById("videoElement");
            let flvPlayer = flvjs.createPlayer({
              type: "flv",
              isLive: true,
              hasAudio: true,
              url: this.obInfo.live_url,
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
            flvPlayer.play();
            videoElement.muted = false;
          }
        }
      }, 50);
    },
    updateTime() {
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