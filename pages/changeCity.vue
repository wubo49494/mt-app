<template>
  <div class="page-changeCity">
    <el-row>
      <el-col :span="24">
        <div class="m-iselect">
          <span class="name">按省份选择:</span>
          <el-select v-model="pvalue" placeholder="省份">
            <el-option
              class="province"
              v-for="item in province"
              :key="item.adcode"
              :label="item.name"
              :value="item.adcode"
            ></el-option>
          </el-select>

          <el-select v-model="cvalue" placeholder="城市" :disabled="!city.length" @visible-change="select" ref="currentCity">
            <el-option
              class="city"
              v-for="item in city"
              :key="item.adcode"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>

          <span class="name">直接搜索:</span>
          <el-autocomplete
            v-model="input"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入城市中文或拼音"
            @select="handleSelect"
          ></el-autocomplete>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class="m-hcity">
          <dl>
            <dt>热门城市：</dt>
            <dd v-for="item in list">{{ item }}</dd>
          </dl>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div class>
          <dl class="m-categroy">
            <dt>按拼音首字母选择:</dt>
            <dd v-for="item in list1">{{ item }}</dd>
          </dl>

          <dl class="m-categroy-section" v-for="(item, index) in block" :key="index">
            <dt :id="'city-'+item">{{ index }}</dt>
            <dd>
              <span v-for="c in item" >{{ c }}</span>
            </dd>
          </dl>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import _ from 'lodash'
import jsPingyin from 'js-pinyin'
export default {
  data() {
    return {
      province: [],
      pvalue: '',
      city: '',
      cvalue: '',
      input: '',
      cities: [],
      list: ['北京', '上海', '广州', '深圳', '重庆', '杭州', '武汉', '成都'],
      list1: 'ABCDEFGHIJKLNMOPQRSTUVWXYZ'.split(''),
      cityName: [],
      block: {}
    }
  },
  mounted: async function() {
    let self = this
    let {
      status,
      data: { districts }
    } = await this.$axios.get(
      'https://restapi.amap.com/v3/config/district?subdistrict=2&key=a776091c1bac68f3e8cda80b8c57627c'
    )
    if (status === 200) {
      self.province = districts[0].districts
    }
    let r = []
    self.province.forEach(item => {
      item.districts.forEach(item => {
        self.cities.push(item)
        self.cityName.push(item.name)
      })
    })
    // console.log(this.cities)
    // console.log(this.cityName)

    let p
    let d = {}
    // console.log(self.list1)

    self.list1.forEach(item =>
        d[item] = ''
    )
    console.log(d)
    this.cities.forEach(item => {
      // 获取中文的拼音的大写的首字母
      p = jsPingyin
        .getFullChars(item.name)
        .toUpperCase()
        .slice(0, 1)
      if (!d[p]) {
        d[p] = []
      }
      d[p].push(item.name)
    })
    self.block = d
    console.log(self.block)

    // a: (11) ["安阳市", "阿拉善盟" ...]
    // b: (23) ["包头市", "巴彦淖尔市" ...] ...

    // for(let [key, value] of Object.entries(d)){
    //   self.block.push({
    //     city: value,
    //     title: key.toUpperCase()
    //   })
    // }

    
  },
  watch: {
    pvalue: async function(newPvalue) {
      console.log('111')
      console.log(newPvalue)
      this.city = this.province.filter(
        item => item.adcode === newPvalue
      )[0].districts
    }
  },
  methods: {
    querySearchAsync: _.debounce(async function(query, callback) {
      let self = this
      let r = []
      r = self.cities.map(item => {
        return {
          value: item.name
        }
      })
      callback(r.filter(item => item.value.indexOf(query) > -1))
    }, 200),

    ...mapMutations({
      setPosition: 'geo/setPosition'
    }),

    handleSelect: function(item) {
      this.$store.commit('geo/setCity', item.value)
      location.href = '/'
    },
    select () {
      const isSelect = this.$refs.currentCity.value
      if (isSelect) {
        this.$store.commit('geo/setCity', isSelect)
      location.href = '/'
      }
      
    }
  }
}
</script>

<style lang="scss">
  .page-changeCity {
    width: 1190px;
    margin: 20px auto 0;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    box-sizing: border-box;
    border-radius: 4px;
    min-height: 1000px;
    padding: 20px;
    .m-iselect {
      .province{
        cursor: pointer;
        border-radius: 4px;
        margin: 0 10px 0 20px;
      }

      .city {
        cursor: not-allowed;
        border-radius: 4px;
        margin: 0 20px 0 10px;
      }

      .label {
        margin-left: 40px;
      }

      .input {
        width: 220px;
        height: 40px;
        border-radius: 4px;
        margin-left: 10px;
        font-size: 14px;
        color: #666;
        box-sizing: border-box;
      }


    }

    .el-row {
      padding-bottom: 20px;
      &:after {
        content: ' ';
        height: 1px;
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
        padding-top: 20px;
      }
    }

    .m-hcity {
      dl {
        display: flex;

        dt {
          font-size: 16px;
          color: #333;
          font-weight: 500;
        }

        dd {
          margin: 0 20px;
          color: #666;
          line-height: 22px;
        }
      }
    }


    .m-categroy {
      display: flex;
      margin-bottom: 30px;

      dt {
        font-size: 16px;
        color: #333;
        font-weight: 500;
        height: 25px;
        line-height: 25px;
      }

      dd {
        font-size: 15px;
        color: #666;
        margin: 0 2px;
        width: 24px;
        height: 25px;
        margin-left: 10px;
        line-height: 25px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border-radius: 50%;

        &:hover {
          background: #f8f8f8;
        }
      }
    }
    
    .m-categroy-section {
        display: flex;
        padding: 13px 30px 13px 10px;
        border-radius: 10px;

        &:hover {
          background: #f8f8f8;
        }

        dt {
          box-sizing: border-box;
          vertical-align: top;
          padding-top: 10px;
          display: inline-block;
          text-align: center;
          background: #13d1be;
          border-radius: 50%;
          color: #fff;
          width: 40px;
          height: 40px;
          box-shabow: 0 4px 5px 0 rgba(39, 178, 164, 0.22);
        }

        dd {
          flex: 1;

          span {
            margin: 10px 20px;
            color: #666;
            display: inline-block;
            font-size: 14px;
          }
        }
      }
  }
</style>
