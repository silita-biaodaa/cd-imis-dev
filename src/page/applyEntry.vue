<!-- 模型： DOM 结构 -->
<template>
    <div class="applyEntry">
        <div class="top-boxs">
            <div>
                <img :src="imgurl"/>
            </div>
            <div>
                <span>{{name}}</span>
            </div>
            <p>共{{num}}人</p>
        </div>
        <div class="bom-box">
            <button @click="applyGroup" :class="applyTxt!='申请入群'?'noclick':''">{{applyTxt}}</button>
        </div>
        <v-toast :toastTxt="toastTxt" :mask="mask"></v-toast>
        <div class="fix-box" v-if="showQrcode">
            <div class="qrcode">
                <div class="txt-box">
                    <p>请先关注公众号，再来进群哟~</p>
                    <!-- <p>长按识别下图二维码关注公众号</p> -->
                </div>
                <van-icon name="cross"  @click="followFn"/>
                <img src="../assets/img/cdxs.jpg"/>
                <!-- <img src="../assets/img/bdd.jpg"/> -->
            </div>
        </div>
    </div>
</template>
<script>
import { groupsDetail,Addgroup } from '@/api/index'
import util from "@/util/util"
export default {
    name: 'applyEntry', // 结构名称
    data() {
        return {
            // 数据模型
            id:'',//群id
            name:'',//群名
            imgurl:'',//群头像
            num:'',//群人数
            applyTxt:'申请入群',
            mask:false,
            toastTxt:'您的申请已提交，请等待群组审批',
            showQrcode:false
        }
    },
    watch: {
        // 监控集合
    },
    computed:{
        // showQrcode(){
        //     if(this.$route.meta.showQrcode){
        //         return true
        //     }else{
        //         alert('f');
        //         return false
        //     }
        // }
    },
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
        let that=this;
        this.id=this.$route.query.id;
        groupsDetail(this.id).then(res =>{
            that.imgurl=res.data.imgUrl;
            that.name=res.data.groName;
            that.num=res.data.userCount;
            if(res.data.isConcern==0){
                that.showQrcode=true;
            }
        })
        
        
        // console.group('挂载结束状态===============》mounted');
    },
    beforeUpdate() {
        // console.group('更新前状态  ===============》beforeUpdate');
    },
    updated() {
        // console.group('更新完成状态===============》updated');
    },
    beforeDestroy() {
        // console.group('销毁前状态  ===============》beforeDestroy');
    },
    destroyed() {
        // console.group('销毁完成状态===============》destroyed');
    },
    methods: {
        // 方法 集合
        applyGroup(){
            if(this.applyTxt!='申请入群'){
                return false
            }
            Addgroup({groId:this.id}).then( res => {
                if(res.code == 1 ) {
                    this.applyTxt='已申请';
                    this.mask=true;
                    return setTimeout(() => {
                        this.mask = false;
                    }, 1500);
                }else if(res.code==403){
                    this.applyTxt='已申请';
                    this.toastTxt=res.msg;
                    this.mask=true;
                    return setTimeout(() => {
                        this.mask = false;
                    }, 1500);
                }else{
                    this.applyTxt='已入群';
                    this.toastTxt=res.msg;
                    this.mask=true;
                    return setTimeout(() => {
                        this.mask = false;
                    }, 1500);
                }
            })
        },
        followFn(){//检测是否关注
            let appid=this.appid;
            let url=encodeURIComponent(location.href.split('?')[0].split('#')[0]+'?path=applyEntry&id='+this.id+'&istrue=1');
            util.weixinauth(appid,url);
        }   
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.top-boxs{
    background: #fff;
    padding-top: 50px;
    padding-bottom: 40px;
    font-size: 28px;
    div{
        text-align: center;
        margin-bottom: 10px;
        img{
            border-radius: 50%;
            width: 80px;
        }
    }
    p{
        text-align: center;
        color: #ccc;
    }
}
.bom-box{
    margin-top: 100px;
    text-align: center;
    button{
        background: #f12c20;
        color: #fff;
        width: calc(100% - 60px);
        height: 70px;
        border: none;
        border-radius: 5px;
        font-size: 28px;
    }
    .noclick{
        background: #999;
        opacity: .8;
    }
}
.fix-box{
    height: 100vh;
    background: rgba(0,0,0,.8);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    .qrcode{
        background: #fff;
        position: relative;
        width: 80%;
        .txt-box{
            padding: 40px 40px 0;
            font-size: 28px;
            text-align: center;
            p:first-of-type{
                margin-bottom: 10px
            }
        }
        img{
            width: 100%;
        }
        .van-icon{
            position:absolute;
            font-size: 36px;
            top: 20px;
            right: 20px;
        }
    }
}

</style>
