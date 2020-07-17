// 企业产品目录-产品详情  getGoodDetailById
<template>
  <div class="products_details">
    <div class="top">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#333333">
        <van-swipe-item>
          <img src="../../../assets/images/product1.png" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../../assets/images/product1.png" />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../../../assets/images/product1.png" />
        </van-swipe-item>
      </van-swipe>
      <div class="Itemtext">
        <div class="title">宝矿力水特粉末15g/袋冲剂电解质粉剂固体健身运动饮料整箱多规格可选 5盒</div>
        <div class="brand">
          <span>品牌</span>:
          <span>宝矿力水特</span>
        </div>
        <div class="number">
          <span>订货号</span>:
          <span>A2323</span>
        </div>
        <span class="shure">
          <i class="iconfont">&#xe66f;</i>分享
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/personal";
import visitingCard from "@/components/customer/visitingCard.vue";

export default {
  name: "products_details",
  components: {
    // 名片
    visitingCard
  },
  data() {
    return {
      detail: {
        infoImg: "https://img.yzcdn.cn/vant/cat.jpeg",
        name: "xiaogang0-0",
        status: 1,
        activeInfo: "参观方"
      },
      pageSize: 10,
      pageNum: 1
    };
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  watch: {},
  methods: {
    onsubmt() {
      Api.getHomePage(params)
        .then(res => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
    },

    handleSetInfo(row) {
      this.$router.push({
        name: "personal_details",
        query: {
          id: row.enterpriseId
        }
      });
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
.products_details {
  .top {
    position: relative;
    .my-swipe .van-swipe-item {
      width: 7.5rem;
      height: 4rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .Itemtext {
      width: 6.52rem;
      margin-left: 0.5rem;
      margin-top: 0.2rem;
      padding-bottom: 0.6rem;
        border-bottom: 0.02rem solid #e9e9e9;
      .title {
        width: 6.52rem;
        font-size: 0.32rem;
        font-family: AlibabaPuHuiTiM;
        color: rgba(0, 0, 0, 1);
        line-height: 0.44rem;
        letter-spacing: 1px;
        margin-bottom: 0.2rem;
        font-weight: bold;
      }
      .brand,
      .number {
        font-size: 0.28rem;
        color: #9da1a6;
        span:nth-child(1) {
          letter-spacing: 2px;
          display: inline-block;
          width: 1rem;
          text-align-last: justify !important; /*自适应文本宽度*/
        }
      }
      .shure {
        position: absolute;
        // float: right;
        right: 0;
        top: 5.52rem;
        display: inline-block;
        width: 1.34rem;
        height: 0.52rem;
        background: rgba(248, 213, 126, 1);
        border-radius: 0.3rem 0rem 0rem 0.3rem;
        font-size: 0.28rem;
        text-align: center;
        line-height: 0.52rem;
        i{
          font-size: 0.28rem;
        }
      }
    }
    /deep/ .van-swipe__indicator {
      background-color: #fff;
    }
  }
}
</style>

