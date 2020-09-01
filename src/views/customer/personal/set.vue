<template>
<!-- 设置 -->
  <div class="set">
    <div class="loginOut">
      <button @click="toLogin">退出登录</button>
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
  methods: {
    toLogin() {
        var storage = window.localStorage;
      storage.clear();
      this.$router.push({
        path: "/",
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.set{
    .loginOut{
        margin-top: 1rem;
        width: 7.5rem;
        display: flex;
        justify-content: center;
        button{
            background-color: #5b9bd5;
            color: #fff;
            border: none;
            outline: none;
            width: 2.5rem;
            height: 0.8rem;
            border-radius: 0.2rem;
        }
    }
}
</style>