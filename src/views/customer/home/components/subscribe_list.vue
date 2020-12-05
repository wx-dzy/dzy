// 已约面谈列表
<template>
  <div class="subscribe_List">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="
        list.length ? '----- 都在这里啦！ -----' : '----- 暂无预约! -----'
      "
      error-text="请求失败，点击重新加载"
      class="myOrder"
    >
      <van-cell
        v-for="(item, index) in list"
        :key="index"
        class="contItem"
        :class="index + 1 == list.length ? 'margin0' : ''"
      >
        <h5 class="tit">{{ item.localDate }} {{ item.enterpriseShowName }}</h5>
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
</template>
<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import { Dialog } from "vant";

import * as Api from "@/api/customer/home";
import * as _Api from "@/api/customer/OneOnOneVideo";
import * as _pApi from "@/api/customer/personal";
import nullImg from "@/assets/images/null.png";
export default {
  name: "subscribe_List",
  props: ["enterpriseShowId"],
  components: {},
  data() {
    return {
      // enterpriseShowId: "", // 展会id
      list: [
        //   {
        //     src: require("../../../assets/images/logo1.jpg"),
        //     title: "01风风火火汽车电子公司",
        //     type: "电子产品展馆",
        //     warning: "236",
        //     follow: "889"
        //   },
      ],
      loading: true,
      finished: false,
      pageSize: 10,
      pageNum: 1,
    };
  },
  created() {
    this.handleGetDetail();
  },
  methods: {
    // 懒加载请求加载列表
    onLoad() {
      this.pageNum++;
      let params = {
        enterpriseShowId: this.enterpriseShowId,
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize, // 每页几条数据
      };
      // console.log(params,'onLoad')
      this.handleGetDetail(params);
    },

    // 获取列表
    handleGetDetail(param) {
      param = param
        ? param
        : {
            enterpriseShowId: this.enterpriseShowId,
            pageNum: this.pageNum,
            pageSize: this.pageSize,
          };
      Api.getListMyInterview(param)
        .then((res) => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
            data.forEach((element) => {
              this.list.push(element);
            });
            // 数据全部加载完成
            if (data.length < this.pageSize) {
              this.finished = true;
            }
          }
        })
        .catch((err) => {
          // console.log(err);
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
    // 查看预约详情
    handleLook(row) {
      console.log(row);
      //   创建房间 预约id
      let params = row.id;
      let str = "";
      if (row.meetingId) {
        str = "getRoomToken";
      } else {
        str = "getRoomAdminToken";
      }
      _Api[str](params)
        .then((res) => {
          let { code, data, msg, total } = res;
          if (code == 200) {
            // console.log(
            //   `http://localhost:3000/?roomName=${data.roomName}&roomToken=${data.roomToken}&roomUserId=${data.roomUserId}`
            // );
            // window.location.href = `http://localhost:3000/?roomName=${data.roomName}&roomToken=${data.roomToken}&roomUserId=${data.roomUserId}`;
            // return
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
          _pApi
            .setCancelInterview(param)
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
  },
};
</script>
<style lang='scss' scoped>
.subscribe_List {
  // padding: 0;
  // position: relative;
  width: 100%;
  // max-height: 100vh;
  background: #fff;
  overflow: auto;
  color: #000;
  // box-sizing: border-box;
  .myOrder {
    // padding: 0.3rem 0.28rem 0.74rem;
    padding: 0.3rem 0.28rem 0rem;

    .title {
      font-size: 0.32rem;
      color: rgba(49, 52, 55, 1);
      line-height: 1rem;
    }

    .contItem {
      padding-bottom: 0.5rem;
      margin-bottom: 0.4rem;
      box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
      border-radius: 0.16rem;

      .item_i {
        padding: 0.46rem 0.28rem;
      }

      .tit {
        padding-left: 0.28rem;
        border-bottom: 0.02rem solid #f5f5f5;
        font-size: 0.28rem;
        color: rgba(49, 52, 55, 1);
        line-height: 0.84rem;
      }

      .photo {
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
      }

      .con {
        font-size: 0.26rem;
        color: rgba(49, 52, 55, 1);
        line-height: 0.36rem;
      }

      .color999 {
        color: #9da1a6;
      }

      .nterview {
        min-height: 0.72rem;
      }

      .van-button {
        padding: 0 0.18rem;
        margin-top: -0.07rem;
        line-height: 0.34rem;
        font-size: 0.2rem;
        color: rgba(49, 52, 55, 1) !important;
      }
    }
    .faceTalk,
    .vist {
      .title {
        font-size: 0.26rem;
        margin-left: 0.1rem;
      }
      .item_i {
        padding: 0.46rem 0.2rem;
      }
    }
  }
  
  .van-cell.margin0 {
    margin-bottom: 0;
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