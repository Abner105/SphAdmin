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
  </el-card>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      radio1: "",
    };
  },
};
</script>

<style scoped>
.box-card {
  width: 100%;
}
.header {
  line-height:30px;

  display: flex;
  width: 100%;
  justify-content: space-between;
  font-size: 16px;
  align-items: center;
}
</style>