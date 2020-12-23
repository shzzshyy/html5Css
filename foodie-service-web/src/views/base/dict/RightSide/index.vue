<template>
  <d2-container id="dictRightPanel" type="full">
    <page-header
      slot="header"
      @handleSearch="handleSearch"
      @handleAddDialogOpen="handleAddDialogOpen"
      @handleDelBatch="handleDelBatch"
      ref="header"
      :columns="columns"
      :auth="auth"/>
    <page-main
      :table-data="table"
      :loading="loading"
      :columns="columns"
      :bizConfig="bizConfig"
      :dictRow="dictRow"
      :auth="auth"
      ref="body"
      @handleSearch="handleSearch"/>
    <page-footer
      slot="footer"
      :current="pageInfo.page"
      :size="pageInfo.size"
      :total="pageInfo.total"
      @change="handlePaginationChange"/>
  </d2-container>
</template>

<script>
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'base-dict-val',
  props: {
    dictRow: {
      default: () => {}
    },
    auth: {
    }
  },
  components: {
    PageHeader: () => import('./PageHeader'),
    PageMain: () => import('./PageMain'),
    PageFooter: () => import('./PageFooter')
  },
  data () {
    return {
      bizConfig: {
        bizName: '字典值'
      },
      columns: [
        {
          formColumnName: '所属字典',
          gridColumnName: '所属字典',
          searchName: '所属字典',
          prop: 'dictName',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchPageShow: false,
          formColumnType: 'text',
          formValidate: [
            { required: true, message: '请输入字典值名称', trigger: 'blur' }
          ],
          formAttr: {
            disabled: true
          },
          searchType: 'text'
        },
        {
          formColumnName: '字典值名称',
          gridColumnName: '字典值名称',
          searchName: '字典值名称',
          prop: 'dictValName',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchPageShow: true,
          formColumnType: 'text',
          formValidate: [
            { required: true, message: '请输入字典值名称', trigger: 'blur' }
          ],
          searchType: 'text'
        },
        {
          formColumnName: '字典值编码',
          gridColumnName: '字典值编码',
          searchName: '字典值编码',
          prop: 'dictValCode',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchPageShow: false,
          formColumnType: 'text'
        }
      ],
      table: [],
      loading: false,
      pageInfo: {
        page: 1,
        size: 20,
        total: 0
      },
      searchForm: {}
    }
  },
  methods: {
    handlePaginationChange (val) {
      this.pageInfo = val
      // nextTick 只是为了优化示例中 notify 的显示
      this.$nextTick(() => {
        this.handleSearch()
      })
    },
    handleSearch (form) {
      this.loading = true
      this.searchForm = form || this.searchForm
      if (form) {
        this.pageInfo.page = 1
      }
      this.$api.dictVal.list({
        ...this.searchForm,
        ...this.pageInfo
      })
        .then(res => {
          // 如果当前页没有数据且总数有数据，则加载前一页数据
          if (res.content.length <= 0 && res.total > 0) {
            this.pageInfo.page--
            this.handleSearch()
          } else {
            this.loading = false
            this.$notify({
              title: '数据请求完毕'
            })
            this.table = res.content
            this.pageInfo.total = res.total
          }
        })
        .catch(err => {
          this.loading = false
          this.$notify({
            title: '数据请求异常'
          })
          console.log('err', err)
        })
    },
    handleAddDialogOpen () {
      this.$refs.body.handleAddDialogOpen()
    },
    handleDelBatch () {
      this.$refs.body.handleDelBatch()
    }
  },
  mounted () {
    // this.handleSearch()
  },
  watch: {
    dictRow () {
      // 如果是真实的点击事件，则刷新右侧列表
      // 如果是清空的点击事件（传的是个空对象，则清空）
      if (this.dictRow.dictId) {
        this.handleSearch({ dictId: this.dictRow.dictId })
      } else {
        this.table = []
      }
    }
  }
}
</script>
<style>
  #dictRightPanel .d2-container-full {
    left: 20px;
    border: none !important;
  }
</style>
