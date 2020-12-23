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
                >

            <el-table-column v-for="(item, index) in columns"
                             :key="index"
                             :prop="item.gridProp ? item.gridProp : item.prop"
                             :label="item.gridColumnName">
            </el-table-column>

            <el-table-column label="操作">
                <template slot="header" slot-scope="scope">
                    <!--<el-form ref="form1" :model="form">-->
                    <el-checkbox v-model="inChecked" @change="handleInChange">已分配用户</el-checkbox>
                    <!--</el-form>-->
                </template>
                <template slot-scope="scope">
                    <el-button v-if="scope.row.inRole" type="text" @click="handleRemoveUserRole(scope.row)">移除</el-button>
                    <el-button v-else-if="!scope.row.inRole" type="text" @click="handleSetUserRole(scope.row)">分配</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot="header" slot-scope="scope">
                    <!--<el-form ref="form1" :model="form">-->
                        <el-input
                                v-model="searchName"
                                size="mini"
                                placeholder="输入用户名称回车后搜索"
                                clearable
                                @keyup.enter.native="handleSearch">
                        </el-input>
                    <!--</el-form>-->
                </template>
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
                @current-change="handlePaginationChange">
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
          gridColumnName: '登录名称',
          searchName: '登录名称',
          prop: 'userName',
          gridShow: true,
          formShow: true,
          searchShow: false
        },
        {
          gridColumnName: '用户姓名',
          searchName: '用户姓名',
          prop: 'name',
          gridShow: true,
          formShow: true,
          searchShow: true,
          searchType: 'text'
        },
        {
          gridColumnName: '邮箱',
          searchName: '邮箱',
          prop: 'email',
          gridShow: true,
          formShow: true,
          searchShow: false
        },
        {
          formColumnName: '手机',
          gridColumnName: '手机',
          searchName: '手机',
          prop: 'telephone',
          gridShow: true,
          formShow: true,
          searchShow: false
        }
      ]
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
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #47f98e;
}
</style>
