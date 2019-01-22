<!-- 模型： DOM 结构 -->
<template>
    <div class="toast" v-show="mask">{{toastTxt}}</div>
</template>
<script>
export default {
    name: 'toast', // 结构名称
    data() {
        return {
            // 数据模型
        }
    },
    watch: {
        // 监控集合
    },
    props: {
        // 集成父级参数
        toastTxt:{
            type:String
        },
        mask:{
            type:Boolean
        }
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
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">
.toast{
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

</style>
