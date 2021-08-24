<template>
  <div class="container">
    <header>
      <a href="#"
         @click.stop.prevent="onCreate">
        <i class="iconfont icon-plus"></i>
        <span>新建笔记本</span>
      </a>
    </header>
    <main>
      <div class="main-container">
        <h4>笔记本列表({{ notebooks.length }})</h4>
        <div class="list-wrapper">
          <router-link v-for="notebook in notebooks"
                       :to="`/note?notebookId=${notebook.id}`"
                       class="notelist"
                       :key="notebook.id">
            <div class="notename">
              <span class="iconfont icon-notebook"></span>
              <span>{{notebook.title}}</span>
            </div>
            <div class="noteactions">
              <span class="date">{{notebook.friendlyCreatedAt}}</span>
              <span class="edit"
                    @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="delete"
                    @click.stop.prevent="onDelete(notebook)">删除</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import Notebooks from '../apis/notebooks'
import { friendlyDate } from '../helpers/util'
//window.Notebooks = Notebooks

export default {
  data() {
    return {
      notebooks: [],
    }
  },
  created() {
    //获取用户信息，未登录跳转到登录页
    Auth.getInfo().then((res) => {
      if (!res.isLogin) {
        this.$router.push({ path: '/login' })
      }
    })
    Notebooks.getAll().then((res) => {
      this.notebooks = res.data
    })
  },
  methods: {
    onCreate() {
      this.$prompt('输入新笔记本标题', '创建笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputErrorMessage: '标题不能为空，且不超过30个字符',
      })
        .then(({ value }) => {
          return Notebooks.addNotebook({ title: value })
        })
        .then((res) => {
          res.data.friendlyCreatedAt = friendlyDate(res.data.createdAt)
          this.notebooks.unshift(res.data)
          this.$message.success(res.msg)
        })
    },
    onEdit(notebook) {
      let title = ''
      this.$prompt('输入新笔记本标题', '修改笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{1,30}$/,
        inputValue: notebook.title,
        inputErrorMessage: '标题不能为空，且不超过30个字符',
      })
        .then(({ value }) => {
          title = value
          return Notebooks.updateNotebook(notebook.id, { title })
        })
        .then((res) => {
          notebook.title = title
          this.$message.success(res.msg)
        })
    },
    onDelete(notebook) {
      this.$confirm('确认要删除笔记本吗', '删除笔记本', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          return Notebooks.deleteNotebook(notebook.id)
        })
        .then((res) => {
          //找到这个 notebook 的 index ，从 notebooks 数组里删掉
          this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
          this.$message.success(res.msg)
        })
    },
  },
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