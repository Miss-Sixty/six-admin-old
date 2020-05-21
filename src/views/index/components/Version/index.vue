<template>
  <table class="table">
    <tr>
      <td>Vue CLI</td>
      <td>{{ devDependencies["@vue/cli-service"] }}</td>
    </tr>
    <tr>
      <td>Vue</td>
      <td>{{ dependencies.vue }}</td>
    </tr>
    <tr>
      <td>Vuex</td>
      <td>{{ dependencies.vuex }}</td>
    </tr>
    <tr>
      <td>Vue Router</td>
      <td>{{ dependencies["vue-router"] }}</td>
    </tr>
    <tr>
      <td>Element</td>
      <td>{{ dependencies["element-ui"] }}</td>
    </tr>
    <tr>
      <td>axios</td>
      <td>{{ dependencies.axios }}</td>
    </tr>
    <tr>
      <td>Sass</td>
      <td>{{ devDependencies.sass }}</td>
    </tr>
    <tr>
      <td>ESlint</td>
      <td>{{ devDependencies.eslint }}</td>
    </tr>
  </table>
</template>
<script>
import { dependencies, devDependencies } from "../../../../../package.json";
export default {
  data() {
    return {
      dependencies,
      devDependencies
    };
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
