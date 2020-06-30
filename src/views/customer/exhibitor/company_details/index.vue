<template>
  <!--参展商主页-公司详情  -->
  <div class="company_details">
    <div class="top">
      <div class="name">风风火火汽车电子公司</div>
      <div class="middle">
        <span class="name_type">电子产品馆</span>
        <i class="huiyuan">
          <van-icon class="icon iconfont yz-huiyuan" />
          <span>会员</span>
        </i>
      </div>
      <div class="address">天津市南开区黄河道与广开四马路交叉路口往西约50米（格调春天花园）</div>
      <div class="type">
        <van-icon class="icon iconfont yz-guanzhu" />
        <div class="type_name">关注</div>
      </div>
    </div>
    <div class="details">
      <van-tabs v-model="active" class="tab" swipe-threshold="4" title-active-color="#000">
        <van-tab title="工商信息">
          <div class="item">
            <div class="company_name">企业名称：风风火火汽车电子公司</div>
            <div class="company_address">企业住所：北京朝阳</div>
            <div class="company_people">企业法定代表人姓名：你猜啊</div>
            <div class="company_num">企业注册资本数额：{{34324}}万</div>
          </div>
        </van-tab>
        <van-tab title="服务承诺"></van-tab>
        <van-tab title="资质信息"></van-tab>
        <van-tab title="荣誉信息"></van-tab>
      </van-tabs>
    </div>
    <div class="synopsis">
      <div class="title">简介</div>
      <div class="item_text">
        带领OPPO公司转型专攻智能手机市场，先后发布
        了X903、全球最薄的智能手机 Finder、以动态美颜
        引发手机自拍革命的“自拍神器”Uike2，首款搭
        载1080P高清屏幕的旗舰手机Find5、全球首款配
        旋转摄像头的大屏拍照手机N1，搭载全球充电最
        快最安全的vooC闪充技术、配备500万高清画质拍
        照技术的5.5英寸2K屏幕手机Find7，不断引领中
        国智能手机市场的新潮流。
      </div>
      <div class="imgs">
        <img src="../../../../assets/images/编组.png" alt />
      </div>
      <div class="item_text">
        带领OPPO公司转型专攻智能手机市场，先后发布
        了X903、全球最薄的智能手机 Finder、以动态美颜
        引发手机自拍革命的“自拍神器”Uike2，首款搭
        载1080P高清屏幕的旗舰手机Find5、全球首款配
        旋转摄像头的大屏拍照手机N1，搭载全球充电最
        快最安全的vooC闪充技术、配备500万高清画质拍
        照技术的5.5英寸2K屏幕手机Find7，不断引领中
        国智能手机市场的新潮流。
      </div>
    </div>

    <button>拨打客服电话</button>
  </div>
</template>
<script>
export default {
  name: "company_details",
  components: {},
  data() {
    return {
      active: 0
    };
  },
  created() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.company_details {
  padding-left: 0.28rem;
  background-color: #fff;
  .top {
    .name {
      font-size: 0.4rem;
      margin-top: 0.38rem;
      font-weight: bold;
    }
    .middle {
      font-size: 0.24rem;
      margin-top: 0.18rem;
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
    .address {
      margin-top: 0.26rem;
      width: 5.66rem;
      font-size: 0.28rem;
      word-break: break-all;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .type {
      position: absolute;
      top: 0.64rem;
      right: 0.56rem;
      .van-icon {
        width: 0.74rem;
        height: 0.34rem;
        text-align: center;
        color: #c8ccd3;
        text-align: center;
      }
      .type_name {
        font-size: 0.24rem;
        width: 0.5rem;
        margin: 0 auto;
      }
    }
  }
  .details {
    margin-top: 0.92rem;
    .item {
      height: 2.98rem;
      width: 6.96rem;
      margin-top: 0.35rem;
      padding: 0.46rem;
      box-sizing: border-box;
      font-size: 0.28rem;
      background-color: #f7f8fa;
    }
  }
  .synopsis {
    margin-left: 0.2rem;
    margin-top: 0.62rem;
    .title {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .item_text {
      font-size: 0.28rem;
      margin-top: 0.32rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .imgs {
      width: 7.5rem;
      height: 3.8rem;
      margin-left: -0.5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  button {
    display: block;
    width: 6.84rem;
    height: 0.8rem;
    border: none;
    margin-bottom: 0.48rem;
    background-color: #f8d57e;
    border-radius: 0.08rem;
  }
}
/deep/ .van-tabs__line {
  background-color: #ffcf62;
}
/deep/ .van-tab--active {
  font-size: 0.32rem;
}
/deep/ .van-tab__text--ellipsis {
  font-size: 0.28rem;
}
</style>