<template>
  <el-container class="wrapper base" v-loading.fullscreen.lock="fullscreenLoading">
    <el-header class="nav">
      <router-view name="Nav" />
    </el-header>
    <el-container class="side-main">
      <el-aside class="aside">
        <!-- <SideBar /> -->
        <router-view name="SideBar" />
      </el-aside>
      <el-main class="main">
        <!-- <Main /> -->
        <router-view name="Main">
          <router-view></router-view>
        </router-view>
        <el-backtop target=".main" :visibility-height="200" :bottom="35" :right="50">
          <el-tooltip effect="dark" content="回到顶部" placement="top">
            <div class="backTop">UP</div>
          </el-tooltip>
        </el-backtop>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import Nav from "@/components/navs/Nav";
// import SideBar from "@/components/sidebars/Sidebar";
// import Main from "@/components/default/Main";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  name: "Layout",
  // components: {
  //   Nav,
  //   SideBar,
  //   Main
  // },
  data() {
    let fullscreenLoading = true;
    return {
      fullscreenLoading
    };
  },
  methods: {
    ...mapActions({
      GET_UserDetail: "main/GET_UserDetail"
    }),
    InitUser: function() {
      let userDetail = {};
      this.GET_UserDetail()
        .then(res => {
          console.log(this.USERDETAIL);
          this.fullscreenLoading = false;
        })
        .catch(err => {
          this.$message.error({
            dangerouslyUseHTMLString: true,
            message: `<strong>获取用户信息异常：${err.msg}</strong> `,
            offset: 100,
            duration: 2000
          });
        });
    }
  },
  computed: {
    ...mapState({
      OPEN_TAB: state => state.main.openedTab,
      USERDETAIL: state => state.main.userDetail,
      ACTIVE_TAB: state => state.main.activeTab
    })
  },
  mounted() {
    this.InitUser();
  }
};
</script>
<style scoped src="@/assets/css/commons.css"></style>
<style src="@/assets/css/layout.css"></style>