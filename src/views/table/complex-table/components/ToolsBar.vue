<template>
  <div class="tools-bar">
    <el-input
      v-model="toolsBarData.title"
      style="width:200px;"
      placeholder="请输入标题"
    />

    <el-select
      v-model="toolsBarData.status"
      clearable
      style="width:200px;"
      placeholder="请选择状态"
    >
      <el-option
        v-for="item in importanceOptions"
        :key="item.name"
        :label="item.lable"
        :value="item.value"
      />
    </el-select>

    <el-date-picker
      v-model="toolsBarData.timestamp"
      type="daterange"
      value-format="timestamp"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      style="width:300px;"
    />

    <el-button type="primary" icon="el-icon-search" @click="handleFilter">
      搜索
    </el-button>
    <el-button
      type="primary"
      icon="el-icon-edit"
      @click="$emit('handleAdd')"
      style="margin-left:0;"
    >
      添加
    </el-button>
  </div>
</template>
<script>
export default {
  props: {
    value: Object
  },
  data() {
    return {
      importanceOptions: [
        {
          value: "draft",
          lable: "草稿"
        },
        {
          value: "published",
          lable: "已发布"
        },
        {
          value: "deleted",
          lable: "已删除"
        }
      ],
      toolsBarData: {
        title: "",
        type: "",
        timestamp: ""
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
