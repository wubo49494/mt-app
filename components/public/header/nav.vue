<template>
  <div class="m-nav">
    <ul class="nav">
      <li class="list">
        <nuxt-link to="my">我的美团</nuxt-link>
        <dl>
          <dd>
            <nuxt-link to="/order">我的订单</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/order">我的收藏</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/order">抵用卷</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/order">账户设置</nuxt-link>
          </dd>
        </dl>
      </li>
      <li>
        <nuxt-link to="/mobileAPP">手机APP</nuxt-link>
      </li>
      <li class="list bd">
        <nuxt-link to="/center">商家中心</nuxt-link>
        <dl>
          <dd>
            <nuxt-link to="/userCenter">登录商家中心</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/coop">我想合作</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/wap">免费手机开店</nuxt-link>
          </dd>
          <dd>
            <nuxt-link to="/kaipiao">商家申请开票</nuxt-link>
          </dd>
        </dl>
      </li>
      <li class="list site">
        <nuxt-link to="/site">网站导航</nuxt-link>
        <div class="subContainer">
          <dl class="hotel">
            <dt>酒店旅游</dt>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
            <dd>国际机票</dd>
          </dl>
          <dl class="food">
            <dt>吃美食</dt>
            <dd>烤鱼</dd>
            <dd>特色小吃</dd>
            <dd>烧烤</dd>
            <dd>烤鱼</dd>
            <dd>特色小吃</dd>
            <dd>烧烤</dd>
          </dl>
          <dl class="movie">
            <dt>看电影</dt>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
            <dd>热映电影</dd>
          </dl>
          <dl class="app">
            <dt>手机应用</dt>
            <dd>
              <a href="#">
                <img
                  src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png"
                  title="美团app"
                  alt="美团app"
                >
              </a>
            </dd>
            <dd>
              <a href="#">
                <img
                  src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png"
                  title="美团app"
                  alt="美团app"
                >
              </a>
            </dd>
            <dd>
              <a href="#">
                <img
                  src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png"
                  title="美团app"
                  alt="美团app"
                >
              </a>
            </dd>
            <dd>
              <a href="#">
                <img
                  src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/appicons/meituan.png"
                  title="美团app"
                  alt="美团app"
                >
              </a>
            </dd>
          </dl>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.m-nav {
  float: right;
  margin: 0;
  padding: 0;
  z-index: 999;
  height: 40px;

  .nav {
    padding: 0;
    list-style: none;
    float: right;
    height: 40px;

    > li {
      float: left;
      width: 78px;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;

      a {
        color: #999;
        text-decoration: none;
        &:hover {
          color: #31bbac;
        }
      }

      &.list:hover {
        border: 1px solid #e5e5e5;
        border-top: none;
        background-color: #fff;

        > dl {
          display: block;
        }

        .subContainer {
          display: flex;
        }
      }

      dl {
        background-color: #fff;
        display: none;
        z-index: 999;

        dd {
          line-height: 35px;
          margin: 0 auto !important;

          &:hover {
            color: #31bbac;
          }
        }
      }

      &.bd {
        dl {
          width: 140%;
          position: relative;
          background-color: #fff;
          left: -31px;
          top: -1px;
          border: 1px solid #e5e5e5;

          &:before {
            content: '';
            display: block;
            background: #fff;
            height: 4px;
            width: 76px;
            position: absolute;
            top: -1px;
            right: 0;
          }
        }

        &:hover {
          border: 1px solid #e5e5e5;
          border-bottom: none;
          background: #fff;
        }
      }

      &.site {
        &:hover {
          border-bottom: none;
        }
      }

      .subContainer {
        box-sizing: border-box;
        background: #fff;
        padding: 30px 36px 36px 47px;
        width: 1190px !important;
        position: relative;
        left: -1115px;
        z-index: 999;
        border: 1px solid #e5e5e5;
        text-align: left;
        display: none;
        border-right: none;
        box-shadow: 0 3px 5px 0 rgba(0, 0, 0, 0.1);
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-right: none;

        &:before {
          content: '';
          display: block;
          width: 76px;
          height: 4px;
          background: #fff;
          position: absolute;
          top: -1px;
          right: 0;
        }

        > dl {
          box-sizing: border-box;
          text-align: left;
          display: inline-block !important;
          border-right: none;

          dt {
            margin-bottom: 26px;
            font-size: 14px;
            color: #31bbac;
            text-align: center;
          }

          dd {
            width: 78px;
            display: inline-block;
            text-align: center !important;
          }

          &.hotel {
            width: 264px;
          }

          &.food {
            width: 196px;
          }

          &.movie {
            width: 120px;
            dd {
              width: 100%;
            }
          }

          &.app {
            width: 380px;
            flex: 1;
            text-align: center;
            dd {
              width: 60px;
              height: 73px;
              line-height: 73px;
              text-align: center;
              margin: 0 0px;
              img {
                width: 60px;
                height: 60px;
              }
            }
          }
        }
      }
    }
  }
}
</style>