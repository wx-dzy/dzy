// 一对一视频组件 创建房间 页面  https://www.jb51.net/article/173816.htm
<template>
  <div class="OneOnOneVideo footerPad">
    <div id="localplayer" style="width: 100vw; height: 50vh; background: #000"></div>
    <!-- <div id="remoteplayer" style="width: 640px;height: 480px;background: #000"></div> -->
    <van-field v-model="roomToken" clearable placeholder="请输入 RoomToken 加入房间开始连麦" />

    <van-button
      id="joinroom"
      type="info"
      loading-type="spinner"
      loading-text="加入房间"
      class="idea_btn submitBtn"
      @click="getRoom"
    >加入房间</van-button>

    <div id="trackcontainer">
      <p>本地视频</p>
      <div id="localvideo"></div>
      <p>远端视频</p>
      <div id="remotevideo"></div>
    </div>
    <footer-nav :active="active" />
  </div>
</template>

<script>
// 引入单个模块
import { QNRTCSession, deviceManager } from "pili-rtc-web";
// const myRTC = new QNRTCSession();

// 或者全部引入
// import * as QNRTC from 'pili-rtc-web';
// const myRTC = new QNRTC.QNRTCSession();

import * as Api from "@/api/customer/OneOnOneVideo";
import footerNav from "@/components/customer/footerNav/index.vue";

import { util } from "@/utils";
export default {
  // playVideoId 当前播放的 id
  props: ["_id"],
  components: {
    footerNav,
  },
  data() {
    return {
      active: "OneOnOneVideo",
      roomName: "",
      roomToken: "",
      roomUserId: "",
    };
  },

  watch: {},
  created() {
    // this.getRoom();
    // window.location.href= "http://localhost:3000/"
  },
  methods: {
    // 创建房间
    getRoom() {
      let params = "111";
      Api.getRoomToken(params)
        .then((res) => {
          let { code, data, msg, total } = res;
          if (code == 200) {
            this.roomName = data.roomName;
            this.roomToken = data.roomToken;
            this.roomUserId = data.roomUserId;
            // 进入房间
            this.handleGoVideo();
          }
        })
        .catch((err) => {});
    },
    // 进入房间
    handleGoVideo() {
      (async () => {
        const QNRTC = window.QNRTC;
        window.QNRTC = undefined;
        const myRTC = new QNRTCSession(); // 初始化我们的 SDK (QNRTC的引入方式见上)
        // console.log(myRTC,)
        try {
          const users = await myRTC.joinRoomWithToken(this.roomToken); // 加入房间

          // 因为 await 的特性，当代码执行到这里的时候，joinRoomWithToken 这个异步请求已经完成
          // 如果过程中出现错误，会直接 throw 出来，如果需要处理只要 try/catch 就好
          // 这里的 users 表示该房间中已经存在的用户，具体可以参照 API 文档
          // 你也随时可以通过 myRTC.users 获取当前的用户列表
          console.log("current users", users);
        } catch (e) {
          // 加入房间失败，关于错误处理可以参考下文的 错误处理 一节
          console.log("join room error!", e);
        }
        // 使用内置的 deviceManager 对象采集本地媒体数据
        const stream = await deviceManager.getLocalStream({
          video: { enabled: true },
          audio: { enabled: true },
        });

        // 页面上准备用来播放的元素，就是我们刚刚创建的
        const localVideo = document.getElementById("localplayer");

        // 拿到 stream 对象后，调用 play 就可以播放了
        // sdk 会在指定的元素下创建相应的 video/audio 标签完成播放
        // 这里第二个参数代表用 静音模式 来播放，本地预览的时候一般我们会设置成静音
        stream.play(localVideo, true);

        // 发布自己本地的流
        try {
          await myRTC.publish(stream);
          // console.log("publish success!");
        } catch (e) {
          // console.log("publish error!", e);
        }
      })();
    },

    handlesub1() {
      // 使用局部变量，将全局变量的 QNRTC 销毁
      const QNRTC = window.QNRTC;
      window.QNRTC = undefined;
      // 同上一章，我们先加入房间，注意这里 roomToken 需要满足上文的要求
      // let roomToken = "Room Token 2";
      const myRTC = new QNRTCSession();
      const users = myRTC.joinRoomWithToken(this.roomToken);
      // 准备好用来播放的元素
      const remoteVideo = document.getElementById("remoteplayer");
      myRTC.on("user-publish", (user) => {
        const remoteStream = myRTC.subscribe(user.userId);
        remoteStream.play(remoteVideo);
      });
      for (let i = 0; i < users.length; i += 1) {
        const user = users[i];
        // 如果这个用户正在发布并且不是自己，我们就订阅他
        if (user.published && user.userId !== myRTC.userId) {
          // 通过用户的 userId 订阅目标用户
          // 这里返回和我们最初从本地获取媒体流时的返回格式一样
          // 都是封装后的 Stream 对象
          const remoteStream = myRTC.subscribe(user.userId);
          // 同样，调用 play 方法，选择页面上准备好用来播放的元素，就可以播放啦
          remoteStream.play(remoteVideo);
        }
      }
    },
  },
  computed: {},
};
</script>
<style lang="scss">
.OneOnOneVideo {
}
</style>
<style lang="scss" scoped>
.OneOnOneVideo {
  background-color: #efefef;
  min-height: 100%;
}
</style>