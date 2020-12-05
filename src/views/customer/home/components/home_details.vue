// 展会详情  id=1272919606905835521
<template>
  <div class="home_details">
    <!-- 分享组件 -->
    <!-- <shareTemp :share-data.sync="shareData" /> -->

    <!-- <div v-if="details.enterprise && details.enterprise.id"> -->
    <div v-if="details.enterprise && details.enterprise.id">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="(item, index) in details.mediaList" :key="index">
          <!-- <router-link :to="{'path':'personal'}"> -->
          <img :src="item.mediaUrl" alt />
          <!-- </router-link> -->
        </van-swipe-item>
      </van-swipe>

      <div class="details_top">
        <van-row class="cont">
          <!-- <van-col span="4">
                  <img :src="details.enterprise.logo" alt="logo" class="logo" />
              </van-col> -->
          <van-col span="24">
            <van-row>
              <van-col span="19">
                <h2 class="tit">{{ details.enterpriseShow.showName }}</h2>
              </van-col>
              <van-col span="4">
                <span class="type">{{
                  details.enterpriseShow.showFormat == 1
                    ? "仅线上"
                    : details.enterpriseShow.showFormat == 2
                    ? "仅线下"
                    : details.enterpriseShow.showFormat == 3
                    ? "全包括"
                    : ""
                }}</span>
              </van-col>
              <!-- <van-col
                span="24"
                class="timer"
                            >预计开展日期：{{ details.enterpriseShow.planStartDate + ' - ' + details.enterpriseShow.planEndDate }}</van-col>-->
              <van-col span="24" class="timer"
                >预计开招日期：{{
                  details.enterpriseShow.planStartDate +
                  " - " +
                  details.enterpriseShow.planEndDate
                }}</van-col
              >
            </van-row>
          </van-col>
          <van-col span="24" class="text-right">
            <!-- 关注组件 -->
            <follow
              :followType="1"
              :followId="details.enterprise.id"
              :followStatus.sync="details.followStatus"
              :showIndex="1"
              @successCBK="handleFollow"
            />
            <!-- <van-button
              icon="icon iconfont yz-fenxiang"
              type="default"
              class="btnNone"
              @click="handleShare"
              >分享</van-button
            > -->
          </van-col>
          <van-row class="w100">
            <van-col span="12">
              <van-button
                type="default"
                class="btnNone1"
                @click="handleToIntroduce(5)"
                >参观预约</van-button
              >
            </van-col>
            <van-col span="12">
              <van-button
                type="default"
                class="btnNone1"
                @click="handleToIntroduce(2)"
                >会议介绍</van-button
              >
            </van-col>
          </van-row>
        </van-row>
      </div>

      <div class="center_btn">
        <van-tabs
          v-model="activeName"
          class="tab"
          swipe-threshold="5"
          title-active-color="#000"
          @click="changeTab"
        >
          <van-tab title="供应商目录" name="supplier_list">
            <!-- <supplierList :activeName="activeName" /> -->
          </van-tab>
          <van-tab title="已约面谈" name="subscribe_list">
            <!-- <subscribeList :activeName="activeName" /> -->
          </van-tab>
        </van-tabs>

        <div class="tab_content">
          <supplierList
            v-if="activeName == 'supplier_list'"
            :enterpriseShowId="`${details.enterpriseShow.id}`"
          />

          <subscribeList
            v-if="activeName == 'subscribe_list'"
            :enterpriseShowId="`${details.enterpriseShow.id}`"
          />
        </div>

        <van-grid clickable :border="false" :column-num="2">
          <!-- <van-grid-item @click="handleToIntroduce(3)">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yz-canzhanshangmulu" />
            </svg>
            供应商目录
          </van-grid-item> -->

          <van-grid-item @click="handleToIntroduce(4)">
            <!-- <van-grid-item to="/"> -->
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yz-canguanyuyue" />
            </svg>
            <!-- 展会日程 -->
            招采日程
          </van-grid-item>

          <van-grid-item @click="handleToIntroduce(1)">
            <svg class="icon svg-icon" aria-hidden="true">
              <use xlink:href="#yz-zhanhuiricheng" />
            </svg>

            {{ year }}年招采日历
          </van-grid-item>
        </van-grid>
        <van-row class="cont_footer">
          <van-col span="24">
            <h3>承办方</h3>
          </van-col>
          <van-col span="24"
            >主办单位：{{ details.enterpriseShow.hosts }}</van-col
          >
          <van-col span="24"
            >承办单位：{{ details.enterpriseShow.organizer }}</van-col
          >
          <van-col span="24"
            >协办单位：{{ details.enterpriseShow.coOrganizer }}</van-col
          >
          <van-col span="24"
            >支持媒体：{{ details.enterpriseShow.supportMedia }}</van-col
          >
        </van-row>
      </div>
    </div>

    <!-- 占位图 -->
    <img v-else src="@/assets/images/null.png" class="nullImg" alt />

    <van-overlay :show="showShare" @click="showShare = false">
      <div class="wrapper" @click.stop>
        <!-- 名片 -->
        <div
          class="wrapper_cont"
          v-if="details.enterprise && details.enterprise.id"
          ref="screen"
        >
          <!-- <img src="@/assets/images/home/detail.png" class="bgImg" alt /> -->
          <img :src="details.enterpriseShow.shareImageUrl" class="bgImg" alt />

          <van-row class="wrapper_text">
            <van-col span="24">
              <!-- <img :src="details.enterprise.logo" alt="logo" class="logo" /> -->
            </van-col>
            <van-col span="18">
              <van-row>
                <van-col span="24">
                  <h3 class="tit">{{ details.enterprise.name }}</h3>
                </van-col>
                <van-col span="24" class="timer">
                  <div>
                    <!-- 预计开展日期： -->
                    预计开招日期：
                    <p>
                      {{
                        details.enterpriseShow.planStartDate +
                        " - " +
                        details.enterpriseShow.planEndDate
                      }}
                    </p>
                  </div>
                </van-col>
              </van-row>
            </van-col>
            <van-col span="6">
              <img src="@/assets/images/home/ma.png" class="ma" alt="二维码" />
            </van-col>
          </van-row>
        </div>
        <!-- 分享底部 -->
        <van-share-sheet
          v-model="showShare"
          :overlay="false"
          :options="options"
          @cancel="handleCancel"
          @select="onSelect"
        />
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
import img1 from "@/assets/images/home/1.png";
import img2 from "@/assets/images/home/2.png";
import img3 from "@/assets/images/home/3.png";
import nullImg from "@/assets/images/null.png";
import follow from "@/components/customer/follow.vue";
import html2canvas from "html2canvas";
import shareTemp from "@/components/customer/shareTemp.vue";

