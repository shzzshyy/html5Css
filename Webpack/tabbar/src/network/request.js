import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 添加拦截器
  instance.interceptors.request.use(config => {
      //拦截之后需要传出去
      //为什么要拦截
      //1.比如config中一些信息不符合服务器要求
      //2.请求loading图标
      //3.携带token
      return config
  }, err => {

  }); //拦截请求  两个函数参数

  instance.interceptors.response.use(res => {
    console.log(res)
    return res
  }, err => {
    console.log(err)
    return err
  }); //拦截响应



  return instance(config)
  // return new Promise((resolve,reject) => {
  //   const instance = axios.create({
  //     baseURL: 'http://123.207.32.32:8000',
  //     timeout: 5000
  //   })


   
    // instance(config)
    // .then(res => {
    //    resolve(res)
    // })
    // .catch(err => {
    //   reject(err)
    // })
  // })
}