import axios from '_u/axios';
import qs from 'qs';
import {
  getToKen
} from '_u/loginMsg';

//职工管理：用户列表初始化、筛选信息初始化API
export const InitUserList = () => {
  return axios.request({
    url: "/api/initUserList",
    method: 'post',
    headers: {
      "Authorization": getToKen()
    }
  })
}

//职工管理：职工信息新增API
export const AddUser = (user) => {
  return axios.request({
    url: "/api/addUser",
    method: 'post',
    data: user,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//职工管理：职工信息修改API
export const ModifyUser = (userDetail) => {
  return axios.request({
    url: "/api/modifyUser",
    method: 'post',
    data: userDetail,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//职工管理：职工（批量）删除API
export const DeleteUsers = (ids) => {
  return axios.request({
    url: "/api/deleteUsers",
    method: 'delete',
    params: qs.stringify({
      ids
    }, {
      indices: false
    }),
    headers: {
      "Authorization": getToKen()
    }
  })
}

//职工管理：职能信息初始化API
export const InitDuty = () => {
  return axios.request({
    url: "/api/initDuty",
    method: 'post',
    headers: {
      "Authorization": getToKen()
    }
  })
}

//职工管理：职能信息新增、修改API
export const ModifyDuty = (user) => {
  return axios.request({
    url: "/api/modifyDuty",
    method: 'post',
    data: user,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//职工管理：职能信息删除API
export const DeleteDuty = (ids) => {
  return axios.request({
    url: "/api/deleteDuty",
    method: 'delete',
    data: ids,
    headers: {
      "Authorization": getToKen()
    }
  })
}


//申请管理：申请信息初始化API
export const InitRequest = () => {
  return axios.request({
    url: "/api/initRequest",
    method: 'post',
    headers: {
      "Authorization": getToKen()
    }
  })
}

//申请管理：申请信息审核API
export const HandleRequest = () => {
  return axios.request({
    url: "/api/handleRequest",
    method: 'post',
    headers: {
      "Authorization": getToKen()
    }
  })
}

//薪资管理：薪资信息初始化API
export const InitSalary = () => {
  return axios.request({
    url: "/api/initSalary",
    method: 'post',
    headers: {
      "Authorization": getToKen()
    }
  })
}

//薪资管理：薪资信息调整API
export const ModifySalary = (salary) => {
  return axios.request({
    url: "/api/modifySalary",
    method: 'post',
    data: salary,
    headers: {
      "Authorization": getToKen()
    }
  })
}
