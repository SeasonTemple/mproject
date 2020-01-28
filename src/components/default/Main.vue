<template>
  <el-row id="main">
    <el-col :span="24">
      <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card">
        <el-tab-pane label="控制台" name="first" :key="'first'">
          <home v-if="isChildUpdate1"></home>
        </el-tab-pane>
        <el-tab-pane label="tab2" name="second" :key="'second'">
          <childStaff v-if="isChildUpdate2"></childStaff>
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
      childStaff: () => import('@/components/default/contents/Staff')
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

<style scoped src="@/assets/css/main.css"></style>
