<template>
  <el-form label-width="120px">
    <el-form-item label="SPU名称">海</el-form-item>
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称"></el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input placeholder="价格（元）"></el-input> </el-form-item
    ><el-form-item label="重量（千克）">
      <el-input placeholder="重量（千克）"></el-input> </el-form-item
    ><el-form-item label="规格描述">
      <el-input type="textarea" rows="4" placeholder="规格描述"></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form inline label-width="80">
        <el-form-item label="属性一">
          <el-select value="">
            <el-option label="11" value="11"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form inline label-width="80">
        <el-form-item label="属性一">
          <el-select value="">
            <el-option label="11" value="11"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表">
      <el-table border>
        <el-table-column type="selection" width="80" align="center"></el-table-column>
        <el-table-column label="图片"></el-table-column>
        <el-table-column  label="名称"></el-table-column>
        <el-table-column label="操作"></el-table-column>

      </el-table>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",
  methods: {
    initSku(row) {
      console.log(row);
    },
  },
};
</script>

<style>
</style>