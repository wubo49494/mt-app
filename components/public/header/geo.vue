<template>
  <div class="m-geo">
    <i class="el-icon-location">{{ $store.state.geo.position.city }}</i>
    <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link>[香河 廊坊 天津]
    <gaodeapi/>
  </div>
</template>

<script>
export default {
  data () {
    return {
      city: '北京市'
    }
  }
}
</script>

<style lang="scss" scoped>
.m-geo {
  color: #666;
  font-size: 12px;

  .changeCity {
    background-color: #f4f4f4;
    border: 1px solid #e5e5e5;
    border-radius: 2px;
    color: #666;
    margin: 0 4px;
    padding: 0 2px;
    text-decoration: none;
    &:hover {
      color: #31bbac;
    }
  }
}
</style>
