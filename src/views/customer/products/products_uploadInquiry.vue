// 企业产品目录-上传询价单
<template>
  <div class="products_uploadInquiry">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="handleGetDetail">
      <div v-if="1">
        企业产品目录-上传询价单 (开发区域 )





      </div>
      <!-- 占位图 -->
      <img
        v-else
        src="@/assets/images/nullImgText.png"
        style="width: 2.6rem; margin: 1.4rem 2rem;"
        class="nullImg"
        alt
      />
    </van-pull-refresh>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/products";
// import VideoDemo from "@/components/customer/videoPlay/index.vue";

export default {
  name: "products_uploadInquiry",
  components: {
    // VideoDemo
  },
  data() {
    return {
      // 商品di数组
      goodsIds: [],
      detail: {},
      refreshing: false
    };
  },

  created() {
    this.goodsIds = JSON.parse(this.$route.query.goodsIds);
    console.log(this.goodsIds, "goodsIds");
    // 获取详情
    // this.handleGetDetail();
  },
  watch: {},
  methods: {
    // 获取详情
    handleGetDetail() {
      let params = this.goodsId;
      util.showLoading();
      Api.getGoodDetailById(params)
        .then(res => {
          let { code, msg, data, total } = res;
          // 上拉刷新  完成
          this.refreshing = false;
          util.hideLoading();
          if (code == 200) {
            this.detail = data;
          }
        })
        .catch(err => {
          // 上拉刷新  完成
          this.refreshing = false;
          util.hideLoading();
          console.log(err, "err");
        });
    }
  },

  computed: {},

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./products.scss";
</style>

