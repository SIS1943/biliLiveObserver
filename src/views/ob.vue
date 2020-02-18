<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-row style="margin: -12px;">
          <v-col>
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
                height="162px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
                <v-card-title>{{obInfo.title}}</v-card-title>
              </v-img>
              <v-card-text>
                <span>
                    状态：{{obInfo.isLive ? 'Live' : 'No!'}}
                    分区：{{obInfo.parent_area_name+'>'+obInfo.area_name}}
                    主播：{{obInfo.room_up}}
                    房间号：{{obInfo.room_id}}
                </span>
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
import axios from  'axios-jsonp-pro'

export default {
  name: "BLO_V-MAIN",
  data() {
    return {
      oid: this.$route.params.id,
      obInfo: {
        title: "房间标题",
        isLive: false,
        parent_area_name: '主分区',
        area_name: '细分分区',
        room_up: '主播',
        room_id: '123456',
        live_url: 'https://aaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        live_time: '2020-02-17 20:20:30'
      },
      obNum: 0
    };
  },
  mounted() {
    this.obNum++
    axios.jsonp('https://api.live.bilibili.com/room/v1/Room/get_info?room_id='+this.oid)
        .then((r)=>{
            let oi = this.obInfo
            let d = r.data
            oi.title = d.title
            oi.isLive = d.live_status == 1 ? true : false
            oi.parent_area_name = d.parent_area_name
            oi.area_name = d.area_name
            oi.room_id = d.room_id
            oi.live_time = d.live_time
        })
    let time = this.$store.state.OB_Time * 1000;
    const observer = setInterval(() => {
      this.obNum++;
    }, time);
    this.$once("hook:beforeDestroy", () => {
      clearInterval(observer);
    });
  },
  methods:{}
};

</script>