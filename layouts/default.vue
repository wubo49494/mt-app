<template>
  <el-container class="layout-default">
    <el-header>
      <my-header class="my-header"/>
    </el-header>

    <el-main>
      <nuxt/>
    </el-main>

    <el-footer height="100%">
      <my-footer/>
    </el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header/header.vue'
import MyFooter from '@/components/public/footer/index.vue'

export default {
  components: {
    MyHeader,
    MyFooter
  },
  mounted () {
      //在页面加载时读取sessionStorage里的状态信息
      if (window.sessionStorage.getItem("store") ) {
          this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem("store"))))
      } 

      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
          window.sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
    }

}
</script>
<style lang="scss">
  body{
  margin: 0;
  padding: 0;
}
body *{
  margin: 0;
  padding: 0;
}
.el-header,.el-main,.el-footer{
    padding: 0;
    overflow: unset;
}
.el-header {
  height: 100%!important;
}
.el-main {
  background-color: #F8F8F8;
}
</style>