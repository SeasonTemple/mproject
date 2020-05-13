import axios from '_u/axios';

//获取验证码API
export const GetVCode = function() {
  return axios.request({
    method: "get",
    url: "/api/getVCode",
  })
}

//登录(用户名、密码)API
export const UserLogin = (userDto) => {
  return axios.request({
    url: "/api/login",
    method: 'post',
    data: userDto
  })
}
//登录(用户名、验证码)API
export const UserNameLogin = (userDto) => {
  return axios.request({
    method: "get",
    url: "/api/uLogin",
    params: {
      "username": userDto
    }
  })
}


//注册API
export const Register = (data) => {
  return axios.request({
    url: "/api/register",
    method: 'post',
    data
  })
}

//单点登录API
export const SSO = (token) => {
  return axios.request({
    url: "api/sso",
    method: "get",
    headers: {
      "Authorization": token
    }
  })
}
/**
 * 获取用户角色
 */
export function getUserRole(token) {
  return axios.request({
    method: "get",
    url: "api/userRole",
    headers: {
      "Authorization": token
    }
    // data: data, 左边的data是变量名（key）后台接收的。右边的Data是接收的参数。如果两者都是同名的情况下，可以写成单一个即可（ES6的写法）
  })
}
/**
 * 获取邮箱验证码API
 */
export function GetMsg(data) {
  return axios.request({
    method: "get",
    url: "api/getSms",
    params: {
      "email": data
    }
  })
}
/**
 * 密码找回API
 */
export function Forget(userDto) {
  return axios.request({
    method: "post",
    url: "api/forget",
    data: userDto
  })
}
/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}
/**
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{3,4})$/;
  return !reg.test(value) ? true : false;
}
/**
 * 验证账号 8至20位的字母+数字 
 */
export function validateAccount(value) {
  let regHan = /^[\u4E00-\u9FA5]{2,10}$/;
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,20}$/;
  if (regHan.test(value)) {
    return !regHan.test(value) ? true : false;
  } else {
    return !reg.test(value) ? true : false;
  }
}
/**
 * 验证密码 8至20位的字母+数字 
 */
export function validatePass(value) {
  console.log(value)
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,20}$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证验证码
 */
export function validateVCode(value) {
  let reg = /^[a-z0-9]{6}$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证找回验证码
 */
export function validateFogCode(value) {
  let reg = /^[a-z0-9]{8}$/;
  return !reg.test(value) ? true : false;
}
