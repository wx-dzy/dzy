// 企业产品目录-产品详情  http://localhost:9000/products_details?goodsId=1275702956557078530
// http://127.0.0.1:9000/products_details?goodsId=1308683492432171009
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
          <van-swipe-item
            v-for="(image, index) in detail.goodsImagesList"
            :key="index"
          >
            <!-- <router-link :to="{'path':'personal'}"> -->
            <div v-if="image.mediaType" class="itemImg">
              <Video-Demo
                :_id="image.id"
                :src="image.videoUrl"
                :playVideoId.sync="playVideoId"
                style="width: 100%"
              />
            </div>
            <img v-else :src="image.mediaUrl" alt />

            <!-- </router-link> -->
          </van-swipe-item>
        </van-swipe>

        <div class="contwrap">
          <van-row class="head border pad22">
            <h2 class="title">{{ detail.goodsBaseInfo.goodsName }}</h2>

            <van-col span="19">
              <p>品 牌：{{ detail.goodsBaseInfo.brandName }}</p>
              <p>订货号：{{ detail.goodsBaseInfo.orderNo }}</p>
              <p v-if="detail.goodsBaseInfo.goodsPrice.toString().length">
                商品价格：{{ detail.goodsBaseInfo.goodsPrice + "元" || "" }}
              </p>
            </van-col>
            <van-col span="10" v-show="detail.goodsBaseInfo.minOrderQuantity">
              <p>起订量：{{ detail.goodsBaseInfo.minOrderQuantity }}</p>
            </van-col>
            <van-col span="14" v-show="detail.goodsBaseInfo.manufacturerModel">
              <p>制造商编号：{{ detail.goodsBaseInfo.manufacturerModel }}</p>
            </van-col>
            <!-- <van-col span="5" class="shareBtn text-right">
              <van-button
                round
                size="small"
                color="#F8D57E"
                @click="handeGetData"
              >
                <span class="icon iconfont yz-fenxiang1"></span>
                分享
              </van-button>
            </van-col> -->
            <van-col span="24" class="padding0">
              <van-field name="stepper" label-width="50" label="数量：">
                <template #input>
                  <van-stepper v-model="detail.goodsBaseInfo.quantity" :min="detail.goodsBaseInfo.minOrderQuantity" />
                </template>
              </van-field>
            </van-col>
          </van-row>

          <van-row v-if="detail.attributeList" class="border pad22">
            <!-- <h2 class="title">参数</h2> -->
            <van-row v-for="(item, index) in detail.attributeList" :key="index">
              <van-col span="7" class="text-right bold"
                >{{ item.key }}：</van-col
              >
              <van-col span="17">{{ item.value }}</van-col>
            </van-row>
          </van-row>
          <!-- {{ detail.skuAttributeList }} -->
          <van-row v-if="detail.skuAttributeList" class="border pad22">
            <!-- <h2 class="title">销售属性</h2> -->
            <van-row
              v-for="(item, index) in detail.skuAttributeList"
              style="margin-bottom: 0.1rem"
              :key="index"
            >
              <van-col span="7" class="text-right"
                >{{ item.attributeName }}：</van-col
              >
              <van-col span="17">
                <!-- {{item.active}} -->
                <van-radio-group
                  v-model="item.active"
                  direction="horizontal"
                  @change="handleGetPrice"
                >
                  <van-radio
                    v-for="obj in item.valueList"
                    :key="obj.key"
                    :name="obj.key"
                    shape="square"
                    class="className"
                    :class="obj.key == item.active ? 'checkClassName' : ''"
                    >{{ obj.value }}</van-radio
                  >
                  <!-- <van-radio :name="obj.key" shape="square">单选框 2</van-radio> -->
                </van-radio-group>
              </van-col>
            </van-row>
            <!-- {{ checkbj }} -->

            <h2 class="title cred">
              价格：
              <span class>{{ price ? price + "元" : "" }}</span>
            </h2>
          </van-row>

          <!-- {{detail.skuAttributeList}} -->
          <van-row class="border" v-if="detail.goodsIntroductionList.length">
            <h2 class="title">产品详情</h2>
            <van-col
              span="24"
              v-for="(item, index) in detail.goodsIntroductionList"
              :key="index"
            >
              <div v-if="item.mediaType" class="itemImg">
                <Video-Demo
                  :_id="item.id"
                  :src="item.videoUrl"
                  :playVideoId.sync="playVideoId"
                  style="width: 100%"
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
            <!-- <van-goods-action-button
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
            -->

            <van-goods-action-button
              color="#F8D57E"
              type="warning"
              text="加入购物车"
              @click="handleAddShopping"
            />
            <van-goods-action-button
              color="#F8D57E"
              type="danger"
              text="购物车"
              @click="handleToShopping"
            />
          </van-goods-action>
        </div>
      </div>
      <!-- 占位图 -->
      <img
        v-if="!detail.goodsBaseInfo && !refreshing"
        src="@/assets/images/nullImgText.png"
        style="width: 2.6rem; margin: 1.4rem 2rem"
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
import * as _Api from "@/api/customer/shoppingCart";

