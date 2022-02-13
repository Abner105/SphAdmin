<template>
  <el-row> 
    <el-col :span="12"  class="container"> 
      <category />
    </el-col>
    <el-col :span="12"  class="container">
      <sale />
    </el-col>
  </el-row>
</template>

<script>
import Category from './Category/Category.vue';
import Sale from './Sale/Sale.vue';
export default {
  components: { Category, Sale },
  name: "Observe",
};
</script>

<style scoped>
.container{
  padding: 5px;
}
</style>