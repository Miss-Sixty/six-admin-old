<template>
  <div id="app">
    <router-view v-if="show" />
  </div>
</template>
<script>
export default {
  name: "App",
  computed: {
    reload() {
      return this.$store.state.reload.reload;
    }
  },
  data() {
    return {
      show: true
    };
  },
  watch: {
    reload() {
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
        this.$message({
          showClose: true,
          message: "页面刷新成功",
          type: "success"
        });
      });
    }
  }
};
</script>
