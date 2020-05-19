<template>
  <el-row :gutter="20" class="app-container">
    <el-col :span="12">
      <el-card class="box-card" header="折线图">
        <line-chart
          :x-data="lineXData"
          :y-data="lineYData"
          :legend-data="lineLegendData"
        />
      </el-card>
    </el-col>

    <el-col :span="12">
      <el-card class="box-card" header="柱状图">
        <bar-chart
          :x-data="barXData"
          :y-data="barYData"
          :legend-data="barLegendData"
        />
      </el-card>
    </el-col>

    <el-col :span="12">
      <el-card class="box-card" header="南丁格尔玫瑰图">
        <pie-chart
          :x-data="pieXData"
          :y-data="pieYData"
          :legend-data="pieLegendData"
        />
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
export default {
  components: {
    LineChart,
    BarChart,
    PieChart
  },
  data() {
    return {
      lineLegendData: ["预期", "实际"],
      lineXData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      lineYData: [
        {
          name: "预期",
          type: "line",
          smooth: true,
          data: [820, 1032, 901, 984, 1290, 1230, 1320]
        },
        {
          name: "实际",
          type: "line",
          smooth: true,
          data: [980, 962, 821, 834, 1000, 1300, 1680],
          animationEasing: "cubicInOut"
        }
      ],

      barLegendData: ["预期", "实际"],
      barXData: ["5.02号", "5.05号", "5.08号", "5.011号", "5.14号"],
      barYData: [
        {
          name: "预期",
          type: "bar",
          data: [1032, 901, 984, 1290, 1230]
        },
        {
          name: "实际",
          type: "bar",
          data: [962, 821, 834, 1000, 1300],
          animationEasing: "cubicInOut"
        }
      ],

      pieLegendData: ["用户年龄"],
      pieXData: [
        "6～10岁",
        "11～15岁",
        "16～20岁",
        "21～25岁",
        "26～30岁",
        "31～35岁"
      ],
      pieYData: [
        {
          name: "用户年龄",
          type: "pie",
          radius: [30, 110],
          roseType: "area",

          data: [
            { value: 5, name: "6～10岁" },
            { value: 15, name: "11～15岁" },
            { value: 25, name: "16～20岁" },
            { value: 60, name: "21～25岁" },
            { value: 55, name: "26～30岁" },
            { value: 40, name: "31～35岁" }
          ]
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.app-container {
  > * {
    margin-bottom: 15px;
    .echarts {
      width: 100%;
    }
  }
}
</style>
