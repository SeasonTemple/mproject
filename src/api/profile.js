import axios from '_u/axios';

//详情页面：用户信息修改API
export const ModifyDetail = (data) => {
  return axios.request({
    url: "/api/modifyDetail",
    method: 'post',
    data
  })
}

//工作报告：报告提交API
export const SubmitReport = (data) => {
  return axios.request({
    url: "/api/submitReport",
    method: 'post',
    data
  })
}

//工作报告：报告上传API
export const UploadReport = (data) => {
  return axios.request({
    url: "/api/uploadReport",
    method: 'post',
    data
  })
}

//工作报告：报告下载API
export const DownloadReport = (data) => {
  return axios.request({
    url: "/api/downloadReport",
    method: 'post',
    data
  })
}

//项目进展：初始化项目信息API
export const InitProjects = (data) => {
  return axios.request({
    url: "/api/initProjects",
    method: 'post',
    data
  })
}

//项目进展：项目添加API
// export const graphData = (data) => {
//   return axios.request({
//     url: "/api/graphData",
//     method: 'post',
//     data
//   })
// }

//项目进展：项目修改API
export const ModifyProjects = (data) => {
  return axios.request({
    url: "/api/modifyProjects",
    method: 'post',
    data
  })
}

//项目进展：项目删除API
export const DeleteProjects = (data) => {
  return axios.request({
    url: "/api/deleteProjects",
    method: 'post',
    data
  })
}

//系统消息：初始化消息API
export const InitInfo = (data) => {
  return axios.request({
    url: "/api/initInfo",
    method: 'post',
    data
  })
}

//事务申请：申请提交API
export const SubmitRequest = (data) => {
  return axios.request({
    url: "/api/submitRequest",
    method: 'post',
    data
  })
}

//签到考勤：初始化签到信息API
export const InitAttendance = (data) => {
  return axios.request({
    url: "/api/initAttendance",
    method: 'post',
    data
  })
}

//签到考勤：签到API
export const SubmitAttendance = (data) => {
  return axios.request({
    url: "/api/submitAttendance",
    method: 'post',
    data
  })
}