<template>
  <div class="app-container">
    <upload
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      style="margin-bottom:20px"
    />
    <el-table :data="tableData" border>
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
        align="center"
      />
    </el-table>
  </div>
</template>

<script>
import Upload from "@/components/Upload";

export default {
  name: "UploadExcel",
  components: { Upload },
  data() {
    return {
      tableData: [],
      tableHeader: []
    };
  },
  methods: {
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;

      if (isLt1M) {
        return true;
      }

      this.$message({
        message: "请不要上传大于 1M 的文件",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.tableData = results;
      this.tableHeader = header;
    }
  }
};
</script>
