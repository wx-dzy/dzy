<template>
  <!-- 参展商目录-参展商详情 -->
  <div class="exhibitor_details">
    <div class="top" v-if="details.exhibitors">
      <div class="title">{{details.exhibitors.name}}</div>
      <div class="middle">
        <span class="name_type">{{details.exhibitors.enterpriseShowPlaceName}}</span>
        <i class="huiyuan">
          <van-icon class="icon iconfont yz-huiyuan" />
          <span v-show="details.exhibitors.memberStatus == 1">会员</span>
          <span v-show="details.exhibitors.memberStatus == 0">非会员</span>
        </i>
      </div>
      <div class="btn">
        <button class="left_btn" @click="toInfomation">获取公司资料</button>
        <button class="right_btn" @click="goToPerson">预约面谈</button> 
        <!-- <van-button round size="small"></van-button>
        <van-button round size="small" color="#ffd36f">预约面谈</van-button>-->
      </div>
      <div class="more" @click="goCompany_details">
        公司更多信息
        <van-icon name="arrow" />
      </div>
      <!-- <div class="type" v-show="details.followStatus == 1">
        <van-icon class="icon iconfont yz-yiguanzhu" />
        <div class="type_name">已关注</div>
      </div>-->
      <!-- <div class="type" v-show="details.followStatus == 0">
        <van-icon name="star-o" />
        <div class="type_name">未关注</div>
      </div>-->
    </div>
    <div class="exhibitor" v-if="person.length > 0">
      <div class="top-title" @click="goToPerson">
        <span>企业人物</span>
        <van-icon name="arrow" /> 
      </div>
      <div class="item">
        <div
          class="person"
          v-for="(item,index) in person"
          :key="index"
          @click="toPersonDetail(item)"
        >
          <!-- <img :src="item.avatar || photo1" alt /> -->
          <img
            :src="item.avatar ? item.avatar : 
										 item.sex == '男' ? photo1 : 
										 item.sex == '女' ? photo2 : 
										 photo3"
            alt
          />
          <div class="name">{{item.realName}}</div>
          <div class="type">{{item.postName}}</div>
        </div>
      </div>
    </div>
    <!-- 企业相关视频 -->
    <div class="exhibitor_video" v-if="videoList.length>0">
      <div class="top-title">
        <span>企业相关视频</span>
        <van-icon name="arrow" />
      </div>

      <div class="item">
        <div
          class="video_box contentItem"
          v-for="(item, index)  in videoList"
          :key="index"
          :style="{width: 4.18 + 'rem'}"
        >
          <!-- <Video-Demo
            :_id="item.id"
            :src="item.videoUrl"
            :bannerIMG="item.mediaUrl"
            :playVideoId.sync="playVideoId"
            style="width: 100%;"
          />-->
          <!-- <Video-Demo :src="item.videoUrl" style="width: 100%;"/> -->
          <!-- <video :src="item.videoUrl" controls></video> -->
          <div class="video itemImg">
            <Video-Demo
              :_id="item.id"
              :src="item.videoUrl"
              :bannerIMG="item.mediaUrl"
              :playVideoId.sync="playVideoId"
              style="width: 100%;"
              class="zoom5"
            />
          </div>

          <div class="name">{{item.mediaTitle}}</div>
        </div>
      </div>
    </div>
    <div class="product_catalog" v-if="productList.length>0">
      <div class="top-title" @click="toProductList">
        <span>企业产品目录</span>
        <van-icon name="arrow" />
      </div>

      <div class="item">
        <div
          class="itemList"
          v-for="(item,index) in productList"
          :key="index"
          @click="handleLookItem(item.id,$event)"
        >
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

    <!-- 企业产品目录 -->

    <!-- <van-divider dashed>我是有底线的</van-divider> -->
  </div>
