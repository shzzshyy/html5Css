import { Message, MessageBox } from 'element-ui'
import util from '@/libs/util.js'
import router from '@/router'
import api from '@/api'
const md5 = require('md5')

export default {
  namespaced: true,
  actions: {
    /**
     * @description 登录
     * @param {Object} context
     * @param {Object} payload username {String} 用户账号
     * @param {Object} payload password {String} 密码
     * @param {Object} payload route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    async login ({ dispatch }, {
      username = '',
      password = ''
    } = {}) {
      return new Promise((resolve, reject) => {
        password = md5(password)
        // 开始请求登录接口
        api.sysLogin({
          username,
          password
        })
          .then(async res => {
            // 设置 cookie 一定要存 uuid 和 token 两个 cookie
            // 整个系统依赖这两个数据进行校验和存储
            // uuid 是用户身份唯一标识 用户注册的时候确定 并且不可改变 不可重复
            // token 代表用户当前登录状态 建议在网络请求中携带 token
            // 如有必要 token 需要定时更新，默认保存一天
            util.cookies.set('uuid', res.userId)
            util.cookies.set('token', res.token)
            // 设置 vuex 用户信息
            await dispatch('d2admin/user/set', {
              name: res.name
            }, { root: true })
            // 用户登录后从持久化数据加载一系列的设置
            await dispatch('load')
            // 结束
            resolve()
          })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    /**
     * @description 登录
     * @param {Object} param context
     * @param {Object} param username {String} 用户账号
     * @param {Object} param password {String} 密码
     * @param {Object} param route {Object} 登录成功后定向的路由对象 任何 vue-router 支持的格式
     */
    async loadMenus ({ state, commit, dispatch }) {
      return new Promise((resolve, reject) => {
        if (state.hasLoadMenu) {
          // 结束
          resolve()
        }
        state.hasLoadMenu = true
        // 开始请求登录接口
        api.resource.listMenusByUser({})
          .then(async res => {
            // 添加路由
            // routerExtend(res.routes)
            // router.addRoutes(res.routes)
            // await commit('d2admin/page/add', res.routes, { root: true })
            // 左侧展示菜单数组
            await commit('d2admin/menu/asideArrayReset', {}, { root: true })
            await commit('d2admin/menu/asideArrayAdd', res.menus, { root: true })
            // 重置菜单，防止多次刷新
            await commit('d2admin/menu/menuReset', {}, { root: true })
            // 添加后台加载的菜单信息
            await commit('d2admin/menu/menuAdd', res.menus, { root: true })
            // 添加菜单查询
            await commit('d2admin/search/add', res.menus, { root: true })
            // 添加功能
            await commit('d2admin/menu/funSet', res.functions, { root: true })
            // 结束
            resolve()
          })
          .catch(err => {
            console.log('err: ', err)
            reject(err)
          })
      })
    },
    /**
     * @description 注销用户并返回登录页面
     * @param {Object} context
     * @param {Object} payload confirm {Boolean} 是否需要确认
     */
    logout ({ commit, dispatch }, { confirm = false } = {}) {
      /**
       * @description 注销
       */
      function logout () {
        api.sysLogout({})
          .then(async res => {
            // 删除cookie
            util.cookies.remove('token')
            util.cookies.remove('uuid')
            // 清空 vuex 用户信息
            await dispatch('d2admin/user/set', {}, { root: true })
            await commit('d2admin/menu/asideReset', {}, { root: true })
            // 跳转路由
            await router.push({
              name: 'login'
            })
          })
          .catch(err => {
            console.log('err: ', err)
          })
      }
      // 判断是否需要确认
      if (confirm) {
        commit('d2admin/gray/set', true, { root: true })
        MessageBox.confirm('确定要退出当前用户吗', '退出系统', { type: 'warning' })
          .then(() => {
            commit('d2admin/gray/set', false, { root: true })
            logout()
          })
          .catch(() => {
            commit('d2admin/gray/set', false, { root: true })
            Message({ message: '取消退出操作' })
          })
      } else {
        logout()
      }
    },
    /**
     * @description 用户登录后从持久化数据加载一系列的设置
     * @param {Object} context
     */
    async load ({ dispatch }) {
      // 加载用户名
      await dispatch('d2admin/user/load', null, { root: true })
      // 加载主题
      await dispatch('d2admin/theme/load', null, { root: true })
      // 加载导航模式
      await dispatch('d2admin/menu/loadNav', null, { root: true })
      // 加载页面过渡效果设置
      await dispatch('d2admin/transition/load', null, { root: true })
      // 持久化数据加载上次退出时的多页列表
      await dispatch('d2admin/page/openedLoad', null, { root: true })
      // 持久化数据加载侧边栏配置
      await dispatch('d2admin/menu/asideLoad', null, { root: true })
      // 持久化数据加载全局尺寸
      await dispatch('d2admin/size/load', null, { root: true })
      // 持久化数据加载颜色设置
      await dispatch('d2admin/color/load', null, { root: true })
    }
  }
}
