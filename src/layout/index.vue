<template>
  <div class="layout">
    <sidebar />
    <div class="layout-container" :class="{ hideSidebarWidth: !opened }">
      <div>
        <navbar class="layout-container__navbar" />
        <tags-view />
      </div>
      <app-main class="layout-container__main" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar/index";
import AppMain from "./components/AppMain";
import TagsView from "./components/TagsView";
export default {
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
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
