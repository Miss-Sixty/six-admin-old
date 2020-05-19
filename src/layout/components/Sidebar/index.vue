<template>
  <div class="sidebar" :class="{ sidebarWidth: !opened }">
    <sidebar-logo :opened="!opened" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <el-menu
        class="sidebar-menu"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :collapse="opened"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一232323232323232323</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <span slot="title">分组一</span>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu> -->
      {{ permission_routes }}
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarLogo from "./Logo.vue";
import variables from "@/styles/var.scss";
import { mapGetters } from "vuex";
export default {
  components: {
    SidebarLogo
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
