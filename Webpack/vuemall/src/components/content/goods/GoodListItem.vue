<template>
  <div class="goods-item" @click="itemClick">
    <img :src="goodsItem.show.img">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodListItem',
  props: {
    goodsItem:Object
  },
  methods: {
    itemClick() {
      // 两种带参数的方式 
      // 1.动态路由
      this.$router.push('/detail/' + this.goodsItem.iid)
      // 2. query
      // this.$router.push({
      //   path:'/path',
      //   query: {

      //   }
      // })
    }
  }
}
</script>

<style>

.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  position: absolute;
  font-size: 12px;
  left: 0;
  right: 0;
  bottom: 5px;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  /* 显示... */
  text-overflow: ellipsis;
  /* 不换行 */
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url(~@/assets/images/common/collect.svg) 0 0/14px 14px;
}
</style>