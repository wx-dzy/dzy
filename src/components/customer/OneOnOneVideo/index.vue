// 一对一视频组件 创建房间 页面  https://www.jb51.net/article/173816.htm
// https://blog.csdn.net/u013210620/article/details/82345897#%E5%A4%A7%E5%B0%8F%E7%AA%97%E5%88%87%E6%8D%A2
<template>
  <!-- <div class="OneOnOneVideo footerPad"> -->

  <div class="OneOnOneVideo">
    <div v-if="isWx" class="text">请点击右上角，选择使用浏览器打本页面</div>
    <div v-else-if="!isWx && !isStart" class="text">
      <van-button
        type="info"
        loading-type="spinner"
        loading-text="开始面谈"
        class="startBtn"
        size="small"
        @click="handleClickStart"
        >开始面谈</van-button
      >
      <!-- <p>注：点击“开始会议”，系统将跳转试用浏览器打开本页面</p> -->
    </div>
    <!-- <div v-else-if="!isWx && isStart"> -->
    <div v-else>
      <!-- 本地视频 -->
      <!-- <div id="localplayer" style class="fullscreen-player" @dbclick="switchScreen"></div> -->
      <div id="localplayer" style class="fullscreen-player"></div>
      <!-- <van-field v-model="roomToken" clearable placeholder="请输入 RoomToken 加入房间开始连麦" /> -->

      <!-- 远端视频 -->
      <div id="remoteplayer" class="mini-player" style></div>
      <van-button
        type="info"
        loading-type="spinner"
        loading-text="加入房间"
        class="sizeBtn"
        size="small"
        @click="switchScreen"
        >大小窗切换</van-button
      >
      <div class="center" v-show="1">
        <van-button
          type="info"
          loading-type="spinner"
          loading-text="静音"
          size="small"
          :class="myMute ? 'red' : ''"
          @click="handleMute(1)"
          >{{ this.myMute ? "取消静音" : "静音" }}</van-button
        >
        <van-button
          type="info"
          loading-type="spinner"
          loading-text="关闭屏幕"
          :class="myFrame ? 'red' : ''"
          size="small"
          @click="handleMute(2)"
          >{{ this.myFrame ? "打开屏幕" : "关闭屏幕" }}</van-button
        >
        <van-button
          type="info"
          loading-type="spinner"
          loading-text="离开会议"
          size="small"
          @click="handleclose"
          >离开会议</van-button
        >
      </div>
    </div>
    <!-- <footer-nav :active="active" /> -->
  </div>
</template>

<script>
// 引入单个模块
// import { QNRTCSession, deviceManager } from "pili-rtc-web";
// const myRTC = new QNRTCSession();

