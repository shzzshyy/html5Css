import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/log',
  name: 'log',
  meta,
  redirect: { name: 'log-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'login',
      name: `${pre}login`,
      component: _import('log/login'),
      meta: {
        ...meta,
        title: '登录日志'
      }
    },
    {
      path: 'opt',
      name: `${pre}opt`,
      component: _import('log/opt'),
      meta: {
        ...meta,
        title: '操作日志'
      }
    }
  ])('log-')
}
