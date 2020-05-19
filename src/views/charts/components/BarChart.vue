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
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: 0,
          right: 10,
          bottom: 10,
          top: 30,
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.xData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [{}],
        series: this.yData
      }
    };
  }
};
</script>
