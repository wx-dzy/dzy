// 我的
<template>
  <div class="personal footerPad" v-if="1">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-row class="info">
        <van-col span="5">
          <van-image round width="0.96rem" height="0.96rem" :src="detail.userInfo.avatar" />
        </van-col>
        <van-col span="14">
          <h3 class="name">{{detail.userInfo.nickname}}</h3>
          <span
            v-show="detail.userInfo.authStatus ==0 || detail.userInfo.authStatus==1"
            class="status"
          >{{detail.userInfo.authStatus == 1 ? '已认证' : detail.userInfo.authStatus == 0 ? '未认证' : '' }}</span>
        </van-col>
        <van-col span="5" class="text-right" @click="handleSetInfo">
          <span class="inffAll">
            个人信息
            <van-icon name="arrow" />
          </span>
        </van-col>

        <van-col span="24" class="activeInfo clear">
          当前身份：
          {{detail.userInfo.identity == 1 ? '参展方' : detail.userInfo.identity == 2 ? '参观方' : '' }}
          <van-button
            round
            size="mini"
            color="#F8D57E"
            class="switchInfo pull-right"
            @click="changeIdentity = true"
          >切换身份</van-button>
        </van-col>
      </van-row>

      <!-- 名片 -->
      <div class="visitingCard" v-if="detail.userCardList.length">
        <visitingCard
          :dataList.sync="detail.userCardList"
          :disabled="true"
          @successCBK="handleActive"
        ></visitingCard>
      </div>

      <div class="myOrder">
        <h3 class="title">我的预约</h3>
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="listData.length ? '----- 我是有底线的 -----' : '暂无预约'"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
        >
          <van-cell
            v-for="(item, index)  in listData"
            :key="index"
            class="contItem"
            :class="index+1 == listData.length ? 'margin0' : ''"
          >
            <h5 class="tit">{{ item.localDate }} {{ item.enterpriseShowName }}</h5>
            <van-row
              class="item_i"
              v-for=" (_item, _index ) in item.interviewList"
              :key="'_item'+_index"
              @click="handleLook(_item)"
            >
              <van-col span="6">
                <!-- <img :src="item.img" alt class="photo" /> -->
                <img :src="_item.interviewUserLogo" alt class="photo" />
              </van-col>
              <van-col span="18" class="con">
                <p class="nterview">{{ _item.interviewEnterpriseName }}</p>
                <p class="color999 clearfix">
                  {{ _item.interviewDate }} {{ isToday(_item.interviewDate) ? '今日' : ''}}{{ _item.interviewTime.slice(0,5) }}
                  <van-button
                    round
                    size="mini"
                    color="#F8D57E"
                    plain
                    :disabled="!_item.id"
                    class="pull-right"
                    @click="handleCancel(_item)"
                  >{{ _item.id ? '取消预约' : '已取消'}}</van-button>
                </p>
              </van-col>
            </van-row>
          </van-cell>
        </van-list>
      </div>
      <!-- <footer-nav :active="active" /> -->
    </van-pull-refresh>

    <ul class="btnWrap clearfix">
      <li class="item pull-left" @click="hanleLook(1)">
        <p class="text pad30">我索取的企业资料</p>
        <img src="@/assets/images/myOrderBg1.png" alt />
      </li>
      <li class="item pull-right" @click="hanleLook(2)">
        <p class="text pad48">我的询价</p>
        <img src="@/assets/images/myOrderBg2.png" alt />
      </li>
    </ul>
    <footer-nav :active="active" />

    <van-overlay :show="changeIdentity" class="changeIdentityWrap">
      <div class="wrapper" @click.stop @click="changeIdentity = false">
        <div class="block">
          <img src="@/assets/images/changeIdentity.png" alt class="topImg" />
          <div class="fot">
            <p>
              <!-- <van-button
                round
                size="small"
                :color="detail.userInfo.identity == 1 ? '#F8D57E' : '#E9E9E9'"
                @click="handleChangeIdentity(1)"
              >参展方</van-button>-->
              <van-button
                round
                size="small"
                :color="detail.userInfo.identity == 1 ? '#F8D57E' : '#E9E9E9'"
                @click="handleChangeIdentity(1)"
              >参招方</van-button>
            </p>
            <p>
              <van-button
                round
                size="small"
                :color="detail.userInfo.identity == 1 ? '#E9E9E9' : '#F8D57E'"
                @click="handleChangeIdentity(2)"
              >参观方</van-button>
            </p>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
  <!-- 占位图 -->
  <img
    v-else
    src="@/assets/images/null.png"
    style="width: 4rem; margin: 1.4rem 1.47rem;"
    class="nullImg"
    alt
  />
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/personal";
import footerNav from "@/components/customer/footerNav/index.vue";
import visitingCard from "@/components/customer/visitingCard.vue";

