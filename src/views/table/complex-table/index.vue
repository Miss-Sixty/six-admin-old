<template>
  <div class="app-container">
    <tools-bar
      v-model="formData"
      @handleFilter="getFormData"
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

      <el-table-column
        prop="timestamp"
        :formatter="formatterDate"
        label="时间"
        align="center"
      />

      <el-table-column prop="type" label="状态" align="center">
        <template slot-scope="{ row }">
          <el-tag :type="row.status | statusFilter">
            {{ row.status | statusFilterName }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="formData.page"
      :limit.sync="formData.limit"
      @pagination="getFormData"
    />
  </div>
</template>
<script>
import ToolsBar from "./components/ToolsBar";
import Pagination from "@/components/Pagination";
import { fetchList } from "@/api/article";
import dayjs from "dayjs";
export default {
  name: "ComplexTable",
  components: {
    ToolsBar,
    Pagination
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    statusFilterName(status) {
      const statusMap = {
        published: "已发表",
        draft: "草稿",
        deleted: "已删除"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      dayjs,
      formData: {
        title: null,
        author: null,
        timestamp: null,
        status: null,
        page: 1,
        limit: 10
      },
      formLoading: false,
      tableList: [],
      total: 0
    };
  },
  mounted() {
    this.getFormData();
  },
  methods: {
    handleAdd() {
      console.log("handleAdd");
    },
    getFormData() {
      this.formLoading = true;
      fetchList(this.formData).then(res => {
        const { items: tableList, total } = res.data;
        this.tableList = tableList;
        this.total = total;
        this.formLoading = false;
      });
    },

    formatterDate(date) {
      return dayjs(date.timestamp).format("YYYY-MM-DD");
    }
  }
};
</script>
