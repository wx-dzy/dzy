<template>
  <!-- 参展商目录-法人详情页 -->
  <div class="juridical_person">
    <div class="topCard">
      <div class="box">
        <div class="company_name">{{user.enterpriseName}}</div>
        <div class="item">
          <span class="name">{{user.realName}}</span>
          <span class="type">{{user.postName}}</span>
        </div>
        <div class="message">
          <div class="phone">
            <van-icon class="icon iconfont yz-dianhua" />
            <span>{{ user.mobile }}</span>
          </div>
          <div class="email">
            <van-icon class="icon iconfont yz-youjian" />
            <span>{{user.email}}</span>
          </div>
          <div class="address">
            <van-icon class="icon iconfont yz-dizhi" />
            <span class="addressText">{{user.companyAddress}}</span>
          </div>
          <!-- 关注组件 -->
          <follow
            :followType="2"
            :followId="user.userId"
            :followStatus.sync="personInfo.followStatus"
            :showIndex="1"
            @successCBK="handleFollow"
            class="add_follow"
          />
        </div>
      </div>
      <img :src="user.avatar" alt />
    </div>
    <div class="personCard" v-if="userCardList.length>0 ? true : false">
      <div class="visitingCard" v-if="userCardList.length">
        <visitingCard :dataList.sync="userCardList" :disabled="false" @successCBK="handleActive"></visitingCard>
      </div>

      <!-- <div class="right"></div> -->
    </div>
    <div class="btn text-center" v-if="userCardList.length>0 ? true : false">
      <!-- <button class="share" @click="showShare = true">分享名片</button> -->
      <button @click="showShare = true">分享名片</button>
      <button v-if="personInfo.exchangeStatus == 1">已交换名片</button>
      <button v-if="personInfo.exchangeStatus == 0">未交换名片</button>
    </div>
    <div class="synopsis">
      <div class="title">个人简介</div>
      <div class="item_text">{{personInfo.workDesc}}</div>
    </div>
    <!-- 我的企业 -->
    <div class="myCompany">
      <div class="title">我的企业</div>
      <div class="item_text">
        <div class="name" v-for="(item,index) in myEnterpriseList" :key="index">
          <div class="names">{{item.enterpriseName}}</div>

          <!-- <div class="img">
            <img :src="item.logo" alt="">
          </div>-->
          <follow
            :followType="1"
            :followId="item.enterpriseId"
            :followStatus.sync="item.followStatus"
            :showIndex="1"
            @successCBK="handleFollow"
            class="enterprise_follow"
          />
        </div>
      </div>
      <!-- <div style="text-align: center;">收起</div> -->
    </div>

    <!-- 推荐商品 -->
    <div class="product_catalog" v-show="recommendGoods.length > 0">
      <div class="top-title">
        <span>推荐商品</span>
        <van-icon name="arrow" />
      </div>
      <div class="item">
        <div class="itemList" v-for="(item,index) in recommendGoods" :key="index">
          <img :src="item.goodsLogo" alt />
          <div class="right">
            <div class="title">{{item.goodsName}}</div>
            <div class="nums">
              <div class="idNum">订货号：{{item.orderNo}}</div>
              <div class="num">起订量：{{item.minOrderQuantity}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="time" @click="toCalender">预约</button>
    <!-- <button class="time" @click="toCalender" v-show="personInfo.myInterviewDesc.myInterviewDesc != '' ">{{personInfo.myInterviewDesc.myInterviewDesc}}</button> -->
    <van-overlay :show="showShare" @click="showShare = false">
      <visitingCard
        :dataList.sync="userCardList"
        :disabled="false"
        @successCBK="handleActive"
        class="shareCard"
      ></visitingCard>
    </van-overlay>
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="option"
      @select="onSelect"
      :overlay="overlay"
    />
  </div>
</template>
<script>
import img1 from "@/assets/images/home/1.png";
import img2 from "@/assets/images/home/2.png";
import img3 from "@/assets/images/home/3.png";
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/exhibitor";
import nullImg from "@/assets/images/null.png";
import visitingCard from "@/components/customer/visitingCard.vue";
import follow from "@/components/customer/follow.vue";

export default {
  name: "",
  components: {
    //名片
    visitingCard,
    follow,
  },
  data() {
    return {
      overlay: false, //不显示遮罩层
      current: 0, // 名片当前的索引
      content: "",
      enterpriseShowPeopleId: this.$route.query.enterpriseShowPeopleId,
      personInfo: {}, // 获取到的总信息
      userCardList: [], //我的名片列表
      myEnterpriseList: [], // 我的企业列表
      user: {}, //企业人物信息
      recommendGoods: [], //推荐商品,
      followStatus: "", //是否关注人物  1是0否
      peopleId: this.$route.query.peopleId,
      showShare: false, //是否展示分享面板
      option: [
        { name: "生成图片", icon: img1 },
        { name: "微信", icon: img2 },
        { name: "朋友圈", icon: img3 },
      ],
    };
  },
  created() {
    this.getPeopleDel();
  },
  methods: {
    // 分享
    onSelect(option) {
      this.$toast(option.name);
      this.showShare = false;
    },
    // 关注组件回调
    handleFollow(status) {
      // console.log(status, "关注组件回调");
      this.getPeopleDel();
    },
    //  预约面谈
    toCalender() {
      this.$router.push({
        path: "/appointment_calendar", //avatar: this.user.avatar,
        query: {
          enterpriseShowPeopleId: this.enterpriseShowPeopleId,
          peopleId: this.peopleId,
        },
      });
    },
    // 名片组件的 回调函数 返回名片的当前选中索引
    handleActive(index) {
      this.current = index;
      // console.log(index, this.current);
    },
    // 获取人物详情
    getPeopleDel() {
      Api.getPeopleDetails(this.enterpriseShowPeopleId).then((res) => {
        console.log("获取人物详情", res);
        let { code, msg, data, total } = res;
        if (code == 200) {
          this.personInfo = data;
          this.userCardList = data.userCardList;
          this.myEnterpriseList = data.myEnterpriseList;
          this.recommendGoods = data.recommendGoods;
          this.user = data.user;
          this.followStatus = data.followStatus;
          if (this.followStatus == 1) {
            this.content = "取消关注";
          } else if (this.followStatus == 0) {
            this.content = "+关注";
          }
        }
      });
    },
    favor(e) {
      const care = this.followStatus == 0 ? 1 : 0;
      let params = {
        followId: this.user.userId,
        followType: 2,
        followStatus: care,
        // openId: sessionStorage.getItem('openId')
        openId: util.getCookie("dzy_openId"),
      };
      Api.getFollow(params)
        .then((res) => {
          console.log("关注成功", res);
          if (res.code == 200) {
            this.getPeopleDel();
          }
        })
        .catch((err) => {
          console.log("err");
        });

      // if (this.followStatus == 0){
      //   this.followStatus == 1
      // }else if (this.followStatus == 1){
      //     this.followStatus == 0
      // }
    },
  },
};
</script>
<style lang='scss' scoped>
.juridical_person {
  width: 7.5rem;
  height: 100vh;
  .topCard {
    width: 7.5rem;
    // height: 5.36rem;
    background: linear-gradient(
      180deg,
      rgba(248, 213, 126, 1) 0%,
      rgba(244, 184, 96, 0) 100%
    );
    border: 1px solid #fff;
    position: relative;
    img {
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      position: absolute;
      top: 0.5rem;
      left: 3rem;
      border: 1px solid #ccc;
    }
    .box {
      width: 7.5rem;
      // background-color: #fff;
      //   height: 3.84rem;
      background: url("../../../../assets/images/exhibitor/椭圆形.png")
        no-repeat;
      background-size: 7.5rem 3.84rem;
      margin-top: 1.52rem;
      padding-top: 0.7rem;
      // border: 1px solid pink;
      .company_name {
        // margin-top: 0.7rem;
        text-align: center;
        font-size: 0.34rem;
        font-weight: bold;
      }
      .item {
        margin-top: 0.06rem;
        text-align: center;
        .name {
          font-size: 0.28rem;
        }
        .type {
          margin-left: 0.2rem;
          font-size: 0.28rem;
        }
      }
      .message {
        margin-top: 0.34rem;
        margin-left: 0.56rem;
        margin-bottom: 0.38rem;
        box-sizing: border-box;
        div {
          margin-bottom: 0.16rem;
          font-size: 0.22rem;
          .icon {
            display: inline-block;
            width: 0.35rem;
            margin: auto;
            margin-right: 0.14rem;
            height: 0.34rem;
            span {
              display: inline-block;
              height: 0.34rem;
              line-height: 0.34rem;
            }
          }
        }
        .address {
          .icon {
            display: inline-block;
            width: 0.3rem;
          }
          .addressText {
            // border: 1px solid red;
            width: 4rem;
            white-space: normal;
            word-break: break-all;
            margin: auto 0;
          }
        }
      }
      .add_follow {
        position: absolute;
        right: 0;
        top: 0.4rem;
        // background-color: rgba(248, 213, 126, 1);
        border: none;
        border-radius: 0.5rem 0 0 0.5rem;
        height: 0.5rem;
        // width: 2rem;
        padding: 0 0.2rem;
      }
    }
  }
  .personCard {
    // height: 3.64rem;
    position: relative;
    .left {
      position: absolute;
      top: 0.28rem;
      width: 0.76rem;
      height: 3.72rem;
      left: 0;
      background-image: url("../../../../assets/images/exhibitor/Rectangle1.png");
      background-size: 0.76rem 3.72rem;
    }
    .middle {
      position: absolute;
      left: 0.42rem;
      top: 0;
      width: 6.7rem;
      height: 4.16rem;
      background-image: url("../../../../assets/images/exhibitor/Rectangle.png");
      background-size: 6.7rem 4.16rem;
      img {
        width: 1.18rem;
        height: 1.18rem;
        border: 1px solid #ccc;
        margin-left: 0.3rem;
        margin-top: 0.48rem;
      }
      .rightCard {
        width: 4.44rem;
        position: absolute;
        top: 0.48rem;
        left: 1.72rem;
        .title {
          font-size: 0.28rem;
          font-weight: bold;
          .name {
            margin-right: 0.3rem;
          }
        }
        .company_name {
          font-size: 0.22rem;
        }
        .message {
          margin-top: 0.46rem;
          margin-bottom: 0.38rem;
          div {
            margin-bottom: 0.16rem;
            font-size: 0.22rem;
            .icon {
              display: inline-block;
              width: 0.35rem;
              margin: auto;
              margin-right: 0.14rem;
              height: 0.34rem;
              span {
                display: inline-block;
                height: 0.34rem;
                line-height: 0.34rem;
              }
            }
          }
          .address {
            .icon {
              display: inline-block;
              width: 0.3rem;
            }
            .addressText {
              // border: 1px solid red;
              width: 4rem;
              white-space: normal;
              word-break: break-all;
              margin: auto 0;
            }
          }
        }
      }
    }
    .right {
      position: absolute;
      top: 0.28rem;
      right: 0;
      width: 0.74rem;
      height: 3.72rem;
      background-image: url("../../../../assets/images/exhibitor/Rectangle2.png");
      background-size: 0.74rem 3.72rem;
    }
  }
  .text {
    margin-top: 0.26rem;
    text-align: center;
    font-size: 0.24rem;
    color: rgba(157, 161, 166, 1);
  }
  .btn {
    button {
      // margin: 0.3rem auto 0;
      width: 1.7rem;
      height: 0.6rem;
      margin: 0 0.09rem;
      background: rgba(248, 213, 126, 1);
      border-radius: 0.29rem;
      border: none;
      font-size: 0.24rem;
      color: rgba(49, 52, 55, 1);
    }
    // .share {
    // margin-left: 1.96rem;
    // margin-right: 0.18rem;
    // }
  }
  .synopsis {
    margin-left: 0.52rem;
    // margin-top: 1.1rem;
    margin-top: 0.3rem;
    width: 6.52rem;
    .title {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .item_text {
      font-size: 0.28rem;
      margin-top: 0.1rem;
      // margin-right: 0.5rem;
      // margin-bottom: 0.5rem;
    }
  }
  .myCompany {
    margin-top: 0.66rem;
    margin-bottom: 0.66rem;
    margin-left: 0.52rem;
    width: 6.52rem;
    position: relative;
    .title {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .item_text {
      font-size: 0.28rem;
      margin-top: 0.1rem;

      // height: 44px;
      // height: 2rem;
      // line-height: 0.44rem;
      // border: 1px solid red;
      .name {
        // position: relative;
        display: flex;
        justify-content: space-between;
        height: 0.52rem;
        .names {
          line-height: 0.52rem;
          margin-bottom: 0.1rem;
        }
        .enterprise_follow {
          // position: absolute;
          // right: 0.1rem;
          // top: 0;
          display: inline-block;
          .van-button::before {
            position: normal;
          }
          .van-button {
            height: 100% !important;
          }
          /deep/ .van-button--normal {
            padding: 0;
            font-size: 0.28rem;
          }
          /deep/ .van-button {
            height: 0.5rem;
          }
        }
      }
    }

    .type {
      height: 0.4rem;
      line-height: 0.4rem;
      font-size: 0.28rem;
      position: absolute;
      right: 0.08rem;
      top: 0;
      .icon {
        color: #f8d57e;
        // display: inline;
        width: 0.35rem;
        height: 0.4rem;
        line-height: 0.4rem;
        margin-right: 0.1rem;
      }
      span {
        margin-top: 0.02rem;
      }
    }
  }
  .product_catalog {
    margin-top: 1.02rem;
    margin-bottom: 1.3rem;
    padding: 0 0.28rem;
    .top-title {
      font-size: 0.34rem;
      font-weight: 700;
      position: relative;
      .arrow_right {
        position: absolute;
        right: 0.28rem;
        top: 0;
        bottom: 0;
      }
    }
    .itemList {
      width: 6.96rem;
      height: 2.24rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
      border-radius: 0.16rem;
      margin-top: 0.4rem;
      position: relative;
      img {
        margin-top: 0.22rem;
        width: 1.8rem;
        height: 1.8rem;
        border: 1px solid #babcc0;
      }
      .right {
        position: absolute;
        left: 2.08rem;
        top: 0.22rem;
        .title {
          width: 4.42rem;
          height: 0.9rem;
          line-height: 0.45rem;
          font-size: 0.28rem;
          // word-break: break-all;
          // white-space: pre-wrap;
          // word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .nums {
          margin-top: 0.14rem;
          font-size: 0.24rem;
          color: #babcc0;
          width: 2.3rem;
          height: 0.72rem;
          line-height: 0.36rem;
        }
      }
    }
  }
  .time {
    width: 6.84rem;
    height: 0.8rem;
    margin-left: 0.34rem;
    margin-top: 0.8rem;
    // margin-bottom: 0.5rem;
    border: none;
    background: rgba(248, 213, 126, 1);
    border-radius: 0.16rem;
    z-index: 9999;
  }
  .shareCard {
    width: 96%;
    height: 3.65rem;
    margin: 4rem auto 0;
  }
  .van-button {
    height: 100% !important;
  }
}
</style>