<template>
  <div class="layout">
    <sidebar />
    <div class="layout-container">
      <navbar :opened="opened" class="layout-container__navbar" />
      <app-main class="layout-container__main" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar/index.vue";
import AppMain from "./components/AppMain.vue";
export default {
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    ...mapGetters(["opened"])
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/var.scss";

.layout {
  position: relative;
  // height: 100%;

  &-container {
    margin-left: $sideBarWidth;
  }
}
</style>
