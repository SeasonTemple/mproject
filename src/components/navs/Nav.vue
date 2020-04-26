<template>
  <el-col :span="24" class="Nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="rgba(9, 10, 57, 0.7)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-row :span="24" type="flex" justify="space-between">
        <el-image alt="logo" class="siteSymbol" :src="url.img4" fit="contain" lazy></el-image>
        <div id="tp-weather-widget"></div>
        <el-dropdown
          :hide-on-click="false"
          style="padding:12px 30px 12px 12px;"
          @command="handleCommand"
        >
        <!--  -->
          <span class="el-dropdown-link">
            <el-avatar :size="56" :src="url.img2" fit="contain" :lazy="true"></el-avatar>
            <el-badge :is-dot="msg" class="avatar-badge"></el-badge>
          </span>
          <el-dropdown-menu slot="dropdown" ref="tpWidget">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>出勤分析</el-dropdown-item>
            <el-dropdown-item>工作报告</el-dropdown-item>
            <el-dropdown-item command="exit">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-menu>
  </el-col>
</template>

<script>
import img1 from "@/assets/symbol.png";
import img2 from "@/assets/img/default-avatar.png";
import img3 from "@/assets/symbol-2.png";
import img4 from "@/assets/symbol-3.png";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "navBar",
  data() {
    let url = {
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4
    };
    let activeIndex = "1";
    let msg = true;

    return {
      activeIndex,
      url,
      msg,
    };
  },
  methods: {
    ...mapActions({
      EXIT: "login/EXIT"
    }),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand: function(command) {
      console.log(command)
      switch (command) {
        case "exit":
          this.exit();
          break;
      
        default:
          break;
      }
    },
    exit: function() {
      this.$confirm("确定退出吗?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        lockScroll: "true",
        center: true,
        destroyOnClose: true,
        width: "100"
        // roundButton: true
      }).then(() => {
          this.EXIT().then(() => {
            this.$router.push({
              name: "Login"
            });
          });
        })
        // .catch(error => {
        //   this.$message({
        //     type: "warning",
        //     message: error + "：操作已取消",
        //     offset: 250
        //   });
        //   return false;
        // });
    }
  },
  created: () => {
    // getWeather()
  },
  mounted: () => {
    // appendCss()
  }
};
</script>

<style scoped src="@/assets/css/nav.css"></style>