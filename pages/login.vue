<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/" class="logo"></a>
    </div>

    <div class="login-panel">
      <div class="banner">
        <img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          width="480"
          height="370"
          alt="美团网">
      </div>
      <div class="form">
        <h4 v-if="error" class="tip"><i>123{{ error }}</i></h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile"></el-input>
        
        <el-input v-model="password" predix-icon="password" type="password"></el-input>

        <div class="foot">
          <el-checkbox v-model="checked">7天内自动登录</el-checkbox>
          <b>忘记密码?</b>
        </div>

        <el-button class="btn-login" type="success" size="mini" @click="login">登录</el-button>

      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  layout: 'blank',
  data () {
    return {
      error: '',
      checked: '',
      username: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      let self = this;
      self.$axios.post('/users/signin', {
        username: window.encodeURIComponent(self.username),
        password: CryptoJS.MD5(self.password).toString()
      }).then(({ status, data }) => {
        if (status === 200) {
          if( data && data.code === 0) {
            location.href = '/'
          } else {
            self.error = data.msg
          }
        } else {
          self.error = `服务器出错`
        }
        setTImeout(() => {
          this.error =""
        }, 1500)
      })
    }
  }
}
</script>

<style lang="scss">
  .page-login {
    .login-header {
      position: relative;
      width: 980px;
      height: auto;
      margin: 40px auto 30px;

      .logo {
        background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-retina.b95a7dd.png);
        background-position: 0 !important;
        background-size: contain !important;
        width: 82px;
        height: 54px;
        display: block;
        cursor: pointer;
      }
    }

    .login-panel {
      width: 980px;
      margin: 0 auto 70px;
      display: flex;
      .banner {
        margin-right: 115px;
      }
      .form {
        display: flex;
        flex-direction: column;
        width: 270px;

        .tip {
          margin-bottom: 10px;
          padding: 10px;
          border: 1px solid #f5d8a7;
          border-radius: 2px;
          background: #fff6db;
          font-size: 12px;
          padding-left: 26px;
          > i {
            position: relative;
            &:after {
              position: absolute;
              display: inline-block;
              width: 17px;
              height: 17px;
              font-family: iconfont;
              font-style: normal;
              content: "\e64d";
              font-size: 28px;
              top: -13px;
              left: -24px;
            }
          }
        }
        .el-input {
          margin-top: 10px;
        }
        .foot {
          margin-top: 10px;
          b {
            float: right;
          }
        }
        .el-input__icon {
          &.profile {
            &:after {
              font-family: iconfont;
              content: "\e627";
              font-style: normal;
              top: -1px;
              left: 5px;
              position: absolute;
            }
          }

          &.password {
            &:after {
              font-family: iconfont;
              content: "\E600";
              font-style: normal;
              top: -1px;
              left: 3px;
              position: absolute;
              font-size: 18px;
            }
          }
        }

        .btn-login {
          margin-top: 10px;
          color: #fff;
          background-color: #2db3a6;
          border: none;
          padding: 12px 15px;
        }
        
      }
    }
  }
</style>