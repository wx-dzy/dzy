<template>
  <!-- 参展商目录-首页  -->
  <div class="exhibitor_home">
    <div class="top"><!--v-if="totalExhibitors==0 ? false : true"-->
      <div class="left">
        <div class="title">{{showName}}</div>
        <div class="item">
          共
          <!-- <span>{{totalExhibitors}}</span>家参展商 -->
          <span>{{totalExhibitors}}</span>家供应商

        </div>
      </div>
      <div class="right" style="display:flex;">
        <van-button class="left_btn" round size="small">咨询客服</van-button>
        <van-button class="right_btn" round size="small" color="#ffd36f" @click="toHomeOrder">参观预约</van-button>
      </div>
    </div>
    <div class="item-box" v-if="totalExhibitors>0 ? true : false">
      <van-tabs v-model="active" class="tab" swipe-threshold="5" title-active-color="#000"  @click="changeTab">
        <van-tab title="全部">
          <div class="list" v-for="item in list" :key="item.index" @click="goTo(item.id,$event)" name="0">
            <img :src="item.logo" alt />
            <div class="right">
              <div class="title">{{item.enterpriseName}}</div>
              <div class="type">
                <span>{{item.enterpriseShowPlaceName}}</span>
              </div>
              <div class="num">
                <span class="warning">约谈：{{item.orderTimes}}次</span>
                <span class="warning">关注：{{item.followTimes}}次</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab v-for="item_1 in details.showPlaceList" :key="item_1.index" :title="item_1.placeName" :name="item_1.id">
          <div class="list" v-for="item in list" :key="item.index" @click="goTo(item.id,$event)">
            <img :src="item.logo" alt />
            <div class="right">
              <div class="title">{{item.enterpriseName}}</div>
              <div class="type">
                <span>{{item.enterpriseShowPlaceName}}</span>
              </div>
              <div class="num">
                <span class="warning">约谈：{{item.orderTimes}}次</span>
                <span class="warning">关注：{{item.followTimes}}次</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <img  src="@/assets/images/null.png" class="nullImg" v-else alt />
    <van-divider dashed v-if="totalExhibitors==0 ? false : true">我是有底线的</van-divider>
    <img v-if="list.length == 0" src="@/assets/images/null.png" class="nullImg" alt />
  </div>
