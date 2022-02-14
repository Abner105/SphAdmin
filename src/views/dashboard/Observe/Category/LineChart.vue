<template>
  <div>
    <div class="header">
      <span>{{ title }}</span>
      <i class="el-icon-warning-outline"></i>
    </div>
    <div>
      <span  class="number">{{number}}</span>
      <span>17.1</span>
      <i class="el-icon-caret-bottom" style="color:red"></i>
      <i class="el-icon-caret-top" style="color:yellowgreen"></i>
    </div>
    <div class="box" ref="box"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "LineChart",
  props: ["title", "number"],
  mounted() {
    const box = this.$refs.box;
    const myEcharts = echarts.init(box);
    myEcharts.setOption({
      // tooltip:{},
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
          type: "line", // 折线图
          data: [11, 23, 43, 22, 31, 21, 15],
          itemStyle: {
            color: "skyblue",
          },
          smooth: true, // 平滑显示
          showSymbol: false,
          areaStyle: {
            // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
            color: {
              type: "linear",
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: "skyblue", // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "#fff", // 100% 处的颜色
                },
              ],
            },
          },
        },
      ],
    });
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 80px;
  /* background-color: rgb(255, 170, 255); */
}
.header {
  /* width: 100%; */
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
}
.number{
  display: inline-block;
  margin: 5px 20px;
  font-size: 30px;
  font-weight: 500;
}
</style>