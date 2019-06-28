<template>
  <div class="quality">
    <div class="quality-nav">
      <ul class="clearfix">
        <li class="title">有格调</li>
        <li @mouseenter="enter" :class="item.type" v-for="(item, index) in list" :key="index">{{ item.name }}</li>
      </ul>
    </div>
    <div class="quality-area">
      <div class="quality-area-content" v-for="item in curarea"> {{ item.content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      kind: '',
      list: [
        {
        type: 'allitem',
        name: '全部',
        content: '全部的内容'
      },{
         type: 'dating',
         name: '约会聚餐',
         content: '约会聚餐的内容' 
      },{
        type: 'SPA',
        name: '丽人SPA',
        content: '丽人spa的内容'
      },{
        type: 'movie',
        name: '电影演出',
        content: '电影演出的内容'
      },{
        type: 'tour',
        name: '品质出游',
        content: '品质出游的内容'
        }
      ]
    }
  },
  methods: {
      enter: function(e) {
      this.kind = e.target.className
      console.log(this.kind)
    },
  },
 computed: {
   curarea: function(){
     return this.list.filter( item => item.type === this.kind)
   }
  }

  
}
</script>
<style lang="scss">
.quality {
  background-color: pink;
}
.quality-nav {
  height: 44px;
  width: 100%;
  background-color: rgb(190, 164, 116);
  background-image: linear-gradient(
    to right,
    rgb(194, 176, 142) 3%,
    rgb(190, 164, 116) 100%
  );
  line-height: 44px;
  box-sizing: border-box;
  font-size: 14px;
  color: #fff;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;

  > ul .title {
    font-size: 18px;
    margin-left: 13px;
    margin-right: 10px;
  }
  > ul >li {
    position: relative;
    float: left;
    cursor: pointer;
    text-transform: uppercase;
    padding: 0 5px;
    list-style: none;
  }
}
.quality-area {
      width: 100%;
      height: 650px;
    padding: 11px 10px 10px;
    background-color: #fff;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-sizing: border-box;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;

    .quality-area-content{
      font-size: 30px;
    }
}
</style>