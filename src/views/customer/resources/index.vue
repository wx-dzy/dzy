// 资源
<template>
  <div class="resources" v-if="1">
   资源
  </div>
  <!-- 占位图 -->
  <img
    v-else
    src="@/assets/images/null.png"
    style="width: 4rem; margin: 1.4rem 1.47rem;"
    class="nullImg"
    alt
  />
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/resources";
import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "resources",
  components: {
    footerNav,
  },
  data() {
    return {
      // 
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
  },
  watch: {},
  methods: {
    // 获取详情
    handleDetail() {
      Api.getUserMyIndex()
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            this.detail = data;
          }
        })
        .catch(err => {
          this.detail = {};
        });
    },

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
// @import "./resources.scss";
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
</style>

