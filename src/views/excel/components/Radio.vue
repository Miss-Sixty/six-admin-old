<template>
  <div class="excel-input">
    <label class="label" v-if="label">{{ label }}：</label>
    <el-radio-group v-model="autoWidth" size="small">
      <el-radio-button :label="true">
        是
      </el-radio-button>
      <el-radio-button :label="false">
        否
      </el-radio-button>
    </el-radio-group>
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

    value: Boolean
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
