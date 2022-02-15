<template>
  <div class="app-main main-scroll">
    <!-- app-main出现时的动画 -->
    <!--        <transition name="fade-transform" mode="out-in">-->
    <router-view :key="key" />
    <!--        </transition>-->
  </div>
</template>

<script>
export default {
  name: "AppMain",
  data() {
    return {
      matched: [],
      lastedRouter: null,
      currRouter: null,
      uwi: null,
      isWellDetailPage: false,
    };
  },
  computed: {
    key() {
      return this.$route.path;
    },
  },
  created() {
    this.matched = this.$route.matched;
  },
  watch: {
    $route(route, old) {
      this.lastedRouter = old;
      this.currRouter = route;
      this.matched = route.matched;
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";
.app-main {
  /* 50= navbar  50  */
  height: calc(100vh - #{$topHeader});
  width: 100%;
  position: relative;
 // background: rgba(242, 247, 251, 1);
 background:#edf0fa;
  //padding: 10px;
  //TODO 修改位置
  overflow: auto;
  /*overflow: hidden;*/
  .back-item {
    color: #606266;
    font-size: 14px;
    position: absolute;
    top: 19px;
    left: 25px;
  }
  .back-item:hover {
    color: rgb(64, 158, 255);
    cursor: pointer;
  }
}

// .fixed-header + .app-main {
//     padding-top: 50px;
// }

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
// .el-popup-parent--hidden {
//     .fixed-header {
//         /*padding-right: 15px;*/
//         padding-right: 0;
//     }
// }
// .main-scroll::-webkit-scrollbar {
//     /*滚动条整体样式*/
//     width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
//     height: 1px;
// }
// .main-scroll::-webkit-scrollbar-thumb {
//     /*滚动条里面小方块*/
//     border-radius: 10px;
//     -webkit-box-shadow: inset 0 0 5px #d6d3dc;
//     background: #d6d3dc;
// }
// .main-scroll::-webkit-scrollbar-track {
//     /*滚动条里面轨道*/
//     -webkit-box-shadow: inset 0 0 5px #f2f7fb;
//     border-radius: 10px;
//     background: #f2f7fb;
// }
</style>
