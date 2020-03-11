<template>
  <el-row class="side">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-menu default-active="/index" class="el-menu-vertical-demo" :collapse="collapse" background-color="  #090a39"
        text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="/index" @click="changeCollapse" style="text-align:auto;" class="naviBar">
          <i class="el-icon-s-unfold" :class="{'el-icon-s-fold':!collapse}"></i>
          <span slot="title">{{ swiBar }}</span>
        </el-menu-item>
        <el-divider></el-divider>
        <el-menu-item index="index/console">
          <i class="el-icon-monitor"></i>
          <span slot="title">控制台</span>
        </el-menu-item>
        <el-divider></el-divider>
        <el-submenu index="index/userInfo" @click="addTab(editableTabsValue)">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人中心</span>
          </template>
          <el-menu-item-group>
            <el-submenu index="1-1">
              <template slot="title">个人信息</template>
              <el-menu-item index="1-1-1">项目进展</el-menu-item>
              <el-menu-item index="1-1-2">考勤汇总</el-menu-item>
              <el-menu-item index="1-1-3">工作报表</el-menu-item>
              <el-menu-item index="1-1-4">数据分析</el-menu-item>
              <el-menu-item index="1-1-5">事务申请</el-menu-item>
              <el-menu-item index="1-1-6">系统通知</el-menu-item>
            </el-submenu>
          </el-menu-item-group>
        </el-submenu>
        <el-divider></el-divider>
        <el-submenu index="index/sysMsg" @click="addTab(editableTabsValue)">
          <template slot="title">
            <i class="el-icon-eleme"></i>
            <span slot="title">人事管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">职工管理</el-menu-item>
            <el-menu-item index="2-2">项目管理</el-menu-item>
            <el-menu-item index="2-3">部门管理</el-menu-item>
            <el-menu-item index="2-4">报表管理</el-menu-item>
            <el-menu-item index="2-5">申请管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-divider></el-divider>
        <el-submenu index="index/setting" @click="addTab(editableTabsValue)">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">账号管理</el-menu-item>
            <el-menu-item index="3-2">权限管理</el-menu-item>
            <el-menu-item index="3-3">通知管理</el-menu-item>
            <el-menu-item index="3-4">系统日志</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-divider></el-divider>
        <el-submenu index="index/help" @click="addTab(editableTabsValue)">
          <template slot="title">
            <i class="el-icon-question"></i>
            <span slot="title">使用帮助</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="4-1">说明文档</el-menu-item>
            <el-menu-item index="4-2">操作向导</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-divider></el-divider>
        <!-- <el-button-group class="bottomBarGroup">
          <el-button plain class="sideBarButtons" icon="el-icon-house"></el-button>
          <el-button plain class="sideBarButtons" type="primary" icon="el-icon-refresh"></el-button>
          <el-button plain class="sideBarButtons" type="danger" icon="el-icon-switch-button"></el-button>
        </el-button-group>
        <el-divider></el-divider> -->
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
        // this.NProgress.inc(0.2)
        // this.$store.commit('sideBar/SET_COLLAPSE');
        // setTimeout(() => {
        this.SET_COLLAPSE();
        // this.NProgress.done()
        // }, 3000);
      }
    },
    computed: {
      ...mapState({
        store_isCollapse: state => state.sideBar.isCollapse,
        store_switchBar: state => state.sideBar.switchBar
      }),

      collapse: function () {
        return this.store_isCollapse;
      },
      swiBar: function () {
        return this.store_switchBar
      }
    },
    watch: {
      isCollapse: () => {
        this.isCollapse = this.collapse;
      }
    },
    mounted() {
      this.isCollapse = this.collapse;
    }
  }
</script>
<style src="@/assets/css/sidebar-global.css"></style>