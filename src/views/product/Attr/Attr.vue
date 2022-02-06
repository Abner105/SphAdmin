<template>
  <div class="attr">
    <el-card style="margin: 20px 0">
      <Category @changeId="changeId" :show="isShowAdd"/>
    </el-card>
    <el-card>
      <div v-show="!isShowAdd">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addAttr"
          >添加属性</el-button
        >
        <el-table :data="attrList" border style="margin-top: 20px" max-height="630px">
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
            
          ></el-table-column>
          <el-table-column
            prop="attrName"
            align="center"
            label="属性名称"
            width="200"
          ></el-table-column>
          <el-table-column align="center" label="属性值列表" width="auto">
            <template slot-scope="{ row, $index }">
              <el-tag
                style="margin-right: 5px"
                type="success"
                v-for="(item, index) in row.attrValueList"
                :key="item.id"
                >{{ item.valueName }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="{ row, $index }">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="updateAttr(row)"
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="isShowAdd">
        <el-form :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input
              placeholder="请输入属性名"
              v-model.trim="attrInfo.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          :disabled="!attrInfo.attrName"
          @click="addAttrValue"
          >添加属性值</el-button
        >
        <!-- <el-button>取消</el-button> -->
        <el-table border style="margin: 20px 0" :data="attrInfo.attrValueList">
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="100"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template slot-scope="{ row, $index }">
              <el-input
                placeholder="请输入属性值"
                size="mini"
                v-model.trim="row.valueName"
                v-show="isShowInput == $index"
                :ref="$index"
                @blur="inputBlur(row)"
              ></el-input>
              <span
                v-show="isShowInput != $index"
                style="width: 500px; height: 20px; display: block"
                @click="spanClick($index)"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="300">
            <template slot-scope="{ row, $index }">
              <el-popconfirm :title="`确定删除${row.valueName}吗？`" @onConfirm="deleteAttrValue($index)">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  plain
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" plain @click="addOrUpdateAttr" :disabled="!attrInfo.attrName || attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowAdd = false">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      category3Id: "",
      attrList: [], // 所有属性列表
      // 是否展示添加属性页面
      isShowAdd: false,
      // 某个属性的相关信息，收集参数，用于新增和修改属性请求的参数
      attrInfo: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
        id: undefined,
      },
      // 控制显示某一行的input,默认都不显示，判断isShowInput==index
      isShowInput: -1,
    };
  },
  methods: {
    // 获取属性列表数据
    async getAttrList() {
      let res = await this.$PAPI.getAttr(
        this.category1Id,
        this.category2Id,
        this.category3Id
      );
      if (res) {
        this.attrList = res.data;
      }
    },
    // 选择三级分类时，请求数据
    changeId(data) {
      this.category1Id = data.category1Id;
      this.category2Id = data.category2Id;
      this.category3Id = data.category3Id;
      this.getAttrList();
    },
    // 点击添加属性按钮
    addAttr() {
      // 显示添加属性页面
      this.isShowAdd = true;
      // 清空页面的所有数据 , 保存参数中三级分类的ID
      this.attrInfo = {
        attrName: "",
        attrValueList: [],
        categoryId: this.category3Id,
        categoryLevel: 3,
        id: undefined,
      };
    },
    // 点击修改属性按钮
    updateAttr(row) {
      this.isShowAdd = true;
      this.attrInfo = cloneDeep(row);
    },
    // 点击添加属性值按钮
    addAttrValue() {
      // 收集参数中添加一列属性值
      this.attrInfo.attrValueList.push({
        attrId: this.attrInfo.id,
        id: undefined,
        valueName: "",
      });
      // 最后一列显示为input框
      this.isShowInput = this.attrInfo.attrValueList.length - 1;
      // 最后一列input自动获取焦点
      this.$nextTick(() => {
        this.$refs[this.isShowInput].focus();
      });
    },
    // 输入框失去焦点或点击回车，不显示input框
    inputBlur(row) {
      // 所有行都不显示input框
      this.isShowInput = -1;
      // 判断输入的值是否合法，是否是空串，是否是有重复
      if (row.valueName.trim() == "") {
        this.$message.error("属性值不能为空");
        return false;
      }
      let isRepeat = this.attrInfo.attrValueList.some((item) => {
        if (row != item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepeat) {
        // 属性值重复，清空属性值并提示重复
        row.valueName = "";
        this.$message.error("属性值重复");
        return false;
      }
    },
    // 点击span显示input框
    spanClick(index) {
      // 显示input框
      this.isShowInput = index;
      // input框自动获取焦点,点击span的时候input被隐藏了，需要使用nexttick
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    //点击删除属性值的确定按钮
    deleteAttrValue(index) {
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 点击保存，发送请求，回到属性值列表页面
    async addOrUpdateAttr(){
      // 属性名称为空，不能保存
      if(!this.attrInfo.attrName){
        this.$message.error("属性名称不能为空")
        return
      }
      // 整理参数，去除为空的属性值
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item=>item.valueName)
      // 发送请求添加/修改属性值
      let res =await this.$PAPI.updateAddAttr(this.attrInfo)
      if(res){
        // 保存成功，并返回和获取属性值列表
        this.getAttrList()
        this.$message({
          type:"success",
          message:"保存成功"
        })
        this.isShowAdd=false
        return
      }
      this.$message.error("保存失败")
    }
  },
};
</script>

<style scoped>
</style>