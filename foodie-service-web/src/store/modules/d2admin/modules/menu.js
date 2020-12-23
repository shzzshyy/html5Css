// 设置文件
import setting from '@/setting.js'
import { get } from 'lodash'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    // 顶栏展示菜单
    header: [],
    // 侧栏展示菜单
    aside: [],
    // 静态菜单
    menuOriginal: [],
    // 侧栏菜单静态数组集合
    asideArrayOriginal: [],
    // 侧栏菜单数组集合
    asideArray: [],
    // 侧边栏收缩
    asideCollapse: setting.menu.asideCollapse,
    // 功能
    fun: {},
    // 当前路径
    currentPath: '',
    // 是否全部显示在左侧
    asideOnly: setting.menu.asideOnly,
    // 导航模式
    navList: get(setting, 'nav.list', [])
  },
  getters: {
    /**
     * @description 返回动态菜单数据
     * @param {*} state vuex state
     */
    asideOnlyGet (state) {
      return state.asideOnly
    },
    /**
     * @description 返回左侧数组
     * @param {*} state vuex state
     */
    asideArrayGet (state) {
      return state.asideArray
    },
    /**
     * @description 返回菜单栏数据
     * @param {*} state vuex state
     */
    menuGet (state) {
      if (state.asideOnly) {
        return state.aside
      } else {
        return state.header
      }
    },
    /**
     * @description 返回功能权限
     * @param {*} state vuex state
     */
    funGet (state) {
      return state.fun
    }
  },
  actions: {
    /**
     * @description 激活一个导航模式
     * @param {String} name 需要激活的导航名称
     */
    async setNav ({ state, commit, dispatch }, name) {
      // 检查这个主题在主题列表里是否存在
      state.asideOnly = name
      // 将 vuex 中的主题应用到 dom
      commit('menuNavChange')
      // 持久化
      await dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'menu.asideOnly',
        value: state.asideOnly,
        user: true
      }, { root: true })
    },
    /**
     * @description 从持久化数据加载导航设置
     * @param {Object} context
     */
    async loadNav ({ state, commit, dispatch }) {
      // store 赋值
      const asideOnly = await dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'menu.asideOnly',
        defaultValue: state.asideOnly,
        user: true
      }, { root: true })

      // 加载时，如果两者不一致，才去调用切换
      if (state.asideOnly !== asideOnly) {
        state.asideOnly = asideOnly
        // 应用导航切换设置
        commit('menuNavChange')
      }
    },
    /**
     * 设置侧边栏展开或者收缩
     * @param {Object} context
     * @param {Boolean} collapse is collapse
     */
    async asideCollapseSet ({ state, dispatch }, collapse) {
      // store 赋值
      state.asideCollapse = collapse
      // 持久化
      await dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: state.asideCollapse,
        user: true
      }, { root: true })
    },
    /**
     * 切换侧边栏展开和收缩
     * @param {Object} context
     */
    async asideCollapseToggle ({ state, dispatch }) {
      // store 赋值
      state.asideCollapse = !state.asideCollapse
      // 持久化
      await dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'menu.asideCollapse',
        value: state.asideCollapse,
        user: true
      }, { root: true })
    },
    /**
     * 设置侧边栏折叠动画
     * @param {Object} context
     * @param {Boolean} transition is transition
     */
    async asideTransitionSet ({ state, dispatch }, transition) {
      // store 赋值
      state.asideTransition = transition
      // 持久化
      await dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'menu.asideTransition',
        value: state.asideTransition,
        user: true
      }, { root: true })
    },
    /**
     * 切换侧边栏折叠动画
     * @param {Object} context
     */
    async asideTransitionToggle ({ state, dispatch }) {
      // store 赋值
      state.asideTransition = !state.asideTransition
      // 持久化
      await dispatch('d2admin/db/set', {
        dbName: 'sys',
        path: 'menu.asideTransition',
        value: state.asideTransition,
        user: true
      }, { root: true })
    },
    /**
     * 持久化数据加载侧边栏设置
     * @param {Object} context
     */
    async asideLoad ({ state, dispatch }) {
      // store 赋值
      const menu = await dispatch('d2admin/db/get', {
        dbName: 'sys',
        path: 'menu',
        defaultValue: setting.menu,
        user: true
      }, { root: true })
      state.asideCollapse = menu.asideCollapse !== undefined ? menu.asideCollapse : setting.menu.asideCollapse
      state.asideTransition = menu.asideTransition !== undefined ? menu.asideTransition : setting.menu.asideTransition
    }
  },
  mutations: {
    /**
     * @description 设置顶栏菜单
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    headerSet (state, menu) {
      // store 赋值
      state.header = menu
    },
    /**
     * @description 设置侧栏菜单
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    asideSet (state, menu) {
      // store 赋值
      state.aside = menu
    },
    /**
     * @description 设置侧栏菜单数组
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    asideArraySet (state, menu) {
      // store 赋值
      state.asideArrayOriginal = menu
      state.asideArray = menu
    },
    /**
     * @description 添加侧栏菜单数组
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    asideArrayAdd (state, menu) {
      // store 赋值
      state.asideArray = state.asideArray.concat(menu)
    },
    /**
     * @description 添加侧栏菜单数组
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    asideArrayReset (state, menu) {
      // store 赋值
      state.asideArray = state.asideArrayOriginal
    },
    /**
     * @description 设置菜单
     * @param {Object} state state
     * @param {Array} menu menu setting
     */
    menuSet (state, menu) {
      // store 赋值
      if (state.asideOnly) {
        state.aside = menu
        state.header = []
      } else {
        state.header = menu
      }
      state.menuOriginal = menu
    },
    /**
     * @description 添加菜单
     * @param state
     * @param menu
     */
    menuAdd (state, menu) {
      // store 赋值
      if (state.asideOnly) {
        state.aside = state.aside.concat(menu)
      } else {
        state.header = state.header.concat(menu)
      }
    },
    /**
     * 重置菜单
     * @param state
     */
    menuReset (state) {
      if (state.asideOnly) {
        state.aside = state.menuOriginal
        state.header = []
      } else {
        state.header = state.menuOriginal
      }
    },
    /**
     * 切换导航模式
     * @param state
     * @param asideOnly
     */
    menuNavChange (state) {
      if (state.asideOnly) {
        state.aside = state.header
        state.header = []
      } else {
        state.header = state.aside
        if (router.app._route.matched.length > 0) {
          const _side = state.asideArray.filter(menu => menu.path === router.app._route.matched[0].path)
          state.aside = _side.length > 0 ? _side[0].children : []
        } else {
          state.aside = []
        }
      }
    },
    /**
     * 设置功能权限
     * @param state
     * @param fun
     */
    funSet (state, fun) {
      // store 赋值
      state.fun = fun
    },
    /**
     * 设置当前路径
     */
    currentPathSet (state, path) {
      state.currentPath = path
    }
  }
}
