<template>
  <div>
    <el-table
      :data="currentTableData"
      v-loading="loading"
      size=""
      stripe
      style="width: 100%;"
      @selection-change="handleSelectionChange">

      <el-table-column
        type="selection"
        width="55">
      </el-table-column>

      <el-table-column v-for="(item, index) in activeColumns"
                       :key="index"
                       :prop="item.gridProp ? item.gridProp : item.prop"
                       :label="item.gridColumnName">
      </el-table-column>

      <el-table-column label="排序" v-if="auth['dictVal-sort']">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="success" icon="el-icon-bottom" size="mini" plain title="下移" @click="handleSort(scope.row, false)"></el-button>
            <el-button type="danger" icon="el-icon-top" size="mini" plain title="上移" @click="handleSort(scope.row, true)"></el-button>
          </el-button-group>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEditDialogOpen(scope.row)" v-if="auth['dictVal-edit']">编辑</el-button>
          <el-button type="text" @click="handleDel(scope.row.dictValId)" v-if="auth['dictVal-del']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <page-dialog ref="dialog"
                 :columns="columns"
                 :formData="dialogForm"
                 :title="dialogTitle"
                 :editType="editType"
                 :bizConfig="bizConfig"
                 @handleSearch="handleSearch"
    ></page-dialog>

  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      default: () => []
    },
    loading: {
      default: false
    },
    columns: {
      default: () => []
    },
    bizConfig: {
      default: () => {
      }
    },
    dictRow: {
      default: () => {}
    },
    auth: {
    }
  },
  components: {
    PageDialog: () => import('./PageDialog/index')
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
    handleSwitchChange (val, index) {
      const oldValue = this.currentTableData[index]
      this.$set(this.currentTableData, index, {
        ...oldValue,
        type: val
      })
      // 注意 这里并没有把修改后的数据传递出去 如果需要的话请自行修改
    },
    handleSearch () {
      this.$emit('handleSearch')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleAddDialogOpen () {
      if (!this.dictRow || !this.dictRow.dictId) {
        this.$message.error('请在左侧先选择一个字典，再添加字典值！')
        return
      }
      this.dialogForm = { dictName: this.dictRow.dictName, dictId: this.dictRow.dictId }
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
    handleDel (id) {
      this.$confirm('删除后不可恢复，确认删除?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$api.dictVal.delete({ id: id })
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
      const ids = this.multipleSelection.map(item => item.dictValId).toString()
      this.$confirm('删除后不可恢复，确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$api.dictVal.deleteBatch({ ids: ids })
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
      }).catch(() => {})
    },
    handleSort (row, up) {
      this.$api.dictVal.sort({ ...row, up: up })
        .then(res => {
          this.$notify({
            title: '排序' + '成功'
          })
          this.$emit('handleSearch')
        })
        .catch(err => {
          this.$notify({
            title: '排序' + '异常'
          })
          console.log('err', err)
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
