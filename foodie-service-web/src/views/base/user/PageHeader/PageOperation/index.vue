<template>
    <el-row>
        <el-col :span="12">
            <el-button type="primary" icon="el-icon-folder-add" @click="handleAddDialogOpen" v-if="auth.add">新增</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDelBatch" v-if="auth.del">删除</el-button>
        </el-col>
        <el-col :span="12" style="text-align: right;">
                <el-button type="" @click="showSearch" title="搜索"><d2-icon name="search"/></el-button>
                <el-button type="" @click="handleRefresh" title="刷新"><d2-icon name="refresh"/></el-button>
                <admin-drop-column :columns="columns"></admin-drop-column>
        </el-col>
    </el-row>
</template>

<script>
export default {
  props: {
    columns: {
      default: []
    },
    auth: {
    }
  },
  data () {
    return {
    }
  },
  methods: {
    showSearch () {
      this.$emit('showSearch')
    },
    handleRefresh () {
      this.$emit('handleSearch')
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
<style lang="scss" scoped>
</style>
