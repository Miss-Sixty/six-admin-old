<template>
  <div class="excel-input">
    <label class="label" :for="autoWidth" v-if="label">{{ label }}：</label>
    <el-select
      :id="autoWidth"
      v-model="autoWidth"
      :style="{ width: width }"
      size="small"
    >
      <el-option :value="item" v-for="item in options" :key="item" />
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
    value: String,
    options: Array
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
