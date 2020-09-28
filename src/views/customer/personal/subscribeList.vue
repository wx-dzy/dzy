// 预约列表 subscribeList
<template>
  <div class="subscribeList footerPad" v-if="!isWx">
    <div class="myOrder">
      <h3 class="title">我的面谈预约</h3>
      <div class="faceTalk">
        <!-- <div class="title">我的面谈预约</div> -->
        <van-list
          v-model="loading"
          :finished="finished"
          :finished-text="listData.length ? ' ' : '暂无预约'"
          error-text="请求失败，点击重新加载"
        >
          <van-cell
            v-for="(item, index) in listData"
            :key="index"
            class="contItem"
            :class="index + 1 == listData.length ? 'margin0' : ''"
          >
            <h5 class="tit">
              {{ item.localDate }} {{ item.enterpriseShowName }}
            </h5>
            <van-row
              class="item_i"
              v-for="(_item, _index) in item.interviewList"
              :key="'_item' + _index"
              @click="handleLook(_item)"
            >
              <van-col span="6">
                <!-- <img :src="item.img" alt class="photo" /> -->
                <img :src="_item.interviewUserLogo" alt class="photo" />
              </van-col>
              <van-col span="18" class="con">
                <p class="nterview">{{ _item.interviewEnterpriseName }}</p>
                <p class="color999 clearfix">
                  {{ _item.interviewDate }}
                  {{ isToday(_item.interviewDate) ? "今日" : ""
                  }}{{ _item.interviewTime.slice(0, 5) }}
                  <van-button
                    round
                    size="mini"
                    color="#F8D57E"
                    plain
                    :disabled="!_item.id"
                    class="pull-right"
                    @click.stop="handleCancel(_item)"
                    >{{ _item.id ? "取消预约" : "已取消" }}</van-button
                  >
                </p>
              </van-col>
            </van-row>
          </van-cell>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import { Dialog } from "vant";
import * as Api from "@/api/customer/personal";
import * as _Api from "@/api/customer/OneOnOneVideo";

import footerNav from "@/components/customer/footerNav/index.vue";
import visitingCard from "@/components/customer/visitingCard.vue";
import checkIdentity from "@/components/customer/checkIdentity.vue";

export default {
  name: "subscribeList",
  components: {
    footerNav,
    // 名片
    visitingCard,
    checkIdentity,
  },
  data() {
    return {
      isWx: false,
      show: false,
      changeIdentity: false,
      detail: {
        userCardList: [],
        userInfo: {},
      },
      // 我的预约列表
      listData: [],
      // 我的参观预约
      listData2: [],
      // 名片的当前选中索引
      current: 0,
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 30,
      pageNum: 1,
      active: "personal",
    };
  },

  created() {
    // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    // let dzy_token = localStorage.getItem("dzy_token");
    // //   console.log("dzy_token:", dzy_token);
    // if (!dzy_token) {
    //   this.$router.push({
    //     path: "/",
    //   });
    // }
    this.isWeiXin();
  },
  watch: {},
  methods: {
    isWeiXin() {
      let ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.isWx = true;
      } else {
        this.isWx = false;
        this.onSearch();
      }
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

    // 请求参数 params status{1:上拉刷新，2：正常请求}
    onsubmt(params, statu) {
      let status = statu ? statu : 2; // 默认正常请求
      Api.getMyInterviewPage(params)
        .then((res) => {
          // console.log('我的愉悦列表', res)
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
      Api.getMyVistList(params)
        .then((res) => {
          //   console.log("我的参观预约列表", res);
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
            if (status == 1) {
              // 上拉刷新
              this.refreshing = false;
              // data[0].interviewList.push(data[0].interviewList[0]);
              // data[0].interviewList.push(data[0].interviewList[0]);
              this.listData2 = data;
              // this.$toast("刷新成功");
            } else {
              data.forEach((element) => {
                this.listData2.push(element);
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
          // this.refreshing = false;
        });
    },

    // 查看预约详情
    handleLook(row) {
      //   创建房间 预约id
      let params = row.id;
      _Api
        .getRoomToken(params)
        .then((res) => {
          let { code, data, msg, total } = res;
          if (code == 200) {
            // console.log(
            //   `http://localhost:3000/?roomName=${data.roomName}&roomToken=${data.roomToken}&roomUserId=${data.roomUserId}`
            // );
            // window.location.href = `http://localhost:3000/?roomName=${data.roomName}&roomToken=${data.roomToken}&roomUserId=${data.roomUserId}`;

            // 进入房间
            this.$router.push({
              name: "OneOnOneVideo",
              query: {
                roomName: data.roomName,
                roomToken: data.roomToken,
                roomUserId: data.roomUserId,
              },
            });
          } else if (code == 11000) {
            util.warning("预约开始前10分钟可进入！！");
          }
        })
        .catch((err) => {});
    },

    // 取消预约
    handleCancel(row) {
      Dialog.confirm({
        title: "确认操作",
        message: "确认取消预约?",
      })
        .then(() => {
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
                this.listData = [];
                this.onSearch();
              }
            })
            .catch((err) => {
              this.detail = {};
            });
        })
        .catch(() => {});
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
.subscribeList {
  max-width: 500px;
  overflow: hidden;
  .nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
  }
  .title {
    line-height: 0.5rem;
    text-align: center;
  }
  img {
    width: 1rem;
    max-width: 87px;
  }
  .van-button--round {
    padding: 0 0.1rem;
  }
}
</style>

