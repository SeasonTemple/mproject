<template>
  <el-row id="side">
    <el-col :span="24">
      <el-menu default-active="0" class="el-menu-vertical-demo" :collapse="isCollapse"
        background-color="rgba(9, 10, 57, 0.85)" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="0" style="text-align:auto;" class="naviBar">
          <i class="el-icon-s-unfold" :class="{'el-icon-s-fold':!isCollapse,'pos':!isCollapse}"
            @click="changeCollapse"></i>
        </el-menu-item>
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
            <el-menu-item index="1-4-1">选项1</el-menu-item>
            <el-menu-item index="1-4-1">选项1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">导航四</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'sideBar',
    data() {
      return {
        isCollapse: true,
      }
    },
    methods: {
      changeCollapse() {
        this.isCollapse = !this.isCollapse
      }
    },
  }
</script>

<style>
  * {
    overflow: hidden;
  }

  #side {
    max-width: 180px;
    min-width: 70px;
    height: 100%;
    text-align: left;
    /* background-color: #091057; */
    background-color: rgba(9, 10, 57, 1);
  }

  .el-menu-item:hover {
    background-color: rgba(111, 111, 111, 0.8) !important;
  }

  .el-submenu .is-opened {
    background-color: rgba(111, 111, 111, 0.8) !important;
  }

  .el-menu--collapse {
    width: 70px;
    border-right-color: rgba(255, 208, 75, 0.8) !important;
    border-right-width: 2px !important;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }

</style>