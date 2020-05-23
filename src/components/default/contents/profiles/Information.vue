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
          <el-tooltip effect="light" content="我的消息" placement="top">
            <el-button
              type="info"
              class="animated delay-1s"
              icon="el-icon-thumb"
              plain
              circle
              @click="relatedToMe"
            ></el-button>
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
        <transition appear appear-active-class="bounceInLeft" enter-active-class="bounceInLeft">
          <el-tooltip effect="light" :content="autoClose? '禁用自动关闭':'开启自动关闭'" placement="top">
            <el-button
              :type="autoClose? 'success':'warning'"
              class="animated delay-3s"
              :icon="autoClose? 'el-icon-star-on': 'el-icon-star-off'"
              :plain="!autoClose"
              circle
              @click="autoClose = !autoClose"
            ></el-button>
          </el-tooltip>
        </transition>
        <transition appear appear-active-class="fadeIn" enter-active-class="fadeIn">
          <el-autocomplete
            :class="{searchInfo:true}"
            class="animated delay-2s"
            v-model="keyword"
            :fetch-suggestions="querySearch"
            :placeholder="placeHolder"
            :trigger-on-focus="false"
            @select="handleSelect"
            @blur="handleBlur"
            clearable
          >
            <template slot-scope="{ item }">
              <i
                :class="'el-icon-'+item.content.type"
                :style="{color: matchColor(item.content.type)}"
              ></i>
              {{ item.value }}
            </template>
          </el-autocomplete>
        </transition>
      </div>
    </el-card>
  </section>
</template>

<script>
import { Notification } from "element-ui";
import { getUserName } from "_u/loginMsg";
import { mapState, mapMutations, mapActions } from "vuex";
import dayjs from "dayjs";
export default {
  name: "information",
  data() {
    const informations = [];
    const keyword = "";
    const autoClose = true;
    const queryResult = [];
    let placeHolder = "输入关键字查询";
    return {
      placeHolder,
      queryResult,
      autoClose,
      informations,
      keyword
    };
  },
  methods: {
    ...mapActions({
      INIT_INFORMATION: "profile/INIT_INFORMATION"
    }),
    showInformation(informations) {
      const h = this.$createElement;
      const sources =
        informations.length > 0 ? informations : this.informations;
      console.log(sources.length);
      const position = ["top-right", "top-left", "bottom-left", "bottom-right"];
      let offset = () => (Math.random() * sources.length + 20) | 0;
      sources.forEach(s => {
        setTimeout(() => {
          this.$notify({
            title: s.title,
            type: s.type,
            dangerouslyUseHTMLString: true,
            message: `<span style='color:teal'><b>消息内容：</b>${s.content}。</br><b>发布日期：</b> ${s.timeStamp}</br><b>发布者：</b>${s.publisher} </span>`,
            offset: sources.length == 1 ? 50 : offset(),
            position:
              sources.length == 1
                ? "top-left"
                : position[(Math.random() * position.length + 0) | 0],
            iconClass: "el-icon" + s.type,
            duration: this.autoClose ? offset() * 100 : 0
          });
        }, offset() * 10);
      });
    },
    querySearch(queryString, cb) {
      this.placeHolder = "匹配的消息标题如下";
      let informations = this.informations;
      let results = queryString
        ? informations.filter(this.createFilter(queryString))
        : informations;
      let res = [];
      Object.values(results).forEach(v => {
        res.push({
          value: `${dayjs(v.timeStamp).format("MM月DD日")}的${v.title}`,
          content: v
        });
      });
      this.queryResult = results;
      if (results.length == 0) {
        this.placeHolder = "没有匹配信息，请重新输入";
      }
      cb(res);
      this.keyword = "";
      // this.resetAll();
    },
    createFilter(queryString) {
      return information => {
        for (let [key, value] of Object.entries(information)) {
          if ((key !== "id") & (key !== "type")) {
            return value.search(queryString) != -1;
          }
        }
      };
    },
    relatedToMe() {
      const rtm = this.informations.filter(i => i.receiver != "全体员工");
      this.showInformation(rtm);
    },
    loadAll() {
      if (getUserName() !== null || getUserName !== "") {
        this.INIT_INFORMATION(getUserName())
          .then(res => {
            console.log(res);
            this.informations = Array.from(res);
          })
          .catch(err => {
            this.$message.error({
              message: "初始化系统消息接口调用异常！",
              offset: 230,
              duration: 2000
            });
          });
      }
    },
    handleSelect(value) {
      this.queryResult
        ? this.showInformation([value.content])
        : (this.queryResult = []);
    },
    handleBlur() {
      // console.log(this.keyword);
      this.resetAll();
    },
    closeAll() {
      this.$notify.closeAll();
    },
    resetAll() {
      this.keyword = "";
      this.queryResult = [];
      this.querySearch(queryResult);
      this.placeHolder = "输入关键字查询";
    },
    matchColor(color) {
      const panel = {
        success: { color: "#67C23A" },
        info: { color: "#909399" },
        warning: { color: "#E6A23C" },
        error: { color: "#F56C6C" }
      };
      return panel[color].color;
    }
  },
  computed: {},
  mounted() {
    this.loadAll();
  }
};
</script>

<style scoped src="@/assets/css/information.css"></style>