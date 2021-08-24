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
                       to="/note/1"
                       class="notelist"
                       :key="notebook.id">
            <div class="notename">
              <span class="iconfont icon-notebook"></span>
              <span>{{notebook.title}}</span>
              <span>{{notebook.noteCounts}}</span>
            </div>
            <div class="noteactions">
              <span class="delete"
                    @click.stop.prevent="onDelete(notebook)">删除</span>
              <span class="edit"
                    @click.stop.prevent="onEdit(notebook)">编辑</span>
              <span class="date">3天前</span>
            </div>
          </router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import notebooks from '../apis/notebooks'
import Notebooks from '../apis/notebooks'
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
      let title = window.prompt('创建笔记本')
      if (title.trim() === '') {
        //清除title 两边的空字符串，清除完如果是空，就代表笔记本名字是空，给出提示信息
        alert('笔记本名不能为空')
        return
      }
      Notebooks.addNotebook({ title }).then((res) => {
        console.log(res)
        alert(res.msg)
        this.notebooks.unshift(res.data)
      })
    },
    onEdit(notebook) {
      console.log('edit')
      let title = window.prompt('修改标题', notebook.title)
      Notebooks.updateNotebook(notebook.id, { title }).then((res) => {
        console.log(res)
        alert(res.msg)
        notebook.title = title
      })
    },
    onDelete(notebook) {
      console.log('delete')
      let isConfirm = window.confirm('你确定要删除吗')
      if (isConfirm) {
        Notebooks.deleteNotebook(notebook.id).then((res) => {
          console.log(res)
          alert(res.msg)
          //找到这个 notebook 的 index ，从 notebooks 数组里删掉
          this.notebooks.splice(this.notebooks.indexOf(notebook), 1)
        })
      }
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