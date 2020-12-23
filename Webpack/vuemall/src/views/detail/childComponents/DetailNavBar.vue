<template>
  <div>
    <NavBar>
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/images/common/back.svg">
      </div>
       <div slot="center" class="title">
         <div v-for="(item,index) in titles" 
           :key="index" 
           class="item-title" 
           :class="{active: index=== currentIndex}" 
           @click='titleClick(index)'>{{item}}
          </div>
       </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
  name: 'DetailNavBar',
  data() {
    return {
      titles: ['商品','参数','评论','推荐'],
      currentIndex: 0
    }
  },
   components: {
    NavBar
  },
  methods: {
    titleClick(index) {
       this.currentIndex = index
    },
    backClick() {
      // 返回
      this.$router.go(-1)
      // this.$router.back()
    }
  }
}
</script>

<style scoped>
 .title {
   display: flex;
   font-size: 14px;
 }
 .item-title {
    flex: 1;
 }
 .active {
   color: blue;
 }
 .back img{
   margin-top: 10px;
 }
</style>