<template>
  <!-- 参展商目录-首页 -->
  <div class="exhibitor_home">
    <div class="top">
      <div class="left">
        <div class="title">汽配展馆</div>
        <div class="item">
          共
          <span>86</span>家参展商
        </div>
      </div>
      <div class="right">
        <van-button class="left_btn" round size="small">咨询客服</van-button>
        <van-button class="right_btn" round size="small" color="#ffd36f">参观预约</van-button>
      </div>
    </div>
    <div class="item-box">
      <van-tabs v-model="active" class="tab" swipe-threshold="5" title-active-color="#000">
        <van-tab title="全部">
          <div class="list" v-for="(item,index) in list" :key="index" @click="goTo">
            <img :src="item.src" alt />
            <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="type">
                <span>{{item.type}}</span>
              </div>
              <div class="num">
                <span class="warning">约谈：{{item.warning}}次</span>
                <span class="warning">关注：{{item.follow}}次</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="内饰馆">
          <div class="list" v-for="(item,index) in list" :key="index" @click="goTo">
            <img :src="item.src" alt />
            <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="type">
                <span>{{item.type}}</span>
              </div>
              <div class="num">
                <span class="warning">约谈：{{item.warning}}次</span>
                <span class="warning">关注：{{item.follow}}次</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="外饰馆" badge="火爆">
          <div class="list" v-for="(item,index) in list" :key="index" @click="goTo">
            <img :src="item.src" alt />
            <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="type">
                <span>{{item.type}}</span>
              </div>
              <div class="num">
                <span class="warning">约谈：{{item.warning}}次</span>
                <span class="warning">关注：{{item.follow}}次</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="香氛馆">
          <div class="list" v-for="(item,index) in list" :key="index" @click="goTo">
            <img :src="item.src" alt />
            <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="type">
                <span>{{item.type}}</span>
              </div>
              <div class="num">
                <span class="warning">约谈：{{item.warning}}次</span>
                <span class="warning">关注：{{item.follow}}次</span>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="电子产品">
          <div class="list" v-for="(item,index) in list" :key="index" @click="goTo">
            <img :src="item.src" alt />
            <div class="right">
              <div class="title">{{item.title}}</div>
              <div class="type">
                <span>{{item.type}}</span>
              </div>
              <div class="num">
                <span class="warning">约谈：{{item.warning}}次</span>
                <span class="warning">关注：{{item.follow}}次</span>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

    <van-divider dashed>我是有底线的</van-divider>
    <!-- <van-divider
      :style="{ color: '#a5a9ae', borderColor: '#a5a9ae', padding: '1.44rem 0.25rem' }"
    >我是有底线的</van-divider>-->
  </div>
</template>
<script>
export default {
  name: "exhibitor_home",
  components: {},
  data() {
    return {
      active: 0,
      list: [
        {
          src: "/assets/images/logo1.jpg",
          title: "01风风火火汽车电子公司",
          type: "电子产品展馆",
          warning: "236",
          follow: "889"
        },
        {
          src: "../../assets/images/logo2.jpg",
          title: "01风风火火汽车电子公司",
          type: "电子产品展馆",
          warning: "236",
          follow: "889"
        },
        {
          src: "../../assets/images/logo3.jpg",
          title: "01风风火火汽车电子公司",
          type: "电子产品展馆",
          warning: "236",
          follow: "889"
        },
        {
          src: "",
          title: "01风风火火汽车电子公司",
          type: "电子产品展馆",
          warning: "236",
          follow: "889"
        },
        {
          src: "",
          title: "01风风火火汽车电子公司",
          type: "电子产品展馆",
          warning: "236",
          follow: "889"
        }
      ]
    };
  },
  created() {},
  methods: {
    goTo(){
      this.$router.push({ path: "/exhibitor_details.vue" });
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
      width: 2.23rem;
      height: 1.11rem;
      .title {
        font-size: 19px;
        letter-spacing: 2px;
        font-weight: 550;
      }
      .item {
        margin-top: 0.1rem;
        font-size: 12px;
        color: #b2b6bb;
      }
    }
    .right {
      position: absolute;
      bottom: 0;
      display: inline-block;
      margin-left: 0.79rem;
      font-size: 12px;
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
    //   margin-bottom: 1.44rem;
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
          //   font-family:"楷体";
          font-weight: bold;
        }
        .type {
          span {
            font-size: 9px;
            background-color: #fed26e;
            padding: 0 5px;
            border-radius: 2px;
          }
        }
        .num {
          font-size: 12px;
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
  font-size: 10px;
}
/deep/ .van-tabs__line {
  background-color: #ffcf62;
}
</style>