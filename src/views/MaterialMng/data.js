//////////////////////////物料管理页面////////////////////////////////////////////////
/**
 * 获取物料列表信息:物料名称模糊查询并分页
 * @param {*} obj={materialName,pageIndex,pageSize} 
 * @returns 
 */
export function getMaterials(obj){
  return [{materialCode:'物料编码', materialName:'物料名称1', ShortName:'物料简称1', MaterialType:'规格1', Brand:'品牌1', Supplier:'供应商1', Unit:'物料单位1'},
  {materialCode:'物料编码', materialName:'物料名称2', ShortName:'物料简称2', MaterialType:'规格2', Brand:'品牌2', Supplier:'供应商2', Unit:'物料单位2'},
  {materialCode:'物料编码', materialName:'物料名称3', ShortName:'物料简称3', MaterialType:'规格3', Brand:'品牌3', Supplier:'供应商3', Unit:'物料单位3'},
  {materialCode:'物料编码', materialName:'物料名称4', ShortName:'物料简称4', MaterialType:'规格4', Brand:'品牌4', Supplier:'供应商4', Unit:'物料单位4'},
  {materialCode:'物料编码', materialName:'物料名称5', ShortName:'物料简称5', MaterialType:'规格5', Brand:'品牌5', Supplier:'供应商5', Unit:'物料单位5'},
  {materialCode:'物料编码', materialName:'物料名称6', ShortName:'物料简称6', MaterialType:'规格6', Brand:'品牌6', Supplier:'供应商6', Unit:'物料单位6'},
  {materialCode:'物料编码', materialName:'物料名称7', ShortName:'物料简称7', MaterialType:'规格7', Brand:'品牌7', Supplier:'供应商7', Unit:'物料单位7'}
]
}

/**
 * 获取某物料库存信息
 * @param {*} obj={materialCode} 
 */
export function getMaterialStock(obj){
 return [{orgName:'组织1',minStock:'1',maxStock:'20'},
 {orgName:'组织2',minStock:'1',maxStock:'20'},
 {orgName:'组织3',minStock:'1',maxStock:'20'},
]
}
/**
 * 上传物料excel
 */
export function uploadMaterialXls(){

}
/**
 * 更新物料最大与最小库存
 *  @param {*} obj={materialCode:'',orgId:'',minStock:'',maxStock:''} 
 */
export function updateMaterialLimitStock(obj){

} 
///////////////////////库存安全预警//////////////////////////////////////////////////////////
/**
 * 获取库存安全预警:可通过物料名称模糊查询
 * @param {*} obj={materialName,pageIndex,pageSize} 
 */
export function getStockSaveWarnings(obj){
  return[{materialCode:'111',materialName:'sss',warningType:1,materialType:'200ml',stocks:"1瓶",poOrders:'',orgName:'生化'},
  {materialCode:'111',materialName:'sss',warningType:1,materialType:'200ml',stocks:"1瓶",poOrders:'',orgName:'生化'},
  {materialCode:'111',materialName:'sss',warningType:1,materialType:'200ml',stocks:"1瓶",poOrders:'',orgName:'生化'},
  {materialCode:'111',materialName:'sss',warningType:1,materialType:'200ml',stocks:"1瓶",poOrders:'',orgName:'生化'},
  {materialCode:'111',materialName:'sss',warningType:1,materialType:'200ml',stocks:"1瓶",poOrders:'',orgName:'生化'}
]
}

///////////////////////库存查询页面//////////////////////////////////////////////////////////
/**
 * 获取库存安全预警:可通过物料名称模糊查询
 * @param {*} obj={materialName,pageIndex,pageSize} 
 */
 export function getStocksDetail(obj){
  return[{materialCode:'111',materialName:'sss',materialType:'200ml',batchNo:'20220217',expireDate:'2024-1-1',stocks:"1瓶",brand:'雅培',orgName:'生化'},
  {materialCode:'111',materialName:'sss',materialType:'200ml',batchNo:'20220217',expireDate:'2024-1-1',stocks:"1瓶",brand:'雅培',orgName:'生化'},
  {materialCode:'111',materialName:'sss',materialType:'200ml',batchNo:'20220217',expireDate:'2024-1-1',stocks:"1瓶",brand:'雅培',orgName:'生化'},
  {materialCode:'111',materialName:'sss',materialType:'200ml',batchNo:'20220217',expireDate:'2024-1-1',stocks:"1瓶",brand:'雅培',orgName:'生化'},
  {materialCode:'111',materialName:'sss',materialType:'200ml',batchNo:'20220217',expireDate:'2024-1-1',stocks:"1瓶",brand:'雅培',orgName:'生化'},
]
}

///////////////////////补货查询页面//////////////////////////////////////////////////////////
/**
 * 补货记录列表:可通过物料名称模糊查询
 * @param {*} obj={materialName,pageIndex,pageSize} 
 */
 export function getPoRecordList(obj){
  return[{poNo:'补货编号  ',materialName:'sss',materialType:'200ml',poCount:"1",deliveriedCount:"已交货数量",brand:'雅培',status:1,supplier:'供应商',orgName:'生化',createDate:'2022-1-01'},
  {poNo:'111',materialName:'sss',materialType:'200ml',poCount:"1",deliveriedCount:"1",brand:'雅培',status:1,supplier:'',orgName:'生化',createDate:'2022-1-01'},
  {poNo:'111',materialName:'sss',materialType:'200ml',poCount:"1",deliveriedCount:"1",brand:'雅培',status:1,supplier:'',orgName:'生化',createDate:'2022-1-01'},
  {poNo:'111',materialName:'sss',materialType:'200ml',poCount:"1",deliveriedCount:"1",brand:'雅培',status:1,supplier:'',orgName:'生化',createDate:'2022-1-01'},
  {poNo:'111',materialName:'sss',materialType:'200ml',poCount:"瓶",deliveriedCount:"1",brand:'雅培',status:1,supplier:'',orgName:'生化',createDate:'2022-1-01'}
]
}
///////////////////////补货审批页/////////////////////////////////////////////////////
/**
 * 通过补货单
 * @param {补货单号} obj ={poNo:'',status:''}
 */
export function ApprovePoOrder(obj)
{

}
/**
 * 拒绝补货单
 * @param {补货单号} obj ={poNo:'',status:''}
 */
 export function RejectPoOrder(obj)
 {
 
 }
 ///////////////////////供应商接单页/////////////////////////////////////////////////////
/**
 * 供应商接单:可通过物料名称模糊查询
 * @param {*} obj={materialName,pageIndex,pageSize} 
 */
 export function getSupplierReceiveList(obj){
  return[{poNo:'补货编号',materialName:'sss',materialType:'200ml',poCount:"1",brand:'雅培',status:1,supplier:'供应商',orgName:'生化',createDate:'2022-1-01'},
  {poNo:'111',materialName:'sss',materialType:'200ml',poCount:"1",brand:'雅培',status:1,supplier:'',orgName:'生化',createDate:'2022-1-01'},
  {poNo:'111',materialName:'sss',materialType:'200ml',poCount:"1",brand:'雅培',status:1,supplier:'',orgName:'生化',createDate:'2022-1-01'},
  {poNo:'111',materialName:'sss',materialType:'200ml',poCount:"1",brand:'雅培',status:1,supplier:'',orgName:'生化',createDate:'2022-1-01'},
  {poNo:'111',materialName:'sss',materialType:'200ml',poCount:"瓶",brand:'雅培',status:1,supplier:'',orgName:'生化',createDate:'2022-1-01'}
]
}
