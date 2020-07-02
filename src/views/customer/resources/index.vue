// 资源 tabs切换
<template>
  <div class="resources">
    <van-tabs
      v-model="activeName"
      swipeable
      class="resources_tab"
      title-active-color="#313437"
      title-inactive-color="#9DA1A6"
      @click="onClick"
    >
      <van-tab title="企业" name="enterprise_list" />
      <van-tab title="人物" name="person_list" />
    </van-tabs>

    <div class="tab_content">
      <enterpriseList v-if="activeName == 'enterprise_list' " :activeName="activeName" />
      <personList v-if="activeName == 'person_list' " :activeName="activeName" />
    </div>
  </div>
</template>

<script>
import { util } from "@/utils";
// import { mapGetters } from "vuex";
// import * as Api from "@/api/customer/resources";
import enterpriseList from "./components/enterpriseList.vue";
import personList from "./components/personList.vue";

// import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "resources",
  components: {
    // 企业
    enterpriseList,
    // 人物
    personList
    // footerNav
  },
  data() {
    return {
      activeName: "enterprise_list"
    };
  },

  created() {},
  watch: {},
  methods: {
    onClick(name, title) {
      // console.log(name, title);
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
.resources {
  .resources_tab {
    .van-tabs__line {
      width: 15% !important;
      background-color: #f8d57e;
    }
    .van-hairline--top-bottom::after {
      border: none;
    }
    .van-tab--active {
      font-size: 0.36rem;
    }
    .van-tabs__nav {
      width: 45%;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./resources.scss";
</style>

