<template>
  <!-- 上传询价单 -->
  <div class="products_uploadInquiry">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="handleGetDetail">
      <router-view />
      <div
        v-if="goodsIds && detail.inquiryOrderDetailDto && !refreshing"
        class="box"
      >
        <van-form @submit="saveCard">
          <div class="title">
            <span>询价单详情</span>
          </div>
          <van-field
            v-model="detail.inquiryOrderDetailDto.customer"
            name="customer"
            label="询价企业/个人:"
            maxlength="80"
            placeholder="请输入"
            required
            :rules="[{ required: true, message: '必选项不能为空！！' }]"
          />

          <van-field
            name="address"
            v-model="address"
            label="收货地址"
            placeholder="请选择省市区"
            @click="chooseAdd"
            readonly
            required
            :rules="[{ required: true, message: '必选项不能为空！！' }]"
          />

          <van-action-sheet v-model="chooseAds" title>
            <div class="content">
              <van-area
                title="请选择省市区"
                :area-list="addressList"
                class="chooseAdd"
                @confirm="confirmAdd"
                @cancel="cancelAdd"
              />
            </div>
          </van-action-sheet>

          <van-field
            v-model="detail.inquiryOrderDetailDto.addr"
            label="详细地址"
            placeholder="请输入详细地址"
            name="addr"
            required
            :rules="[{ required: true, message: '必选项不能为空！！' }]"
          />

          <van-field
            readonly
            clickable
            required
            :rules="[{ required: true, message: '必选项不能为空！！' }]"
            name="picker"
            :value="paymentName"
            label="付款方式:"
            placeholder="请选择方式"
            @click="showpaymen = true"
            right-icon="arrow-down"
          />
          <van-popup v-model="showpaymen" position="bottom">
            <van-picker
              show-toolbar
              :columns="paymentList"
              :value-key="`name`"
              @confirm="paymentListChange"
              @cancel="showpaymen = false"
            />
          </van-popup>

          <van-field
            required
            :rules="[{ required: true, message: '必选项不能为空！！' }]"
            v-model="detail.inquiryOrderDetailDto.standardName"
            name="standardName"
            label="质量标准:"
            maxlength="990"
            placeholder="请输入"
          />

          <van-field
            v-model="detail.inquiryOrderDetailDto.expectedAccountPeriod"
            type="digit"
            label="账期:"
            maxlength="200"
            placeholder="请输入"
            required
            :rules="[{ required: true, message: '必选项不能为空！！' }]"
          >
            <template #button>天 </template>
          </van-field>

          <van-field name="radio" label="账期类型:">
            <template #input>
              <van-radio-group
                v-model="detail.inquiryOrderDetailDto.accountPeriodType"
                direction="horizontal"
                required
                :rules="[{ required: true, message: '请选择' }]"
              >
                <van-radio :name="1">票到后</van-radio>
                <van-radio :name="2">货到后</van-radio>
              </van-radio-group>
            </template>
          </van-field>

          <van-field
            v-model="detail.inquiryOrderDetailDto.packRequire"
            name="packRequire"
            label="包装要求:"
            placeholder="请输入"
            :rules="[{ required: true, message: '必选项不能为空！！' }]"
          />
          <van-field
            name="remarks"
            v-model="detail.inquiryOrderDetailDto.remarks"
            label="备注:"
            placeholder="请输入备注"
            maxlength="1111"
          />

          <!-- 商品列表 -->
          <van-row
            v-for="(item, index) in detail.inquiryOrderProductAddDto"
            :key="`inquiryOrderProductAddDto${index}`"
            class="mTop10"
          >
            <div class="title">
              <span
                >询价商品{{
                  detail.inquiryOrderProductAddDto.length > 1 ? index + 1 : ""
                }}</span
              >
            </div>
            <van-field
              name="goodsName"
              v-model="item.goodsName"
              disabled
              label="商品名称:"
              placeholder="请输入商品名称"
              required
              :rules="[{ required: true, message: '必选项不能为空！！' }]"
              maxlength="11111"
            />
            <van-field
              v-model="item.orderNo"
              name="orderNo"
              label="订货号:"
              placeholder="请输入订货号"
              maxlength="11111"
              disabled
              required
              :rules="[{ required: true, message: '必选项不能为空！！' }]"
            >
              <template #button>
                <!-- <van-button size="small" plain type="primary"
                  >查看参数</van-button
                > -->
                <span class="authentication" @click="gotoAuthentication(item)"
                  >查看参数</span
                >
              </template>
            </van-field>

            <van-field
              type="number"
              label="订货数量:"
              name="quantity"
              placeholder="请输入订货数量"
              :value="item.quantity"
              v-model="item.quantity"

            >
              <template #button>
                {{ item.unit }}
              </template>
            </van-field>

            <van-field
              v-model="item.specificationRequire"
              label="企业特殊要求："
              placeholder="请输入"
              name="specificationRequire"
            />

            <van-field
              v-model="item.remarks"
              label="备注:"
              placeholder="请输入"
              name="remarks"
              autosize
              type="textarea"
            />

            <!-- <van-field name="uploader" label="采购方上传图片:">
              <template #input>
                <van-uploader v-model="item.inquiryPicList" />
              </template>
            </van-field> -->
            <!-- <van-field label="采购方上传图片:" @click="getPJ">
              <template #input>
                <img :src="item.inquiryPicList" />
                <van-icon name="arrow" />
              </template>
            </van-field>
            <van-field
              name="card"
              label="采购方上传图片:"
              placeholder="请上传"
            >
              <template #input>
                <uploaderImg :imgSrc.sync="item.inquiryPicList" :maxCount="4" />
              </template>
            </van-field> -->
          </van-row>

          <van-button type="info" native-type="submit" class="submit"
            >提交</van-button
          >
        </van-form>
      </div>
      <!-- 占位图 -->
      <img
        v-if="!goodsIds && !refreshing"
        src="@/assets/images/nullImgText.png"
        style="width: 2.6rem; margin: 1.4rem 2rem"
        class="nullImg"
        alt
      />

      <!-- 弹窗 -->
      <van-action-sheet v-model="showModel" title="参数">
        <van-row v-if="showModel" class="content">
          <van-col
            v-for="(item, index) in actions"
            :key="`actions${index}`"
            span="24"
            class="modleItem"
          >
            {{ item.attributeName }}{{ item.skuValue.value }}
          </van-col>
        </van-row>
      </van-action-sheet>
    </van-pull-refresh>
  </div>
