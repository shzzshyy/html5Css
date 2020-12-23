import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/home/Home')
const Profile = () => import('../views/profile/Profile')
const PurchaseCar = () => import('../views/purchaseCar/PurchaseCar')
const Setting = () => import('../views/setting/Setting')
const Detail = () => import('../views/detail/Detail')


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
    path: '/car',
    component: PurchaseCar
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/setting',
    component: Setting
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
