<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <el-breadcrumb-item
      v-for="item in levelList"
      :key="item.path"
      :to="toPath(item)"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
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
      if (redirect) {
        if (redirect === "noRedirect" || this.$route.path === redirect)
          return false;
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
</style>
