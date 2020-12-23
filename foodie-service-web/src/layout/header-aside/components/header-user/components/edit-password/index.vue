<template>
    <el-dialog
            title="修改密码"
            :visible.sync="editPasswordDialogVisible"
            width="30%"
            @closed="dialogClosed"
    >
        <el-form ref="dialogForm" :rules="rules" :model="form" label-width="80px">
            <el-form-item label="原密码" prop="oldPassword">
                <el-input v-model="form.oldPassword" placeholder="原密码" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
                <el-input v-model="form.newPassword" placeholder="新密码" :show-password="true"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmPassword">
                <el-input v-model="form.confirmPassword" placeholder="确认密码" :show-password="true"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="editPasswordDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSaveConfig">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
const md5 = require('md5')
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'edit-password',
  data () {
    return {
      editPasswordDialogVisible: false,
      form: {

      },
      rules: {
        oldPassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    openDialog () {
      this.editPasswordDialogVisible = true
    },
    dialogClosed () {
      this.$refs.dialogForm.resetFields()
    },
    handleSaveConfig () {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          if (this.form.newPassword !== this.form.confirmPassword) {
            this.$message.error('新密码和确认密码不一致')
            return
          }
          this.$api.user.editPassword({
            oldPassword: md5(this.form.oldPassword),
            newPassword: md5(this.form.newPassword)
          })
            .then(res => {
              this.editPasswordDialogVisible = false
              this.$notify({
                title: '修改密码成功，你可以用新的密码登录了！',
                type: 'success'
              })
            })
            .catch(err => {
              console.log('err', err)
            })
        }
      })
    }
  },
  mounted () {
  }
}
</script>
