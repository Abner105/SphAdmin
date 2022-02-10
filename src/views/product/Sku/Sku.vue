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
      <el-table-column label="操作" width="300px">
        <template slot-scope="{ row, $index }">
          <el-switch
            active-color="#13ce66"
            :value="row.isSale == 1"
            style="margin: 0 10px"
            @change="onOrCancelSale(row.id, $event)"
          >
          </el-switch>
          <el-button type="primary" plain icon="el-icon-edit"></el-button>
          <el-button
            type="info"
            plain
            icon="el-icon-info"
            @click="openSkuInfo(row, $event)"
          ></el-button>
          <el-button type="danger" plain icon="el-icon-delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin: 20px 50px; text-align: center"
      :total="total"
      :current-page="page"
      :page-sizes="[5, 10, 20]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes,total, slot"
      @current-change="getSkuList"
      @size-change="changeSize"
    ></el-pagination>
    <!-- 抽屉，展示sku信息 -->
    <el-drawer
      size="50%"
      :visible.sync="drawer"
      :direction="direction"
      :show-close="false"
      style="font-size: 22px"
    >
      <el-row style="margin: 50px 0">
        <el-col :span="6" style="text-align: center; font-weight: 900"
          ><div>名 称:</div></el-col
        >
        <el-col :span="12"
          ><div>{{ skuInfo.skuName }}</div></el-col
        >
      </el-row>
      <el-row style="margin: 50px 0">
        <el-col :span="6" style="text-align: center; font-weight: 900"
          ><div>描 述:</div></el-col
        >
        <el-col :span="12"
          ><div>{{ skuInfo.skuDesc }}</div></el-col
        >
      </el-row>
      <el-row style="margin: 50px 0">
        <el-col :span="6" style="text-align: center; font-weight: 900"
          ><div>价 格:</div></el-col
        >
        <el-col :span="12"
          ><div>{{ skuInfo.price }} 元</div></el-col
        >
      </el-row>
      <el-row style="margin: 50px 0">
        <el-col :span="6" style="text-align: center; font-weight: 900"
          ><div>平 台 属 性:</div></el-col
        >
        <el-col :span="12"
          ><div>
            <el-tag
              style="margin: 0 5px"
              type="success"
              v-for="(value, index) in skuInfo.skuAttrValueList"
              >{{ value.attrName }}-{{ value.valueName }}</el-tag
            >
          </div></el-col
        >
      </el-row>
      <el-row style="margin: 50px 0">
        <el-col :span="6" style="text-align: center; font-weight: 900"
          ><div>商 品 图 片:</div></el-col
        >
        <el-col :span="12"
          ><div class="block">
            <el-carousel >
              <el-carousel-item v-for="item in skuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="width:100%">
              </el-carousel-item>
            </el-carousel>
          </div></el-col
        >
      </el-row>
    </el-drawer>
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
      total: 0,
      direction: "rtl", //抽屉方向，从右网左
      drawer: false, // 控制抽屉的显示
      skuInfo: {},
    };
  },
  mounted() {
    this.getSkuList();
  },
  methods: {
    async getSkuList(page = 1) {
      this.page = page;
      let res = await this.$PAPI.getSkuList(this.page, this.limit);
      if (res) {
        this.skuList = res.data.records;
        this.total = res.data.total;
      }
    },
    changeSize(limit) {
      this.limit = limit;
      this.getSkuList();
    },
    // 商品上下架
    async onOrCancelSale(id, value) {
      // 为真 上架
      if (value) {
        let res = await this.$PAPI.onSale(id);
        if (res) this.getSkuList();
      } else {
        // 下架
        let res = await this.$PAPI.downSale(id);
        if (res) this.getSkuList();
      }
    },
    async openSkuInfo(row, event) {
      // 让按钮失去焦点
      let target = event.target;
      if (target.tagName != "BUTTON") {
        target = target.parentNode;
      }
      target.blur();
      // 展示抽屉
      this.drawer = true;
      // 发送请求获取抽屉的信息
      let res = await this.$PAPI.getSku(row.id);
      if (res) {
        this.skuInfo = res.data;
      }
    },
  },
};
</script>
<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
</style>
<style scoped>
</style>