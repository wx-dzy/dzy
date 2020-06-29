// 上传照片 组件
<template>
  <div class="uploaderImg">
    <van-uploader v-model="_src" :max-count="maxCount" />
  </div>
</template>

<script>
export default {
  props: ["imgSrc", "maxCount"],

  data() {
    return {
      _src: []
      //   // 上限
      //   maxCount: 1
    };
  },
  components: {},

  watch: {
    _src(newVal, oldVal) {
      console.log(newVal);
      if (newVal) {
        this.$emit("update:imgSrc", this._src);
      }
    }
  },
  created() {
    this._src = Object.assign([], this.imgSrc);
  },
  methods: {
    handleClick(url) {
      this.$router.push({
        name: url
      });
    },

    aa() {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        }
      });
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.uploaderImg {
}
</style>
<style lang="scss" scoped>
.uploaderImg {
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