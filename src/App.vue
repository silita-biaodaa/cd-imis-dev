<template>
  <div id="app" class="app-bg">
    <router-view>

    </router-view>
  </div>
</template>

<script>
  // import { group } from '@/api/index'
export default {

  name: 'app',
  beforeCreate(){
    // if(localStorage.getItem('groupList')){
    //   localStorage.removeItem('groupList');
    // }
    if(localStorage.getItem('userName')){
      localStorage.removeItem('userName');
    }
  },
  created(){
    // this.loading();

  },
  destroyed () {
    localStorage.removeItem('zeno')
  }
}
</script>

<style>
@import "./css/public.css";
</style>
