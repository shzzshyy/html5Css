<template>
  <div>
    <el-dropdown size="small" class="d2-mr">
      <span class="btn-text">{{info.name ? `你好 ${info.name}` : '未登录'}}</span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="logOff">
          <d2-icon name="power-off" class="d2-mr-5"/>
          安全退出
        </el-dropdown-item>
        <el-dropdown-item @click.native="showEditPasswordDialog">
          <d2-icon name="key" class="d2-mr-5"/>
          修改密码
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <edit-password ref="editPassword"></edit-password>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    editPassword: () => import('./components/edit-password/index')
  },
  computed: {
    ...mapState('d2admin/user', [
      'info'
    ])
  },
  methods: {
    ...mapActions('d2admin/account', [
      'logout'
    ]),
    /**
     * @description 登出
     */
    logOff () {
      this.logout({
        confirm: true
      })
    },
    showEditPasswordDialog () {
      this.$refs.editPassword.openDialog()
    }
  }
}
</script>
