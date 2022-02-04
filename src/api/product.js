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
