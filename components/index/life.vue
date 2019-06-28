<template>
  <div class="m-life">
    <el-row class="top">
      <el-col :span="14" class="14">
        <slider/>
      </el-col>
      <el-col :span="4">
        <div class="m-life-pic"/>
      </el-col>
      <el-col :span="6">
        <div class="m-life-login">
          <img src="//s0.meituan.net/bs/fe-web-meituan/2d05c2b/img/avatar.jpg" alt>
          <p class="m-life-login-name">HI!你好啊</p>
          <p>
            <nuxt-link to="/register">
              <el-button round size="medium">注册</el-button>
            </nuxt-link>
          </p>
          <p>
            <nuxt-link to="/login">
              <el-button round size="medium">立即登录</el-button>
            </nuxt-link>
          </p>
        </div>
      </el-col>
    </el-row>

    <el-row class="bottom">
      <el-col :span="7">
        <div class="m-life-hotel"/>
      </el-col>
      <el-col :span="7">
        <div class="m-life-music"/>
      </el-col>
      <el-col :span="4">
        <div class="m-life-coop"/>
      </el-col>
      <el-col :span="6">
        <div class="m-life-downapp">
          
          <img src="//s1.meituan.net/bs/fe-web-meituan/60ac9a0/img/download-qr.png" alt="下载APP">
          <p>美团APP手机版</p>
          <h4>
            <span class="red">1元起</span>
            <em class="gary">吃喝玩乐</em>
          </h4>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Slider from '@/components/index/slider.vue'
export default {
  components: {
    Slider
  }
}
</script>
<style lang="scss">
.m-life {
  .top {
    margin-top: 10px;
    margin-left: 10px;
    .slider {
      overflow-x: hidden;
    }

    .m-life-pic {
      margin: 0 10px;
      height: 240px;
      background: url(//p0.meituan.net/codeman/e473bb428f070321269b23370ff02ba956209.jpg);
      background-size: 150px;
    }

    .m-life-login {
      box-sizing: border-box;
      height: 240px;
      background: #fff;
      border: 1px solid #ccc;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px;
      > img {
        width: 47px;
        height: 47px;
        border-radius: 50%;
        border: 4px solid #e5e5e5;
        margin-bottom: 10px;
      }

      .m-life-login-name {
        margin-bottom: 10px;
      }

      button {
        width: 118px;
        margin: 5px;
      }

      >p {
        font-size: 14px;
      }
    }
  }

  .bottom {
    margin-top: 10px;
    margin-left: 10px;
  }
  .m-life-hotel,
  .m-life-music {
    box-sizing: border-box;
    height: 165px;
      overflow-x: hidden;

  }
  .m-life-hotel{
    background-color: skyblue;
    background: url(//p0.meituan.net/codeman/843d7347cb20d945e4bc39b6403f0515182965.png);
    background-size: 100%;
    margin-right: 5px;
  }

  .m-life-music {
    background-color: #ccc;
    background: url(//p1.meituan.net/codeman/16442c19da1f1c4544f794e29d99c92051716.jpg);
    background-size: 100%;
    margin-left: 5px;
  }

  .m-life-coop {
      background-image: url(//p1.meituan.net/codeman/5b21cddb4bb1cbc3a9c3bce0f726c75940469.jpg);
      height: 165px;
      background-size: 100%;
      margin: 0 10px;
    }
     .m-life-downapp{
        background:#fff;
        height:165px;
        text-align:center;
        border: 1px solid #ccc;
        box-sizing: border-box;
        img {
          width: 95px;
          height: 95px;
          margin-top: 10px;
        }

        p {
          font-size: 16px;
          color: #222;
          font-weight: 500;
        }

        h4 {
          font-size: 12px;
          font-weight: 500;
          margin-top: 2px;

          span {
            color: #EC5330;
            margin-right: 5px;
          }

          em {
            color: #3f3f3f;
            font-style: normal;
          }
        }
    }

}
</style>