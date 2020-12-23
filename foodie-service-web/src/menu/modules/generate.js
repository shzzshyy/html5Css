export default {
  path: '/generate',
  title: '快速开发',
  icon: 'send',
  children: (pre => [
    { path: `${pre}template`, title: '模板管理', icon: 'file-o' },
    { path: `${pre}form-config`, title: '表单配置', icon: 'file-o' }
  ])('/generate/')
}
