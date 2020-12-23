<template>
  <div class="detail">
    <DetailNavBar></DetailNavBar>
    <DetaiSWiper :topImages=this.topImages class="detai-swiper"></DetaiSWiper>
    <DetailBaseInfo></DetailBaseInfo>
  </div>
 
</template>

<script>
import DetailNavBar from '@/views/detail/childComponents/DetailNavBar'
import { getDetail, Goods, Shop } from '@/network/detail'
import DetaiSWiper from './childComponents/DetailSwiper'
import DetailBaseInfo from './childComponents/DetailBaseInfo'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages:[],
      goods:{},
      shop: {}

    }
  },
  created() {
    this.iid = this.$route.params.iid,
    getDetail(this.iid).then(res => {
      const data = res.result
      // 顶部轮播图
      this.topImages = res.result.itemInfo.topImages
      // 获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 店铺信息
      this.shop = new Shop(data.shopInfo)
      console.log(this.goods,this.shop)
      // 判断对象不为空
      // Object.keys(this.goods).length !== 0
    })
  },
  components: {
    DetailNavBar,
    DetaiSWiper,
    DetailBaseInfo
  }
 
}
</script>

<style>
.detai-swiper {

}
</style>