<template>
  <div id="home">
    <div ref="ooo" class="contai">
      qweqwe
    </div>
    <button @click="sayHeight">按钮</button>
    <!-- <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <Scroll class="content" ref="scroll" :probe-type=3 @scroll='contentScroll' :pull-up-load='true'>
      <homeSwiper :banners='banners'></homeSwiper>
      <RecommendView :recommends='recommends'></RecommendView>
      <FeatureView></FeatureView>
      <TabControl :titles="['流行','新款','精选']" class="tab-control" @tabClick='tabClick'></TabControl>
      <GoodList :goods='showGoods'></GoodList>  
    </Scroll>
    <!-- 组件不能直接监听点击需要加native -->
    <!-- <BackTop @click.native="backClick" v-show="this.isShowBtn"></BackTop> --> 
  </div>
</template>

<script>
import homeSwiper from './childComponents/homeSwiper'
import RecommendView from './childComponents/recommendView'
import FeatureView from './childComponents/featureView'

import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodList from '@/components/content/goods/GoodList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from '@/components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from '@/network/home'

export default {
  name: 'Home',
  data() {
    return {
      banners:[],
      recommends:[],
      goods: {
        'pop': {page:0,list:[]},
        'new': {page:0,list:[]},
        'sell': {page:0,list:[]},
      },
      currentType: 'pop',
      isShowBtn: false
    }
  },
  components:{
    NavBar,
    homeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  created() {
    //1.请求数据
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    /**
     * 事件监听相关
    */
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop';
          break
        case 1: 
          this.currentType = 'new';
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      console.log(123)
    },
    contentScroll(position) {
      console.log(position.y)
      this.isShowBtn = (-position.y)>1000
    },
    sayHeight () {
      let height = this.$refs.ooo.offsetHeight;
      console.log(height);
    },
    /**
     * 网络请求
    */
    getHomeMultidata(){
      getHomeMultidata().then(res => {
       this.banners= res.data.banner.list
       this.recommends= res.data.recommend.list
       })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // 数组添加数据
        this.goods[type].list.push(...res.data.list)
        // 页码加一
        this.goods[type].page += 1
      })
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  destroyed() {
    
  }
}
</script>


<style scoped>
.contai {
  height: 30%;
}
#home {
  padding-top: 44px;
  height: 100vh;
  position: relative;
}

/* scoped 作用域  是在本文件中的标签生效 */
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
  z-index: 9;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
