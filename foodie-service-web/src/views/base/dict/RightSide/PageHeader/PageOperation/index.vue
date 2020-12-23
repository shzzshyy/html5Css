<template>
    <el-row>
        <el-col :span="12">
            <el-button type="primary" icon="el-icon-folder-add" @click="handleAddDialogOpen" v-if="auth['dictVal-add']">新增</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDelBatch" v-if="auth['dictVal-del']">删除</el-button>
            &nbsp;
        </el-col>
        <el-col :span="12" style="text-align: right;">
            <el-button type="" @click="showSearch" disabled><d2-icon name="search"/></el-button>
            <admin-drop-column :columns="columns"></admin-drop-column>
        </el-col>
    </el-row>
</template>

<script>
export default {
  props: {
    columns: {
      default: () => []
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
    handleAddDialogOpen () {
      this.$emit('handleAddDialogOpen')
    },
    handleDelBatch () {
      this.$emit('handleDelBatch')
    },
    handleColumnShowChange (item) {
      item.gridShow = !item.gridShow
    },
    checkedChange ($event, val) {
      // 若不是checkbox则直接返回
      if ($event.target.checked === undefined) {
        return
      }
      this.handleColumnShowChange(val)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
