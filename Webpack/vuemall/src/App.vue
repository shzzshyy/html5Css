<template>
  <div id="app">
    <router-view/>
    <mainTabbar/>
  </div>
</template>

<script>

import mainTabbar from '../src/components/content/MainTabBar/MainTabBar'

export default {
  name: 'app',
  components: {
     mainTabbar,
  }
}
</script>

<style>

@import "./assets/css/base.css"

</style>
