<template>
  <div class="warpper" ref="wappp">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSCroll, { PullUpLoad } from 'better-scroll'
import BetterScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

BetterScroll.use(Pullup)

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: true
    }
  },
  methods: {
   
  },
  mounted() {

    this.scroll =   new BSCroll(this.$refs.wappp,{
      probeType: this.probeType ,
      pullUpLoad: this.pullUpLoad,
      click: true,
    }),
    this.scroll.on('scroll',(opiton) => {
      console.log(opiton.y)
       this.$emit('scroll',opiton)
    })
     this.scroll.on('pullingUp',() => {
      console.log('上拉加载更多')
    })
   
  }
}
</script>

<style>

</style>