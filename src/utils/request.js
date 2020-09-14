import axios from 'axios'
import { Notification, Message } from 'element-ui'
import throwErr from './throwError'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  withCredentials: true,
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => new Promise((resolve) => {
  const token = sessionStorage.getItem('Authorization') || localStorage.getItem('Authorization') || ''
  const tenantId = sessionStorage.getItem('tenantId') || localStorage.getItem('tenantId') || ''
  const lang = sessionStorage.getItem('lang') || localStorage.getItem('lang')
  const browserLang = navigator.language || navigator.userLanguage
  const language = browserLang.replace('-', '_')
  // const token = ''
  config.headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + token,
    TENANT: tenantId,
    // TENANT: 1,
    lang: !lang ? language : lang
  }
  if (!config.data) {
    config.data = {}
  }
  return resolve(config)
}), error => Promise.reject(error))

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const header = response.headers
    sessionStorage.setItem('Authorization', header['x-freyr-token'])
    // if the custom code is not 200, it is judged as an error.
    if (res.code !== 200) {
      if (res.code === 1002) {
        setTimeout(() => {
          window.sessionStorage.clear()
          window.localStorage.clear()
          window.location.href = `${window.location.origin}/login`
        }, 1000)
        return Notification.error({
          title: '消息',
          message: '未授权，请登录'
        })
      }
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    const { message, response } = error
    if (error && message && message.includes('timeout')) {
      Notification.error({
        title: '消息',
        message: '请求超时，请稍后再试'
      })
    }
    if (error && message && message.includes('Network Error')) {
      Notification.error({
        title: '消息',
        message: '请求错误'
      })
    }
    if (error && response) {
      Notification.error({
        title: '消息',
        message: throwErr(response.status, response)
      })
    }
    return Promise.reject(error)
  }
)

export default service
