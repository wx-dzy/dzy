// 资源-企业列表
<template>
  <div class="enterprise_list">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-search
        v-model="searchVal"
        placeholder="请输入企业名称/法人姓名/品牌姓名"
        @search="onSearch"
        @input="onSearch"
      />

      <!-- 列表内容 -->
      <div class="content" v-if="listData.length">
        <!-- List 列表 -->
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="----- 都在这里啦！ -----"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
          class="contentList"
        >
          <van-cell
            v-for="(item, index)  in listData"
            :key="index"
            class="contentItem"
            @click="handleLook(item)"
          >
            <van-row >
              <van-col span="7">
                <img :src="item.logo" alt="" class="logo">
              </van-col>
              <van-col span="17">
                <h3 class="title">{{ item.name }}</h3>
                <!-- <van-col span="12">品牌：{{ '22' }}</van-col> -->
              <van-col span="12" class="color999">法人：{{ item.legalPerson }}</van-col>
              <van-col span="24" class="color999">成立日期：{{ item.registerDate }}</van-col>
              </van-col>
            </van-row>
          </van-cell>
        </van-list>
      </div>
      <!-- 占位图 -->
      <img
        v-if="!listData.length && isNum"
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
import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  props: ["activeName"],
  name: "enterprise_list",
  components: {
    footerNav
  },
  data() {
    return {
      isNum: 0,
      searchVal: "",
      listData: [],
      loading: false,
      finished: false,
      refreshing: false,
      pageSize: 10,
      pageNum: 1
      // active: "resources",
    };
  },

  created() {
    // 默认刷新列表
    this.onSearch();
  },
  watch: {},
  methods: {
    // 搜索
    onSearch(val) {
      this.listData = []
      // console.log(val);
      this.pageNum = 1;
      let params = {
        params: val || this.searchVal,
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
        params: this.searchVal,
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
      this.searchVal = "";
      let params = {
        params: this.searchVal,
        pageNum: this.pageNum, // 页数
        pageSize: this.pageSize // 每页几条数据
      };
      this.onsubmt(params, 1);
    },

    // 请求参数 params status{1:上拉刷新，2：正常请求}
    onsubmt(params, statu) {
      let status = statu ? statu : 2; // 默认正常请求
      Api.getFollowPage(params)
        .then(res => {
          let { code, msg, data, total } = res;
          this.isNum++
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
            if (status == 1) {
              // 上拉刷新
              this.refreshing = false;
              this.listData = data;x
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
          // console.log(err, "err");
        });
    },

    // 查看详情
    handleLook(row) {
      this.$router.push({
        name: "resources_enterpriseDetail",
        // name: "exhibitor_details",
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

<style lang="scss">
// 资源-企业列表
.enterprise_list {
  .van-search__content {
    border-radius: 0.32rem;
  }
  .van-field__control,
  .van-cell {
    color: #9da1a6;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "../resources.scss";
</style>

