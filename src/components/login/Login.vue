<template>
  <div>
    <el-image :style="bgStyle" :src='url' fit="cover" :lazy='true'></el-image>
    <div class=""></div>    
    <div class="parent">
      <el-form ref="form" :model="form">
        <el-form-item label="请输入你的邮箱" :class="{isFocus: actFocus.isFocus}" key="1">
          <el-input v-model="form.account" autocomplete maxlength="30" show-word-limit
            @focus.stop="inputFocus(actFocus.name)" @blur.stop="inputblur(actFocus.name)" prop="username">
            <i class="el-icon-s-custom" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <el-form-item label="请输入你的密码" :class="{isFocus: pwdFocus.isFocus}" key="2">
          <el-input v-model="form.password" autocomplete show-password @focus.stop="inputFocus(pwdFocus.name)"
            @blur.stop="inputblur(pwdFocus.name)" prop="password">
            <i class="el-icon-lock" slot="prepend"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button :class="{logBtn: true}" >登&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
        </el-form-item>
      </el-form>
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
        backgroundRepeat: 'no-repeat',
        position: 'absolute',
        zIndex: -1
      };
      let form = {
        account: '',
        password: '',
        valiCode: 0,
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