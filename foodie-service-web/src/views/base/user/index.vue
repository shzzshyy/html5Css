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
  name: 'base-user',
  components: {
    PageHeader: () => import('./PageHeader'),
    PageMain: () => import('./PageMain'),
    PageFooter: () => import('./PageFooter')
  },
  data () {
    return {
      bizConfig: {
        bizName: '用户'
      },
      dictConfig: {},
      columns: [
        {
          formColumnName: '登录名称',
          gridColumnName: '登录名称',
          searchName: '登录名称',
          prop: 'userName',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: false,
          formColumnType: 'text',
          formAttr: {
            disabled: false
          },
          formValidate: [
            { required: true, message: '请输入登录名称', trigger: 'blur' }
          ]
        },
        {
          formColumnName: '用户姓名',
          gridColumnName: '用户姓名',
          searchName: '用户姓名',
          prop: 'name',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          formColumnType: 'text',
          searchShow: true,
          formValidate: [
            { required: true, message: '请输入用户名称', trigger: 'change' }
          ],
          searchType: 'text'
        },
        {
          formColumnName: '邮箱',
          gridColumnName: '邮箱',
          searchName: '邮箱',
          prop: 'email',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: false,
          formValidate: [
            { type: 'email', message: '请输入正确的邮箱格式', trigger: 'change' }
          ]
        },
        {
          formColumnName: '手机',
          gridColumnName: '手机',
          searchName: '手机',
          prop: 'telephone',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: false,
          formValidate: [
            { type: 'string', message: '请输入正确的手机号码', trigger: 'change', pattern: /^1\d{10}$/ }
          ]
        },
        {
          formColumnName: '所属机构',
          gridColumnName: '所属机构',
          searchName: '所属机构',
          prop: 'orgName',
          gridShow: true,
          gridShowOriginal: true,
          formShow: false,
          searchShow: false
        },
        {
          formColumnName: '是否启用',
          gridColumnName: '状态',
          searchName: '状态',
          prop: 'status',
          gridProp: 'statusName',
          gridShow: true,
          gridShowOriginal: true,
          gridShowType: 'status-tag',
          formShow: true,
          searchShow: true,
          formColumnType: 'switch',
          formDictType: 'status',
          formValidate: [
          ],
          searchType: 'p-dict',
          searchDictType: 'status',
          searchOptions: [
            { label: '全部', value: '' },
            { label: '启用', value: 'true' },
            { label: '停用', value: 'false' }
          ]
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
      this.$api.user.list({
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
            this.tableData = res.content
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
