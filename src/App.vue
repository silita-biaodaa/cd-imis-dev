<template>
  <div id="app" class="app-bg">
    <router-view v-if="isRouterAlive">

    </router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  provide () {
    return{
      reload:this.reload
    };
  },
  data () {
    return {
      isRouterAlive:true
    };
  },
  methods: {
     reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
          this.isRouterAlive = true
       })
    },
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
