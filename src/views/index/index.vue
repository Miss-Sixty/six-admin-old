<template>
  <div class="app-container">
    <aside>
      此项目是作者用来快速构建后台所使用的模板，各项功能在不断完善中，也借鉴了一些其他优秀
      <a href>开源项目</a>
      的代码。如有兴趣可 fork 下来自行查看。
    </aside>

    <info-view />
  </div>
</template>
<script>
import InfoView from "./components/InfoView";
export default {
  components: {
    InfoView
  }
};
</script>
<style lang="scss" scoped></style>
