<template>
  <table class="table">
    <tr v-for="item in versionData" :key="item.name">
      <td>
        <el-tag type="success">{{ item.name }}</el-tag>
      </td>
      <td>{{ item.version }}</td>
    </tr>
  </table>
</template>
<script>
import { dependencies, devDependencies } from "../../../../../package.json";
export default {
  computed: {
    versionData() {
      return [
        {
          name: "Vue CLI",
          version: devDependencies["@vue/cli-service"]
        },
        {
          name: "Vue",
          version: dependencies["vue"]
        },
        {
          name: "Vuex",
          version: dependencies["vuex"]
        },
        {
          name: "Vue Router",
          version: dependencies["vue-router"]
        },
        {
          name: "Element",
          version: dependencies["element-ui"]
        },
        {
          name: "axios",
          version: dependencies["axios"]
        }
      ];
    }
  }
};
</script>
<style lang="scss" scoped>
.table {
  width: 100%;
  color: #666;
  border-collapse: collapse;
  font-size: 14px;
  td {
    padding: 10px 15px;
    border: 1px solid #ebeef5;
  }
}
</style>
