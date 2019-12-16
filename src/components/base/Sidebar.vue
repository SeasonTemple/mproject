<template>
  <el-row id="side">
    <el-col :span="24">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
        :collapse="isCollapse" background-color="#222757"
      text-color="#fff"
      active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <span slot="title">选项4</span>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3" disabled>
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
      <el-radio-group v-model="isCollapse" style="margin-bottom: 10px;">
        <el-radio-button :label="false">展开</el-radio-button><br>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'sideBar',
    data() {
      return {
        isCollapse: true
      }
    },
    methods: {
      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // }
    }
  }
</script>

<style>
  * {
    overflow: hidden;
  }

  #side {
    width: fit-content;
    height: 100%;
    text-align: left;
    background-color: #222757;
  }

  .el-menu--collapse {
    width: 69px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }
</style>