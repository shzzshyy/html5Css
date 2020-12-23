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
  </d2-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'base-resource',
  components: {
    PageHeader: () => import('./PageHeader'),
    PageMain: () => import('./PageMain')
  },
  data () {
    return {
      bizConfig: {
        bizName: '资源'
      },
      dictConfig: {},
      columns: [
        {
          prop: 'resourceId',
          formShow: false,
          gridShow: false,
          gridShowOriginal: false,
          searchShow: false,
          formColumnName: '资源id',
          formColumnType: 'text',
          gridColumnName: '资源id',
          searchName: '资源id',
          searchType: 'text'
        },
        {
          prop: 'parentName',
          formShow: true,
          gridShow: false,
          gridShowOriginal: false,
          searchShow: false,
          formColumnName: '父级资源',
          formColumnType: 'text',
          formAttr: {
            disabled: true
          },
          gridColumnName: '父级资源',
          searchName: '父级资源',
          searchType: 'text'
        },
        {
          prop: 'resourceName',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: true,
          formColumnName: '资源名称',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入资源名称',
              trigger: 'blur'
            }
          ],
          gridColumnName: '资源名称',
          searchName: '资源名称',
          searchType: 'text'
        },
        {
          prop: 'resourceCode',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '资源编码',
          formColumnType: 'text',
          formValidate: [
            {
              required: true,
              message: '请输入资源编码',
              trigger: 'blur'
            }
          ],
          gridColumnName: '资源编码',
          searchName: '资源编码',
          searchType: 'text'
        },
        {
          prop: 'resourceType',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          gridProp: 'resourceTypeName',
          searchShow: false,
          formColumnName: '资源类型',
          formColumnType: 'radio-group',
          formOptions: [
            {
              label: '目录',
              value: '0'
            },
            {
              label: '链接',
              value: '1'
            },
            {
              label: '功能',
              value: '2'
            }
          ],
          formValidate: [
            {
              required: true,
              message: '请选择资源类型',
              trigger: 'change'
            }
          ],
          gridColumnName: '资源类型',
          searchName: '资源类型',
          searchType: 'text'
        },
        {
          prop: 'resourceUri',
          formShow: true,
          gridShow: true,
          gridShowOriginal: true,
          searchShow: false,
          formColumnName: '资源定位符',
          formColumnType: 'text',
          gridColumnName: '资源定位符',
          searchName: '资源定位符',
          searchType: 'text'
        },
        {
          prop: 'resourceMethod',
          formShow: true,
          gridShow: false,
          gridShowOriginal: false,
          gridProp: 'resourceMethodName',
          searchShow: false,
          formColumnName: '资源方法',
          formColumnType: 'radio-group',
          formOptions: [
            {
              label: 'GET',
              value: '0'
            },
            {
              label: 'POST',
              value: '1'
            },
            {
              label: 'PUT',
              value: '2'
            },
            {
              label: 'DELETE',
              value: '3'
            }
          ],
          gridColumnName: '资源方法',
          searchName: '资源方法',
          searchType: 'text'
        },
        {
          prop: 'parentId',
          formShow: false,
          gridShow: false,
          gridShowOriginal: false,
          searchShow: false,
          formColumnName: '父资源id',
          formColumnType: 'text',
          gridColumnName: '父资源id',
          searchName: '父资源id',
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
    handleSearch (form) {
      this.loading = true
      this.searchForm = form || this.searchForm
      if (form) {
        this.pageInfo.page = 1
      }
      this.$api.resource.list({
        ...this.searchForm,
        ...this.pageInfo
      })
        .then(res => {
          this.loading = false
          this.$notify({
            title: '数据请求完毕'
          })
          this.tableData = res
          // this.pageInfo.total = res.total
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
