//配置到 baseURL 中，发请求直接写后面的地址就可以了
// request("http://note-server.hunger-valley.com/auth/login")
// 相当于
// request("/auth/login");
import axios from "axios";
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL = "http://note-server.hunger-valley.com";

export default function request(url, type = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      type,
      validateStatus(status) {
        return (status >= 200 && status < 300) || status === 400;
      }
    };
    if (type.toLowerCase() === "get") {
      option.params = data;
    } else {
      option.data = data;
    }
    axios(option)
      .then(res => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          console.error(res.data);
          reject(res.data);
        }
      })
      .catch(err => {
        console.error({ msg: "网络异常" });
        reject({ msg: "网络异常" });
      });
  });
}
