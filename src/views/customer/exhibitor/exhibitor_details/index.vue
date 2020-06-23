<template>
  <!-- 参展商详情 -->
  <div class="exhibitor_details">
    <div class="top">
      <div class="title">风风火火汽车电子公司</div>
      <div class="middle">
        <span class="name_type">电子产品馆</span>
        <i class="huiyuan">
          <van-icon class="icon iconfont yz-huiyuan" />
          <span>会员</span>
        </i>
      </div>
      <div class="btn">
        <button class="left_btn">获取公司资料</button>
        <button class="right_btn">预约面谈</button>
        <!-- <van-button round size="small"></van-button>
        <van-button round size="small" color="#ffd36f">预约面谈</van-button>-->
      </div>
      <div class="more">
        公司更多信息
        <van-icon name="arrow" />
      </div>
      <div class="type">
        <!-- <van-button icon="icon iconfont yz-yiguanzhu" type="default" class="btnNone">已关注</van-button> -->
        <van-icon class="icon iconfont yz-yiguanzhu" />
        <div>已关注</div>
      </div>
    </div>
    <div class="exhibitor">
      <div class="top-title">
        <span>企业人物</span>
        <van-icon name="arrow" />
      </div>
      <div class="item">
        <!-- <div class="box"> -->
        <div class="person" v-for="(item,index) in person" :key="index">
          <!-- <div class="personBox"> -->
          <img src="../../../../assets/images/logo1.jpg" alt />
          <div class="name">{{item.name}}</div>
          <div class="type">{{item.type}}</div>
          <!-- </div> -->
        </div>
        <!-- <van-swipe
          class="my-integral"
          width="128"
          indicator-color="white"
          :show-indicators="false"
          :loop="false"
        >
          <van-swipe-item class="my-integral-item" v-for="(item,index) in person" :key="index">
            <div class="goods">
              <div class="img" style="height:90px;">
                <img src="../../../../assets/images/logo1.jpg" alt />
              </div>
              <div class="name">{{item.name}}</div>
              <div class="type">{{item.type}}</div>
            </div>
          </van-swipe-item>
        </van-swipe>-->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "exhibitor_details",
  components: {},
  data() {
    return {
      person: [
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "王小花",
          type: "法人"
        },
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "李达达",
          type: "总经理"
        },
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "张晓鹏",
          type: "销售"
        },
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "易烊千玺",
          type: "销售"
        }
      ]
    };
  },
  created() {},
  methods: {}
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
      font-size: 17px;
      padding-top: 0.4rem;
    }
    .middle {
      font-size: 10px;
      margin-top: 0.18rem;
      margin-bottom: 0.71rem;
      .name_type {
        display: inline-block;
        width: 1.4rem;
        height: 0.36rem;
        text-align: center;
        margin: auto 0;
        background: rgba(229, 204, 157, 1);
        border-radius: 0.04rem;
        color: #313437;
      }
      .icon {
        display: inline;
        color: rgba(229, 204, 157, 1);
        margin-left: 0.26rem;
        margin-right: 0.14rem;
      }
    }
    .btn {
      font-size: 12px;
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
      }
    }
    .more {
      // width: 1.48rem;
      height: 0.34rem;
      // line-height: 0.34rem;
      position: absolute;
      left: 0.38rem;
      bottom: 0.26rem;
      font-size: 12px;
      .van-icon {
        height: 0.34rem;
        // line-height: 0.34rem;
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
        height: 0.34rem;
        text-align: center;
        color: #f8d57e;
      }
    }
  }
  .exhibitor {
    height: 0.44rem;
    line-height: 0.44rem;
    position: relative;
    .top-title {
      span {
        font-size: 15px;
        font-weight: bold;
      }
      .van-icon {
        position: absolute;
        right: 0.32rem;
        margin-top: 0.12rem;
      }
    }
    .item {
      width: 100%;
      .person {
        display: flex;
        flex: 25%;

        img {
          width: 1.28rem;
          height: 1.28rem;
          border: 1px solid red;
        }
      }
    }
  }
}
</style>