<template>
    <d2-container type="full">
      <SplitPane :min-percent='40' :default-percent='50' split="vertical">
        <template slot="paneL">
          <left-side ref="left" @handleLoadDictVal="handleLoadDictVal" :auth="auth"/>
        </template>
        <template slot="paneR">
          <right-side ref="right" :dictRow="dictRow" :auth="auth"/>
        </template>
      </SplitPane>
    </d2-container>
</template>

<script>
import SplitPane from 'vue-splitpane'
import { mapState } from 'vuex'
export default {
  // name 值和本页的 $route.name 一致才可以缓存页面
  name: 'base-dict',
  components: {
    LeftSide: () => import('./LeftSide/index'),
    RightSide: () => import('./RightSide/index'),
    SplitPane: SplitPane
  },
  data () {
    return {
      dictRow: {
      }
    }
  },
  computed: {
    ...mapState('d2admin/menu', [
      'currentPath',
      'fun'
    ]),
    auth () {
      return this.fun[this.currentPath] || {}
    }
  },
  methods: {
    handleLoadConfig (datasourceId) {
      this.$refs.right.handleSearch({ datasourceId: datasourceId })
    },
    handleLoadDictVal (dictRow) {
      this.dictRow = dictRow
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
</style>
