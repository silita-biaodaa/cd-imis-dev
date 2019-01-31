<template>
  <div class="test" >
      <div>
          <button @click="startFn">开始</button>
      </div>
      <div>
          <button @click="pauseFn">暂停</button>
      </div>
      <div>
          <button @click="stopFn">停止</button>
      </div>
      <div>
          <button>播放</button>
      </div>
      <div class="box" v-html="writeDom"></div>
  </div>
</template>
<script>
import MSR from 'msr'
  export default {
    name:'test',
    data () {
      return {
          writeDom:'',
          msr:{}
      }
    },
    computed: {
      
    },
    methods:{
        ready(s){//初始化
            let that=this;
            that.msr=new MSR(s);
            alert('ready:'+JSON.stringify(that.msr));
            that.msr.mimeType='audio/wav';//设置文件格式
            that.msr.ondataavailable =function(blob){
                let blobUrl=URL.createObjectURL(blob);
                that.writeDom='<a href="' + blobURL + '">' + blobURL + '</a>';
            }
            that.msr.start(3000);
        },
        err(e){
            alert('err:'+JSON.stringify(e));
        },
        pauseFn(){
            that.msr.pause();
        },
        stopFn(){
            that.msr.stop();
        },
        startFn(){
            alert(JSON.stringify(this.msr));
            this.msr.startFn();
        }
    },
    created(){
        let type = { 
            audio:true,//音频模式
        }
        navigator.mediaDevices.getUserMedia(type)
        .then(function(stream){
            let that=this;
            that.msr=new MSR(stream);
            alert('ready:'+JSON.stringify(that.msr));
            that.msr.mimeType='audio/wav';//设置文件格式
            that.msr.ondataavailable =function(blob){
                let blobUrl=URL.createObjectURL(blob);
                that.writeDom='<a href="' + blobURL + '">' + blobURL + '</a>';
            }
            that.msr.start(3000);
        });
        // navigator.getUserMedia(type,this.ready,this.err);
        
    }
  }
</script>
<style lang="less" >

</style>
