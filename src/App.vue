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
    // localStorage.removeItem('zeno');
    // localStorage.removeItem('Authorization');
    // if(localStorage.getItem('cardPushData')){
    //   let data=localStorage.getItem('cardPushData');
    //   data=JSON.parse(data);
    //   if(data.bookss.length>0){
    //     for(let x of data.bookss){
    //       x.num=0
    //     }
    //     localStorage.setItem('cardPushData',JSON.stringify(data));
    //   }
    // }
  }
}
</script>

<style>
@import "css/public.css";
</style>
