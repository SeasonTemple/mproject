<template>
  <el-col :span="24" id="Nav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="rgba(9, 10, 57, 0.8)" text-color="#fff" active-text-color="#ffd04b">
      <el-row :span="24" type="flex" justify="space-between">
        <el-image alt="logo" src="#" fit="contain" style="padding:15px;width:auto;"></el-image>
        <el-dropdown :hide-on-click="false" style="padding:12px 30px 12px 12px;">
          <span class="el-dropdown-link">
            <el-avatar :size="56" :src="url" fit="contain"></el-avatar>
            <el-badge :is-dot="msg" class="avatar-badge"></el-badge>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>出勤分析</el-dropdown-item>
            <el-dropdown-item>任务报告</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-menu>
  </el-col>
</template>

<script>
  export default {
    name: 'navBar',
    methods: {},
    data() {
      return {
        activeIndex: '1',
        url: require('@/assets/img/default-avatar.png'),
        // msg: false
        msg: true
      }
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }

  };
</script>

<style scoped>

  #Nav {
    width: 100%;
    font-size: 30px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    align-content: center;
    /* opacity: 0.5;
    filter: alpha(opacity=50) */
  }

  .el-menu>* {
    border-bottom-width: 0px !important;
    height: 80px !important;
  }

  .el-menu-item {
    line-height: 79px !important;
  }

  .el-submenu {
    line-height: 79px !important;
  }

  .el-avatar+.avatar-badge {
    position: absolute;
  }

  .avatar-badge {
    right: 28%;
    top: 69%;
  }
</style>