<template>
  <v-chart
    :autoresize="autoResize"
    :options="data"
    :style="{ width: width, height: height }"
    theme="macarons"
  />
</template>
<script>
import VChart from "@/plugins/echarts";

export default {
  components: {
    VChart
  },
  props: {
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      data: {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
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
          bottom: 0,
          top: 10,
          containLabel: true
        },
        series: {
          name: "访问量",
          type: "line",
          smooth: true,
          areaStyle: {},
          animationDuration: 3000,
          animationEasing: "cubicInOut",
          data: this.chartData,
          itemStyle: {
            normal: {
              color: "#409eff",
              lineStyle: {
                color: "#409eff",
                width: 2
              }
            }
          }
        }
      }
    };
  }
};
</script>
