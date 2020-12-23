<template>
  <div class="goods">
    <GoodListItem v-for="(item,index) in goods" :key="index" :goodsItem=item></GoodListItem>
  </div>
</template>

<script>
import GoodListItem from './GoodListItem'

export default {
  name: 'GoodList',
  props: {
    goods: {
      type:Array,
      default() {
        return[]
      }
    }
  },
  components: {
    GoodListItem
  }
}
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>