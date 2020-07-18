// 展会日历  id=1272919606905835521
<template>
  <div class="home_calendar">
    <div class="head" @click="handleWith">
      <img src="@/assets/images/home/head.png" alt />
    </div>

    <van-tabs v-model="active" @click="handleTabClick" :border="false">
      <!-- :disabled="item.enterpriseShowCalendarList.length ? false : true" -->
      <van-tab v-for="(item,index) in details" :key="index">
        <template #title>
          <span
            v-if="item.enterpriseShowCalendarList && item.enterpriseShowCalendarList.length"
            class="sta"
          >有招</span>
          <!-- >有展</span> -->
          {{ item.monthDesc }}
        </template>
      </van-tab>
    </van-tabs>
    <!-- 占位图 -->
    <!-- <img
      v-if="!itemList.enterpriseShowCalendarList || !itemList.enterpriseShowCalendarList.length"
      src="@/assets/images/null.png" class="nullImg" alt
    />-->

    <!-- 占位图 -->
    <van-empty
      v-if="!itemList.enterpriseShowCalendarList || !itemList.enterpriseShowCalendarList.length"
      image="search"
      description="暂无内容"
    />

    <!-- 列表内容 -->
    <div class="content" v-else>
      <div class="container-water-fall">
        <waterfall
          :col="col"
          :data="itemList.enterpriseShowCalendarList"
          @loadmore="loadmore"
          @scroll="scroll"
          :lazyDistance="50"
        >
          <template>
            <div
              class="cell-item"
              v-for="(obj,_index) in itemList.enterpriseShowCalendarList"
              :key="_index"
              @click="handleLook(obj)"
            >
              <img v-if="obj.mediaUrl" :src="obj.mediaUrl" alt="加载错误" />
              <div class="item-body">
                <div class="item-desc">
                  <p>{{obj.showName}}</p>
                  <p class="timer">
                    {{obj.startDate}}
                    {{obj.endDate ? '-' + obj.endDate : ''}}
                  </p>
                </div>

                <div class="item-footer">
                  <p class="like-total clearfix">
                    <!-- <span class="pull-left">地点:{{obj.provinceName}}{{obj.cityName}}</span> -->
                    <span class="pull-left">地点：{{obj.cityName}}</span>
                    <span
                      class="status"
                      :class="obj.showFormat == 1 ? 'style1' : obj.showFormat == 2 ? 'style2' :  ''"
                    >{{ obj.showFormat == 1 ? '仅线上' : obj.showFormat == 2 ? '仅线下' : obj.showFormat == 3 ? '线上/线下' : ''}}</span>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </waterfall>
      </div>
    </div>

    <van-divider
      dashed
      v-show="itemList.enterpriseShowCalendarList && itemList.enterpriseShowCalendarList.length"
    >
      <!-- <span class="bot_text">这里展会信息真的很多</span> -->
      <span class="bot_text">这里信息真的很多</span>
    </van-divider>

    <!-- 占位图 -->
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
import img1 from "@/assets/images/home/1.png";
import img2 from "@/assets/images/home/2.png";
import img3 from "@/assets/images/home/3.png";

// import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "home_calendar",
  components: {
    // footerNav
  },
  data() {
    return {
      title: "",
      id: "",
      active: "",
      details: [],
      itemList: {},
      // 列数
      col: 2
      // loading: false,
    };
  },

  computed: {},

  created() {
    this.init();
  },

  methods: {
    init() {
      this.title = this.$route.query.name + this.doHandleYear() + "招采日历";
      // this.title = this.$route.query.name + this.doHandleYear() + "展会日历";
      this.id = this.$route.query.id;
      document.title = this.title;
      // 获取默认数据
      this.handleDetails();
    },
    // 获取详情
    handleDetails() {
      let param = this.id;
      Api.getCalendarListByEnterpriseId(param)
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.details = data;
            this.itemList = this.details[0];
          }
        })
        .catch(err => {
          this.details = [];
        });
    },

    // 获取当前年
    doHandleYear(tYear) {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      return tYear;
    },

    // 咨询客服
    handleWith() {
      util.warning("敬请期待！");
    },

    // tab切换
    handleTabClick(index, title) {
      this.itemList = this.details[index];
    },

    // 滚动事件
    scroll(scrollData) {
      // console.log(scrollData);
    },

    loadmore(index) {
      // console.log(index);
    },

    // 查看展会宣传片
    handleLook(row) {
      this.$router.push({
        name: "home_trailer",
        query: {
          id: row.id,
          title: this.title
        }
      });
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  }
};
</script>

<style lang="scss">
.home_calendar {
  .container-water-fall {
    .vue-waterfall-column {
      width: 3.36rem !important;
      margin-right: 0.28rem;
      .cell-item {
        margin-bottom: 0.2rem;
      }
      img {
        width: 100%;
      }
      .item-desc {
        padding-top: 0.1rem;
        font-size: 0.28rem;
        color: rgba(49, 52, 55, 1);
        line-height: 0.44rem;
        .timer {
          font-size: 0.24rem;
        }
      }
      .like-total {
        font-size: 0.24rem;
        color: rgba(157, 161, 166, 1);
        line-height: 0.3rem;
        padding: 0.1rem 0;

        .status {
          float: right;
          padding: 0 0.03rem;
          font-size: 0.2rem;
          color: rgba(0, 0, 0, 1);
          line-height: 0.28rem;
          background: rgba(248, 213, 126, 1);
          border-radius: 0.08rem;
        }
        .status.style1 {
          background: rgba(223, 216, 247, 1);
        }
        .status.style2 {
          background: rgba(193, 232, 238, 1);
        }
      }
    }
    .vue-waterfall-column:last-child {
      margin-right: 0;
    }
  }
  .van-tabs {
    margin-bottom: 0.41rem;
  }
  .van-tabs--line .van-tabs__wrap {
    width: 100%;
  }
  .van-tab__pane,
  .van-tab__pane-wrapper {
    display: none;
  }
  .van-tab--active {
    color: #0091ff;
  }
  .van-tabs__line {
    background-color: #f8d57e;
  }
  .sta {
    position: absolute;
    right: -0.07rem;
    top: 0.1rem;
    padding: 0 0.04rem;
    font-size: 0.16rem;
    color: rgba(49, 52, 55, 1);
    line-height: 0.26rem;
    background: rgba(248, 213, 126, 1);
    border-radius: 0.13rem;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "../home.scss";
.home_calendar {
  .nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
  }
}
</style>

