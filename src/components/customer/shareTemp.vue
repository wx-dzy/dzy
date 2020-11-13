// 分享 组件 https://blog.csdn.net/qq_38705449/article/details/103525504?utm_source=app
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
      console.log(encodeURIComponent(window.location.href));
      let _this = this;
      let params = {
        // url: this.shareData.link,
        url: encodeURIComponent(window.location.href),
        // url: window.location.href,
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
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ",
                "onMenuShareWeibo",
                "onMenuShareQZone",
                "showMenuItems",
              ], // 必填，需要使用的JS接口列表
            });
            wx.ready(function () {
              // wx.checkJsApi({
              //   jsApiList: [
              //     "onMenuShareTimeline",
              //     "onMenuShareAppMessage",
              //     "onMenuShareQQ",
              //     "onMenuShareWeibo",
              //     "onMenuShareQZone",
              //     "showMenuItems",
              //   ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
              //   success: function (res) {
              //     // 如：{"checkResult":{"onMenuShareQQ":true},"errMsg":"checkJsApi:ok"}
              //   },
              // });
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
              // 分享
              this.handleShare();
            });
            wx.error(function (res) {
              _this.$toast(res, "config失败");

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
      util.success("进入分享函数");

      wx.showMenuItems({
        menuList: [
          "menuItem:share:appMessage",
          "menuItem:share:timeline",
          "menuItem:share:qq",
          "menuItem:favorite",
        ], // 要显示的菜单项，所有menu项见附录3
      });

      return;

      let _this = this;
      // wx.updateTimelineShareData({
      // 2.1 监听“分享给朋友”，按钮点击、自定义分享内容及分享结果接口
      wx.onMenuShareAppMessage({
        // title: _this.shareData.title, // 分享标题
        // desc: _this.shareData.desc, // 分享描述

        title: "请查看详情吧！！", // 分享标题
        desc: "分享描述怎么写？请自己设定吧", // 分享描述
        link: _this.shareData.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        // imgUrl: _this.shareData.imgUrl, // 分享图标
        imgUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1605263246096&di=5d71d3f0ed7549a67fdee635d8fe926c&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F37d12f2eb9389b50ce7fd7718435e5dde7116e14.jpg", // 分享图标

        success: function () {
          util.success("分享成功");
        },
        cancel: function () {
          util.success("取消分享");
        },
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