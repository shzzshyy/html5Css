<template>
  <el-pagination
    :current-page="page"
    :page-size="size"
    :total="total"
    :page-sizes="[10, 20, 30, 40, 50]"
    layout="total, sizes, prev, pager, next, jumper"
    style="margin: -10px;"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange">
  </el-pagination>
</template>

<script>
export default {
  props: {
    page: {
      default: 0
    },
    size: {
      default: 0
    },
    total: {
      default: 0
    }
  },
  methods: {
    handleSizeChange (val) {
      this.$emit('change', {
        page: this.page,
        size: val,
        total: this.total
      })
    },
    handleCurrentChange (val) {
      this.$emit('change', {
        page: val,
        size: this.size,
        total: this.total
      })
    }
  }
}
</script>
