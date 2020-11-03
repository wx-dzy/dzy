// 分享 组件
<template>
  <div class="shareTemp">
    <van-button class="submit" @click="getWxJsConfig">分享</van-button>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import * as Api from "@/api/customer/components";

export default {
  props: ["shareData"],

  data() {
    return {
      localIds: "",
    };
  },
  components: {},

  watch: {
    _src(newVal, oldVal) {
      console.log(newVal);
      if (newVal) {
        this.$emit("update:imgSrc", this._src);
      }
    },
  },
  created() {
    this._src = Object.assign([], this.imgSrc);
    // this.getWxJsConfig();
  },
  methods: {
    handleClick(url) {
      this.$router.push({
        name: url,
      });
    },

    // 获取微信配置
    getWxJsConfig() {
      let _this = this;
      let params = {
        // url: this.shareData.link,
        url: window.location.href,

      };
      Api.getAppId(params)
        .then((res) => {
          const { code, data, msg, total } = res;
          if (code == 200) {
            wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: data.timestamp, // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名
              jsapi_ticket: data.jsapi_ticket,
              jsApiList: [
                "checkJsApi",
                "chooseImage",
                "uploadImage",
                "previewImage",
              ], // 必填，需要使用的JS接口列表
            });
            wx.ready(function () {
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
              // 分享
              this.handleShare();
            });
            wx.error(function (res) {
              console.log("config失败", res); // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
            });
          } else {
            _this.$toast("获取签名失败");
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    },

    // 分享
    handleShare() {
      let _this = this;
      //需在用户可能点击分享按钮前就先调用
      wx.updateAppMessageShareData({
        title: _this.shareData.title, // 分享标题
        desc: _this.shareData.desc, // 分享描述
        link: _this.shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        // imgUrl: _this.shareData.imgUrl, // 分享图标
        imgUrl: window.location.href, // 分享图标

        success: function () {
          util.success('分享成功');
        },
        cancel: function () {
          util.success('取消分享');
        }
      });
    },

    

    
  },
  computed: {},
};
</script>
<style lang="scss">
.shareTemp {
}
</style>
<style lang="scss" scoped>
.shareTemp {
}
</style>