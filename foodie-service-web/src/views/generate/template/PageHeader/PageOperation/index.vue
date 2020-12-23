<template>
    <el-row>
        <el-col :span="18">
            <div class="grid-content bg-purple">
                <el-button type="primary" icon="el-icon-folder-add" @click="handleAddDialogOpen">新增</el-button>
                <el-button type="danger" icon="el-icon-delete" @click="handleDelBatch">删除</el-button>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="grid-content bg-purple-light" style="text-align: right;">
                <el-button type="" @click="showSearch" disabled><d2-icon name="search"/></el-button>
                <el-dropdown trigger="click" :hide-on-click="false" placement="bottom" @command="handleColumnShowChange">
                    <el-button type="" icon="el-icon-s-grid">
                    </el-button>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item v-for="(item, index) in columns"
                                          :key="index"
                                          :prop="item.prop"
                                          :label="item.gridColumnName"
                                          :command="item"
                        >
                            <el-checkbox v-model="item.gridShow" @click.native.prevent="checkedChange($event, item)">{{item.gridColumnName}}</el-checkbox>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
  props: {
    columns: {
      default: []
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
