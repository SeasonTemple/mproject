import axios from '_u/axios';
import qs from 'qs';

//获取验证码API
export const GetVCode = callback => {
  axios.request({
    method: "get",
    url: "/api/getVCode",
    // headers: {
    //   "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    // }
  }).then(res => {
    let status = res.status;
    if (status == 201 || status == 200) {
      callback(res.data)
    } else {
      throw new Error(`验证码获取失败！ ${qs.stringify(res.data+res.statusText)}.`)
    }
  }).catch(res => new Error(`调用验证码API失败: ${res}, 请稍后再试.`));
}

//登录API
export const UserLogin = (userDto) => {
  let data = userDto;
  return new Promise(function (resolve) {
    resolve(axios.request({
      url: "/api/login",
      method: 'post',
      data: data
    }))
  })
}

/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < str.length; i++) {
      rs = rs + str.substr(i, 1).replace(pattern, '');
  }
  return rs;
}
/**
* 验证邮箱
*/
export function validateEmail(value){
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; 
  return !reg.test(value) ? true : false;
}
/**
* 验证密码 6至20位的字母+数字 
*/
export function validatePass(value){
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{8,20}$/;
  return !reg.test(value) ? true : false;
}