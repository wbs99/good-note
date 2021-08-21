<template>
  <div class="container">
    <header>
      <a href="#">
        <i class="iconfont icon-plus"></i>
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="main-container">
        <h4>笔记本列表(10)</h4>
        <div class="list-wrapper">
          <div class="notelist">
            <div class="notename">
              <span class="iconfont icon-notebook"></span>
              <span>笔记本标题1</span>
            </div>
            <div class="noteactions">
              <span class="delete">删除</span>
              <span class="edit">编辑</span>
              <span class="date">3天前</span>
            </div>
          </div>
          <div class="notelist">
            <div class="notename">
              <i class="iconfont icon-notebook"></i>
              <span>笔记本标题1</span>
            </div>
            <div class="noteactions">
              <span class="delete">删除</span>
              <span class="edit">编辑</span>
              <span class="date">3天前</span>
            </div>
          </div>
          <div class="notelist">
            <div class="notename">
              <span class="iconfont icon-notebook"></span>
              <span>笔记本标题1</span>
            </div>
            <div class="noteactions">
              <span class="delete">删除</span>
              <span class="edit">编辑</span>
              <span class="date">3天前</span>
            </div>
          </div>
        </div>
      </div>
    </main>
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

<style lang='less' scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background: #e4e4e4;
  > header {
    border-bottom: 1px solid black;
    padding: 16px 32px;
    > a {
      padding: 2px 2px;
      background: #ffffff;
      color: #7a7a7a;
    }
  }
  > main {
    > .main-container {
      display: flex;
      flex-direction: column;
      align-items: center;

      > h4 {
        margin: 24px 0;
        margin-bottom: 12px;
      }
      > .list-wrapper {
        max-width: 960px;
        width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 24px;
        > .notelist {
          display: flex;
          justify-content: space-between;
          border-bottom: 1px solid #efefef;
          > .notename {
            padding: 12px;
          }
          > .noteactions {
            padding: 12px;
            color: #86909c;
          }
        }
      }
    }
  }
}
.notelist {
  background-color: white;
}
.notelist:hover {
  cursor: pointer;
  background-color: #e8f3ff;
  color: #1d7dfa;
}
</style>