import VideoDemo from "@/components/customer/videoPlay/index.vue";
// import visitingCard from "@/components/customer/visitingCard.vue";

export default {
  name: "products_details",
  components: {
    VideoDemo,
  },
  data() {
    return {
      playVideoId: "",
      // 商品di
      goodsId: "",
      detail: {
        // 轮播
        goodsImagesList: [],
        // 参数
        goodsSpecificationList: [],
        // 产品详情图片列表
        goodsIntroductionList: [],
      },
      // 当前选中的参数 （预留后续操作）
      checkbj: {},
      // 当前价格
      price: "",
      refreshing: false,
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
        .then((res) => {
          let { code, msg, data, total } = res;
          // 上拉刷新  完成
          this.refreshing = false;
          util.hideLoading();
          if (code == 200) {
            data.skuAttributeList.forEach((ele) => {
              ele.active = "";
            });
            this.detail = data;
            // 查找动态价格
            this.handleGetPrice();
            // this.detail.goodsBaseInfo.goodsPrice = ''
          }
        })
        .catch((err) => {
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
          enterpriseExhibitorsId: this.detail.goodsBaseInfo.enterpriseId,
        },
      });
    },

    // 查找动态价格
    handleGetPrice() {
      this.detail.skuList;
      let pvIds = [];
      // let pvIds =  "7:18,8:15"
      let checkArr = this.detail.skuAttributeList.filter(
        (ele) => ele.active != ""
      );
      // console.log(checkArr, "checkArr");
      checkArr.forEach((ele) => {
        // if(ele.)
        let str = ele.id + ":" + ele.active;
        pvIds.push(str);
      });
      let checkbj = this.detail.skuList.find(
        (item) => item.pvIds == pvIds.toString()
      );
      // console.log(checkbj, "checkbj");
      // 当前选中参数
      this.checkbj = checkbj ? checkbj : {};

      this.price = checkbj
        ? checkbj.price
        : this.detail.goodsBaseInfo.minGoodsPrice +
          " ~~ " +
          this.detail.goodsBaseInfo.maxGoodsPrice;
    },
    // 去下单
    handleGoshop() {
      // 正常跳转
      // let param = [];
      // param.push(this.detail.goodsBaseInfo.id);
      if (!this.checkbj.id) {
        return this.$toast("请选择商品属性！！");
      }

      // 上传询价单唯一入口
      this.$router.push({
        name: "products_uploadInquiry",
        query: {
          // 商品id数组
          // goodsIds: JSON.stringify(param),
          goodsIds: this.checkbj.id,
        },
      });
    },

    // 添加购物车
    handleAddShopping() {
      if (!this.checkbj.id) {
        return this.$toast("请选择商品属性！！");
      }
      let params = {
        // 产品id
        productId: this.checkbj.id,
        // 产品数量
        quantity: this.detail.goodsBaseInfo.quantity,
      };
      // debugger;
      util.showLoading();
      _Api.addShopping(params)
        .then((res) => {
          let { code, msg, data, total } = res;
          util.hideLoading();
          if (code == 200) {
            this.$toast("添加成功！！");
          }
        })
        .catch((err) => {
          util.hideLoading();
        });
    },

    // 去购物车
    handleToShopping() {
      this.$router.push({
        name: "shoppingCart",
        query: {},
      });
    },
    // 索取产品资料
    handeGetData() {
      let param = [];
      param.push(this.detail.goodsBaseInfo.id);
      util.info("敬请期待！！");
    },
  },

  computed: {},

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  },
};
</script>
<style lang="scss">
.products_details {
  .van-radio__icon {
    display: none;
  }
  .className {
    cursor: pointer;
    background-color: rgb(218, 222, 224);
    border: none;
    border-radius: 0.2rem;
    font-size: 0.26rem;
    padding: 0;
    text-align: center;
    line-height: 0.3rem;
    font-weight: bold;
    font-style: normal;
    opacity: 1;
    .van-radio__label {
      margin: 0 !important;
      padding: 0 0.2rem;
      color: rgb(99, 105, 108);
    }
  }

  .checkClassName {
    background-color: rgb(241, 212, 212);
    border-color: rgb(239, 190, 34);
    border-width: 0.02rem;
    border-style: solid;
    .van-radio__label {
      color: rgb(235, 124, 7);
    }
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./products.scss";
.products_details {
  padding-bottom: 0.4rem;
  .contwrap .cred {
    color: rgb(235, 124, 7);
  }
  .bold {
    font-weight: bold;
  }
  .padding0 {
    .van-cell {
      padding: 0;
    }
  }
}
</style>

