<template>
  <el-row id="side">
    <el-col :span="24">
      <el-menu default-active="0" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="transparent"
        text-color="#fff" active-text-color="#ffd04b" router>
        <!-- <el-divider></el-divider> rgba(9, 10, 57, 0.85)-->
        <el-menu-item index="0" @click="changeCollapse" style="text-align:auto;" class="naviBar">
          <i class="el-icon-s-unfold" :class="{'el-icon-s-fold':!isCollapse}"></i>
          <span slot="title">{{switchBar}}</span>
        </el-menu-item>
        <el-divider></el-divider>
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
      const isCollapse = true;
      const switchBar = "展开菜单";
      return {
        isCollapse,
        switchBar
      }
    },
    methods: {
      changeCollapse() {
        // this.isCollapse = !this.isCollapse;
        this.$store.commit('sideBar/SET_COLLAPSE');
        this.isCollapse ? this.switchBar = "展开菜单" : this.switchBar = "收起菜单";
      }
    },
  }
</script>

<style>
  #side {
    max-width: 30vh;
    min-width: fit-content;
    height: 100%;
    text-align: left;
    /* background-color: #091057; */
    background-color: rgba(9, 10, 57, 1);
  }

  .el-menu-item:hover {
    background-color: rgba(111, 111, 111, 0.5) !important;
  }

  .el-submenu .is-opened {
    background-color: rgba(111, 111, 111, 0.8) !important;
  }

  /* border-right-color: rgba(255, 208, 75, 0.8) !important; */
  .el-menu--collapse {
    width: 70px;
    border-right-width: 2px !important;
    border-right-color: #ffd04b !important;
    border-right-style: solid;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 30vh;
    min-height: 400px;
    overflow: hidden;
  }

  .el-menu>.el-menu-item .is-active {
    border-right-color: rgba(216, 22, 22, 0.8) !important;
    outline-color: rgba(216, 22, 22, 0.8) !important;
  }

  .el-menu>.el-divider {
    box-sizing: border-box;
    margin: 1px 0 0 0;
    background-color: rgb(96, 96, 143);
  }
</style>