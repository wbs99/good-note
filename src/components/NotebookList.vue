<template>
  <div id="notebook-list">
    <div>
      <h1>{{ msg }}</h1>
      <ul>
        <li>
          <router-link to="/note/1">笔记本1</router-link>
        </li>
        <li>
          <router-link to="/note/2">笔记本2</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Auth from '../apis/auth'
export default {
  data() {
    return {
      msg: '笔记本列表'
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