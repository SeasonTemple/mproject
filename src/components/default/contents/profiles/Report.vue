<template>
  <el-timeline>
    <el-timeline-item timestamp="2018/4/12" placement="top" v-for="i in count" :key="i" v-infinite-scroll="load"
      style="overflow:auto" infinite-scroll-delay=300 infinite-scroll-distance=100>
      <el-card shadow="hover" v-loading="loading">
        <h4>更新 Github 模板</h4>
        <p>王小虎 提交于 2018/4/12 20:46</p>
      </el-card>
    </el-timeline-item>
    <el-card shadow="hover" :class="{loadingCard:true}">
      <span v-loading="noMore">
      </span>
    </el-card>
  </el-timeline>
</template>
<script>
  export default {
    name: 'report',
    data() {
      const count = 3;
      const reports = [];
      let loading = false;
      return {
        count,
        reports,
        loading
      }
    },
    methods: {
      load() {
        // this.count > 6 ? this.count : 
        if (this.count > 4) {
          return this.count;
        }
        this.loading = true
        setTimeout(() => {
          this.count += 1;
          this.loading = false
        }, 2000)
      },
      noMore() {
        return this.count >= 4
      },
      disabled() {
        return this.loading || this.noMore
      }
    },
    mounted() {}
  }
</script>

<style scoped src="@/assets/css/report.css"></style>