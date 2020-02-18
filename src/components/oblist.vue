<template>
  <div class="app-main-oblist">
    <v-divider></v-divider>
    <h3>观测池</h3>
    <v-row>
      <v-col v-for="(m, i) in ($store.state.ddMethod ? $store.state.OB_DD_list : $store.state.OB_DT)" :key="'obcard-' + i" cols="3" class="app-obcard">
        <obcard :obid="m" />
      </v-col>
    </v-row>
    <v-btn class="mx-2" fab dark bottom right fixed style="position: absolute;" v-show="$store.state.ddMethod">
      <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  components: {
    obcard: () => import("./obcard")
  }
};
</script>

<style>
.app-obcard .obc-content{
    padding: 12px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
}
.app-obcard .v-responsive{
    
}
.app-obcard .v-responsive__content {
  background-image: linear-gradient(0deg, black, transparent);
}
.app-obcard .v-responsive__content>div{
    padding: 6px 18px;
}
</style>