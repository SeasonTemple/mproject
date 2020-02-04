<template>
  <el-row id="side">
    <el-col :span="24">
      <el-menu default-active="/index" class="el-menu-vertical-demo" :collapse="collapse" background-color="transparent"
        text-color="#fff" active-text-color="#ffd04b" router>
        <!-- <el-divider></el-divider> rgba(9, 10, 57, 0.85)-->
        <el-menu-item index="/index" @click="changeCollapse" style="text-align:auto;" class="naviBar">
          <i class="el-icon-s-unfold" :class="{'el-icon-s-fold':!collapse}"></i>
          <span slot="title">{{ swiBar }}</span>
        </el-menu-item>
        <el-divider></el-divider>
        <el-menu-item index="index/console">
          <i class="el-icon-location"></i>
          <span slot="title">控制台</span>
        </el-menu-item>
        <el-menu-item index="index/userInfo">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="index/sysMsg">
          <i class="el-icon-document"></i>
          <span slot="title">系统消息</span>
        </el-menu-item>
        <el-menu-item index="index/project">
          <i class="el-icon-setting"></i>
          <span slot="title">项目相关</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: 'sideBar',
    data() {
      const isCollapse = this.collapse
      const switchBar = this.swiBar
      return {
        isCollapse,
        switchBar
      }
    },
    methods: {
      ...mapMutations({
        SET_COLLAPSE: 'sideBar/SET_COLLAPSE'
      }),
      changeCollapse() {
        this.NProgress.inc(0.2)
        // this.$store.commit('sideBar/SET_COLLAPSE');
        setTimeout(() => {
          this.SET_COLLAPSE();
          this.NProgress.done()
        }, 3000);
      }
    },
    computed: {
      ...mapState({
        store_isCollapse: state => state.sideBar.isCollapse,
        store_switchBar: state => state.sideBar.switchBar
      }),

      collapse: function () {
        return this.isCollapse = this.store_isCollapse
      },
      swiBar: function () {
        return this.store_switchBar
      }
    }
  }
</script>

<style>
  #side {
    display: block;
    max-width: 30vh;
    min-width: fit-content;
    height: 100%;
    width: fit-content;
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