// 资源-企业详情
<template>
  <div class="resources_enterpriseDetail">
    <van-row class="top" v-if="details.enterprise">
      <van-col span="20">
        <p class="title">{{details.enterprise.name}}</p>

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
      </van-col>
      <van-col span="4" class="text-right maTop40">
        <!-- 关注组件 -->
        <follow
          :followType="1"
          :followId="details.enterprise.id"
          :followStatus.sync="details.followStatus"
          :showIndex="2"
          @successCBK="handleFollow"
        />
      </van-col>
      <van-col span="24" class="btn">
        <button class="left_btn" @click="handRoter_companyInfo">获取公司资料</button>
        <button class="right_btn" @click="handRoter_companyDetails">公司情况</button>
        <!-- <button class="right_btn">预约面谈</button> -->
      </van-col>
      <van-col span="24" class="timer">更新时间：{{ details.enterprise.updateTime }}</van-col>
    </van-row>

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
                class="zoom"
              />
            </div>
            <p class="cont">{{item.mediaTitle}}</p>
          </li>
        </ul>
      </div>
    </div>

    <!-- 企业产品目录 -->
    <div class="product_catalog">
      <van-row class="top-title" @click="handleLookList">
        <van-col span="21">
          <h3 class="tit">企业产品目录</h3>
        </van-col>
        <van-col span="3" class="text-right">
          <van-icon name="arrow" />
        </van-col>
      </van-row>

      <div class="listWrap" v-if="productList.length">
        <van-row
          class="itemList"
          v-for="(item,index) in productList"
          :key="index"
          @click="handleLookItem(item)"
        >
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
      <!-- 占位图 -->
      <img
        v-else
        src="@/assets/images/nullImgText.png"
        style="width: 2.6rem; margin: 1.4rem 2rem;"
        class="nullImg"
        alt
      />
    </div>
  </div>
</template>
<script>
import VideoDemo from "@/components/customer/videoPlay/index.vue";
import follow from "@/components/customer/follow.vue";
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/resources";

export default {
  name: "resources_enterpriseDetail",
  components: {
    // // 播放
    VideoDemo,
    // 关注
    follow
  },
  data() {
    return {
      // 企业id
      enterpriseId: "",
      details: {
        enterprise: {},
        videoList: [],
        followStatus: "",
        total: ""
      },
      // 企业产品目录列表
      productList: [],
      // 当前播放器id(预留暂时无用)
      playVideoId: "0"
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

    // 获取公司资料
    handRoter_companyInfo() {
      console.log("需要确定是否需要接口及参数名称");
      this.$router.push({
        name: "exact_information",
        query: {
          // enterpriseExhibitorsId: this.enterpriseId
        }
      });
    },

    // 公司情况
    handRoter_companyDetails() {
      this.$router.push({
        name: "company_details",
        query: {
          enterpriseExhibitorsId: this.enterpriseId
        }
      });
    },
    // 查看全部企业产品目录
    handleLookList() {
      this.$router.push({
        name: "products",
        query: {
          // 企业id
          enterpriseId: this.enterpriseId
        }
      });
    },

    // 查看产品详情
    handleLookItem(row) {
      // 接口地址  http://rap2.taobao.org/repository/editor?id=258218&mod=389957&itf=1631624
      this.$router.push({
        name: "products_details",
        query: {
          // 商品id
          goodsId: row.id
        }
      });
    },

    // 关注组件回调 status 1为当前 已关注 2为当前未关注(取消关注)
    handleFollow(status) {
      console.log(status, "关注组件回调");
      this.handelGetDetails();
    }
  }
};
</script>

<style lang="scss">
// .resources_enterpriseDetail {}
</style>
<style lang='scss' scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./resources.scss";
.resources_enterpriseDetail {
}
</style>