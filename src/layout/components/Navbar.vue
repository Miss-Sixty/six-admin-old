<template>
  <div class="navbar">
    <div class="navbar-icon" @click="toggleSideBar">
      <svg-icon icon-class="hamburger" :class="{ 'is-active': opened }" />
    </div>

    <div class="right-menu">
      <error-log class="navbar-icon" />

      <div class="navbar-icon">
        <screenfull />
      </div>

      <a
        class="navbar-icon"
        href="https://github.com/Miss-Sixty/six-admin"
        target="_bleak"
      >
        <svg-icon icon-class="github" />
      </a>

      <el-dropdown trigger="click" class=" navbar-icon">
        <div class="right-menu__avatar">
          <img width="40" height="40" :src="avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <a target="_blank" href="">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Screenfull from "@/components/Screenfull";
import ErrorLog from "@/components/ErrorLog";
export default {
  components: { Screenfull, ErrorLog },
  computed: {
    ...mapGetters(["opened", "avatar"])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    }
  }
};
</script>

<style scoped lang="scss">
.navbar {
  background-color: #fff;
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .is-active {
    transform: rotate(180deg);
  }
  &-icon {
    display: inline-block;
    padding: 0 10px;
    height: 100%;
    font-size: 18px;
    color: #5a5e66;
    vertical-align: text-bottom;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.03);
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }

    &__avatar {
      padding-top: 5px;
      cursor: pointer;

      > img {
        border-radius: 6px;
      }
      .el-icon-caret-bottom {
        cursor: pointer;
        font-size: 12px;
        margin-left: 6px;
      }
    }
  }
}
</style>
