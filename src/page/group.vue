<template>

  <div class="group">
      <router-link :to="{path:'/notice'}" class="fold"  tag="div">
        <span>群通知({{this.informs}})</span>
        <i class=" iconfont icon-jiantouyou g-size"></i>
      </router-link>

       <router-link :to="{path:'/create'}" class="fold"  tag="div">
        <span>创建打卡群</span>
        <i class=" iconfont icon-jiantouyou g-size"></i>
      </router-link>

       <router-link :to="{path:'/apply'}" class="fold"  tag="div">
        <span>查找打卡群</span>
        <i class=" iconfont icon-jiantouyou g-size"></i>
      </router-link>

      <div class="ma10">
       <div  class="fold none" @click="show(0)"  >
        <span>我创建的群{{this.createstle}}</span>
        <i :class=" this.folds[0].showContent ? 'iconfont icon-jiantoushang g-size' : ' iconfont icon-jiantouxia g-size'"></i>
       </div>
         <div class="group-p" v-show="this.folds[0].showContent" >
          <div class="group-list ld-left g-h" v-for="(e,i) in creates" :key='i' @click="jump(i,true)">
            <div class="group-img">
              <img :src="e.imgUrl" alt="">
            </div>
            <div class="group-name">
              <p >{{e.groName}}</p>
              <p class="member">
                <img src="../assets/img/person (1).png" alt="">{{e.name}}
              </p>
            </div>
          </div>
         </div>
      </div>


      <div>
       <div  class="fold none" @click="show(1)"  >
        <span>我加入的群{{this.jointle}}</span>
        <i :class=" this.folds[1].showContent ? 'iconfont icon-jiantoushang g-size ' : 'iconfont icon-jiantouxia g-size' "></i>
       </div>
         <div class="group-p" v-show="this.folds[1].showContent" >
          <div class="group-list ld-left "  @click="jump(i,false)" v-for="(e,i) in join" :key='i' >
            <div class="group-img">
              <img :src="e.imgUrl" alt="">
            </div>
            <div class="group-name">
              <p>{{e.groName}}</p>
             <p class="member">
                <img src="../assets/img/person (1).png" alt="">{{e.name}}
              </p>
              <p class="member">
                <img src="../assets/img/double (1).png" alt="">{{e.userCount}}人
              </p>
            </div>
          </div>
         </div>
      </div>

  </div>

</template>
<script>
import { groups,Count } from "@/api/index";
export default {
    data() {
      return {
        join: [],
        creates: [],
        jointle: '',
        createstle: '',
        folds:[
          {showContent: false},
          {showContent: false}
        ],
        informs:0
      };
    },
    methods: {
      //跳转群成员
      jump(i,type){
        let id,name;
        if(type){
          id=this.creates[i].groId;
          name=this.creates[i].groName;
          // imgUrl=this.creates[i].imgUrl;
        }else{
          id=this.join[i].groId;
          name=this.join[i].groName;
          // imgUrl=this.creates[i].imgUrl;
        }

        this.$router.push({
          // path: '/groupUser',
          name:'groupUser',
          query: {
            id:id,
            name:name,
            type:type
          },
        })
      },
      gainGroup() {
        groups({}).then( res => {
            this.hideLoading();
           if(res.code == 1) {
              this.join = res.data.join
              this.creates = res.data.create;
              let arr=res.data.join.concat(res.data.create);
             localStorage.setItem('groupList',JSON.stringify(arr));
              this.jointle = res.data.join.length == 0 ? '(0)' : '(' + res.data.join.length + ')'
              this.createstle  = res.data.create.length == 0 ? '(0)' : '(' + res.data.create.length + ')'

           }
        })
      },
      gainInform()  {
        Count({}).then( res =>{
           if(res.code == 1) {
              this.informs = res.data
           }
        })
      },
      show(i) {
        this.folds[i].showContent = !this.folds[i].showContent
      }
    },
    created () {
      this.loading();
      this.gainGroup()
      this.gainInform()
    },
    components: {

    }
};
</script>
<style lang='less'>
@import '../assets/iconfont.css';
.group {
  background: #f5f5f5;
  height: 100%;
   overflow-y: scroll;
  .g-size {
    font-size: 34px;
    font-weight: 400;
  }
  .fold {
     height: 96px;
     display: flex;
     padding: 0 36px;
     line-height: 96px;
     background: #fff;
     justify-content: space-between;
     font-size: 32px;
     color: #000;
     margin-bottom: 16px;
     i {
       margin: auto 0;
     }
  }
  .none {
    margin-bottom: 0;
  }
  .ma10 {
     margin-bottom: 16px;
  }
  .group-p {
    padding: 0 36px;
    background: #fff;
    .group-list {
      height: 168px;
      box-sizing: border-box;
      border-bottom: 1px solid #f2f2f2;
      .group-img {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        margin-top: 20px;
        margin-right: 32px;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .group-name {
        margin-top: 25px;
        font-size: 36px;
        color: #000;
        p {
          width:550px;
          word-break:keep-all;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
        }
        .member {
          font-size: 24px;
          margin-top: 5px;
          color: #999;
          img {
            width: 27px;
            height: 24px;
            margin-right: 14px;
          }
        }
      }
    }
    .g-h {
      height: 126px;
    }

  }
}
</style>
