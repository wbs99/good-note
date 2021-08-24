import request from "../helpers/request";
import { friendlyDate } from "../helpers/util";

const URL = {
  GET: "notebooks",
  ADD: "/notebooks",
  UPDATE: "/notebooks/:id",
  DELETE: "/notebooks/:id"
};

export default {
  //获取所有笔记本
  getAll() {
    return new Promise((resolve, reject) => {
      request(URL.GET)
        .then(res => {
          res.data = res.data.sort(
            (notebook1, notebook2) => notebook1.createdAt < notebook2.createdAt
          );
          res.data.forEach(notebook => {
            notebook.friendlyCreatedAt = friendlyDate(notebook.createdAt);
          });
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  //更新笔记本，指定更新哪一个笔记本，更新笔记本的标题等等
  updateNotebook(notebookId, { title = "" } = { title: "" }) {
    return request(URL.UPDATE.replace(":id", notebookId), "PATCH", { title });
  },
  //删除笔记本
  deleteNotebook(notebookId) {
    return request(URL.DELETE.replace(":id", notebookId), "DELETE");
  },
  //添加笔记本
  addNotebook({ title = "" } = { title: "" }) {
    return request(URL.ADD, "POST", { title });
  }
};
