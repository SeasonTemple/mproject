<template>
  <div class="pbx el-container">
    <el-col class="leftCard" :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
      <el-card shadow="always">
        <div slot="header" class="clearfix top">
          <span>个人信息</span>
        </div>
        <div :class="{leftContent:true}">
          <div :class="{userProfile:true}">
            <div class="wel">
              <span>廖文岵</span>
            </div>
            <el-avatar
              :size="110"
              class="avatar"
              src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
              fit="contain"
            ></el-avatar>
            <el-tag type="success" class="authTag" effect="dark">管理员</el-tag>
          </div>
          <section class="tagWall">
            <el-divider></el-divider>
            <span class="header">标签墙</span>
            <div class="tags">
              <el-tag
                v-for="(tag,index) in tags"
                :key="index"
                closable
                :type="tag.type"
                effect="light"
                @close="handleClose(tag)"
              >
                {{tag.name}}
                <el-divider direction="vertical"></el-divider>
                {{tag.description}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model.trim="tagInput"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
                clearable
                placeholder="使用标点符号隔开单词"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 添加标签</el-button>
            </div>
          </section>
        </div>
      </el-card>
    </el-col>
    <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" class="rightCard">
      <el-card shadow="always" :class="{rightContent:true}">
        <el-tabs v-model="currentTab" class="animated fadeIn" @tab-click="handleClick($event.name)">
          <template v-for="(tab,index) in tabPanels">
            <el-tab-pane :name="tab.name" :class="{inner:true}" :key="index" lazy>
              <span slot="label">{{ tab.label }}</span>
            </el-tab-pane>
          </template>
          <!-- <keep-alive> -->
          <component :is="switchTab" :userDetail="userDetail"></component>
          <!-- </keep-alive> -->
        </el-tabs>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
const path = require("path");
const files = require.context("_d/", false, /\.vue$/);
const modules = {};
// .filter(key => path.basename(key, ".vue") != "Analyze")
files.keys().forEach(key => {
  const name = path.basename(key, ".vue");
  modules[name] = files(key).default || files(key);
});
export default {
  name: "profile",
  components: modules,
  props: {
    userDetail: Object
  },
  data() {
    let tabPanels = [];
    let currentTab = "detail";
    let tags = [
      {
        name: "姓名",
        type: "",
        description: "廖文岵"
      },
      {
        name: "职位",
        type: "success",
        description: "Python开发"
      },
      {
        name: "年龄",
        type: "info",
        description: "21"
      },
      {
        name: "性别",
        type: "warning",
        description: "男"
      },
      {
        name: "出勤",
        type: "",
        description: "连续613天"
      },
      {
        name: "入职时间",
        type: "info",
        description: "2019-9-12"
      },
      {
        name: "所属部门",
        type: "success",
        description: "开发"
      },
      {
        name: "等级",
        type: "danger",
        description: "Lv2"
      }
    ];
    let inputVisible = false;
    let tagInput = "";
    return {
      tags,
      inputVisible,
      tagInput,
      tabPanels,
      currentTab
    };
  },
  methods: {
    ...mapMutations({
      CHANGE_TAB: "profile/CHANGE_TAB"
    }),
    handleClick(tab) {
      console.log("handleClick: " + tab + "//" + this.CURRENT_TAB);
      this.currentTab = tab;
      this.switchTab;
    },
    handleClose(tag) {
      this.tags.splice(this.tags.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      let tagInput = this.tagInput;
      const randomType = _ => _[(Math.random() * _.length) | 0];
      const opts = ["", "info", "danger", "warning", "success"];
      const reg = /\s+|[\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\。|\、|\，]/g;
      if (tagInput) {
        let ary = tagInput
          .replace(/<[^>]+>/gi, "")
          .replace(reg, "/")
          .split("/");
        let name = "默认标题",
          description = ["默认内容"];
        ary.length > 1 ? ([name, ...description] = ary) : (description = ary);
        this.tags.push({
          name: name,
          type: randomType(opts),
          description: description.reduce((prev, cur) => prev + cur)
        });
      }
      this.inputVisible = false;
      this.tagInput = "";
    },
    initTabs() {
      if (this.tabPanels.length > 0 || this.tabPanels == []) {
        return this.tabPanels;
      }
      let obj = modules;
      const nameMap = new Map();
      nameMap.set("detail", "用户详情");
      nameMap.set("process", "项目进展");
      nameMap.set("report", "工作报表");
      nameMap.set("request", "事务申请");
      nameMap.set("analyze", "签到考勤");
      nameMap.set("information", "系统消息");

      for (let key in obj) {
        if (nameMap.has(key.toLowerCase())) {
          this.tabPanels.push({
            name: key.toLowerCase(),
            label: nameMap.get(key.toLowerCase())
          });
        }
      }

      return this.tabPanels.sort((p, c) => {
        if (p.name == "detail") {
          return -1;
        } else {
          return 0;
        }
      });
    },
    formateTagValue: function() {
      // \s+|
      const reg = /[\s+|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?|\。|\、|\，]/g;
      // console.log(this.tagInput.replace(reg, '/'));
      return this.tagInput.replace(reg, "/");
    }
  },
  computed: {
    ...mapState({
      CURRENT_TAB: state => state.profile.currentTab
    }),
    switchTab: function() {
      console.log("switchTab: " + this.currentTab);
      this.CHANGE_TAB(this.currentTab);
      // this.nowTab;
      return this.currentTab;
    },
    nowTab: function() {
      console.log(`nowTab: ${this.CURRENT_TAB}`);
      this.currentTab = this.CURRENT_TAB;
      this.CHANGE_TAB(this.currentTab);
    }
  },
  watch: {
    tabPanels: {
      handler: "initTabs",
      immediate: true
    },
    tagInput: {
      handler: "formateTagValue"
      // immediate: true
    },
    nowTab: {
      handler: "nowTab"
    }
  },
  beforeMount() {
    this.currentTab = this.CURRENT_TAB;
    console.log(this.currentTab);
    // this.switchTab;
  }
};
</script>

<style scoped src="@/assets/css/profile.css"></style>