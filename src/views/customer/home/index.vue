// 首页
<template>
  <div class="home footerPad">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <div class="bgFFF">
        <h2 class="head">
          大招·采
          <i>帮你放大招！</i>
        </h2>

        <van-swipe v-if="banner.length" class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(image, index)  in banner" :key="index">
            <!-- <router-link :to="{'path':'personal'}"> -->
            <img :src="image.mediaUrl" alt />
            <!-- </router-link> -->
          </van-swipe-item>
        </van-swipe>
      </div>

      <!-- 指定参加  列表内容-->
      <div v-if="specifyList.length">
        <div class="specifyWrap">
          <h3 class="title">指定参加</h3>
          <ul class="specifyList clearfix" :style="{width: (4.62 *  specifyList.length) + 'rem'}">
            <li
              v-for="(item, index)  in specifyList"
              :key="index"
              class="contentItem"
              :class="index+1 == specifyList.length ? 'margin0' : ''"
              @click="handleLook(item)"
            >
              <img v-if="!item.videoUrl" :src="item.mediaUrl" alt class="itemImg" />
              <div v-else class="itemImg">
                <Video-Demo
                  :_id="item.id"
                  :src="item.videoUrl"
                  :bannerIMG="item.mediaUrl"
                  :playVideoId.sync="playVideoId"
                  style="width: 100%;"
                  class="zoom"
                />
              </div>
              <ol class="cont">
                <li class="tit">
                  <span class="type">{{ item.tagName }}</span>
                  {{item.showName}}
                </li>
                <!-- <li class="timer">{{ item.planStartDate.replace('-', ".") }} - {{ item.planEndDate.replace(/-/, ".") }}</li> -->
                <li class="timer">{{ item.planStartDate }} - {{ item.planEndDate }}</li>
                <li class="clearfix">
                  <img :src="item.logo" alt="logo" class="logo" />
                  <i>{{ item.enterpriseName }}</i>
                  <p class="statusWrap">
                    <span
                      class="status"
                    >{{ item.showFormat == 1 ? '仅线上' : item.showFormat == 2 ? '仅线下' : item.showFormat == 3 ? '全包括' : ''}}</span>
                    <span v-show="item.specifyStatus == 1" class="status">企业指定</span>
                  </p>
                  <!-- <van-button round type="default" size="small" style="float:right;">了解更多</van-button> -->
                </li>
              </ol>
            </li>
          </ul>
        </div>
      </div>

      <!-- 全部展会 列表内容 -->
      <div class="content" v-if="listData.length">
        <!-- <h3 class="title">全部展会</h3> -->
        <h3 class="title">全部订货会</h3>
        <!-- List 列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="----- 我是有底线的 -----"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          class="contentList"
        >
          <van-cell
            v-for="(item, index)  in listData"
            :key="index"
            class="contentItem"
            :class="index+1 == listData.length ? 'margin0' : ''"
            @click="handleLook(item)"
          >
            <img v-if="!item.videoUrl" :src="item.mediaUrl" alt class="itemImg" />
            <div v-else class="itemImg">
              <Video-Demo
                :_id="item.id"
                :src="item.videoUrl"
                :bannerIMG="item.mediaUrl"
                :playVideoId.sync="playVideoId"
                style="width: 100%;"
              />
            </div>

            <ol class="cont">
              <li class="tit">
                <span class="type">{{ item.tagName }}</span>
                {{item.showName}}
              </li>
              <li class="timer">{{ item.planStartDate }} - {{ item.planEndDate }}</li>
              <li class="clearfix">
                <img :src="item.logo" alt="logo" class="logo" />
                <i>{{ item.enterpriseName }}</i>
                <p class="statusWrap">
                  <span
                    class="status"
                  >{{ item.showFormat == 1 ? '仅线上' : item.showFormat == 2 ? '仅线下' : item.showFormat == 3 ? '全包括' : ''}}</span>
                  <span v-show="item.specifyStatus == 1" class="status">企业指定</span>
                </p>
              </li>
            </ol>
          </van-cell>
        </van-list>
        <!-- <van-button round type="default" size="small" style="float:right;" @click="showVideo = !showVideo">了解更多</van-button> -->
      </div>

      <!-- 占位图 -->
      <!-- <img
        v-show="!specifyList.length && !listData.length"
        src="@/assets/images/null.png"
        class="nullImg"
        alt
      />-->
    </van-pull-refresh>
    <footer-nav :active="active" />
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
import VideoDemo from "@/components/customer/videoPlay/index.vue";
import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "home",
  components: {
    VideoDemo, // 播放
    footerNav
  },
  data() {
    return {
      // 当前播放id 组件回调 做自动暂停使用
      playVideoId: "0",
      active: "home",
      src: require("@/assets/images/video1.mp4"),
      // 轮播
      banner: [],
      // 置顶参加会展
      specifyList: [],
      listData: [],
      // list: [
      //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212479210&di=67b3ada2b2c47521e7ea2de18d9ffa0b&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Fsinacn%2Fw640h640%2F20180109%2Fb756-fyqnici7832949.jpg",
      //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212531543&di=9d59120aa8b215694e9993b67950027a&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1601155093%2C2841826143%26fm%3D214%26gp%3D0.jpg",
      //   "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1592212565237&di=3e2da936b910826f25cbc121c4fe9e73&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D3021468801%2C4117927881%26fm%3D214%26gp%3D0.jpg"
      // ],
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 10,
      pageNum: 1
    };
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // 获取轮播图
    this.handleGetBanner();
    // 默认刷新列表
    this.onSearch();
  },
  watch: {
    // playVideoId(newVal, oldVal) {
    //   console.log(newVal, "22222wwww");
    // }
  },

   beforeRouteLeave(to, from, next) {
    // console.log(to)
    // return
    // 主页禁止返回
    if (to.path == "/login" || to.path == "/codeLogin") {
      next(false);
    } else {
      next();
    }
  },
  methods: {
    // 获取轮播图
    handleGetBanner() {
      Api.getHomeMediaList()
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.banner = data.mediaList;
            this.specifyList = data.specifyList;
          }
        })
        .catch(err => {
          this.banner = [];
          this.specifyList = [];
        });
    },

    // 搜索
    onSearch() {
      // this.listData = [];
      this.pageNum = 1;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize // 每页几条数据
      };
      // console.log(params,'onSearch')
      this.onsubmt(params);
    },

    // 懒加载请求加载列表
    onLoad() {
      this.pageNum++;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize // 每页几条数据
      };
      // console.log(params,'onLoad')
      this.onsubmt(params);
    },

    // 上拉刷新
    onRefresh() {
      this.finished = false;
      this.pageNum = 1;
      let params = {
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize // 每页几条数据
      };
      this.onsubmt(params, 1);
    },

    // 请求参数 params status{1:上拉刷新，2：正常请求}
    onsubmt(params, statu) {
      let status = statu ? statu : 2; // 默认正常请求
      Api.getHomePage(params)
        .then(res => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
            if (status == 1) {
              // 上拉刷新
              this.refreshing = false;
              this.listData = data;
              this.$toast("刷新成功");
            } else {
              data.forEach(element => {
                this.listData.push(element);
              });
            }
            // 数据全部加载完成
            if (data.length < this.pageSize) {
              this.finished = true;
            }
          }
        })
        .catch(err => {
          // 上拉刷新
          this.refreshing = false;
          console.log(err, "err");
        });
    },

    // 查看详情
    handleLook(row) {
      this.$router.push({
        name: "home_details",
        query: {
          // 企业id
          id: row.id
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
<style lang="scss">
// .home {}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./home.scss";

.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
</style>

