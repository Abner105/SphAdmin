<template>
  <div class="box" ref="box"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  mounted() {
    const box = this.$refs.box;
    const myEcharts = echarts.init(box);
    myEcharts.setOption({
      tooltip:{},
      xAxis: {
        type: "category",
        show: false,
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      yAxis: {
        show: false,
      },
      series: [
        {
          type: "bar", // 柱状图
          data: [11, 23, 43, 22, 31, 21, 15,12,32,42,53,12,22,33],
          itemStyle: {
            color: "rgb(46, 130, 199)",
          },
          //  showBackground:"#eee"
          // smooth: true, // 平滑显示
          // showSymbol: false,
        },
      ],
    });
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  /* background-color: rgb(46, 130, 199); */
}
</style>