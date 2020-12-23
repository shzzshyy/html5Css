<template>
  <div>
    <el-table
      :data="currentTableData"
      v-loading="loading"
      row-key="roleId"
      size=""
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange">

      <el-table-column v-for="(item, index) in activeColumns"
                       :key="index"
                       :prop="item.gridProp ? item.gridProp : item.prop"
                       :label="item.gridColumnName">
        <template  slot-scope="scope">
          <admin-status-tag v-if="item.gridShowType === 'status-tag'" :value="scope.row[item.prop]" :text="scope.row[item.gridProp ? item.gridProp : item.prop]"></admin-status-tag>
          <template v-else>{{scope.row[item.gridProp ? item.gridProp : item.prop]}}</template>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEditDialogOpen(scope.row)" v-if="auth.edit">编辑</el-button>
          <el-button type="text" @click="handleDel(scope.row.roleId)" :disabled="!scope.row.hasChildren" v-if="auth.del">删除</el-button>
          <el-divider direction="vertical" v-if="auth.add"></el-divider>
          <el-button type="text" @click="handleAddDialogOpen(scope.row)" v-if="auth.add">添加子级角色</el-button>
          <el-divider direction="vertical" v-if="auth.usersRoleSet"></el-divider>
          <el-button type="text" @click="handleAllocationUserDialogOpen(scope.row)" v-if="auth.usersRoleSet">分配用户</el-button>
          <el-divider direction="vertical" v-if="auth.resourcesRoleSet"></el-divider>
          <el-button type="text" @click="handleAllocationResourceDialogOpen(scope.row)" v-if="auth.resourcesRoleSet">分配资源</el-button>
        </template>
      </el-table-column>
    </el-table>

    <page-dialog ref="dialog" :columns="columns"
                 :formData="dialogForm"
                 :title="dialogTitle"
                 :editType="editType"
                 :bizConfig="bizConfig"
                 :dictConfig="dictConfig"
                 @handleSearch="handleSearch"
    ></page-dialog>

    <allocation-user-dialog ref="allocationUserDialog"
                 :formData="dialogForm"
                 :title="dialogTitle"
                 :bizConfig="bizConfig"
                 :dictConfig="dictConfig"
                 @handleSearch="handleSearch"
    ></allocation-user-dialog>

    <allocation-resource-dialog ref="allocationResourceDialog"
                  :formData="dialogForm"
                  :title="dialogTitle"
                  :bizConfig="bizConfig"
                  :dictConfig="dictConfig"
                  @handleSearch="handleSearch"
    ></allocation-resource-dialog>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      default: []
    },
    loading: {
      default: false
    },
    columns: {
      default: []
    },
    bizConfig: {
      default: {}
    },
    dictConfig: {
      default: {}
    },
    auth: {

    }
  },
  components: {
    PageDialog: () => import('./PageDialog/index'),
    AllocationUserDialog: () => import('./PageDialog/allocation-user'),
    AllocationResourceDialog: () => import('./PageDialog/allocation-resource')
  },
  data () {
    return {
      currentTableData: [],
      multipleSelection: [],
      dialogForm: {

      },
      dialogTitle: '',
      editType: 0
    }
  },
  watch: {
    tableData: {
      handler (val) {
        this.currentTableData = val
      },
      immediate: true
    }
  },
  methods: {
    handleSearch () {
      this.$emit('handleSearch')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleAddDialogOpen (row) {
      this.dialogForm = {
        parentRoleName: row ? row.roleName : '',
        parentRoleId: row ? row.roleId : '0'
      }
      this.editType = 0
      this.dialogTitle = '新增' + this.bizConfig.bizName
      this.$refs.dialog.openDialog()
    },
    handleEditDialogOpen (row) {
      this.dialogForm = { ...row }
      this.editType = 1
      this.dialogTitle = '修改' + this.bizConfig.bizName
      this.$refs.dialog.openDialog()
    },
    handleAllocationUserDialogOpen (row) {
      this.dialogForm = { ...row }
      this.dialogTitle = '给 ' + row.roleName + ' 分配用户'
      this.$refs.allocationUserDialog.openDialog()
    },
    handleAllocationResourceDialogOpen (row) {
      this.dialogForm = { ...row }
      this.dialogTitle = '给 ' + row.roleName + ' 分配资源'
      this.$refs.allocationResourceDialog.openDialog()
    },
    handleDel (id) {
      this.$confirm('确认删除?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$api.role.delete({ id: id })
          .then(res => {
            this.$notify({
              title: '删除' + this.bizConfig.bizName + '成功'
            })
            this.$emit('handleSearch')
          })
          .catch(err => {
            this.$notify({
              title: '删除' + this.bizConfig.bizName + '异常'
            })
            console.log('err', err)
          })
      }).catch(() => {})
    },
    handleDelBatch () {
      if (this.multipleSelection.length <= 0) {
        this.$notify({
          type: 'error',
          title: '未选择记录'
        })
        return
      }
      const ids = this.multipleSelection.map(item => item.roleId).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$api.role.deleteBatch({ ids: ids })
          .then(res => {
            this.$notify({
              title: '删除' + this.bizConfig.bizName + '成功'
            })
            this.$emit('handleSearch')
          }).catch(err => {
            this.$notify({
              title: '删除' + this.bizConfig.bizName + '异常'
            })
            console.log('err', err)
          })
      })
    }
  },
  computed: {
    activeColumns: {
      get: function () {
        return this.columns.filter((column) => {
          return column.gridShow
        })
      },
      set: function (value) {
        this.activeColumns = value
      }
    }
  }
}
</script>
