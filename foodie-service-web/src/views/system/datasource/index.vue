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
  name: 'system-datasource',
  components: {
    PageHeader: () => import('./PageHeader'),
    PageMain: () => import('./PageMain'),
    PageFooter: () => import('./PageFooter')
  },
  data () {
    return {
      bizConfig: {
        bizName: '数据源'
      },
      dictConfig: {},
      columns: [
        {
          prop: 'datasourceId',
          formShow: false,
          gridShow: false,
          gridShowOriginal: false,
          searchShow: false,
          formColumnName: '数据源id',
          formColumnType: 'text',
          gridColumnName: '数据源id',
          searchName: '数据源id',
          searchType: 'text'
        },
        {
          prop: 'datasourceName',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '数据源名称',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入数据源名称',
              trigger: 'blur'
            }
          ],
          gridColumnName: '数据源名称',
          searchName: '数据源名称',
          searchType: 'text'
        },
        {
          prop: 'name',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: true,
          formColumnName: '唯一标识名称',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入唯一标识名称',
              trigger: 'blur'
            }
          ],
          gridColumnName: '唯一标识名称',
          searchName: '唯一标识名称',
          searchType: 'text'
        },
        {
          prop: 'type',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '类型',
          formColumnType: 'p-dict',
          formOptions: [
            { label: 'mysql', value: 'mysql' },
            { label: 'oracle', value: 'oracle', disabled: true }
          ],
          formValidate: [
            {
              required: true,
              message: '请选择类型',
              trigger: 'change'
            }
          ],
          gridColumnName: '类型',
          searchName: '类型',
          searchType: 'text'
        },
        {
          prop: 'driver',
          formShow: false,
          gridShow: false,
          gridShowOriginal: false,
          searchShow: false,
          formColumnName: '驱动',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入驱动',
              trigger: 'blur'
            }
          ],
          gridColumnName: '驱动',
          searchName: '驱动',
          searchType: 'text'
        },
        {
          prop: 'host',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '主机名',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入主机名',
              trigger: 'blur'
            }
          ],
          gridColumnName: '主机名',
          searchName: '主机名',
          searchType: 'text'
        },
        {
          prop: 'port',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '端口',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入端口',
              trigger: 'blur'
            }
          ],
          gridColumnName: '端口',
          searchName: '端口',
          searchType: 'text'
        },
        {
          prop: 'databaseName',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '数据库名称',
          formColumnType: 'text',
          gridColumnName: '数据库名称',
          searchName: '数据库名称',
          searchType: 'text'
        },
        {
          prop: 'url',
          formShow: false,
          gridShow: false,
          gridShowOriginal: false,
          searchShow: false,
          formColumnName: '拼接url',
          formColumnType: 'text',
          gridColumnName: '拼接url',
          searchName: '拼接url',
          searchType: 'text'
        },
        {
          prop: 'username',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '用户名',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            }
          ],
          gridColumnName: '用户名',
          searchName: '用户名',
          searchType: 'text'
        },
        {
          prop: 'password',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '密码',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            }
          ],
          gridColumnName: '密码',
          searchName: '密码',
          searchType: 'text'
        },
        {
          prop: 'datasourceParams',
          formShow: true,
          gridShow: false,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '连接参数',
          formColumnType: 'textarea',
          gridColumnName: '连接参数',
          searchName: '连接参数',
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
      this.$api.datasource.list({
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
