<template>
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  name: 'homeSwiper',
  props: {
    banners: {
      type: Array,
      default(){
        return []
      }
    },
  }
}
</script>

<style>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
  }
  .van-swipe-item img {
    width: 100%;
    height: 100%;
  }
</style>