<template>
  <div class="app-container">
    <el-form ref="toolsBar" :inline="true" size="medium" :model="formData">
      <el-form-item label="文件名">
        <el-input
          clearable
          v-model="formData.name"
          placeholder="导出文件名(默认excel)"
        />
      </el-form-item>

      <el-form-item label="导出类型">
        <el-select v-model="formData.type">
          <el-option value="xlsx" />
          <el-option value="csv" />
          <el-option value="txt" />
        </el-select>
      </el-form-item>

      <el-form-item label="自动列宽">
        <el-radio-group v-model="formData.autoWidth">
          <el-radio-button :label="true">
            是
          </el-radio-button>
          <el-radio-button :label="false">
            否
          </el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button type="success" icon="el-icon-document">导出 Excel</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableList" border v-loading="formLoading">
      <el-table-column label="序号" width="55" align="center">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="date" label="标题" />
      <el-table-column prop="author" label="作者">
        <el-tag slot-scope="{ row }">{{ row.author }}</el-tag>
      </el-table-column>
      <el-table-column prop="pageViews" label="访问量" />
      <el-table-column prop="date" label="时间" />
    </el-table>
  </div>
</template>
<script>
import { fetchList } from "@/api/article";
export default {
  name: "ExportExcel",
  data() {
    return {
      formData: {
        name: "",
        type: "xlsx",
        autoWidth: true
      },

      formLoading: false,

      tableList: [
        {
          date: "2016-05-02",
          author: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          author: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          author: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          author: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  mounted() {
    this.getFormData();
  },
  methods: {
    getFormData() {
      this.formLoading = true;
      fetchList().then(res => {
        console.log(res);
        this.tableList = res.data.items;
        this.formLoading = false;
      });
    }
  }
};
</script>