</template>
<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/products";
import * as _Api from "@/api/customer/personal";

import AddressList from "@/assets/js/area";
import wx from "weixin-js-sdk";
import uploaderImg from "@/components/customer/uploaderImg.vue";

// import { log } from 'pili-rtc-web'

export default {
  name: "products_uploadInquiry",
  components: {
    uploaderImg, // 上传图片
  },
  data() {
    return {
      showModel: false,
      actions: [{ name: "选项一" }, { name: "选项二" }, { name: "选项三" }],
      // 商品di数组
      goodsIds: "",
      detail: {},
      // detail: {
      //   inquiryOrderDetailDto: {
      //     id: "9999",
      //     customerId: "1341295691654729729",
      //     customer: "hh1",
      //     customerCode: "hh",
      //     provinceId: "110000",
      //     cityId: "110100",
      //     townId: "110102",
      //     provinceName: "北京市",
      //     cityName: "北京市",
      //     townName: "西城区",
      //     addr: "hh11dddd",
      //     receiver: "hh1",
      //     tel: "17666666666",
      //     paymentType: "",
      //     standardName: "",
      //     expectedDeliveryDays: "",
      //     expectedAccountPeriod: "",
      //     accountPeriodType: 1,
      //     packRequire: "",
      //     remarks: "",
      //   },

      //   inquiryOrderProductAddDto: [
      //     {
      //       goodsId: "1308683492432171009",
      //       goodsCode: "",
      //       goodsName: "测试属性11",
      //       productId: "1309069183083315201",
      //       endProductName: "",
      //       endProductSpec: [
      //         {
      //           alias: "净含量",
      //           attributeName: "净含量",
      //           id: 7,
      //           skuValue: {
      //             key: 18,
      //             value: "10g",
      //           },
      //         },
      //         {
      //           alias: "颜色",
      //           attributeName: "颜色",
      //           id: 8,
      //           skuValue: {
      //             key: 15,
      //             value: "黑色",
      //           },
      //         },
      //       ],
      //       brandId: "1299282507795030017",
      //       brandName: "3CEYES",
      //       orderNo: "sku-001",
      //       minOrderQuantity: 1,
      //       quantity: "",
      //       unit: "",
      //       specificationRequire: "",
      //       intentionPrice: "",
      //       remarks: "",
      //       // inquiryPicList: [{ url: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F2c.zol-img.com.cn%2Fproduct%2F124_500x2000%2F984%2FceU7xYD3umwA.jpg&refer=http%3A%2F%2F2c.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612335669&t=2b2d9a519dc1884973b00dc793dcea14" }],
      //       inquiryPicList: [
      //         "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F2c.zol-img.com.cn%2Fproduct%2F124_500x2000%2F984%2FceU7xYD3umwA.jpg&refer=http%3A%2F%2F2c.zol-img.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1612335669&t=2b2d9a519dc1884973b00dc793dcea14",
      //       ],
      //     },
      //   ],
      // },
      // 上拉刷新
      refreshing: false,
      chooseAds: false, // 是否显示选择地址
      showpaymen: false, // 是否显示选择付款方式
      paymentName: "", // 付款方式显示字段
      paymentList: [
        {
          name: "方式1",
          id: "1",
        },
        {
          name: "方式2",
          id: "2",
        },
        {
          name: "方式3",
          id: "3",
        },
      ],
      addressList: AddressList, // 地址列表
      address: "", //地址
      // inquiryPicList: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }],

      companyLogo: "", // 公司logo
      serverId: "", // 上传的logo  ID
    };
  },

  created() {
    this.goodsIds = this.$route.query.goodsIds;
    console.log(this.goodsIds, "goodsIds");
    if (this.goodsIds) {
      // 获取详情
      this.handleGetDetail();
    }
  },
  watch: {},
  methods: {
    // 获取详情
    handleGetDetail() {
      util.showLoading();
      Api.getInquiryItem(this.goodsIds)
        .then((res) => {
          // 上拉刷新  完成
          this.refreshing = false;
          util.hideLoading();
          if (res.code == 200) {
            this.detail = res.data;
            // 地址显示
            this.address = `${
              this.detail.inquiryOrderDetailDto.provinceName || ""
            }${this.detail.inquiryOrderDetailDto.cityName || ""}${
              this.detail.inquiryOrderDetailDto.townName || ""
            }`;
          }
        })
        .catch((err) => {
          // 上拉刷新  完成
          this.refreshing = false;
          util.hideLoading();
          // console.log(err, "err");
        });
    },

    // 选择省市区点击确认按钮
    confirmAdd(e) {
      console.log("confirmAdd", e);
      this.address = e[0].name + " " + e[1].name + " " + e[2].name;
      this.detail.inquiryOrderDetailDto.provinceId = e[0].code;
      this.detail.inquiryOrderDetailDto.provinceName = e[0].name;
      this.detail.inquiryOrderDetailDto.cityId = e[1].code;
      this.detail.inquiryOrderDetailDto.cityName = e[1].name;
      this.detail.inquiryOrderDetailDto.townId = e[2].code;
      this.detail.inquiryOrderDetailDto.townName = e[2].name;
      this.chooseAds = false;
      this.cancelAdd();
    },

    // 选择省市区点击取消按钮
    cancelAdd() {
      this.chooseAds = false;
    },

    // 选择省市区
    chooseAdd() {
      this.chooseAds = true;
    },

    // 付款方式
    paymentListChange(e) {
      // console.log(e);
      this.showpaymen = false;
      this.detail.inquiryOrderDetailDto.paymentType = e.id;
      this.paymentName = e.name;
    },

    getPJ() {
      let _this = this;
      let url = window.location.href;
      let params = {
        url: url,
      };
      _Api
        .getAppId(params)
        .then((res) => {
          const { code, data, msg, total } = res;
          if (code == 200) {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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
              console.log("config成功"); // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
              _this.uploadImg();
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

    // 上传图片
    uploadImg() {
      let _this = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          console.log("选择图片", res);
          var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          _this.companyLogo = localIds;
          _this.detail.companyLogo = localIds;
          console.log("companyLogo", _this.companyLogo);
          wx.uploadImage({
            localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
              // console.log('上传图片', res)
              // var serverId = res.serverId 返回图片的服务器端ID
              _this.serverId = res.serverId;
            },
          });
        },
      });
    },

    // 保存
    saveCard(data) {
      let params = Object.assign({}, this.detail);
      // debugger;
      Api.subInquiryOrder(params).then((res) => {
        console.log("保存", res);
        if (res.code == 200) {
          // this.$router.go(-1);
          // this.$router.back(-1);
          this.$router.push({
            name: "home",
          });
        }
      });
    },

    // 去认证
    gotoAuthentication(row) {
      this.actions = [];
      let arr = JSON.parse(row.endProductSpec);
      this.actions = arr.length ? arr : [];
      // debugger;

      this.showModel = true;
      // this.$router.push({
      //   name: "personal_attestation",
      // });
    },

    onsubmt() {
      Api.getHomePage(params)
        .then((res) => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
          }
        })
        .catch((err) => {
          console.log(err, "err");
        });
    },

    handleSetInfo(row) {
      this.$router.push({
        name: "personal_details",
        query: {
          id: row.enterpriseId,
        },
      });
    },

    // 查看详情
    handleLook(row) {
      this.$router.push({
        name: "personal_details",
        query: {
          // 企业id
          id: row.enterpriseId,
          // title: row.enterpriseName
        },
      });
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
.products_uploadInquiry {
  .van-field__label {
    min-width: 1.5rem;
    width: auto;
    margin-right: 0.1rem;
  }

  .van-radio-group--horizontal {
    height: 0.6rem;
  }
  .van-field__button {
    .authentication {
      float: right;
      background: #f8d57e;
      padding: 0.05rem 0.1rem;
      color: #fff;
      border-radius: 0.05rem;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
// @import "../personal/personal.scss";
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
.van-field__label {
  min-width: 90px;
  width: auto;
  margin-right: 0.1rem;
  text-align: right;
}
.products_uploadInquiry {
  background: #fff;
  // background-color: rgb(218, 222, 224);
  .mTop10 {
    margin-top: 0.1rem;
  }
  .center {
    text-align: center;
  }
  .modleItem {
    border-bottom: 1px solid #ccc;
    line-height: 0.8rem;
    text-align: center;
  }
  .box {
    .van-field {
      width: 7.5rem;
      // line-height: 1.12rem;
      line-height: 0.6rem;
      height: auto;
      padding: 0.1rem 0.34rem;
      font-size: 0.32rem;
      color: #313437;
      img {
        margin: auto 0;
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
        margin-left: 3rem;
        margin-right: 0.3rem;
      }
      i {
        color: #000 !important;
        padding: 0.1rem 0.4rem 0.1rem 0.4rem;
        background: #e9e9e9ff;
        font-weight: 700;
        border-radius: 10.5px;
      }
    }
    .title {
      // color: rgb(161, 134, 134);
      font-size: 0.3rem;
      font-weight: 800;
      color: green;
      padding: 0.2rem;
      background: #fff;
    }
    .submit {
      height: 0.8rem;
      width: 6.84rem;
      line-height: 0.8rem;
      text-align: center;
      margin: 0.52rem 0.34rem;
      background: rgba(248, 213, 126, 1);
      letter-spacing: 0.2rem;
      border-radius: 0.08rem;
    }
  }
}
/deep/ .van-cell {
  height: 1.12rem;
  line-height: 1.12rem;
  padding: 0px 0.34rem;
}
// 必选项位置
// /deep/ .van-cell--required::before {

// }
/deep/ .van-button--round {
  width: 6.84rem;
  margin: 0.8rem 0;
}
/deep/ .van-button--info {
  color: #313437;
  background-color: #f8d57e;
  border: 1px solid #f8d57e;
}
</style>
  
  