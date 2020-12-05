// 供应商目录
<template>
  <div class="supplier_list">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="
        list.length ? '----- 都在这里啦！ -----' : '----- 暂无内容！ -----'
      "
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      class="item-box"
    >
      <van-cell
        class="list"
        v-for="item in list"
        :key="item.id"
        @click="goTo(item.id, $event)"
      >
        <!-- {{ item }} -->
        <img :src="item.logo" alt />
        <div class="right">
          <div class="title">{{ item.enterpriseName }}</div>
          <div class="type">
            <span>{{ item.enterpriseShowPlaceName }}</span>
          </div>
          <div class="num">
            <span class="warning">约谈：{{ item.orderTimes }}次</span>
            <span class="warning">关注：{{ item.followTimes }}次</span>
          </div>
        </div>
      </van-cell>
    </van-list>
    <!-- <img v-if="!loading && !list.length" src="@/assets/images/null.png" class="nullImg" alt /> -->
    <!-- <img v-else src="@/assets/images/null.png" class="nullImg" alt /> -->
  </div>
</template>
<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
import nullImg from "@/assets/images/null.png";
export default {
  name: "supplier_list",
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
      Api.getSupplierList(param)
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

    //跳转至
    goTo(enterpriseId, event) {
      console.log("enterpriseId", enterpriseId);

      this.$router.push({
        path: "/exhibitor_details",
        query: {
          // 参展商id
          enterpriseExhibitorsId: enterpriseId,
        },
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.supplier_list {
  // padding: 0;
  // position: relative;
  width: 100%;
  // max-height: 100vh;
  background: #fff;
  overflow: auto;
  color: #000;
  // box-sizing: border-box;
  .van-cell.margin0 {
    margin-bottom: 0;
  }
  .item-box {
    // margin-bottom: 1.3rem;
    // overflow: scroll;
    // height: calc(100% - 2.67rem);
    .list {
      margin-left: 0.29rem;
      margin-top: 0.41rem;
      width: 6.96rem;
      height: 2.2rem;
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
            padding: 2px 5px;
            border-radius: 2px;
          }
        }
        .num {
          font-size: 0.24rem;
          color: #a5a9ae;
          span {
            display: inline-block;
            width: 2rem;
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