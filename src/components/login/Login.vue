<template>
  <div>
    <el-image :style="bgStyle" :src='url' fit="cover" :lazy='true'></el-image>
    <div class="left" :class="{isSwitch: mode=='register'}">
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
          <el-link class="forget">忘记密码?</el-link>
        <el-form-item>
          <el-button class="logBtn">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </el-form-item>
        <el-form-item >
          <!-- v-if="mode!='register'" -->
          <el-button class="regBtn" @click="switchReg">没有账号?立即注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="goRegister">
      点击前往注册
    </div>
  </div>
</template>

<script>
  import pexels2 from '@/assets/img/pexels-002.jpg';
  import pexels3 from '@/assets/img/pexels-003.jpg';
  export default {
    name: 'login',
    data() {
      let mode = 'login';
      let url = pexels2;
      let bgStyle = {
        height: '100%',
        width: '100%',
        color: 'rgba(224, 224, 224, 0.959)',
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        zIndex: -1
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
      return {
        mode,
        url,
        bgStyle,
        form,
        actFocus,
        pwdFocus
      }
    },
    methods: {
      switchReg: function () {
        let t = this.mode;
        console.log(t);
        return t == 'register' ? this.mode = 'login' : this.mode = 'register';
      }
    },
    computed: {
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
      }
    },
    mounted() {

    }

  }
</script>

<style src="@/assets/css/login-global.css"></style>
<style scoped src="@/assets/css/login.css"></style>