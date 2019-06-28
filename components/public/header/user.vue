<template>
  <div class="m-user">

    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>

    <template v-else>
      <nuxt-link 
        to="/login"
        class="login">立即登录</nuxt-link>
      <nuxt-link
        to="register"
        class="register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
   async mounted() {
    const {status, data:{user}} = await this.$axios.get('/users/getUser')
    if (status === 200 ) {
      this.user = user
    }
  }
}
</script>

<style lang="scss" scoped>
  .m-user {
    font-size: 12px;
  .username {
    color: #31BBAC;
    cursor: pointer;
  }

  .login,
  .register {
    font-size: 12px;
    line-height: 40px;
    color: #999;
    margin: 0 5px;
    text-decoration: none;
    &.login {
      color: #31BBAC;
      margin: 0 5px;
    }
    
    &:hover {
      color: #31BBAC;
    }
  }
}
</style>
