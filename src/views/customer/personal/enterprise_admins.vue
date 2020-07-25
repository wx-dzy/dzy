<template>
  <!-- 企业管理员 -->
  <div class="enterprise_admins">
    <div class="top">
      <checkIdentity></checkIdentity>
    </div>
  </div>
</template>
<script>
import checkIdentity from "@/components/customer/checkIdentity.vue";
export default {
  name: "",
  components: {
    checkIdentity
  },
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
    padding: 0 0.32rem;
    box-sizing: border-box;
  }
}
</style>