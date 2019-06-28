const Router = require('koa-router')
const axios = require('./utils/axios')
const Config = require('../dbs/config.js')
const Menu = require('../dbs/modules/menu')

let router = new Router({
  prefix: '/geo'
})

router.get('/getPosition', async (ctx) => {
  let {
    status,
    data: {
      province,
      city
    }
  } = await axios.get('https://restapi.amap.com/v3/ip?key=a776091c1bac68f3e8cda80b8c57627c')
  if (status === 200) {
    ctx.body = {
      province,
      city
    }
  } else {
    ctx.body = {
      province: '',
      city: '1'
    }
  }
})

router.get('/menu', async ctx => {
  const result = await Menu.find()
  ctx.body = {
    menu: result
  }
})

module.exports = router
