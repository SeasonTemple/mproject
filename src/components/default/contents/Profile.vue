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
              <span>{{ simpleData.realName }}</span>
            </div>
            <el-avatar :size="110" class="avatar" :src="simpleData.avatarUrl" fit="contain"></el-avatar>
            <el-tag
              type="success"
              class="authTag"
              effect="dark"
            >{{ simpleData.role == "ADMIN"? "管理员":"员工" }}</el-tag>
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
          <component :is="switchTab"></component>
          <!-- </keep-alive> -->
        </el-tabs>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import dayjs from "dayjs";
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
  data() {
    let simpleData = {
      realName: "",
      avatar: "",
      role: ""
    };
    let tabPanels = [];
    let currentTab = "detail";
    let tags = [];
    let inputVisible = false;
    let tagInput = "";
    return {
      tags,
      simpleData,
      inputVisible,
      tagInput,
      tabPanels,
      currentTab
    };
  },
  methods: {
    ...mapMutations({
      CHANGE_TAB: "profile/CHANGE_TAB",
      SET_ATTENDANCE: "profile/SET_ATTENDANCE"
    }),
    ...mapActions({
      GET_UserDetail: "main/GET_UserDetail"
    }),
    handleClick(tab) {
      // console.log("handleClick: " + tab + "//" + this.CURRENT_TAB);
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
      nameMap.set("report", "工作日志");
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
    },
    initData() {
      const tagMap = new Map();
      tagMap.set("userName", "用户名");
      tagMap.set("realName", "姓名");
      tagMap.set("position", "职位");
      tagMap.set("age", "年龄");
      tagMap.set("sex", "性别");
      tagMap.set("createTime", "入职时间");
      tagMap.set("lastLogin", "上次登录");
      tagMap.set("phone", "手机号");
      tagMap.set("email", "邮箱");
      const randomType = _ => _[(Math.random() * _.length) | 0];
      const opts = ["", "info", "danger", "warning", "success"];
      // this.GET_UserDetail()
      //   .then(res => {
      if (this.USERDETAIL) {
        const userData = Object.assign({},this.USERDETAIL);
        // this.SET_ATTENDANCE(res.attendance);
        // console.log(this.USERDETAIL);
        this.simpleData = {
          realName: userData.realName,
          avatarUrl: userData.avatarUrl,
          role: this.GET_ROLES
        };
        const _tags = [];
        const index = Object.keys(userData);
        tagMap.forEach((value, key) => {
          if (index.indexOf(key) != -1) {
            if (key == "createTime" || key == "lastLogin") {
              userData[key] = this.convertTime(userData[key]);
            }
            if (key == "sex") {
              userData[key] = userData[key] == 1 ? "男" : "女";
            }
            _tags.push({
              name: value,
              type: randomType(opts),
              description: userData[key]
            });
          }
        });
        this.tags = _tags;
        // })
        // .catch(err => {
        //   this.$message.error({
        //     dangerouslyUseHTMLString: true,
        //     message: `<strong>获取用户信息异常：${err.msg}</strong> `,
        //     offset: 100,
        //     duration: 2000
        //   });
        // });
      }
    },
    convertTime(time) {
      return dayjs(time).format("YYYY/MM/DD");
    }
  },
  computed: {
    ...mapState({
      CURRENT_TAB: state => state.profile.currentTab,
      USERDETAIL: state => state.main.userDetail,
      GET_ROLES: state => state.login.roles,
      ACTIVETAB: state => state.main.activeTab
    }),
    switchTab: function() {
      // console.log("switchTab: " + this.currentTab);
      this.CHANGE_TAB(this.currentTab);
      // this.nowTab;
      return this.currentTab;
    },
    nowTab: function() {
      // console.log(`nowTab: ${this.CURRENT_TAB}`);
      this.currentTab = this.CURRENT_TAB;
      this.CHANGE_TAB(this.currentTab);
    },
    initProfile: function(params) {
      const tp = this.tabPanels.length;
      const tg = this.tags.length;
      if (!tp && !tg ) {
        this.initData();
        this.initTabs();
      }
    }
  },
  watch: {
    tabPanels: {
      handler: "initTabs",
      immediate: false
    },
    tagInput: {
      handler: "formateTagValue"
    },
    nowTab: {
      handler: "nowTab"
    }
  },
  mounted() {
    this.initProfile;
    // this.currentTab = this.CURRENT_TAB;
    // this.initTags;
    // console.log(this.currentTab);
    // this.switchTab;
    // console.log(this.simpleData);
  }
};
</script>

<style scoped src="@/assets/css/profile.css"></style>