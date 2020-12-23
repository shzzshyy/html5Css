<template>
<div class="wrapper">
 <ul class="content">
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分qweqw类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表qweqw1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1qweqwe</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表3</li>
    <li>分类列qweqwe表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表2</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表qweqweeq1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列qweqwe表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列qweqweq表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列qweqwe表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列qweqwe表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列qweqwe表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列qweqwe表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    <li>分类列表1</li>
    
  </ul>
</div>
 
</template>

<script>
import BSCroll, { PullUpLoad } from 'better-scroll'
import BetterScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BetterScroll.use(Pullup)
export default {
  data() {
    return {
      scroll: null
    }
  },
  name: 'Profile',
  created() {
  },
  mounted() {
    this.scroll =   new BSCroll('.wrapper',{
      probeType: 3 ,
      pullUpLoad: true
    }),
    this.scroll.on('scroll',(opiton) => {
       console.log(opiton)
    })
    this.scroll.on('pullingUp',() => {
      console.log('上拉加载更多')
    })
  }
}
</script>

<style scoped>

.wrapper {
  height: 400px;
  background-color: bisque;
  overflow: hidden;
}

</style>