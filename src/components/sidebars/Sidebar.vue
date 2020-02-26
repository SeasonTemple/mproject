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
        <el-menu-item index="index/userInfo" @click="addTab(editableTabsValue)">
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
    mounted(){
      this.isCollapse = this.collapse;
    }
  }
</script>
<style src="@/assets/css/sidebar-global.css"></style>