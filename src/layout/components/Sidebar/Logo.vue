<template>
  <router-link to="/" class="sidebar-logo">
    <img :src="settings.logo" alt="logo" />
    <h1 v-if="!opened" class="sidebar-logo-title">{{ settings.title }}</h1>
  </router-link>
</template>
<script>
import settings from "@/settings";
export default {
  name: "Logo",
  props: {
    opened: Boolean
  },
  data() {
    return {
      settings: settings
    };
  }
};
</script>
<style lang="scss" scoped>
.sidebar-logo {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  font-size: 0;
  display: block;

  > img {
    width: 30px;
    height: 30px;
    vertical-align: middle;
  }

  &-title {
    display: inline-block;
    margin: 0;
    margin-left: 12px;
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    vertical-align: middle;
  }
}
</style>
