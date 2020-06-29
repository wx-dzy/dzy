<template>
  <div class="person">
    <div class="topCard">
      <img src="../../../../assets/images/logo1.jpg" alt />
      <div class="name">风风火火汽车电子公司</div>
      <div class="date">企业成立日期：2000.03.01</div>
      <div class="huiyuan">
        <van-icon class="icon iconfont yz-huiyuan" />
        <span>会员</span>
      </div>
    </div>
    <div class="ItemContainer" v-for="(item,index) in listItem" :key="index">
      <img src="item.src" alt />
      <div class="center">
        <div class="name">{{item.name}}</div>
        <div class="type">{{item.type}}</div>
      </div>
      <!-- <button class="right">预约面试</button> -->
      <van-icon name="arrow" />
    </div>
    <van-divider dashed>我是有底线的</van-divider>
  </div>
</template>
<script>
export default {
  name: "person",
  data() {
    return {
      listItem: [
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "张琪琪",
          type: "法人"
        },
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "张琪琪",
          type: "法人"
        },
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "张琪琪",
          type: "法人"
        },
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "张琪琪",
          type: "法人"
        }
      ]
    };
  }
};
</script>
<style lang='scss' scoped>
.person {
  width: 7.5rem;
  height: 100%;
  background-color: #fff;
  padding-left: 0.28rem;
  box-sizing: border-box;
  .topCard {
    width: 6.96rem;
    height: 2.66rem;
    margin-top: 0.26rem;
    margin-bottom: 0.48rem;
    background: linear-gradient(
      300deg,
      rgba(74, 96, 119, 1) 0%,
      rgba(45, 72, 95, 1) 100%
    );
    color: #fff;
    border-radius: 0.16rem;
    position: relative;
    padding-left: 0.38rem;
    img {
      height: 1.6rem;
      width: 1.6rem;
      position: absolute;
      top: 0.32rem;
      right: 0.4rem;
    }
    .name {
      padding-top: 0.4rem;
      font-size: 0.4rem;
      font-weight: bold;
      margin-bottom: 0.05rem;
    }
    .date {
      margin-top: 0.18rem;
      font-size: 0.3rem;
    }
    .huiyuan {
      position: absolute;
      left: 0.28rem;
      bottom: 0.42rem;
      font-size: 0.32rem;
      .icon {
        display: inline;
        color: rgba(229, 204, 157, 1);
        margin-left: 0.26rem;
        margin-right: 0.14rem;
      }
      span {
        color: #ffffff;
      }
    }
  }
}

.ItemContainer {
  width: 6.96rem;
  height: 1.82rem;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
  border-radius: 0.16rem;
  position: relative;
  margin-bottom: 0.4rem;
  img {
    width: 1.44rem;
    height: 1.48rem;
    border-radius: 50%;
    border: 1px solid #9da1a6;
    position: absolute;
    left: 0.26rem;
    top: 0.16rem;
  }
  .center {
    position: absolute;
    top: 0.52rem;
    left: 2.1rem;
    .name{
      font-size: 0.32rem;
    }
    .type{
      font-size: 0.2rem;
      background-color: #fff;
      background-color: #9da1a6;
      width: 0.8rem;
      height: 0.32rem;
      line-height: 0.32rem;
      border-radius:0.08rem;
      text-align: center;
      color: #fff;
    }
  }
  .right {
    width: 1.68rem;
    height: 0.6rem;
    background: rgba(248, 213, 126, 1);
    border-radius: 0.29rem;
    border: none;
    position: absolute;
    right: 0.4rem;
    bottom: 0.54rem;
  }
  .van-icon{
    position: absolute;
    top: 0.82rem;
    right: 0.3rem;
  }
}
/deep/ .van-divider {
  font-size: 0.24rem;
  margin-top: 1.42rem;
}
</style>