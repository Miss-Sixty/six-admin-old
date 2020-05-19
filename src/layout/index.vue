<template>
  <div class="layout">
    <sidebar />
    <div class="layout-container" :class="{ hideSidebarWidth: !opened }">
      <navbar class="layout-container__navbar" />
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
  &-container {
    transition: margin 0.3s ease-in-out;
    margin-left: $sideBarWidth;

    &.hideSidebarWidth {
      margin-left: $hideSidebarWidth;
    }
  }
}
</style>
