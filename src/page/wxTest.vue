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
      <div>
          <button @click="uploadRecord">上传</button>
      </div>
      <div>
          <button @click="jump">跳</button>
      </div>
      <div>
          <textarea v-model="txt"></textarea>
      </div>
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
          num:0,//记录第几个音频
          serverId:[],
          n:0,//记录第几个上传音频
          txt:''
      }
    },
    computed: {
      
    },
    methods:{
        startRecording() {//开始录音
            wx.startRecord();
        },
        obtainRecord(){//暂停录音
            // let n=that.num;
            // wx.pauseVoice({
            //     localId:that.recordId[n] 
            // });
            let that=this;
            that.isRec=false;
            wx.stopRecord({
                success: function (res) {
                    that.recordId.push(res.localId);
                }
            });
        },
        stopRecord(){//停止录音
            let that=this;
            that.isRec=false;
            wx.stopRecord({
                success: function (res) {
                    that.recordId.push(res.localId);
                }
            });
        },
        playRecord(){//播放录音
            let that=this;
            if(that.recordId.length==0){
                alert('先停止或先开始，再播放')
            }else{
                if(that.recordId.length==1){
                    wx.playVoice({
                        localId: that.recordId[0]
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
        },
        uploadRecord(){
            let that=this;
            if(that.recordId.length==0){
                alert('请录制完成后再上传')
            }else{
                if(that.recordId.length==1){
                    wx.uploadVoice({
                        localId:that.recordId[0], // 需要上传的音频的本地ID，由stopRecord接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                           that.serverId.push(res.serverId); // 返回音频的服务器端ID
                        }
                    });
                }else{
                    that.upload();       
                }
            }
        },
        upload(){
            let that=this;
            let n=that.n;
            if(that.serverId.length==that.recordId.length){
                //请求后台接口将serverId给后台
                that.txt=that.serverId.join(',')
                return
            }
            wx.uploadVoice({
                localId:that.recordId[n],
                isShowProgressTips: 0, // 默认为1，显示进度提示
                success: function (res) {
                    that.serverId.push(res.serverId);
                    that.n++;
                    that.upload();
                }
            });
        },
        jump(){
            alert(1);
            wx.miniProgram.navigateTo({
                url: '/pages/test/test?id=dasdasda'
            })
            // wx.navigateToMiniProgram
        }
    },
    created(){
        let that=this;
        wx.onVoiceRecordEnd({//监听录音自动停止
            // 录音时间超过一分钟没有停止的时候会执行 complete 回调
            complete: function (res) {
                that.recordId.push(res.localId);
                wx.uploadVoice({
                    localId:res.localId,
                    isShowProgressTips: 0, // 默认为1，显示进度提示
                    success: function (res) {
                        that.serverId.push(res.serverId);
                    }
                });
                wx.startRecord();//每超一分钟，继续调用开始录制方法
            }
        });
        wx.onVoicePlayEnd({//播放完毕
            success: function (res) {
                if(that.num==that.recordId.length){
                    that.num=0;
                    return
                }
                that.num++;
                that.play();
            }
        });
        // window.addEventListener("online", function () {  
        //     alert("online");}, true);  
        // window.addEventListener("offline", function () {  
        //     alert("offline");}, true);
        window.ononline = function() {
            alert("链接上网络了");
        }
        window.onoffline = function() {
            alert("网络链接已断开");
        }

        
    }
}
</script>
<style lang="less" >
.test{
    padding: 40px;
    div{
        text-align: center
    }
    button{
        padding: 20px;
        margin-bottom: 20px
    }
    textarea{
        width: 100%;
        height: 20vh;
    }
}

</style>
