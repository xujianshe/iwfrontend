<template>
  <div class="sidebar">
    <logo :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- default-active: 当前激活的菜单，传入菜单的index -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in routes"
          :key="index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
import { routes } from "@/router";
export default {
  components: { SidebarItem, Logo },
  data() {
    return {
      routes,
      currentRoutes: [],
    };
  },
  computed: {
    ...mapGetters(["sidebar"]),
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    showLogo() {
      return true; // fixed
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },

  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.sidebar {
  position: relative;
  .brand {
    /*position: absolute;*/
    background: linear-gradient(
      180deg,
      rgba(34, 109, 159, 1) 0%,
      rgba(0, 69, 114, 1) 100%
    );
    height: 280px;
    width: 190px;
    /*bottom: 10px;*/
    z-index: -1;
    border-radius: 10px;
    margin: 10px;
    margin-top: 30px;
    display: flex;
    justify-content: left;
    align-items: center;
    flex-direction: column;
    font-size: 16px;
  }
}
</style>