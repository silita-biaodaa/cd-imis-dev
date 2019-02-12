<template>
  <div class="test" >
      <div>
          <button @click="startRecording">开始</button>
      </div>
      <div>
          <button @click="obtainRecord">获取</button>
      </div>
      <div>
          <button @click="stopRecord">停止</button>
      </div>
      <div>
          <button @click="playRecord">播放</button>
      </div>
      <audio controls autoplay ref="audio"></audio>
  </div>
</template>
<script>
import HZRecorder from '@/api/record'
import wx from 'weixin-js-sdk'
  export default {
    name:'test',
    data () {
      return {
          recorder:''
      }
    },
    computed: {
      
    },
    methods:{
        startRecording() {
            let that=this;
            HZRecorder.get(function (rec) {
                that.recorder = rec;
                alert(JSON.stringify(rec))
                that.recorder.start();
            });
        },
        obtainRecord(){
            let that=this;
            var record = that.recorder.getBlob();
            debugger;
        },
        stopRecord(){
            let that=this;
            that.recorder.stop();
        },
        playRecord(){
            let that=this;
            let audio=this.$refs.audio;
            that.recorder.play(audio);
        }
    },
    created(){
        wx.startRecord({
            success:function(){
                wx.stopRecord();
            },
            cancel:function(){
                alert('您已拒绝授权录音')
            }
        })
    }
  }
</script>
<style lang="less" >

</style>
