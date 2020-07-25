<template>
  <!-- 我索取的企业资料 -->
  <div class="my_askFor_data">
    <van-search v-model="value" shape="round" placeholder="请输入企业名称/法人姓名/品牌名称" />
    <!-- 排序 -->
    <div class="sort">
      <div class="sortBox">
        <span
          :class="{active:num === 1}"
          id="1"
          @click="changeactive(1)"
          style="padding-right:0.2rem;"
        >按时间排序</span>
        <span>|</span>
        <span
          :class="{active:num === 2}"
          id="2"
          @click="changeactive(2)"
          style="padding-left:0.2rem;"
        >默认排序</span>
      </div>
    </div>
    <div class="itemBox">
      <div class="box" v-for="(item,index) in itemList" :key="index">
        <div class="left">
          <img :src="item.imgUrl" alt />
        </div>
        <div class="right">
          <div class="name">{{item.name}}</div>
          <div class="company">{{item.company}}</div>
          <div class="legalPerson">法人：{{item.legalPerson}}</div>
          <div class="date">成立日期：{{item.data}}</div>
        </div>
      </div>
    </div>
    <!-- <van-divider dashed>我是有底线的</van-divider> -->
  </div>
</template>
<script>
export default {
  name: "",
  components: {},
  data() {
    return {
      num: 2,
      value: "",
      itemList: [
        {
          imgUrl: "",
          name: "企业宣传手册.PDF",
          company: "风风火火电子科技公司",
          legalPerson: "李达达",
          date: "2018.09.08",
        },
        {
          imgUrl: "",
          name: "企业宣传手册.PDF",
          company: "风风火火电子科技公司",
          legalPerson: "李达达",
          date: "2018.09.08",
        },
        {
          imgUrl: "",
          name: "企业宣传手册.PDF",
          company: "风风火火电子科技公司",
          legalPerson: "李达达",
          date: "2018.09.08",
        },
        {
          imgUrl: "",
          name: "企业宣传手册.PDF",
          company: "风风火火电子科技公司",
          legalPerson: "李达达",
          date: "2018.09.08",
        },
      ],
    };
  },
  created() {},
  methods: {
    changeactive(num) {
      this.num = num;
    },
  },
};
</script>
<style lang='scss' scoped>
.my_askFor_data {
  padding: 0 0.26rem;
  padding-bottom: 1rem;
  /deep/ .van-field__left-icon .van-icon{
      color: #9DA1A6;
  }
  /deep/ .van-cell__value--alone {
    font-size: 0.24rem;
    }
  .sortBox{
      float: right;
  }
  .sort {
    // padding-top: 0.32rem;
    // background-color: pink;

    span {
      color: #9da1a6;
      font-size: 0.24rem;
    }
    .active {
      color: #313437;
    }
  }
  .itemBox {
    padding-left: 0.1rem;
    padding-top: 0.5rem;
    .box {
      height: 2.4rem;
      display: flex;
      border-bottom: 1px solid rgba(233, 233, 233, 1);
      .left {
        width: 1.4rem;
        height: 1.4rem;
        border: 0.02rem solid rgba(233, 233, 233, 1);
        margin-top: 0.5rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        padding-left: 0.48rem;
        margin-top: 0.4rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        .name {
          font-size: 0.32rem;
          color: rgba(49, 52, 55, 1);
          line-height: 0.36rem;
        }
        .company {
          padding-top: 0.2rem;
        }
        .company,
        .legalPerson,
        .date {
          font-size: 0.24rem;
          color: #9da1a6;
        }
      }
    }
  }
  //   /deep/ .van-divider {
  //         font-size: 0.24rem;
  // 	}
}
</style>