<template>
    <div>
        <page-search v-show="searchPageShow"
                @handleSearch="handleSearch" :columns="columns" :auth="auth"></page-search>
        <page-operation
                @showSearch="showSearch"
                @handleAddDialogOpen="handleAddDialogOpen"
                @handleDelBatch="handleDelBatch"
                :columns="columns"
                :auth="auth">
        </page-operation>
    </div>
</template>

<script>
import PageOperation from './PageOperation/index'
import PageSearch from './PageSearch/index'
export default {
  components: {
    PageOperation,
    PageSearch
  },
  props: {
    columns: {
      default: () => []
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

<style scoped>
  .el-header {
    height: 50px!important;
    margin-bottom: 10px;
  }
  .el-main {
    padding: 0 20px;
  }
</style>
