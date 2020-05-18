import axios from '_u/axios';

//职工管理：用户列表初始化API
export const UserListInit = () => {
  return axios.request({
    url: "/api/userListInit",
    method: 'post',
  })
}

//职工管理：职工信息修改API
export const ModifyUser = (userDetail) => {
  return axios.request({
    url: "/api/ModifyUser",
    method: 'post',
    data: userDetail
  })
}

//职工管理：职工信息（批量）删除API
export const DeleteUsers = (userDetail) => {
  return axios.request({
    url: "/api/deleteUsers",
    method: 'post',
    data: userDetail
  })
}

//职工管理：职能信息初始化API
export const DutyInit = () => {
  return axios.request({
    url: "/api/dutyInit",
    method: 'post',
  })
}