// 或者全部引入
import * as QNRTC from "pili-rtc-web";
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
      // 视频参数
      page: {},
      isWx: true,
      isStart: false,
      // 我方是否静音
      myMute: false,
      // 是关闭屏幕
      myFrame: false,
    };
  },

  watch: {
    isStart(newVal, oldVal) {
      // console.log(newVal);
      if (newVal && !this.isWx) {
        this.init();
      }
    },
  },
  created() {
    // document.title = '面谈'
    this.isWeiXin();

    // this.$router.beforeEach((to, from, next) => {
    //   next();
    //   this.page.myRTC.leaveRoom();
    // });
  },
  methods: {
    isWeiXin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        // console.log('isWx = true');
        this.isWx = true;
        this.isWx = false;

      } else {
        // console.log('isWx = false');
        this.isWx = false;
        
        // this.init();
      }
    },

    init() {
      document.title = "一对一视频";

      let _this = this;
      // window.navigator.getUserMedia =
      //   window.navigator.getUserMedia ||
      //   window.navigator.webkitGetUserMedia ||
      //   window.navigator.mozGetUserMedia ||
      //   window.navigator.msGetUserMedia;

      // if (window.navigator.mediaDevices === undefined) {
      //     window.navigator.mediaDevices = {};
      // }
      // if (window.navigator.mediaDevices.getUserMedia === undefined) {
      //     window.navigator.mediaDevices.getUserMedia = function (constraints) {
      //     var getUserMedia = window.navigator.getUserMedia = window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia || window.navigator.msGetUserMedia || window.navigator.oGetUserMedia;
      //   if (!getUserMedia) {
      //       return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
      //   }
      //   return new Promise(function (resolve, reject) {
      //     getUserMedia.call(window.navigator, constraints, resolve, reject);
      //   });
      //   }
      // }

      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          var getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia ||
            navigator.oGetUserMedia;
          if (!getUserMedia) {
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }

      if (navigator.getUserMedia) {
        // util.success("支持");
        // http://www.voidcn.com/article/p-clazbexv-bwr.html
        navigator.getUserMedia(
          { video: true, audio: true },
          function onSuccess(stream) {
            // if(!_this.$route.query.roomToken){
            //   return util.error("房间token不存在");
            // }
            // console.log(_this.$route.query.roomToken,"已点击允许,开启成功");
            _this.roomName = _this.$route.query.roomName;
            _this.roomToken = _this.$route.query.roomToken;
            _this.roomUserId = _this.$route.query.roomUserId;
            // 调用临时 生成访客地址
            _this.fff();
            // 进入房间
            _this.handleGoVideo();
          },
          function onError(error) {
            util.error("摄像机拒绝访问");
            console.log("错误：", error);
          }
        );
        // 支持
      } else {
        util.error("不支持");
        // 不支持
      }
    },

    // 进入房间
    handleGoVideo() {
      (async () => {
        const myRTC = new QNRTC.QNRTCSession(); // 初始化我们的 SDK (QNRTC的引入方式见上)
        this.page.myRTC = myRTC;
        // console.log(this.page.myRTC == myRTC, "----===");
        try {
          console.log(this.roomToken, "22222");
          const users = await myRTC.joinRoomWithToken(this.roomToken); // 加入房间
          this.page.users = users;

          if (users.length > 2) {
            myRTC.leaveRoom();
            alert("房间人数已满！");
            return;
          }
          // 采集本地媒体流，视频和音频都采集
          const stream = await QNRTC.deviceManager.getLocalStream({
            video: { enabled: true, width: 640, height: 480, bitrate: 600 },
            audio: { enabled: true, bitrate: 32 },
            // video: { enabled: true },
            // audio: { enabled: true },
          });

          // 获取我们 room.html 中准备用来显示本地媒体流的元素
          // const localPlayer = document.getElementById("localplayer");
          const localPlayer = document.getElementById("remoteplayer");

          // 调用媒体流的 play 方法，在我们指定的元素上播放媒体流，其中第二个参数代表 静音播放
          stream.play(localPlayer, true);

          // 发布刚刚采集到的媒体流到房间
          await myRTC.publish(stream);

          window.onbeforeunload = () => {
            myRTC.leaveRoom();
          };

          // {#const users = await myRTC.joinRoomWithToken(roomToken);#}
          // console.log("joinRoom success! 当前房间用户：", users);
          // 监听房间里的用户发布事件，一旦有用户发布，就订阅他
          myRTC.on("user-publish", (user) => {
            this.subscribeUser(myRTC, user);
          });
          // 判断房间当前的用户是否有可以订阅的
          for (let i = 0; i < users.length; i += 1) {
            const user = users[i];
            // 如果当前房间的用户不是自己并且已经发布
            // 那就订阅他
            if (user.published && user.userId !== myRTC.userId) {
              this.subscribeUser(myRTC, user);
            }
          }

          // 因为 await 的特性，当代码执行到这里的时候，joinRoomWithToken 这个异步请求已经完成
          // 如果过程中出现错误，会直接 throw 出来，如果需要处理只要 try/catch 就好
          // 这里的 users 表示该房间中已经存在的用户，具体可以参照 API 文档
          // 你也随时可以通过 myRTC.users 获取当前的用户列表
          // console.log("current users", users);
        } catch (e) {
          // 加入房间失败，关于错误处理可以参考下文的 错误处理 一节
          console.log("join room error!", e);
        }
      })();
    },

    // 订阅函数
    subscribeUser(myRTC, user) {
      // 如果用户没有发布就直接返回
      if (!user.published) {
        return;
      }
      // 注意这里订阅使用了 Promise 的写法而没有用 async/await
      // 因为在我们 Demo 中并没有依赖订阅这个操作的后续操作
      // 即没有操作必须等到订阅操作结束之后再运行
      myRTC
        .subscribe(user.userId)
        .then((remoteStream) => {
          // 我们在 room 页面上准备用来显示远端媒体流的元素
          // const remotePlayer = document.getElementById("remoteplayer");
          const remotePlayer = document.getElementById("localplayer");
          // 在我们准备的元素上播放远端媒体流
          remoteStream.play(remotePlayer);
        })
        .catch((e) => {
          console.log("subscribe error!", e);
        });
    },

    switchScreen() {
      const localPlayer = document.getElementById("localplayer");
      const remotePlayer = document.getElementById("remoteplayer");
      // 交换 2 个元素的 class
      if (localPlayer.className === "mini-player") {
        localPlayer.className = "fullscreen-player";
        remotePlayer.className = "mini-player";
      } else {
        localPlayer.className = "mini-player";
        remotePlayer.className = "fullscreen-player";
      }
    },

    // 临时 生成访客地址
    fff(myRTC, user) {
      let num = Date.parse(new Date());
      let params = {
        roomName: this.roomName,
        userId: num,
      };
      Api.getRoomTwoToken(params)
        .then((res) => {
          let { code, data, msg, total } = res;
          if (code == 200) {
            let str =
              "http://localhost:9000/OneOnOneVideo?roomName=" +
              data.roomName +
              "&roomToken=" +
              data.roomToken +
              "&roomUserId=" +
              this.roomUserId;
            return console.log(str, "本地开发生成远程订阅地址");
          }
        })
        .catch((err) => {});
    },

    browerStatus() {
      var that = this;
      console.log("浏览器刷新 || 关闭了");
      that.page.myRTC.leaveRoom();
    },

    // 开始面谈按钮
    handleClickStart() {
      this.isStart = !this.isStart;
    },
    // 1静音, 2关闭屏幕
    // https://developer.qiniu.com/rtn/sdk/4420/qnrtcsession-room-management#8
    handleMute(status) {
      // 默认静音
      status = status ? status : 1;
      // 静音
      if (status == 1) {
        this.myMute = !this.myMute;
        // this.page.myRTC.mute(this.myMute);
      }
      // 黑屏
      if (status == 2) {
        this.myFrame = !this.myFrame;
        // this.page.myRTC.mute(this.myMute, this.myFrame);
      }
      this.page.myRTC.mute(this.myMute, this.myFrame);
    },

    // 关闭按钮
    handleclose() {
      if (confirm("您确定要退出面谈吗？")) {
        // this.$router.push({
        //   name: "OneOnOneClose",
        //   query: {
        //     roomName: this.roomName,
        //     roomToken: this.roomToken,
        //     roomUserId: this.roomUserId,
        //   },
        // });

        this.$router.go(0);

        // console.log("关闭");
        // this.browerStatus();
        // this.isStart = !this.isStart;
        // this.page.myRTC.leaveRoom();
        // window.opener = null;
        // window.open("", "_self");
        // window.close();
      } else {
        console.log("取消");
      }
    },
  },

  // beforeRouteLeave(to, from, next) {
  //   this.page.myRTC.leaveRoom();

  //   next();
  // },
  mounted() {
    let that = this;
    // 监听浏览器是否关闭
    window.addEventListener("beforeunload", (e) => that.browerStatus());
  },
  computed: {},
};
</script>
<style lang="scss">
// .OneOnOneVideo {}
</style>
<style lang="scss" scoped>
.OneOnOneVideo {
  position: relative;

  background-color: #efefef;
  min-height: 100%;
  .text {
    height: 100vh;
    text-align: center;
    line-height: 2rem;
  }

  .mini-player {
    position: absolute;
    right: 0;
    top: 37vh;
    width: 26vw;
    height: 13vh;
    background: #000;
    // border: 1px solid #fff;
    // border-radius: 5px;
  }
  .fullscreen-player {
    width: 100vw;
    height: 50vh;
    background: #000;
  }
  .sizeBtn {
    position: absolute;
    right: 0;
    top: 0;
  }
  .startBtn {
    display: inline-block;
    margin-top: 14vh;
    padding: 0.5rem 0.3rem;
    background-color: #e29638;
    border-color: #bbbbbb;
    color: white;
    border-radius: 0.1rem;
    font-size: 0.21rem;
    text-align: center;
    line-height: 0.3rem;
    font-weight: bold;
    opacity: 1;
  }
  .center {
    text-align: center;
    .van-button {
      margin: 0.02rem 0.05rem;
    }
  }

  .van-button--info.red {
    color: #fff;
    background-color: red;
    border: 1px solid red;
  }
}
</style>