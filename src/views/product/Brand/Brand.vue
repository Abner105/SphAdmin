<template>
  <div class="brand">
    <el-button icon="el-icon-plus" type="primary" plain @click="addDialog"
      >添加</el-button
    >
    <el-table border style="margin-top: 20px" :data="list">
      <el-table-column align="center" label="序号" width="80px">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        prop="tmName"
        align="center"
        label="品牌名称"
      ></el-table-column>
      <el-table-column prop="logoUrl" align="center" label="品牌LOGO">
        <template slot-scope="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt=""
            style="width: 100px; max-height: 50px"
          />
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="{ row, $index }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="updateDialog(row)"
            >修改</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="deleteBrand(row, $event)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      style="margin:20px 50px; text-align: center"
      :total="total"
      :current-page="pageNo"
      :page-sizes="[5, 10, 20]"
      :page-size="limit"
      layout="prev, pager, next, jumper, ->, sizes,total, slot"
      @current-change="getData"
      @size-change="changeSize"
    ></el-pagination>
    <!-- 对话框 -->
    <el-dialog
      :title="this.tmForm.id ? '修改品牌' : '添加品牌'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="tmForm" :rules="rules" ref="ruleFrom">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            autocomplete="off"
            style="width: 60%"
            v-model="tmForm.tmName"
          ></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item
          label="上传LOGO"
          label-width="100px"
          prop="logoUrl"
          ref="imgUpload"
        >
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="imgChange"
          >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUpdate">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Brand",
  data() {
    // 自定义验证
    // var valiIcon = (rule, value, callback) => {
    //   // 图片验证
    //   if (!this.tmForm.logoUrl) {
    //     callback(new Error("请上传图片"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      pageNo: 1,
      limit: 5,
      total: 10,
      list: [],
      // 控制对话框的显示
      dialogFormVisible: false,
      tmForm: {
        // 上传的图片地址
        logoUrl: "",
        tmName: "",
        id: undefined,
      },
      rules: {
        tmName: [
          { required: true, message: "请输入品牌名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "change",
          },
        ],
        logoUrl: [{ required: true, message: "请上传图片" }],
      },
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取所有品牌信息
    async getData(page = 1) {
      this.pageNo = page;
      const { pageNo, limit } = this;
      let res = await this.$PAPI.getBrandList(pageNo, limit);
      if (res) {
        this.total = res.data.total;
        this.list = res.data.records;
      }
    },
    // 切换分页器每页显示条数
    changeSize(limit) {
      this.limit = limit;
      this.getData();
    },
    // 添加品牌展示对话框
    addDialog() {
      this.dialogFormVisible = true;
      // 每次添加品牌删除对话框中的表单数据
      this.tmForm.tmName = "";
      this.tmForm.logoUrl = "";
      this.tmForm.id = 0;
    },
    // 修改品牌展示对话框
    updateDialog(row) {
      this.dialogFormVisible = true;
      // 深拷贝品牌信息
      this.tmForm = { ...row };
    },
    // 上传图片成功
    handleAvatarSuccess(res) {
      if (res.code == 200) {
        this.tmForm.logoUrl = res.data;
      } else {
        this.$message.error(res.message);
      }
    },
    // 上传图片之前的判断（验证图片格式）
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 点击确定发送请求添加或删除品牌
    addUpdate() {
      this.$refs.ruleFrom.validate(async (res) => {
        if (res) {
          this.dialogFormVisible = false;
          let res = await this.$PAPI.updateAddBrand(this.tmForm);
          // console.log(res)
          if (res) {
            this.$message({
              message: this.tmForm.id ? "修改品牌成功" : "添加品牌成功",
              type: "success",
            });
            this.getData(this.tmForm.id ? this.pageNo : 1);
          }
        }
      });
    },
    // 图片验证，图片存在，清空提示语
    imgChange() {
      if (this.tmForm.logoUrl) {
        this.$refs.imgUpload.clearValidate();
      }
    },
    // 删除品牌
    deleteBrand(row, evt) {
      // 手动清除按钮的选中状态
      let target = evt.target;
      if (target.nodeName != "BUTTON") {
        target = evt.target.parentNode;
      }
      target.blur();
      // 弹窗提示是否删除按钮
      this.$confirm(`是否确认删除${row.tmName}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          // 发送请求删除品牌
          let res = await this.$PAPI.delBrand(row.id);
          if (res) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getData(this.list.length>1?this.pageNo:this.pageNo-1)
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>