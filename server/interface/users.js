const Router = require('koa-router')
const Redis = require('koa-redis')
const nodeMailer = require('nodemailer')
const User = require('../dbs/modules/users')
const Passport = require('./utils/passport')
const Email = require('../dbs/config')
const axios = require('./utils/axios')

let router = new Router({
  // 下面这个是前缀
  prefix: '/users'
})

let Store = new Redis().client

router.post('/signup', async (ctx) => {
  const {
    username,
    password,
    email,
    code
  } = ctx.request.body

  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, 'code')
    const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')

    if (code === saveCode) {
      console.log(code + saveCode)
      if (new Date().getTime() - saveExpire > 0) {
        ctx.body = {
          code: -1,
          msg: '验证码已过期，请重新尝试'
        }
        return false
      }
    } else {
      ctx.body = {
        code: -1,
        msg: '请填写正确的验证码'
      }
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '请填写验证码'
    }
  }

  console.log('准备查找数据库')

  let user = await User.find({
    username
  })

  if (user.length) {
    ctx.body = {
      code: -1,
      msg: 'y已被注册'
    }
    return false
  }
  console.log('准备查找数据库2')
  let newuser = await User.create({
    username,
    password,
    email
  })
  console.log('23456')
  if (newuser) {
    // let res = await axios.post('/users/signin', { username, password })
    // if (res.data && res.data.code === 0) {
    //   console.log('res.data这里')
    //   ctx.body = {
    //     code: 0,
    //     msg: '注册成功',
    //     user: res.data.user
    //   }
    // } else {
    //   ctx.body = {
    //     code: -1,
    //     msg: 'error'
    //   }
    // }
    ctx.body = {
      code: 0,
      msg: '注册成功'
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '注册失败'
    }
  }
})

router.post('/signin', async (ctx, next) => {
  return Passport.authenticate('local', function (err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err
      }
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: '登录成功',
          user
        }
        return ctx.login(user)
      } else {
        ctx.body = {
          code: 1,
          msg: info
        }
      }
    }
  })(ctx, next)
})

router.post('/verify', async (ctx, next) => {
  let username = ctx.request.body.username
  const saveExpire = await Store.hget(`nodemail:${username}`, 'expire')
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: '验证过于频繁，1分钟内1次'
    }
    return false
  }

  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    port: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass
    }
  })

  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username
  }

  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: '《高仿美团网全栈实战》注册码',
    html: `您在《高仿美团网全栈实战》中注册，您的邀请码是${ko.code}`
  }

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('error')
    } else {
      Store.hmset(`nodemail:${ ko.user }`, 'code', ko.code, 'expire', ko.expire, 'email', ko.email)
    }
  })
  ctx.body = {
    code: 0,
    msg: '验证码已发送, 可能会有延迟，有效期1分钟'
  }

})

router.get('/exir', async (ctx, next) => {
  await ctx.logout()
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0
    }
  } else {
    ctx.body = {
      code: -1,
      msg: 'error'
    }
  }
})

router.get('/getUser', async (ctx) => {
  if (ctx.isAuthenticated()) {
    const {
      username,
      email
    } = ctx.session.passport.user
    ctx.body = {
      user: username,
      email
    }
  } else {
    ctx.body = {
      user: '',
      email: ''
    }
  }
})

module.exports = router
