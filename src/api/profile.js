import axios from '_u/axios';
const fs = require('fs');
import qs from "qs";
import {
  getToKen
} from '_u/loginMsg';

//详情页面：职位数据获取API
export const BelongTo = () => {
  return axios.request({
    url: "/api/belongTo",
    method: 'post',
    headers: {
      "Authorization": getToKen()
    }
  })
}

//详情页面：用户信息修改API
export const ModifyDetail = (userDetail) => {
  return axios.request({
    url: "/api/modifyDetail",
    method: 'post',
    data: userDetail,
    headers: {
      "Authorization": getToKen()
    }
  })
}
//详情页面：用户API
export const UploadImg = (binary) => {
  // let formData = new FormData();
  // formData.append('file_url', binary);
  // formData.append("bucket", 'mproject');
  // formData.append("secret_key", '7ba7d21d722696f4e66e407eda0ff0c7');
  // formData.append("path", '/');
  return axios.request({
    method: 'post',
    // url: '/tusu/?a=upload',
    headers: {
      'cache-control': 'no-cache',
      'content-type': 'multipart/form-data; boundary=---011000010111000001101001'
    },
    data: {
      bucket: 'mproject',
      secret_key: '7ba7d21d722696f4e66e407eda0ff0c7',
      path: '/',
      file: {
        value: 'fs.createReadStream(' + binary + ')',
        options: {
          filename: binary.name,
          contentType: null
        }
      },
    }
  })
}

//工作日志：日志初始化API
export const InitReport = (userName) => {
  return axios.request({
    url: "/api/initReport",
    method: 'post',
    params: {
      "userName": userName
    },
    headers: {
      "Authorization": getToKen()
    }
  })
}

//工作日志：日志提交API
export const SubmitReport = (report) => {
  return axios.request({
    url: "/api/submitReport",
    method: 'post',
    data: report,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//工作日志：日志上传API
export const UploadReport = (data) => {
  let params = new URLSearchParams();
  params.append("file", JSON.stringify(data))
  console.log(params.get("file"));
  return axios.request({
    url: "/api/uploadReport",
    method: 'post',
    params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      "Authorization": getToKen()
    }
  })
}

//工作日志：日志下载API
export const DownloadReport = (data) => {
  let params = new URLSearchParams()
  params.append('reports', JSON.stringify(data))
  return axios.request({
    url: "/api/downloadReport",
    method: 'post',
    params,
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      "Authorization": getToKen()
    }
  })
}

//项目进展：初始化项目信息API
export const InitProjects = (groupId) => {
  return axios.request({
    url: "/api/initProjects",
    method: 'post',
    params: {
      "groupId": groupId
    },
    headers: {
      "Authorization": getToKen()
    }
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
    data,
    headers: {
      "Authorization": getToKen()
    }
  })
}

//项目进展：项目删除API
// export const DeleteProjects = (data) => {
//   return axios.request({
//     url: "/api/deleteProjects",
//     method: 'post',
//     data
//   })
// }

//系统消息：初始化消息API
export const InitInfo = (userName) => {
  return axios.request({
    method: 'get',
    url: "/api/initInfo",
    params: {
      "userName": userName
    },
    headers: {
      "Authorization": getToKen()
    }
  })
}

//事务申请：初始化审核人API
export const InitAuditors = () => {
  return axios.request({
    url: "/api/initAuditors",
    method: 'get',
    headers: {
      "Authorization": getToKen()
    }
  })
}

//事务申请：提交申请API
export const SubmitRequest = (data) => {
  return axios.request({
    url: "/api/submitRequest",
    method: 'post',
    data,
    headers: {
      "Authorization": getToKen()
    }
  })
}

// 签到考勤：初始化签到信息API
export const InitAttendance = (userId) => {
  return axios.request({
    url: "/api/initAttendance",
    method: 'get',
    params: {
      "userId": userId
    },
    headers: {
      "Authorization": getToKen()
    }
  })
}

//签到考勤：打卡签到API
export const MarkAttendance = (data) => {
  // console.log(data)
  return axios.request({
    url: "/api/markAttendance",
    method: 'post',
    data,
    headers: {
      "Authorization": getToKen()
    }
  })
}

function UUID(len, radix) {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [],
    i;
  radix = radix || chars.length;

  if (len) {
    // Compact form
    for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
  } else {
    // rfc4122, version 4 form
    var r;

    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';

    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16;
        uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
      }
    }
  }

  return uuid.join('');
}


/**
 * 验证手机号
 */
export function validatePhone(value) {
  let reg = /^1[34578]\d{9}$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证身份证
 */
export function validateIdNum(value) {
  let reg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
  return !reg.test(value) ? true : false;
}

/**
 * 验证邮箱
 */
export function validateEmail(value) {
  let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  return !reg.test(value) ? true : false;
}
// initOpts() {
//   BelongTo()
//     .then(res => {
//       let data = res.data.data;
//       let code = res.data.code;
//       if (code == 10200 || code == 10201) {
//         // console.log(data.projects.filter(pro => pro.depId == 4));
//         let nodes = data.departments.map(dep => ({
//           label: dep.depName,
//           value: {
//             depId: dep.id
//           },
//           children: data.projects
//             .filter(pro => pro.depId == dep.id)
//             .map(pro => ({
//               label: pro.projectName,
//               value: {
//                 proId: pro.id
//               }
//             }))
//         }));
//         this.belongOpts = nodes;
//       } else {
//         this.$message.error({
//           dangerouslyUseHTMLString: true,
//           message: `<strong>获取部门、组信息失败：${res.msg}</strong> `,
//           offset: 100,
//           duration: 2000
//         });
//       }
//     })
//     .catch(err => {
//       this.$message.error({
//         dangerouslyUseHTMLString: true,
//         message: `<strong>接口调用失败：${err}</strong> `,
//         offset: 100,
//         duration: 2000
//       });
//     });
