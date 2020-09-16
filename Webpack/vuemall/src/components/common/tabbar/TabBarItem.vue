<template>
    <div class="tab-bar-item" @click="itemClick">
      <slot v-if="isActive" name="item-icon"></slot>
      <slot v-else name="item-icon-active"></slot>
      <div :style="activeStyle"> <slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  methods: {
    itemClick() {
      this.$router.replace(this.link)
    }
  },
  props: {
    link: {
      type: String
    },
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    isActive() {
      // indexof 在route.path里面找this.path 找到了就不等于-1 
      return this.$route.path.indexOf(this.link) !== -1;
    },
    activeStyle() {
      return this.isActive? {color: this.activeColor}:{}
    }
  }
}
</script>

<style>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;

}

.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  margin-bottom: 2px;
  vertical-align: middle;
  /* 去掉图片默认3像素 */
}

</style>