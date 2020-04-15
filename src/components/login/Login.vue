<template>
  <section>
    <transition enter-to-class="slideInUp" leave-active-class="slideOutUp">
      <el-image
        class="bgStyle animated"
        :src="url"
        fit="cover"
        :lazy="true"
        v-if="bgStatus == 0"
        key="login"
      ></el-image>
      <el-image
        class="bgStyle animated"
        :src="url"
        fit="cover"
        :lazy="true"
        v-if="bgStatus == 1"
        key="register"
      ></el-image>
      <el-image
        class="bgStyle animated"
        :src="url"
        fit="cover"
        :lazy="true"
        v-if="bgStatus == 2"
        key="forget"
      ></el-image>
    </transition>
    <!-- :class="{isSwitch: modes=='register'}" -->
    <transition-group
      appear
      appear-active-class="rollIn"
      enter-active-class="rollIn"
      leave-active-class="rollOut"
    >
      <div class="animated left delay-2s" v-if="showStatus == 1" key="logForm">
        <el-form ref="form" :model="form" status-icon hide-required-asterisk :rules="rules">
          <el-form-item label="Username" prop="username" :class="{isFocus:actFocus.isFocus}">
            <el-input
              v-model="form.username"
              autocomplete
              minlength="4"
              maxlength="20"
              show-word-limit
              @focus.stop="inputFocus(actFocus.name)"
              @blur.stop="inputblur(actFocus.name)"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Password"
            prop="password"
            :class="{isFocus: pwdFocus.isFocus,push1:form.usePassword}"
            v-if="form.usePassword == true"
          >
            <el-input
              v-model="form.password"
              minlength="8"
              maxlength="20"
              show-password
              @focus.stop="inputFocus(pwdFocus.name)"
              @blur.stop="inputblur(pwdFocus.name)"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="valiCode"
            label="Validate Code"
            v-if="form.usePassword == false"
            :class="{isFocus: codeFocus.isFocus,push2:!form.usePassword}"
          >
            <el-input
              v-model="form.valiCode"
              :class="{valiCode:true}"
              maxlength="6"
              @focus.stop="inputFocus(codeFocus.name)"
              @blur.stop="inputblur(codeFocus.name)"
            >
              <el-button type="success" slot="suffix" :class="{valiBtn:true}" @click="getCode">
                <el-tooltip
                  enterable
                  content="获取验证码"
                  placement="top"
                  :style="{'fontSize':'5px'}"
                  popper-class="logPop"
                  effect="dark"
                >
                  <el-image :src="vCodeImg" fit="cover" :lazy="true"></el-image>
                </el-tooltip>
              </el-button>
            </el-input>
          </el-form-item>
          <el-col class="toolFloor" :span="24" type="flex" justify="center">
            <el-col :span="6">
              <el-checkbox v-model="form.remember" class="checkBox">保持登录</el-checkbox>
            </el-col>
            <el-col :span="6" :push="9">
              <el-link class="forget" :underline="false" @click="logChoice">{{ form.choice }}</el-link>
            </el-col>
          </el-col>
          <el-form-item>
            <el-button class="logBtn" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition-group>
    <transition
      appear
      appear-active-class="zoomInUp"
      enter-active-class="zoomInUp"
      leave-active-class="zoomOutDown"
    >
      <div class="animated greet" v-if="showStatus == 0">
        <span>通用人事管理系统</span>
        <!-- 叼你马人事 -->
      </div>
    </transition>
    <transition appear appear-active-class="rollIn" leave-active-class="disappear">
      <el-tooltip
        content="登录"
        enterable
        placement="top"
        key="logBtnPop"
        v-if="showStatus == 0"
        popper-class="logPop"
      >
        <el-button
          round
          class="continue animated"
          v-if="showStatus == 0"
          @click="showLogForm()"
          key="logBtn"
        ></el-button>
      </el-tooltip>
    </transition>
    <el-button class="btnCss" @click="reset">重置状态</el-button>
    <transition
      appear
      appear-active-class="bounceInRight"
      enter-active-class="bounceInRight"
      leave-to-class="fadeOutUpBig"
    >
      <div class="animated goForget" v-if="showStatus < 2">账号找回</div>
    </transition>
    <transition
      appear
      appear-active-class="bounceInUp"
      enter-active-class="bounceInUp"
      leave-to-class="fadeOutUpBig"
    >
      <div class="animated goRegister" v-if="showStatus < 2" @click="switchMode('register')">点此前往注册</div>
    </transition>
  </section>
</template>

