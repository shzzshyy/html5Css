<template>
    <el-row>
        <el-col :span="18">
            <page-search
                         @handleSearch="handleSearch"
                         :columns="columns"
                         :dictConfig="dictConfig"
                         :auth="auth"
            ></page-search>
        </el-col>
        <el-col :span="6">
            <page-operation
                @handleSearch="handleSearch"
                @showSearch="showSearch"
                @handleAddDialogOpen="handleAddDialogOpen"
                @handleDelBatch="handleDelBatch"
                :columns="columns"
                :auth="auth">
            </page-operation>
        </el-col>

    </el-row>
    <!--<el-container>
        <el-header v-show="searchPageShow">
            <page-search
                    @handleSearch="handleSearch"
                    :columns="columns"
                    :dictConfig="dictConfig"
                    :auth="auth"
            ></page-search>
        </el-header>
        <el-main>
            <page-operation
                    @handleSearch="handleSearch"
                    @showSearch="showSearch"
                    @handleAddDialogOpen="handleAddDialogOpen"
                    @handleDelBatch="handleDelBatch"
                    :columns="columns"
                    :auth="auth">
            </page-operation>
        </el-main>
    </el-container>-->
</template>

<script>
export default {
  components: {
    PageOperation: () => import('./PageOperation/index'),
    PageSearch: () => import('./PageSearch/index')
  },
  props: {
    columns: {
      default: []
    },
    dictConfig: {
      type: Object
    },
    auth: {
    }
  },
  data () {
    return {
      searchPageShow: false
    }
  },
  methods: {
    handleSearch (form) {
      this.$emit('handleSearch', form)
    },
    handleFormReset () {
      this.$refs.form.resetFields()
    },
    showSearch () {
      this.searchPageShow = !this.searchPageShow
    },
    handleAddDialogOpen () {
      this.$emit('handleAddDialogOpen')
    },
    handleDelBatch () {
      this.$emit('handleDelBatch')
    }
  }
}
</script>
