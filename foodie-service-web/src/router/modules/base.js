import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/base',
  name: 'base',
  meta,
  redirect: { name: 'base-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'user',
      name: `${pre}user`,
      component: _import('base/user'),
      meta: {
        ...meta,
        title: '用户管理'
      }
    },
    {
      path: 'role',
      name: `${pre}role`,
      component: _import('base/role'),
      meta: {
        ...meta,
        title: '角色管理'
      }
    },
    {
      path: 'resource',
      name: `${pre}resource`,
      component: _import('base/resource'),
      meta: {
        ...meta,
        title: '资源管理'
      }
    },
    {
      path: 'dict',
      name: `${pre}dict`,
      component: _import('base/dict'),
      meta: {
        ...meta,
        title: '字典管理'
      }
    },
    {
      path: 'org',
      name: `${pre}org`,
      component: _import('base/org'),
      meta: {
        ...meta,
        title: '机构管理'
      }
    },
    {
      path: 'restaurant',
      name: `${pre}restaurant`,
      component: _import('base/restaurant'),
      meta: {
        ...meta,
        title: '餐厅管理'
      }
    },
    {
      path: 'union',
      name: `${pre}union`,
      component: _import('base/union'),
      meta: {
        ...meta,
        title: '餐厅合集管理'
      }
    }
  ])('base-')
}
