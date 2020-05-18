<template>
  <div class="navbar">
    <div class="navbar-icon" @click="toggleSideBar">
      <svg-icon
        icon-class="hamburger"
        :class="{ 'is-active': opened }"
        width="20px"
        height="20px"
      />
    </div>

    <div class="right-menu">
      <el-dropdown trigger="click">
        <div class="right-menu__avatar navbar-icon">
          <img width="40" height="40" :src="avatar" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <a target="_blank" href="">
            <el-dropdown-item>Github</el-dropdown-item>
          </a>
          <a target="_blank" href="">
            <el-dropdown-item>Docs</el-dropdown-item>
          </a>
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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
    }
  }
}
</style>
