
<template>
    <div class="cardDetail">
        <div class="f-person">
            <div class="p-img">
                <img :src="imgUrl">
            </div>
            <div class="p-name">
                <p class="name">{{name}}</p>
                <!--<p class="company" >{{compang}}</p>-->
                <p class="start s-top">打卡始于<span class="p-ye">{{pushStart}}</span>,持续打卡于<span class="p-ye">{{pushEnd}}</span>,</p>
                <p class="start">  日精进打卡第<span class="p-ye">{{time}}</span>天,共打卡<span class="p-ye">{{total}}</span>次,缺卡<span class="p-ye" >{{que}}</span>次</p>
            </div>
            <span v-if="goto" class="iconfont icon-fanhui" @click="$router.go(-1)"></span>
        </div>
        <div class="f-content">
            <!-- <v-clock :item="item" v-for="( item, index ) in list" :key="index"></v-clock> -->
            <div class="c-img">
                <img :src="item.user.imgUrl">
            </div>
            <p class="c-name"><span class="fc-n">{{item.user.name}}</span><span v-if="item.user.company && item.user.company!=''">-{{item.user.company}}</span></p>
            <div class="c-content">
                <p class="c-time"><span>{{item.pushd}}</span>打卡第{{item.pushCount.putCount}}次</p>
                <div class="c-text" >
                <!-- 知 学习 -->
                <p class="tit">【知～学习】</p>
                <div v-for="(el,bs) in item.books" :key="bs">
                    <p class="c-color" v-if="el.readCount!=0">《{{el.title}}》{{el.readCount}}遍 共{{el.readTotal}}遍</p>
                </div>
                <template v-if="item.bookish.length>0">
                    <div v-for="(o,i) in item.bookish" :key="'i'+i">
                        <span class="c-color">《{{o.bookName}}》{{o.section}}</span>
                        <span class="c-link" v-if="o.link" @click="jumpLink(o.link)"></span>
                    </div>
                </template>

                <!-- 经典名句 -->
                <template v-if="item.classic">
                    <p class="tit">【经典名句分享】</p>
                    <p class="c-color" v-html="item.classicStr"></p>
                </template>
                <!-- 行 实践 -->
                <template v-if="item.practice!=undefined&&(item.practice.character!=''||item.practice.family!=''||item.practice.work!='')">
                    <p class="tit">【行～实践】</p>
                    <template v-if="item.practice.character!=''">
                        <h5>一、修身：（对自己个人）</h5>
                        <p class="c-color">{{item.practice.character}}</p>
                    </template>
                    <template v-if="item.practice.family!=''">
                        <h5>二、齐家：（对家庭和家人）</h5>
                        <p class="c-color">{{item.practice.family}}</p>
                    </template>
                    <template v-if="item.practice.work!=''">
                        <h5>三、建功：（对工作）</h5>
                        <p class="c-color">{{item.practice.work}}</p>
                    </template>
                </template>
                <!-- 积善 -->
                <p class="tit">【积善】</p>
                <p class="c-color">发愿从{{item.pushCount.bonaStart}}起{{item.pushCount.years}}年内{{item.pushCount.bonaCount*item.pushCount.days}}善事。今日{{item.pushCount.bonaDays}}善，累计{{item.pushCount.bonaTotal}}善</p>
                <!-- 省 觉悟 -->
                <template v-if="item.introspective">
                    <p class="tit">【省～觉悟】</p>
                    <p class="c-color" v-html="item.introspectiveStr"></p>
                </template>
                <!-- 感谢 -->
                <template v-if="item.thanks">
                    <p class="tit">【感谢】</p>
                    <p class="c-color" v-html="item.thanksStr"></p>
                </template>
                <!-- 祝愿 -->
                <template v-if="item.volunteer">
                    <p class="tit">【志愿】</p>
                    <p class="c-color" v-html="item.volunteerStr"></p>
                </template>
                </div>
            </div>
        </div>
        <div class="mask" v-if="mask" @click="maskFn">
            <img src="../assets/img/mask.png"/>
        </div>
    </div>
