<template>
  <section>
    <div class="navbar">
      <!-- hamburger -->
      <hamburger
        id="hamburger-container"
        :is-active="sidebar.opened"
        class="hamburger-container"
        @toggleClick="toggleSideBar"
      />
      <!-- main title -->
      <div style="text-align: center">
        <div class="main-title" style="margin-top: 0px">Tartan-ADMIN</div>
        <!--            <div class="main-subtitle" style="margin-top:-6px;">Tartan's Digital Oil Field Platform of Management and Optimization</div>-->
      </div>

      <!-- right-menu -->
      <div class="right-menu">
        <div style="float: left" class="username">
          {{ $store.getters.username }}
        </div>
        <el-dropdown
          class="avatar-container right-menu-item hover-effect"
          trigger="click"
        >
          <div class="avatar-wrapper">
            <img :src="useravatar" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </div>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>
              <span style="display: block">用户信息</span>
            </el-dropdown-item> -->
            <el-dropdown-item>
              <span style="display: block"  @click="onChangeRole">切换角色</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span style="display: block" @click="onChangePwd">修改密码</span>
            </el-dropdown-item>
        
            <el-dropdown-item divided>
              <span style="display: block" @click="logOut">登出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    
   <el-dialog
      title="切换角色"
      :modal-append-to-body="false"
      :visible.sync="isShowSwitchRoleDialog"
      width="40%"
    >
    切换角色111111111111
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
import { mapGetters } from "vuex";
import Hamburger from "@/components/Hamburger";
import useravatar from "../../assets/images/user_avatar_default.png";
import Cookies from "js-cookie";
export default {
  components: {
    Hamburger,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  watch: {},
  data() {
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
    return {
      useravatar,
      isShowChangePwdDialog:false,
      isShowSwitchRoleDialog:false,
      updatePwdModel: {
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
    };
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
  
    /**
     * 事件：切换角色
     */
    onChangeRole(){
      this.isShowChangePwdDialog=false;
      this.isShowSwitchRoleDialog=true;
    },
    /**
     * 事件：修改密码
     */
    onChangePwd(){
      this.isShowChangePwdDialog=true;
      this.isShowSwitchRoleDialog=false;
    },
    /**
     * 保存更新密码
     */
    onSaveUpdatePwd(){

    },
    /**
     * 退出登录
     */
    logOut() {
      this.$confirm("确认退出？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("user/logout");
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  /*background: #004e7e;*/
  background: #20a0ff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  .main-title {
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(242, 247, 251, 1);
    // color: whitesmoke;
    // font-weight: bold;
    font-size: 23px;
    line-height: 46px;
  }
  .main-subtitle {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: rgba(242, 247, 251, 1);
  }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }
    .username {
      color: whitesmoke;

      font-size: 17px;
      line-height: 53px;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 15px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
