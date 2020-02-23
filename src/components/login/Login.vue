<template>
  <section>
    <transition enter-to-class="animated slideInUp" mode="in-out" :duration="{enter: 2000,leave:1500}">
      <el-image :style="bgStyle" :src='url' fit="cover" :lazy='true' v-if="modes == 'login'" key="login">
      </el-image>
      <el-image class="animated slideOutUp" :style="bgStyle" :src='url' fit="cover" :lazy='true'
        v-if="modes == 'register'" key="register">
      </el-image>
      <el-image class="animated slideOutUp" :style="bgStyle" :src='url' fit="cover" :lazy='true'
        v-if="modes == 'forget'" key="forget">
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
          <el-input v-model="form.valiCode" prop="valiCode" id="valiCode" maxlength="6">
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
    <transition leave-to-class="fadeOutUpBig" enter-active-class="zoomInUp">
      <div class="animated greet zoomInUp" v-if="isShow" key="logText">
        <!-- 通用人事管理系统 -->
        叼你马人事
      </div>
    </transition>
    <transition leave-active-class="disappear">
      <el-button round :class="{continue: true}" v-if="isShow" @click="toLog" key="logBtn"></el-button>
    </transition>
    <el-button type="primary" @click="() =>isShow =!isShow">Reset</el-button>
    <transition leave-to-class="fadeOutUpBig" mode="out-in">
      <div class="animated goRegister bounceInUp" v-if="isShow" @click="switchMode('register')" key="regBtn">
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
  export default {
    name: 'login',
    data() {
      let modes = 'login';
      let url = pexels2;
      let bgStyle = {
        height: '100vh',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        backgroundSize: '200%',
        // animationDelay: '2s',
        zIndex: -10,
        filter: 'opacity(0.9)'
      };
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
      let isShow = true;
      let isToReg = false;
      return {
        modes,
        url,
        bgStyle,
        bgImg,
        form,
        actFocus,
        pwdFocus,
        showForm,
        isShow,
        isToReg,
      }
    },
    methods: {
      ...mapMutations({
        SET_MODES: 'login/SET_MODES',
        SET_URL: 'login/SET_URL'
      }),
      switchMode: function (flag) {
        this.isShow = !this.isShow;
        this.SET_MODES(flag);
        this.SET_URL(flag);
        this.modes = this.getModes;
        this.url = this.getUrl;
        // this.modeStatus;
      },
      toLog: function () {
        this.isShow = !this.isShow;
        // this.showForm.display = 'block';
      }
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
        console.log('watch: modes' + oldVal + '/' + curVal)
        this.modes = curVal;
      },
      getUrl(curVal, oldVal) {
        console.log('watch: url')
        this.url = curVal;
      }
    },
    mounted() {
      this.modes = this.getModes
      this.url = this.getUrl
      console.log(this.modes)
    }
  }
</script>

<style src="@/assets/css/login-global.css"></style>
<style scoped src="@/assets/css/login.css"></style>