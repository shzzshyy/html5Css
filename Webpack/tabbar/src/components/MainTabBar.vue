<template>
  <TabBar>
      <TabBarItem link='/home' activeColor='blue'>
        <img slot="item-icon" src="../assets/tabbar/images/home.png">
        <img slot="item-icon-active" src="../assets/tabbar/images/home-1.png">
        <div slot="item-text">首页</div>
      </TabBarItem>
      <TabBarItem link='/profile' activeColor='blue'>
        <img slot="item-icon" src="../assets/tabbar/images/message.png">
        <img slot="item-icon-active" src="../assets/tabbar/images/profile-1.png">
        <div slot="item-text">消息</div>
      </TabBarItem>
      <TabBarItem link='/purchaseCar' activeColor='blue'>
        <img slot="item-icon" src="../assets/tabbar/images/purchaseCar.png">
        <img slot="item-icon-active" src="../assets/tabbar/images/purchaseCar-1.png">
        <div slot="item-text">购物车</div>
      </TabBarItem>
      <TabBarItem link='/setting' activeColor='blue'>
        <img slot="item-icon" src="../assets/tabbar/images/setting.png">
        <img slot="item-icon-active" src="../assets/tabbar/images/setting-1.png">
        <div slot="item-text">设置</div>
      </TabBarItem>
    </TabBar>
</template>

<script>
import TabBar from './tabbar/TabBar'
import TabBarItem from './tabbar/TabBarItem'
export default {
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>