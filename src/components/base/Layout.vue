<template>
  <el-container class="wrapper base">
    <el-header class="nav">
      <top />
    </el-header>
    <el-container class="side-main">
      <el-aside class="aside">
        <left />
      </el-aside>
      <el-main class="main">
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