<template>
    <div>
        <page-search v-show="searchPageShow"
                @handleSearch="handleSearch"
                :columns="columns"
                :dictConfig="dictConfig"
                :auth="auth"
        ></page-search>
        <page-operation
                @handleSearch="handleSearch"
                @showSearch="showSearch"
                @handleAddDialogOpen="handleAddDialogOpen"
                @handleDelBatch="handleDelBatch"
                @handleExportExcel="handleExportExcel"
                :columns="columns"
                :auth="auth">
        </page-operation>
    </div>
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
    showSearch () {
      this.searchPageShow = !this.searchPageShow
    },
    handleAddDialogOpen () {
      this.$emit('handleAddDialogOpen')
    },
    handleDelBatch () {
      this.$emit('handleDelBatch')
    },
    handleExportExcel () {
      this.$emit('handleExportExcel')
    }
  }
}
</script>

<style scoped>
</style>
