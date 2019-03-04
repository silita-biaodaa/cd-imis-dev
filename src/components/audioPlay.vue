<template>
    <div class="audioPlay" >
        <div class="audioBox">
            <!--播放按钮-->
            <div class="playBtn">
                <p :class="isClick?'pause-btn':'play-btn'"></p>
            </div>
            <!--计数条-->
            <div class="countsBar">
                <p class="counter">{{counts.m}}:{{counts.s}}</p>
                <van-slider inactive-color="rgb(149, 136, 124,.3)" :max="maxTime" active-color="#95887C" v-model="counts.s"></van-slider>
                <p class="counter">{{num.m}}:{{num.s}}</p>
            </div>
            <!--删除-->
            <div class="deleteBtn">删除</div>
        </div>
        <audio @canplay="readPlay" v-show="false" ref="test" src="http://m10.music.126.net/20190228155216/629bf8e3644fc674a42bceec504f8972/ymusic/e47f/9bc5/2695/b74c4b8332994ffcb34a6f2c0080b9e6.mp3"></audio>
    </div>
</template>
<script>
  export default {
    name:'audioPlay',
    data () {
        return {
            isClick:false,
            counts:{
                m:'00',
                s:'00'
            },
            num:{
                m:'00',
                s:'00'
            },
            maxTime:0,
            nowTime:0,
        }
    },
    computed: {
      
    },
    methods:{
        timer() {
            const that = this
            let second = that.counts.s
            let minute = that.counts.m
            second++
            if (second >= 60) {
                second = 0  //  大于等于60秒归零
                minute++
                // if (minute >= 60) {
                //     minute = 0  //  大于等于60分归零
                // }
                if (minute < 10) {
                // 少于10补零
                    that.counts.m='0'+minute;
                    that.counts.s=second;
                } else {
                    that.counts.m=minute;
                    that.counts.s=second;
                }
            }
            if (second < 10) {
                // 少于10补零
                that.counts.m=minute;
                that.counts.s='0'+second;
            } else {
                that.counts.m=minute;
                that.counts.s=second;
            }
        },
        readPlay(){//准备播放
            const maxTime=parseInt(this.$refs.test.duration);
            this.maxTime=maxTime;
            this.num.m=parseInt(maxTime/60);
            this.num.s=maxTime%60;
            if(this.num.m<10){
                this.num.m='0'+this.num.m
            }
            if(this.num.s<10){
                this.num.s='0'+this.num.s
            }
            
        }
    },
    created(){
        
    },
    mounted(){

    }
  }
</script>
<style lang="less" scoped>
.audioPlay{
    padding: 24px 32px;
    font-size: 24px;
    .audioBox{
        box-sizing: border-box;
        width: 100%;
        height: 116px;
        border-radius: 5px;
        background: #C5B9AF;
        padding: 16px 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}

/*按钮样式*/
.playBtn{
    // margin-right: 36px;
    width: 84px;
    height: 84px;
    border-radius: 50%;
    border:6px solid rgba(255,255,255,.6);
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .play-btn{
        width: 0;
        height: 0;
        border-left: 24px solid #fff;
        border-top: 18px solid transparent;
        border-bottom: 18px solid transparent;
    }
    .pause-btn{
        width: 24px;
        height: 35px;
        border-width:0 5px;
        border-color: #fff;
        border-style: solid; 
        box-sizing: border-box;
    }
}
/*计数条*/
.countsBar{
    width: calc(100% - 262px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .counter{
        color: #fff;
        width: 61px;
    }
    .van-slider{
        width: calc(100% - 188px);
    }
}
/*删除键*/
.deleteBtn{
    color: #666666;
    padding: 7px 0 7px 13px;
    border-left: 2px solid #f2f2f2;
}
</style>
