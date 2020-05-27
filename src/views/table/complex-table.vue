<template>
  <div class="app-container">
    <tools-bar
      v-model="formData"
      @handleFilter="handleFilter"
      @handleAdd="handleAdd"
    />

    <el-table :data="tableList" border v-loading="formLoading">
      <el-table-column label="序号" width="55" align="center">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column prop="author" label="作者" align="center">
        <el-tag slot-scope="{ row }">{{ row.author }}</el-tag>
      </el-table-column>
      <el-table-column prop="pageViews" label="访问量" align="center" />
      <el-table-column prop="datetime" label="时间" align="center" />
    </el-table>

    <pagination />
  </div>
</template>
<script>
import ToolsBar from "./components/ToolsBar";
import Pagination from "@/components/Pagination";
import { fetchList } from "@/api/article";
export default {
  name: "ComplexTable",
  components: {
    ToolsBar,
    Pagination
  },
  data() {
    return {
      formData: {
        title: "",
        importance: "",
        date: ""
      },
      formLoading: false,
      tableList: [],
      total: 0
    };
  },
  mounted() {
    this.getFormData(this.formData);
  },
  methods: {
    handleFilter() {
      console.log("handleFilter");
      this.getFormData(this.formData);
    },
    handleAdd() {
      console.log("handleAdd");
    },
    getFormData(data) {
      this.formLoading = true;
      fetchList(data).then(res => {
        const { items: tableList, total } = res.data;
        this.tableList = tableList;
        this.total = total;
        this.formLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped></style>
