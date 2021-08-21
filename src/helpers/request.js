//配置到 baseURL 中，发请求直接写后面的地址就可以了
// request("http://note-server.hunger-valley.com/auth/login")
// 相当于
// request("/auth/login");
import axios from "axios";
import baseURLConfig from "./config-baseURL";
console.log(baseURLConfig);

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
axios.defaults.baseURL = baseURLConfig.baseURL;
//及时存在跨域，接口处理信息的时候也会带上 cookie
axios.defaults.withCredentials = true;

export default function request(url, type = "GET", data = {}) {
  return new Promise((resolve, reject) => {
    let option = {
      url,
      method: type,
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
