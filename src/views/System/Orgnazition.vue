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
            v-model="filters.orgName"
            @keyup.enter.native="query"
            placeholder="组织名称"
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
            <el-steps :space="200" :active="1" align-center class="step">
              <el-step
                description="角色管理"
                icon="el-icon-circle-check"
                class="default-cursor" 
              ></el-step>
              <el-step
                description="组织管理"
                class="default-cursor"
                icon="el-icon-right"
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
    :data="OrgsList" stripe style="width: 100%">
    <el-table-column
      prop="orgId" label="组织编号" width="180"></el-table-column>
    <el-table-column
      prop="orgName"
      label="组织名称"
      width="180">
    </el-table-column>
    <el-table-column
      label="角色列表">
      <template slot-scope="scope">
         {{scope.row.roles.map(p => p.roleTempletName).toString()}}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="onOrgEdit(scope.$index, scope.row)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
      </el-col>
    </el-row>

    <el-dialog
      title="编辑组织"
      :modal-append-to-body="false"
      :visible.sync="isShowDetailDiglog"
      width="40%"
    >
       <el-row>
             <el-col :span="3"> 组织名称： </el-col>
             <el-col :span="18">
               <el-input v-model="currentOrg.orgName" placeholder="组织名称"></el-input>
               </el-col>
        </el-row>
        <el-row >
          <el-col :span="3">分配角色</el-col>
          <el-col :span="18">
          <el-select v-model="currentOrg.rolesValue" multiple placeholder="角色名称">
              <el-option
                v-for="item in RolesList"
                :key="item.roleId"
                :label="item.roleTempletName"
                :value="item.roleId">
              </el-option>
            </el-select>
         
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
import {orgsList,getAllRoles,addOrg,updateOrg} from './data.js'
export default {
  name: "Orgnazition",
  components:{},
  data(){
      return{
      filters: {
        orgName: "",
      },
      OrgsList:[],
      RolesList:[],
      isShowDetailDiglog:false,
      currentOrg:{orgName:'',roles:[],orgId:-1,rolesValue:[]}
      }
  },
  mounted(){
    this.listOrgs();
    this.listAllRoles()
  },
  methods:{
    /**
     * 获取组织列表
     */
    listOrgs(){
         this.OrgsList=orgsList({orgName:''});
    },
    /**
     * 获取所有角色列表
     */
    listAllRoles(){
      this.RolesList=getAllRoles();
    },
    /**
     * 事件：按照组织名称模糊查询
     */
    onQuery(){
      this.listOrgs();
    },
    /**
     * 事件：新增组织
     */
    onAdd(){
      this.currentOrg={orgName:'',roles:[],orgId:-1,rolesValue:[]}
      this.isShowDetailDiglog=true;
    },
    /**
     * 事件：新增/编辑 组织确认保存
     */
    onSaveRowConfirm(){
       for(let i=0;i<this.currentOrg.rolesValue.length;i++)
        {
           for(let j=0;j<this.RolesList.length;j++)
           {
              if(this.currentOrg.rolesValue[i]==this.RolesList[j].roleId){
                this.currentOrg.roles.push({roleId:this.RolesList[j].roleId,roleTempletName:this.RolesList[j].roleTempletName})
                break;
              }
           }
        }

      if(this.currentOrg.orgId==-1){
        //add
        let params={orgName:this.currentOrg.orgName,roles:this.currentOrg.roles,}
        this.addOrg(params);
      }
      else{
        //update
        let params={orgName:this.currentOrg.orgName,roles:this.currentOrg.roles,orgId:this.currentOrg.orgId}
        this.updateOrg(params)
      }
    },
    /**
     * 添加组织机构
     */
    addOrg(){

    },
    /**
     * 更新组织机构
     */
    updateOrg(){

    },
    /** 
     * 事件：编辑当前组织
    */
    onOrgEdit(rowIndex,currRow){
       this.isShowDetailDiglog=true;
       this.currentOrg={orgName:currRow.orgName,roles:currRow.roles,orgId:currRow.orgId,rolesValue:currRow.roles.map(m=>m.roleId)}
    }
  }
 
};
</script>

<style lang="scss" scoped>
</style>