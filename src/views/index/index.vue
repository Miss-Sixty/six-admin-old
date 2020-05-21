<template>
  <div class="app-container">
    <aside>
      此项目是作者用来快速构建后台所使用的模板，各项功能在不断完善中，也借鉴了一些其他优秀
      <a href>开源项目</a>
      的代码。如有兴趣可 fork 下来自行查看。
    </aside>

    <info-view />

    <el-row :gutter="32">
      <el-col :span="16">
        <el-card class="box-card" header="访问量">
          <visit :chartData="visitData" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" header="版本信息">
          <version />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import InfoView from "./components/InfoView";
import Visit from "./components/Visit";
import Version from "./components/Version";
export default {
  components: {
    InfoView,
    Visit,
    Version
  },
  data() {
    return {
      visitData: [1080, 962, 821, 834, 1000, 1300, 1500]
    };
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  > * {
    margin-bottom: 15px;
  }
}
</style>
