// 名片 组件
<template>
  <div class="visitingCard">
    <ul class="cardWrap">
      <li
        v-for="(item, index) in list"
        :key="index"
        class="carditem"
        :class="`${'carditem'+ index}`"
      >{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["dataList"],

  data() {
    return {
      list: [
        {
          name: "姓名",
          arr: "好招数创（北京）科技有限公司",
          tel: "86-1351234567",
          eml: "lidada@163.com",
          addr: "北京市朝阳区新源南路 8 号托原西塔 2"
        },
        {
          name: "姓名1",
          arr: "好招数创（北京）科技有限公司",
          tel: "86-1351234567",
          eml: "lidada@163.com",
          addr: "北京市朝阳区新源南路 8 号托原西塔 2"
        }
      ]
    };
  },
  components: {},

  watch: {},
  created() {
    this.list = this.dataList;
  },
  methods: {
    handleClick(url) {
      this.$router.push({
        name: url
      });
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.visitingCard {
}
</style>
<style lang="scss" scoped>
.visitingCard {
  height: 3.64rem;
  background: #ccc;

  .cardWrap {
    .carditem {
      width: 6.16rem;
      height: 3.2rem;
      margin-top: 0.28rem;
      background: #fff;
      box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
      border-radius: 0.16rem;
    }
    .carditem0 {
      background: linear-gradient(
        316deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(209, 209, 209, 1) 100%
      );
    }
  }
  
}
</style>