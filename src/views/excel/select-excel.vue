<template>
  <div class="app-container">
    <div class="tools-bar">
      <excel-input
        v-model="filename"
        label="文件名"
        placeholder="导出文件名(excel-list)"
      />

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

    <el-table
      ref="multipleTable"
      :data="tableList"
      border
      v-loading="formLoading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />

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

export default {
  name: "SelectExcel",
  components: {
    ExcelInput
  },
  data() {
    return {
      filename: "",
      formLoading: false,
      tableList: [],
      total: 0,
      downloadLoading: false,
      multipleSelection: []
    };
  },
  mounted() {
    this.getFormData();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleDownload() {
      if (this.multipleSelection.length) {
        this.downloadLoading = true;
        import("@/vendor/Export2Excel").then(excel => {
          const tHeader = ["Id", "标题", "作者", "访问量", "时间"];
          const filterVal = ["id", "title", "author", "pageViews", "datetime"];
          const list = this.multipleSelection;
          const data = this.formatJson(filterVal, list);
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: this.filename
          });
          this.$refs.multipleTable.clearSelection();
          this.downloadLoading = false;
        });
      } else {
        this.$message({
          message: "Please select at least one item",
          type: "warning"
        });
      }
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
<style lang="scss" scoped>
.tools-bar {
  > * {
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>
