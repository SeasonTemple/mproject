<template>
  <el-row class="side">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <el-menu
        default-active="/index"
        class="el-menu-vertical-demo"
        :collapse="collapse"
        background-color="  #090a39"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          index="/index"
          @click="changeCollapse"
          style="text-align:auto;"
          class="naviBar"
        >
          <i class="el-icon-s-unfold" :class="{'el-icon-s-fold':!collapse}"></i>
          <span slot="title">{{ swiBar }}</span>
        </el-menu-item>
        <el-divider></el-divider>
        
        <el-menu-item index="index/console">
          <i class="el-icon-monitor"></i>
          <span slot="title">控制台</span>
        </el-menu-item>
        <el-divider></el-divider>
        <template v-for="(router, index) in routers">
          <el-submenu :index="router.path" :key="index">
            <template slot="title">
              <i :class="router.meta.icon"></i>
              <span slot="title">{{router.meta.title}}</span>
            </template>
            <template v-for="child in router.children">
              <el-menu-item-group :key="child.name">
                <el-menu-item :index="child.path">{{ child.meta.title }}</el-menu-item>
              </el-menu-item-group>
            </template>
          </el-submenu>
          <el-divider :key="d-{index}"></el-divider>
        </template>
        <!-- <el-submenu index="index/center" @click="addTab(editableTabsValue)">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span slot="title">个人中心</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">个人详情</el-menu-item>
            <el-menu-item index="1-2">项目进展</el-menu-item>
            <el-menu-item index="1-3">工作报表</el-menu-item>
            <el-menu-item index="1-4">事务申请</el-menu-item>
            <el-menu-item index="1-5">系统消息</el-menu-item>
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
            <el-menu-item index="2-2">职门管理</el-menu-item>
            <el-menu-item index="2-3">报表管理</el-menu-item>
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
            <el-menu-item index="3-1">角色管理</el-menu-item>
            <el-menu-item index="3-2">权限管理</el-menu-item> 
            <el-menu-item index="3-2">通知管理</el-menu-item>
            <el-menu-item index="3-3">系统日志</el-menu-item>
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
        <el-divider></el-divider>  -->
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "sideBar",
  data() {
    const isCollapse = this.collapse;
    const switchBar = this.swiBar;
    const routers = [];
    return {
      isCollapse,
      switchBar,
      routers
    };
  },
  methods: {
    ...mapMutations({
      SET_COLLAPSE: "sideBar/SET_COLLAPSE"
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
    collapse: function() {
      return this.store_isCollapse;
    },
    swiBar: function() {
      return this.store_switchBar;
    },
    Routers: function() {
      return this.$router.options.routes
        .filter(r => r.name != "Index")
        .filter(r => r.name != "Base")
        .filter(r => r.name != "Login");
    }
  },
  watch: {
    isCollapse: () => {
      this.isCollapse = this.collapse;
    }
  },
  mounted() {
    this.isCollapse = this.collapse;
    this.routers = this.Routers;
    this.routers.forEach(e => e.children.forEach(e=>console.log(e.meta.title)));
  }
};
</script>
<style src="@/assets/css/sidebar-global.css"></style>