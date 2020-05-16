<template>
  <el-row class="main">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-loading="drawLoading">
      <el-tabs
        v-model="activeName"
        :class="{tabStyle:true}"
        type="card"
        closable
        @tab-click="handleClickTab($event.name)"
        @tab-remove="removeTab"
      >
        <template v-for="item in editableTabs">
          <el-tab-pane v-if="editableTabs!=''" :key="item.name" :name="item.name">
            <span slot="label">
              <i class></i>
              {{ item.title }}
            </span>
            <component :is="activeName" :userDetail="userDetail"></component>
          </el-tab-pane>
        </template>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { getUserName } from "_u/loginMsg.js";
import { InitUserData } from "_a/main.js";
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
    let userDetail = {};
    let drawLoading = false;
    let routers = [];
    let editableTabsValue = "home";
    let activeName = "home";
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
      userDetail,
      centers,
      openedTab,
      editableTabs,
      editableTabsValue,
      activeName,
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
    getUsers: function() {
      if (getUserName() != "" || getUserName() != null) {
        InitUserData({ userName: getUserName() })
          .then(res => {
            let status = res.data.code;
            let data = res.data.data;
            if (status == 10200 || status == 10201) {
              Object.assign(this.userDetail, data);
              console.log(this.userDetail);
            } else {
              this.$message.error({
                dangerouslyUseHTMLString: true,
                message: `<strong>获取用户信息异常：${res.msg}</strong> `,
                offset: 100,
                duration: 2000
              });
            }
          })
          .catch(err => {
            this.$message.error({
              dangerouslyUseHTMLString: true,
              message: `<strong>调用用户信息接口失败：${err.msg}</strong> `,
              offset: 100,
              duration: 2000
            });
          });
      }
    },
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
    },
    initTabs() {
      let tabs = this.OPEN_TAB;
      let currentTabs = [];
      console.log(tabs +"///"+ this.openedTab);
      if (tabs.length > this.openedTab.length) {
        tabs
          .filter(t => t != "home")
          .forEach(t => {
            if (this.editableTabs.indexOf(t) == -1) {
              if(this.centers.indexOf(t) === -1){
                this.editableTabs.push(this.routerNameMatcher(t));
              }else{
                this.editableTabs.push(this.routerNameMatcher("profile"));
                this.changeProfileTab(t);
              }
            }
          });
      }
    }
  },
  computed: {
    ...mapState({
      OPEN_TAB: state => state.main.openedTab,
      ACTIVE_TAB: state => state.main.activeTab
    }),
    initUserDetail() {
      // if (this.userDetail == []) {
        return this.getUsers();
      // }
    },
    getOpenedTab() {
      console.log("OPEN_TAB:" + this.OPEN_TAB);
      // this.openedTab = this.OPEN_TAB;
      return this.OPEN_TAB;
    },
    changeTab() {
      return this.ACTIVE_TAB;
    },
    fetchUserData() {}
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.drawLoading = false;
    }, 2500);
    this.initUserDetail;
  },
  watch: {
    getOpenedTab(val) {
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
  },
  updated() {
    this.initTabs();
  }
};
</script>

<style scoped src="@/assets/css/main.css"></style>