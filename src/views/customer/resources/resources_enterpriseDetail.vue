// 资源-企业详情 resources_enterpriseDetail
<template>
  <div class="resources_enterpriseDetail">
    <div class="top" v-if="details.enterprise">
      <div class="title">{{details.enterprise.name}}</div>
      <div class="middle">
        <span
          v-show="details.enterprise.enterpriseShowPlaceName"
          class="name_type"
        >{{details.enterprise.enterpriseShowPlaceName}}</span>
        <i class="huiyuan">
          <van-icon class="icon iconfont yz-huiyuan" />
          <span v-show="details.enterprise.memberStatus == 1">会员</span>
          <span v-show="details.enterprise.memberStatus == 0">非会员</span>
        </i>
      </div>
      <div class="btn">
        <button class="left_btn" @click="goCompany_details">获取公司资料</button>
        <button class="right_btn" @click="goTo">公司情况</button>
        <!-- <button class="right_btn">预约面谈</button> -->
      </div>
      <div class="type" v-show="details.followStatus == 1">
        <van-icon class="icon iconfont yz-yiguanzhu" />
        <div class="type_name">已关注</div>
      </div>
      <div class="type" v-show="details.followStatus == 0">
        <van-icon name="star-o" />
        <div class="type_name">未关注</div>
      </div>
      <p class="timer">更新时间：{{ details.enterprise.updateTime }}</p>
    </div>

    <!-- 企业相关视频  列表内容-->
    <div v-if="details.videoList.length">
      <h3 class="specifyWrap_title">企业相关视频</h3>
      <div class="specifyWrap">
        <ul class="specifyList clearfix" :style="{width: (4.62 *  videoList.length) + 'rem'}">
          <li
            v-for="(item, index)  in details.videoList"
            :key="index"
            class="contentItem"
          >
            <!-- :class="index+1 == details.videoList.length ? 'margin0' : ''" -->
            <!-- <img :src="item.videoUrl" alt class="itemImg" /> -->
            <div class="itemImg">
              <Video-Demo
                :_id="item.id"
                :src="item.videoUrl"
                :bannerIMG="item.mediaUrl"
                :playVideoId.sync="playVideoId"
                style="width: 100%;"
              />
            </div>
            <p class="cont">{{item.mediaTitle}}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 企业产品目录 -->
    <div class="product_catalog">
      <div class="top-title">
        <span>企业产品目录</span>
        <van-icon name="arrow" />
      </div>
      <div class="item">
        <div class="itemList" v-for="(item,index) in productList" :key="index">
          <img :src="item.imgSrc" alt />
          <div class="right">
            <div class="title">{{item.title}}</div>
            <div class="nums">
              <div class="idNum">订货号：{{item.idNum}}</div>
              <div class="num">起订量：{{item.num}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-divider dashed>我是有底线的</van-divider>
  </div>
</template>
<script>
import VideoDemo from "@/components/customer/videoPlay/index.vue";
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/resources";

export default {
  name: "resources_enterpriseDetail",
  components: {
    VideoDemo // 播放
  },
  data() {
    return {
      // 企业id
      enterpriseId: this.$route.query.id,
      details: {
        enterprise: {},
        videoList: [],
        followStatus: "",
        total: ""
      },

      playVideoId: "0",
      active: "home",
      src: require("@/assets/images/video1.mp4"),
      person: [],
      videoList: [],
      productList: [
        {
          imgSrc: "",
          title:
            "360 行车记录仪 g300 高清夜视隐藏式免安装无线迷你车载测速电子狗",
          idNum: "A2323",
          num: 1
        },
        {
          imgSrc: "",
          title:
            "360 行车记录仪 g300 高清夜视隐藏式免安装无线迷你车载测速电子狗",
          idNum: "A2323",
          num: 1
        },
        {
          imgSrc: "",
          title:
            "360 行车记录仪 g300 高清夜视隐藏式免安装无线迷你车载测速电子狗",
          idNum: "A2323",
          num: 1
        },
        {
          imgSrc: "",
          title:
            "360 行车记录仪 g300 高清夜视隐藏式免安装无线迷你车载测速电子狗",
          idNum: "A2323",
          num: 1
        }
      ]
    };
  },
  created() {
    console.log(this.$route.query.id);

    this.handelGetDetails();
  },
  methods: {
    // 跳转至法人详情
    goToPerson() {
      this.$router.push({
        path: "/juridical_person",
        query: {
          enterpriseExhibitorsId: this.enterpriseId
        }
      });
    },
    // 跳转至企业人物
    goToPerson() {
      this.$router.push({
        path: "/person",
        query: {
          enterpriseExhibitorsId: this.enterpriseId,
          name: this.details.exhibitors.name, //企业名称
          followStatus: this.details.followStatus //是否关注
        }
      });
    },
    // 获取参展商详情
    handelGetDetails() {
      Api.getEnterpriseDetailById(this.$route.query.id)
        .then(res => {
          let { code, msg, data, total } = res;
          console.log("参展商详情", res);

          if (code == 200) {
            this.details = data;
            this.person = data.peopleList;
            this.videoList = data.videoList;
          }
        })
        .catch(err => {});
    },
    // 跳转至参展公司详情
    goCompany_details() {
      this.$router.push({
        path: "/company_details",
        query: {
          enterpriseExhibitorsId: this.enterpriseId
        }
      });
    },
    goTo() {
      // 跳转至企业相关视频页
      // this.$router.push({ path: "" });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./resources.scss";
.resources_enterpriseDetail {
  .product_catalog {
    margin-top: 1.02rem;
    margin-bottom: 1.3rem;
    .itemList {
      width: 6.96rem;
      height: 2.24rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
      border-radius: 0.16rem;
      margin-top: 0.4rem;
      position: relative;
      img {
        margin-top: 0.22rem;
        width: 1.8rem;
        height: 1.8rem;
        border: 1px solid #babcc0;
      }
      .right {
        position: absolute;
        left: 2.08rem;
        top: 0.22rem;
        .title {
          width: 4.42rem;
          height: 0.9rem;
          line-height: 0.45rem;
          font-size: 0.28rem;
          // word-break: break-all;
          // white-space: pre-wrap;
          // word-wrap: break-word;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
        .nums {
          margin-top: 0.14rem;
          font-size: 0.24rem;
          color: #babcc0;
          width: 2.3rem;
          height: 0.72rem;
          line-height: 0.36rem;
        }
      }
    }
  }
}
.top-title {
  color: #313437;
  position: relative;
  span {
    font-size: 0.32rem;
    font-weight: bold;
  }
  .van-icon {
    position: absolute;
    right: 0.32rem;
    margin-top: 0.12rem;
  }
}
/deep/ .van-divider {
  font-size: 0.24rem;
}
</style>