import axios from 'axios'

const request  = axios.create({
  baseURL:'http://localhost:8000',
  timeout:5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
  return config
})

// 相应拦截器
request.interceptors.response.use((res) => {
  return res.data
},(err) => {
  alert('网络出错,等一会再试一次吧')
  return Promise.reject(err)
})

export default request