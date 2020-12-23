<template>
    <el-row>
        <el-col :span="18">
            <div class="grid-content bg-purple">
                <!--<el-button type="primary" icon="el-icon-folder-add" @click="handleAddDialogOpen" v-if="auth.add">新增</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="handleDelBatch" v-if="auth.del">删除</el-button>-->
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light" style="text-align: right;">
                <el-button type="" @click="showSearch" title="搜索"><d2-icon name="search"/></el-button>
                <el-button type="" @click="handleRefresh" title="刷新"><d2-icon name="refresh"/></el-button>
                <admin-drop-column :columns="columns"></admin-drop-column>
            </div>
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
    .el-row {
        margin-bottom: 0px;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
    }
    .grid-content {
        border-radius: 4px;
        height: 50px;
        line-height: 50px;
    }
    .row-bg {
        padding: 5px 0;
        background-color: #f9fafc;
    }
    .el-button+.el-dropdown {
        margin-left: 10px;
    }
</style>
