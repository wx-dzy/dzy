// 展会日程
<template>
  <div class="home_arrange">
    
    <img v-if="_src" :src="_src" class="arrangeImg" alt="展会日程" />
    <!-- 占位图 -->
    <van-empty v-else image="search" description="暂无内容" />
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
// import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "home_arrange",
  components: {
    // footerNav
  },
  data() {
    return {
      _src: "",
      details: {}
    };
  },
  created() {
    this._src = this.$route.query._src;
    // 获取详情
    // this.handleGetDetail()
  },
  methods: {
    // 获取详情
    handleGetDetail() {
      Api.aaaaaa(this.$route.query.id)
        .then(res => {
          let { data, code, msg, total } = res;
          if (code == 200) {
            this.details = data;
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
.home_arrange {
  padding: 0.3rem;
  min-height: 100vh;
  .arrangeImg {
    width: 100%;
  }
}
</style>

