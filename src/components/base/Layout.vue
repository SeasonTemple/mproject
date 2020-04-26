<template>
  <el-container class="wrapper base" v-loading.fullscreen.lock="fullscreenLoading">
    <el-header class="nav">
      <Nav />
    </el-header>
    <el-container class="side-main">
      <el-aside class="aside">
        <SideBar />
      </el-aside>
      <el-main class="main">
        <Main />
        <el-backtop target=".main" :visibility-height="200" :bottom="35" :right="50">
          <el-tooltip effect="dark" content="回到顶部" placement="top">
            <div class="backTop">
              UP
            </div>
          </el-tooltip>
        </el-backtop>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Nav from '@/components/navs/Nav'
  import SideBar from '@/components/sidebars/Sidebar'
  import Main from '@/components/default/Main'
  export default {
    name: 'Layout',
    components: {
      Nav,
      SideBar,
      Main
    },
    data() {
      let fullscreenLoading = true;
      return {
        fullscreenLoading
      }
    },
    mounted() {
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 1000);
    }
  }
</script>
<style scoped src="@/assets/css/commons.css"></style>
<style src="@/assets/css/layout.css"></style>