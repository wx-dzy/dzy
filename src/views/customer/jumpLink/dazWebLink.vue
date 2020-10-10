// 跳转pc管理端  r_templaName
<template>
  <div class="dazWebLink">
    <div v-if="isWeiXin">
      <p class="padding10 center">
        该功能因在PC端操作更方便，请使用微信PC端打开该页面，并授权跳转到浏览器上进行操作。
      </p>
      <h3 class="padding5">跳转失败，如何用电脑打开？</h3>
      <p class="padLeft5">方法一 电脑访问网址：</p>
      <p class="padLeft5">
        <!-- <a :href="srcUrl" class="cGreen">{{ srcUrl }}</a> -->
        <van-button
          type="info"
          loading-type="spinner"
          loading-text="http://platform.dzy315.com"
          class="startBtn"
          size="small"
          @click="handleClickStart"
          >{{ srcUrl }}</van-button
        >
      </p>
      <p class="padLeft5">方法二 点击右上角，选择浏览打开</p>
    </div>
  </div>
</template>

<script>
import { util } from "@/utils";

export default {
  name: "dazWebLink",
  components: {},
  data() {
    return {
      srcUrl: "http://platform.dzy315.com",
      isWeiXin: false,
    };
  },

  watch: {},

  created() {
    this.isFromWeiXin();
  },

  methods: {
    isFromWeiXin() {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWeiXin = true;
      }
      this.isWeiXin = false;
      this.handleClickStart();
    },
    handleClickStart() {
      // window.open(this.srcUrl);
      window.location.href = this.srcUrl;
    },
  },

  computed: {},

  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
.dazWebLink {
  padding: 1rem 0.2rem;
  font-size: 0.32rem;
  .center {
    text-align: center;
  }
  .padding10 {
    padding: 1rem 0;
  }
  .padding5 {
    padding: 0.5rem 0;
  }
  .padLeft5 {
    padding-left: 0.5rem;
    line-height: 0.8rem;
  }
  .cGreen {
    color: forestgreen;
  }
  .van-button--info {
    color: forestgreen;
    line-height: 0.32rem;
    height: 0.32rem;
    font-size: 0.32rem;
    background-color: #fff;
    border: 1px solid #fff;
  }
}
</style>

