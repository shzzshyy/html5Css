<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="30%"
            @open="dialogOpened"
    >
        <div style="overflow-y: auto; max-height: 500px;">
        <el-tree
                v-loading="loading"
                ref="tree"
                :data="data"
                show-checkbox
                node-key="resourceId"
                :props="defaultProps"
                :default-expand-all="true">
        </el-tree>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleSaveResourcesRole">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
  props: {
    bizConfig: {
      default: {
      }
    },
    dictConfig: {
      default: {
      }
    },
    formData: {
      default: {}
    },
    title: {
      default: ''
    }
  },
  data () {
    return {
      data: [],
      loading: false,
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'resourceName'
      }
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    dialogOpened () {
      this.form = { roleId: this.formData.roleId }
      this.$nextTick(() => {
        this.handleLoadCheckedResources()
      })
    },
    handleLoadCheckedResources () {
      this.loading = true
      this.$api.resource.listByRoleId({
        ...this.form
      })
        .then(res => {
          this.loading = false
          this.$refs.tree.setCheckedKeys(res)
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '数据请求异常'
          })
          console.log('err', err)
        })
    },
    handleLoadTree () {
      this.loading = true
      this.$api.resource.list({
      })
        .then(res => {
          this.loading = false
          this.data = res
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '数据请求异常'
          })
          console.log('err', err)
        })
    },
    handleSaveResourcesRole () {
      const checkedKeys = this.$refs.tree.getCheckedKeys()
      const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()

      // 对于未分配任何资源的给个提示
      if (!checkedKeys || checkedKeys.length <= 0) {
        this.$confirm('您尚未分配任何资源，确定对此角色不分配资源?', '提示', {
          type: 'warning'
        }).then(() => {
          this.saveResourceRole(checkedKeys, halfCheckedKeys)
        }).catch(() => {
        })
      } else {
        this.saveResourceRole(checkedKeys, halfCheckedKeys)
      }
    },
    saveResourceRole (checkedKeys, halfCheckedKeys) {
      this.$api.resource.saveResourcesRole({
        ...this.form,
        resourceIds: checkedKeys,
        notRealResourceIds: halfCheckedKeys
      })
        .then(res => {
          this.loading = false
          this.$notify({
            title: '分配成功'
          })
          this.dialogVisible = false
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '分配失败'
          })
          console.log('err', err)
        })
    }
  },
  computed: {
    activeColumns: {
      get: function () {
        return this.columns.filter((column) => {
          return column.formShow
        })
      },
      set: function (value) {
        this.activeColumns = value
      }
    }
  },
  mounted () {
    this.handleLoadTree()
  }
}
</script>
