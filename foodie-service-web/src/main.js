// Vue
import Vue from 'vue'
import i18n from './i18n'
import App from './App'
// 核心插件
import d2Admin from '@/plugin/d2admin'
// store
import store from '@/store/index'

// 高德地图
import VueAMap from 'vue-amap'

// 菜单和路由设置
import router from './router'
import { menuInit, menuAsideArray } from '@/menu'
import { frameInRoutes } from '@/router/routes'

// 核心插件
Vue.use(d2Admin)
// 地图
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: '870d869e8fada69d2fb1d40fc22d7fcb',
  plugin: [
    'AMap.Autocomplete',
    'AMap.PlaceSearch',
    'AMap.Scale',
    'AMap.OverView',
    'AMap.ToolBar',
    'AMap.MapType',
    'AMap.PolyEditor',
    'AMap.CircleEditor',
    'AMap.Geolocation',
    'AMap.DistrictSearch'
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0' // ui库版本，不配置不加载,
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  created () {
    // 处理路由 得到每一级的路由设置
    this.$store.commit('d2admin/page/init', frameInRoutes)
    // 设置菜单
    this.$store.commit('d2admin/menu/menuSet', menuInit)
    // 设置左侧菜单数组
    this.$store.commit('d2admin/menu/asideArraySet', menuAsideArray)
  },
  mounted () {
    // 展示系统信息
    // this.$store.commit('d2admin/releases/versionShow')
    // 用户登录后从数据库加载一系列的设置
    this.$store.dispatch('d2admin/account/load')
    // 获取并记录用户 UA
    this.$store.commit('d2admin/ua/get')
    // 初始化全屏监听
    this.$store.dispatch('d2admin/fullscreen/listen')
  }
}).$mount('#app')
