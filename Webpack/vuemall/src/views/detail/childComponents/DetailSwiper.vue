<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in topImages" :key="index">
        <a>
          <img :src="item">
        </a>
      </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'DetailSwiper',
  props: {
    topImages:Array,
    default() {
      return []
    }
  }
}
</script>

<style>

.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    height: 300px;
  }
  .van-swipe-item img {
    width: 100%;
    height: 100%;
  }

</style>