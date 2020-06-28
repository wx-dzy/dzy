<template>
  <div class="exact_information">
    <!-- <div>
      <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
        <van-swipe-item style="width:100%;height: 800px">
          <img
            style="width: 100%;height: 100%"
            src="../../../../assets/images/exhibitor/background-image.png"
            alt
          />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div style="overflow-x: scroll;width: 100%">
      <ul
        style="display: flex;justify-content: space-around;margin-top: 5px;width: 120%;height: 60px"
      >
        <li v-for="(item,key) in image" :key="key">
          <img style="width: 50px;height: 50px" :src="item.img" alt />
        </li>
      </ul>
    </div>
    <div style="display: flex;justify-content:space-around;margin-top: 10px">
      <van-button
        type="default"
        style="width: 150px;height: 40px;border-radius: 10px;border: 1px solid #000;background-color: #fff;text-align: center;letter-spacing: 10px;"
      >分享</van-button>
      <van-button
        type="default"
        style="width: 150px;height: 40px;border-radius: 10px;border: 1px solid #000;background-color: orange;letter-spacing: 10px;"
      >下载</van-button>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "exact_information",
  data() {
    return {
      // image: [
      //   {
      //     img: require("")
      //   },
      //   {
      //     img: require("../../../../assets/images/logo1.jpg")
      //   },
      //   {
      //     img: require("../../../../assets/images/logo1.jpg")
      //   },
      //   {
      //     img: require("../../../../assets/images/logo1.jpg")
      //   },
      //   {
      //     img: require("../../../../assets/images/logo1.jpg")
      //   },
      //   {
      //     img: require("../../../../assets/images/logo1.jpg")
      //   }
      // ]
    };
  },

  created() {},
  components: {
    // [Swipe.name]: Swipe,
    // [SwipeItem.name]: SwipeItem,
    // [Button.name]: Button
  },
  methods: {}
};
</script>

<style lang='scss' scoped>
.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
</style>
