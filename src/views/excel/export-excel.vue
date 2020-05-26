<template>
  <div class="app-container">
    <div class="tools-bar">
      <excel-input
        v-model="filename"
        label="文件名"
        placeholder="导出文件名(excel-list)"
      />
      <excel-select v-model="bookType" label="导出类型" :options="options" />
      <excel-radio v-model="autoWidth" label="自动列宽" />
      <el-button
        :loading="downloadLoading"
        type="success"
        icon="el-icon-document"
        @click="handleDownload"
        size="small"
      >
        导出 Excel
      </el-button>
    </div>

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
import ExcelInput from "./components/Input";
import ExcelSelect from "./components/Select";
import ExcelRadio from "./components/Radio";

export default {
  name: "ExportExcel",
  components: {
    ExcelInput,
    ExcelSelect,
    ExcelRadio
  },
  data() {
    return {
      filename: "",
      bookType: "xlsx",
      options: ["xlsx", "csv", "txt"],
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
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["Id", "标题", "作者", "访问量", "时间"];
        const filterVal = ["id", "title", "author", "pageViews", "datetime"];
        const list = this.tableList;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
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
<style lang="scss">
.label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
}
</style>
<style lang="scss" scoped>
.tools-bar {
  > * {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
