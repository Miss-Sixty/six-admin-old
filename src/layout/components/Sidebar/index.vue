<template>
  <div class="sidebar" :class="{ sidebarWidth: !opened }">
    <sidebar-logo :opened="!opened" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="sidebar-menu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :collapse="!opened"
        router
        :default-active="$route.path"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarLogo from "./Logo.vue";
import variables from "@/styles/var.scss";
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
export default {
  components: {
    SidebarLogo,
    SidebarItem
  },
  computed: {
    variables() {
      return variables;
    },
    ...mapGetters(["opened", "permission_routes"])
  },
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped lang="scss">
@import "@/styles/var.scss";

.sidebar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: $menuBg;
  transition: width 0.3s ease-in-out;
  width: $sideBarWidth;
  font-size: 0px;
  &.sidebarWidth {
    width: $hideSidebarWidth;
  }

  ::v-deep {
    .sidebar-menu:not(.el-menu--collapse) {
      width: $sideBarWidth;
      overflow: hidden;
    }

    .el-scrollbar {
      height: calc(100% - 50px);

      .scrollbar-wrapper {
        overflow-x: hidden !important;
      }

      .el-menu {
        border: 0;
      }
    }
  }
}
</style>
