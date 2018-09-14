<template>
  <div id="app">
    <home v-if="needLogin"/>
    <router-view v-if="!needLogin"/>
  </div>
</template>

<script>
import Home from '@/components/Home'

export default {
  name: 'App',
  components: {
    Home
  },
  computed: {
    needLogin: function () {
      for(var i=0;i<this.noNeedLoginArray.length;i++){
        if(this.$route.path == this.noNeedLoginArray[i]){
          return false;
        }
      }
      return true;
    }
  },
  data () {
    return {
      noNeedLoginArray: ["/login","/register"]
    }
  },
  mounted: function () {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
