<template>
  <el-card class="card">
    <div class="header">
      <span>{{ data.title }}</span>
      <i class="el-icon-warning-outline"></i>
    </div>
    <div class="content">{{ data.number }}</div>
    <div class="chart">
      <slot name="chart"></slot>
    </div>
    <div class="foot">{{ data.floor }}</div>
  </el-card>
</template>

<script>
export default {
  name: "Detail",
  props:["data"],
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  color: #888;
}
.chart {
  height: 60px;
  line-height: 60px;
  margin: 0 6px 10px;
  border-bottom: 1px solid #eee;
}
.content{
  font-size: 28px;
  margin-top: 3px;
}
</style>