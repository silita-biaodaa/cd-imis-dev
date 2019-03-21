<!-- 模型： DOM 结构 -->
<template>
    <div class="close">
        <v-popup :popup-type="'closeTips'" :popup-show="true" @sure="sureFn"></v-popup>
    </div>
</template>
<script>
export default {
    name: 'close', // 结构名称
    data() {
        return {
        }
    },
    watch: {
        // 监控集合
    },
    computed:{
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
        sureFn(){
            window.opener=null;
            window.open('','_self');
            window.close();
        }
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped lang="less">

</style>
