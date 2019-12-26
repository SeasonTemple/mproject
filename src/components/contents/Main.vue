<template>
  <el-row id="main">
    <el-col :span="24">
      <!-- <div style="margin-bottom: 20px;">
      </div> -->
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane v-for="(item) in editableTabs" :key="item.name" :label="item.title" :name="item.name">
        <el-button size="small" @click="addTab(editableTabsValue)">
          add tab
        </el-button>
          {{item.content}}
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "main",
    components:{
    },
    data() {
      return {
        editableTabsValue: '2',
        editableTabs: [{
          title: 'Tab 1',
          name: '1',
          content: 'Tab 1 content'
        }, {
          title: 'Tab 2',
          name: '2',
          content: 'Tab 2 content'
        }],
        tabIndex: 2
      }
    },
    methods: {
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

<style scoped>
  #main {
    background-color: rgba(11, 111, 1, 0.5);
    height: 100%;
    width: 100%;
  }
</style>