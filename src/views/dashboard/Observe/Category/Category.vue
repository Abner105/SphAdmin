<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="header">
        <span>线上热门搜索</span>
        <i class="el-icon-more"></i>
      </div>
      
    </div>
    <el-row>
      <el-col :span="12">
        <line-chart title="搜索用户数" :number="12235" />
      </el-col>
      <el-col :span="12">
        <line-chart title="人均搜索次数" :number="6341" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import LineChart from './LineChart.vue';
export default {
  components: { LineChart },
  name: "Category",
};
</script>

<style scoped>
.box-card {
  width: 100%;
}
.header {
  line-height:30px;
  align-items: center;

  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
}
</style>