<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo">美团</a>
        <span class="login">
          <em class="bold">已有美团账号？</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>

    <section>
      <el-form
        class="demo-ruleForm"
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        status-icon
      >
        <el-form-item label="昵称" prop="name" class="nickname">
          <el-input v-model="ruleForm.name" @focus="aaa"></el-input>
          <span class="mt-tip">注册成功后，全美团通用</span>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"/>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>

        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"/>
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"/>
        </el-form-item>

        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"/>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{ error }}</div>
        </el-form-item>

        <el-form-item>
          <a class="f1" href="http://www.meituan.com/about/terms" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
export default {
  data() {
    return {
      statusMsg: '',
      error: '',
      ruleForm: {
        name: '',
        code: '',
        pwd: '',
        cpwd: '',
        email: ''
      },
      rules: {
        name: [
          {
            required: true,
            type: 'string',
            message: '请输入昵称',
            triggle: 'blur'
          }
        ],
        email: [
          {
            required: true,
            type: 'email',
            message: '请输入邮箱',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            type: 'string',
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        pwd: [
          {
            required: true,
            message: '创建密码',
            trigger: 'blur'
          }
        ],
        cpwd: [
          {
            required: true,
            message: '确认密码',
            trigger: 'blur'
          },
          {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请再次输入密码'))
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error('两次输入密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      }
    }
  },
  layout: 'blank',
  methods: {
    aaa: function () {
  
      let bbb = document.getElementsByClassName('mt-tip')
      bbb[0].style.display = "none"
      console.log(bbb)
    },
    sendMsg: function() {

      const self = this
      let namePass
      let emailPass
      // if (self.timerid) {
      //   return false
      // }
      console.log(this.$refs.ruleForm)
      this.$refs['ruleForm'].validateField('name', valid => {
        namePass = valid
      })
      self.statusMsg = ''
      if (namePass) {
        return false
      }
      this.$refs['ruleForm'].validateField('email', valid => {
        emailPass = valid
      })
      
      if (!namePass && !emailPass) {
        self.$axios
          .post('/users/verify', {
            username: encodeURIComponent(self.ruleForm.name),
            email: self.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data.code === 0) {
              let count = 60
              self.timerid = setInterval(function() {
                self.statusMsg = `验证码已发送，剩余${count--}秒`
                if (count === 0) {
                  clearInterval(self.timerid)
                  self.statusMsg= '重新获取验证码'
                }
              }, 1000)
            } else {
              self.statusMsg = data.msg
            }
          })
      }
    },

    register: function() {
      let self = this
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          self.$axios.post('/users/signup', {
            username: window.encodeURIComponent(self.ruleForm.name),
            password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
            email: self.ruleForm.email,
            code: self.ruleForm.code
          }).then(({ status, data }) => {
            if (status === 200) {
              if (data && data.code === 0) {
                location.href = '/login'
              } else {
                self.error = data.msg
              }
            } else {
              console.log('试试self.error在哪')
              self.error = `服务器出差，错误码为${ status }`
            }
            setTimeout(function () {
              self.error = ''
            }, 2500)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.mt-tip {
  position: absolute;
  left: 370px;
  top: 1px;
  width: 100%;
  opacity: 0.6;
  display: block;
}
.page-register {
  .header {
    border-bottom: 2px solid #2bb8aa;
    min-width: 980px;
    color: #666;

    header {
      margin: 0 auto;
      padding: 10px 0;
      width: 980px;

      .site-logo {
        background-image: url(//s0.meituan.net/bs/file/?f=fe-sso-fs:build/assets/sp-normal.2ee5c09.png);
        background-position: -669px -748px;
        display: inline-block;
        width: 54px;
        height: 36px;
        text-indent: -9999px;
      }

      .login {
        float: right;
      }

      .bold {
        font-style: normal;
      }
    }
  }

  > section {
    margin: 0 auto 30px;
    padding-top: 30px;
    width: 980px;
    min-height: 300px;
    box-sizing: border-box;
    padding-right: 550px;

    .status {
      font-size: 12px;
      margin-left: 20px;
      color: #e6a23c;
    }

    .error {
      color: red;
    }
  }
}
</style>