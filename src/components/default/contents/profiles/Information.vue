<template>
  <section :class="{infoPanel:true}" direction="vertical">
    <el-card :class="{boxCard:true}" shadow="hover">
      <div class="clearfix animated">
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="全部显示" placement="top">
            <el-button type="primary" class="animated" icon="el-icon-bell" plain circle @click="showInformation">
            </el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="与我有关" placement="top">
            <el-button type="info" class="animated delay-1s" icon="el-icon-thumb" plain circle></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="全部收起" placement="top">
            <el-button type="danger" class="animated delay-2s" icon="el-icon-close-notification" plain circle @click="closeAll">
            </el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="fadeIn" enter-active-class="fadeIn">
          <el-autocomplete :class="{searchInfo:true}" class="animated delay-2s"  v-model="keyword" :fetch-suggestions="querySearch"
            placeholder="查询指定消息" :trigger-on-focus="false" @select="handleSelect">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-autocomplete>
        </transition>
      </div>
      <!-- <div class="infoField">
      </div> -->
    </el-card>
  </section>
</template>

<script>
  import {
    Notification
  } from 'element-ui';
  export default {
    name: 'information',
    data() {
      const informations = [];
      const keyword = '';
      return {
        informations,
        keyword
      }
    },
    methods: {
      showInformation() {
        const h = this.$createElement;
        const sources = this.informations;
        const position = ['top-right', 'top-left', 'bottom-left', 'bottom-right'];
        // console.log((Math.random() * position.length | 0));
        sources.forEach(s => {
          let offset = () => Math.random() * 20 + 20 | 0;
          this.timer = setTimeout(() => {
            this.$notify({
              title: s.title,
              type: s.type,
              message: h('i', {
                style: 'color: teal'
              }, s.content),
              offset: offset(),
              position: position[Math.random() * position.length + 0 | 0],
              //   customClass: 'animated fadeIn',
              iconClass: 'el-icon' + s.type,
              duration: offset() * 100
            });
          }, offset() * 10);
        });
        clearTimeout(this.timer);
        this.timer = null;
      },
      querySearch(queryString, cb) {
        var informations = this.informations;
        var results = queryString ? informations.filter(this.createFilter(queryString)) : informations;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (information) => {
          return (information.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
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
            type: 'warning',
            publish: new Date()
          }, {
            id: 5,
            title: '这饭',
            content: '真香',
            type: 'error',
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
        this.$notify.closeAll();
      }
    },
    mounted() {
      this.informations = this.loadAll();
    }
  }
</script>

<style scoped src="@/assets/css/information.css"></style>