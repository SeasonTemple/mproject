<template>
  <el-row class="main">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-loading="drawLoading">
      <el-tabs
        v-model="activeName"
        :style="{ background: '#fafafa' }"
        type="card"
        closable
        @tab-remove="removeTab"
      >
        <el-tab-pane name="控制台" :key="'first'" v-loading="drawLoading" :closable="false">
          <span slot="label">
            <i class="el-icon-monitor"></i> 控制台
          </span>
          <!-- <home v-if="isChildUpdate1"></home> @tab-click="handleClick($event.name)"-->
          <keep-alive>
            <home />
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="second" name="second" :key="'second'" v-loading="drawLoading">
          <span slot="label">
            <i class></i> 个人中心
          </span>
          <keep-alive>
             <profile /> 
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="third" name="third" :key="'third'" v-loading="drawLoading">
          <span slot="label">
            <i class></i> 职工管理
          </span>
          <staff v-if="isChildUpdate3"></staff>
        </el-tab-pane>
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
    staff: () => import("@/components/default/contents/hr/Staff"),
    profile: () => import("@/components/default/contents/Profile")
  },
  data() {
    let drawLoading = false;
    let routers = [];
    let editableTabsValue= 'console';
    let editableTabs= [{
        title: 'index',
        name: 'index'
      }];
    let tabIndex= '/console';
    let openedTab= ['/console'];
    return {
      //默认第一个选项卡
      openedTab,
      editableTabs,
      editableTabsValue,
      activeName: "控制台",
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
      DEDUCT_TAB: "main/deductTab"
    }),
    handleClick(router) {
      this.CHANGE_TAB(router)
      this.$router.push(router)
    },
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
       let tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }
      this.DEDUCT_TAB(targetName)
      let deductIndex = this.openedTab.indexOf(targetName)
      this.openedTab.splice(deductIndex, 1)
      this.$router.push(activeName)
      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
      if (this.openedTab.length === 0) {
        this.ADD_TAB('/console')
        this.$router.push('/console')
      }
    }
  },
  computed: {
    ...mapState({
      OPEN_TAB: state => state.main.openedTab,
      ACTIVE_TAB: state => state.main.activeTab
    }),
     getOpenedTab () {
      console.log(this.OPEN_TAB)
      return this.OPEN_TAB;
    },
    changeTab () {
      return this.ACTIVE_TAB;
    }
  },
  mounted() {
    this.timer = setTimeout(() => {
      this.drawLoading = false;
    }, 2500);
  },
  watch: {
    getOpenedTab (val) {
      if (val.length > this.openedTab.length) {
        let newTab = val[val.length - 1] // 新增的肯定在数组最后一个
        console.log(newTab)
        ++this.tabIndex
        this.editableTabs.push({
          title: newTab,
          name: newTab,
          content: ''
        })
        this.editableTabsValue = newTab
        this.openedTab.push(newTab)
      }
    },
    changeTab (val) {
      // 监听activetab以实现点击左侧栏时激活已存在的标签
      if (val !== this.editableTabsValue) {
        this.editableTabsValue = val
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
<style>
/* .container-tab>>>.el-tabs__content {
    flex-grow: 1;
    overflow-y: auto !important;
  } */

/* .el-tabs__header .is-top {
    position: relative;
  } */
</style>