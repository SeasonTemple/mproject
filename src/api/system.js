import axios from '_u/axios';

//详情页面：职位数据获取API
export const BelongTo = () => {
  return axios.request({
    url: "/api/belongTo",
    method: 'post',
  })
}