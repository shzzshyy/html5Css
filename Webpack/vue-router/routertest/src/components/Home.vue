<template>
  <div>
    <h2>我是首页</h2>
    <p>我是首页内容 哈哈哈</p>
    <h2>{{message}}</h2>
    <router-link to="/home/news">新闻</router-link>
    <router-link to="/home/message">消息</router-link>
    <!-- 传值穿对象 -->
    <!-- <router-link to="/profile">档案</router-link> -->
    <router-link :to="{path:'/profile',query:{name:'why',age:'18',height:'188'}}">档案</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data(){
    return {
      message :'哈哈哈'
    }
  },
  name: "Home",
  created(){
    console.log('create');
  },
  mounted(){
    //全部挂在之后
    console.log('全部挂在之后Mounted');
  },
  updated(){
    console.log('界面更新的时候');
  }
}
</script>

<style>

</style>