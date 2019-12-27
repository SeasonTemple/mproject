<template>
  <el-row id="side">
    <el-col :span="24">
      <el-menu default-active="0" class="el-menu-vertical-demo" :collapse="isCollapse"
        background-color="rgba(9, 10, 57, 0.85)" text-color="#fff" active-text-color="#ffd04b">
        <!-- <el-tooltip content="菜单切换" placement="right"> -->
        <el-menu-item index="0" @click="changeCollapse" style="text-align:auto;" class="naviBar">
          <i class="el-icon-s-unfold" :class="{'el-icon-s-fold':!isCollapse,'pos':!isCollapse}"></i>
          <span slot="title">菜单切换</span>
        </el-menu-item>
        <!-- </el-tooltip> -->
        <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span slot="title">控制台</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
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
    outline: none;
  }

  #side {
    max-width: 180px;
    min-width: 71px;
    height: 100%;
    text-align: left;
    /* background-color: #091057; */
    background-color: rgba(9, 10, 57, 1);
    overflow: hidden;
  }

  .el-menu-item:hover {
    background-color: rgba(111, 111, 111, 0.8) !important;
  }

  .el-submenu .is-opened {
    background-color: rgba(111, 111, 111, 0.8) !important;
  }

  /* border-right-color: rgba(255, 208, 75, 0.8) !important; */
  .el-menu--collapse {
    width: 70px;
    border-right-width: 2px !important;
    border-right-style: solid;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 180px;
    min-height: 400px;
  }

  .el-menu>.el-menu-item .is-active {
    border-right-color: rgba(216, 22, 22, 0.8) !important;
    outline-color: rgba(216, 22, 22, 0.8) !important;
  }

  /* .pos {
    transform: translate(50px);
    -moz-transform: translate(50px);
    -webkit-transform: translate(50px);
    -ms-transform: translate(50px);
  } */
</style>