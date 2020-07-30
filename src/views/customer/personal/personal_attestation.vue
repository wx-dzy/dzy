// 职业身份认证
<template>
  <div class="personal_attestation">
    <router-view />
    <div class="top">
      <div class="top_title">
        请上传名片证明您的职业经历，
        <span style="color:#FA6400;">待人工审核</span>
      </div>
      <div class="push">
        <!-- <div class="image">
          <img :src="imgUrl_before" alt />
        </div>-->
        <van-field name="uploader">
          <template #input>
            <van-uploader v-model="uploader" />
            <!-- <span class="upload" style="font-size:0.28rem;">上传名片</span> -->
          </template>
        </van-field>
      </div>
    </div>
    <!-- 认证状态 -->
    <div class="attestation">
      <div class="itemBox" v-for="(item,index) in attestationList" :key="index">
        <div class="leftImg">
          <img :src="item.imgUrl" alt />
        </div>
        <div class="rightText">
          <div class="title">{{item.title}}</div>
          <div class="status">{{item.status}}</div>
        </div>
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
  name: "personal_attestation",
  components: {
    // 名片
    visitingCard,
  },
  data() {
    return {
      attestationList: [
        {
          imgUrl: require("@/assets/images/myOrderBg1.png"),
          title: "好招数创（北京）科技有限公司",
          status: "企业超级管理员已认证",
        },
        {
          imgUrl: require("@/assets/images/myOrderBg1.png"),
          title: "好招数创（北京）科技有限公司",
          status: "企业超级管理员失败",
        },
      ],
      uploader: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }],
      detail: {
        infoImg: "https://img.yzcdn.cn/vant/cat.jpeg",
        name: "xiaogang0-0",
        status: 1,
        activeInfo: "参观房",
      },
      pageSize: 10,
      pageNum: 1,
    };
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  watch: {},
  methods: {
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
    document.body.style.backgroundColor="#eeeeee";
  },
};
</script>

<style lang="scss" scoped>
// @import "@/assets/styles/base/calc_vm.scss";
// @import "./personal.scss";
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
.personal_attestation {
  background-color: #eee;
  padding-top: 0.24rem;
  .top {
    padding-top: 0.42rem;
    background-color: #fff;
    .top_title {
      
      padding-left: 0.6rem;
      font-size: 0.28rem;
      color: rgba(0, 0, 0, 0.9);
      line-height: 0.4rem;
      box-sizing: border-box;
    }
  }
  /deep/ .van-cell {
    margin-bottom: 0.24rem;
    width: 100%;
    // padding: 10px 16px;
    padding-left: 0.64rem;
    padding-top: 0.56rem;
    padding-bottom: 0.34rem;
    overflow: hidden;
    color: #323233;
    font-size: 14px;
    line-height: 24px;
    background-color: #fff;
    box-sizing: border-box;
  }
  .attestation {
    // margin-top: 0.24rem;
    .itemBox {
      width: 7.5rem;
      height: 2.2rem;
      display: flex;
      background: rgba(255, 255, 255, 1);
      padding-left: 0.5rem;
      box-sizing: border-box;
      // border: 1px solid #eeeeee;
      margin-bottom: 0.12rem;
    }
    .leftImg {
      width: 1.4rem;
      height: 1.4rem;
      margin: auto 0;
      border: 0.02rem solid rgba(233, 233, 233, 1);
      img {
        height: 100%;
        width: 100%;
      }
    }
    .rightText {
      padding-left: 0.36rem;
      font-size: 0.28rem;
      color: rgba(49, 52, 55, 1);
      line-height: 0.4rem;
      box-sizing: border-box;
      .title {
        padding-top: 0.32rem;
        padding-bottom: 0.18rem;
      }
    }
  }
}
</style>

