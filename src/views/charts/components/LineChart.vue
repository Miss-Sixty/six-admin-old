<template>
  <v-chart autoresize :options="data" theme="light" />
</template>
<script>
import VChart from "@/plugins/echarts";
export default {
  components: {
    VChart
  },
  props: {
    xData: Array,
    yData: Array,
    legendData: Array
  },
  data() {
    return {
      data: {
        legend: {
          data: this.legendData
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xData
        },
        yAxis: {},
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        grid: {
          left: 0,
          right: 10,
          bottom: 10,
          top: 30,
          containLabel: true
        },
        series: this.yData
      }
    };
  }
};
</script>
