// 资源-工作经历
// 设计地址（按照这个地址更改）  https://lanhuapp.com/web/#/item/project/board/detail?pid=52e834a9-a8c4-4848-a4d5-6196060b59fb&project_id=52e834a9-a8c4-4848-a4d5-6196060b59fb&image_id=f042d916-dad5-4806-99b8-cbfc81878f0a
<template>
  <div class="resources_info">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="handleGetDetail">
      <div v-if="detail.id">
        <!-- <h4 class="title">公司/单位</h4> -->
        <van-row class="item">
          <van-col span="6" class="logowrap">
            <img :src="detail.companyLogo" alt class="logo" />
          </van-col>
          <van-col span="18" offset="6">
            <van-row>
              <van-col span="8">公司名称</van-col>
              <van-col span="16">{{ detail.enterpriseName }}</van-col>
            </van-row>
            <van-row>
              <van-col span="8">公司名称EN</van-col>
              <van-col span="16">{{ detail.enterpriseNameEn }}</van-col>
            </van-row>
          </van-col>
        </van-row>

        <h4 class="title">姓名</h4>
        <van-row class="item">
          <van-row>
            <van-col span="6">姓名</van-col>
            <van-col span="18">{{ detail.userRealName }}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">姓名EN</van-col>
            <van-col span="18">{{ detail.userRealNameEn }}</van-col>
          </van-row>
        </van-row>

        <h4 class="title">职位/岗位</h4>
        <van-row class="item">
          <van-row>
            <van-col span="6">职位</van-col>
            <van-col span="18">{{ detail.postName }}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">职位EN</van-col>
            <van-col span="18">{{ detail.postNameEn }}</van-col>
          </van-row>
        </van-row>

        <h4 class="title">在职时间</h4>
        <van-row class="item">
          <van-row>
            <van-col span="6">开始时间</van-col>
            <van-col span="18">{{ detail.startDate }}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">结束时间</van-col>
            <van-col span="18">{{ detail.endDate }}</van-col>
          </van-row>
        </van-row>

        <h4 class="title">公司所属行业</h4>
        <van-row class="item">
          <van-row>
            <van-col span="6">行业</van-col>
            <van-col span="18">{{ detail.industry }}</van-col>
          </van-row>
          <van-row>
            <van-col span="6">行业EN</van-col>
            <van-col span="18">{{ detail.industryEn }}</van-col>
          </van-row>
        </van-row>

        <h4 class="title">工作描述</h4>
        <van-row class="item">
          <van-col span="24">{{ detail.workDesc }}</van-col>
        </van-row>
      </div>
      <!-- 占位图 -->
      <img
        v-else
        src="@/assets/images/nullImgText.png"
        style="width: 2.6rem; margin: 1.4rem 2rem;"
        class="nullImg"
        alt
      />
    </van-pull-refresh>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/resources";
import visitingCard from "@/components/customer/visitingCard.vue";

export default {
  name: "resources_info",
  components: {
    // 名片
    visitingCard
  },
  data() {
    return {
      // {userCardId} 工作经历id
      userCardId: "",
      detail: {},
      refreshing: false
    };
  },

  created() {
    this.userCardId = JSON.parse(this.$route.query.id);
    // 获取详情
    this.handleGetDetail();
  },
  watch: {},
  methods: {
    // 获取详情
    handleGetDetail() {
      let params = this.userCardId;
      util.showLoading();
      Api.getUserCardById(params)
        .then(res => {
          let { code, msg, data, total } = res;
          // 上拉刷新  完成
          this.refreshing = false;
          util.hideLoading();
          if (code == 200) {
            this.detail = data;
          }
        })
        .catch(err => {
          // 上拉刷新  完成
          this.refreshing = false;
          util.hideLoading();
          console.log(err, "err");
        });
    },

    handleSetInfo(row) {
      this.$router.push({
        name: "personal_details",
        query: {
          id: row.enterpriseId
        }
      });
    },

    // 查看详情
    handleLook(row) {
      this.$router.push({
        name: "resources_info",
        query: {
          // 企业id
          id: row.enterpriseId
          // title: row.enterpriseName
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

<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./resources.scss";
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
.resources_info .item {
  line-height: 0.8rem;
}
</style>

