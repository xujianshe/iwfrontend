<template>
  <div>
    <div id="chart" style="width: 800px; height: 600px"></div>
    <el-button type="primary">ElementUI Test</el-button>
    <p>
      svg-icon test
      <svg-icon icon-class="custome"></svg-icon>
    </p>
  </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  name: "HOME",
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let chart = echarts.init(document.getElementById("chart"));
      let option = {
        title: {
          text: "ECharts Test",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };
      chart.setOption(option);
    },
  },
};
</script>
