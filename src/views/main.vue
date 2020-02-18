<template>
  <div class="app-main">
    <h1>首页</h1>
    <v-row>
      <v-col cols="4">
        <v-card>
          <div class="maincard set-obmothel">
            <span>观测模式</span>
            <v-switch v-model="$store.state.ddMethod" :label="`${this.$store.state.ddMethod ? 'DD' : '单推'}模式`"></v-switch>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <oblist />
  </div>
</template>

<script>
export default {
  name: "BLO_V-MAIN",
  data() {
    return {

    };
  },
  modules:{
      isDD(data){
          if(data){
              //
          }else{
              //
          }
      },
  },
  components: {
    oblist: () => import("@/components/oblist")
  }
};
</script>

<style>
.app-main {
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
.app-main .reset>div{
    width: 100%;
    display: flex;
    align-items: center;
}
</style>