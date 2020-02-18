<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="white--text align-end"
      height="152px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-subtitle style="color:#FFFFFF55;">观测ID: {{obid}}</v-card-subtitle>
    </v-img>
    <div class="obc-content">
      <v-avatar color="indigo">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
      <div style="margin:0 8px;width:100%">
          <h4>直播间标题</h4>
          <span>主播</span>
      </div>
      <v-btn depressed small color="primary" :to="`/ob/${obid}`">详情 <v-icon small>mdi-arrow-right</v-icon></v-btn>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    obid: Number
  }
};
</script>