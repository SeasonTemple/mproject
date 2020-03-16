<template>
  <div class="infinite-list-wrapper" >
    <el-card shadow="never" :class="{topBtn:true}">
      <div class="clearfix animated">
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="全部显示" placement="top">
            <el-button type="primary" class="animated" icon="el-icon-bell" plain>
            </el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="与我有关" placement="top">
            <el-button type="info" class="animated delay-1s" icon="el-icon-thumb" plain></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="全部收起" placement="top">
            <el-button type="danger" class="animated delay-2s" icon="el-icon-close-notification" plain>
            </el-button>
          </el-tooltip>
        </transition>
      </div>
    </el-card>
    <el-timeline v-infinite-scroll="load" infinite-scroll-disabled="disabled" :class="{timeLine: true}" >
      <el-timeline-item :timestamp="rep.timestamp" placement="top" v-for="(rep,i) in reports" :key="i">
        <el-card :key="'timeline' + i" shadow="hover">
          <h4>{{ rep.title }}</h4>
          <p>{{ rep.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <el-card shadow="never" :class="{loadingCard:true}">
      <span v-if="loading" v-loading="loading"></span>
      <span v-if="noMore" :style="{marginLeft:'28px',fontWeight:'bold',color:'rgba(0,0,0,.6)'}">没有更多了</span>
    </el-card>
  </div>
</template>
<script>
  import dayjs from "dayjs";
  export default {
    name: 'report',
    data() {
      let count = 4;
      let reports = [];
      const origin = [];
      let loading = false;
      return {
        count,
        reports,
        loading,
        origin
      }
    },
    methods: {
      load() {
        if (this.count > 4) {
          this.loading = true
          setTimeout(() => {
            this.count += 1
            this.loading = false
          }, 2000)
        } else {
          this.count += 1;
        }
      },
      initOrigin() {
        console.log('initOrigin ' + this.origin);
        if (this.origin.length == 0) {
          const init = () => [{
            id: 1,
            title: '工作总结',
            content: '更新GitHub模板',
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          }, {
            id: 2,
            title: '工作总结',
            content: '完成销售信息展示',
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          }, {
            id: 3,
            title: '工作总结',
            content: '吃的很饱',
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          }, {
            id: 4,
            title: '工作总结',
            content: '下饭下饭',
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          }, {
            id: 5,
            title: '工作总结',
            content: '我擦',
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          }, {
            id: 6,
            title: '工作总结',
            content: '绝了',
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          }, {
            id: 7,
            title: '工作总结',
            content: '是的',
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          }, {
            id: 8,
            title: '工作总结',
            content: '淦',
            timestamp: dayjs().format("YYYY-MM-DD HH:mm:ss")
          }];
          this.origin = init();
        } else {
          return this.origin;
        }
      },
      SyncCount() {
        let count = this.count;
        let repLength = this.reports.length | 0;
        console.log('SyncCount: ' + count + '||' + repLength + '||' + this.origin.slice(repLength, count++));
        this.origin.slice(repLength, ++count).forEach(_ => {
          this.reports.push(_);
        });
      }
    },
    computed: {
      noMore() {
        console.log(`noMore: ${this.origin.length} , ${this.count}`);
        return this.origin.length === this.count;
      },
      disabled() {
        console.log(`noMore: ${this.loading} , ${this.noMore}`);
        return this.loading || this.noMore;
      }
    },
    watch: {
      count: {
        handler: 'SyncCount',
        immediate: false
      },
      origin: {
        handler: 'initOrigin',
        immediate: true
      }
    },
    mounted() {

    }
  }
</script>

<style scoped src="@/assets/css/report.css"></style>