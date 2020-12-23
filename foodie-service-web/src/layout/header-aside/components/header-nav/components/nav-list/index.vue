<template>
  <el-table :data="navList" v-bind="table">
    <el-table-column prop="title" align="center" width="160"/>
    <el-table-column label="预览" width="120">
      <div slot-scope="scope" class="theme-preview" :style="{ backgroundImage: `url(${$baseUrl}${scope.row.preview})` }"/>
    </el-table-column>
    <el-table-column prop="address" align="center">
      <template slot-scope="scope">
        <el-button v-if="asideOnly === scope.row.name" type="success" icon="el-icon-check" round>已激活</el-button>
        <el-button v-else round @click="handleSelectNav(scope.row.name)">使用</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'nav-list',
  data () {
    return {
      table: {
        showHeader: false,
        border: true
      }
    }
  },
  computed: {
    ...mapState('d2admin/menu', [
      'navList',
      'asideOnly'
    ])
  },
  methods: {
    ...mapActions('d2admin/menu', [
      'setNav'
    ]),
    handleSelectNav (name) {
      this.setNav(name)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme-preview {
  height: 50px;
  width: 100px;
  border-radius: 4px;
  background-size: cover;
  border: 1px solid $color-border-1;
}
</style>
