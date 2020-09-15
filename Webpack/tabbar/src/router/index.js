import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../views/home/Home.vue'
// import Home from '../views/profile/Profile.vue'
// import Home from '../views/purchaseCar/PurchaseCar.vue'
// import Home from '../views/setting/Setting.vue'

// 懒加载
const Home = () => import('../views/home/Home.vue')
const Profile = () => import('../views/profile/Profile.vue')
const PurchaseCar = () => import('../views/purchaseCar/PurchaseCar.vue')
const Setting = () => import('../views/setting/Setting.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/purchaseCar',
    component: PurchaseCar
  },
  {
    path: '/setting',
    component: Setting
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
