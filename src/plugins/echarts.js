// 手动引入 ECharts 各模块来减小打包体积
import VChart from "vue-echarts";
import "echarts/lib/component/title"; //标题
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend"; //名字列表
import "echarts/lib/chart/line"; //折线图
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/theme/macarons"; // echarts theme
export default VChart;
