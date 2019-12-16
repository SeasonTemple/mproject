<template>
  <el-container id="home" class="wrapper">
    <el-header>
      <router-view class="view top" name="top"></router-view>
    </el-header>
    <el-container id="side-main" style="direction:vertical">
      <el-aside style="width: auto;">
        <router-view class="view left" name="left"></router-view>
      </el-aside>
      <el-main>
        <router-view class="view default"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import Nav from './components/base/Nav.vue'
  import SideBar from './components/base/Sidebar.vue'
  import Main from './components/base/Main.vue'
  export default {
    name: 'App',
    components: {
      'top': Nav,
      'left': SideBar,
      'default': Main,
    }
  }
</script>

<style>
   html,body,#home,.el-container{
        padding: 0 0;
        margin: 0px;
        height: 100%;
        width: 100%;
   }
  
  #home {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  
  
  
</style>