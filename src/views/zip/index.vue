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
      导出 Zip
    </el-button>

    <el-table :data="tableList" border v-loading="formLoading">
      <el-table-column label="序号" width="55" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="标题" align="center" />
      <el-table-column prop="author" label="作者" align="center">
        <el-tag slot-scope="{ row }">{{ row.author }}</el-tag>
      </el-table-column>
      <el-table-column prop="pageViews" label="访问量" align="center" />
      <el-table-column prop="datetime" label="时间" align="center" />
    </el-table>
  </div>
</template>
<script>
import { fetchList } from "@/api/article";

export default {
  name: "ExportZip",

  data() {
    return {
      autoWidth: true,
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
    getFormData() {
      this.formLoading = true;
      fetchList().then(res => {
        const { items: tableList, total } = res.data;
        this.tableList = tableList;
        this.total = total;
        this.formLoading = false;
      });
    },

    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Zip").then(zip => {
        const tHeader = ["Id", "标题", "作者", "访问量", "时间"];
        const filterVal = ["id", "title", "author", "pageViews", "datetime"];

        const list = this.tableList;
        const data = this.formatJson(filterVal, list);
        zip.export_txt_to_zip(tHeader, data);
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
};
</script>
