<template>
  <div id="app">
    <!-- <router-link to="/home" tag="button">首页</router-link>
    <router-link to="/about">关于</router-link>
    <router-view></router-view>
      <button @click="btnClick">首页也</button>
        <button @click="btn1Click">关于与</button> -->
        <router-link to="/home">首页</router-link>
        <router-link to="/about">关于</router-link>
        <router-link :to="'/user/' + this.userid" >用户</router-link>
        <keep-alive>
           <router-view></router-view>
        </keep-alive>
       
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      userid: 'ooo',
    }
  },
  methods: {
    btnClick() {
      this.$router.push('/home');
    },
    btn1Click() {
      this.$router.replace('/about');
    }
  },
  computed: {
    userId() {
      return this.$route.params.userid
    }
  }
}
</script>

<style>

</style>
