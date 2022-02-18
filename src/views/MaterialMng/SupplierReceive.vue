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
            @click="onPrint"
            icon="el-icon-printer">打印</el-button>
        
            <download-excel
	class   = "btn btn-default"
	:data   = "multipleSelection"
	:fields = "json_fields"
	worksheet = "My Worksheet"
        type    = "xls"
	name    = "filename.xls">
   <el-button
            type="success"
            @click="onExport"
            icon="el-icon-download">导出</el-button>

</download-excel>
        </el-form-item>
      </el-form>

    </el-row>
    <el-row>
      <el-col :span="24">
     <el-table
    :data="MaterialsList"
    stripe  @selection-change="onSelectionChange"
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
   <el-table-column
      prop="poNo"
      label="补货编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="materialName"
      label="物料名称"
      width="180">
    </el-table-column>
     <el-table-column
      prop="materialType"
      label="规格">
    </el-table-column>
   <el-table-column
      label="补货数量" prop="poCount"
      width="180">
    </el-table-column>
     <el-table-column
      prop="brand"
      label="品牌">
    </el-table-column>
   <el-table-column
      prop="supplier"
      label="供应商">
    </el-table-column>
     <el-table-column
      prop="orgName"
      label="组织">
    </el-table-column>
     <el-table-column
      prop="status"
      label="状态">
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
  </section>
</template>
<script>
import {getPoRecordList} from './data.js'
export default {
  name: "PoRecord",
  components:{},
  data(){
      return{
      filters: {materialName: ""},
      MaterialsList:[],
      pager:{pageIndex:0,pageSize:50,total:1000},
      multipleSelection: [],
      json_fields: {
            '补货单号': 'poNo',
            '物料名称': 'materialName',
            '规格':'materialType',
            '品牌': 'brand',
            '补货数量' :'poCount',
            '组织':'orgName'
            },
      }},
  mounted(){
     let params={materialName:'',pageIndex:0,pageSize:50};
     this.MaterialsList=getPoRecordList(params);
  },
  methods:{
      /**
       * 事件：查询
       */
     onQuery(){
        let params={materialName:'',pageIndex:0,pageSize:50};
        this.MaterialsList=getPoRecordList(params);
     },
     onPageSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      onPageCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      onSelectionChange(val){
          this.multipleSelection = val;
         
      },
      onPrint(){
            
        },
      onExport(){

       }
  }

}
</script>