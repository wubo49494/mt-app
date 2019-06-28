<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd 
      v-for="(item, index) in $store.state.home.menu" 
      :key="index" 
      @mouseenter="enter"
      >
        <i :class="item.type"/>
        {{ item.name }}
        <span class="arrow"/>
      </dd>
    </dl>

    <div v-if="kind" class="detail" @mouseenter="sover" @mouseleave="sout">
      <template v-for="(item, idx) in curdetail.child">
        <h4 :key="idx">{{ item.title }} </h4>
        <span v-for="v in item.child" :key="v">{{ v }}</span>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      // menu: [
      //   {
      //     type: 'food',
      //     name: '美食',
      //     content: [{
      //       title: '美食分类',
      //       child: ['烧烤', '火锅', '大饼']
      //     }]
      //   },
      //   {
      //     type: 'takeout',
      //     name: '外卖',
      //     content: [{
      //       title: '外卖',
      //       child: ['肯德基', '麦当劳', '真功夫']
      //     }]
      //   },
      //   {
      //     type: 'hotel',
      //     name: '酒店',
      //     content: [{
      //       title: '酒店星级',
      //       child: ['经济型', '舒适/三星', '高档/四姓']
      //     }]
      //   },
      //   {
      //     type: 'takeout',
      //     name: '外卖'
      //   }
        
      // ]
    }
  },
  computed: {
    
    curdetail: function() {
      return this.$store.state.home.menu.filter(item => item.type === this.kind)[0]
    }
  },
  methods: {
    mouseleave: function() {
      let self = this
      self._timer = setTimeout(function() {
        self.kind = ''
      }, 150)
    },
    enter: function(e) {
      this.kind = e.target.querySelector('i').className
      console.log(this.curdetail)
    },
    sover: function (){
      clearTimeout(this._timer)
    },
    sout: function(){
      this.kind = ''
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/css/main.css";

.m-menu {
  width: 230px;
  height: 475px;
  margin-top: -50px;
  background-color: pink;
  color: #fff;
  position: relative;
  padding: 10px;
  margin-left: 20px;
  box-sizing: border-box;
  background: linear-gradient(
    -180deg,
    rgba(2, 181, 157, 0.85) 2%,
    rgba(22, 146, 183, 0.85) 100%
  );

  dt {
    height: 50px;
    padding-top: 15px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 400;
  }

  dd {
    position: relative;
    box-sizing: border-box;
    padding: 2px 12px;
    height: 26px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      background: rgba(255, 255, 255, 0.2);

      & > i {
        opacity: 1;
      }
    }
  }

  .nav {
      .arrow {
      width: 4px;
      height: 4px;
      position: absolute;
      right: 7px;
      opacity: 0.8 
      
    }

    dd > i {
      font-family: 'meituan';
      font-size: 14px;
      font-style: normal;
      opacity: 0.3;
      margin-right: 11px;

      &:before {
        width: 14px;
        height: 14px;
        display: inline-block;
      }
    }

    .food {
      &:before {
        content: '\e622';
      }
    }

    .takeout {
      &:before {
        content: '\e630';
      }
    }

    .hotel {
      &:before {
        content: '\e62a';
      }
    }

    .homestay {
      &:before {
        content: '\e631';
      }
    }

    .movie {
      &:before {
        content: '\e62c';
        position: relative;
        left: -2px;
      }
    }

    .airport {
      &:before {
        content: '\e632';
      }
    }

    .ktv {
      &:before {
        content: '\e627';
      }
    }

    .life {
      &:before {
        content: '\e633';
      }
    }

    .hair {
      &:before {
        content: '\e626';
        transform: scale(0.7);
      }
    }

    .marry {
      &:before {
        content: '\e629';
      }
    }

    .offspring {
      &:before {
        content: '\e623';
      }
    }

    .sport {
      &:before {
        content: '\e62b';
      }
    }

    .furniture {
      &:before {
        content: '\e625';
      }
    }

    .study {
      &:before {
        content: '\e624';
      }
    }

    .health {
      &:before {
        content: '\e628';
      }
    }

    .bar {
      &:before {
        content: '\e621';
      }
    }

    
  }

  .detail {
      padding: 0 30px;
      position: absolute;
      background: #fff;
      left: 230px;
      bottom: 0;
      width: 400px;
      height: 415px;
      z-index: 9999;
      box-sizing: border-box;
      box-shadow: 1px 1px 3px #ccc;
      color: black;

      h4 {
        margin-top: 24px;
        margin-top: 24px;
          height: 22px;
          line-height: 22px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e5e5;
      }
      span {
          color: #999;
          font-size: 12px;
          line-height: 15px;
          display: inline-block;
          margin-right: 16px;
          margin-top: 10px;
          cursor: pointer;

          &:hover {
            color: #31BBAC;
          }
        }
    }
}
</style>