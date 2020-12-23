import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

const meta = { auth: true }

export default {
  path: '/generate',
  name: 'generate',
  meta,
  redirect: { name: 'generate-index' },
  component: layoutHeaderAside,
  children: (pre => [
    {
      path: 'form-config',
      name: `${pre}form-config`,
      component: _import('generate/form-config'),
      meta: {
        ...meta,
        title: '表单配置'
      }
    },
    {
      path: 'template',
      name: `${pre}template`,
      component: _import('generate/template'),
      meta: {
        ...meta,
        title: '模板管理'
      }
    }
  ])('generate-')
}
