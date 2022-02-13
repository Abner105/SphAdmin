<template>
  <el-card class="container">
    <!-- @tab-click="handleClick" -->
    <el-tabs v-model="activeName">
      <el-tab-pane label="销售额" name="sale"></el-tab-pane>
      <el-tab-pane label="访问量" name="visit"></el-tab-pane>
    </el-tabs>
    <!-- 右侧日期 -->
    <div class="rightspan">
      <span @click="setDay('day')">今天</span>
      <span @click="setDay('week')">本周</span>
      <span @click="setDay('month')">本月</span>
      <span @click="setDay('year')">本年</span>
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        size="mini"
        style="width: 230px"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
    </div>
    <!-- 下方销售图表与排名 -->
    <el-row>
      <el-col :span="18">
        <div class="box" ref="box"></div>
      </el-col>
      <el-col :span="6">
        <h4 class="title">门店{{title}}排名</h4>
        <ul class="list">
          <li>
            <i class="i">1</i>
            <span>肯德基</span>
            <span>23421</span>
          </li>
          <li>
            <i class="i">2</i>
            <span>肯德基</span>
            <span>23421</span>
          </li>
          <li>
            <i class="i">3</i>
            <span>肯德基</span>
            <span>23421</span>
          </li>
          <li>
            <i>4</i>
            <span>肯德基</span>
            <span>23421</span>
          </li>
          <li>
            <i>5</i>
            <span>肯德基</span>
            <span>23421</span>
          </li>
          <li>
            <i>6</i>
            <span>肯德基</span>
            <span>23421</span>
          </li>
          <li>
            <i>7</i>
            <span>肯德基</span>
            <span>23421</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
import dayjs from "dayjs";
export default {
  name: "Sale",
  data() {
    return {
      activeName: "sale", //tab标签
      date: [], //日期
    };
  },
  mounted() {
    // 绘制饼状图
    const box = this.$refs.box;
    this.myEcharts = echarts.init(box);
    this.myEcharts.setOption({
      title: {
        text: "销售额趋势",
        textStyle: {
          fontSize: "14px",
        },
        top: 20,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      xAxis: {
        type: "category",
        data: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "一二月",
        ],
      },
      grid: {
        left: 60,
        right: 30,
        bottom: 30,
      },
      yAxis: {},
      series: [
        {
          name: "销售额",
          type: "bar", // 柱状图
          data: [
            101, 273, 143, 99, 301, 221, 115, 312, 132, 242, 153, 212, 222,
          ],
          itemStyle: {
            color: "rgb(46, 130, 199)",
          },
        },
      ],
    });
  },
  computed:{
    title(){
      return this.activeName=="sale"?"销售额":"访问量"
    }
  },
  watch: {
    activeName(newVal) {
      if (newVal == "visit") {
        this.barOption(
          "访问量趋势",
          [122, 223, 432, 231, 341, 212, 231, 321, 324, 432, 213, 343, 123]
        );
      } else {
        this.barOption(
          "销售额趋势",
          [101, 273, 143, 99, 301, 221, 115, 312, 132, 242, 153, 212, 222]
        );
      }
    },
  },
  methods: {
    // 柱状图配置
    barOption(title, data) {
      this.myEcharts.setOption({
        title: {
          text: title,
        },
        series: [
          {
            data,
          },
        ],
      });
    },
    // 日期
    setDay(type) {
      let start = dayjs().startOf(type).format("YYYY-MM-DD");
      let end = dayjs().endOf(type).format("YYYY-MM-DD");
      this.date = [start, end];
    },
  },
};
</script>

<style scoped>
.container {
  margin: 10px 5px;
  position: relative;
  font-size: 14px;
}
.rightspan {
  position: absolute;
  top: 25px;
  right: 25px;
}
.rightspan span {
  margin: 0 10px;
}
>>> .el-tabs__item {
  font-size: 16px !important;
}
.box {
  width: 100%;
  height: 300px;
}
.title {
  margin: 10px;
  font-size: 14px;
}
ul {
  padding: 0;
  margin: 20px 0;
  width: 80%;
}
ul li {
  list-style: none;
  line-height: 25px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px;
}

ul li i {
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 50%;
  border: 1px solid #000;
  color: black;
}
ul li .i {
  width: 25px;
  height: 25px;
  text-align: center;
  line-height: 25px;
  border-radius: 50%;
  background-color: gray;
  color: #fff;
}
</style>