</template>
<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/exhibitor";
import nullImg from "@/assets/images/null.png";
export default {
  name: "exhibitor_home",
  components: {},
  data() {
    return {
      enterpriseShowId: "", // 展会id
      placeId: "0",
      active: 0,
      showName: "",
      totalExhibitors: "",
      details: {},
      list: [
      //   {
      //     src: require("../../../assets/images/logo1.jpg"),
      //     title: "01风风火火汽车电子公司",
      //     type: "电子产品展馆",
      //     warning: "236",
      //     follow: "889"
      //   },
      ]
    };
  },
  created() {
    this.handleGetDetail();
    this.handleGetSwiperText();
  },
  methods: {
    // 参观预约
    toHomeOrder() {
      this.$router.push({
        path: '/home_order',
        query: {
          enterpriseShowId: this.$route.query.enterpriseShowId
        }
      })
    },
    //切换tab
    changeTab (title,name) {
      this.list = []
      let placeId_1 = title
      console.log('placeId_1',placeId_1);
     let param = {
         
        enterpriseShowId: this.$route.query.enterpriseShowId,
        // enterpriseShowId: 1272919606301855745,
        placeId: placeId_1
        // placeId: 0
      };
      Api.getExhibitorList(param)
        .then(res => {
          console.log(res);
          let { code, msg, data, total } = res;
          console.log("res");
          console.log('获取列表',res);
          if (code == 200) {
            this.list = data;
            console.log(this.item[0].logo);
          }
        })
        .catch(err => {
          // console.log(err);
        });
    },
    // 获取列表
    handleGetDetail() {
         console.log('enterpriseShowId',this.$route.query.enterpriseShowId);
         console.log('placeId',this.$route.query.placeId);

      const reg = "";
      let param = {
         
        enterpriseShowId: this.$route.query.enterpriseShowId,
        // placeId: this.$route.query.placeId
        placeId: 0
      };
      Api.getExhibitorList(param)
        .then(res => {
          let { code, msg, data, total } = res;
          console.log("res");
          console.log('获取列表',res);

          if (code == 200) {
            this.list = data;
          }
        })
        .catch(err => {
          // console.log(err);
        });
    },
    //获取头部
    handleGetSwiperText() {
      Api.getSwiperText(this.$route.query.enterpriseShowId)
        .then(res => {
          let { data, code, msg, total } = res;
          console.log('getSwiperTe5444444',res);
          if (code == 200) {
            this.details = data;
            this.showName = data.enterpriseShow.showName;
            this.totalExhibitors = data.enterpriseShow.totalExhibitors;
            var enterpriseExhibitorsId = data.enterpriseShow.id;
          }
        })
        .catch(err => {});
    },
    //跳转至
    goTo(enterpriseId,event) {
      console.log('enterpriseId',enterpriseId);
      
      this.$router.push({
        path: "/exhibitor_details",
        query: {
          // 参展商id
          enterpriseExhibitorsId: enterpriseId
        }
      });
    }
  },
  mounted() {
    //设置全局背景
  }
};
</script>
<style lang='scss' scoped>
.exhibitor_home {
  // padding: 0;
  // position: relative;
  width: 100%;
  height: 100vh;
  background: #fff;
  color: #000;
  // box-sizing: border-box;

  .top {
    width: 7.5rem;
    height: 1.41rem;
    // background-color: pink;
    margin-top: 0.42rem;
    position: relative;
    margin-bottom: 0.84rem;
    .left {
      display: inline-block;
      margin-left: 0.5rem;
      // width: 2.23rem;
      height: 1.11rem;
      .title {
        font-size: 0.4rem;
        letter-spacing: 0.02rem;
        font-weight: 550;
      }
      .item {
        margin-top: 0.1rem;
        font-size: 0.24rem;
        color: #b2b6bb;
      }
    }
    .right {
      position: absolute;
      bottom: 0;
      right: 0.3rem;
      display: inline-block;
      margin-left: 0.79rem;
      font-size: 0.26rem;
      .left_btn {
        border: 1px solid #b2b6bb;
        color: #b2b6bb;
      }
      .right_btn {
        border: 1px solid #b2b6bb;
        margin-left: 0.29rem;
        color: #000 !important;
      }
    }
  }
  .item-box {
    margin-bottom: 1.3rem;
    // overflow: scroll;
    // height: calc(100% - 2.67rem);
    .list {
      margin-left: 0.29rem;
      margin-top: 0.41rem;
      width: 6.96rem;
      height: 1.76rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
      border-radius: 0.16rem;
      position: relative;

      img {
        margin-left: 0.22rem;
        height: 1.7rem;
        width: 1.72rem;
        position: absolute;
        left: 0;
      }

      .right {
        position: absolute;
        left: 2.26rem;
        .title {
          margin-top: 0.26rem;
          width: 4.02rem;
          height: 0.54rem;
          font-size: 0.32rem;
          line-height: 0.44rem;
          font-weight: bold;
        }
        .type {
          span {
            font-size: 0.18rem;
            background-color: #fed26e;
            padding: 0 5px;
            border-radius: 2px;
          }
        }
        .num {
          font-size: 0.24rem;
          color: #a5a9ae;
          margin-top: 0.1rem;
          span {
            display: inline-block;
            width: 2.12rem;
          }
        }
      }
    }
  }
}
/deep/ .van-info {
  top: -5px;
  background-color: #ff7109;
  font-size: 0.22rem;
}
/deep/ .van-tabs__line {
  background-color: #ffcf62;
}
/deep/ .van-tab--active {
  font-size: 0.32rem;
  // font-weight: bold;
}
/deep/ .van-tab__text--ellipsis {
  font-size: 0.28rem;
}
/deep/ .van-divider {
  font-size: 0.24rem;
}
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
</style>