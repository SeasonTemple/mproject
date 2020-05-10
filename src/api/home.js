import axios from '_u/axios';
import qs from 'qs';

//初始化用户信息 API
export const Register = (data) => {
  return axios.request({
    url: "/api/userData",
    method: 'post',
    data
  })
}

//初始化Echarts API
export const Register = (data) => {
  return axios.request({
    url: "/api/initEcharts",
    method: 'post',
    data
  })
}
