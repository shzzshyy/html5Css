<template>
    <el-dropdown trigger="click" :hide-on-click="false" placement="bottom" @command="handleColumnShowChange" title="列操作">
        <el-button type="" icon="el-icon-s-grid">
        </el-button>
        <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item v-for="(item, index) in activeColumns"
                              :key="index"
                              :prop="item.prop"
                              :label="item.gridColumnName"
                              :command="item"
            >
                <el-checkbox v-model="item.gridShow" @click.native.prevent="checkedChange($event, item)">{{item.gridColumnName}}</el-checkbox>
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>
<script>
export default {
  name: 'admin-drop-column',
  props: {
    columns: {
      type: Array,
      require: true
    }
  },
  data () {
    return {}
  },
  methods: {
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
  },
  mounted () {

  },
  computed: {
    activeColumns: {
      get: function () {
        return this.columns.filter((column) => {
          return column.gridShowOriginal
        })
      },
      set: function (value) {
        this.activeColumns = value
      }
    }
  }
}
</script>
<style lang="scss" scoped>
    .el-button + .el-dropdown {
        margin-left: 10px;
    }
</style>
