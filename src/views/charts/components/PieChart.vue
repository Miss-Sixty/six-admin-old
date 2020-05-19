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
        title: {
          text: "用户年龄段",
          subtext: "纯属虚构",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}岁 : {c} ({d}%)"
        },
        legend: {
          left: "center",
          top: "bottom",
          data: this.xData
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: this.yData
      }
    };
  }
};
</script>
