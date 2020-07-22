// 企业产品目录-产品详情  http://localhost:9000/products_details?goodsId=1275702956557078530
<template>
  <div class="products_details">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="handleGetDetail">
      <div v-if="detail.goodsBaseInfo">
        <!-- 轮播 -->
        <van-swipe
          v-if="detail.goodsImagesList.length"
          class="my-swipe"
          :autoplay="10000"
          indicator-color="white"
        >
          <van-swipe-item v-for="(image, index)  in detail.goodsImagesList" :key="index">
            <!-- <router-link :to="{'path':'personal'}"> -->
            <div v-if="image.mediaType" class="itemImg">
              <Video-Demo
                :_id="image.id"
                :src="image.videoUrl"
                :playVideoId.sync="playVideoId"
                style="width: 100%;"
              />
            </div>
            <img v-else :src="image.mediaUrl" alt />

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
            <van-col span="12" v-show="detail.goodsBaseInfo.minOrderQuantity">
              <p>起订量：{{ detail.goodsBaseInfo.minOrderQuantity  }}</p>
            </van-col>
            <van-col span="12" v-show="detail.goodsBaseInfo.manufacturerModel">
              <p>制造商编号：{{ detail.goodsBaseInfo.manufacturerModel  }}</p>
            </van-col>
            <van-col span="5" class="shareBtn text-right">
              <van-button round size="small" color="#F8D57E" @click="handeGetData">
                <span class="icon iconfont yz-fenxiang1"></span>
                分享
              </van-button>
            </van-col>
          </van-row>

          <van-row v-if="detail.goodsSpecificationList.length" class="border pad22">
            <h2 class="title">参数</h2>
            <van-row v-for="(item,index) in detail.goodsSpecificationList" :key="index">
              <van-col span="6">{{ item.name}}</van-col>
              <van-col span="18">{{ item.values}}</van-col>
            </van-row>
          </van-row>

          <van-row class="border" v-if="detail.goodsIntroductionList.length">
            <h2 class="title">产品详情</h2>
            <van-col span="24" v-for="(item,index) in detail.goodsIntroductionList" :key="index">
              <div v-if="item.mediaType" class="itemImg">
                <Video-Demo
                  :_id="item.id"
                  :src="item.videoUrl"
                  :playVideoId.sync="playVideoId"
                  style="width: 100%;"
                />
              </div>
              <img v-else :src="item.mediaUrl" alt class="itemImg" />
            </van-col>
          </van-row>

          <van-goods-action class="footer">
            <!-- <van-goods-action-icon icon="icon iconfont yz-shangjia" text="商家" /> -->
            <van-goods-action-icon
              icon="icon iconfont yz-suoquyangpin"
              text="索取样品"
              @click="handleBtnDetail"
            />
            <van-goods-action-button
              color="#F8D57E"
              type="warning"
              text="去询价/下单"
              @click="handleGoshop"
            />
            <van-goods-action-button
              color="#F8D57E"
              type="danger"
              text="索取产品资料"
              @click="handeGetData"
            />
          </van-goods-action>
        </div>
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
    },

    // 上拉刷新
    onRefresh() {
      this.handleGetDetail();
    },

    // 索取样品
    handleBtnDetail() {
      this.$router.push({
        name: "exact_information",
        query: {
          // 展会参展商id
          enterpriseExhibitorsId: this.detail.goodsBaseInfo.enterpriseId
        }
      });
    },

    // 去下单
    handleGoshop() {
      // 临时跳转
      // window.location.href =
      //   "http://121.196.122.19/hlwl_wexin/uploadInquiry/order/tobeQuoted.html";

      window.location.href = `http://121.196.122.19/hlwl_wexin/uploadInquiry/order/details.html?inquiryId=1243&status=2&goodsName=${this.detail.goodsBaseInfo.goodsName}`;

      return;
      let param = [];
      param.push(this.detail.goodsBaseInfo.id);

      // 正常跳转
      this.$router.push({
        name: "products_uploadInquiry",
        query: {
          // 商品id数组
          goodsIds: JSON.stringify(param)
        }
      });
    },
    // 索取产品资料
    handeGetData() {
      let param = [];
      param.push(this.detail.goodsBaseInfo.id);
      util.info("敬请期待！！");
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