</template>
<script>
import VideoDemo from "@/components/customer/videoPlay/index.vue";
import photo1 from "@/assets/images/man.png";
import photo2 from "@/assets/images/girl.png";
import photo3 from "@/assets/images/center.png";
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/exhibitor";
export default {
  name: "exhibitor_details",
  components: {
    VideoDemo, // 播放
  },
  data() {
    return {
      photo1: photo1,
      photo2: photo2,
      photo3: photo3,
      enterpriseExhibitorsId: this.$route.query.enterpriseExhibitorsId,
      playVideoId: "0",
      active: "home",
      src: require("@/assets/images/video1.mp4"),
      person: [],
      videoList: [],
      productList: [],
      details: "",
    };
  },
  created() {
    this.handelGetExhibitor_details();
  },
  watch: {
    playVideoId(newVal, oldVal) {
      console.log(newVal, "22222wwww");
    },
  },
  methods: {
    // 查看产品详情
    handleLookItem(id) {
      console.log("id", id);
      // 接口地址
      this.$router.push({
        name: "products_details",
        query: {
          // 商品id
          goodsId: id,
        },
      });
    },
    // 商品目录
    toProductList() {
      this.$router.push({
        name: "products",
        query: {
          // 参展商id
          // enterpriseExhibitorsId: '1272913711522246658'
          enterpriseExhibitorsId: this.details.exhibitors.id,
        },
      });
    },
    // 获取公司资料
    toInfomation() {
      const enterpriseExhibitorsId = this.details.exhibitors.id;
      console.log("enterpriseExhibitorsId", enterpriseExhibitorsId);

      this.$router.push({
        path: "/exact_information",
        query: {
          enterpriseExhibitorsId: enterpriseExhibitorsId,
        },
      });
    },
    // 获取企业产品
    getGoods() {
      console.log("details", this.details);
      let params = {
        // enterpriseId: '1272913711522246658',
        // enterpriseId: this.details.exhibitors.id,
        enterpriseExhibitorsId: this.details.exhibitors.id, // 参展商i
        enterpriseId: this.details.exhibitors.enterpriseId, //  企业id
        pageNum: 1,
        pageSize: 10,
        isAsc: 1,
        params: "",
      };
      Api.getGoods(params).then((res) => {
        console.log("商品", res);
        let { code, msg, data, total } = res;
        if (code == 200) {
          this.productList = data;
        }
      });
    },
    // 预约日历
    toaCalendar() {
      this.$router.push({
        path: "/person",
        query: {},
      });
    },
    // 跳转至法人详情
    // goToPerson_juridical () {
    //   this.$router.push({
    //     path: "/juridical_person",
    //     query: {
    //       enterpriseExhibitorsId:this.enterpriseExhibitorsId
    //     }
    //     });
    // },
    // 跳转至企业人物
    goToPerson() {
      this.$router.push({
        path: "/person",
        query: {
          enterpriseExhibitorsId: this.enterpriseExhibitorsId,
          name: this.details.exhibitors.name, //企业名称
          followStatus: this.details.followStatus, //是否关注
        },
      });
    },
    // 获取参展商详情
    handelGetExhibitor_details() {
      console.log(this.enterpriseExhibitorsId);
      Api.getExhibitor_details(this.enterpriseExhibitorsId)
        .then((res) => {
          let { code, msg, data, total } = res;
          console.log("参展商详情", res);

          if (code == 200) {
            this.details = data;
            this.person = data.peopleList;
            this.videoList = data.videoList;
            this.getGoods();
          }
        })
        .catch((err) => {});
    },
    // 跳转至参展公司详情
    goCompany_details() {
      this.$router.push({
        path: "/company_details",
        query: {
          enterpriseExhibitorsId: this.enterpriseExhibitorsId,
        },
      });
    },
    goTo() {
      // 跳转至企业相关视频页
      // this.$router.push({ path: "" });
    },

    // 跳转至企业人物详情
    toPersonDetail(row) {
      this.$router.push({
        path: "/juridical_person",
        query: {
          enterpriseShowPeopleId: row.id,
        },
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.exhibitor_details {
  width: 100%;
  height: 100vh;
  background: #fff;
  color: #000;
  padding-left: 0.24rem;
  box-sizing: border-box;

  .top {
    margin: 0.24rem 0.26rem 0.56rem 0;
    width: 6.96rem;
    height: 3.76rem;
    padding-left: 0.38rem;
    background: linear-gradient(
      300deg,
      rgba(74, 96, 119, 1) 0%,
      rgba(45, 72, 95, 1) 100%
    );
    color: #fff;
    border-radius: 0.16rem;
    position: relative;

    .title {
      font-size: 0.4rem;
      padding-top: 0.4rem;
    }

    .middle {
      font-size: 0.24rem;
      margin-top: 0.18rem;
      margin-bottom: 0.71rem;

      .name_type {
        display: inline-block;
        width: 1.4rem;
        height: 0.36rem;
        text-align: center;
        margin: auto 0;
        background: #e5cc9d;
        border-radius: 0.04rem;
        color: #313437;
      }

      .icon {
        display: inline;
        color: #e5cc9d;
        margin-left: 0.26rem;
        margin-right: 0.14rem;
      }
    }

    .btn {
      font-size: 0.24rem;
      position: absolute;
      right: 0.16rem;
      bottom: 1rem;

      button {
        // width: 1.82rem;
        height: 0.58rem;
        border-radius: 0.29rem;
      }

      .left_btn {
        background-color: #3c546b;
        border: 0.02rem solid rgba(255, 255, 255, 1);
        padding: 0.12rem 0.18rem;
      }

      .right_btn {
        background-color: #e5cc9d;
        border: none;
        margin-left: 0.26rem;
        padding: 0.12rem 0.36rem;
        color: #313437;
      }
    }

    .more {
      // width: 1.48rem;
      // height: 0.34rem;
      line-height: 0.34rem;
      position: absolute;
      left: 0.38rem;
      bottom: 0.26rem;
      font-size: 0.24rem;
      display: flex;
      align-items: center;

      .van-icon {
        // height: 0.34rem;
        line-height: 0.34rem;
        margin-left: 0.1rem;
        margin-top: 0.08rem;
      }
    }

    .type {
      position: absolute;
      top: 0.54rem;
      right: 0.42rem;

      .van-icon {
        width: 0.74rem;
        line-height: 0.34rem;
        text-align: center;
        color: #f8d57e;
      }

      .type_name {
        font-size: 0.24rem;
      }
    }
  }

  .exhibitor {
    .item {
      height: 2.26rem;
      margin-top: 0.6rem;
      // justify-content: space-between;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      display: flex;

      .person {
        height: 2.26rem;
        width: 1.28rem;
        text-align: center;
        word-wrap: break-word;
        word-break: break-all;
        margin-right: 0.6rem;

        img {
          display: block;
          width: 1.28rem;
          height: 1.28rem;
          border-radius: 50%;
          border: 0.02rem solid rgba(233, 233, 233, 1);
        }

        .name {
          // margin-top: 0.06rem;
          font-size: 0.28rem;
          width: 1.28rem;
        }

        .type {
          display: inline-block;
          // width: 1rem;
          // height: 0.32rem;
          padding: 0 0.2rem;
          line-height: 0.32rem;
          background: rgba(157, 161, 166, 1);
          border-radius: 0.08rem;
          font-size: 0.2rem;
          margin: 0.06rem auto;
          color: #ffffff;
        }
      }
    }

    ::-webkit-scrollbar {
      display: none !important;
    }
  }

  .exhibitor_video {
    margin-top: 0.92rem;

    .item {
      margin-top: 0.4rem;
      // height: 3.36rem;
      // justify-content: space-between;
      overflow-x: scroll;
      overflow-y: hidden;
      white-space: nowrap;
      // display: flex;

      .video_box {
        // border: 1px solid red;
        margin-right: 0.4rem;
        display: inline-block;
        .video {
          // width: 4.18rem;
          // height: 2.24rem;
        }

        /deep/.name {
          display: block;
          // margin-top: 0.32rem;
          width: 2.94rem;
          // height: 0.8rem;
          // background-color: pink;
          color: #313437;
          font-size: 0.28rem;
          word-break: break-all;
          white-space: pre-wrap;
          word-wrap: break-word;
          margin-left: 0.04rem;
        }
      }
    }

    ::-webkit-scrollbar {
      display: none !important;
    }
  }

  .product_catalog {
    margin-top: 1.02rem;
    margin-bottom: 1.3rem;

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
          // width: 2.3rem;
          // height: 0.72rem;
          line-height: 0.36rem;
        }
      }
    }
  }
}

.top-title {
  color: #313437;
  position: relative;

  span {
    font-size: 0.32rem;
    font-weight: bold;
  }

  .van-icon {
    position: absolute;
    right: 0.32rem;
    margin-top: 0.12rem;
  }
}

/deep/ .van-divider {
  font-size: 0.24rem;
}
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
</style>
