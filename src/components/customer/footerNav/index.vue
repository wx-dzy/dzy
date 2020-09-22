// 底部导航 组件
<template>
  <div class="footerNav">
    <van-tabbar v-model="_active" active-color="#313437" inactive-color="#C8CCD3">
      <van-tabbar-item
        v-for="(item, index) in navList"
        :key="index"
        :name="item.name"
        :icon="item.ico"
        @click="handleClick(item.path)"
      >{{item.lable}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  props: ["active"],

  data() {
    return {
      _active: "",
      navList: [
        {
          ico: "home-o",
          name: "home",
          // lable: "会展",
          lable: "招采",
          // 路由
          path: "home"
        },
        {
          ico: "icon iconfont yz-ziyuan",
          name: "search",
          lable: "资源",
          // 路由
          path: "resources"
        },
        {
          ico: "icon iconfont yz-zuzhijiagou",
          name: "list",
          lable: "列表",
          // 路由
          path: ""
        },
        {
          ico: "icon iconfont yz-wode",
          name: "personal",
          lable: "我",
          // 路由
          path: "personal"
        },
        //  {
        //   ico: "icon iconfont yz-zuzhijiagou",
        //   name: "OneOnOneVideo",
        //   lable: "一对一视频",
        //   // 路由
        //   path: "OneOnOneVideo"
        // }
      ]
    };
  },
  components: {},

  watch: {
    // 'active': {
    //   deep: true,
    //   handler(newOptions, oldOptions) {
    //     console.log(newOptions);
    //     if (newOptions) {
    //     }
    //   }
    // }
  },
  created() {
    this._active = this.active;
  },
  methods: {
    handleClick(url) {
      if (!url) {
        return (window.location.href =
          "https://www.dzy315.com/hlwl_wexin/userManager.html?username=huangzb&telephone=17601001098");
      }
      this.$router.push({
        name: url
      });
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.footerNav {
}
</style>
<style lang="scss" scoped>
.footerNav {
  .van-tabbar--fixed {
    height: 1.8rem;
    .van-tabbar-item {
      font-size: 0.24rem;
      color: rgba(49, 52, 55, 1);
      line-height: 0.34rem;
    }
  }
}
</style>