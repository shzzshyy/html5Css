<template>
  <div id="app">
    <keep-alive exclude="Detail">
       <router-view/>
    </keep-alive>
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
