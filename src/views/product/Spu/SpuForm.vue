<template>
  <el-form label-width="80px" :model="spuInfo">
    <el-form-item label="SPU名称">
      <el-input
        placeholder="请输入SPU名称"
        v-model="spuInfo.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="品牌名称">
      <el-select value="" placeholder="请选择品牌" v-model="spuInfo.tmId">
        <el-option
          :value="tm.id"
          :label="tm.tmName"
          v-for="tm in trademarkList"
          :key="tm.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        rows="4"
        placeholder="请输入SPU描述"
        v-model="spuInfo.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU图片">
      <el-upload
        action="/dev-api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :file-list="spuImg"
        :on-success="successUpload"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-select
        value=""
        :placeholder="`还有${unselect.length}个未选择`"
        v-model="attrSelect"
      >
        <el-option
          :label="item.name"
          :value="`${item.id}:${item.name}`"
          v-for="item in unselect"
          :key="item.id"
        ></el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-plus"
        plain
        style="margin: 0 10px"
        :disabled="!attrSelect"
        @click="addSaleAttr"
        >添加销售属性</el-button
      >
      <el-table border style="margin-top: 10px" :data="spuInfo.spuSaleAttrList">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="80"
        ></el-table-column>
        <el-table-column
          label="属性名"
          width="200"
          prop="saleAttrName"
        ></el-table-column>
        <el-table-column label="属性值名称列表">
          <template slot-scope="{ row, $index }">
            <el-tag
              :key="tag.id"
              v-for="(tag, index) in row.spuSaleAttrValueList"
              closable
              :disable-transitions="false"
              @close="handleClose(row, index)"
            >
              {{ tag.saleAttrValueName }}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="isInputAndButton == $index"
              v-model.trim="inputValue"
              :ref="$index"
              size="small"
              @keyup.enter.native="$event.target.blur"
              @blur="handleInputConfirm(row, $index)"
            >
            </el-input>
            <el-button
              v-else
              class="button-new-tag"
              size="small"
              @click="addSaleAttrValue(row, $index)"
              >+ 添加</el-button
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="{ $index }">
            <el-button
              icon="el-icon-delete"
              type="danger"
              size="mini"
              @click="deleteSaleAttr($index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" plain @click="addAddUpdateAttr">保存</el-button>
      <el-button @click="$emit('changScene', {scene:0,type:''})">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "SpuForm",
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false, //是否显示大图
      // 用于收集展示spu的信息
      spuInfo: {
        category3Id: 0,
        description: "",
        tmId: "",
        id: 0,
        spuName: "",
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ],
      },
      // 品牌列表
      trademarkList: [],
      // 销售属性列表
      saleAttr: [],
      // 图片列表
      spuImg: [],
      // 收集选择的销售属性信息
      attrSelect: "",
      // 用于控制添加按钮与input框的显示与隐藏，默认谁也没有选中
      isInputAndButton: -1,
      // input框输入的销售属性值
      inputValue: "",
    };
  },
  computed: {
    unselect() {
      return this.saleAttr.filter((item) => {
        return !this.spuInfo.spuSaleAttrList.some((item1) => {
          return item.name == item1.saleAttrName;
        });
      });
    },
  },
  methods: {
    // 删除图片，重新收集图片
    handleRemove(file, fileList) {
      this.spuImg = fileList;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 新增图片成功，重新收集图片
    successUpload(res, file, fileList) {
      this.spuImg = fileList;
    },
    // 每次进入该页面 请求拿回相关数据
    async initSpuForm(id, type) {
      // 清空数据,恢复为初始化数据
      Object.assign(this._data, this.$options.data());
      // 获取品牌选项
      let trademarkList = await this.$PAPI.getTrademarkList();
      if (trademarkList) this.trademarkList = trademarkList.data;
      // 获取销售属性选项
      let saleAttr = await this.$PAPI.getSaleAttr();
      if (saleAttr) this.saleAttr = saleAttr.data;

      // 添加spu
      if (type == "add") {
        // 设置三级分类ID
        this.spuInfo.category3Id = id;

      // 修改spu
      } else {   
        // 获取spuInfo
        let spuInfo = await this.$PAPI.getSpuOne(id);
        if (spuInfo) this.spuInfo = spuInfo.data;

        // 获取spu图片
        let spuImg = await this.$PAPI.getSpuImg(id);
        // 处理获取到的图片信息，element必须加上url与那么属性才能显示到页面上
        if (spuImg) {
          let temArr = spuImg.data;
          temArr.forEach((item) => {
            item.name = item.imgName;
            item.url = item.imgUrl;
          });
          this.spuImg = temArr;
        }
      }
    },
    // 点击添加销售属性
    addSaleAttr() {
      let [baseSaleAttrId, saleAttrName] = this.attrSelect.split(":");
      // 清空销售属性select的选择状态
      this.attrSelect = "";
      this.spuInfo.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: [],
      });
    },
    // 点击添加属性值的添加按钮
    addSaleAttrValue(row, index) {
      // 显示input框隐藏button按钮
      this.isInputAndButton = index;
      // input框自动获取焦点
      this.$nextTick(() => {
        this.$refs[index].focus();
      });
    },
    // 添加属性值的input框失去焦点事件
    handleInputConfirm(row) {
      // 显示button
      this.isInputAndButton = -1;
      // 判断input框的输入是否正确，不能为空，且不能重复
      if (this.inputValue == "") {
        this.$message.error("属性值不能为空");
        return;
      }
      // 判断是否与其他属性重复
      let isRepeat = row.spuSaleAttrValueList.some(
        (item) => item.saleAttrValueName == this.inputValue
      );
      if (isRepeat) {
        this.$message.error("属性值重复");
        this.inputValue = ""; //清空输入框
        return;
      }
      // 整理需要添加的属性值
      let temArrValue = {
        baseSaleAttrId: row.baseSaleAttrId,
        saleAttrValueName: this.inputValue,
      };
      // 添加到属性值列表
      row.spuSaleAttrValueList.push(temArrValue);
      // 清空input框
      this.inputValue = "";
    },
    // 删除属性值
    handleClose(row, index) {
      row.spuSaleAttrValueList.splice(index, 1);
    },
    // 删除属性
    deleteSaleAttr(index) {
      this.spuInfo.spuSaleAttrList.splice(index, 1);
    },
    // 点击保存，修改或新增属性
    async addAddUpdateAttr() {
      // 整理参数，主要是图片参数
      this.spuInfo.spuImageList = this.spuImg.map((item) => {
        console.log(item);
        return {
          imgName: item.name,
          imgUrl: item.imgUrl || item.response.data,
        };
      });
      // 发送请求，修改或增加spu
      let res = await this.$PAPI.addOrUpdateSpu(this.spuInfo);
      if (res) {
        this.$message({
          type: "success",
          message: "保存成功",
        });
        // 保存成功，提示切换到场景0
        this.$emit("changScene", {scene:0,type:this.spuInfo.id?"edit":"add"});
      }
    },
  },
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>