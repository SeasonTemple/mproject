<template>
  <section>
    <transition enter-to-class="slideInUp" leave-active-class="slideOutUp" :duration="{enter: 1800,leave: 1800}">
      <el-image class="bgStyle animated" :src='url' fit="cover" :lazy='true' v-if="modes == 'login'" key="login">
      </el-image>
      <el-image class="bgStyle animated" :src='url' fit="cover" :lazy='true' v-if="isShowReg" key="register">
      </el-image>
      <el-image class="bgStyle animated" :src='url' fit="cover" :lazy='true' v-if="isShowFog" key="forget">
      </el-image>
    </transition>
    <!-- :class="{isSwitch: modes=='register'}" -->
    <div class="left" :style="showForm">
      <el-form ref="form" :model="form">
        <el-form-item label="Username" :class="{isFocus: actFocus.isFocus}">
          <el-input v-model="form.account" autocomplete maxlength="20" show-word-limit
            @focus.stop="inputFocus(actFocus.name)" @blur.stop="inputblur(actFocus.name)" prop="username">
            <i class="el-icon-s-custom" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="Password" :class="{isFocus: pwdFocus.isFocus}">
          <el-input v-model="form.password" autocomplete maxlength="20" show-password
            @focus.stop="inputFocus(pwdFocus.name)" @blur.stop="inputblur(pwdFocus.name)" prop="password">
            <i class="el-icon-lock" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <el-form-item v-if="modes!='usePassword'">
          <el-input v-model="form.valiCode" prop="valiCode" id="valiCode" maxlength="6" placeholder="Verification Code" >
            <i class="el-icon-chat-dot-round" slot="prepend"></i>
            <el-button type="success" slot="suffix" class="valiBtn">获取验证码</el-button>
            <!-- <el-tooltip content="获取验证码" placement="bottom" effect="light" slot="append">
            <i class="el-icon-chat-dot-round" style="color:rgba(224, 224, 224, 0.959);font-size: 1em;font-weight: 300;cursor:pointer"></i>
          </el-tooltip> -->
          </el-input>
        </el-form-item>
        <el-link :class="{forget:true}" :underline="false">忘记密码?</el-link>
        <el-form-item>
          <el-button class="logBtn">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <transition appear appear-active-class="bounceInUp" enter-active-class="bounceInUp"
      leave-active-class="fadeOutUpBig">
      <div class="animated greet" v-if="isShowLog">
        <!-- 通用人事管理系统 -->
        叼你马人事
      </div>
    </transition>
    <el-tooltip content="前往登录" placement="bottom-end" effect='light'>
      <transition leave-active-class="disappear">
        <el-button round class="continue" v-if="isShowLog" @click="showLogForm()"></el-button>
      </transition>
    </el-tooltip>
    <el-button class="btnCss" @click="reset">重置状态</el-button>
    <transition appear appear-active-class="bounceInUp" enter-active-class="bounceInUp" leave-to-class="fadeOutUpBig">
      <div class="animated goRegister" v-if="isShowLog" @click="switchMode('register')">
        点此前往注册
      </div>
    </transition>
  </section>
</template>

<script>
  import pexels2 from '@/assets/img/pexels-002.jpg';
  import pexels4 from '@/assets/img/pexels-004.jpg';
  import pexels5 from '@/assets/img/pexels-005.jpg';
  import {
    mapState,
    mapGetters,
    mapMutations
  } from 'vuex';
  // let bgStyle = {
  //   height: '100vh',
  //   width: '100%',
  //   backgroundRepeat: 'no-repeat',
  //   position: 'absolute',
  //   backgroundSize: '100%',
  //   zIndex: -10,
  //   animationDuration: '1.5s',
  //   animationTimingFunction: 'linear',
  //   opacity: '0.8'
  // };
  export default {
    name: 'login',
    data() {
      let modes = 'login';
      let url = pexels2;

      let bgImg = [{
          modeName: 'login',
          url: pexels2
        },
        {
          modeName: 'register',
          url: pexels4
        },
        {
          modeName: 'forget',
          url: pexels5
        }
      ];
      let form = {
        account: '',
        password: '',
        valiCode: '',
      };
      let actFocus = {
        name: 'account',
        isFocus: false
      };
      let pwdFocus = {
        name: 'password',
        isFocus: false
      };
      let showForm = {
        display: 'none'
      };
      let isShowLog = true;
      let isShowReg = false;
      let isShowFog = false;
      return {
        modes,
        url,
        bgImg,
        form,
        actFocus,
        pwdFocus,
        showForm,
        isShowLog,
        isShowReg,
        isShowFog
      }
    },
    methods: {
      ...mapMutations({
        SET_MODES: 'login/SET_MODES',
        SET_URL: 'login/SET_URL'
      }),
      switchMode: function (flag) {
        this.showSwitch(flag);
        this.SET_URL(flag);
        this.modeStatus;
        console.log(`switchMode now ${this.modes}`)
      },
      showLogForm: function () {
        this.isShowLog = false;
        this.isShowFog = false;
        this.isShowReg = false;
        this.showForm.display = 'block';
      },
      showRegForm: function () {
        this.isShowReg = true;
        this.isShowLog = false;
        this.isShowFog = false;
      },
      showFogForm: function () {
        this.isShowFog = true;
        this.isShowLog = false;
        this.isShowReg = false;
      },
      showSwitch: function (flag) {
        this.SET_MODES(flag);
        this.modes = this.getModes;
        console.log(`showSwitch now ${this.modes}`)
        this.modes == 'login' ? this.showLogForm() : (this.modes == 'register' ? this.showRegForm() : this
          .showFogForm());


      },
      reset: function () {
        this.switchMode('login');
        this.isShowLog = true;
        this.showForm.display = 'none';
      },

    },
    computed: {
      ...mapState({
        store_modes: state => state.login.modes,
        store_url: state => state.login.url
      }),
      ...mapGetters({
        GET_MODES: 'login/GET_MODES',
        GET_URL: 'login/GET_URL',
      }),
      getModes: function () {
        return this.store_modes
      },
      getUrl: function () {
        return this.store_url
      },
      inputFocus: function () {
        return function (tag) {
          let act = this.form.account;
          let pwd = this.form.password;
          if (act === '' && tag === 'account') {
            return this.actFocus.isFocus = !this.actFocus.isFocus;
          } else if (pwd === '' && tag === 'password') {
            return this.pwdFocus.isFocus = !this.pwdFocus.isFocus;
          }
        }
      },
      inputblur: function () {
        return function (tag) {
          let act = this.form.account;
          let pwd = this.form.password;
          if (act === '' && tag === 'account') {
            return this.actFocus.isFocus = false;
          } else if (pwd === '' && tag === 'password') {
            return this.pwdFocus.isFocus = false;
          }
          console.log(this.form.account)
          console.log(this.form.password)
        }
      },
      modeStatus: function () {
        let result = this.bgImg.find(m => m.modeName == this.modes)
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
    },
    mounted() {
      this.modes = this.getModes;
      this.url = this.getUrl;
      // console.log(this.modes);
    }
  }
</script>

<style src="@/assets/css/login-global.css"></style>
<style scoped src="@/assets/css/login.css"></style>