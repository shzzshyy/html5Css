<template>
  <el-tag :type="type" >{{ text }}</el-tag>
</template>

<script>
export default {
  name: 'admin-status-tag',
  props: {
    value: {
      type: Boolean,
      require: true
    },
    text: {
      type: String
    }
  },
  computed: {
    type () {
      return this.value ? 'success' : 'danger'
    }
  },
  data () {
    return {
    }
  },
  methods: {

  },
  mounted () {
  }
}
</script>
<style scoped>
</style>