</template>
<script>
  import { User,Detail } from '@/api/index'
  import wx from 'weixin-js-sdk'
  export default {
    name:'cardDetail',
    data () {
      return {
        name: '',
        imgUrl: '',
        compang: '',
        pushStart: '',
        pushEnd: '',
        total: '',
        time: '',
        que: '',
        item:{},
        mask:false,
        goto:true,
      }
    },
    watch:{

    },
    methods: {
        //跳转链接
        jumpLink(link){
            window.location.href=link
        },
        offBridgeReady(){
            // let u = navigator.userAgent;
            // let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            // if(isAndroid){
                WeixinJSBridge.call('showOptionMenu'); 
            // }

        },
        maskFn(){
            this.mask=false;
        },
        gainUser(userid) {
            let data={
                userId:userid
            }
            let that=this;
            User(data).then( res => {
            // this.hideLoading();
                that.name = res.data.name;
                that.imgUrl = res.data.imgUrl
                that.compang = res.data.company
                that.pushStart = res.data.pushStart
                that.pushEnd = res.data.pushEnd
                that.total = res.data.total
                that.time = res.data.pushDays
                that.que = res.data.lostCount
            })
        },
        getDetail(id) {
            let that=this;
            let data={pkid:id}
            Detail(data).then( res => {
                //  that.list = res.data.list;
                if(res){
                    let classic=res.data.classic||'',
                        introspective=res.data.introspective||'',
                        thanks=res.data.thanks||'',
                        volunteer=res.data.volunteer||'';
                    let re=/((http[s]{0,1}|ftp):\/\/[a-zA-Z0-9.-]+.([a-zA-Z]{2,4})(:\d+)?([a-zA-Z0-9\.\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\.\-]+\.([a-zA-Z]{2,4})(:\d+)?([a-zA-Z0-9\.\-~!@#$%^&*+?:_/=<>]*)?)/g;
                    classic=classic.replace(re,function(str){
                        return '<a href="'+str+'">'+str+'</a>';
                    });
                    introspective=introspective.replace(re,function(s){
                        return '<a href="'+s+'">'+s+'</a>';
                    })
                    thanks=thanks.replace(re,function(s){
                        return '<a href="'+s+'">'+s+'</a>';
                    })
                    volunteer=volunteer.replace(re,function(s){
                        return '<a href="'+s+'">'+s+'</a>';
                    })
                    classic='<span>'+classic+'</span>';//经典名句
                    introspective='<span>'+introspective+'</span>';//觉悟
                    thanks='<span>'+thanks+'</span>';//感谢
                    volunteer='<span>'+volunteer+'</span>';//志愿

                    res.data.classicStr=classic;
                    res.data.introspectiveStr=introspective;
                    res.data.thanksStr=thanks;
                    res.data.volunteerStr=volunteer;
                    that.item=res.data;
                }
            })
        },
    },
    beforeRouteEnter (to, from, next) {
        if(from.path=='/nav/friend'||from.path=='/nav/record'){
            to.meta.mask=true;
            next();
        }else{
            to.meta.share=true;
            next();
        }
        
    },
    created () {
        if(this.$route.meta.mask){
            this.mask=true;
        }
        if(this.$route.meta.share){
            this.goto=false;
        }
        WeixinJSBridge.call('showOptionMenu');
    },
    updated(){
        let that=this;
        let shareUrl=window.location.href.split('?')[0].split('#')[0]+'?path=cardDetail&id='+that.$route.query.id+'&userid='+that.$route.query.userid;
        let configData={
        	title:that.name, // 分享标题
			desc:'日精进打卡始于'+that.pushStart+'，     打卡第'+that.time+'天，共打卡'+that.total+'次。', // 分享描述
			imgUrl:that.imgUrl, // 分享图标
            link:window.location.href,
            success:function(){
                if(that.goto){
                    that.mask=false;
                    that.$router.go(-1);
                }
            }
		}; 
		let u = navigator.userAgent;
		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//		let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        let obj={
            title:that.name+'  日精进打卡第'+that.time+'天，共打卡'+that.total+'次。', // 分享标题
			imgUrl:that.imgUrl, // 分享图标
            link:window.location.href,
            success:function(){
                if(that.goto){
                    that.mask=false;
                    that.$router.go(-1);
                }
            }
        }
        if(isAndroid){
            configData.link=shareUrl;
            obj.link=shareUrl;
        }
		wx.onMenuShareAppMessage(configData);// 分享给朋友 
    	wx.onMenuShareTimeline(obj);//朋友圈
    	wx.onMenuShareQQ(configData);//qq
    	wx.onMenuShareQZone(configData);//qq空间
    },
    mounted(){
        let id=this.$route.query.id,
            userid=this.$route.query.userid;
        this.gainUser(userid);
        this.getDetail(id);
        let that=this;
        // wx.ready(function(){
        //     that.offBridgeReady()
        // })
        // if (typeof WeixinJSBridge == "undefined"){
        //     if( document.addEventListener ){  
        //         document.addEventListener('WeixinJSBridgeReady', that.offBridgeReady, false);  
        //     }else if (document.attachEvent){  
        //         document.attachEvent('WeixinJSBridgeReady', that.offBridgeReady);   
        //         document.attachEvent('onWeixinJSBridgeReady', that.offBridgeReady);  
        //     }  
        // }else{  
        //     that.offBridgeReady();  
        // }
        
    },
    destroyed() {
      // console.group('销毁完成状态===============》destroyed');
    },
  }
</script>
<style lang='less' scoped>
.mask{
    position:fixed;
    height:100vh;
    background:rgba(0,0,0,.8);
    top:0;
    left:0;
    width: 100%;
    overflow:hidden;
    text-align: right;
    padding: 71px 12px 0 0;
    img{
        width:555px
    }
}
.cardDetail {
    -webkit-overflow-scrolling : touch;
    min-height: calc(100vh + 1PX);
    .f-person {
        width:100%;
        height: 409px;
        background: url("../assets/img/bg.png") no-repeat;
        background-size: cover;
        background-color: #fff;
        padding-top: 94px;
        box-sizing: border-box;
        position: relative;
        .icon-fanhui{
            position: absolute;
            left: 39px;
            top: 32px;
            color: #fff;
            font-size: 30px;
            font-weight: bold;
        }
        .p-img {
            height: 129px;
            width: 129px;
            border-radius: 50%;
            overflow: hidden;
            margin:0 auto;
            img {
                width: 100%;
            }
        }
        .p-name {
            margin: 0 auto;
            text-align: center;
            width:420px;
            .name {
                color: #fff;
                font-size: 36px;
                margin: 12px 0 24px;
            }

            .company {
                color: #fff;
                font-size: 28px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap
            }

            .start {
                color: #DDD;
                font-size: 20px;
                margin-top: 4px;
                text-align: left;
            }

            .s-top {
                margin-top: 10px;
            }

            .p-ye {
                color: #FFEE31; 
            }

        }
    }
}

.f-content{
    background: #fff;
    overflow: hidden;
    padding: 37px;
    padding-left: 159px;
    border-bottom: 16px solid #F5F5F5;
    background: #fff;
    position: relative;
    .c-img {
        height: 83px;
        width: 83px;
        position: absolute;
        background: red;
        border-radius: 50%;
        top: 37px;
        left: 37px;
        img{
            width: 100%;
            border-radius: 50%
        }
    }
    .c-name {
        color :#010101;
        font-weight: 500;
        font-size: 36px;
        .fc-n {
            color: #633B1E;
        }
    }
    .c-content {
        margin-bottom: 30px;
    }
    .tit{
        line-height: 2.8
    }
    .c-text{
        margin-top: 14px;
    }
    .c-time {
        color: #ccc;
        font-size: 24px;
        margin-top: 5px;
        span{
            margin-right:55px;
        }
    }
    .c-text {
        color: #000;
        font-size: 28px;
        color: #000;
        font-weight: 400;
        margin-top: 34px;
        .c-color {
            color:#999;
            overflow: hidden;
        }
    }
}
.laudBox{
    background: #F5F5F5;
    padding: 20px;
    margin-top: 75px;
    border-radius: 10px;
    display: flex;
    align-items: center;
}
.icon{
    width: 34px;
    height: 29px;
    margin-right: 8px;
}
.pickZan{
    background: url("../assets/img/zan.png") no-repeat;
    background-size: cover;
}
.c-link{
  display: inline-block;
  background: url(../assets/img/icon-lj.png);
  background-size: cover;
  width: 30px;
  height: 30px;
  margin-left: 40px
}
</style>
