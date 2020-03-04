<template>
  <el-container class="wrapper base" v-loading.fullscreen.lock="fullscreenLoading">
    <el-header class="nav">
      <top />
    </el-header>
    <el-container class="side-main">
      <el-aside class="aside">
        <left />
      </el-aside>
      <el-main class="main">
        <default />
        <el-backtop target=".main" :visibility-height="200" :bottom="60" :right="50" style="background:transparent;">
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
      'top': Nav,
      'left': SideBar,
      'default': Main
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