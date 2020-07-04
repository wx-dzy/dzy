// 播放器 组件  https://www.jb51.net/article/173816.htm
<template>
  <div v-if="_id && src" class="videoPlayerContainer">
    <div class="player">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        :playsinline="true"
        :options="playerOptions"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @timeupdate="onPlayerTimeupdate($event)"
      />
    </div>
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
export default {
  // playVideoId 当前播放的 id
  props: ["_id", "playVideoId", "src", "bannerIMG"],

  data() {
    return {
      playerOptions: {
        // playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            // src: require("@/assets/images/video1.mp4") // url地址
            src: ""
          }
        ],
        //你的封面地址
        poster: "",
        // poster:
        //   "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1006505744,1102951372&fm=26&gp=0.jpg",
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  components: {
    videoPlayer
  },

  watch: {
    // playVideoId(newVal, oldVal) {
    //   console.log(newVal, "watch");
    //   if (newVal != this._id) {
    //     this.$refs.videoPlayer.player.pause(); // 暂停
    //   } else {
    //     // this.$refs.videoPlayer.player.play(); // 播放
    //   }
    // }
  },
  created() {
    // 赋值地址 海报
    this.playerOptions.sources[0].src = this.src;
    this.playerOptions.poster = this.bannerIMG;
  },
  methods: {
    // 播放
    onPlayerPlay(player) {
      // console.log(this._id, "play");
      this.$emit("update:playVideo-id", this._id);
      // this.$emit("update:", this._id);
      // this.$refs.videoPlayer.player.play(); // 播放
    },
    // 暂停
    onPlayerPause(player) {
      console.log("暂停");
    },
    // 当前播放位置发生变化时触发。
    onPlayerTimeupdate(player) {
      // console.log(player);
      // this.$refs.videoPlayer.player.play(); // 播放
      // this.$refs.videoPlayer.player.src(src); // 重置进度条
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  }
};
</script>
<style lang="scss">
.videoPlayerContainer {
  .video-js .vjs-big-play-button {
    /* 播放按钮换成圆形 */
    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;
    margin-left: -1em;
  }
  .vjs-poster {
    // background: #000 url(https://org.modao.cc/uploads4/images/4612/46122644/v2_q7op1z.jpg) no-repeat 0 0;
    background-size: calc(100% + 1px) 100%;
  }

  // 小尺寸适配
}
.videoPlayerContainer.zoom {
  .video-js .vjs-control-bar {
    zoom: 0.6;
  }
  .video-js .vjs-big-play-button {
    zoom: 0.7;
  }
  .video-js .vjs-play-progress:before {
    top: -0.62em;
  }
  // 全屏恢复 底部大小
  .video-js.vjs-fullscreen {
    .vjs-control-bar {
      zoom: 1;
    }
    .vjs-play-progress:before {
      top: -0.3em;
    }
  }
}
</style>
<style lang="scss" scoped>
.videoPlayerContainer {
  background-color: #efefef;
  min-height: 100%;
}
</style>