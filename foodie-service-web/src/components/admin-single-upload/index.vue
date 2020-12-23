<template>
  <el-upload
          :action="action"
          :list-type="listType"
          :limit="1"
          :file-list="fileList"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-upload="handleBeforeUpload"
          :on-success="handleSuccess"
          :on-error="handleError"
          :on-exceed="handleExceed"
          :http-request="handleRequest"
          ref="upload">
    <el-button size="small" type="primary" >点击上传</el-button>
  </el-upload>
</template>

<script>
import request from '@api/service'
export default {
  name: 'admin-single-upload',
  props: {
    value: {
      type: String
    },
    action: {
      type: String
    },
    listType: {
      type: String,
      default: 'picture'
    },
    fileResKey: {
      type: String,
      default: 'fileUrl'
    },
    supportDownload: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'value', // 绑定的值，通过父组件传递
    event: 'update' // 自定义事件名
  },
  data () {
    return {
      fileList: [],
      isUpload: false
    }
  },
  watch: {
    value: {
      handler (val) {
        // 如果是当前刚上传的，不做处理
        if (this.isUpload) {

        } else {
          // 更新（有点问题）
          if (val && this.fileList.length) {
            this.fileList[0].name = val
            this.fileList[0].url = process.env.VUE_APP_PROXY_TARGET + '/' + val
          } else if (val && !this.fileList.length) {
            // 新增
            this.fileList.push({ name: val, url: process.env.VUE_APP_PROXY_TARGET + '/' + val })
          } else if (!val) {
            // 移除
            this.fileList = []
          }
        }
        this.isUpload = false
      },
      immediate: true
    }
  },
  methods: {
    handlePreview (file) {
      if (this.supportDownload) {
        this.$api.file.download(this.value)
      }
    },
    handleExceed (files, fileList) {
      this.$message.error('请先删除已上传的文件再上传新的文件')
    },
    handleRemove (file, fileList) {
      this.$emit('update', '') // 子组件与父组件通讯，告知父组件更新绑定的值
    },
    handleBeforeUpload (file) {
      return true
    },
    handleSuccess (res, file, fileList) {
      this.isUpload = true
      this.$emit('update', res[this.fileResKey]) // 子组件与父组件通讯，告知父组件更新绑定的值
    },
    handleError (errMsg, file, fileList) {
      this.$message.error('文件上传失败')
    },
    handleRequest (f) {
      // FormData 对象
      const data = new FormData()
      // 文件对象
      data.append('file', f.file)

      request.post(
        this.action,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(res => {
          f.onSuccess(res)
        })
        .catch((err) => {
          f.onError(err)
        })
    }
  },
  mounted () {
    /* if (this.value) {
      this.fileList.push({ name: this.value, url: this.value })
    } */
  }
}
</script>
<style scoped>
</style>
