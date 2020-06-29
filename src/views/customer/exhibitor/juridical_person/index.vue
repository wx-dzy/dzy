<template>
  <!-- 参展商目录-法人详情页 -->
  <div class="juridical_person">
    <div class="topCard">
      <div class="box">
        <div class="company_name">好招数创（北京）科技有限公司</div>
        <div class="item">
          <span class="name">李达达</span>
          <span class="type">法人</span>
        </div>
        <div class="message">
          <div class="phone">
            <van-icon class="icon iconfont yz-dianhua" />
            <span>86-1351234567</span>
          </div>
          <div class="email">
            <van-icon class="icon iconfont yz-youjian" />
            <span>lidada@163.com</span>
          </div>
          <div class="address">
            <van-icon class="icon iconfont yz-dizhi" />
            <span class="addressText">北京市朝阳区新源南路8号托原西塔26层北京市朝阳区新源南路8号托原西塔26层北京市朝阳区新源南路8号托原西塔26层</span>
          </div>
        </div>
        <button class="add_follow" @click="favor">
          <!-- <van-icon name="plus" /> -->
          <div class="type_name">{{content}}</div>
        </button>
      </div>
      <img src alt />
    </div>
    <div class="personCard">
      <div class="left"></div>
      <div class="middle">
        <img src alt />
        <div class="rightCard">
          <div class="title">
            <span class="name">李达达</span>
            <span class="type">法人</span>
          </div>
          <div class="company_name">好招数创（北京）科技有限公司</div>
          <div class="message">
            <div class="phone">
              <van-icon class="icon iconfont yz-dianhua" />
              <span>86-1351234567</span>
            </div>
            <div class="email">
              <van-icon class="icon iconfont yz-youjian" />
              <span>lidada@163.com</span>
            </div>
            <div class="address">
              <van-icon class="icon iconfont yz-dizhi" />
              <span class="addressText">北京市朝阳区新源南路8号托原西塔26层北京市朝阳区新源南路8号托原西塔26层北京市朝阳区新源南路8号托原西塔26层</span>
            </div>
          </div>
        </div>
      </div>
      <div class="right"></div>
      <!-- <div class="text">2/4</div> -->
    </div>
    <div class="text">2/4</div>
    <div class="btn">
      <button class="share">分享名片</button>
      <button>交换名片</button>
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
    </div>
    <div class="myCompany">
      <div class="title">我的企业</div>
      <div class="item_text">
        <div class="name" v-for="(item,index) in companyList" :key="index">{{item.name}}</div>
      </div>
      <div class="type">
        <van-icon class="icon iconfont yz-yiguanzhu" />
        <span>已关注</span>
      </div>
      <div style="text-align: center;">收起</div>
    </div>
    <button class="time">预约面谈还剩12小时</button>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      content: "+关注",
      companyList: [
        {
          name: "风风火火汽车电子公司"
        },
        {
          name: " 2020年B2B创新型企业"
        },
        {
          name: " 高科技高新企业"
        }
      ]
    };
  },
  created() {},
  methods: {
    favor(e) {
      this.liked = !this.liked;
      if (this.liked) {
        this.content = "已关注";
      } else {
        this.content = "+关注";
      }
    }
  }
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
        top: 3.56rem;
        background-color: rgba(248, 213, 126, 1);
        border: none;
        border-radius: 0.5rem 0 0 0.5rem;
        height: 0.5rem;
        width: 1.3rem;
        .van-icon,
        .type_name {
          font-size: 0.24rem;
          display: inline-block;
        }
      }
    }
  }
  .personCard {
    height: 3.64rem;
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
      margin: 0 auto;
      width: 1.7rem;
      height: 0.6rem;
      background: rgba(248, 213, 126, 1);
      border-radius: 0.29rem;
      border: none;
      font-size: 0.24rem;
      color: rgba(49, 52, 55, 1);
    }
    .share {
      margin-left: 1.96rem;
      margin-right: 0.18rem;
    }
  }
  .synopsis {
    margin-left: 0.52rem;
    margin-top: 1.1rem;
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
  .time {
    width: 6.84rem;
    height: 0.8rem;
    margin-left: 0.34rem;
    margin-top: 1.12rem;
    border: none;
    background: rgba(248, 213, 126, 1);
    border-radius: 0.16rem;
  }
}
</style>