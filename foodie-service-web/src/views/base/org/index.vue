<template>
  <d2-container type="full">
    <page-header
      slot="header"
      @handleSearch="handleSearch"
      @handleAddDialogOpen="handleAddDialogOpen"
      @handleDelBatch="handleDelBatch"
      ref="header"
      :columns="columns"
      :dictConfig="dictConfig"
      :auth="auth"/>
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
  name: 'base-org',
  components: {
    PageHeader: () => import('./PageHeader'),
    PageMain: () => import('./PageMain'),
    PageFooter: () => import('./PageFooter')
  },
  data () {
    return {
      bizConfig: {
        bizName: '机构'
      },
      dictConfig: {},
      columns: [
        {
          prop: 'orgId',
          formShow: false,
          gridShow: false,
          gridShowOriginal: false,
          searchShow: false,
          formColumnName: '机构id',
          formColumnType: 'text',
          gridColumnName: '机构id',
          searchName: '机构id',
          searchType: 'text'
        },
        {
          prop: 'parentOrgName',
          formShow: true,
          gridShow: false,
          gridShowOriginal: false,
          searchShow: false,
          formColumnName: '父级机构',
          formColumnType: 'text',
          formAttr: {
            disabled: true
          },
          gridColumnName: '父级机构',
          searchName: '父级机构',
          searchType: 'text'
        },
        {
          prop: 'orgName',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: true,
          formColumnName: '机构名称',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入机构名称',
              trigger: 'blur'
            }
          ],
          gridColumnName: '机构名称',
          searchName: '机构名称',
          searchType: 'text'
        },
        {
          prop: 'orgCode',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: true,
          formColumnName: '机构编码',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入机构编码',
              trigger: 'blur'
            }
          ],
          gridColumnName: '机构编码',
          searchName: '机构编码',
          searchType: 'text'
        },
        {
          prop: 'orgDescription',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '机构描述',
          formColumnType: 'textarea',
          gridColumnName: '机构描述',
          searchName: '机构描述',
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
      this.$api.org.list({
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
