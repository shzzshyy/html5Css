
// 配置路由信息
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/Home.vue';
// import About from '../components/About.vue';
// import User from '../components/User.vue';
Vue.use(VueRouter)
// 懒加载
const Home = () => import ('../components/Home.vue')
const About = () => import ('../components/About.vue')
const User = () => import ('../components/User.vue')
const HomeNews = () => import('../components/HomeNews.vue')
const HomeMessage = () => import('../components/HomeMessage.vue')
const Profile = () => import('../components/Profile.vue')

const routes = [
  {
    //默认路径
    path: '/',
    //重定向
    redirect: '/home'
  },
  //配置路径和映射关系
  {
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      {
        path: '/',
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
        path: 'message',
        component: HomeMessage
      }
    ]
  },
  {
    path: '/about',
    component: About,
    meta: {
      title: '关于'
    },
  },
  {
    path: '/user/:userid',
    component: User,
    meta: {
      title: '用户'
    },
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      title: '档案'
    },
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to,from,next) => {
  //from跳到to
  // document.title = to.meta.title
  document.title = to.matched[0].meta.title
  next()
})

export default router
