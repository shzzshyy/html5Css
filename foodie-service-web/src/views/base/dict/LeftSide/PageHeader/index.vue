<template>
    <div>
        <page-search v-show="searchPageShow"
                     :columns="columns"
                     :auth="auth"
                     @handleSearch="handleSearch">
        </page-search>
        <page-operation
                @showSearch="showSearch"
                @handleAddDialogOpen="handleAddDialogOpen"
                @handleSearch="handleSearch"
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
</style>
