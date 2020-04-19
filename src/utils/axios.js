import axios from 'axios'
import {
  DEFAULT_URL
} from './constant'
import qs from 'qs';
import {
  getToKen
} from '_u/loginMsg.js';
axios.defaults.timeout = 20000; // 超时时间
axios.defaults.baseURL = DEFAULT_URL; // 默认地址
axios.defaults.responseType = 'json'; //响应类型动态设置
// axios.defaults.headers = 'Access-Control-Allow-Origin:true';
// axios.defaults.transformRequest = function (data) {
//   data = qs.stringify(data);
//   return data;
// };

axios.defaults.transformRequest = [
  function (data) {
    // data = qs.stringify(data)
    return data;
  }
]

// http request 拦截器
axios.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    if(getToKen()!=null&&getToKen()!=""){
      config.headers['Authorization'] = getToKen() 
    }
    // config.headers['UserName'] = getUserName()
    if (config.method == "post") {
      config.data = qs.stringify(config.data);
      console.log(config)
      // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
      config.headers['Access-Control-Allow-Origin'] = '*';
    } else {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    }
    //判断是否存在ticket，如果存在的话，则每个http header都加上ticket
    // if (cookie.get("token")) {
    //   //用户每次操作，都将cookie设置成2小时
    // cookie.set("token", cookie.get("token"), 1 / 12)
    //   cookie.set("name", cookie.get("name"), 1 / 12)
    //   config.headers.token = cookie.get("token");
    //   config.headers.name = cookie.get("name");
    // }

    return config;
  },
  error => {
    console.error('Request failed: Connect failed.')
    return Promise.reject(error.response);
  });

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.resultCode == "404") {
      console.log("response.data.resultCode是404")
      // 返回 错误代码-1 清除ticket信息并跳转到登录页面
      //      cookie.del("ticket")
      //      window.location.href=‘http://login.com‘
      return
    } else {
      return response;
    }
  },
  error => {
    console.error('Response failed: Connection failed.')
    return Promise.reject(error.response) // 返回接口返回的错误信息
  });
export default axios;
