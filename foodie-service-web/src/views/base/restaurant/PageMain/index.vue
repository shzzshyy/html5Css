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
        width="55"
      >
      </el-table-column>

      <el-table-column v-for="(item, index) in activeColumns"
                       :key="index"
                       :prop="item.gridProp ? item.gridProp : item.prop"
                       :label="item.gridColumnName">
        <template  slot-scope="scope">
          <admin-status-tag v-if="item.gridShowType === 'status-tag'" :value="scope.row[item.prop]" :text="scope.row[item.gridProp ? item.gridProp : item.prop]"></admin-status-tag>
          <el-button type="text" @click="handleArticleDialogOpen(scope.row)" v-else-if="item.gridShowType === 'text-link'">{{scope.row[item.gridProp ? item.gridProp : item.prop]}}</el-button>
          <template v-else>{{scope.row[item.gridProp ? item.gridProp : item.prop]}}</template>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="handleEditDialogOpen(scope.row)" v-if="auth.edit">编辑</el-button>
          <el-button type="text" @click="handleEditDialogOpen(scope.row)" v-if="auth.draft">草稿</el-button>
          <el-button type="text" v-if="auth.publish">发布</el-button>
          <el-button type="text" v-if="auth.undercarriage">下架</el-button>
          <el-button type="text" @click="handleDetailDialogOpen(scope.row)" v-if="auth.detail">探店详情</el-button>
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

    <discovery-detail-dialog ref="discoveryDetailDialog" :columns="columns"
                 :formData="dialogForm"
                 :title="dialogTitle"
                 :editType="editType"
                 :bizConfig="bizConfig"
                 :dictConfig="dictConfig"
                 @handleSearch="handleSearch"
    ></discovery-detail-dialog>

    <article-detail-dialog ref="articleDetailDialog" :columns="columns"
                 :formData="dialogForm"
                 :title="dialogTitle"
                 :editType="editType"
                 :bizConfig="bizConfig"
                 :dictConfig="dictConfig"
                 @handleSearch="handleSearch"
    ></article-detail-dialog>

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
    DiscoveryDetailDialog: () => import('./PageDialog/discovery-detail'),
    ArticleDetailDialog: () => import('./PageDialog/article-detail')
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
    handleAddDialogOpen () {
      this.dialogForm = {}
      this.editType = 0
      this.dialogTitle = '新增' + this.bizConfig.bizName
      this.$refs.dialog.openDialog()

      this.columns[0].formAttr.disabled = false
    },
    handleEditDialogOpen (row) {
      this.dialogForm = { ...row }
      this.editType = 1
      this.dialogTitle = '修改' + this.bizConfig.bizName
      this.$refs.dialog.openDialog()
      // admin用户禁修改userName
      if (row.userName === 'admin') {
        this.columns[0].formAttr.disabled = true
      } else {
        this.columns[0].formAttr.disabled = false
      }
    },
    handleDetailDialogOpen (row) {
      this.dialogForm = { ...row }
      this.dialogTitle = this.bizConfig.bizName + '详情'
      this.$refs.discoveryDetailDialog.openDialog()
    },
    handleArticleDialogOpen (row) {
      this.dialogForm = { ...row }
      this.dialogTitle = ''
      this.$refs.articleDetailDialog.openDialog()
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
<style scoped>
</style>
