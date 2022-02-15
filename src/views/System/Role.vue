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
            v-model="filters.roleTempletName"
            @keyup.enter.native="query"
            placeholder="角色名称"
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
            @click="onAdd"
            icon="el-icon-circle-plus-outline">新 增</el-button>
        </el-form-item>
      </el-form>
      <el-row style="position: absolute; left: 30%;top:10px">
          <el-col style="width:500px">
            <el-steps :space="200" :active="0" align-center class="step">
              <el-step
                description="角色管理"
                icon="el-icon-right"
                class="default-cursor"
              ></el-step>
              <el-step
                description="组织管理"
                class="default-cursor"
                icon="el-step__icon is-text"
              ></el-step>
              <el-step
                description="用户管理"
                class="default-cursor"
                icon="el-step__icon is-text"
              ></el-step>
            </el-steps>
          </el-col>
      </el-row>
    </el-row>
    <el-row>
      <el-col :span="24">
     <el-table
    :data="RolesList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="roleId"
      label="角色编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="roleTempletName"
      label="角色名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="tag"
      label="角色标识">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="onRoleEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
      </el-col>
    </el-row>
  
 <el-dialog
      title="编辑角色"
      :modal-append-to-body="false"
      :visible.sync="isShowDetailDiglog"
      width="40%"
    >
       <el-row>
             <el-col :span="3"> 角色标识： </el-col>
             <el-col :span="18">
               <!-- {{ currentRole.tag }} -->
               <el-input v-model="currentRole.tag" placeholder="角色标识"></el-input>
               </el-col>
        </el-row>
        <el-row >
          <el-col :span="3">角色名称：</el-col>
          <el-col :span="18">
            <!-- {{ currentRole.roleTempletName }} -->
            <el-input v-model="currentRole.roleTempletName" placeholder="角色名称"></el-input>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="3"> 角色权限： </el-col>
          <el-col :span="18">
            <el-tree
              :props="treeArgs"
              :data="treeAuthResource"
              node-key="resourceId"
              ref="tree"
              show-checkbox
            >
            </el-tree>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
             <el-button type="primary" @click="onSaveRowConfirm">确认</el-button>
          </el-col>
        </el-row>
    </el-dialog>

  </section>
</template>
<script>
import {resourceList,roleList,addRole,updateRole} from './data.js'
export default {
  name: "Role",
  components:{},
  data(){
      return{
      filters: {
        roleTempletName: "",
      },
      treeArgs: {
        label: "resourceName",
        children: "children",
      },
      treeAuthResource:[],
    
      items: [],
      load: true,
      RolesList:[],
      //ResourceList:[],
      isShowDetailDiglog:false,
      currentRow: null,
      currentRole:{roleTempletName:'',tag:'',roleId:-1}
  }},
  mounted(){
    this.list();
    this.treeAuthResource=resourceList();
  },
methods: {
// 检索
onQuery() {
    this.items = []
    //this.pageObj.pageIndex = 1;
    this.list();
},
/**
 * 新增角色事件
 */
onAdd() {
  this.isShowDetailDiglog=true;
  this.currentRole={roleTempletName:'',tag:'',roleId:-1};
  this.$nextTick(()=>{
 this.$refs.tree.setCheckedKeys([])
  })
   
},
/**
 * 编辑选中角色事件
 */
onRoleEdit(rowIndex,currRow){
 // console.log(currRow.permissions)
  let defaultRoleKeys=[];
 for(let i=0;i<currRow.permissions.length;i++){
  //  for(let j=0;j<currRow.permissions[i].children.length;j++)
  //  defaultRoleKeys.push(currRow.permissions[i].children[j].resourceId)
  defaultRoleKeys.push(currRow.permissions[i].resourceId)
 }
  this.isShowDetailDiglog=true;
 this.$nextTick(()=>{
   this.$refs.tree.setCheckedKeys(defaultRoleKeys);
   this.currentRole=currRow;
 })
  
  
},
/**
 * 新增/编辑 角色保存
 */
onSaveRowConfirm(){
  
  if(this.currentRole.roleId==-1){
    //add role 需要判断角色是否存在
    let params={roleTempletName:this.currentRole.roleTempletName,tag:this.currentRole.tag};
    params.permissions=this.getSeletedResources();
    console.log(params)
    //addRole(params);
  }
  else{
    //edit role 
    let params={roleTempletName:this.currentRole.roleTempletName,
            tag:this.currentRole.tag,
            roleId:this.currentRole.roleId};
    params.permissions=this.getSeletedResources();
    console.log(params)
    //updateRole(params);
  }
},
/**
 * 添加或编辑角色时，获取被选中的资源列表
 */
getSeletedResources(){
  let nodes=this.$refs.tree.getCheckedNodes();
  let selResources=[];
  for(let i=0;i<nodes.length;i++){
       if(nodes[i].children) continue;
       selResources.push({resourceId:nodes[i].resourceId,resourceName:nodes[i].resourceName,resourcePath:nodes[i].resourcePath})
  }
  return selResources;
 //console.log();
},
//角色列表
list() {
    //组装查询参数
   let params={roleTempletName:''}
   this.RolesList=roleList(params);
   
   //console.log(this.RolesList)
},
}
};
</script>

<style lang="scss" scoped>
</style>