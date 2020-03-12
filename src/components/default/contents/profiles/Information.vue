<template>
  <el-container :class="{infoPanel:true}" direction="vertical">
    <el-card class="box-card" shadow="always">
      <div class="clearfix">
        <el-tooltip effect="light" content="查看所有" placement="bottom">
          <el-button type="primary" icon="el-icon-bell" plain circle @click="showInformations"></el-button>
        </el-tooltip>
        <el-tooltip effect="light" content="与我有关" placement="bottom">
          <el-button type="info" icon="el-icon-thumb" plain circle></el-button>
        </el-tooltip>
        <el-tooltip effect="light" content="全部收起" placement="bottom">
          <el-button type="danger" icon="el-icon-close-notification" plain circle @click="closeAll">
          </el-button>
        </el-tooltip>
        <el-autocomplete class="inline-input" v-model="keyword" :fetch-suggestions="querySearch" placeholder="查询指定消息"
          :trigger-on-focus="false" @select="handleSelect">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-autocomplete>
      </div>
      <!-- <div class="infoField">
      </div> -->
    </el-card>
  </el-container>
</template>

<script>
  import {
    Notification
  } from 'element-ui';
  export default {
    name: 'information',
    data() {
      const infomations = [];
      const keyword = '';
      return {
        infomations,
        keyword
      }
    },
    methods: {
      showInformations() {
        const h = this.$createElement;
        const sources = this.infomations;
        const postion = ['top-right', 'top-left', 'bottom-left', 'bottom-right'];
        console.log((Math.random() * postion.length | 0));
        sources.forEach(s => {
          let offset = () => Math.random() * 20 | 0;
          this.timer = setTimeout(() => {
            Notification({
              title: s.title,
              type: s.type,
              message: h('i', {
                style: 'color: teal'
              }, s.content),
              offset: offset(),
              position: postion[Math.random() * postion.length + 0 | 0],
              customClass: 'i',
              iconClass: 'el-icon' + s.type,
              duration: 0
            });
          }, offset() * 10);
        });
        clearTimeout(this.timer);
        this.timer = null;
      },
      querySearch(queryString, cb) {
        var infomations = this.infomations;
        var results = queryString ? infomations.filter(this.createFilter(queryString)) : infomations;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (infomation) => {
          return (infomation.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [{
            id: 1,
            title: '这饭',
            content: '真香',
            type: 'info',
            publish: new Date()
          },
          {
            id: 2,
            title: '卧槽',
            content: '得劲儿',
            type: 'success',
            publish: new Date()
          }, {
            id: 3,
            title: '这饭',
            content: '真香',
            type: 'info',
            publish: new Date()
          },
          {
            id: 4,
            title: '卧槽',
            content: '得劲儿',
            type: 'success',
            publish: new Date()
          }, {
            id: 5,
            title: '这饭',
            content: '真香',
            type: 'info',
            publish: new Date()
          },
          {
            id: 6,
            title: '卧槽',
            content: '得劲儿',
            type: 'success',
            publish: new Date()
          }, {
            id: 7,
            title: '这饭',
            content: '真香',
            type: 'info',
            publish: new Date()
          },
          {
            id: 8,
            title: '卧槽',
            content: '得劲儿',
            type: 'success',
            publish: new Date()
          }
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      closeAll() {
        Notification.closeAll();
      }
    },
    mounted() {
      this.infomations = this.loadAll();
    }
  }
</script>

<style scoped src="@/assets/css/information.css"></style>