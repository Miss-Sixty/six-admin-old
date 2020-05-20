<template>
  <div v-if="errorLogs.length > 0">
    <el-badge
      :is-dot="true"
      style="line-height: 25px;margin-top: -5px;"
      @click.native="dialogTableVisible = true"
    >
      <el-button style="padding: 8px 10px;" size="small" type="danger">
        <svg-icon icon-class="bug" />
      </el-button>
    </el-badge>

    <el-dialog
      :visible.sync="dialogTableVisible"
      width="80%"
      append-to-body
      title="错误日志"
    >
      <el-table :data="errorLogs">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <aside>{{ scope.row.err.stack }}</aside>
          </template>
        </el-table-column>

        <el-table-column label="报错路由" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <a :href="row.url" target="_blank">
              <el-tag type="success">
                {{ row.url }}
              </el-tag>
            </a>
          </template>
        </el-table-column>

        <el-table-column label="错误信息" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <el-tag type="danger">
              {{ row.err.message }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="Vue信息" show-overflow-tooltip>
          <template slot-scope="{ row }">
            <el-tag type="warning">
              {{ row.vm.$vnode.tag }} error in {{ row.info }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogTableVisible = false">
          关 闭
        </el-button>
        <el-button type="danger" icon="el-icon-delete" @click="clearAll">
          全部忽略
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ErrorLog",
  data() {
    return {
      dialogTableVisible: false
    };
  },
  computed: {
    errorLogs() {
      return this.$store.getters.errorLogs;
    }
  },
  methods: {
    clearAll() {
      this.dialogTableVisible = false;
      this.$store.dispatch("errorLog/clearErrorLog");
    }
  }
};
</script>

<style scoped>
.message-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  padding-right: 8px;
}
</style>
