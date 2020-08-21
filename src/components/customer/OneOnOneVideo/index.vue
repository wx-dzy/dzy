// 一对一视频组件 创建房间 页面  https://www.jb51.net/article/173816.htm
// https://blog.csdn.net/u013210620/article/details/82345897#%E5%A4%A7%E5%B0%8F%E7%AA%97%E5%88%87%E6%8D%A2
<template>
  <!-- <div class="OneOnOneVideo footerPad"> -->
  <div class="OneOnOneVideo">
    <div v-if="!isWx">
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
      >大小窗切换</van-button>
    </div>
    <div v-else class="text">请点击右上角，选择使用浏览器打本页面</div>
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
    };
  },

  watch: {},
  created() {
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
        console.log(11);
        this.isWx = true;
        // return true;
      } else {
        console.log(222);

        this.isWx = false;
        this.init();
        // return false;
      }
    },
    init() {
      let _this = this;
      window.navigator.getUserMedia =
        window.navigator.getUserMedia ||
        window.navigator.webkitGetUserMedia ||
        window.navigator.mozGetUserMedia ||
        window.navigator.msGetUserMedia;

      if (window.navigator.getUserMedia) {
        // util.success("支持");
        // http://www.voidcn.com/article/p-clazbexv-bwr.html
        window.navigator.getUserMedia(
          { video: true, audio: true },
          function onSuccess(stream) {
            console.log("已点击允许,开启成功");
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
}
</style>