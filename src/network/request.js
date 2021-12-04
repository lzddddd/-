import axios from 'axios'

export function request(config) {

  // 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://112.74.126.4:8080/',
    timeout: 5000
  })

  // 2.1 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })

  // 2.2响应拦截器
  instance.interceptors.response.use(res => {
    // 同理，需要将结果返回出去   结果只需要data
    return res
  }, err => {
    console.log(err);
  })

  // 返回一个Promise
  return instance(config)
}




