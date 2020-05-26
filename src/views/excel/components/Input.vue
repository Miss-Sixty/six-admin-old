<template>
  <div class="excel-input">
    <label class="label" :for="filename" v-if="label">{{ label }}：</label>
    <el-input
      :id="filename"
      clearable
      v-model="filename"
      :placeholder="placeholder"
      :style="{ width: width }"
    />
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    placeholder: {
      type: String,
      default: "请输入内容"
    },
    width: {
      type: String,
      default: "190px"
    },
    value: String
  },
  computed: {
    filename: {
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
