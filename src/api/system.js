import axios from '_u/axios';
import qs from 'qs';
import {
  getToKen
} from '_u/loginMsg';

//系统管理：角色初始化API
export const InitRoles = () => {
  return axios.request({
    url: "/api/initRoles",
    method: 'post',
    headers: {
      "Authorization": getToKen()
    }
  })
}

//系统管理：角色修改API
export const ModifyRole = (role) => {
  return axios.request({
    url: "/api/modifyRole",
    method: 'post',
    data: role,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//系统管理：角色添加API
export const AddRole = (role) => {
  return axios.request({
    url: "/api/addRole",
    method: 'post',
    data: role,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//系统管理：角色删除API
export const DeleteRoles = (ids) => {
  return axios.request({
    url: "/api/deleteRoles",
    method: 'delete',
    data: ids,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//系统管理：消息初始化API
export const InitInfo = () => {
  return axios.request({
    url: "/api/initInfo",
    method: 'post',
    headers: {
      "Authorization": getToKen()
    }
  })
}

//系统管理：消息修改API
export const ModifyInfo = (role) => {
  return axios.request({
    url: "/api/modifyInfo",
    method: 'post',
    data: role,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//系统管理：消息添加API
export const AddInfo = (role) => {
  return axios.request({
    url: "/api/addInfo",
    method: 'post',
    data: role,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//系统管理：消息删除API
export const DeleteInfo = (ids) => {
  return axios.request({
    url: "/api/deleteInfo",
    method: 'delete',
    data: ids,
    headers: {
      "Authorization": getToKen()
    }
  })
}
