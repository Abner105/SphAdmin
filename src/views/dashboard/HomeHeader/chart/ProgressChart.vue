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
        show: false,
        
         max:100
      },
      grid: {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      yAxis: {
        show: false,
        type: "category",

      },
      series: [
        {
          type: "bar", // 柱状图
          data: [78],
          itemStyle: {
            color: "yellowgreen",
          },
           showBackground:"#eee",
           barWidth:"20px",
           // 视觉引导线
           label:{formatter:"|",
           show:true,
            position:"right"}
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
}
</style>