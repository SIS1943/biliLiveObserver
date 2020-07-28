<template>
  <div class="about">
    <h1>关于BiliLiveObserver</h1>
    <p>
      这是一个开源的bilibili第三方直播观测、直播流下载的程序。
      <br />目前为技术预览阶段，有许多没有填的坑和坑和坑。
      <br />项目地址：
      <a
        href="https://github.com/Lipraty/biliLiveObserver"
      >https://github.com/Lipraty/biliLiveObserver</a>
    </p>
  </div>
</template>

<script>
const { shell } = require("electron");

export default {
  mounted() {
    let links = document.querySelectorAll("a[href]");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        const url = link.getAttribute("href");
        e.preventDefault();
        shell.openExternal(url);
      });
    });
  },
};
</script>

<style lang="css">
.about {
  background-color: rgba(0, 0, 0, 0.3);
  margin-left: -24px;
  padding-left: 12px !important;
  height: 100vh;
  color: white;
}
</style>