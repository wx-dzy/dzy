// 展会企业简介 介绍 id=1272919606905835521
<template>
  <div class="home_introduce">
    <div v-if="details.enterprise && details.enterprise.id">
      <Video-Demo
        v-if="details.enterpriseDetail.videoUrl"
        :src="details.enterpriseDetail.videoUrl"
        :bannerIMG="details.enterpriseDetail.mediaUrl"
        style="width: 100%;"
      />
      <img v-else :src="details.enterpriseDetail.mediaUrl" alt class="banner" />

      <van-row class="cont">
        <van-col span="24">
          <h2 class="tit">{{ details.enterprise.name }}</h2>
        </van-col>

        <van-col span="16">
          <van-button
            v-show="!details.followStatus"
            icon="icon iconfont yz-guanzhu"
            type="default"
            size="small"
            class="btnNone"
            @click="handleIsFollow(1)"
          >关注</van-button>
          <van-button
            v-show="details.followStatus"
            icon="icon iconfont yz-yiguanzhu"
            type="default"
            size="small"
            class="btnNone"
            @click="handleIsFollow(0)"
          >已关注</van-button>
        </van-col>

        <van-col span="8" class="text-right">
          <van-button
            type="default"
            size="small"
            round
            color="#F8D57E"
            class="color0"
            @click="handleWith"
          >咨询客服</van-button>
        </van-col>

        <van-col span="24" class="text_wrap">
          <img
            v-if="details.enterprise.introduction"
            :src="details.enterprise.introduction"
            alt
            class="textImg"
          />
          <van-empty v-else description="暂无介绍" />
          <!-- <p v-html="details.enterprise.introduction" class="text"></p> -->
        </van-col>
      </van-row>
    </div>

    <!-- 占位图 -->
    <van-empty v-else image="search" description="暂无内容" />

    <!-- <img v-else src="@/assets/images/null.png" class="nullImg" alt /> -->
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
import VideoDemo from "@/components/customer/videoPlay/index.vue";

// import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "home_introduce",
  components: {
    VideoDemo // 播放
    // footerNav
  },
  data() {
    return {
      showVideo: false,

      showShare: false,
      details: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    // 获取详情
    this.handleGetDetail();
  },
  methods: {
    // 获取详情
    handleGetDetail() {
      Api.getEnterpriseBaseInfoById(this.$route.query.id)
        .then(res => {
          let { data, code, msg, total } = res;
          if (code == 200) {
            this.details = data;
          }
        })
        .catch(err => {});
    },

    // 咨询客服
    handleWith() {
      util.warning("敬请期待！");
    },

    // 关注/取消关注  followStatus 1表示关注，0表示取消关注
    handleIsFollow(followStatus) {
      let param = {
        // followStatus 1表示关注，0表示取消关注
        followStatus: followStatus || "",
        // 要关注的企业id或人物id
        followId: this.details.enterprise.id,
        // 1：关注企业，2：关注人物
        followType: "1",
        // 用户openId
        openId: "open"
      };
      Api.setIsFollow(param)
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            util.success(msg);
            // 默认刷新列表
            this.handleGetDetail();
          }
        })
        .catch(err => {});
    }

  },

  computed: {},

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
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "../home.scss";
.home_introduce {
  // .nullImg {
  //   width: 4rem;
  //   margin: 0.4rem 1.47rem;
  // }
}
</style>

