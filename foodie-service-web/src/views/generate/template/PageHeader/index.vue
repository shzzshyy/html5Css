<template>
    <el-container>
        <el-header v-show="searchPageShow">
            <page-search
                    @handleSearch="handleSearch"
                    :columns="columns"
                    :dictConfig="dictConfig"
            ></page-search>
        </el-header>
        <el-main>
            <page-operation
                    @showSearch="showSearch"
                    @handleAddDialogOpen="handleAddDialogOpen"
                    @handleDelBatch="handleDelBatch"
                    :columns="columns">
            </page-operation>
        </el-main>
    </el-container>
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

<style scoped>
  .el-main {
    padding: 0 20px;
  }
</style>
