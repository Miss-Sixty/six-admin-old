<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: "AppMain",
  computed: {
    key() {
      return this.$route.path;
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/var.scss";

.app-main {
  /* 50= navbar  height */
  /* 40= tagsView height */
  min-height: calc(100vh - $navbarHeight - $tagsViewHeight);
  width: 100%;
  position: relative;
  overflow: hidden;
}
</style>
