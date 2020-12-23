<template>
  <div>
    <el-table
      :data="currentTableData"
      v-loading="loading"
      row-key="resourceId"
      size=""
      stripe
      style="width: 100%;"
      :default-expand-all=true
      @selection-change="handleSelectionChange">

      <el-table-column v-for="(item, index) in activeColumns"
                       :key="index"
                       :prop="item.gridProp ? item.gridProp : item.prop"
                       :label="item.gridColumnName">
      </el-table-column>

      <el-table-column label="排序" v-if="auth.sort">
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="success" icon="el-icon-bottom" size="mini" plain title="下移" @click="handleSort(scope.row, false)" ></el-button>
            <el-button type="danger" icon="el-icon-top" size="mini" plain title="上移" @click="handleSort(scope.row, true)"></el-button>
          </el-button-group>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEditDialogOpen(scope.row)" v-if="auth.edit">编辑</el-button>
          <el-button type="text" @click="handleDel(scope.row.resourceId)" :disabled="!scope.row.hasChildren" v-if="auth.del">删除</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="handleAddDialogOpen(scope.row)" v-if="auth.add">添加子级资源</el-button>
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
    handleSearch () {
      this.$emit('handleSearch')
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleAddDialogOpen (row) {
      this.dialogForm = {
        parentName: row ? row.resourceName : '',
        parentId: row ? row.resourceId : '0'
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
    handleDel (id) {
      this.$confirm('确认删除?', '提示', {
        type: 'warning'
      }).then(() => {
        this.$api.resource.delete({ id: id })
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
      const ids = this.multipleSelection.map(item => item.resourceId).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.$api.resource.deleteBatch({ ids: ids })
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
      this.$api.resource.sort({ ...row, up: up })
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
