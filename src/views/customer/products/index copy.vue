// 企业产品目录-列表页 可选择备份
<template>
  <div class="products">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-row class="head">
        <van-col span="7">
          <img :src="details.logo" alt class="photo" />
        </van-col>
        <van-col span="16">
          <h3 class="name">{{details.name}}</h3>
          <div class="middle">
            <p v-show="!details.goodsQuantity" class="text">共{{details.goodsQuantity}}个产品</p>
            <p class="huiyuan">
              <van-icon class="icon iconfont yz-huiyuan" />
              <span v-show="details.memberStatus == 1">会员</span>
              <span v-show="details.memberStatus == 0">非会员</span>
            </p>
          </div>
        </van-col>

        <van-col v-if="type==2" span="6" class="text-right btnWrap">
          <van-button
            color="#F8D57E"
            type="default"
            size="small"
            class="getBtn"
            @click="handleOrder"
          >预约面谈</van-button>
        </van-col>
      </van-row>

      <!-- 搜索 -->
      <van-search
        v-model="form.params"
        placeholder="请输入企业名称/法人姓名/品牌姓名"
        @search="onSearch"
        @input="onSearch"
        class="inline w70"
      />

      <van-dropdown-menu class="inline w30" active-color="#ee0a24">
        <van-dropdown-item v-model="form.isAsc" :options="isAscOption" @change="onSearch" />
      </van-dropdown-menu>

      <!-- 列表内容 -->
      <div class="content" v-if="listData.length">
        <!-- List 列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="----- 都在这里啦！ -----"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          class="contentList"
          :class="type ==2 ? 'pbot100' : ''"
        >
          <van-checkbox-group v-model="checkActive">
            <!-- {{checkActive}} -->
            <van-cell
              v-for="(item, index)  in listData"
              :key="index"
              class="contentItem"
              :class="type==2 ? 'padL10' : ''"
            >
              <van-row>
                <van-col :span="type == 2 ? 8 : 7">
                  <van-checkbox v-show="type==2" :name="item.id" checked-color="#F8D57E">
                    <img :src="item.goodsLogo" alt class="logo" />
                  </van-checkbox>
                  <img v-show="type==1" :src="item.goodsLogo" alt class="logo" />
                </van-col>
                <!-- {{type}} -->
                <van-col :span="type == 2 ? 16 : 17" @click="handleLook(item)">
                  <h3 class="title">{{ item.goodsName }}</h3>
                  <van-col span="24" class="color999">订货号：{{ item.orderNo }}</van-col>
                  <van-col span="24" class="color999">起订量：{{ item.minOrderQuantity }}</van-col>
                </van-col>
              </van-row>
            </van-cell>
          </van-checkbox-group>
        </van-list>
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
    <van-button v-if="type==2" color="#F8D57E" class="gobtn" @click="handleGoshop">去询价/下单</van-button>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/products";
