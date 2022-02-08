<template>
  <el-form label-width="120px" :model="skuInfo">
    <el-form-item label="SPU名称">{{ spuName }}</el-form-item>
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model.trim="skuInfo.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格（元）">
      <el-input
        placeholder="价格（元）"
        v-model.trim="skuInfo.price"
        type="number"
      ></el-input> </el-form-item
    ><el-form-item label="重量（千克）">
      <el-input
        placeholder="重量（千克）"
        v-model.trim="skuInfo.weight"
      ></el-input> </el-form-item
    ><el-form-item label="规格描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="规格描述"
        v-model.trim="skuInfo.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性" v-if="attrList.length">
      <el-form inline label-width="80">
        <el-form-item
          :label="attr.attrName"
          v-for="attr in attrList"
          :key="attr.id"
        >
          <el-select v-model="attr.attrIdAndValueId">
            <el-option
              :label="attrValue.valueName"
              :value="`${attr.id}:${attrValue.id}`"
              v-for="attrValue in attr.attrValueList"
              :key="attrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性" v-if="saleAttrList.length">
      <el-form inline label-width="80">
        <el-form-item
          :label="saleAttr.saleAttrName"
          v-for="saleAttr in saleAttrList"
          :key="saleAttr.id"
        >
          <el-select v-model="saleAttr.saleAttrIdAndValueId">
            <el-option
              :label="saleAttrValue.saleAttrValueName"
              :value="`${saleAttr.id}:${saleAttrValue.id}`"
              v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
              :key="saleAttrValue.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片列表" v-if="imgList.length">
      <el-table border :data="imgList"  @selection-change="chooseImg">
        <el-table-column
          type="selection"
          width="80"
          align="center"
        ></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="{ row, $index }">
            <img style="width: 80px; height: 80px" :src="row.imgUrl" alt="" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row, $index }">
            <el-button
              plain
              type="primary"
              v-if="!row.isDefault"
              @click="changeDefault(row,$index)"
              >设为默认</el-button
            >
            <el-button plain ref="$index" type="success" v-else>默认</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button plain type="primary" @click="saveSkuInfo">保存</el-button>
      <el-button @click="$emit('changScene', { scene: 0, type: '' })"
        >取消</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 图片列表
      imgList: [],
      // 平台属性列表
      attrList: [],
      // 销售属性列表
      saleAttrList: [],
      // spuname,用于显示
      spuName: "",
      // 收集参数
      skuInfo: {
        category3Id: 0,
        price: "",
        skuDesc: "",
        skuName: "",
        weight: "",
        spuId: 0,
        tmId: 0,
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        // 默认图片
        skuDefaultImg: "",
        // 图片列表
        skuImageList: [
          {
            id: 0,
            imgName: "string",
            imgUrl: "string",
            isDefault: "string",
            spuImgId: 0,
          },
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrValueId: 0,
          // },
        ],
      },
    };
  },
  methods: {
    // 初始化sku页面
    async initSku(category1Id, category2Id, category3Id, row) {
      // 恢复初始数据
      Object.assign(this._data,this.$options.data())
      // 收集参数
      this.spuName = row.spuName;
      this.skuInfo.category3Id = category3Id;
      this.skuInfo.spuId = row.id;
      this.skuInfo.tmId = row.tmId;
      // 获取平台属性
      let p1 = this.$PAPI.getAttr(category1Id, category2Id, category3Id);
      // 获取销售属性
      let p2 = this.$PAPI.getSaleAttrList(row.id);
      // 获取图片列表
      let p3 = this.$PAPI.getSpuImg(row.id);
      // 同步执行以上请求，性能优化
      let res = await Promise.all([p1, p2, p3]);
      if (res) {
        this.attrList = res[0].data;
        this.saleAttrList = res[1].data;
        let imgListTem = res[2].data;
        imgListTem.forEach((item) => {
          item.isDefault = 0;
        });
        this.imgList = imgListTem;
      }
    },
    // 设置默认图片
    changeDefault(row,index) {
      // 设置默认
      this.imgList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      // 默认按钮失焦
      // this.$refs[index].blur()
      // 收集默认图片参数
      this.skuInfo.skuDefaultImg = row.imgUrl;
    },
    // 选择图片，整理图片的参数
    chooseImg(imgList){
      this.skuInfo.skuImageList = imgList
    },
    // 点击保存，整理参数，发送请求
    async saveSkuInfo() {
      // 整理平台属性
      this.skuInfo.skuAttrValueList = this.attrList.reduce((pre, item) => {
        if (item.attrIdAndValueId) {
          let [attrId, valueId] = item.attrIdAndValueId.split(":");
          pre.push({ attrId, valueId });
          return pre;
        }
        return pre;
      }, []);
      // 整理销售属性
      this.skuInfo.skuSaleAttrValueList = this.saleAttrList.reduce((pre, item) => {
        if (item.saleAttrIdAndValueId) {
          let [saleAttrId,saleAttrValueId] = item.saleAttrIdAndValueId.split(":");
          pre.push({ saleAttrId,saleAttrValueId});
          return pre;
        }
        return pre;
      }, []);
      // 发送请求
      let res = await this.$PAPI.saveSku(this.skuInfo)
      if (res){
        this.$message({
          type:"success",
          message:"保存成功"
        })
        this.$emit("changScene",{scene:0,type:""})
      }
      // console.log(res)
    },
  },
};
</script>

<style>
</style>