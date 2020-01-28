<template>
  <el-container id="base" class="wrapper">
    <el-header style="height:80px;width: fix-content block">
      <top />
    </el-header>
    <el-container id="side-main" style="direction:vertical">
      <el-aside style="width:fit-content">
        <left />
      </el-aside>
      <el-main>
        <default />
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
      'default': Main,
    }
  }
</script>
<style src="@/assets/css/commons.css"></style>
<style src="@/assets/css/layout.css"></style>


</style>
<style>
  .el-container {
    overflow: hidden;
  }

  html,
  body,
  #base,
  .el-container {
    padding: 0 0;
    margin: 0px;
    height: 100%;
    width: 100%;
  }

  #base {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #side-main {
    background-color: gainsboro;
    display: flex;
  }

  .el-aside {
    overflow: hidden;
  }
</style>