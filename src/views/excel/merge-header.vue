<template>
  <div class="app-container">
    <el-button
      :loading="downloadLoading"
      type="success"
      icon="el-icon-document"
      @click="handleDownload"
      size="small"
      style=" margin-bottom: 20px;"
    >
      导出 Excel
    </el-button>

    <el-table :data="tableList" border v-loading="formLoading">
      <el-table-column label="序号" width="55" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="文章主要信息" align="center">
        <el-table-column prop="title" label="标题" align="center" width="150" />
        <el-table-column prop="author" label="作者" align="center" width="100">
          <el-tag slot-scope="{ row }">{{ row.author }}</el-tag>
        </el-table-column>
        <el-table-column prop="introduction" label="文章简介" />
        <el-table-column
          prop="pageViews"
          label="访问量"
          align="center"
          width="100"
        />
      </el-table-column>

      <el-table-column
        prop="datetime"
        label="时间"
        align="center"
        width="160"
      />
    </el-table>
  </div>
</template>
<script>
import { fetchList } from "@/api/article";
export default {
  name: "MergeHeader",
  data() {
    return {
      formLoading: false,
      tableList: [],
      total: 0,
      downloadLoading: false
    };
  },
  mounted() {
    this.getFormData();
  },
  methods: {
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const multiHeader = [["Id", "文章主要信息", "", "", "", "时间"]];
        const header = ["", "标题", "作者", "文章简介", "访问量", ""];
        const filterVal = [
          "id",
          "title",
          "author",
          "introduction",
          "pageViews",
          "datetime"
        ];
        const list = this.tableList;
        const data = this.formatJson(filterVal, list);
        const merges = ["A1:A2", "B1:E1", "F1:F2"];
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },

    getFormData() {
      this.formLoading = true;
      fetchList().then(res => {
        const { items: tableList, total } = res.data;
        this.tableList = tableList;
        this.total = total;
        this.formLoading = false;
      });
    }
  }
};
</script>
