<template>
  <el-row class="main">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" v-loading='drawLoading'>
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" :style="{ background: '#fafafa' }">
        <el-tab-pane label="first" name="first" :key="'first'" v-loading='drawLoading'>
          <span slot="label"><i class="el-icon-monitor"></i> 控制台</span>
          <home v-if="isChildUpdate1"></home>
        </el-tab-pane>
        <el-tab-pane label="second" name="second" :key="'second'" v-loading='drawLoading'>
          <span slot="label"><i class=""></i> 个人中心</span>
          <keep-alive>
            <profile v-if="isChildUpdate2"></profile>
          </keep-alive>
        </el-tab-pane>
        <el-tab-pane label="third" name="third" :key="'third'" v-loading='drawLoading'>
          <span slot="label"><i class=""></i> 职工管理</span>
          <staff v-if="isChildUpdate3"></staff>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "mainContent",
    components: {
      home: () => import('@/components/default/contents/Home'),
      staff: () => import('@/components/default/contents/hr/Staff'),
      profile: () => import('@/components/default/contents/Profile')
    },
    data() {
      let drawLoading = false;
      return {
        //默认第一个选项卡
        activeName: "first",
        isChildUpdate1: true,
        isChildUpdate2: false,
        isChildUpdate3: false,
        drawLoading
      }
    },
    methods: {
      handleClick(tab) {
        if (tab.name == "first") {
          this.isChildUpdate1 = true;
          this.isChildUpdate2 = false;
          this.isChildUpdate3 = false;
        } else if (tab.name == "second") {
          this.isChildUpdate1 = false;
          this.isChildUpdate2 = true;
          this.isChildUpdate3 = false;
        } else {
          this.isChildUpdate1 = false;
          this.isChildUpdate2 = false;
          this.isChildUpdate3 = true;
        }
      },
      addTab(targetName) {
        let newTabName = ++this.tabIndex + '';
        this.editableTabs.push({
          title: 'New Tab',
          name: newTabName,
          content: 'New Tab content'
        });
        this.editableTabsValue = newTabName;
      },
      removeTab(targetName) {
        let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName);
      }
    },
    mounted() {
      this.timer = setTimeout(() => {
        this.drawLoading = false;
      }, 2000);
    },
    beforeDestroy() {
      clearTimeout(this.timer);
      this, timer = null;
    }
  }
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