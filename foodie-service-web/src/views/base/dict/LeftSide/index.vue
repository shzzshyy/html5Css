<template>
  <d2-container id="dictLeftPanel" type="full" >
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
      ref="body"
      @handleSearch="handleSearch"
      @handleRowClick="handleRowClick"
      :auth="auth"/>
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
  name: 'base-dict',
  props: {
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
        bizName: '字典'
      },
      columns: [
        {
          formColumnName: '字典名称',
          gridColumnName: '字典名称',
          searchName: '字典名称',
          prop: 'dictName',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: true,
          formColumnType: 'text',
          formValidate: [
            { required: true, message: '请输入字典名称', trigger: 'blur' }
          ]
        },
        {
          formColumnName: '字典编码',
          gridColumnName: '字典编码',
          searchName: '字典编码',
          prop: 'dictCode',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: false,
          formColumnType: 'text',
          formValidate: [
            { required: true, message: '请输入字典编码', trigger: 'blur' }
          ],
          searchType: 'text'
        }
      ],
      table: [],
      loading: false,
      pageInfo: {
        page: 1,
        size: 10,
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
      this.$api.dict.list({
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
            // 刷新后让当前选中字典取消
            this.handleRowClick({})
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
    },
    handleRowClick (dictRow) {
      this.$emit('handleLoadDictVal', dictRow)
    }
  },
  mounted () {
    this.handleSearch()
  }
}
</script>
<style>
  #dictLeftPanel .d2-container-full {
    border: none !important;
  }
</style>
