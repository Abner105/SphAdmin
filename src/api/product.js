import request from '@/utils/request'
// 获取品牌数据
export const getBrandList = (page,limit)=>request({url:`/admin/product/baseTrademark/${page}/${limit}`,method:"get"})
// 添加或者修改品牌
export const updateAddBrand = (data)=>{
  // 修改品牌
  if (data.id){
    return request({url:"/admin/product/baseTrademark/update",method:"put",data})
  }else{  //添加品牌
    return request({url:"/admin/product/baseTrademark/save",method:"post",data})
  }
}
// 删除品牌
export const delBrand=(id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:"delete"})

// 获取一级分类的数据
export const getCategory1 = ()=>request({url:"/admin/product/getCategory1",method:"get"})
// 获取二级分类的数据
export const getCategory2=(category1Id)=>request({url:`/admin/product/getCategory2/${category1Id}`,method:"get"})
// 获取三级分类的数据
export const getCategory3=(category2Id)=>request({url:`/admin/product/getCategory3/${category2Id}`,method:"get"})

// 获取商品属性值
// GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const getAttr = (category1Id,category2Id,category3Id)=>request({url:`/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,method:"get"})
// 修改或添加属性
export const updateAddAttr=(data)=>request({url:"/admin/product/saveAttrInfo",method:"post",data})

// 获取SPU的列表信息
export const getSpu = (page,limit,category3Id)=>request({url:`/admin/product/${page}/${limit}?category3Id=${category3Id}`})
// 获取单个SPU的信息
export const getSpuOne = (spuId)=>request({url:`/admin/product/getSpuById/${spuId}`,method:"get"})
// 获取品牌列表GET 
export const getTrademarkList=()=>request({url:"/admin/product/baseTrademark/getTrademarkList",method:"get"})
// 获取销售属性列表GET /admin/product/baseSaleAttrList
export const getSaleAttr=()=>request({url:"/admin/product/baseSaleAttrList",method:"get"})
// 获取spu图片GET /admin/product/spuImageList/{spuId}
export const getSpuImg=(spuId)=>request({url:`/admin/product/spuImageList/${spuId}`,method:"get"})
// 新增或者修改Spu
export const addOrUpdateSpu=(data)=>{
  if (data.id){
    return request({url:"/admin/product/updateSpuInfo",method:"post",data})
  }else{
    return request({url:"/admin/product/saveSpuInfo",method:"post",data})
  }
}
// 删除SPU
export const deleteSpu = (spuId)=>request({url:`/admin/product/deleteSpu/${spuId}`,method:"delete"})
// 获取销售属性列表
export const getSaleAttrList = (spuId)=>request({url:`/admin/product/spuSaleAttrList/${spuId}`,method:"get"})
// 保存sku属性
export const saveSku = (data)=>request({url:"/admin/product/saveSkuInfo",method:"post",data})
// 获取sku信息
export const getSkuInfo = (spuId)=>request({url:`/admin/product/findBySpuId/${spuId}`,method:"get"})

// 获取SKU列表
export const getSkuList = (page,limit)=>request({url:`/admin/product/list/${page}/${limit}`,method:"get"})