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
        <ul
          class="specifyList clearfix"
          :style="{width: (4.62 *  details.videoList.length) + 'rem'}"
        >
          <li v-for="(item, index)  in details.videoList" :key="index" class="contentItem">
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
      <van-row class="top-title">
        <van-col span="21">
          <h3 class="tit">企业产品目录</h3>
        </van-col>
        <van-col span="3" class="text-right">
          <van-icon name="arrow" />
        </van-col>
      </van-row>

      <div class="listWrap" v-if="productList.length">
        <van-row class="itemList" v-for="(item,index) in productList" :key="index">
          <van-col span="7">
            <img :src="item.goodsLogo" alt class="logo" />
          </van-col>
          <van-col span="17">
            <div class="title">{{item.goodsName}}</div>
            <div class="nums">
              <p class="idNum">订货号：{{item.orderNo}}</p>
              <p
                class="num"
              >起订量：{{ item.minOrderQuantity ? item.minOrderQuantity + item.goodsUnit : '' }}</p>
            </div>
          </van-col>
        </van-row>
        <van-divider dashed>我是有底线的</van-divider>
      </div>
    </div>
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
      enterpriseId: "",
      details: {
        enterprise: {},
        followStatus: "",
        total: ""
      },

      playVideoId: "0",
      active: "home",
      src: require("@/assets/images/video1.mp4"),
      productList: []
    };
  },
  created() {
    this.enterpriseId = this.$route.query.id;
    this.handelGetDetails();
    // 获取企业产品目录
    this.handelGetGoodsSearch();
  },
  methods: {
    // 获取参展商详情
    handelGetDetails() {
      Api.getEnterpriseDetailById(this.enterpriseId)
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.details = data;
          }
        })
        .catch(err => {});
    },

    // 获取企业产品目录
    handelGetGoodsSearch() {
      let param = {
        enterpriseId: this.enterpriseId, // 企业id
        pageNum: "1", // 页码
        pageSize: "5", // 每页记录数
        isAsc: "1", // 排序，1：正序，2：倒序
        params: "" // 查询条件
      };
      Api.getGoodsSearch(param)
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.productList = data;
          }
        })
        .catch(err => {});
    },

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

<style lang="scss">
.resources_enterpriseDetail {
  .vjs-custom-skin > .video-js .vjs-control-bar {
    zoom: 0.6;
  }
  .videoPlayerContainer .video-js .vjs-big-play-button {
    zoom: 0.7;
  }
}
</style>
<style lang='scss' scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./resources.scss";
.resources_enterpriseDetail {
}
</style>