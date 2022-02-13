<template>
    <div :class="classObj" class="app-wrapper" style="height:100%;">
        <sidebar class="sidebar-container" />
        <div class="main-container">
            <div class="fixed-header">
                <navbar />
            </div>
            <app-main />
        </div>
    </div>
</template>

<script>
import AppMain from "./components/AppMain";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { mapState } from "vuex";

export default {
    name: "Layout",
    components: {
        AppMain,
        Navbar,
        Sidebar
    },
    computed: {
        ...mapState({
            sidebar: state => state.app.sidebar,
            device: state => state.app.device
        }),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation
            };
        }
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    min-width: 1270px;
    &.mobile.openSidebar {
        position: fixed;
        top: 0;
    }
}
.fixed-header {
    // position: fixed;
    // top: 0;
    // right: 0;
    // z-index: 9;
    width: calc(100% - #{$sideBarWidth - 210px});
    transition: width 0.28s;
    height:#{$topHeader};
}

.hideSidebar .fixed-header {
   // width: calc(100% - 54px);
    width: calc(100% - 0px)
}
</style>
