<template>
    <div>
        <page-search v-show="searchPageShow"
                @handleSearch="handleSearch"
                :columns="columns"
                :dictConfig="dictConfig"
                :auth="auth"
        ></page-search>
        <page-operation
                @showSearch="showSearch"
                @handleSearch="handleSearch"
                @handleAddDialogOpen="handleAddDialogOpen"
                @handleDelBatch="handleDelBatch"
                :columns="columns"
                :auth="auth">
        </page-operation>
    </div>
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
    }
  }
}
</script>

<style scoped>
</style>
