import axios from '_u/axios';

//初始化用户信息 API
export const InitUserData = (userDetail) => {
  return axios.request({
    url: "/api/initUserData",
    method: 'post',
    data: userDetail
  })
}