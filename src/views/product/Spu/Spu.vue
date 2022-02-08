<template>
  <div class="spu">
    <!-- 三级联动列表 -->
    <el-card style="margin: 20px 0">
      <Category @changeId="changeId" :show="scene != 0" />
    </el-card>
    <!-- spu列表、添加spu与sku页面 -->
    <el-card>
      <!-- spu列表 -->
      <div v-show="scene == 0">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          :disabled="!category3Id"
          @click="addSpu"
          >添加SPU</el-button
        >
        <el-table
          border
          style="margin-top: 20px"
          max-height="550px"
          :data="spuList"
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            width="80"
          ></el-table-column>
          <el-table-column
            prop="spuName"
            align="center"
            label="SPU名称"
            width="400"
          ></el-table-column>
          <el-table-column
            align="center"
            label="SPU描述"
            width="auto"
            prop="description"
          >
          </el-table-column>
          <el-table-column align="center" label="操作" width="400">
            <template slot-scope="{ row, $index }">
              <el-button
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加SKU"
                @click="addSku(row)"
              ></el-button>
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改SPU"
                @click="editSpu(row)"
              ></el-button>
              <el-button
                title="查看SPU的所有SKU"
                type="info"
                icon="el-icon-info"
                size="mini"
              ></el-button>
              <el-popconfirm
                :title="`确定要删除${row.spuName}吗？`"
                @onConfirm="delSpu(row)"
                style="margin-left: 8px"
              >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  title="删除SPU"
                  slot="reference"
                ></el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin: 20px 50px; textalign: center"
          :total="total"
          :current-page="page"
          :page-sizes="[5, 10, 20]"
          :page-size="limit"
          @current-change="getSpuList"
          @size-change="changeSize"
          layout="prev, pager, next, jumper, ->, sizes,total, slot"
        ></el-pagination>
      </div>
      <!-- 添加/修改SPU -->
      <spu-form v-show="scene == 1" ref="SpuForm" @changScene="changScene" />
      <!-- 添加SKU -->
      <sku-form v-show="scene == 2" ref="sku" @changScene="changScene"/>
    </el-card>
  </div>
</template>

<script>
import SkuForm from "./SkuForm.vue";
import SpuForm from "./SpuForm.vue";
export default {
  components: { SpuForm, SkuForm },
  name: "Spu",
  data() {
    return {
      category1Id: "",
      category2Id: "",
      spuList: [],
      category3Id: "",
      page: 1,
      limit: 5,
      total: 0,
      scene: 0, // 0 显示spu列表，1 显示添加spu表单，2 显示添加sku表单
    };
  },
  methods: {
    // 三级联动获取到3ID时，发送请求获取数据
    changeId(data) {
      this.category1Id = data.category1Id;
      this.category2Id = data.category2Id;
      this.category3Id = data.category3Id;
      this.getSpuList();
    },
    // 发送获取spulist与total的请求
    async getSpuList(page = 1) {
      this.page = page;
      let res = await this.$PAPI.getSpu(
        this.page,
        this.limit,
        this.category3Id
      );
      if (res) {
        this.spuList = res.data.records;
        this.total = res.data.total;
      }
    },
    // 改变每页显示的条数
    changeSize(limit) {
      this.limit = limit;
      // 重新获取数据
      this.getSpuList();
    },
    // 点击添加spu按钮
    addSpu() {
      this.scene = 1;
      this.$refs.SpuForm.initSpuForm(this.category3Id, "add");
    },
    // 点击修改spu按钮
    editSpu(row) {
      this.scene = 1;
      this.$refs.SpuForm.initSpuForm(row.id, "edit");
    },
    // 子组件的改变场景事件,传入要显示的场景，与添加还是修改spu
    changScene(obj) {
      this.scene = obj.scene;
      // 添加spu，取消则不传入type，不发送请求
      if (obj.type == "add") {
        this.getSpuList();

        // 修改spu
      } else if (obj.type == "edit") {
        this.getSpuList(this.page);
      }
    },
    // 删除SPU
    async delSpu(row) {
      let res = await this.$PAPI.deleteSpu(row.id);
      if (res) {
        this.$message({ type: "success", message: "删除成功" });
        this.getSpuList(this.spuList.length > 1 ? this.page : 1);
      }
    },
    // 添加sku
    addSku(row) {
      this.scene = 2;
      const { category1Id, category2Id, category3Id } = this;
      this.$refs.sku.initSku(category1Id, category2Id, category3Id,row);
    },
  },
};
</script>

<style scoped>
</style>