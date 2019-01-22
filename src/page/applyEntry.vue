<!-- 模型： DOM 结构 -->
<template>
    <div class="applyEntry">
        <div class="top-box">
            <div>
                <img :src="imgurl"/>
            </div>
            <div>
                <span>{{name}}</span>
            </div>
            <p>共{{num}}人</p>
        </div>
        <div class="bom-box">
            <button @click="applyGroup">{{applyTxt}}</button>
        </div>
        <v-toast :toastTxt="toastTxt" :mask="mask"></v-toast>
        <div class="fix-box" v-if="showQrcode">
            <div class="qrcode" @click="followFn">
                <img src="../assets/img/bdd.jpg"/>
            </div>
        </div>
    </div>
</template>
<script>
import { groupsDetail,Addgroup,queryList } from '@/api/index'
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
    props: {
        // 集成父级参数
    },
    beforeCreate() {
        // console.group('创建前状态  ===============》beforeCreate');
    },
    created() {
        // console.group('创建完毕状态===============》created');
        this.id=this.$route.query.id;
        groupsDetail(this.id).then(res =>{
            this.imgurl=res.data.imgUrl;
            this.num=res.data.userCount;
            this.name=res.data.groName;
        })
    },
    beforeMount() {
        // console.group('挂载前状态  ===============》beforeMount');
    },
    mounted() {
       
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
            Addgroup({groId:this.id}).then( res => {
                if(res.code == 1 ) {
                    this.applyTxt='已申请';
                    this.mask=true;
                    return setTimeout(() => {
                        this.mask = false;
                        this.$router.replace({
                            path:'/nav/card'
                        })
                    }, 1500);
                }else if(res.code==403){
                    this.toastTxt=res.msg;
                    this.mask=true;
                    return setTimeout(() => {
                        this.mask = false;
                    }, 1500);
                }else if(res.code==0){
                    this.toastTxt='您尚未关注公众号，请先关注公众号';
                    this.mask=true;
                    return setTimeout(() => {
                        this.mask = false;
                        this.showQrcode=true;
                    }, 1000);
                }else{
                    this.toastTxt=res,msg;
                    this.mask=true;
                    return setTimeout(() => {
                        this.mask = false;
                    }, 1500);
                }
            })
        },
        followFn(){//检测是否关注
            // const appid='wx393124fdad606b1d';//预发布
            const appid='wx26999a53385489f9';//生产
            let url=encodeURIComponent(location.href.split('?')[0].split('#')[0]+'?path=applyEntry&id='+this.id+'&istrue=1');
            util.weixinauth(appid,url);
        }   
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.top-box{
    background: #fff;
    padding-top: 100px;
    padding-bottom: 80px;
    div{
        text-align: center;
        margin-bottom: 20px;
        img{
            border-radius: 50%
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
        border-radius: 5px
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
        width: 80%;
        img{
            width: 100%;
        }
    }
}
</style>
