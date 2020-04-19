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

    <transition-group
      appear
      appear-active-class="rollIn"
      enter-active-class="rollIn"
      leave-active-class="rollOut"
    >
      <div class="animated left delay-2s" v-if="showStatus == 1" key="logForm">
        <el-form ref="form" :model="form" status-icon hide-required-asterisk :rules="logRules">
          <el-form-item label="Username" prop="username" :class="{isFocus:actFocus.isFocus}">
            <el-input
              v-model="form.username"
              autocomplete
              minlength="4"
              maxlength="20"
              show-word-limit
              @focus.stop="inputFocus(actFocus.name)"
              @blur.stop="inputBlur(actFocus.name)"
            ></el-input>
          </el-form-item>
          <transition
            appear
            appear-active-class="fadeIn"
            enter-active-class="fadeIn"
            leave-active-class="fadeOut"
            mode="out-in"
          >
            <el-form-item
              class="animated"
              label="Password"
              prop="password"
              :class="{isFocus: pwdFocus.isFocus,push1:form.usePassword}"
              v-if="form.usePassword == true"
              key="usePassword"
            >
              <el-input
                v-model="form.password"
                minlength="8"
                maxlength="20"
                show-password
                @focus.stop="inputFocus(pwdFocus.name)"
                @blur.stop="inputBlur(pwdFocus.name)"
              ></el-input>
            </el-form-item>
            <el-form-item
              class="animated"
              prop="valiCode"
              label="Validate Code"
              :style="{marginBottom:'10px'}"
              v-if="form.usePassword == false"
              :class="{isFocus: codeFocus.isFocus,push1:form.usePassword}"
              key="userCode"
            >
              <el-input
                :class="{valiInput:true}"
                hide-required-asterisk
                v-model="form.valiCode"
                maxlength="6"
                @focus.stop="inputFocus(codeFocus.name)"
                @blur.stop="inputBlur(codeFocus.name)"
              >
                <el-button type="success" slot="suffix" :class="{valiBtn:true}" @click="getCode">
                  <el-tooltip
                    enterable
                    content="换一个"
                    placement="top"
                    :style="{'fontSize':'5px'}"
                    popper-class="valiPop"
                    effect="dark"
                  >
                    <el-image :src="vCodeImg" fit="cover" :lazy="true"></el-image>
                  </el-tooltip>
                </el-button>
              </el-input>
            </el-form-item>
          </transition>
          <el-row :class="{toolFloor:true}" :span="24">
            <el-col :span="18">
              <el-link
                :class="{forget:true}"
                :underline="false"
                @click="logChoice"
              >{{ form.choice }}</el-link>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button :class="{logBtn:true}" @click="formValidate('form')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition-group>

    <transition-group
      appear
      appear-active-class="flipInY"
      enter-active-class="flipInY"
      leave-active-class="flipOutY"
    >
      <div class="animated delay-4s" :class="{regForm:true}" v-if="showStatus == 2" key="regForm">
        <el-form
          ref="regForm"
          :model="regForm"
          status-icon
          hide-required-asterisk
          :rules="regRules"
        >
          <el-form-item label="RegName" prop="userName" :class="{regFocus:actFocus2.isFocus}">
            <el-input
              v-model="regForm.userName"
              autocomplete
              show-word-limit
              @focus.stop="regFocus(actFocus2.name)"
              @blur.stop="regBlur(actFocus2.name)"
            ></el-input>
            <!-- minlength="4" -->
            <!-- maxlength="20" -->
          </el-form-item>
          <el-form-item label="Password" prop="passWord" :class="{regFocus:pwdFocus2.isFocus}">
            <el-input
              v-model="regForm.passWord"
              minlength="8"
              maxlength="20"
              show-password
              @focus.stop="regFocus(pwdFocus2.name)"
              @blur.stop="regBlur(pwdFocus2.name)"
            ></el-input>
          </el-form-item>

          <el-form-item label="ValiPass" prop="valiPass" :class="{regFocus:vpsFocus.isFocus}">
            <el-input
              v-model="regForm.valiPass"
              minlength="8"
              maxlength="20"
              show-password
              @focus.stop="regFocus(vpsFocus.name)"
              @blur.stop="regBlur(vpsFocus.name)"
            ></el-input>
          </el-form-item>
          <el-form-item prop="valiCode" label="Validate Code" :class="{regFocus:codeFocus.isFocus}">
            <el-input
              v-model="regForm.valiCode"
              id="valiCode"
              :class="{valiInput:true}"
              maxlength="6"
              @focus.stop="regFocus(codeFocus.name)"
              @blur.stop="regBlur(codeFocus.name)"
            >
              <el-button type="success" slot="suffix" :class="{valiBtn:true}" @click="getCode">
                <el-tooltip
                  enterable
                  content="换一个"
                  placement="top"
                  :style="{'fontSize':'5px'}"
                  popper-class="valiPop"
                  effect="light"
                >
                  <el-image :src="vCodeImg" fit="cover" :lazy="true"></el-image>
                </el-tooltip>
              </el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button-group :class="{regBtnGroup:true}">
              <el-button type="success" @click="formValidate('regForm')">注册账号</el-button>
              <el-button type="primary" plain @click="clean('regForm')">重置表单</el-button>
            </el-button-group>
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
import {
  GetVCode,
  validateAccount,
  validatePass,
  validateVCode,
  UserLogin,
  stripscript,
  Register
} from "_a/login.js";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
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
    let regForm = {
      userName: "",
      passWord: "",
      valiPass: "",
      valiCode: ""
    };
    const logRules = {
      username: {
        validator: this.validateUsername,
        trigger: "blur"
      },
      password: {
        validator: this.validatePassword,
        trigger: "blur"
      },
      valiCode: {
        validator: this.validateCode,
        trigger: "blur"
      }
    };
    const regRules = {
      userName: {
        validator: this.validateUsername,
        trigger: "blur"
      },
      passWord: {
        validator: this.validatePassword,
        trigger: "blur"
      },
      valiPass: {
        validator: this.validatePasswords,
        trigger: "blur"
      },
      valiCode: {
        validator: this.validateCode,
        trigger: "blur"
      }
    };
    let actFocus = {
      name: "username",
      isFocus: false
    };
    let pwdFocus = {
      name: "password",
      isFocus: false
    };
    let actFocus2 = {
      name: "userName",
      isFocus: false
    };
    let pwdFocus2 = {
      name: "passWord",
      isFocus: false
    };
    let vpsFocus = {
      name: "valiPass",
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
      logRules,
      regForm,
      vpsFocus,
      actFocus2,
      pwdFocus2,
      regRules
    };
  },
  methods: {
    ...mapMutations({
      SET_MODES: "login/SET_MODES",
      SET_URL: "login/SET_URL"
    }),
    ...mapActions({
      LOGIN: "login/LOGIN",
      AUTOLOGIN: "login/AUTOLOGIN",
      UNLOGIN: "login/USERNAMELOGIN"
    }),
    validateUsername: function(rule, value, callback) {
      console.log(value);
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateAccount(value)) {
        callback(new Error("格式错误,应由8至20个字母加数字或2到10个汉字组成"));
      } else {
        callback(); //true
      }
    },
    validatePassword: function(rule, value, callback) {
      // 过滤后的数据
      if (this.modes == "login") {
        this.form.password = stripscript(value);
        value = this.form.password;
      } else if (this.modes == "register") {
        this.regForm.passWord = stripscript(value);
        value = this.regForm.passWord;
      } else {
        this.fogForm.passWord = stripscript(value);
        value = this.fogForm.password;
      }
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码应由8至20个数字加字母组成"));
      } else {
        callback();
      }
    }, // 验证重复密码
    validatePasswords: function(rule, value, callback) {
      // 如果模块值为login, 直接通过
      if (this.modes === "login") {
        callback();
      }
      // 过滤后的数据
      this.regForm.passwords = stripscript(value);
      value = this.regForm.valiPass;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.regForm.passWord) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    },
    validateCode: function(rule, value, callback) {
      const flag = this.form.usePassword;
      console.log(value,this.vCode);
      if (value === "") {
        this.getCode();
        return callback(new Error("请输入验证码"));
      } else if (validateVCode(value)) {
        this.getCode();
        return callback(new Error("验证码格式有误"));
      } else if (this.vCode == value && flag == false && this.modes == "login") {
        console.log("form.valiCode")
        this.getCode();
        callback();
      } else if (
        this.vCode == value &&
        this.modes == "register"
      ) {
        console.log("regForm.valiCode")
        this.getCode();
        callback();
      }
    },
    switchMode: function(flag) {
      // this.$refs.form.resetFields();
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
      this.clean("form");
    },
    showRegForm: function() {
      this.getCode();
      this.showStatus = 2;
      setTimeout(() => {
        this.bgStatus = 1;
        this.SET_URL();
        this.clean("regForm");
      }, 1500);
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
      // this.$refs.form.resetFields();
      this.actFocus.isFocus = false;
      this.pwdFocus.isFocus = false;
      this.codeFocus.isFocus = false;
    },
    logChoice: function() {
      !this.form.usePassword
        ? (this.form.choice = "验证码登录")
        : (this.form.choice = "密码登录");
      this.form.usePassword = !this.form.usePassword;
      if (this.form.choice == "密码登录") {
        this.getCode();
      }
    },
    formValidate: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.modes == "register") {
            this.userRegister();
          } else if (this.modes == "login") {
            if (this.form.usePassword) {
              this.login();
            } else {
              this.loginByCode(this.form.username);
            }
          }
        } else {
          this.$message({
            type: "error",
            message: "验证失败，请输入合法信息!!",
            offset: 230,
            duration: 2500
          });
        }
      });
      // .catch(error => {
      //   this.$message({
      //     type: "warning",
      //     message: error + "：取消操作",
      //     offset: 250,
      //     duration: 2000
      //   });
      //   return false;
      // });
    },
    login: function() {
      let { username: userName, password: passWord } = this.form;
      this.LOGIN({ userName, passWord })
        .then(res => {
          this.$message({
            type: "success",
            dangerouslyUseHTMLString: true,
            message: `<strong>用户：${res} 登录成功！</strong> `,
            offset: 230,
            duration: 2000
          });
          this.$refs.form.resetFields();
          this.actFocus.isFocus = false;
          this.pwdFocus.isFocus = false;
          this.codeFocus.isFocus = false;
          this.$router.push("/index");
        })
        .catch(error => {
          this.$message({
            type: "error",
            dangerouslyUseHTMLString: true,
            message: `<strong>${error}</strong>`,
            offset: 230,
            duration: 2500
          });
        });
    },
    loginByCode: function(userName) {
      this.UNLOGIN(userName)
        .then(res => {
          this.$message({
            type: "success",
            dangerouslyUseHTMLString: true,
            message: `<strong>用户：${res} 登录成功！</strong> `,
            offset: 230,
            duration: 2000
          });
          this.$refs.form.resetFields();
          this.actFocus.isFocus = false;
          this.pwdFocus.isFocus = false;
          this.codeFocus.isFocus = false;
          this.$router.push("/index");
        })
        .catch(error => {
          this.$message({
            type: "error",
            dangerouslyUseHTMLString: true,
            message: `<strong>${error}</strong>`,
            offset: 230,
            duration: 2500
          });
        });
    },
    userRegister: function() {
      let mpUser = {
        userName: this.regForm.userName,
        passWord: this.regForm.passWord
      };
      Register(mpUser)
        .then(res => {
          console.log(res);
          console.log(res.data.data.userName);
          this.$message.success({
            message: res.data.msg,
            offset: 230,
            duration: 2500
          });
          this.loginByCode(res.data.data.userName);
        })
        .catch(err => {
          this.$message.error({
            message: err.data.msg,
            offset: 230,
            duration: 2500
          });
          this.getCode();
        });
    },
    clean: function(formName) {
      this.$refs[formName].resetFields();
    },
    getCode: function() {
      let result;
      this._timer = setTimeout(() => {
        GetVCode(res => {
          this.vCodeImg = "data:image/png;base64," + res.data.codeImg;
          this.vCode = res.data.codeResult;
        });
      }, 2000);
    },
    autoLogin: function() {
      this.AUTOLOGIN()
        .then(res => {
          this.$message({
            type: "success",
            dangerouslyUseHTMLString: true,
            message: `<strong>用户：${res} 自动登录成功！</strong> `,
            offset: 230,
            duration: 2000
          });
          this.$router.push("/index");
        })
        .catch(error => {
          this.$message({
            type: "error",
            dangerouslyUseHTMLString: true,
            message: `<strong>${error} 登录超时，请重新登录！</strong> `,
            offset: 230,
            duration: 2000
          });
        });
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
        let cd = this.form.valiCode;
        //
        if (act == "" && tag === "username") {
          return (this.actFocus.isFocus = !this.actFocus.isFocus);
        } else if (pwd == "" && tag === "password") {
          return (this.pwdFocus.isFocus = !this.pwdFocus.isFocus);
        } else if (cd == "" && tag === "valiCode") {
          return (this.codeFocus.isFocus = !this.codeFocus.isFocus);
        }
      };
    },
    regFocus: function() {
      let act = this.regForm.userName;
      let pwd = this.regForm.passWord;
      let vps = this.regForm.valiPass;
      let cd = this.regForm.valiCode;
      return function(tag) {
        if (act == "" && tag === "userName") {
          return (this.actFocus2.isFocus = !this.actFocus2.isFocus);
        } else if (pwd == "" && tag === "passWord") {
          return (this.pwdFocus2.isFocus = !this.pwdFocus2.isFocus);
        } else if (vps == "" && tag === "valiPass") {
          return (this.vpsFocus.isFocus = !this.vpsFocus.isFocus);
        } else if (cd == "" && tag === "valiCode") {
          return (this.codeFocus.isFocus = !this.codeFocus.isFocus);
        }
      };
    },
    inputBlur: function() {
      return function(tag) {
        let act = this.form.username;
        let pwd = this.form.password;
        let cd = this.form.valiCode;
        if (act == "" && tag === "username") {
          return (this.actFocus.isFocus = false);
        } else if (pwd == "" && tag === "password") {
          return (this.pwdFocus.isFocus = false);
        } else if (cd == "" && tag === "valiCode") {
          return (this.codeFocus.isFocus = false);
        }
      };
    },
    regBlur: function() {
      let act = this.regForm.userName;
      let pwd = this.regForm.passWord;
      let vps = this.regForm.valiPass;
      let cd = this.regForm.valiCode;
      return function(tag) {
        if (act == "" && tag === "userName") {
          this.actFocus2.isFocus = false;
        } else if (pwd == "" && tag === "passWord") {
          this.pwdFocus2.isFocus = false;
        } else if (vps == "" && tag === "valiPass") {
          this.vpsFocus.isFocus = false;
        } else if (cd == "" && tag === "valiCode") {
          this.codeFocus.isFocus = false;
        }
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
    this.autoLogin();
    // this.vCode = GetVCode();
    // console.log(this.modes);
  },
  beforeDestroy() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
};
</script>

<style src="@/assets/css/login-global.css"></style>
<style scoped src="@/assets/css/login.css"></style>