<template>
  <el-row :span="24" class="Nav">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="rgba(9, 10, 57, 0.7)"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-row type="flex" justify="space-between">
        <el-col :xs="5" :sm="5" :md="4" :lg="4" :xl="5">
          <transition
            appear
            appear-active-class="flipInY-active"
            enter-active-class="flipInY-active"
          >
            <el-image alt="logo" class="siteSymbol animated" :src="url.img4" fit="contain" lazy></el-image>
          </transition>
        </el-col>
        <keep-alive>
          <el-col
            :xs="4"
            :sm="4"
            :md="4"
            :lg="4"
            :xl="4"
            id="tp-weather-widget"
            :class="{weather:true}"
            :push="5"
          ></el-col>
        </keep-alive>
        <el-row :gutter="20" :style="{margin: '0 10px 0 0'}">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <transition
              appear
              appear-active-class="bounceInRight"
              enter-active-class="bounceInRight"
            >
              <el-tooltip effect="dark" content="签到打卡" placement="bottom">
                <el-button
                  class="animated delay-3s"
                  :class="{navConsole:true}"
                  circle
                  icon="el-icon-finished"
                  @click="markDate"
                ></el-button>
              </el-tooltip>
            </transition>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <transition
              appear
              appear-active-class="bounceInRight"
              enter-active-class="bounceInRight"
            >
              <el-tooltip effect="dark" content="退出登录" placement="bottom">
                <el-button
                  class="animated delay-2s"
                  :class="{logOutBtn:true}"
                  circle
                  icon="el-icon-switch-button"
                  @click="exit"
                ></el-button>
              </el-tooltip>
            </transition>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <transition
              appear
              appear-active-class="bounceInRight"
              enter-active-class="bounceInRight"
            >
              <!-- <el-tooltip effect="dark" content="个人中心" placement="bottom"> -->
                <el-avatar
                  class="animated delay-1s"
                  :size="46"
                  :style="{margin: '23px 0 0 0'}"
                  :src="avatarUrl"
                  fit="contain"
                  :lazy="true"
                ></el-avatar>
              <!-- </el-tooltip> -->
            </transition>
          </el-col>
        </el-row>
      </el-row>
    </el-menu>
  </el-row>
</template>

<script>
import img1 from "@/assets/symbol.png";
import img2 from "@/assets/img/default-avatar.png";
import img3 from "@/assets/symbol-2.png";
import img4 from "@/assets/symbol-3.png";
import { getWeather } from "_u/weather.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "navBar",
  data() {
    let url = {
      img1: img1,
      img2: img2,
      img3: img3,
      img4: img4
    };
    let avatarUrl = "";
    let activeIndex = "1";
    let msg = true;
    return {
      avatarUrl,
      activeIndex,
      url,
      msg
    };
  },
  methods: {
    ...mapMutations({
      CLEAN_TABS: "main/CLEAN_TABS",
      CHECK_IN: "profile/CHECK_IN"
    }),
    ...mapGetters({
      Get_Attendance: "profile/attendance",
      Get_ToDay: "profile/toDay",
      Get_UserDetail: "main/USERDETAIL"
    }),
    ...mapActions({
      USER_CHECK_IN: "profile/USER_CHECK_IN",
      EXIT: "login/EXIT"
    }),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleCommand: function(command) {
      console.log(command);
      switch (command) {
        case "exit":
          this.exit();
          break;

        default:
          break;
      }
    },
    markDate() {
      let date = this.Get_ToDay();
      if (date.time < 1) {
        date.time += 1;
        date.first = dayjs().format("YYYY-MM-DD HH:MM:ss");
        date.userId = this.USERDETAIL.id;
        this.CHECK_IN(date);
        this.$message.success({
          message: `${date.first}：本日第一次签到成功！`,
          offset: 150
        });
      } else if (date.time == 1) {
        date.time += 1;
        date.second = dayjs().format("YYYY-MM-DD HH:MM:ss");
        this.CHECK_IN(date);
        this.$message.success({
          dangerouslyUseHTMLString: true,
          message: `${date.second}：本日第二次签到完成！`,
          offset: 200,
          duration: 3000
        });
        this.USER_CHECK_IN(date)
          .then(res => {
            this.$message.success({
              dangerouslyUseHTMLString: true,
              message: `同步${res}`,
              offset: 200,
              duration: 3000
            });
          })
          .catch(err => {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: `同步签到信息异常：${err}`,
              offset: 200,
              duration: 3000
            });
          });
      } else if (date.time == 2) {
        this.$message.error({
          message: "打卡次数已达两次，请勿重复打卡！",
          offset: 200,
          duration: 2000
        });
      }
    },
    exit: function() {
      this.$confirm("你确定要退出吗?", "警告", {
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        type: "error",
        confirmButtonClass: "exitBtn",
        lockScroll: true,
        width: "100"
      })
        .then(() => {
          this.CLEAN_TABS();
          this.EXIT().then(() => {
            this.$router.push({
              name: "Login"
            });
          });
        })
        .catch(error => {
          // this.$message({
          //   type: "warning",
          //   message: error + "：操作已取消",
          //   offset: 100
          // });
          return false;
        });
    },
    initAvatar(value) {
      console.log(Object.keys(value).length ==0)
      let detail = value.avatarUrl;
      if (Object.keys(value).length > 0) {
        this.avatarUrl = detail;
      } else {
        this.avatarUrl = this.url.img2;
      }
    }
  },
  computed: {
    ...mapState({
      USERDETAIL: state => state.main.userDetail,
      TODAY: state => state.profile.toDay
    })
  },
  watch: {
    USERDETAIL: {
      handler: "initAvatar",
      immediate: true
    }
  },
  mounted() {
    getWeather();
    // this.initAvatar();
  },
  beforeUpdate() {
    getWeather();
  }
};
</script>
<style scoped src="@/assets/css/nav.css"></style>