<template>
  <section >
    <el-row class="toolbar" style="height:78px">
      <el-form
        :inline="true"
        size="small"
        :model="filters"
        @submit.native.prevent
        style="height:78px"
      >
        <el-form-item>
          <el-input
            class="input"
            v-model="filters.materialName"
            @keyup.enter.native="query"
            placeholder="物料名称"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item class="common-form">
          <el-button
            class="search-button"
            type="primary"
            @click="onQuery"
            icon="el-icon-search"
            >查 询</el-button
          >
        </el-form-item>
       <el-form-item class="form-right">
          <el-button
            type="success"
            @click="onImportMaterial"
            icon="el-icon-upload">导入物料</el-button>
        </el-form-item>
      </el-form>

    </el-row>
    <el-row>
      <el-col :span="24">
     <el-table
    :data="MaterialsList"
    stripe
    style="width: 100%">
   <el-table-column
      prop="materialCode"
      label="物料编码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="materialName"
      label="物料名称"
      width="180">
    </el-table-column>
   <el-table-column
      prop="ShortName"
      label="物料简称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="MaterialType"
      label="规格">
    </el-table-column>
      <el-table-column
      prop="Brand"
      label="品牌">
    </el-table-column>
     <el-table-column
      prop="Supplier"
      label="供应商名称">
    </el-table-column>
     <el-table-column
      prop="Unit"
      label="库存单位">
    </el-table-column>
    <el-table-column label="库存设置">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="onStockSetting(scope.$index, scope.row)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
 
   <el-pagination
      @size-change="onPageSizeChange"
      @current-change="onPageCurrentChange"
      :current-page="pager.pageIndex"
      :page-size="pager.pageSize"
     layout="prev, pager, next, jumper"
      :total="pager.total">
    </el-pagination>
      </el-col>
    </el-row>
  
   <el-dialog
      title="库存详情"
      :modal-append-to-body="false"
      :visible.sync="isShowDetailDiglog"
      width="40%"
    >
       <el-table
    :data="currMaterialStocks" :row-class-name="tableRowClassName"
    stripe  @row-dblclick="onStockDbClick"
    style="width: 100%">
   <el-table-column
      prop="orgName"
      label="组织"
      >
    </el-table-column>
    <el-table-column
      label="最小安全库存"
     >
        <template  slot-scope="scope">
          <div v-if="editStock.rowIndex==scope.$index">
              <el-input v-model="scope.row.minStock" placeholder=""></el-input>
          </div>
          <div v-else>{{scope.row.minStock}}</div>
      </template>
    </el-table-column>
   <el-table-column
      label="最大安全库存"
    >
        <template  slot-scope="scope">
          <div v-if="editStock.rowIndex==scope.$index">
              <el-input v-model="scope.row.maxStock" placeholder=""></el-input>
          </div>
          <div v-else>{{scope.row.maxStock}}</div>
      </template>
    </el-table-column>
    <el-table-column label="">
       <template  slot-scope="scope">
            <div v-if="editStock.rowIndex==scope.$index">
             <el-button type="primary" @click="onSaveStock">保存</el-button>
             <el-button type="text" @click="onCancelUpdate">取消</el-button>
          </div>
       </template>
    </el-table-column>
   </el-table>
    
    </el-dialog>
  <el-dialog
      title="导入物料"
      :modal-append-to-body="false"
      :visible.sync="isShowImportDiglog"
      width="40%"
    >
    <el-upload
  class="upload-demo" drag accept=".xls"
  ref="upload" action="#"  :http-request="onUploadFile"
  >
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传xls文件</div>
</el-upload>
  </el-dialog>
  </section>
</template>
<script>
import {getMaterials,getMaterialStock,uploadMaterialXls} from './data.js'
export default {
  name: "Materials",
  components:{},
  data(){
      return{
      filters: {materialName: ""},
      isShowDetailDiglog:false,
      isShowImportDiglog:false,
      MaterialsList:[],
      pager:{pageIndex:0,pageSize:50,total:1000},
      currMaterialStocks:[],
      editStock:{rowIndex:-1}
      }
  },
  mounted(){
       let params={materialName:this.filters.materialName,pageIndex:0,pageSize:20};
       this.MaterialsList=getMaterials(params);
  },
  methods:{
      /**
       * 事件：查询库存物料详情
       */
     onQuery(){
         let params={materialName:filter.materialName,pageIndex:0,pageSize:20};
         this.MaterialsList=getMaterials(filter.materialName,0,20);
     },
     /**
      * 事件：查询库存数量
      */
     onStockSetting(rowIndex,currRow){
         this.currMaterial=currRow;
         this.currMaterialStocks=getMaterialStock({materialCode:currRow.materialCode})
         this.isShowDetailDiglog=true;
       
     },
     /**
      * 时间：双击当前库存行
      */
     onStockDbClick(row, event, column){
         //this.editStock={materialCode:row.materialCode,minStock:row.minStock,maxStock:row.maxStock,rowIndex:row.row_index}
         this.editStock={rowIndex:row.row_index};
     },
     /**
      * 事件：保存当前修改库存
      */
     onSaveStock(){

     },
     onUploadFile(params){
       
         let file = params.file;
         var testmsg = file.name.substring(file.name.lastIndexOf(".") + 1);
        const extension = testmsg === "xls";
        if (!extension) {
            this.$message({
            message: "上传文件只能是.xls格式!",
            type: "warning",
            });
            return;
        }
          // 根据后台需求数据格式
          var form = new FormData();
          // 文件对象
          form.append("file", file);
          // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
         // form.append("clientType", 'xxx');
        //   imageUpload(form)
        //     .then(res => {
        //      //自行处理各种情况
        //     }).catch(() => {});
     },
     /**
      * 事件：导入物料编码
      */
     onImportMaterial(){
         this.isShowImportDiglog=true;
     },
     /**
      * 事件：取消当前修改
      */
     onCancelUpdate(){
         this.editStock={rowIndex:-1};
     },
     tableRowClassName({row, rowIndex}) {
         row.row_index = rowIndex;
     },
     onPageSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      onPageCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
  }
}
</script>