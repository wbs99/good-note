<template>
  <div id="note"
       class="detail">
    <NoteSidebar />
    <div id="note-detail">
      <!-- <h1>{{ notebookId }}:{{ $route.query.notebookId }}</h1>
      <h1>{{ noteId }}:{{ $route.query.noteId }}</h1> -->
    </div>
  </div>
</template>

<script>
import Auth from '../apis/auth'
import NoteSidebar from './NoteSidebar.vue'

export default {
  components: {
    NoteSidebar,
  },
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

<style lang='less' scoped>
.note-detail {
  flex: 1;
  display: flex;
  flex-direction: column;

  .note-detail-ct {
    height: 100%;
  }

  .note-empty {
    font-size: 50px;
    color: #ccc;
    text-align: center;
    margin-top: 100px;
  }

  .note-bar {
    padding: 4px 20px;
    border-bottom: 1px solid #eee;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    span {
      font-size: 12px;
      color: #999;
      margin-right: 4px;
    }
    .iconfont {
      float: right;
      margin-left: 4px;
      font-size: 18px;
      cursor: pointer;
    }
  }

  .note-title {
    input,
    span {
      display: inline-block;
      width: 100%;
      border: none;
      outline: none;
      font-size: 18px;
      padding: 10px 20px;
    }
  }

  .editor {
    height: ~'calc(100% - 70px)';
    position: relative;
  }
  textarea,
  .preview {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 20px;
  }

  textarea {
    border: none;
    resize: none;
    outline: none;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
  }

  code {
    color: #f66;
  }
}
#note {
  display: flex;
  align-items: stretch;
  background-color: #fff;
  flex: 1;
}
</style>