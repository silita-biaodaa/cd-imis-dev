<template>
    <div class="audioPlay" >
        <div class="audioBox">
            <!--播放按钮-->
            <div class="playBtn">
                <template v-if="isRead">
                    <p :class="isClick?'pause-btn':'play-btn'" @click="playFn"></p>
                </template>
                <template v-else>
                    <van-loading size="25px" color="white"></van-loading>
                </template>
            </div>
            <!--计数条-->
            <div class="countsBar" :class="isCard==1?'isCard':''">
                <p class="counter">{{counts.m}}:{{counts.s}}</p>
                <van-slider inactive-color="rgb(149, 136, 124,.3)" active-color="#95887C" @change="sliderChange" v-model="slider"></van-slider>
                <p class="counter">{{num.m}}:{{num.s}}</p>
            </div>
            <!--删除-->
            <div class="deleteBtn" @click="tapDel" v-if="isCard==1">删除</div>
        </div>
        <audio @canplay="readPlay" @loadedmetadata="readPlay" v-show="false" ref="test" :src="audioPath" @ended="audioEnd"></audio>
        <v-popup :popupShow="mask" :popupType="'tip1'" :tip-text="tipTxt" @sure="deleteAudio"></v-popup>
    </div>
</template>
<script>
import { setInterval, clearInterval } from 'timers';
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
            slider:0,
            t:null,
            mask:false,
            tipTxt:'确认删除该录音吗?',
            isRead:false,
        }
    },
    props:{
        audioPath:{
            default:''
        },
        isCard:{
            default:0
        }
    },
    methods:{
        timer() {
            const that = this;
            let second = that.counts.s;
            let minute = that.counts.m;
            this.nowTime++
            if(this.nowTime>this.maxTime){//双保险
                return false
            }
            second++
            this.slider=parseInt((this.nowTime/this.maxTime)*100);
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
            this.isRead=true;
            
        },
        stop(){//模拟停止
           let audio=this.$refs.test;
           audio.pause();
           audio.currentTime=0; 
           this.audioEnd();
        },
        pause(){//暂停
            let audio=this.$refs.test;
            audio.pause();
            clearInterval(this.t);
            this.isClick=false;
        },
        playFn(){
            let audio=this.$refs.test;
            if(this.isClick){//暂停
                audio.pause();
                clearInterval(this.t);
            }else{
                this.$emit('audioPlay');
                audio.play();
                this.t=setInterval(this.timer,1000);
            }
            this.isClick=!this.isClick
        },
        sliderChange(value){//进度条change
            clearInterval(this.t);
            let audio=this.$refs.test;
            this.slider=value;
            this.nowTime=parseInt((this.maxTime*value)/100);
            this.counts.m=parseInt(this.nowTime/60);
            this.counts.s=this.nowTime%60;
            if(this.counts.m<10){
                this.counts.m='0'+this.counts.m
            }
            if(this.counts.s<10){
                this.counts.s='0'+this.counts.s
            }
            audio.currentTime = this.nowTime;
            this.t=setInterval(this.timer,1000);
        },
        deleteAudio(){
            this.$emit('deAudio');
        },
        tapDel(){
            this.mask=true;
        },
        audioEnd(){//播放完毕停止计时
            clearInterval(this.t);
            this.counts={
                m:'00',
                s:'00'
            };
            this.t=null;
            this.nowTime=0;
            this.slider=0;
            this.isClick=false;
        }
    },
    created(){
        
    },
    mounted(){
        let u = navigator.userAgent;
        let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let audio=this.$refs.test;
        if(isiOS){//IOS不会自动触发canplay事件。
            audio.play();
            audio.pause();
            // this.isRead=true;
        }
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
    width: calc(100% - 110px);
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
.isCard.countsBar{
    width: calc(100% - 262px);
}
/*删除键*/
.deleteBtn{
    color: #666666;
    padding: 7px 0 7px 13px;
    border-left: 2px solid #f2f2f2;
}
</style>
