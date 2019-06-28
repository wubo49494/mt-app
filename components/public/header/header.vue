<template>
  <div class="m-header">
    <div class="topbar">
      <el-row :gutter="15">
        <el-col :span="5">
          <geo/>
        </el-col>
        <el-col :span="5">
          <user/>
        </el-col>
        <el-col :span="14">
          <navbar/>
        </el-col>
      </el-row>
    </div>

    <div class="searchbar">
      <el-row>
        <el-col>
          <search-bar/>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Geo from './geo.vue'
import User from './user.vue'
import Navbar from './nav.vue'
import searchBar from './searchbar.vue'

export default {
  components: {
    Geo,
    User,
    Navbar,
    searchBar
  }
}
</script>

<style lang="scss">
.m-header {
  -webkit-font-smoothing: antialiased;
  font-family: '-apple-system', BlinkMacSystemFont, Roboto, 'Helvetica Neue',
    'MIcrosoft YaHei', sans-serif !important;
  border-bottom: 1px solid #ccc;
  box-shadow: 2px 1px 3px #ccc;
  position: relative;
  background-color: #fff;
  .topbar {
    background: #f8f8f8;
    color: #999;
    width: 100%;
    font-size: 12px;
    z-index: 9999;
    height: 40px;
    line-height: 40px!important;

    .el-row{
    width: 1190px;
    margin: 0 auto!important;
    z-index: 9999;
    height: 40px;
    line-height: 40px;
    
  }
  }

  .searchbar {
    position: relative;
    background: #fff;
    width: 1190px;
      margin: 0 auto;
  }
}
</style>

