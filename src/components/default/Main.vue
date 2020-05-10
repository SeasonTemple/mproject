<template>
  <el-row class="main">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-loading="drawLoading">
      <el-tabs
        v-model="activeName"
        :style="{ background: '#fafafa' }"
        type="card"
        closable
        @tab-click="handleClickTab($event.name)"
        @tab-remove="removeTab"
      >
        <!-- <el-tab-pane name="home" :key="'first'" v-loading="drawLoading" :closable="false">
          <span slot="label">
            <i class="el-icon-monitor"></i> 控制台
          </span>
          <keep-alive>
            <home />
          </keep-alive>
        </el-tab-pane>-->
        <template v-for="item in editableTabs">
          <el-tab-pane v-if="editableTabs!=''" :key="item.name" :name="item.name">
            <span slot="label">
              <i class></i>
              {{ item.title }}
            </span>
            <component :is="activeName" user="廖文岵"></component>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "mainContent",
  components: {
    home: () => import("@/components/default/contents/Home"),
    profile: () => import("@/components/default/contents/Profile"),
    staff: () => import("@/components/default/contents/hr/Staff"),
    department: () => import("@/components/default/contents/hr/Department"),
    requestMg: () => import("@/components/default/contents/hr/RequestMg"),
    salaryMg: () => import("@/components/default/contents/hr/SalaryMg"),
    account: () => import("@/components/default/contents/system/Account"),
    menuMg: () => import("@/components/default/contents/system/MenuMg"),
    infoMg: () => import("@/components/default/contents/system/InfoMg"),
    systemLog: () => import("@/components/default/contents/system/SystemLog")
  },
  data() {
    let drawLoading = false;
    let routers = [];
    let editableTabsValue = "home";
    let editableTabs = [
      {
        title: "控制台",
        name: "home"
      }
    ];
    let tabIndex = 0;
    let openedTab = ["home"];
    let centers = [
      "detail",
      "information",
      "report",
      "request",
      "process",
      "analyze"
    ];
    return {
      centers,
      openedTab,
      editableTabs,
      editableTabsValue,
      activeName: "home",
      isChildUpdate1: true,
      isChildUpdate2: false,
      isChildUpdate3: false,
      drawLoading
    };
  },
  methods: {
    ...mapMutations({
      ADD_TAB: "main/addTab",
      CHANGE_TAB: "main/changeTab",
      DEDUCT_TAB: "main/deductTab",
      CHANGE_PROFILE: "profile/CHANGE_TAB"
    }),
    handleClickTab(router) {
      this.CHANGE_TAB(router);
      this.activeName = router;
      console.log(router);
      // this.$router.push({ name: router });
      // this.$router.replace({ name: `${router}` });
    },
    addTab(targetName) {
      // let newTabName = targetName;
      console.log(this.routerNameMatcher(targetName));
      this.editableTabs.push({
        title: this.routerNameMatcher(targetName),
        name: targetName
        // content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      if (targetName == "home") {
        return;
      }
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              console.log(nextTab);
              activeName = nextTab.name;
            }
          }
        });
      }
      this.DEDUCT_TAB(targetName);
      let deductIndex = this.openedTab.indexOf(targetName);
      this.openedTab.splice(deductIndex, 1);
      // this.$router.push(activeName);
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      if (this.openedTab.length === 0) {
        this.ADD_TAB("home");
        // this.$router.replace("/index");
        this.activeName = "home";
      } else {
        this.activeName = activeName;
      }
    },
    routerNameMatcher(router) {
      let routers = this.$router.options.routes
        .filter(r => r.path != "/index")
        .filter(r => r.name != "Base")
        .filter(r => r.name != "Login");
      let res = { title: "", name: "" };
      if (router == "profile") {
        res.title = "个人中心";
        res.name = "profile";
        return res;
      }
      routers.find(r => {
        r.children.find(c => {
          if (c.path == router) {
            console.log(c.meta.title);
            name = c.meta.title;
          }
        });
      });
      res.title = name;
      res.name = router;
      return res;
    },
    changeProfileTab(router) {
      console.log("changeProfileTab" + router);
      this.CHANGE_PROFILE(router);
    }
  },
  computed: {
    ...mapState({
      OPEN_TAB: state => state.main.openedTab,
      ACTIVE_TAB: state => state.main.activeTab
    }),
    getOpenedTab() {
      console.log("OPEN_TAB:" + this.OPEN_TAB);
      // this.openedTab = this.OPEN_TAB;
      return this.OPEN_TAB;
    },
    changeTab() {
      return this.ACTIVE_TAB;
    },
    fetchUserData(){

    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.drawLoading = false;
    }, 2500);
  },
  watch: {
    getOpenedTab(val) {
      console.log(
        "getOpenedTab: " + val + "||" + this.openedTab.length +"//"+ this.OPEN_TAB.length
      );
      if (val.length > this.openedTab.length) {
        let newTab = val[val.length - 1]; // 新增的肯定在数组最后一个
        let res = this.routerNameMatcher(newTab);
        ++this.tabIndex;
        this.editableTabs.push({
          title: res.title,
          name: res.name
          // content: ""
        });
        this.activeName = res.name;
        this.editableTabsValue = newTab;
        this.openedTab.push(newTab);
      }
    },
    changeTab(val) {
      // 监听activetab以实现点击左侧栏时激活已存在的标签
      if (val !== this.editableTabsValue) {
        this.editableTabsValue = val;
      }
    }
  },
  created() {
    // this.$router.push('/console');
  },
  beforeDestroy() {
    clearTimeout(this.timer);
    this.timer = null;
  }
};
</script>

<style scoped src="@/assets/css/main.css"></style>