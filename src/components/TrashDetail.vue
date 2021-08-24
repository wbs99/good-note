<template>
  <div id="trash-detail">
    <h1>{{ msg }}:{{ $route.query.notebookId }}</h1>
  </div>
</template>

<script>
import Auth from '../apis/auth'
export default {
  data() {
    return {
      msg: '回收站笔记详情页'
    }
  },
  created() {
    //获取用户信息，未登录跳转到登录页
    Auth.getInfo()
      .then(res => {
        if (!res.isLogin) {
          this.$router.push({ path: '/login' })
        }
      })
  }
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>