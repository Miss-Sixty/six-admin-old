<template>
  <div class="tools-bar">
    <el-input
      v-model="toolsBarData.title"
      style="width:200px;"
      placeholder="请输入标题"
    />

    <el-select
      v-model="toolsBarData.importance"
      clearable
      style="width:200px;"
      placeholder="请选择状态"
    >
      <el-option
        v-for="item in importanceOptions"
        :key="item"
        :label="item"
        :value="item"
      />
    </el-select>

    <el-date-picker
      v-model="toolsBarData.date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width:300px;"
    />

    <el-button type="primary" icon="el-icon-search" @click="handleFilter"
      >搜索</el-button
    >
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="$emit('handleAdd')"
      style="margin-left:0;"
      >添加</el-button
    >
  </div>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      importanceOptions: ["2"],
      toolsBarData: {
        title: "",
        importance: "",
        date: ""
      }
    };
  },
  methods: {
    handleFilter() {
      this.$emit("input", { ...this.value, ...this.toolsBarData });
      this.$emit("handleFilter");
    }
  }
};
</script>
<style lang="scss" scoped>
.tools-bar {
  > * {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
