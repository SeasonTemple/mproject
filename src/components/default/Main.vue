<template>
  <el-row class="main">
    <el-col :span="24">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" >
        <el-tab-pane name="first" :key="'first'">
          <span slot="label"><i class="el-icon-monitor"></i> 控制台</span>
          <home v-if="isChildUpdate1" v-loading='drawLoading'></home>
        </el-tab-pane>
        <el-tab-pane label="second" name="second" :key="'second'">
          <span slot="label"><i class=""></i> 职员信息</span>
          <staff v-if="isChildUpdate2" v-loading='drawLoading'></staff>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
  import { getWeather, appendCss } from "_u/weather";
  export default {
    name: "mainContent",
    components: {
      home: () => import('@/components/default/contents/Home'),
      staff: () => import('@/components/default/contents/Staff')
    },
    data() {
      let drawLoading = false;
      return {
        //默认第一个选项卡
        activeName: "first",
        isChildUpdate1: true,
        isChildUpdate2: false,
        drawLoading
      }
    },
    methods: {
      handleClick(tab) {
        if (tab.name == "first") {
          this.isChildUpdate1 = true;
          this.isChildUpdate2 = false;
        } else if (tab.name == "second") {
          this.isChildUpdate1 = false;
          this.isChildUpdate2 = true;
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
      setTimeout(() => {
        this.drawLoading = false;
      }, 2000);
    }
  }
</script>

<style scoped src="@/assets/css/main.css"></style>
<style>
  .container-tab>>>.el-tabs__content {
    flex-grow: 1;
    overflow-y: scroll !important;
  }

  .el-tabs__header .is-top {
    position: relative;
  }
</style>