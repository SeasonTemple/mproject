<template>
  <el-row class="side">
    <el-col :span="24">
      <el-menu default-active="/index" class="el-menu-vertical-demo" :collapse="collapse" background-color="  #090a39"
        text-color="#fff" active-text-color="#ffd04b">
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
        <el-submenu index="index/userInfo" @click="addTab(editableTabsValue)">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">个人中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">个人信息</el-menu-item>
            <el-menu-item index="1-2">工作报表</el-menu-item>
            <el-menu-item index="1-3">项目进度</el-menu-item>
            <el-menu-item index="1-4">薪资查询</el-menu-item>
            <el-menu-item index="1-5">出勤汇总</el-menu-item>
            <el-menu-item index="1-6">薪资分析</el-menu-item>
            <el-menu-item index="1-7">系统通知</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-menu-item index="index/sysMsg">
          <i class="el-icon-document"></i>
          <span slot="title">人事管理</span>
        </el-menu-item> -->
        <el-submenu index="index/sysMsg" @click="addTab(editableTabsValue)">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">人事管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">账号管理</el-menu-item>
            <el-menu-item index="2-2">职工管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="index/setting" @click="addTab(editableTabsValue)">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">系统管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">通知管理</el-menu-item>
            <el-menu-item index="3-2">系统日志</el-menu-item>
            <el-menu-item index="3-3">功能管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <!-- <el-menu-item index="index/project">
          <i class="el-icon-setting"></i>
          <span slot="title">项目相关</span>
        </el-menu-item> -->
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