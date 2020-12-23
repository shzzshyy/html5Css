import axios from 'axios'
// import Adapter from 'axios-mock-adapter'
import { Message } from 'element-ui'
// import { get } from 'lodash'
import util from '@/libs/util'
import store from '@/store'
import router from '@/router'

// 记录和显示错误
function errorLog (error) {
  // 添加到日志
  //  store.dispatch('d2admin/log/push', {
  //  message: '数据请求异常',
  //  type: 'danger',
  //  meta: {
  //    error
  //  }
  //  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  // baseURL: process.env.VUE_APP_API,
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers.Authorization = token
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    if (response.request.responseType === 'blob') {
      return response
    } else {
      return response.data
    }
  },
  error => {
    async function sendLoginPage () {
      // 删除cookie
      util.cookies.remove('token')
      util.cookies.remove('uuid')
      // 清空 vuex 用户信息
      await store.dispatch('d2admin/user/set', {}, { root: true })
      await store.commit('d2admin/menu/asideReset', {}, { root: true })
      // 跳转路由
      router.push({
        name: 'login'
      })
    }
    if (error && error.response && error.response.headers) {
      if (error.response.headers.message) {
        error.message = unescape(error.response.headers.message.replace(/\\u/g, '%u'))
      }
      switch (error.response.status) {
        case 400: error.message = error.message || '请求错误'; break
        case 401:
          error.message = error.message || '未授权，请登录'
          sendLoginPage()
          break
        case 403: error.message = error.message || '拒绝访问'; break
        case 404: error.message = error.message || `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = error.message || '请求超时'; break
        case 500: error.message = error.message || '服务器内部错误'; break
        case 501: error.message = error.message || '服务未实现'; break
        case 502: error.message = error.message || '网关错误'; break
        case 503: error.message = error.message || '服务不可用'; break
        case 504: error.message = error.message || '网关超时'; break
        case 505: error.message = error.message || 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

// export const mock = new Adapter(service)

export default service
