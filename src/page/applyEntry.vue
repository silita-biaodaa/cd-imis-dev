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
            <button @click="applyGroup">申请入群</button>
        </div>
    </div>
</template>
<script>
import { groupsDetail,Addgroup } from '@/api/index'
export default {
    name: 'applyEntry', // 结构名称
    data() {
        return {
            // 数据模型
            id:'',//群id
            name:'',//群名
            imgurl:'',//群头像
            num:'',//群人数
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
            Addgroup({groId:val.groId}).then( res => {
                if(res.code == 1 ) {
                    val.isApply = 1
                }
            })
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

</style>
