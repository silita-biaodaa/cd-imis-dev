<!-- 模型： DOM 结构 -->
<template>
    <div class="groupQrcode">
        <v-head :head-txt="'群二维码名片'"></v-head>
        <div class="bigBox">
            <div class="box">
                <div class="top-box">
                    <div class="img-box">
                        <img :src="imgurl"/>
                    </div>
                    <span>{{name}}</span>
                </div>
                <div class="center-box">
                    <div id="qrcode" class="qrcode" ref="qr"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import QRCode from 'qrcodejs2'
import { groupsDetail } from '@/api/index'
import wx from 'weixin-js-sdk'
export default {
    name: 'groupQrcode', // 结构名称
    data() {
        return {
            // 数据模型
            id:'',//群id
            name:'',//群名
            imgurl:'',//群头像
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.id=this.$route.query.id;
        this.name=this.$route.query.name;
        groupsDetail(this.id).then(res =>{
            this.imgurl=res.data.imgUrl
        })
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
       
        // console.group('挂载结束状态===============》mounted');
        this.$nextTick(function() {
             this.qrcode()
        });
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
        let that=this;
        let shareUrl=window.location.href.split('?')[0].split('#')[0]+'?path=groupQrcode&id='+that.id+'&name='+that.name;
        let configData={
        	title:that.name, // 分享标题
			desc:that.name, // 分享描述
			imgUrl:that.imgurl, // 分享图标
            link:window.location.href,
		}; 
		let u = navigator.userAgent;
		let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
//		let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isAndroid){
            configData.link=shareUrl;
        }
		wx.onMenuShareAppMessage(configData);// 分享给朋友 
    	wx.onMenuShareTimeline(configData);//朋友圈
    	wx.onMenuShareQQ(configData);//qq
    	wx.onMenuShareQZone(configData);//qq空间
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        qrcode(){
            // const appid='wx393124fdad606b1d';//预发布
            const appid='wx26999a53385489f9';//生产
            let leng=this.$refs.qr.offsetWidth;
            let url=encodeURIComponent(location.href.split('?')[0].split('#')[0]+'?path=applyEntry&id='+this.id+'&istrue=1');
            let uri=this.weixinauth(appid,url);
            console.log(url);
            let code=new QRCode("qrcode", {
                text: uri,
                width:leng,
                height: leng,
                colorDark : "#000000",
                colorLight : "#ffffff",
            });
        },
        weixinauth (appid,url) {
            let str = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=CD-IMIS#wechat_redirect'
            return str
        },
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.bigBox{
    background: #f2f2f2;
    padding: 200px 40px 0;
    height: 100vh;
    .box{
        background: #fff;
        padding: 30px;
    }
    .top-box{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 24px;
        .img-box{
            border-radius: 50%;
            width: 80px;
            margin-right: 30px;
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
        span{
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
        }
    }
    .center-box{
        padding: 80px 50px;
    }
}
</style>
