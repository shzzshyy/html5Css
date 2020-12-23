<template>
  <d2-container type="full">
    <page-header
      slot="header"
      @handleSearch="handleSearch"
      @handleAddDialogOpen="handleAddDialogOpen"
      @handleDelBatch="handleDelBatch"
      @handleExportExcel="handleExportExcel"
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
import Vue from 'vue'
import pluginExport from '@d2-projects/vue-table-export'
Vue.use(pluginExport)
import { mapState } from 'vuex'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'base-restaurants',
  components: {
    PageHeader: () => import('./PageHeader'),
    PageMain: () => import('./PageMain'),
    PageFooter: () => import('./PageFooter')
  },
  data () {
    return {
      bizConfig: {
        bizName: '餐厅'
      },
      dictConfig: {},
      columns: [
        {
          label: '餐厅名称',
          formColumnName: '餐厅名称',
          gridColumnName: '餐厅名称',
          searchName: '餐厅名称',
          prop: 'restaurantName',
          limit: '40',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: true,
          formColumnType: 'text-limit',
          formDetailType: 'text-limit',
          formValidate: [
            { required: true, message: '请输入餐厅名称', trigger: 'change' }
          ],
          searchType: 'text'
        },
        {
          formColumnName: '餐厅图片',
          prop: 'ipcId',
          gridShow: false,
          gridShowOriginal: false,
          formShow: true,
          searchShow: false,
          formColumnType: 'img-upload',
          formDetailType: 'img-preview',
          urls: [
            'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
            'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
          ],
          formValidate: [
            { required: false, message: '请上传餐厅图片', trigger: 'change' }
          ]
        },
        {
          label: '地区',
          gridColumnName: '地区',
          prop: 'region',
          gridShow: true,
          gridShowOriginal: true,
          formShow: false,
          searchShow: false
        },
        {
          label: '菜系',
          formColumnName: '经营菜系',
          gridColumnName: '菜系',
          prop: 'cuisine',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: false,
          formColumnType: 'dict',
          dict: 'dict',
          formDictType: 'managingCuisine',
          formDetailType: 'text',
          formOptions: [
          ],
          formValidate: [
            { required: true, message: '请选择菜系', trigger: 'change' }
          ]
        },
        {
          label: '人均',
          formColumnName: '人均',
          gridColumnName: '人均',
          prop: 'perCapita',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: false,
          formColumnType: 'text-append',
          formDetailType: 'text',
          formValidate: [
            { required: true, message: '请输入人均', trigger: 'change' }
          ]
        },
        {
          label: '商家标签',
          formColumnName: '推荐亮点',
          gridColumnName: '商家标签',
          searchName: '餐厅标签',
          prop: 'services',
          formProp: "servicesArr",
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: true,
          formColumnType: 'checkbox',
          formDetailType: 'textarea',
          dict: 'dict',
          formDictType: 'managingServices',
          formOptions: [
          ],
          formValidate: [
            { required: false, message: '请选择推荐亮点', trigger: 'change' }
          ]
        },
        {
          label: '推荐人',
          formColumnName: '推荐官',
          gridColumnName: '推荐人',
          searchName: '推荐官',
          prop: 'name',
          formProp: 'recommender',
          gridShow: true,
          gridShowOriginal: true,
          formShow: true,
          searchShow: true,
          formColumnType: 'n-dict',
          dict: 'user',
          formDictType: 'managingUser',
          formDetailType: 'text',
          formOptions: [
          ],
          formValidate: [
            { required: true, message: '请选择推荐人', trigger: 'change' }
          ]
        },
        {
          formColumnName: '经营时间',
          prop: 'workTime',
          gridShow: false,
          gridShowOriginal: false,
          formShow: true,
          searchShow: false,
          formColumnType: 'text',
          formDetailType: 'text',
          formValidate: [
            { required: true, message: '请输入经营时间', trigger: 'change' }
          ]
        },
        {
          formColumnName: '餐厅地址',
          prop: 'address',
          gridShow: false,
          gridShowOriginal: false,
          formShow: true,
          searchShow: false,
          formColumnType: 'cascader-textarea',
          formDetailType: 'text',
          formValidate: [
            { required: false, message: '请输入餐厅地址', trigger: 'change' }
          ]
        },
        {
          formColumnName: '联系电话',
          prop: 'contact',
          gridShow: false,
          gridShowOriginal: false,
          formShow: true,
          searchShow: false,
          formColumnType: 'text',
          formDetailType: 'text',
          formValidate: [
            { required: true, message: '请输入电话号码', trigger: 'change' },
            { type: 'string', message: '请输入正确的电话号码', trigger: 'change', pattern: /^1\d{10}$/ }
          ]
        },
        {
          label: '探店文',
          gridColumnName: '探店文',
          prop: 'orgName',
          gridShow: true,
          gridShowOriginal: true,
          gridShowType: 'text-link',
          formShow: false,
          searchShow: false
        },
        {
          searchName: '状态',
          prop: 'status',
          gridProp: 'statusName',
          gridShow: false,
          gridShowOriginal: false,
          formShow: false,
          searchShow: true,
          searchType: 'p-dict',
          searchDictType: 'status',
          searchOptions: [
            { label: '全部', value: '' },
            { label: '草稿', value: 'true' },
            { label: '待发布', value: 'false' },
            { label: '下架', value: 'false' }
          ]
        },
        {
          label: '发布时间',
          gridColumnName: '发布时间',
          searchName: '添加时间',
          prop: 'orgName',
          gridShow: true,
          gridShowOriginal: true,
          formShow: false,
          searchShow: true,
          searchType: 'date-range-picker',
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
      //return this.fun[this.currentPath] || {}
      return {
          add: true,
          del: true,
          detail: true,
          excel: true,
          draft: true,
          publish: true,
          undercarriage: true,
          edit: true
      }
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
      this.$api.restaurant.list({
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
        if (column.dict === 'dict') {
          if (column.formDictType && !this.dictConfig[column.formDictType]) {
            //  不重复去后台加载数据
            this.dictConfig[column.formDictType] = []
            this.$api.dictVal.options({ dictCode: column.formDictType })
              .then(res => {
                //  属性拷贝赋值，让子组件渲染
                const addObject = {}
                addObject[column.formDictType] = res
                this.dictConfig = { ...this.dictConfig, ...addObject }
                console.log(this.dictConfig)
              })
              .catch(err => {
                this.$notify({
                  title: '字典加载失败'
                })
                console.log('err', err)
              })
          }
        }
        if (column.dict === 'user') {
          if (column.formDictType && !this.dictConfig[column.formDictType]) {
            //  不重复去后台加载数据
            this.dictConfig[column.formDictType] = []
            this.$api.user.list({})
              .then(res => {
                //  属性拷贝赋值，让子组件渲染
                const addObject = {}
                addObject[column.formDictType] = res.content
                this.dictConfig = { ...this.dictConfig, ...addObject }
                console.log(this.dictConfig)
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
    },
    handleExportExcel () {
        this.$export.excel({
            columns: this.columns,
            data: this.tableData,
            header: '导出 Excel',
            merges: ['A1', 'E1']
        })
        .then(() => {
          this.$message('导出表格成功')
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
