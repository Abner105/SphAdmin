<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="header">
        <span>销售额类别占比</span>
        <div class="button">
          <el-radio-group v-model="radio1" size="mini">
            <el-radio-button label="全部渠道"></el-radio-button>
            <el-radio-button label="线上"></el-radio-button>
            <el-radio-button label="门店"></el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="box" ref="box"></div>
  </el-card>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "Category",
  data() {
    return {
      radio1: "",
    };
  },
  mounted() {
    // 绘制饼图
    let myEcharts = echarts.init(this.$refs.box);
    myEcharts.setOption({
      title: {
        text: "搜索引擎",
        subtext: "1048",
        top: "middle",
        left: "center",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: ["40%", "80%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 4,
            borderColor: "#fff",
            borderWidth: 2,
          },
          label: {
            // show: true,
            position: "outside",
            fontSize: 14,
            // normal: {
              formatter: "{b} " + " {d}%",
              show: true,
              // position: "left", 
            // },
          },
          labelLine: {
            show: true,
            // normal: {
            //   show: true,
            // },
          },
          data: [
            { value: 1048, name: "搜索引擎" },
            { value: 735, name: "直接访问" },
            { value: 580, name: "邮件营销" },
            { value: 484, name: "联盟广告" },
            { value: 300, name: "视频广告" },
          ],
        },
      ],
    });
    myEcharts.on("mouseover", (params) => {
      const { name, value } = params.data;
      myEcharts.setOption({
        title: {
          text: name,
          subtext: value,
        },
      });
    });
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
}
.header {
  line-height: 30px;

  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  align-items: center;
}
.box {
  width: 100%;
  height: 300px;
}
</style>