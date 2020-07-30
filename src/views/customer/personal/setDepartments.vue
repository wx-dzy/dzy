<template>
  <!-- 设置部门 -->
  <div class="setDepartments">
    <van-search v-model="value" shape="round" placeholder="当前企业的人名" />
    <div class="item">
      <div class="itemBox" v-for="(item,index) in itemList" :key="index">
        <div class="left">
          <img :src="item.imgUrl" alt />
        </div>
        <div class="right">{{item.company}}</div>
      </div>
    </div>
    <div class="remarks">注：添加子部门，可以是一个公司形式，也可以是部门形式</div>
    <div class="foot">
      <button class="add1" style="background: rgba(248, 213, 126, 1);border:none;">添加部门</button>
      <button
        @click="addMember"
        class="add2"
        style="background:rgba(255,255,255,1);border:0.02rem solid rgba(213,213,222,1);"
      >添加成员</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      itemList: [
        {
          imgUrl: require("../../../assets/images/girl.png"),
          company: "风风火火有限公司",
        },
        {
          imgUrl: require("../../../assets/images/girl.png"),
          company: "风风火火有限公司",
        },
        {
          imgUrl: require("../../../assets/images/girl.png"),
          company: "风风火火有限公司",
        },
        {
          imgUrl: require("../../../assets/images/girl.png"),
          company: "风风火火有限公司",
        },
        {
          imgUrl: require("../../../assets/images/girl.png"),
          company: "风风火火有限公司",
        },
        {
          imgUrl: require("../../../assets/images/girl.png"),
          company: "王晓红",
        },
      ],
      value:""
    };
  },
  created() {},
  methods: {
    addMember() {
      this.$router.push({
        name: "addMember",
      });
    },
  },
  mounted() {
    document.body.style.backgroundColor = "#eeeeee";
  },
};
</script>
<style lang='scss' scoped>
.setDepartments {
  width: 7.5rem;
  background-color: #fff;
  .item {
    padding-left: 0.28rem;
    .itemBox {
      display: flex;
      height: 1.46rem;
      border-bottom: 0.02rem solid rgba(233, 233, 233, 1);
      .left {
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
        margin: auto 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        padding-left: 0.3rem;
        line-height: 1.35rem;
        font-size: 0.32rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
  .remarks {
    background: #eeeeee;
    padding-top: 0.32rem;
    text-align: center;
    font-size: 0.24rem;
    color: rgba(157, 161, 166, 1);
    line-height: 0.34rem;
    width: 7.5rem;
    padding-bottom: 2rem;
  }
  .foot {
    width: 7.5rem;
    height: 1.7rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.04rem;
    // position: fixed;
    // bottom: 0;

    button {
      height: 0.8rem;
      border-radius: 0.16rem;
      font-size: 0.32rem;
      color: #313437;
      outline: none;
      margin-top: 0.4rem;
    }
    .add1 {
      width: 3.76rem;
      margin-left: 0.28rem;
    }
    .add2 {
      width: 3rem;
      margin-left: 0.2rem;
    }
  }
}
</style>