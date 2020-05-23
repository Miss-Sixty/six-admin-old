<template>
  <div class="app-container">
    <aside>
      错误日志会在顶部navbar右侧图标显示，点击下方按钮以模拟页面错误
    </aside>
    <el-button type="primary" @click="handleError">
      点击模拟错误
    </el-button>
  </div>
</template>
<script>
import "@/utils/error-log"; // error log
export default {
  name: "ErrorLog",
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs;
    }
  },

  methods: {
    handleError() {
      this.$message(`模拟 ${this.errorLogs.length + 1} 条错误`);

      //错误模拟
      this.error.log = "模拟错误信息";
    }
  }
};
</script>
