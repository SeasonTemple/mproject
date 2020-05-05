<template>
  <section :class="{infoPanel:true}" direction="vertical">
    <el-card :class="{boxCard:true}" shadow="hover">
      <div class="clearfix animated">
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="全部显示" placement="top">
            <el-button
              type="primary"
              class="animated"
              icon="el-icon-bell"
              plain
              circle
              @click="showInformation"
            ></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="与我有关" placement="top">
            <el-button type="info" class="animated delay-1s" icon="el-icon-thumb" plain circle></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" content="全部收起" placement="top">
            <el-button
              type="danger"
              class="animated delay-2s"
              icon="el-icon-close-notification"
              plain
              circle
              @click="closeAll"
            ></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="fadeIn" enter-active-class="fadeIn">
          <el-autocomplete
            :class="{searchInfo:true}"
            class="animated delay-2s"
            v-model="keyword"
            :fetch-suggestions="querySearch"
            placeholder="查询指定消息"
            :trigger-on-focus="false"
            @select="handleSelect"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-autocomplete>
        </transition>
      </div>
      <!-- <div class="infoField">
      </div>-->
    </el-card>
  </section>
</template>

<script>
import { Notification } from "element-ui";
import dayjs from "dayjs";
export default {
  name: "information",
  data() {
    const informations = [];
    const keyword = "";
    return {
      informations,
      keyword
    };
  },
  methods: {
    showInformation() {
      const h = this.$createElement;
      const sources = this.informations;
      const position = ["top-right", "top-left", "bottom-left", "bottom-right"];
      // console.log((Math.random() * position.length | 0));
      sources.forEach(s => {
        let offset = () => (Math.random() * 20 + 20) | 0;
        this.timer = setTimeout(() => {
          this.$notify({
            title: s.title,
            type: s.type,
            dangerouslyUseHTMLString: true,
            message: 
            // h(
              // "i",
              // {
              //   style: "color: teal"
              // },
              "<span style='color:teal'><b>消息内容：</b>"+s.content +"。</br><b>发布日期：</b>"+s.publish + "</span>"
            // )
            ,
            offset: offset(),
            position: position[(Math.random() * position.length + 0) | 0],
            iconClass: "el-icon" + s.type,
            duration: offset() * 100
          });
        }, offset() * 10);
      });
      clearTimeout(this.timer);
      this.timer = null;
    },
    querySearch(queryString, cb) {
      var informations = this.informations;
      var results = queryString
        ? informations.filter(this.createFilter(queryString))
        : informations;
      cb(results);
    },
    createFilter(queryString) {
      return information => {
        return (
          information.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [
        {
          id: 1,
          title: "您的ID为013的申请已受理",
          content: "恭喜您，审核已通过！",
          type: "success",
          publish: dayjs().format("YYYY-MM-DD")
        },
        {
          id: 2,
          title: "您的ID为031的申请已受理",
          content: "很遗憾，审核未通过：请假时间过长！",
          type: "error",
          publish: dayjs().format("YYYY-MM-DD")
        },
        {
          id: 3,
          title: "您的ID为031的申请已受理",
          content: "很遗憾，审核未通过：审核过期！",
          type: "error",
          publish: dayjs().format("YYYY-MM-DD")
        },
        {
          id: 4,
          title: "通知：受疫情影响，本月仍需戴口罩上岗",
          content: "未戴口罩者，按旷工处理",
          type: "warning",
          publish: dayjs().format("YYYY-MM-DD")
        },
        {
          id: 5,
          title: "通知：本周五一假期为5月1号至5号",
          content: "祝全体员工节日快乐！",
          type: "info",
          publish: dayjs().format("YYYY-MM-DD")
        },
        {
          id: 6,
          title: "您的ID为031的申请已受理",
          content: "很遗憾，审核未通过：理由不够充分！",
          type: "error",
          publish: dayjs().format("YYYY-MM-DD")
        },
        {
          id: 7,
          title: "您的ID为021的申请已受理",
          content: "很遗憾，审核未通过：日期选择错误！",
          type: "error",
          publish: dayjs().format("YYYY-MM-DD")
        },
        {
          id: 8,
          title: "您的ID为113的申请已受理",
          content: "恭喜您，审核已通过！",
          type: "success",
          publish: dayjs().format("YYYY-MM-DD")
        },{
          id: 9,
          title: "测试",
          content: ".......",
          type: "info",
          publish: dayjs("2019-12-31").format("YYYY-MM-DD")
        },
        {
          id: 11,
          title: "测试",
          content: ".......",
          type: "info",
          publish: dayjs("2019-12-31").format("YYYY-MM-DD")
        },
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
};
</script>

<style scoped src="@/assets/css/information.css"></style>