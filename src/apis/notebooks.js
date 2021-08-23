import request from "../helpers/request";

const URL = {
  GET: "notebooks",
  ADD: "/notebooks",
  UPDATE: "/notebooks/:id",
  DELETE: "/notebooks/:id"
};

export default {
  //获取所有笔记本
  getAll() {
    return request(URL.GET);
  },
  //更新笔记本，指定更新哪一个笔记本，更新笔记本的标题等等
  updateNotebook(notebookId, { title = "" } = { title: "" }) {
    return request(URL.UPDATE.replace(":id", notebookId), "PATH", { title });
  },
  //删除笔记本
  deleteNotebook(notebookId) {
    request(URL.DELETE.replace(":id", notebookId), "DELETE");
  },
  //添加笔记本
  addNotebook({ title = "" } = { title: "" }) {
    return request(URL.ADD, "POST", { title });
  }
};
