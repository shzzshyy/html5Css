import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'


Vue.config.productionTip = false
Vue.prototype.$store = store


new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

// axios.defaults.baseURL = 'http://123.207.32.32:8000'
// axios.defaults.timeout = 5000


// axios({
//   url: 'http://123.207.32.32:8000/home/multidata',
//   method: 'get',
//   params: {

//   }
// }).then(res => {
//   // console.log(res)
// }).catch(res =>{

// })

// // 并发
// axios.all([axios({
//   url: '/home/multidata'
// }
// ),axios({
//   url: '/home/data',
//   params:{
//     type: 'sell',
//     page: '5'
//   }
// }
// )]).then(results => {
//   console.log(results)
// })

//创建实例
// const instance = axios.create({
//   baseURL: 'http://123.207.32.32:8000',
//   timeout: 5000
// })

// instance({
//   url: '/home/data',
//   params: {
//     type: 'pop',
//     page: 1
//   }

// }).then(res => {
//   console.log(res)
// })

import {request} from './network/request'

// request({
//   url: '/home/multidata'
// },res => {
//   console.log(res)
// },err => {
//   console.log(err)
// })

request({
  url: '/home/multidata',
}).then(res => {

}).catch(err => {

})