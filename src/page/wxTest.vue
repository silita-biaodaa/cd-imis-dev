<template>
  <div class="test" >
      <div>
          <button @click="startRecording">开始</button>
      </div>
      <div>
          <button @click="obtainRecord">暂停</button>
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
import wx from 'weixin-js-sdk'
  export default {
    name:'test',
    data () {
      return {
          recordId:[],
          isRec:true,//是否正在录制
          num:0
      }
    },
    computed: {
      
    },
    methods:{
        startRecording() {//开始
            wx.startRecord();
        },
        obtainRecord(){//暂停
            
        },
        stopRecord(){//停止
            let that=this;
            that.isRec=false;
            wx.stopRecord({
                success: function (res) {
                    that.recordId.push(res.localId);
                }
            });
        },
        playRecord(){//播放
            let that=this;
            if(that.recordId.length==0){
                alert('先停止或先开始，再播放')
            }else{
                if(that.recordId.length==1){
                    wx.playVoice({
                        localId: that.recordId
                    });
                }else{
                    that.play();       
                }
            }
            
        },
        play(){
            let that=this;
            let n=that.num;
            wx.playVoice({
                localId:that.recordId[n]
            });
        }
    },
    created(){
        let that=this;
        wx.onVoiceRecordEnd({//监听录音自动停止
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                alert(JSON.stringify(res));
                that.recordId.push(res.localId);
                wx.startRecord();//没点击开始，继续调用开始录制方法
            }
        });
        wx.onVoicePlayEnd({//播放完毕
            success: function (res) {
                if(that.num==that.recordId.length){
                    return
                }
                that.num++;
                that.play();
            }
        });
    }
  }
</script>
<style lang="less" >

</style>