<script>
import pexels2 from "@/assets/img/pexels-002.jpg";
import pexels4 from "@/assets/img/pexels-004.jpg";
import pexels5 from "@/assets/img/pexels-005.jpg";
import { GetVCode, UserLogin } from "_a/login.js";
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "login",
  data() {
    let modes = "login";
    let url = pexels2;
    let vCode;
    let vCodeImg;
    let bgImg = [
      {
        modeName: "login",
        url: pexels2
      },
      {
        modeName: "register",
        url: pexels4
      },
      {
        modeName: "forget",
        url: pexels5
      }
    ];
    let form = {
      username: "",
      password: "",
      valiCode: "",
      remember: false,
      usePassword: true,
      choice: "验证码登录"
    };
    const rules = {
      username: [
        {
          required: true,
          message: "请输入用户名",
          trigger: "change"
        },
        {
          min: 4,
          max: 20,
          message: "长度应介于 4 到 20 个字符",
          trigger: "change"
        }
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "change"
        },
        {
          min: 4,
          max: 20,
          message: "长度应介于 4 到 20 个字符",
          trigger: "change"
        }
      ],
      valiCode: [
        {
          required: true,
          message: "请输入验证码",
          trigger: "change"
        },
        {
          min: 6,
          max: 6,
          message: "长度应为6位",
          trigger: "change"
        }
      ]
    };
    let actFocus = {
      name: "username",
      isFocus: false
    };
    let pwdFocus = {
      name: "password",
      isFocus: false
    };
    let codeFocus = {
      name: "valiCode",
      isFocus: false
    };
    let showForm = {
      display: "none"
    };
    let showStatus = 0;
    let bgStatus = 0;
    return {
      modes,
      url,
      bgImg,
      form,
      actFocus,
      pwdFocus,
      showForm,
      bgStatus,
      showStatus,
      codeFocus,
      vCode,
      vCodeImg,
      rules
    };
  },
  methods: {
    ...mapMutations({
      SET_MODES: "login/SET_MODES",
      SET_URL: "login/SET_URL"
    }),
    switchMode: function(flag) {
      this.SET_MODES(flag);
      this.modes = this.getModes;
      console.log(`showSwitch now ${this.modes}`);
      this.modes == "login"
        ? this.showLogForm()
        : this.modes == "register"
        ? this.showRegForm()
        : this.showFogForm();
      console.log(`switchMode now ${this.modes} / ${this.url}`);
    },
    showLogForm: function() {
      this.showStatus = 1;
      // this.showForm.display = 'block';
      setTimeout(() => {
        this.bgStatus = 0;
        this.SET_URL();
      }, 1800);
    },
    showRegForm: function() {
      this.showStatus = 2;
      setTimeout(() => {
        this.bgStatus = 1;
        this.SET_URL();
      }, 1400);
    },
    showFogForm: function() {
      this.showStatus = 3;
      setTimeout(() => {
        this.bgStatus = 2;
        this.SET_URL();
      }, 1800);
    },
    showSwitch: function(flag) {
      this.SET_MODES(flag);
      this.modes = this.getModes;
      console.log(`showSwitch now ${this.modes}`);
      this.modes == "login"
        ? this.showLogForm()
        : this.modes == "register"
        ? this.showRegForm()
        : this.showFogForm();
    },
    reset: function() {
      this.switchMode("login");
      this.showStatus = 0;
      this.showForm.display = "none";
      this.$refs["form"].resetFields();
      this.actFocus.isFocus = false;
      this.pwdFocus.isFocus = false;
      this.codeFocus.isFocus = false;
    },
    logChoice: function() {
      !this.form.usePassword
        ? (this.form.choice = "验证码登录")
        : (this.form.choice = "密码登录");
      this.form.usePassword = !this.form.usePassword;
    },
    login: function() {
      let { username: userName, password: passWord } = this.form;
      UserLogin({ userName, passWord })
        .then(res => {
          let status = res.data.code;
          console.log(res.data);
          if (status == 10201 || status == 10200) {
            this.$message({
              type: "success",
              dangerouslyUseHTMLString: true,
              message: `<strong>${res.data.data.userName} 登录成功！</strong> `,
              offset: 230
            });
            this.$router.push("/index");
          } else {
            console.log(status);
            this.$message({
              type: "error",
              dangerouslyUseHTMLString: true,
              message: `<strong>${res.data.msg}</strong>`,
              offset: 230
            });
          }
          this.$refs["form"].resetFields();
          this.actFocus.isFocus = false;
          this.pwdFocus.isFocus = false;
          this.codeFocus.isFocus = false;
        })

        .catch(res => new Error(`调用登录API失败: ${res}, 请稍后再试.`));
    },
    getCode: function() {
      let result;
      this._timer = setTimeout(() => {
        GetVCode(res => {
          this.vCodeImg = "data:image/png;base64," + res.data.codeImg;
          this.vCode = res.data.codeResult;
        });
      }, 2000);
    }
  },
  computed: {
    ...mapState({
      store_modes: state => state.login.modes,
      store_url: state => state.login.url
    }),
    ...mapGetters({
      GET_MODES: "login/GET_MODES",
      GET_URL: "login/GET_URL"
    }),
    getModes: function() {
      return this.store_modes;
    },
    getUrl: function() {
      return this.store_url;
    },
    inputFocus: function() {
      return function(tag) {
        let act = this.form.username;
        let pwd = this.form.password;
        if (act === "" && tag === "username") {
          return (this.actFocus.isFocus = !this.actFocus.isFocus);
        } else if (pwd === "" && tag === "password") {
          return (this.pwdFocus.isFocus = !this.pwdFocus.isFocus);
        } else {
          return (this.codeFocus.isFocus = !this.codeFocus.isFocus);
        }
      };
    },
    inputblur: function() {
      return function(tag) {
        let act = this.form.username;
        let pwd = this.form.password;
        if (act === "" && tag === "username") {
          return (this.actFocus.isFocus = false);
        } else if (pwd === "" && tag === "password") {
          return (this.pwdFocus.isFocus = false);
        } else {
          return (this.codeFocus.isFocus = false);
        }
        console.log(this.form.username);
        console.log(this.form.password);
        console.log(this.form.valiCode);
      };
    },
    modeStatus: function() {
      let result = this.bgImg.find(m => m.modeName == this.modes);
      this.url = result.url;
    }
  },
  watch: {
    getModes(curVal, oldVal) {
      console.log(`watch: modes ${curVal}`);
      this.modes = curVal;
    },
    getUrl(curVal, oldVal) {
      console.log(`watch: url ${curVal}`);
      this.url = curVal;
    }
    // showStatus: function () {
    //   this.showStatus
    // }
  },
  created() {},
  mounted() {
    this.modes = this.getModes;
    this.url = this.getUrl;
    this.getCode();
    // this.vCode = GetVCode();
    // console.log(this.modes);
  }
};
</script>

<style src="@/assets/css/login-global.css"></style>
<style scoped src="@/assets/css/login.css"></style>