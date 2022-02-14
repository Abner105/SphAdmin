<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="header">
        <span>线上热门搜索</span>
        <el-dropdown>
          <i class="el-icon-more"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
    <el-table border :data="tableData" style="width: 100%; margin: 10px 0">
      <el-table-column type="index" label="排名" width="80"> </el-table-column>
      <el-table-column label="搜索关键字" width="180"> </el-table-column>
      <el-table-column label="用户数" sortable> </el-table-column>
      <el-table-column label="周涨幅" sortable> </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="text-align: right"
      :total="1000"
      :current-page="1"
      layout="prev, pager, next"
    ></el-pagination>
  </el-card>
</template>

<script>
import LineChart from "./LineChart.vue";
export default {
  components: { LineChart },
  name: "Category",
  data() {
    return {
      tableData: [1],
    };
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
}
.header {
  line-height: 30px;
  align-items: center;

  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
}
</style>