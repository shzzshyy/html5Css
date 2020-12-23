<template>
    <d2-container-frame :src="url"/>
</template>

<script>
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'generate-form-config',
  data () {
    return {
      url: process.env.VUE_APP_API + 'generate/index.html'
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style scoped>
    .el-container {
        background-color: white;
        height: 100%;
    }
    .el-container .el-aside {
        margin: 10px 0;
        padding: 20px;
        border-right: #cfd7e5 1px solid;
    }
</style>
