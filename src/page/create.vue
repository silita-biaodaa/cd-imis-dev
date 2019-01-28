<template>
   <div class="create">
      <v-head :head-txt="headName"></v-head>
      <div class="create-put ">

        <div class="l-put"  >
              <div class="label">群名</div> <input type="text" placeholder="请输入群名" v-model='crowd'  >
        </div>
      </div>
      <div class="c-center">
         <button class="create-btn" @click="joinG" >创&nbsp&nbsp建</button>
      </div>


      <div class="toast" v-show="show">
          请先输入群名
      </div>
      <div class="toast" v-show="mask">
          群名已存在
      </div>
      <div class="toast" v-show="busy">
          网络繁忙，请稍后尝试
      </div>
   </div>
</template>
<script>
import { CreatG } from '@/api/index'
import { setTimeout } from 'timers';
export default {
  data () {
    return {
      crowd: '',
      headName:'创建群组',
      show:false,
      mask:false,
      busy:false
    }
  },
  methods: {
    joinG() {
        if(!this.crowd.trim()) {
             this.show = true
           return setTimeout(() => {
              this.show = false
            }, 1500);
        } else {
             CreatG({groName:this.crowd.trim()}).then( res => {
                if(res.code == 1) {
                   return   this.$router.push({path: '/nav/group'})
                } else if (res.code == 403 ) {
                   this.mask = true
                   return setTimeout(() => {
                         this.mask = false
                       }, 1500);
                } else {
                    this.busy = true
                   return setTimeout(() => {
                         this.busy = false
                       }, 1500);
                }
              })
        }  
    }
  },
  components: {
  }
}
</script>
<style lang="less" >
.create {
  background: #f5f5f5;
  position: relative;
  height:100%;
    .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    background: #000;
    padding: 20px;
    font-size: 26px;
    border-radius: 10px;
    transform: translateX(-50%);
    color:#fff;
  }
}
  .create-put {
    margin-top: 16px;
  }
  .van-cell {
    padding: 10 36px;
    line-height: 96px;
    font-size: 32px;
    font-weight: 500;
  }
  .van-field .van-cell__title {
    max-width: 150px;
  }
  .create-btn {
    height: 96px;
    width: 678px;
    border-radius: 12px;
    margin: 0;
    padding: 0;
    border: 1PX solid transparent;
    outline: none;
    background: #E62129;
  }
  .c-center {
    display: flex;
    justify-content: center;
    margin-top: 210px;
    font-size: 36px;
    color:#fff;
  }
.l-put {
  height: 96px;
  font-size: 36px;
  display: flex;
  justify-content: flex-start;
  background: #fff;
  align-items: center;
  .label {
    width: 250px;
    padding-left: 36px;
    color:#000;
  }
  input {
     width: 100%;
     text-align: left;
     background:none;
     outline:none;
     border:0px;
     caret-color:blue;
     padding: 20px 0px;
     padding-right: 20px;
  }
 
}
</style>
