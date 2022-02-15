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
            <el-dropdown-item>
              <span style="display: block">用户信息</span>
            </el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display: block" @click="logOut">登出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
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
    return {
      useravatar,
    };
  },

  methods: {
    toggleSideBar() {
      this.$store.dispatch("app/toggleSideBar");
    },
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
