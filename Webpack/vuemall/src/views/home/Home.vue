<template>
  <div id="home">
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>

    <homeSwiper :banners='banners'></homeSwiper>
    <RecommendView :recommends='recommends'></RecommendView>
    <FeatureView></FeatureView>
    <TabControl :titles="['流行','新款','精选']" class="tab-control"></TabControl>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>

<script>
import homeSwiper from './childComponents/homeSwiper'
import RecommendView from './childComponents/recommendView'
import FeatureView from './childComponents/featureView'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'

import {getHomeMultidata,getHomeGoods} from '@/network/home'

export default {
  name: 'Home',
  data() {
    return {
      banners:[],
      recommends:[],
      goods: {
        'pop': {page:0,list:[]},
        'news': {page:0,list:[]},
        'sell': {page:0,list:[]},
        

      }
    }
  },
  components:{
    NavBar,
    homeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  created() {
    //1.请求数据
    getHomeMultidata().then(res => {
      console.log(res)
      this.banners= res.data.banner.list
      this.recommends= res.data.recommend.list
    })

    getHomeGoods('pop','1').then(res => {
        console.log(res)
    })
  }
}
</script>

<style>
.nav-bar {
  background-color:var(--color-tint) ;
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
}

</style>