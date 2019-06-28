<template>
  <div class="m-search">
    <el-row class="m-search-searchbar">
      <el-col :span="3" class="left">
        <img src="https://s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
      </el-col>
      <el-col :span="15" class="center">
        <div class="search-block">
          <el-input
            v-model="search"
            class="search-input"
            placeholder="搜索商家地点"
            @focus="focus"
            @blur="blur"
            @input="input"/>
          <button class="el-button el-button-primary">
            <i class="el-icon-search"/>
          </button>
        </div>
        <dl 
          v-if="isSuggest" 
          class="suggest">
          <dt>热门搜索</dt>
          <dd v-for="(item, idx) in $store.state.home.suggest" :key="idx">{{ item.name }}</dd>
        </dl>
        <dl v-if="isSearchList"
        class="search-list">
          <dd v-for="(item, idx) in searchList" :key="idx">{{ item.name }}</dd>
          
        </dl>

        <p class="hotword">
          <nuxt-link to="#" v-for="(item, index) in $store.state.home.hotword" :key="index">{{ item.name }}</nuxt-link>
        </p>

        <ul class="search-nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="benefit">美团公益</nuxt-link>
          </li>
        </ul>
      </el-col>

      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund">随时退</i>
          </li>
          <li>
            <i class="single">不满意包退</i>
          </li>
          <li>
            <i class="overdue">过期退</i>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
export default {
  data() {
    return {
      search: '',
      isFocus: false,
      suggest: ['烤鱼', '烧烤', '烤鱼', '烤鱼'],
      searchList: [],
      hotPlace: []
    }
  },
  computed: {
    isSuggest: function() {
      return this.isFocus&&!this.search
    },
    isSearchList: function(){
      return this.isFocus&&this.search
    }
  },
  methods: {
    focus: async function() {
      this.isFocus = true
    },
    blur: function() {
      let self = this
      setTimeout(function(){
        self.isFocus = false
      }, 200)
    },

    input: _.debounce(async function() {
      const {data: {pois}} = await this.$axios.get(`https://restapi.amap.com/v3/place/text?keywords=${this.search}&city=${this.$store.state.geo.position.city}&offset=7&page=1&key=a776091c1bac68f3e8cda80b8c57627c&extensions=base`)
      this.searchList = pois
    })
  }
}
</script>

<style lang="scss">
.m-search {
  .m-search-searchbar {
    height: 157px;
    padding: 20px 20px;
    background: #fff;
    align-items: start;
    box-sizing: border-box;

    .left {
      padding-top: 15px;
      img {
        width: 126px;
        height: 46px;
      }
    }

    .center {
      padding-top: 10px;
      padding-left: 100px;
      flex: 1;
      .search-block {
        margin: 0;
        padding: 0;
        width: 520px;
        border: 1px solid #31bbac;
        .search-input {
          width: 450px;
          box-sizing: border-box;
        }

        .el-button {
          box-sizing: border-box;
          background: #31bbac;
          width: 70px;
          height: 40px;
          padding: 0;
          position: absolute;
          > i {
            color: #fff;
          }
        }
      }

      .suggest {
        box-sizing: border-box;
        background: #fff;
        display: block;
        width: 352px;
        border: 1px solid #ccc;
        padding: 15px;
        border-top: none;
        box-shadow: 0px 3px 4px #ccc;
        position: absolute;
        z-index: 9999;
        > dt {
          font-size: 14px;
          color: #999;
          margin-bottom: 10px;
        }
        > dd {
          display: inline-block;
          margin-right: 10px;
          font-size: 12px;
          &:hover {
            cursor: pointer;
            color: #31bbac;
          }
        }
      }
      .search-list {
        box-sizing: border-box;
        background: #fff;
        display: block;
        width: 352px;
        border: 1px solid #ccc;
        padding: 15px;
        border-top: none;
         box-shadow: 0px 3px 4px #ccc;
        position: absolute;
        z-index: 9999;
        >dd {
          margin-top: 5px;
          font-size: 12px;
          &:hover {
            cursor: pointer;
            color: #31bbac;
          }
        }
      }

      .hotword {
        padding-top: 10px;
        padding-left: 10px;
        padding-bottom: 15px;
        > a {
          margin-right: 10px;
          text-decoration: none;
          color: #999;
          font-size: 12px;
          &:hover {
            color: #31bbac;
          }
        }
      }

      .search-nav {
        list-style: none;
        position: absolute;
        margin-top: 10px;
        > li {
          display: inline-block;
          margin-left: 30px;
          > a {
            color: black;
            font-weight: 700;
            font-size: 18px;
            text-decoration: none;
            &:hover {
              color: #31bbac;
            }
          }
        }
      }
    }

    .right {
      > ul {
        position: relative;
        list-style: none;
        padding-top: 40px;
        > li {
          color: #999;
          font-size: 12px;
          display: inline-block;
          margin: 0 auto;
          margin-left: 5px;
          > i {
            font-style: normal;
          }
        }
      }
    }
  }
}
</style>