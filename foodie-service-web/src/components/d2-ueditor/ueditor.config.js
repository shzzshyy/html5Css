export default {
  UEDITOR_HOME_URL: '/lib/UEditor/',
  serverUrl: process.env.VUE_APP_PROXY_TARGET + '/ueditor/handle',
  // 编辑器不自动被内容撑高
  autoHeightEnabled: false,
  // 初始容器高度
  initialFrameHeight: 480,
  // 初始容器宽度
  initialFrameWidth: '100%',
  // 关闭自动保存
  enableAutoSave: false,
  // 设置zIndex在dialog前面
  zIndex: 5000,
  // 工具栏
  toolbars: [
    ['undo', 'redo', 'bold', 'italic', 'underline', 'fontborder', 'strikethrough', 'superscript', 'subscript', 'removeformat', 'formatmatch', 'autotypeset', 'blockquote', 'pasteplain', '|', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify', '|', 'forecolor', 'backcolor', 'fontfamily', 'fontsize', 'insertorderedlist', 'insertunorderedlist', 'selectall', 'cleardoc'],
    ['link', 'simpleupload', 'imagenone', 'imageleft', 'imageright', 'imagecenter', 'inserttable']
  ]
}
