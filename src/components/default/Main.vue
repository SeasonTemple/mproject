<template>
  <el-row class="main">
    <el-col :span="24">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" editable>
        <el-tab-pane name="first" :key="'first'">
          <span slot="label"><i class="el-icon-s-home"></i> 控制台</span>
          <div id="tpWeatherWidget"></div>
          <home v-if="isChildUpdate1"></home>
        </el-tab-pane>
        <el-tab-pane label="tab2" name="second" :key="'second'">
          <staff v-if="isChildUpdate2"></staff>
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
      return {
        //默认第一个选项卡
        activeName: "first",
        isChildUpdate1: true,
        isChildUpdate2: false
      }
    },
    beforeMount() {
      getWeather();
    },
    mounted() {
      appendCss();
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