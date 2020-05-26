<template>
  <div class="excel-input">
    <label class="label" :for="autoWidth" v-if="label">{{ label }}：</label>
    <el-select :id="autoWidth" v-model="autoWidth" :style="{ width: width }">
      <el-option value="xlsx" />
      <el-option value="csv" />
      <el-option value="txt" />
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    width: {
      type: String,
      default: "190px"
    },
    value: String
  },
  computed: {
    autoWidth: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.excel-input {
  display: inline-block;
}
</style>
