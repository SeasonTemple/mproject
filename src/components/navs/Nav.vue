<template>
  <el-col :span="24" class="Nav">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
      background-color="rgba(9, 10, 57, 0.8)" text-color="#fff" active-text-color="#ffd04b">
      <el-row :span="24" type="flex" justify="space-between">
        <el-image alt="logo" src="#" fit="contain" style="padding:15px;width:auto;"></el-image>
        <div id="tp-weather-widget"></div>
        <el-dropdown :hide-on-click="false" style="padding:12px 30px 12px 12px;" @command="handleCommand">
          <span class="el-dropdown-link">
            <el-avatar :size="56" :src="url" fit="contain"></el-avatar>
            <el-badge :is-dot="msg" class="avatar-badge"></el-badge>
          </span>
          <el-dropdown-menu slot="dropdown" ref="tpWidget">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>出勤分析</el-dropdown-item>
            <el-dropdown-item>工作报告</el-dropdown-item>
            <el-dropdown-item command="/login">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-menu>
  </el-col>
</template>

<script>
  import { getWeather,appendCss } from "_u/weather";

  export default {
    name: 'navBar',
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
      },
      handleCommand: function(command) {
        this.$router.push(command);
      }
    },
    created: () => {
     getWeather()
    },
    mounted: () => {
      appendCss()
    }
  };
</script>

<style scoped src="@/assets/css/nav.css"></style>