// import footerNav from "@/components/customer/footerNav/index.vue";
import supplierList from "./supplier_list.vue";
import subscribeList from "./subscribe_list.vue";

export default {
  name: "home_details",
  components: {
    follow,
    // 分享
    shareTemp,
    // footerNav
    supplierList,
    subscribeList,
  },
  data() {
    return {
      //   loading: false,
      activeName: "supplier_list",
      // 分享图片地址
      imageurl: "",
      // 企业id
      id: "",
      // 当前年
      year: "",
      // 分享弹窗
      showShare: false,
      options: [
        {
          name: "生成图片",
          icon: img1,
        },
        {
          name: "微信",
          icon: img2,
        },
        {
          name: "朋友圈",
          icon: img3,
        },
      ],
      details: {
        // mediaList: [],
        // followStatus: 1,
        // enterprise: {},
        // enterpriseShow: {},
      },
      shareData: {
        // 分享标题
        title: "展会详情",
        // 分享描述
        desc: "这是描述",
        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        link: encodeURIComponent(window.location.href),
        // 分享图标
        imgUrl:
          "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1604385429697&di=80a7b28ee58dad33427bc3c07ba99f7c&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20171120%2Fbfdfc973135f475a983e3ee7a8e0ae7d.jpeg",
      },
    };
  },

  created() {
    // 企业id
    // this.id = this.$route.query.id;
    document.title = this.$route.query.title;
    // 获取当前年
    this.doHandleYear();
    // 默认刷新列表
    this.handleGetDetail();
    // console.log("分享二维码,接口openid");
  },

  methods: {
    // 获取当前年
    doHandleYear(tYear) {
      var myDate = new Date();
      var tYear = myDate.getFullYear();
      this.year = tYear;
      return tYear;
    },

    // 请求参数
    handleGetDetail() {
      Api.getHomePageDetails(this.$route.query.id)
        .then((res) => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.details = data;
            document.title = this.details.enterprise.name;
          }
        })
        .catch((err) => {
          this.details = {};
        });
    },

    // 关注组件回调
    handleFollow(status) {
      // console.log(status, "关注组件回调");
      this.handleGetDetail();
    },

    // 分享
    handleShare() {
      this.showShare = true;
    },

    // 取消分享图片
    handleCancel() {
      this.showShare = false;
      // this.showShare = true;
    },

    //切换tab
    changeTab(title, name) {},

    // 选择分享
    onSelect(option) {
      // Toast(option.name);
      if (option.name == "生成图片") {
        // 生成图片
        this.handleCanvas();
      } else {
        this.showShare = false;
        // util.success(option.name);
        util.success(option.name);
      }
    },
    // 动态生成图片
    handleCanvas() {
      html2canvas(this.$refs.screen, {
        backgroundColor: "#FFFFFF",
        useCORS: true,
        // allowTaint: true
      }).then((canvas) => {
        if (navigator.msSaveBlob) {
          // IE10+
          const blob = canvas.msToBlob();
          return navigator.msSaveBlob(blob, name);
        } else {
          const imageurl = canvas.toDataURL("image/png");
          this.imageurl = imageurl;

          //   console.log(imageurl);
          // 这里需要自己选择命名规则

          const imagename = this.handleIndexName(
            this.details.enterpriseShow.showName
          );
          this.fileDownload(imageurl, imagename);
        }
      });
    },
    // 下载截屏图片
    fileDownload(downloadUrl, downloadName) {
      const aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = downloadUrl;
      aLink.download = `${downloadName}.jpg`;
      // 触发点击-然后移除
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
      this.showShare = false;
    },

    // 命名规则
    handleIndexName(name) {
      let date = new Date();
      let srt =
        name +
        date.toLocaleDateString() +
        "/" +
        date.getHours() +
        "/" +
        date.getMinutes() +
        "/" +
        date.getSeconds();

      return srt;
    },

    // 查看公司简介
    handleToIntroduce(type) {
      //   console.log(type);
      // 年会展日历
      if (type == 1) {
        // 这里是唯一的入口
        this.$router.push({
          name: "home_calendar",
          query: {
            // 企业id
            id: this.details.enterprise.id,
            name: this.details.enterprise.name,
          },
        });
      }
      // 公司简介
      if (type == 2) {
        this.$router.push({
          name: "home_introduce",
          query: {
            // 企业id
            id: this.details.enterprise.id,
          },
        });
      }

      // 参展商目录
      if (type == 3) {
        this.$router.push({
          name: "exhibitor_home",
          query: {
            // 活动id（展会id）
            enterpriseShowId: this.details.enterpriseShow.id,
            // 展览馆id，全部时传0
            placeId: "0",
          },
        });
      }

      // 展会日程
      if (type == 4) {
        this.$router.push({
          name: "home_arrange",
          query: {
            // 企业id
            id: this.details.enterprise.id,
            _scr: this.details.enterpriseShow.scheduleImageUrl,
          },
        });
      }

      // 参观预约
      if (type == 5) {
        this.$router.push({
          name: "home_order",
          query: {
            id: this.details.enterprise.id,
            // 活动id（展会id）
            enterpriseShowId: this.details.enterpriseShow.id,
          },
        });
      }
    },
  },

  computed: {},

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  },
};
</script>

<style lang="scss">
.home_details {
  .van-swipe__indicators {
    bottom: 1.28rem !important;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "../home.scss";
.home_details {
  .nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
  }

  .tab_content {
    margin-bottom: 0.1rem;
    box-shadow: 0rem 0.2rem 0.26rem 0rem #e9e9e9;
  }
}
</style>

