import axios from '_u/axios';

//初始化用户信息 API
export const initUserData = (data) => {
  return axios.request({
    url: "/api/initUserData",
    method: 'post',
    data
  })
}

//初始化Echarts API
export const initEcharts = (data) => {
  return axios.request({
    url: "/api/initEcharts",
    method: 'post',
    data
  })
}