export default {
  name: "personal",
  components: {
    footerNav,
    // 名片
    visitingCard,
  },
  data() {
    return {
      // 切换身份弹窗
      changeIdentity: false,
      detail: {
        userCardList: [],
        userInfo: {},
      },
      // 我的预约列表
      listData: [],
      // 名片的当前选中索引
      current: 0,
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 10,
      pageNum: 1,
      active: "personal",
    };
  },

  created() {
    // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // 获取详情
    this.handleDetail();
    // 搜索
    this.onSearch();
  },
  watch: {},
  methods: {
    // 获取详情
    handleDetail() {
      Api.getUserMyIndex()
        .then((res) => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.detail = data;
          }
        })
        .catch((err) => {
          this.detail = {};
        });
    },

    // 切换身份 satus=1 '参展方'   satus=2 '参观方'
    handleChangeIdentity(satus) {
      // console.log(satus, "-- 1参展方,2参观方");
      let params = {};
      // return alert(satus + "暂无接口-- 1参展方,2参观方");
      return alert(satus + "暂无接口-- 1参招方,2参观方");
      Api.setChangeIdentity(params)
        .then((res) => {
          this.changeIdentity = false;
          let { code, msg, data, total } = res;
          if (code == 200) {
            util.success(msg);
            this.handleDetail();
          }
        })
        .catch((err) => {
          this.changeIdentity = false;
        });
    },

    // 搜索
    onSearch() {
      this.pageNum = 1;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize, // 每页几条数据
      };
      this.onsubmt(params);
    },

    // 懒加载请求加载列表
    onLoad() {
      this.pageNum++;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize, // 每页几条数据
      };
      this.onsubmt(params);
    },

    // 上拉刷新
    onRefresh() {
      this.finished = false;
      this.pageNum = 1;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize, // 每页几条数据
      };
      this.onsubmt(params, 1);
      // this.detail.userCardList = [];
      // // // 获取详情
      // this.handleDetail();
    },

    // 请求参数 params status{1:上拉刷新，2：正常请求}
    onsubmt(params, statu) {
      let status = statu ? statu : 2; // 默认正常请求
      Api.getMyInterviewPage(params)
        .then((res) => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
            if (status == 1) {
              // 上拉刷新
              this.refreshing = false;
              // data[0].interviewList.push(data[0].interviewList[0]);
              // data[0].interviewList.push(data[0].interviewList[0]);
              this.listData = data;
              this.$toast("刷新成功");
            } else {
              data.forEach((element) => {
                this.listData.push(element);
              });
            }
            // 数据全部加载完成
            if (data.length < this.pageSize) {
              this.finished = true;
            }
          }
        })
        .catch((err) => {
          // 上拉刷新
          this.refreshing = false;
        });
    },

    // 名片组件的 回调函数 返回名片的当前选中索引
    handleActive(index) {
      this.current = index;
      // console.log(index, this.current);
    },

    handleSetInfo(row) {
      this.$router.push({
        name: "personal_editInfo",
        query: {
          // 企业id
          id: row.enterpriseId,
          // title: row.enterpriseName
        },
      });
    },

    // 查看预约详情
    handleLook(row) {
      util.warning("敬请期待！！");
    },

    // 取消预约
    handleCancel(row) {
      let param = {
        // 预约明细id
        userPreInterviewDetailId: row.id,
        // 预约类型，1预约 0取消预约
        type: 0,
      };
      Api.setCancelInterview(param)
        .then((res) => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            util.success("取消成功");
            this.onRefresh();
          }
        })
        .catch((err) => {
          this.detail = {};
        });
    },

    // 判断日期是否为今天
    isToday(str) {
      // str = '2020-07-01'
      let d = new Date(str.replace(/-/g, "/"));
      let todaysDate = new Date();
      if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        return true;
      } else {
        return false;
      }
    },

    hanleLook(type) {
      if (type == 1) {
        this.$router.push({
          name: "my_askFor_data",
        });
      }

      if (type == 2) {
        util.success("跳转我的询价路由");
      }
    },
  },

  computed: {},

  beforeRouteLeave(to, from, next) {
    // 主页禁止返回
    if (to.fullPath == "/login") {
      next(false);
    } else {
      next();
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./personal.scss";
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
</style>