import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  props: ["activeName"],
  name: "products",
  components: {
    footerNav
  },
  data() {
    return {
      // type = 1 为企业目录  2 为参展商目录
      type: "",
      // 参展商id
      enterpriseExhibitorsId: "",
      // 企业id
      enterpriseId: "",

      form: {
        params: "",
        // 排序，1：正序，2：倒序
        isAsc: 1,
        pageSize: 10,
        pageNum: 1
      },
      details: {},
      listData: [],
      loading: false,
      finished: false,
      refreshing: false,
      isAscOption: [
        { text: "正序", value: 1 },
        { text: "倒叙", value: 2 }
      ],
      checkActive: []

      // active: "resources",
    };
  },

  created() {
    this.init();
  },
  watch: {},
  methods: {
    init() {
      // 为企业目录
      if (this.$route.query.enterpriseId) {
        this.type = 1;
        this.enterpriseId = this.$route.query.enterpriseId;
      }

      // 为参展商目录
      if (this.$route.query.enterpriseExhibitorsId) {
        this.type = 2;
        this.enterpriseExhibitorsId = this.$route.query.enterpriseExhibitorsId;
      }
      // 获取头部信息
      this.handleDetails();
    },

    // 获取头部信息
    handleDetails() {
      let params = "";
      let ajaxUrl = "";

      // 为企业目录
      if (this.type == 1) {
        params = this.enterpriseId;
        // 公司基本信息获取
        ajaxUrl = "getEnterpriseById";
      }

      // 为参展商目录
      if (this.type == 2) {
        // http://localhost:9000/products?enterpriseExhibitorsId=1272913711522246658
        params = this.enterpriseExhibitorsId;
        // 参展商-企业基本信息
        ajaxUrl = "getExhibitorsBaseInfo";
      }

      Api[`${ajaxUrl}`](params)
        .then(res => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          if (code == 200) {
            this.details = data;
            // 默认刷新列表
            this.onSearch();
          }
        })
        .catch(err => {});
    },

    // 搜索
    onSearch(val) {
      this.listData = [];
      // console.log(val);
      this.form.pageNum = 1;
      let param = Object.assign(
        {},
        this.form,
        // 参展商id
        { enterpriseExhibitorsId: this.enterpriseExhibitorsId || "" },
        // 企业id
        { enterpriseId: this.details.enterpriseId || this.details.id }
      );
      this.onsubmt(param);
    },

    // 懒加载请求加载列表
    onLoad() {
      this.form.pageNum++;
      let param = Object.assign(
        {},
        this.form,
        // 参展商id
        { enterpriseExhibitorsId: this.enterpriseExhibitorsId || "" },
        // 企业id
        { enterpriseId: this.details.enterpriseId || this.details.id }
      );
      this.onsubmt(param);
    },

    // 上拉刷新
    onRefresh() {
      this.finished = false;
      this.form.pageNum = 1;
      this.form.params = "";
      let param = Object.assign(
        {},
        this.form,
        // 参展商id
        { enterpriseExhibitorsId: this.enterpriseExhibitorsId || "" },
        // 企业id
        { enterpriseId: this.details.enterpriseId || this.details.id }
      );
      this.onsubmt(param, 1);
    },

    // 请求参数 params status{1:上拉刷新，2：正常请求}
    onsubmt(params, statu) {
      let status = statu ? statu : 2; // 默认正常请求
      Api.getGoodSearch(params)
        .then(res => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
            if (status == 1) {
              // 上拉刷新
              this.refreshing = false;
              this.listData = data;
              x;
              this.$toast("刷新成功");
            } else {
              data.forEach(element => {
                this.listData.push(element);
              });
            }
            // 数据全部加载完成
            if (data.length < this.form.pageSize) {
              this.finished = true;
            }
          }
        })
        .catch(err => {
          // 上拉刷新
          this.refreshing = false;
          // console.log(err, "err");
        });
    },

    // 查看详情
    handleLook(row) {
      this.$router.push({
        name: "products_details",
        query: {
          // 商品id
          goodsId: row.id
        }
      });
    },

    // 去下单
    handleGoshop() {
      // console.log(this.checkActive, "下单ID");
      // if (!this.checkActive.length) {
      //   return util.error("请选择商品！！");
      // }
      // // 临时跳转
      // let arr = this.listData.filter(item =>
      //     item.id == this.checkActive[0]
      // )
      // window.location.href = `https://www.dzy315.com/hlwl_wexin/uploadInquiry/order/details.html?inquiryId=1243&status=2&goodsName=${arr[0].goodsName}`;

      // return
      // 正常跳转
      this.$router.push({
        name: "products_uploadInquiry",
        query: {
          // 商品id数组
          goodsIds: JSON.stringify(this.checkActive)
        }
      });
    },

    // 预约面谈
    handleOrder() {
      console.log("预约面谈");
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

<style lang="scss">
// 资源-企业列表
.products {
  .van-search__content {
    border-radius: 0.32rem;
  }
  .van-field__control,
  .van-cell {
    color: #9da1a6;
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
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./products.scss";
</style>

