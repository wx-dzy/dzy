// 展会宣传片 介绍 id=1272919606301855745  
// http://localhost:9000/home_trailer?id=1272919606301855745&title=%E4%BA%9A%E6%A3%AE%E5%9B%BD%E9%99%852020%E5%B1%95%E4%BC%9A%E6%97%A5%E5%8E%86
<template>
  <div class="home_trailer">
    <div v-if="details.enterpriseShow && details.enterpriseShow.id">
      <div class="head">
        <h2 class="tit">{{ details.enterpriseShow.showName }}</h2>
        <!-- <p class="timer">开展日期： -->
        <p class="timer">开招日期：
          {{ details.enterpriseShow.startDate }}
          {{details.enterpriseShow.startDate ? '-' + details.enterpriseShow.startDate : ''}}
        </p>
        <span class="status">在线</span>
        <div class="btnwrap">
          <van-button
            type="default"
            size="small"
            round
            color="#7386A0"
            class="color1"
            @click="handleWith"
          >咨询客服</van-button>

          <van-button
            type="default"
            size="small"
            round
            color="#F8D57E"
            class="color0"
            @click="handleOrder"
          >参观预约</van-button>
        </div>
      </div>

      <Video-Demo
        v-if="details.media.videoUrl"
        :src="details.media.videoUrl"
        :bannerIMG="details.media.mediaUrl"
        style="width: 100%;"
      />
      <img v-else :src="details.media.mediaUrl" alt class="banner" />

      <div class="text_wrap">
        <img
          v-if="details.enterpriseShow.showContent"
          :src="details.enterpriseShow.showContent"
          alt
          class="textImg"
        />
        <van-empty v-else description="暂无介绍" />
        <!-- <p v-html="details.enterpriseShow.showContent" class="text"></p> -->
      </div>
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
  name: "home_trailer",
  components: {
    VideoDemo // 播放
    // footerNav
  },
  data() {
    return {
      id: "",
      details: {}
    };
  },
  created() {
    this.id = this.$route.query.id;
    document.title = this.$route.query.title;
    console.log(1272919606301855745, 'id')

    // 获取详情
    this.handleGetDetail();
  },
  methods: {

    // 获取详情
    handleGetDetail() {
      Api.getByIdForCalendar(this.$route.query.id)
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

    // 参观预约
    handleOrder() {
      this.$router.push({
        name: "home_order",
        query: {
          // 活动id（展会id）
          enterpriseShowId: this.details.enterpriseShow.id
        }
      });
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
.home_trailer {
  // .nullImg {
  //   width: 4rem;
  //   margin: 0.4rem 1.47rem;
  // }
}
</style>

