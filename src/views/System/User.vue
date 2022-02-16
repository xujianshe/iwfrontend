<template>
  <section >
    <el-row class="toolbar" style="height:78px">
      <el-form :inline="true"
        size="small"
        :model="filters"
        @submit.native.prevent
        style="height:78px"
      >
        <el-form-item>
          <el-input
            class="input"
            v-model="filters.userName"
            @keyup.enter.native="query"
            placeholder="用户名称"
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
      
    </el-row>
    <el-row>
      <el-col :span="24">
     <el-table
    :data="users"
    stripe
    style="width: 100%">
    <el-table-column
      prop="userName"
      label="用户名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="nickName"
      label="昵称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="orgName"
      label="组织">
    </el-table-column>
      <el-table-column
      prop="telphone"
      label="电话">
    </el-table-column>
     <el-table-column
      prop="email"
      label="邮箱">
    </el-table-column>
    <el-table-column label="状态">
      <template slot-scope="scope">
         <el-tag :type="scope.row.status==1?'danger':'success'">{{scope.row.status==1?'注销':'正常'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="onUserEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
          size="mini"
          @click="onUpdatePwd(scope.$index, scope.row)">修改密码</el-button>
          <el-button
          size="mini" v-if="scope.row.status==0"
          @click="onDeleteUser(scope.$index, scope.row)">注销</el-button>
          <!-- <el-button
          size="mini"
          @click="onRoleSetting(scope.$index, scope.row)">设置角色</el-button> -->
      </template>
    </el-table-column>
  </el-table>
      </el-col>
    </el-row>
  
 <el-dialog
      title="编辑用户信息"
      :modal-append-to-body="false"
      :visible.sync="isShowDetailDiglog"
      width="40%"
    >
       <el-row>
             <el-col :span="3"> 用户名称： </el-col>
             <el-col :span="18">
               <el-input v-model="currentUser.userName" placeholder="用户名称"></el-input>
               </el-col>
        </el-row>
        <el-row >
          <el-col :span="3">昵称：</el-col>
          <el-col :span="18">
            <el-input v-model="currentUser.nickName" placeholder="昵称"></el-input>
            </el-col>
        </el-row>
        <el-row>
          <el-col :span="3"> 电话： </el-col>
          <el-col :span="18">
          <el-input v-model="currentUser.telphone" placeholder="电话"></el-input>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="3"> 邮箱： </el-col>
          <el-col :span="18">
          <el-input v-model="currentUser.email" placeholder="邮箱"></el-input>
          </el-col>
        </el-row>
       <el-row>
          <el-col :span="3"> 组织： </el-col>
          <el-col :span="18">
            <el-select v-model="currentUser.orgId" placeholder="请选择">
              <el-option
                v-for="item in orgList"
                :key="item.orgId"
                :label="item.orgName"
                :value="item.orgId">
              </el-option>
            </el-select>
          </el-col>
        </el-row>
          <el-row>
          <el-col :span="3"> 角色： </el-col>
          <el-col :span="18">
            <el-select v-model="currentUser.tmpRoles" multiple placeholder="请选择">
              <el-option
                v-for="item in userAllRoles"
                :key="item.roleId"
                :label="item.roleName"
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
 <el-dialog
      title="修改密码"
      :modal-append-to-body="false"
      :visible.sync="isShowChangePwdDialog"
      width="40%"
    >
     <el-form
        label-width="90px"
        :model="updatePwdModel"
        ref="updatePwdModel"
        size="small"
        class="form"
        :rules="checkUpdatePwdModel"
        status-icon
      >
        <el-form-item prop="oldPassword" label="原密码">
          <el-input
            style="width: 240px"
            type="password"
            v-model="updatePwdModel.oldPassword"
            placeholder="请输入原密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="新密码">
          <el-input
            style="width: 240px"
            type="password"
            class="text"
            v-model="updatePwdModel.password"
            placeholder="请输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword" label="确认密码">
          <el-input
            style="width: 240px"
            type="password"
            class="text"
            v-model="updatePwdModel.confirmPassword"
            @keyup.enter.native.prevent="updatePwd"
            placeholder="请再次输入新密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right" type="primary" @click="onSaveUpdatePwd"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
  </el-dialog>
  </section>
</template>
<script>
import {userList,updatePwd,cancelUser,orgsList,getAllUserRoles,addUser,updateUser} from './data.js'
export default {
  name: "User",
  components:{},
  data(){
       var checkPwd= (rule, value, callback) =>{
          let message = rule.message || "此项必填";
          if(!value){
            callback(new Error(message));
          }else{
            if(value.indexOf(' ') !== -1){
              callback(new Error("密码不能有空格!"));
            }else{
              callback();
            }
          }
        }
      var checkPwdExist = (rule, value, callback) => {
        if (value !== this.updatePwdModel.password) {
          callback(new Error("密码不一致！"));
        } else {
          callback();
        }
      };

      return{
      filters: {
        userName: "",
      },
      users:[],
      isShowDetailDiglog:false,
      isShowChangePwdDialog:false,
      currentUser:{userName:'',nickName:'',telphone:'',email:'',orgId:'',orgName:'',userRoles:[],tmpRoles:[]},
      userAllRoles:[],
      orgList:[],
      updatePwdModel: {
        loginName: "",
        oldPassword: "",
        password: "",
        confirmPassword: "",
      },
     checkUpdatePwdModel: {
        oldPassword: [
          {
            required: true,
            validator:checkPwd,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator:checkPwd,
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            required: true,
            validator:checkPwd,
            trigger: "blur",
          },
          { validator: checkPwdExist, trigger: "blur" },
        ],
      },
  }},
  mounted(){
      this.users=userList();
      this.orgList=orgsList();
      this.userAllRoles=getAllUserRoles();
  },
  methods: {
    /**
     * 根据用户名称模糊查询
     */
    onQuery(){
       userList();
    },
     /**
     * 新增用户
     */
    onAdd(){
      this.isShowDetailDiglog=true;
      this.isShowChangePwdDialog=false;
      this.currentUser={userId:-1,userName:'',nickName:'',telphone:'',email:'',orgId:'',orgName:'',userRoles:[],tmpRoles:[]};
    },
    /**
    *编辑当前用户
     */
    onUserEdit(rowIndex,currRow){
      this.currentUser={userId:currRow.userId,userName:currRow.userName,nickName:currRow.nickName,telphone:currRow.telphone,
      email:currRow.email,orgId:currRow.orgId,orgName:currRow.orgName,userRoles:currRow.userRoles,tmpRoles:[]};
      for(let i=0;i<currRow.userRoles.length;i++){
        this.currentUser.tmpRoles.push(currRow.userRoles[i].roleId)
      }
     this.isShowDetailDiglog=true;
     this.isShowChangePwdDialog=false;
    },
    /**
     * 事件：新增或编辑用户信息时保存按钮事件
     */
    onSaveRowConfirm(){
      if(this.currentUser.userId==-1){
        //add
        addUser();
      }
      else{
        //update
         updateUser();
      }
    },
    /**
    *更新当前用户密码
     */
    onUpdatePwd(rowIndex,currRow){
      this.isShowChangePwdDialog=true;
      this.isShowDetailDiglog=false;
    },
    /**
     * 保存更新密码操作
     */
    ononSaveUpdatePwd(){
      this.$refs.updatePwdModel.validate((valid) => {
        if (valid) {
        updatePwd()
          // SavePasswordUsers(
          //   this.$tools.js.generateParameter(this.updatePwdModel)
          // ).then((datam) => {
          //   this.$notify({
          //     title: "成功",
          //     message: "密码修改成功，下次登录请使用新密码！",
          //     type: "success",
          //   });
          //   this.isShowChangePwdDialog = false;
          // });
        }
      });
    },
    /**
    *注销当前用户
     */
    onDeleteUser(rowIndex,currRow){
         this.$confirm(
        `确认要将用户名为『${currRow.userName}』的用户『${
          currRow.status === 0 ? "注销" : "激活"
        }』吗?`,
        "提示",
        {
          type: "warning",
        }
      ).then(() => {
        let parameter = { userName: currRow.userName };});
        cancelUser();
    }

  }
}
</script>

<style lang="scss" scoped>
</style>