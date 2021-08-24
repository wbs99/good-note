<template>
  <div id="note-detail">
    <h1>{{ msg }}:{{ $route.query.notebookId }}</h1>
    <h1>{{ msg }}:{{ $route.query.noteId }}</h1>
  </div>
</template>

<script>
import Auth from '../apis/auth'
export default {
  data() {
    return {
      msg: 'notebookId',
    }
  },
  created() {
    //获取用户信息，未登录跳转到登录页
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: '/login' })
      }
    })
  },
}
</script>

<style scoped>
h1 {
  color: red;
}
</style>