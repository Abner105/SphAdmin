<template>
  <div>
    <el-form :inline="true" class="demo-form-inline" :model="ruleFrom">
      <el-form-item label="一级分类" style="padding: 0 20px">
        <el-select
          placeholder="请选择"
          v-model="category1Id"
          @change="c1change"
          :disabled="show"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="(c1, index) in ruleFrom.category1List"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" style="padding: 0 20px">
        <el-select
          placeholder="请选择"
          v-model="category2Id"
          @change="c2change"
          :disabled="show"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="(c2, index) in ruleFrom.category2List"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" style="padding: 0 20px">
        <el-select
          placeholder="请选择"
          v-model="category3Id"
          @change="c3change"
          :disabled="show"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="(c3, index) in ruleFrom.category3List"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Category",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      ruleFrom: {
        category1List: [],
        category2List: [],
        category3List: [],
      },
    };
  },
   // 如果再添加/修改属性值列表，选择框置灰
  props:["show"],
  mounted() {
    // 获取一级分类的数据
    this.$PAPI.getCategory1().then((res) => {
      // console.log(res);
      if (res) {
        this.ruleFrom.category1List = res.data;
      }
    });
  },
  methods: {
    // 分类1选中改变
    async c1change() {
      this.category2Id = "";
      this.category3Id = "";
      this.ruleFrom.category2List = "";
      this.ruleFrom.category3List = "";
      let res = await this.$PAPI.getCategory2(this.category1Id);
      if (res) {
        this.ruleFrom.category2List = res.data;
      }
    },
    async c2change() {
      this.category3Id = "";
      this.ruleFrom.category3List = "";
      let res = await this.$PAPI.getCategory3(this.category2Id);
      if (res) {
        this.ruleFrom.category3List = res.data;
      }
    },
    c3change() {
      const { category1Id, category2Id, category3Id } = this;
      let data = {
        category1Id,
        category2Id,
        category3Id,
      };
      this.$emit("changeId",data)
    },
  },
};
</script>

<style>
</style>