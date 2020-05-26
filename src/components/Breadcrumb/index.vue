<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="item in levelList"
        :key="item.path"
        :to="toPath(item)"
      >
        {{ item.meta.title }}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "Breadcrumb",
  data() {
    return {
      levelList: null
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      this.levelList = this.$route.matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    toPath(item) {
      const { redirect, path } = item;
      if (this.$route.path === redirect || this.$route.path === path) return;

      if (redirect) {
        if (!redirect || redirect === "noRedirect") return;
        return redirect;
      }

      return path;
    }
  }
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  display: inline-block;
  line-height: 50px;
  vertical-align: text-bottom;
}

/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition-property: opacity, transform;
  transition-duration: 0.5s, 0.5s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition-property: opacity, transform;
  transition-duration: 0.5s, 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
