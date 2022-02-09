<template>
  <div class="sku">
    <el-table border :data="skuList">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="名称" prop="skuName"></el-table-column>
      <el-table-column label="描述" prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片">
        <template slot-scope="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量(千克)" prop="weight"></el-table-column>
      <el-table-column label="价格(元)" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="{ row, $index }">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      page: 1,
      limit: 5,
      skuList: [],
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList(page = 1) {
      this.page = 1;
      let res = await this.$PAPI.getSkuList(this.page, this.limit);
      if (res) {
        this.skuList = res.data.records;
      }
    },
  },
};
</script>

<style scoped>
</style>