<template>
  <d2-container type="full">
    <page-header
      slot="header"
      :columns="columns"
      :dictConfig="dictConfig"
      :auth="auth"
      @handleSearch="handleSearch"
      @handleAddDialogOpen="handleAddDialogOpen"
      @handleDelBatch="handleDelBatch"
      ref="header"/>
    <page-main
      :table-data="tableData"
      :loading="loading"
      :columns="columns"
      :bizConfig="bizConfig"
      :dictConfig="dictConfig"
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
import { mapState } from 'vuex'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'log-opt',
  components: {
    PageHeader: () => import('./PageHeader'),
    PageMain: () => import('./PageMain'),
    PageFooter: () => import('./PageFooter')
  },
  data () {
    return {
      bizConfig: {
        bizName: '操作日志'
      },
      dictConfig: {},
      columns: [
        {
          prop: 'id',
          formShow: false,
          gridShow: false,
          gridShowOriginal: false,
          searchShow: false,
          formColumnName: 'id',
          formColumnType: 'text',
          gridColumnName: 'id',
          searchName: 'id',
          searchType: 'text'
        },
        {
          prop: 'userName',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: true,
          formColumnName: '操作人',
          formColumnType: 'text',
          gridColumnName: '操作人',
          searchName: '操作人',
          searchType: 'text'
        },
        {
          prop: 'createTime',
          formShow: false,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '操作时间',
          formColumnType: 'text',
          gridColumnName: '操作时间',
          searchName: '操作时间',
          searchType: 'text'
        },
        {
          prop: 'optIp',
          formShow: false,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '操作IP',
          formColumnType: 'text',
          gridColumnName: '操作IP',
          searchName: '操作IP',
          searchType: 'text'
        },
        {
          prop: 'requestMethod',
          formShow: false,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '请求方法',
          formColumnType: 'text',
          gridColumnName: '请求方法',
          searchName: '请求方法',
          searchType: 'text'
        },
        {
          prop: 'requestParam',
          formShow: false,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '请求参数',
          formColumnType: 'text',
          gridColumnName: '请求参数',
          searchName: '请求参数',
          searchType: 'text'
        },
        {
          prop: 'optName',
          formShow: false,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '操作名称',
          formColumnType: 'text',
          gridColumnName: '操作名称',
          searchName: '操作名称',
          searchType: 'text'
        },
        {
          prop: 'optStatus',
          formShow: false,
          gridShow: true,
          gridShowOriginal: true,
          gridShowType: 'status-tag',
          searchShow: true,
          formColumnName: '操作状态',
          formColumnType: 'text',
          gridColumnName: '操作状态',
          gridProp: 'optStatusName',
          searchName: '操作状态',
          searchType: 'p-dict',
          searchOptions: [
            {
              label: '全部',
              value: ''
            },
            {
              label: '成功',
              value: true
            },
            {
              label: '失败',
              value: false
            }
          ]
        },
        {
          prop: 'requestUsed',
          formShow: false,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '耗时',
          formColumnType: 'text',
          gridColumnName: '耗时(ms)',
          searchName: '耗时',
          searchType: 'text'
        },
        {
          prop: 'userAgent',
          formShow: false,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: 'User-Agent',
          formColumnType: 'text',
          gridColumnName: 'User-Agent',
          searchName: 'User-Agent',
          searchType: 'text'
        }
      ],
      tableData: [],
      loading: false,
      pageInfo: {
        page: 1,
        size: 10,
        total: 0
      },
      searchForm: {}
    }
  },
  computed: {
    ...mapState('d2admin/menu', [
      'currentPath',
      'fun'
    ]),
    auth () {
      return this.fun[this.currentPath] || {}
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
      this.$api.optLogin.list({
        ...this.searchForm,
        ...this.pageInfo
      })
        .then(res => {
          this.loading = false
          this.$notify({
            title: '数据请求完毕'
          })
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
    handleAddDialogOpen () {
      this.$refs.body.handleAddDialogOpen()
    },
    handleDelBatch () {
      this.$refs.body.handleDelBatch()
    },
    handleLoadDictAndValues () {
      this.columns.forEach((column, index, array) => {
        if (column.formColumnType === 'dict') {
          if (column.formDictType && !this.dictConfig[column.formDictType]) {
            //  不重复去后台加载数据
            this.dictConfig[column.formDictType] = []
            this.$api.dictVal.options({ dictCode: column.formDictType })
              .then(res => {
                //  属性拷贝赋值，让子组件渲染
                const addObject = {}
                addObject[column.formDictType] = res
                this.dictConfig = { ...this.dictConfig, ...addObject }
              })
              .catch(err => {
                this.$notify({
                  title: '字典加载失败'
                })
                console.log('err', err)
              })
          }
        }
        if (column.searchType === 'dict') {
          if (column.searchDictType && !this.dictConfig[column.searchDictType]) {
            //  不重复去后台加载数据
            this.dictConfig[column.searchDictType] = []
            this.$api.dictVal.options({ dictCode: column.searchDictType })
              .then(res => {
                //  属性拷贝赋值，让子组件渲染
                const addObject = {}
                addObject[column.searchDictType] = res
                this.dictConfig = { ...this.dictConfig, ...addObject }
              })
              .catch(err => {
                this.$notify({
                  title: '字典加载失败'
                })
                console.log('err', err)
              })
          }
        }
      })
    }
  },
  mounted () {
    this.handleSearch()
  },
  created () {
    this.handleLoadDictAndValues()
  }
}
</script>
