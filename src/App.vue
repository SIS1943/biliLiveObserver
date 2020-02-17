<template>
  <div id="app">
    <div class="app-info">
      
    </div>
    <div class="app-window">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(95, 95, 95);
}
.app-window{
  height: 50%;
  width: 50%;
  background-color: white;
  color: rgb(20, 20, 20);
}
</style>
