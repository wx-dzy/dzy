购物车-列表页
// http://127.0.0.1:9000/dzy-wx-test/shoppingCart?enterpriseExhibitorsId=1284305336437575682
<template>
  <div class="shoppingCart">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="handleDetail">
      <div
        v-if="
          details.address.id ||
          details.orderList.length ||
          details.inquiryList.length
        "
      >
        <van-cell
          v-if="details.address.id"
          is-link
          @click="handleGoAddress"
          class="mBot10"
        >
          <van-row>
            <van-col span="7">收货地址:</van-col>
            <van-col span="17">
              <p>{{ details.address.receiver }} {{ details.address.tel }}</p>
              <p>{{ details.address.addrDetail }}</p>
            </van-col>
          </van-row>
        </van-cell>
        <van-form @submit="onsubmt">
          <van-checkbox-group v-model="checkActive" ref="checkboxOrderList">
            <!-- {{ checkActive }} -->
            <!-- 订货列表内容 -->
            <div v-if="details.orderList.length" class="content">
              <van-cell
                v-for="(item, index) in details.orderList"
                :key="`orderList${index}`"
                class="contentItem pad0"
              >
                <van-row>
                  <h3 class="headTit">
                    <i
                      data-v-0388d822=""
                      class="van-icon van-icon-icon iconfont yz-qi"
                    />
                    {{ item.vendor.enterpriseName }}
                  </h3>
                  <van-col
                    :span="24"
                    v-for="(obj, _index) in item.productList"
                    :key="`orderListItem${_index}`"
                    class="border"
                  >
                    <van-card
                      tag="订货"
                      :price="Math.floor(obj.price * 100) / 100"
                      :desc="`订货号：${obj.orderNo}`"
                      :title="obj.goodsName"
                      :thumb="obj.goodsMainImage"
                      :thumb-link="`products_details?goodsId${obj.goodsId}`"
                    >
                      <template #tags>
                        <van-checkbox
                          :name="obj.id"
                          checked-color="#F8D57E"
                          class="posiLeft"
                          @click="handleItemChange"
                        />
                        <p>
                          参数：
                          <van-tag
                            v-for="sku in obj.skuAttributeList"
                            :key="sku.attributeName"
                            plain
                            type="danger"
                            >{{ sku.attributeName }}:
                            {{ sku.skuValue.value }}</van-tag
                          >
                          <span></span>
                        </p>
                      </template>
                      <template #footer>
                        <van-row>
                          <i class="footTit">订货量：</i>
                          <van-stepper
                            size="mini"
                            v-model="obj.quantity"
                            integer
                            input-width="20px"
                            button-size="20px"
                            @change="handleStep('1',item,obj)"
                          />

                          <i class="footTit fr"
                            >小计：{{ obj.quantity * obj.price || 0 }}元</i
                          >
                        </van-row>
                      </template>
                    </van-card>
                  </van-col>
                  <p class="totalAmount">
                    应付总额：{{ item.vendor.totalAmount || 0 }}元
                  </p>
                </van-row>
              </van-cell>
            </div>

            <!-- 询价列表内容 -->
            <div v-if="details.inquiryList.length" class="content">
              <van-cell
                v-for="(item, index) in details.inquiryList"
                :key="`inquiryList${index}`"
                class="contentItem pad0"
              >
                <van-row>
                  <h3 class="headTit">
                    <i
                      data-v-0388d822=""
                      class="van-icon van-icon-icon iconfont yz-qi"
                    />
                    {{ item.vendor.enterpriseName }}
                  </h3>
                  <van-col
                    :span="24"
                    v-for="(obj, _index) in item.productList"
                    :key="`inquiryListItem${_index}`"
                    class="border"
                  >
                    <van-card
                      tag="询价"
                      :currency="``"
                      :desc="`订货号：${obj.orderNo}`"
                      :title="obj.goodsName"
                      :thumb="obj.goodsMainImage"
                      :thumb-link="`products_details?goodsId${obj.goodsId}`"
                    >
                      <template #price> <i class="price">待询价</i> </template>
                      <template #tags>
                        <van-checkbox
                          :name="obj.id"
                          checked-color="#F8D57E"
                          class="posiLeft"
                          @click="handleItemChange"
                        />
                        <p>
                          参数：
                          <van-tag
                            v-for="sku in obj.skuAttributeList"
                            :key="sku.attributeName"
                            plain
                            type="danger"
                            >{{ sku.attributeName }}:
                            {{ sku.skuValue.value }}</van-tag
                          >
                          <span></span>
                        </p>
                      </template>
                      <template #footer>
                        <van-row>
                          <i class="footTit">订货量：</i>
                          <van-stepper
                            size="mini"
                            v-model="obj.quantity"
                            integer
                            input-width="20px"
                            button-size="20px"
                            @change="handleStep('2','',obj)"
                          />

                          <i class="footTit fr">小计：带询价</i>
                        </van-row>
                      </template>
                    </van-card>
                  </van-col>
                  <van-row v-if="item.vendor.enterpriseName">
                    <van-col span="12">
                      <!-- :rules="[{ required: true, message: '请选择' }]" -->
                      <van-field
                        v-model="item.vendor.accountPeriodType"
                        label="账期类型:"
                        placeholder="请选择"
                        readonly
                        clickable
                        name="picker"
                        :value="item.vendor.accountPeriodType"
                        @click="item.vendor.showPicker = true"
                      />

                      <van-popup
                        v-model="item.vendor.showPicker"
                        position="bottom"
                      >
                        <van-picker
                          show-toolbar
                          :columns="columns"
                          @confirm="onConfirm($event, item)"
                          @cancel="item.vendor.showPicker = false"
                        />
                      </van-popup>
                    </van-col>
                    <van-col span="12">
                      <!-- :rules="[{ required: true, message: '请选择' }]" -->
                      <van-field
                        v-model="item.vendor.estimateAccountPeriod"
                        label="账期:"
                        placeholder="请选择"
                        readonly
                        clickable
                        name="picker"
                        :value="item.vendor.estimateAccountPeriod"
                        @click="item.vendor.showPicker1 = true"
                      />

                      <van-popup
                        v-model="item.vendor.showPicker1"
                        position="bottom"
                      >
                        <van-picker
                          show-toolbar
                          :columns="columns1"
                          @confirm="onConfirm1($event, item)"
                          @cancel="item.vendor.showPicker1 = false"
                        />
                      </van-popup>
                    </van-col>
                    <van-col span="24">
                      <!-- :rules="[{ required: true, message: '请选择付款方式' }]" -->
                      <van-field
                        v-model="item.vendor.paymentType"
                        label="付款方式:"
                        placeholder="请选择付款方式"
                        readonly
                        clickable
                        name="picker"
                        :value="item.vendor.paymentType"
                        @click="item.vendor.showPicker2 = true"
                      />

                      <van-popup
                        v-model="item.vendor.showPicker2"
                        position="bottom"
                      >
                        <van-picker
                          show-toolbar
                          :columns="columns2"
                          @confirm="onConfirm2($event, item)"
                          @cancel="item.vendor.showPicker2 = false"
                        />
                      </van-popup>
                    </van-col>
                  </van-row>

                  <p class="totalAmount">
                    应付总额：{{ item.vendor.totalAmount || "带询价" }}
                  </p>
                </van-row>
              </van-cell>
            </div>
          </van-checkbox-group>

          <van-submit-bar
            :disabled="!checkActive.length"
            decimal-length="0"
            button-text="提交"
            native-type="submit"
            text-align="left"
          >
            <template #default>
              <van-checkbox
                v-model="checkedAll"
                @click="handleAllChange"
                class="checAclass"
                >全选</van-checkbox
              >
              <van-goods-action-icon
                class="deleClass"
                icon="icon iconfont yz-shanchu"
                @click="handleDele"
                text="删除"
              />
            </template>
          </van-submit-bar>

          <!-- <van-goods-action class="">
            <van-goods-action-icon
              icon="icon iconfont yz-suoquyangpin"
              text="删除"
            />
            <van-goods-action-button
              color="#F8D57E"
              type="danger"
              text="提交"
              native-type="submit"
            />
          </van-goods-action> -->
        </van-form>
      </div>
      <!-- 占位图 -->
      <img
        v-else
        src="@/assets/images/nullImgText.png"
        style="width: 2.6rem; margin: 1.4rem 2rem"
        class="nullImg"
        alt
      />
    </van-pull-refresh>
    <!-- <footerNav /> -->
    <!-- <van-button v-if="type==2" color="#F8D57E" class="gobtn" @click="handleGoshop">去询价/下单</van-button> -->
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/shoppingCart";
import footerNav from "@/components/customer/footerNav/index.vue";
import { Dialog } from "vant";
export default {
  name: "shoppingCart",
  components: {
    footerNav,
  },
  data() {
    return {
      form: {
        pageSize: 10,
        pageNum: 1,
      },
      checkedAll: false,
      // showPicker: false,
      // showPicker1: false,
      // showPicker2: false,
      columns: ["货到后", "票到后"],
      columns1: [
        { text: "30", disabled: false },
        { text: "45" },
        { text: "60" },
        { text: "90" },
      ],
      columns2: ["电汇", "承兑", "现金"],
      details: {
        address: {},
        orderList: [],
        inquiryList: [],
      },
      // 临时数据
      details1: {
        address: {
          id: "1307519944402321409",
          receiver: "a111",
          addrDetail: "天津市天津市和平区2sss",
          tel: "18801012566",
        },
        orderList: [
          {
            vendor: {
              enterpriseName: "和力链",
              totalAmount: 132,
            },
            productList: [
              {
                id: "1355455274437148674",
                goodsId: "1344466437356883970",
                productId: "1344469754338316290",
                goodsName: "测试商品1",
                goodsMainImage:
                  "https://dzy-cloud-files.oss-cn-hangzhou.aliyuncs.com/files/goods/%E9%87%8E%E8%8F%8A%E8%8A%B1-%E4%B8%BB%E5%9B%BE.jpg",
                orderNo: "1111",
                price: 33,
                quantity: 4,
                goodsAmount: 132,
                skuAttributeList: [
                  {
                    attributeName: "机油粘度",
                    skuValue: {
                      key: 55,
                      value: "55",
                    },
                  },
                ],
              },
              {
                id: "13554552744371486711",
                goodsId: "13444664373568839722",
                productId: "1344469754338316222",
                goodsName: "测试商品1",
                goodsMainImage:
                  "https://dzy-cloud-files.oss-cn-hangzhou.aliyuncs.com/files/goods/%E9%87%8E%E8%8F%8A%E8%8A%B1-%E4%B8%BB%E5%9B%BE.jpg",
                orderNo: "1111",
                price: 33,
                quantity: 1,
                goodsAmount: 132,
                skuAttributeList: [
                  {
                    attributeName: "机油粘度",
                    skuValue: {
                      key: 55,
                      value: "55",
                    },
                  },
                ],
              },
            ],
          },

          {
            vendor: {
              enterpriseName: "和力链www",
              totalAmount: 132,
            },
            productList: [
              {
                id: "1355455274437148675",
                goodsId: "1344466437356883970",
                productId: "1344469754338316290",
                goodsName: "测试商品1",
                goodsMainImage:
                  "https://dzy-cloud-files.oss-cn-hangzhou.aliyuncs.com/files/goods/%E9%87%8E%E8%8F%8A%E8%8A%B1-%E4%B8%BB%E5%9B%BE.jpg",
                orderNo: "2222",
                price: 33,
                quantity: 4,
                goodsAmount: 132,
                skuAttributeList: [
                  {
                    attributeName: "机油粘度",
                    skuValue: {
                      key: 55,
                      value: "55",
                    },
                  },
                ],
              },
            ],
          },
        ],
        inquiryList: [
          {
            vendor: {
              enterpriseName: "和力链",
              totalAmount: "",
              estimateAccountPeriod: "30天",
              accountPeriodType: "",
              paymentType: "",
            },
            productList: [
              {
                id: "135716436850402918511",
                goodsId: "1309304491745951745",
                productId: "1309327210835296258",
                goodsName: "测试销售属性",
                goodsMainImage:
                  "https://dzy-cloud-files.oss-cn-hangzhou.aliyuncs.com/files/goods/%E9%87%8E%E8%8F%8A%E8%8A%B1-%E4%B8%BB%E5%9B%BE.jpg",
                orderNo: "3333",
                price: "",
                quantity: 1,
                goodsAmount: "",
                skuAttributeList: [
                  {
                    attributeName: "净含量",
                    skuValue: {
                      key: 18,
                      value: "10g",
                    },
                  },
                ],
                priceDesc: "",
                goodsAmountDesc: "",
              },
              {
                id: "135716436850402918522",
                goodsId: "1309304491745951745",
                productId: "1309327210835296258",
                goodsName: "测试销售属性",
                goodsMainImage:
                  "https://dzy-cloud-files.oss-cn-hangzhou.aliyuncs.com/files/goods/%E9%87%8E%E8%8F%8A%E8%8A%B1-%E4%B8%BB%E5%9B%BE.jpg",
                orderNo: "3333",
                price: "",
                quantity: 1,
                goodsAmount: "",
                skuAttributeList: [
                  {
                    attributeName: "净含量",
                    skuValue: {
                      key: 18,
                      value: "10g",
                    },
                  },
                ],
                priceDesc: "",
                goodsAmountDesc: "",
              },
            ],
          },
          {
            vendor: {
              enterpriseName: "和力链",
              totalAmount: "",
              estimateAccountPeriod: 60,
              accountPeriodType: "",
              paymentType: "",
            },
            productList: [
              {
                id: "1357164368504029183335",
                goodsId: "13093044917459515745",
                productId: "13093272108352496258",
                goodsName: "测试销售属性",
                goodsMainImage:
                  "https://dzy-cloud-files.oss-cn-hangzhou.aliyuncs.com/files/goods/%E9%87%8E%E8%8F%8A%E8%8A%B1-%E4%B8%BB%E5%9B%BE.jpg",
                orderNo: "3333",
                price: "",
                quantity: 1,
                goodsAmount: "",
                skuAttributeList: [
                  {
                    attributeName: "净含量",
                    skuValue: {
                      key: 18,
                      value: "10g",
                    },
                  },
                ],
                priceDesc: "",
                goodsAmountDesc: "",
              },
              {
                id: "135716436850402918445s",
                goodsId: "1309304491745951745",
                productId: "1309327210835296258",
                goodsName: "测试销售属性",
                goodsMainImage:
                  "https://dzy-cloud-files.oss-cn-hangzhou.aliyuncs.com/files/goods/%E9%87%8E%E8%8F%8A%E8%8A%B1-%E4%B8%BB%E5%9B%BE.jpg",
                orderNo: "3333",
                price: "",
                quantity: 1,
                goodsAmount: "",
                skuAttributeList: [
                  {
                    attributeName: "净含量",
                    skuValue: {
                      key: 18,
                      value: "10g",
                    },
                  },
                ],
                priceDesc: "",
                goodsAmountDesc: "",
              },
            ],
          },
        ],
      },
      refreshing: false,
      checkActive: [],
      totalNum: 0,
    };
  },

  created() {
    // 默认刷新列表
    this.handleDetail();
  },
  watch: {
    // checkedAll: {
    //   handler(newVal, oldVal) {
    //     // if (newVal) {
    //     //   this.handleCheckAll();
    //     // } else {
    //     //   this.handleToggleAll();
    //     // }
    //   },
    //   // deep属性对对象进行深度监听
    //   // deep: true,
    //   // 这样使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值        发生改变才会执行。
    //   // 如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。比如当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true。
    //   // immediate: true,
    // },
  },
  methods: {
    handleItemChange(e) {
      if (this.checkActive.length == this.totalNum) {
        this.checkedAll = true;
      } else {
        this.checkedAll = false;
      }
    },

    handleAllChange() {
      // console.log(this.checkedAll,'All')
      if (this.checkedAll) {
        this.handleCheckAll();
      } else {
        this.handleToggleAll();
      }
    },
    handleCheckAll() {
      this.$refs.checkboxOrderList.toggleAll(true);
    },
    handleToggleAll() {
      this.$refs.checkboxOrderList.toggleAll();
    },

    // 跳转修改地址
    handleGoAddress() {
      // return this.$toast(
      //   `跳转修改地址！！ 传入当前地址id:${this.details.address.id}`
      // );
      this.$router.push({
        name: "addressPage",
        query: {
          // 当前地址id
          addressId: this.details.address.id,
        },
      });
    },

    handleDetail() {
      Api.getMyCartList("")
        .then((res) => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            // 数据处理
            this.details = this.handleData(data);
            // // 上拉刷新
            // this.refreshing = false;
          }
        })
        .catch((err) => {
          this.details = {
            address: {},
            orderList: [],
            inquiryList: [],
          };
          // 上拉刷新
          this.refreshing = false;
        });
    },

    handleData(data, type) {
      // 临时数据
      // data = JSON.parse(JSON.stringify(this.details1));
      this.totalNum = 0;
      type = type ? type : 1;
      if (!data) {
        // 数据处理
        data = {
          address: {},
          orderList: [],
          inquiryList: [],
        };
      } else {
        data.inquiryList.forEach((ele) => {
          this.totalNum += ele.productList.length;
          if (type == 1) {
            ele.vendor.showPicker = false;
            ele.vendor.showPicker1 = false;
            ele.vendor.showPicker2 = false;
            // 默认值设置
            // 账期，数字天数
            ele.vendor.estimateAccountPeriod = 30;
            // 账期类型
            ele.vendor.accountPeriodType = "票到后";
            // 付款类型
            ele.vendor.paymentType = "电汇";
          }
          if (type == 2) {
            delete ele.vendor.showPicker;
            delete ele.vendor.showPicker1;
            delete ele.vendor.showPicker2;
          }
        });

        data.orderList.forEach((ele) => {
          this.totalNum += ele.productList.length;
        });

        // 上拉刷新
        this.refreshing = false;
      }

      return data;
    },

    // type 1为订单 2为询价单
    handleStep(type, item, obj ) {
      type = type ? type : 2;
      if (type == 1) {
        // console.log(item);
        item.vendor.totalAmount = 0;
        item.productList.forEach((ele) => {
          item.vendor.totalAmount += ele.quantity * ele.price;
        });
        // console.log(item.vendor.totalAmount);
      }
      // 单个物品数量提交
      this.handleSunNum(obj);
    },

    // 单个物品数量提交
    handleSunNum: util.Debounce(function (item) {
      // console.log(111,item.quantity,item.productId);
      let params = {
        // 产品id
        productId: item.productId,
        // 产品数量
        quantity: item.quantity,
      };
      // util.showLoading();
      Api.addShopping(params)
        .then((res) => {
          let { code, msg, data, total } = res;
          // util.hideLoading();
          if (code == 200) {
          }
        })
        .catch((err) => {
          // util.hideLoading();
        });
    }, 1000),

    handleDele() {
      // 清空
      if (!this.checkActive.length) {
        return util.error("请先选择数据！！");
      }
      // 二次确认
      Dialog.confirm({
        title: "提示",
        message: "确认删除么？",
      })
        .then(() => {
          if (this.checkedAll) {
            // console.log("清空");
            this.handleDeleSub(2);
          } else {
            // console.log(this.checkActive);
            this.handleDeleSub(1);
          }
        })
        .catch(() => {});
    },

    // type =2 清空 type=1 删除指定
    handleDeleSub(type) {
      type = type ? type : 1;
      let tag = type == 1 ? "removeByIds" : type == 2 ? "clearGoodsCart" : "";
      let param = type == 1 ? this.checkActive : "";
      util.showLoading();
      Api[tag](param)
        .then((res) => {
          util.hideLoading();
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.checkActive = [];
            this.checkedAll = false;

            util.success(msg);
            // 刷新列表
            this.handleDetail();
          }
        })
        .catch((err) => {
          util.hideLoading();
        });
    },

    // 提交确认
    onsubmt(values) {
      // 二次确认
      Dialog.confirm({
        title: "提示",
        message: "确认提交么？",
      })
        .then(() => {
          // 提交数据
          this.handleOnsubData();
        })
        .catch(() => {});
    },

    // 提交数据
    handleOnsubData() {
      // 删除自定义数据
      let data = this.handleData(JSON.parse(JSON.stringify(this.details)), 2);
      // debugger;
      let param = this.checkedAll ? data : this.handleSubData(data);
      util.showLoading();
      Api.subOrder(param)
        .then((res) => {
          util.hideLoading();
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.checkActive = [];
            this.checkedAll = false;
            util.success(msg);
            // 刷新列表
            this.handleDetail();
          }
        })
        .catch((err) => {
          util.hideLoading();
        });
    },

    // 非全选数据处理
    handleSubData(data) {
      // data为this.detail 去掉自定义字段后字段
      let param = {
        address: this.details.address.id,
        list: [{}, {}, {}],
        orderList: [
          {},
          {},
          {},
          {},
          // {
          //   vendor:{},
          //   productList:[]
          // }
        ],
        inquiryList: [
          {},
          {},
          {},
          // {
          //   vendor:{},
          //   productList:[]
          // }
        ],
      };
      console.log(data.orderList);
      console.log(data.inquiryList);

      debugger;
      this.checkActive.forEach((ele) => {
        debugger;
        data.orderList.forEach((obj) => {
          let orders = obj.productList.find((item1) => {
            return ele == item1.id;
          });
          if (orders) {
            // if (orders) {
            //   let tag = {
            //     vendor: {},
            //     productList: [],
            //   };
            //   tag.vendor = obj.vendor;
            //   tag.productList.push(orders);
            //   param.orderList.push(tag);
            // }
            param.orderList.push(orders);
          }
        });
        data.inquiryList.forEach((obj) => {
          debugger;
          let inquirys = obj.inquiryList.find((item1) => {
            return ele == item1.id;
          });
          if (inquirys) {
            param.inquiryList.push(inquirys);
          }
        });
      });
      console.log(
        "此处缺少data于checkActive比较 循环数据处理",
        data,
        this.checkActive
      );
      // debugger;
      // 选中数据 this.checkActive
      return param;
    },

    // 账期类型
    onConfirm(value, item) {
      // console.log(value, item);
      item.vendor.accountPeriodType = value;
      item.vendor.showPicker = false;
    },
    // 账期，数字天数
    onConfirm1(value, item) {
      // console.log(value, item);
      item.vendor.estimateAccountPeriod = value.text;
      item.vendor.showPicker1 = false;
    },
    // 付款类型
    onConfirm2(value, item) {
      // console.log(value, item);
      item.vendor.paymentType = value;
      item.vendor.showPicker2 = false;
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
.shoppingCart {
  .van-search__content {
    border-radius: 0.32rem;
  }

  .van-field__control,
  .van-cell {
    color: #9da1a6;
  }
  .van-cell.pad0 {
    padding: 0;
    padding-left: 5%;
  }
  .van-card {
    background-color: #fff;
  }
  .van-dropdown-menu__bar {
    box-shadow: none;
  }
  .van-search {
    padding-top: 0;
    padding-bottom: 0;
  }
  .van-cell.padL10 {
    padding-left: 0.1rem;
  }
  .van-checkbox__label {
    margin-left: 0;
  }
  .contentItem {
    margin-bottom: 0.1rem;
    .van-cell__value {
      overflow: initial;
    }
    .van-stepper {
      display: inline-block;
    }
    .van-card__footer {
      text-align: left;
      line-height: 28px;

      .footTit {
        display: inline-block;
        vertical-align: bottom;
        font-size: 0.26rem;
      }
    }
    .van-field__label {
      width: auto;
      padding-right: 0.1rem;
    }
  }
  .checAclass {
    position: absolute;
    left: 0.2rem;
  }
  .deleClass {
    margin: 0 0.2rem;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
.shoppingCart {
  padding-top: 0.1rem;
  height: 100vh;
  overflow: auto;
  padding-bottom: 1.4rem;
  background: #f2f2f2;
  .mBot10 {
    margin-bottom: 0.1rem;
  }

  .border {
    border-bottom: 1px solid rgb(222, 222, 228);
  }
  .fr {
    float: right;
  }
  .price {
    font-size: 0.3rem;
    color: #323233;
    font-weight: bold;
  }
  .totalAmount {
    float: right;
    padding-right: 0.4rem;
    font-size: 0.34rem;
    line-height: 0.78rem;
  }
  .headTit {
    line-height: 0.8rem;
    .iconfont {
      font-size: 0.42rem;
      color: red;
    }
  }

  .posiLeft {
    position: absolute;
    // left: calc(-96px + -1.25em);
    left: calc(-104px + -1.45em);

    z-index: 99;
  }

  .gobtn {
    position: fixed;
    bottom: 0rem;
    width: 7rem;
    margin: 0 0.28rem;
    font-size: 0.32rem;
    color: rgba(49, 52, 55, 1) !important;
    line-height: 0.8rem;
    background: rgba(248, 213, 126, 1);
    border-radius: 0.16rem;
  }
}
</style>

