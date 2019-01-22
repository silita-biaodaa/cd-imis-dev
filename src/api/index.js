import axios from 'axios'
import Vue from 'vue'

import qs from 'qs'
// var baseURL = 'https://imis.biaodaa.com/'
// var baseURL = '/'
let baseURL='http://pre-imis.biaodaa.com'


axios.defaults.baseURL = baseURL

// export const getJsonData = (url, params) => {
//   return new Promise((resolve, reject) => {
//     // let token = localStorage.getItem("Authorization")
//     let token = '8A252C3C1EB6DF29DBA4BB879AC4A1C8.eyJ1c2VySWQiOiI1ODU2OTZkYzY5ZTE0N2VlYjU4MTAzOTc4YzJlYzczZCJ9'

//     if (params != null) {
//       axios.post(url, params, {
//         headers: { 'Content-Type': 'application/json', 'Authorization': token }
//       }).then(res => {
//         resolve(res.data)
//       }).catch(error => {
//         reject(error)
//       })
//     } else {
//       axios.post(url, null, {
//         headers: { 'Content-Type': 'application/json', 'Authorization': token }
//       }).then(res => {
//         resolve(res.data)
//       }).catch(error => {
//         reject(error)
//       })
//     }
//   })

// }
// axios.defaults.headers.common['Authorization'] = '8A252C3C1EB6DF29DBA4BB879AC4A1C8.eyJ1c2VySWQiOiI1ODU2OTZkYzY5ZTE0N2VlYjU4MTAzOTc4YzJlYzczZCJ9'

axios.interceptors.request.use(function (config) {
  // 将token给到一个前后台约定好的key中，作为请求发送
  let token = localStorage.getItem('Authorization')
  // let token = '8A252C3C1EB6DF29DBA4BB879AC4A1C8.eyJ1c2VySWQiOiI1ODU2OTZkYzY5ZTE0N2VlYjU4MTAzOTc4YzJlYzczZCJ9'
  if (token) {
    //   // config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

    config.headers['X-TOKEN'] = token

    //   // headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
  if (response.status!=200) {
    Vue.hideLoading()
    Vue.$toast('网络有问题，请稍后再试')
  }
  return response
},function (error) {
  Vue.hideLoading()
  return Promise.reject(error)
})

export const getWxStr = params => {
  return axios.post('authorize/fetchJsApiTicket', params).then(res => res.data)
}

export const queryList = params => {
  return axios.post('authorize/user', params).then(res => res.data)
}

export const recordBook = params => {
  return axios.post('user/tmp/create', params).then(res => res.data)
}

export const recordPer = params => {
  return axios.post('user/tmp/detail', params).then(res => res.data)
}

export const pushCard = params => {
  return axios.post('user/push', params).then(res => res.data)
}

export const User = params => {
  return axios.post('user/count', params).then(res => res.data)
}

export const Friends = params => {
  return axios.post('user/push/list', params).then(res => res.data)
}
/*打卡详情*/
export const Detail = params => {
  return axios.post('log/detail', params).then(res => res.data)
}

export const Parise = params => {
  return axios.post('/parise/click', params).then(res => res.data)
}
export const group = params => {
  return axios.post('group/relevance/list', params).then(res => res.data)
}
export const groups = params => {
  return axios.post('group/join', params).then(res => res.data)
}
export const Message = params => {
  return axios.post('group/message/list', params).then(res => res.data)
}

export const Agree = params => {
  return axios.post('group/agree', params).then(res => res.data)
}

export const Glisy = params => {
  return axios.post('group/list', params).then(res => res.data)
}

export const Addgroup = params => {
  return axios.post('group/apply', params).then(res => res.data)
}

export const CreatG = params => {
  return axios.post('group/add', params).then(res => res.data)
}

export const Count = params => {
  return axios.post('group/inform', params).then(res => res.data)
}

export const Personage = params => {
  return axios.post('user/detail', params).then(res => res.data)
}

export const Saveuser = params => {
  return axios.post('user/update', params).then(res => res.data)
}
export const groupsDetail = params => {
  return axios.get('group/detail/'+params,{}).then(res => res.data)
}
//群组打卡
export const CardRecord={
    groupsDate:params =>{//群组日历
        return axios.post('group/date/list', params).then(res => res.data)
    },
    usersDate:params =>{//个人日历
      return axios.post('user/month/list', params).then(res => res.data)
    },
    groupsUser:params =>{//群组打卡人数
      return axios.post('group/date/user', params).then(res => res.data)
    },
    userCard:params =>{//个人打卡记录
      return axios.post('user/push/list', params).then(res => res.data)
    },
    groupsCard:params =>{//群组打卡记录
      return axios.post('group/push/list', params).then(res => res.data)
    },
    groupPerson:params =>{//群内人员
      return axios.post('group/user/list', params).then(res => res.data)
    },
}
//群组成员
export const groupUser={
    removeUser:params =>{//移除成员
      return axios.post('group/remove', params).then(res => res.data)
    },
    changeGrouper:params =>{//转移群主
      return axios.post('group/change', params).then(res => res.data)
    },
}
// export const getJsonData = (url, params) => {
//     return new Promise((resolve, reject) => {
//         let token = localStorage.getItem("Authorization")
//         if (params != null) {
//             axios.post(url, params, {
//                 headers: { 'Content-Type': 'application/json'}
//             }).then(res => {
//                 resolve(res.data)
//             }).catch(error => {
//                 reject(error)
//             })
//         } else {
//             axios.post(url, null, {
//                 headers: { 'Content-Type': 'application/json'}
//             }).then(res => {
//                 resolve(res.data)
//             }).catch(error => {
//                 reject(error)
//             })
//         }
//     })
// }
