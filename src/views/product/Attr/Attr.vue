<template>
  <div class="attr">
    <el-card style="margin:20px 0">
      <Category @changeId="changeId"/>
    </el-card>
    <el-card>
      <el-button type="primary" plain icon="el-icon-plus">添加</el-button>
      <el-table :data="attrList" border style="margin-top: 20px">
        <el-table-column align="center" type="index" label="序号" width="80"></el-table-column>
        <el-table-column prop="attrName" align="center" label="属性名称" width="200"></el-table-column>
        <el-table-column align="center" label="属性值列表" width="auto">
          <template slot-scope="{row,$index}">
            <el-tag style="margin-right:5px" type="success" v-for="(item,index) in row.attrValueList" :key="item.id">{{item.valueName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="{row,$index}">
            <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  name:"Attr",
  data(){
    return {
      category1Id:'',
      category2Id:'',
      category3Id:'',
      attrList:[]
    }
  },
  methods:{
    // 选择三级分类时，请求数据
    async changeId(data){
      this.category1Id = data.category1Id
      this.category2Id = data.category2Id
      this.category3Id = data.category3Id
      let res =await this.$PAPI.getAttr(this.category1Id,this.category2Id,this.category3Id)
      if (res){
        // console.log(res)
        this.attrList = res.data
      }
    }
  }
}
</script>

<style scoped>

</style>