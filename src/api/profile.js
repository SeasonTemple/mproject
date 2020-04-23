import axios from '_u/axios';
import qs from 'qs';

//控制台基本数据获取API
export const baseInit = (data) => {
  return axios.request({
    url: "/api/baseInit",
    method: 'post',
    data
  })
}

//控制台可视化数据获取API
export const graphData = (data) => {
  return axios.request({
    url: "/api/graphData",
    method: 'post',
    data
  })
}