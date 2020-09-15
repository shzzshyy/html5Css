<template>
  <div>
    <h2 @click="hClick">{{$store.state.counter}}</h2>
    <router-view></router-view>
    <MainTabBar></MainTabBar>
    <!-- 请求 -->
  </div>
</template>

<script>
import MainTabBar from './components/MainTabBar'
import request from './network/request'
export default {
  name:'App',
  components:{
      MainTabBar
  },
  methods: {
    hClick() {
      this.$store.commit('increatement')
    }
  }
}
</script>

<style>

</style>
