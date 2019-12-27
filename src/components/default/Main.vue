<template>
  <el-row id="main">
    <el-col :span="24">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" editable="">
        <el-tab-pane label="tab1" name="first" :key="'first'">
          <child1 v-if="isChildUpdate1"></child1>
        </el-tab-pane>
        <el-tab-pane label="tab2" name="second" :key="'second'">
          <child2 v-if="isChildUpdate2"></child2>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "main",
    components: {
      child1: () => import('@/components/default/contents/Profile')
    },
    data() {
      return {
        //默认第一个选项卡
        activeName: "first",
        isChildUpdate1: true,
        isChildUpdate2: false
      }
    },
    mounted() {

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
      }
    }
  }
</script>

<style scoped>
  #main {
    /* background-color: rgba(11, 111, 1, 0.5); */
    height: 100% !important;
    width: auto;
    border-width: 3px solid;
    border-color: red;
  }

  /* .el-tabs__content {
    height: 100% !important;
  } */
</style>