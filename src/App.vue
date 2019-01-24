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
    
  },
  created(){
    // this.loading();

  },
  destroyed () {
    localStorage.removeItem('zeno');
    localStorage.removeItem('Authorization');
  }
}
</script>

<style>
@import "./css/public.css";
</style>
