<template>
  <!-- 企业管理员 -->
  <div class="enterprise_admins">
    <div class="top">
      <div class="left">
        <div class="name">大招科技有限公司</div>
        <div class="type">当前身份为：企业管理员</div>
      </div>
      <div class="right">
        <button>切换身份</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  created() {},
  methods: {}
};
</script>
<style lang='scss' scoped>
.enterprise_admins {
  .top {
    width: 6.84rem;
    height: 1.38rem;
    background: linear-gradient(
      270deg,
      rgba(248, 213, 126, 0.32) 0%,
      rgba(229, 204, 157, 1) 100%
    );
    border-radius: 0.12rem;
  }
}
</style>