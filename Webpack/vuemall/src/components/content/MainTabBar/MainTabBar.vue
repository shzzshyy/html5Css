<template>
  <TabBar>
      <TabBarItem link='/home' activeColor='blue'>
        <img slot="item-icon" src="~@/assets/images/tabbar/home.svg">
        <img slot="item-icon-active" src="~@/assets/images/tabbar/home_active.svg">
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem link='/profile' activeColor='blue'>
        <img slot="item-icon" src="../../../assets/images/tabbar/category.svg">
        <img slot="item-icon-active" src="../../../assets/images/tabbar/category_active.svg">
        <div slot="item-text">分类</div>
      </TabBarItem>
      <TabBarItem link='/purchaseCar' activeColor='blue'>
        <img slot="item-icon" src="../../../assets/images/tabbar/shopcart.svg">
        <img slot="item-icon-active" src="../../../assets/images/tabbar/shopcart_active.svg">
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem link='/setting' activeColor='blue'>
        <img slot="item-icon" src="../../../assets/images/tabbar/profile.svg">
        <img slot="item-icon-active" src="../../../assets/images/tabbar/profile_active.svg">
        <div slot="item-text">我的</div>
      </TabBarItem>
    </TabBar>
</template>

<script>
import TabBar from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'
export default {
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>