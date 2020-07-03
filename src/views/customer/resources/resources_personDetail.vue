// 资源-人物详情
<template>
  <div class="resources_personDetail">
    <!-- {{details}} -->
    <van-row class="head">
      <van-col span="7">
        <img :src="details.user.avatar || nullPhoto" alt class="photo" />
      </van-col>
      <van-col span="8">
        <h3 class="name">{{details.user.realName}}</h3>
        <!-- 关注状态, 0未关注, 1已关注, 2对方已关注, 3双方互关 -->
        <span
          class="status"
          :class="`${ 'status' + details.user.bothFollow }`"
        >{{details.user.bothFollow == 1 ? '已关注' : details.user.bothFollow == 2 ? '对方已关注' : details.user.bothFollow == 3 ? '双方互关' : '未关注'}}</span>
      </van-col>
      <van-col span="9" class="text-right btnWrap">
        <van-button
          color="#F8D57E"
          type="default"
          size="small"
          class="getBtn"
          @click="handleContactInfo"
        >索取联系方式</van-button>
      </van-col>
    </van-row>

    <!-- 名片 -->
    <div class="visitingCard" v-if="details.userCardList.length">
      <visitingCard
        :dataList.sync="details.userCardList"
        :disabled="false"
        @successCBK="handleActive"
      />
    </div>

    <!-- 个人简介 -->
    <div class="infoWrap">
      <van-collapse v-model="activeName" accordion :border="false" @change="handleChange">
        <van-collapse-item title="个人简介" name="1" :value="activeStatus">
          <p class="text">
            沈阳通广电器有限公司(民营企业)
            渠道主管 公司主要从事市场一线品牌的冰箱、冰柜、洗衣机电器的批发销售，销往省内各地，销售的冰箱品牌有海尔、容声、科龙、美菱、新飞等，冰柜品牌有新飞、小天鹅、华美、三洋等，洗衣机有小天鹅、海尔、松下、荣事达、小燕子等。在行业有一定的知名度。本人主要负责渠道的建设和开发，在我的努力下，在辽宁省范围内所有市县镇的客户开发率达到70%，为公司开放了一批有实力的渠道经销商，为公司稳定发展打下了良好的基础。
          </p>
          <div v-if="1" class="playVideo">
            <!-- <Video-Demo
              :_id="details.DemList.id"
              :src="details.DemList.videoUrl"
              :bannerIMG="details.DemList.mediaUrl"
              :playVideoId.sync="playVideoId"
              style="width: 100%;"
            /> -->
          </div>
        </van-collapse-item>
      </van-collapse>
      <!-- <h3 class="title">个人简介</h3> -->
    </div>

    <!-- 工作经历 -->
    <div class="workHistory">
      <h3 class="title">工作经历</h3>
      <div v-if="details.workList.length" class="">
        <van-row class="workItem" v-for="(item, index) in details.workList" :key="index" @click="handleLookDetail(item)" :class="(index == details.workList.length -1) ? 'margin0' : ''">
          <van-col span="7">
            <img :src="item.companyLogo" alt class="logo" />
          </van-col>
          <van-col span="15">
            <h3 class="post">
              {{item.postName}}
              <span
                class="status"
                :class="`${ 'status' + item.onJob }`"
              >{{item.onJob == 1 ? '在职' : item.onJob == 0 ? '离职' : '' }}</span>
            </h3>
            <p class="name">
              {{item.enterpriseName}}
            </p>
            <p class="cont">
              {{item.startDate + '-' + (item.endDate ? item.endDate : '至今') }}
            </p>
            <p class="cont textHid">{{ item.workDesc }}</p>
          </van-col>
          <van-col span="2" class="text-right itemRight">
            <van-icon name="arrow" />
          </van-col>
        </van-row>
      </div>
      <!-- 占位图 -->
      <img
        v-else
        src="@/assets/images/nullImgText.png"
        style="width: 4.26rem; margin: 1.1rem;"
        class="nullImg"
        alt
      />
    </div>
    <div class="footerBtn">
      <van-button type="primary" color="#F8D57E" block @click="handleLookOrder">预约面谈还剩{{ '12' }}小时</van-button>
    </div>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/resources";
import visitingCard from "@/components/customer/visitingCard.vue";
import VideoDemo from "@/components/customer/videoPlay/index.vue";

import nullPhoto from "@/assets/images/nullPhoto.jpg";

export default {
  name: "resources_personDetail",
  components: {
    // 名片
    visitingCard,
    // 播放器
    VideoDemo
  },
  data() {
    return {
      // 头像占位
      nullPhoto: nullPhoto,
      // 用户id
      userId: "",
      details: {
        user: {},
        userCardList: [],
        workList: [],
        DemList: {
          id: "1272913711522246658",
          mediaTitle: "视频标题",
          mediaType: 1,
          mediaUrl:
            "https://org.modao.cc/uploads4/images/4612/46122644/v2_q7op1z.jpg",
          videoUrl:
            "https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/56219e93229189724781699073/v.f30.mp4"
        }
      },
      // 当前名片索引
      current: '',
      activeName: "1",
      activeStatus: "收起",

      playVideoId: "1",
    };
  },

  created() {
    // this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userId = this.$route.query.userId;
    // 获取人物详情
    this.handelGetDetails();
    console.log('缺工作经历 视频的 显示if 预约小时 以及跳转路由')
  },

  watch: {},

  methods: {
    // 获取人物详情
    handelGetDetails() {
      Api.getPeopleDetailById(this.userId)
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.details = data;
            console.log(this.details)
          }
        })
        .catch(err => {});
    },

    // 索取联系方式
    handleContactInfo() {
      console.log(1);
    },

    // 名片组件的 回调函数 返回名片的当前选中索引
    handleActive(index) {
      this.current = index;
      // console.log(index, this.current);
    },

    // 折叠面板
    handleChange(val) {
      val ? (this.activeStatus = "收起") : (this.activeStatus = "展开");
    },

    // 查看工作经历详情
    handleLookDetail(row) {
      this.$router.push({
        name: "resources_info",
        query: {
          // 工作经历id
          id: row.id
        }
      });
    },

    // 查看预约面谈
    handleLookOrder() {
      this.$router.push({
        name: "appointment_calendar",
        query: {
          // // 企业id
          // id: row.enterpriseId
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

<style lang="scss" >
.resources_personDetail {
  .van-cell::after {
    border: none;
  }
  .van-cell--clickable {
    padding: 0 0.5rem;
    font-size: 0.32rem;
    color: rgba(49, 52, 55, 1);
    line-height: 0.64rem;
  }
  .van-collapse-item__content {
    padding: 0 0.5rem 0.1rem;
    font-size: 0.28rem;
    color: rgba(49, 52, 55, 1);
    line-height: 0.52rem;
  }
  .van-cell__right-icon {
    font-size: 0.28rem;
    color: #969799;
    line-height: 0.64rem;
  }
  .van-cell__title {
    font-weight: 800;
  }
  .van-cell__value {
    font-size: 0.26rem;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./resources.scss";
.resources_personDetail {
}
</style>

