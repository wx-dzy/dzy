// 编辑个人信息
<template>
  <div class="personal_editInfo">
    <router-view />
      编辑个人信息
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/personal";
import visitingCard from "@/components/customer/visitingCard.vue";

export default {
  name: "personal_editInfo",
  components: {
    // 名片
    visitingCard
  },
  data() {
    return {
      detail: {
        infoImg: "https://img.yzcdn.cn/vant/cat.jpeg",
        name: "xiaogang0-0",
        status: 1,
        activeInfo: "参观房"
      },
      pageSize: 10,
      pageNum: 1
    };
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  watch: {},
  methods: {
    onsubmt() {
      Api.getHomePage(params)
        .then(res => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
          }
        })
        .catch(err => {
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
        name: "personal_details",
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
@import "./personal.scss";
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
</style>

