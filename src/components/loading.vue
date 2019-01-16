<!-- 模型： DOM 结构 -->
<template>
    <div class="loading">
    	<img src="../assets/img/goodsLoading.gif"/>
    </div>
</template>
<script>
export default {
    name: 'loading', // 结构名称
    data() {
        return {
            // 数据模型
        }
    },
    methods: {
        // 方法 集合
    }

}

</script>
<!-- 增加 "scoped" 属性 限制 CSS 属于当前部分 -->
<style scoped>
.loading{
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	left:0;
	background: rgba(0,0,0,.5);
	z-index: 9999;
}
img{
	position: absolute;
	transform: translate(-50%,-50%);
	top: 50%;
	left: 50%;
	width:90px;
}
</style>
