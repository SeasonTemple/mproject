<template>
  <section>
    <transition name="imgCg" mode="out-in">
      <el-image :style="bgStyle" class="maskLayer" :src='modeStatus' fit="cover" :lazy='true' v-if="mode == 'login'"
        key="login">
      </el-image>
      <el-image :style="bgStyle" class="maskLayer" :src='modeStatus' fit="cover" :lazy='true' v-if="mode == 'register'"
        key="register">
      </el-image>
      <el-image :style="bgStyle" class="maskLayer" :src='modeStatus' fit="cover" :lazy='true' v-if="mode == 'forget'"
        key="forget">
      </el-image>
    </transition>
    <!-- :class="{isSwitch: mode=='register'}" -->
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
        <el-form-item v-if="mode!='usePassword'">
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
    <div :class="{greet:true,disappear2:isShow}" v-if="isShow">
      <!-- 通用人事管理系统 -->
      叼你马人事
    </div>
    <transition leave-to-class="disappear">
      <el-button round :class="{continue: true}" v-if="isShow" @click="toLog"></el-button>
    </transition>
    <el-button type="primary" @click="()=>{ !this.mode }">Reset</el-button>
    <transition leave-to-class="animated rollOut" :duration="{ leave: 800 }" mode="in-out">
      <div class="goRegister wow" :class="{bounceInUp: isShow}" v-if="isShow" @click="switchMode('login')">
        点此前往注册
      </div>
    </transition>
  </section>
</template>

<script>
  import pexels2 from '@/assets/img/pexels-002.jpg';
  import pexels3 from '@/assets/img/pexels-003.jpg';
  import pexels4 from '@/assets/img/pexels-004.jpg';
  import pexels5 from '@/assets/img/pexels-005.jpg';
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    name: 'login',
    data() {
      let mode = 'login';
      let url = pexels2;
      let bgStyle = {
        height: '100vh',
        width: '100%',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        backgroundSize: '200%',
        zIndex: -10
      };
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
        mode,
        url,
        bgStyle,
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
        SET_MODE: 'login/SET_MODE'
      }),
      switchMode: function (flag) {
        this.isShow = !this.isShow;
        this.SET_MODE(flag);
      },
      toLog: function () {
        this.isShow = !this.isShow;
        this.showForm.display = 'block';
      }
    },
    computed: {
      ...mapState({
        store_mode: state => state.login.mode
      }),
      modes: function () {
        return this.mode = this.store_mode;
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
        switch (this.modes) {
          case 'login':
            this.url = pexels2;
            break;
          case 'register':
            this.url = pexels4;
            break;
          case 'forget':
            this.url = pexels5;
            break;
        }
        return this.url;
      }
    },
    mounted() {
      this.wow({});
    }
  }
</script>

<style src="@/assets/css/login-global.css"></style>
<style scoped src="@/assets/css/login.css"></style>