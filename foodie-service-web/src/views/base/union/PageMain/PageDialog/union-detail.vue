<template>
    <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="60%"
        @open="dialogOpened"
    >
        <el-table
            :data="tableData"
            v-loading="loading"
            style="width: 100%;"
            height="500"
            :row-class-name="tableRowClassName"
            @selection-change="handleSelectionChange"
        >
            <ele-table-column
                type="selection"
                width="55"
            >
            </ele-table-column>

            <el-table-column v-for="(item, index) in columns"
                :key="index"
                :prop="item.gridProp ? item.gridProp : item.prop"
                :label="item.gridColumnName"
            >
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-pagination
                :current-page="pageInfo.page"
                :page-size="pageInfo.size"
                :total="pageInfo.total"
                :page-sizes="[10, 20, 30, 40, 50]"
                layout="total, sizes, prev, pager, next, jumper"
                style="margin: -10px;"
                @size-change="handleSizeChange"
                @current-change="handlePaginationChange"
            >
            </el-pagination>
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
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
      tableData: [],
      loading: false,
      dialogVisible: false,
      inChecked: false,
      searchName: '',
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      columns: [
        {
          gridColumnName: '商家名称',
          searchName: '商家名称',
          prop: 'userName',
          gridShow: true,
          formShow: true,
          searchShow: false
        }
      ],
      formInline: {
        name: '',
        man: ''
      }
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      if (row.inRole) {
        return 'success-row'
      }
      return ''
    },
    openDialog () {
      this.dialogVisible = true
    },
    dialogOpened () {
      this.inChecked = false
      // this.form = { ...this.form, roleId: this.formData.roleId }
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
    dialogClose () {
      this.form.in = false
    },
    handleSearch () {
      this.loading = true
      this.$api.user.listByRoleId({
        ...this.form,
        ...this.pageInfo
      })
        .then(res => {
          this.loading = false
          this.tableData = res.content
          this.pageInfo.total = res.total
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '数据请求异常'
          })
          console.log('err', err)
        })
    },
    handlePaginationChange (val) {
      this.pageInfo.page = val
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
    handleSizeChange (val) {
      this.pageInfo.size = val
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
    handleInChange (val) {
      this.form.in = val
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
    handleSetUserRole (userRow) {
      this.$api.user.setUserRole({
        userId: userRow.userId,
        roleId: this.form.roleId
      })
        .then(res => {
          this.loading = false
          this.$notify({
            title: '分配成功'
          })
          userRow.inRole = true
          // this.handleSearch()
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '分配失败'
          })
          console.log('err', err)
        })
    },
    handleRemoveUserRole (userRow) {
      this.$api.user.removeUserRole({
        userId: userRow.userId,
        roleId: this.form.roleId
      })
        .then(res => {
          this.loading = false
          this.$notify({
            title: '移除成功'
          })
          this.handleSearch()
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '移除失败'
          })
          console.log('err', err)
        })
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
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
    },
    form: {
      get: function () {
        return {
          in: this.inChecked,
          name: this.searchName,
          roleId: this.formData.roleId
        }
      },
      set: function (value) {
        this.form = value
      }
    }
  }
}
</script>
<style scoped>
</style>
