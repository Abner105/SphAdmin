<template>
  <div class="home-header">
    <el-row>
      <el-col :span="6" v-for="item in list" class="elcol">
        <Detail :data="item">
          <template slot="chart">
            <div v-if="item.scene==0">周同比 12% 👇 日同比 11% 👆</div>
            <line-chart v-if="item.scene==1" />
            <bar-chart v-if="item.scene==2" />
            <progress-chart v-if="item.scene==3" />
          </template>
        </Detail>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import BarChart from '../HomeHeader/chart/BarChart.vue';
import LineChart from '../HomeHeader/chart/LineChart.vue';
import ProgressChart from '../HomeHeader/chart/ProgressChart.vue';
import Detail from "./Detail/Detail.vue";
export default {
  name: "HomeHeader",
  components: {
    Detail,
    LineChart,
    BarChart,
    ProgressChart,
  },
  data() {
    return {
      // 首页头部需要展示的数据
      list: [
        {
          title: "销售总额",
          number: "￥1234",
          scene: 0,
          floor: "日销售额 ￥1234",
        },
        {
          title: "访问量",
          number: "88460",
          scene: 1,
          floor: "日访问量 ￥1234",
        },
        {
          title: "支付笔数",
          number: "88460",
          scene: 2,
          floor: "转化率 65%",
        },
        {
          title: "运营活动效果",
          number: "78%",
          scene: 3,
          floor: "周同比 12% 👇 日同比 11% 👆",
        },
      ],
    };
  },
};
</script>

<style scoped>
.elcol {
  padding: 0 5px;
}
</style>