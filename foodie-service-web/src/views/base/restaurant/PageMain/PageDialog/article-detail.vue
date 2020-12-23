<template>
    <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="60%"
            @open="dialogOpened"
    >

        <el-form :model="articleForm" ref="articleForm" label-width="100px" class="demo-dynamic">
            <el-form-item
              prop="resName"
              label="餐厅名称"
            >
              <el-input v-model="articleForm.resName" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item
              prop="article"
              label="探文详情"
            >
              <el-input v-model="articleForm.article" type="textarea" disabled="disabled"></el-input>
            </el-form-item>
        </el-form>

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
      dialogVisible: false,
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      articleForm: {
        resName: '',
        article: ''
      }
    }
  },
  methods: {
    openDialog () {
      this.dialogVisible = true
    },
    dialogOpened () {
      this.inChecked = false
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
    dialogClose () {
      this.form.in = false
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
    }
  },
  computed: {
   
  }
}
</script>
<style scoped>
</style>
