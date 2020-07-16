// 企业产品目录-产品详情  http://localhost:9000/products_details?goodsId=1275702956557078530
<template>
  <div class="products_details">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <!-- 轮播 -->
      <van-swipe
        v-if="detail.goodsImagesList.length"
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
      >
        <van-swipe-item v-for="(image, index)  in detail.goodsImagesList" :key="index">
          <!-- <router-link :to="{'path':'personal'}"> -->
          <img :src="image.mediaUrl" alt />
          <!-- </router-link> -->
        </van-swipe-item>
      </van-swipe>

      <div class="contwrap">
        <van-row class="head border pad22">
          <h2 class="title">{{ detail.goodsBaseInfo.goodsName}}</h2>

          <van-col span="19">
            <p>品 牌：{{ detail.goodsBaseInfo.brandName }}</p>
            <p>订货号：{{ detail.goodsBaseInfo.orderNo }}</p>
          </van-col>
          <van-col span="5" class="shareBtn text-right">
            <van-button round size="small" color="#F8D57E">
              分享1</van-button>
          </van-col>
        </van-row>

        <van-row v-if="detail.goodsSpecificationList.length" class="border pad22">
          <h2 class="title">参数</h2>
          <van-row v-for="(item,index) in detail.goodsSpecificationList" :key="index">
            <van-col span="6">{{ item.name}}</van-col>
            <van-col span="18">{{ item.values}}</van-col>
          </van-row>
        </van-row>

        <van-row class="border pad22" v-if="detail.goodsIntroductionList.length">
          <h2 class="title">产品详情</h2>
          <van-col v-for="(item,index) in detail.goodsIntroductionList" :key="index">
            <Video-Demo
              v-if="item.videoUrl"
              :_id="item.id"
              :src="item.videoUrl"
              :playVideoId.sync="playVideoId"
              style="width: 100%;"
              class="zoom"
            />
            <img v-if="item.mediaUrl" :src="item.mediaUrl" alt class="itemImg" />
          </van-col>
        </van-row>

        <van-goods-action>
          <van-goods-action-icon icon="shop-o" text="商家" />
          <van-goods-action-icon icon="chat-o" text="索取样品" />
          <van-goods-action-button color="#F8D57E" type="warning" text="去下单" />
          <van-goods-action-button color="#F8D57E" type="danger" text="索取产品资料" />
        </van-goods-action>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/products";
import VideoDemo from "@/components/customer/videoPlay/index.vue";
// import visitingCard from "@/components/customer/visitingCard.vue";

export default {
  name: "products_details",
  components: {
    VideoDemo
  },
  data() {
    return {
      //
      playVideoId: "",
      // 商品di
      goodsId: "",
      detail: {
        // 轮播
        goodsImagesList: [],
        // 参数
        goodsSpecificationList: [],
        // 产品详情图片列表
        goodsIntroductionList: []
      },
      pageSize: 10,
      pageNum: 1,
      refreshing: false
    };
  },

  created() {
    this.goodsId = this.$route.query.goodsId;
    // 获取详情
    this.handleGetDetail();
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
          util.hideLoading();
          if (code == 200) {
            this.detail = data;
          }
        })
        .catch(err => {
          util.hideLoading();
          console.log(err, "err");
        });
    },

    // 上拉刷新
    onRefresh() {
      this.finished = false;
      this.pageNum = 1;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize // 每页几条数据
      };

      // 上拉刷新  完成
      this.refreshing = false;
    },

    // 查看详情
    handleLook(row) {
      this.$router.push({
        name: "personal_details",
        query: {
          // 企业id
          id: row.enterpriseId
          // title: row.enterpriseName
        }
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
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
</style>

