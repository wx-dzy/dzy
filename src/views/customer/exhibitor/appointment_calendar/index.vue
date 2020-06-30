<template>
  <!--参展商主页-预约日历  -->
  <div class="appointment_calendar">
    <div class="top_header">
      <img src="" class="head_img" alt="">
      <p class="user_name">王小花</p>
      <p class="job_title">销售经理</p>
    </div>
    <div class="year_month">
      <span class="left"></span>
      <p class="month">2020.06</p>
      <span class="right"></span>
     <van-field
      class="select_type"
      readonly
      clickable
      name="picker"
      :value="value1"
      @click="showPicker = true"
    />
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      
    </van-pull-refresh>
    <van-button class="bottom_button">预 约</van-button>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>
<script>
export default {
  name: "appointment_calendar",
  components: {},
  data() {
    return {
      active: 0,
      isLoading: false,
      showPicker:false,
      value1:'一周',
      columns: ['一周', '一天'],
    };
  },
  created() {},
  methods: {
    onConfirm(value) {
      this.value1 = value;
      this.showPicker = false;
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        alert(1)
      }, 1000);
    },
  }
};
</script>
<style lang='scss' scoped>
.appointment_calendar {
  background-color: #fff;
  .top_header{
    transform: translateY(-0.82rem);
    width:7.5rem;
    height:3.68rem;
    overflow: hidden;
    .head_img{
      display: block;
      margin: 1.18rem auto 0;
      border-radius: 100%;
      width:1.28rem;
      height:1.28rem;
      background: #ccc;
    }
    >p{
      margin-top: 0.12rem;
      color:rgba(49,52,55,1);
      font-family:"AlibabaPuHuiTiM";
      text-align: center;
    }
    .user_name{
      text-align: center;
      height:0.54rem;
      font-size:0.4rem;
      font-family:"AlibabaPuHuiTiM";
      font-weight: bold;
      color:rgba(49,52,55,1);
      line-height:0.54rem;
    }
    .job_title{
      height:0.34rem;
      font-size:0.24rem;
      line-height:0.34rem;
    }
  }
  .top_header::after{
        content: '';
        width: 130%;
        height: 100%;
        position: absolute;
        left: -15%;
        top: 0;
        z-index: -1;
        border-radius: 0 0 50% 50%;
        background:linear-gradient(180deg,rgba(248,213,126,1) 0%,rgba(255,255,255,1) 100%);
  }
  .year_month{
    display: flex;
    padding:0 0 0 1.08rem;
    align-items: center;
    .left{
      margin-top: 0.01rem;
      display: block;
      width: 0.15rem;
      height: 0.15rem;
      border-left: 0.02rem solid #C8CCD3;
      border-bottom: 0.02rem solid #C8CCD3;
      transform: rotate(45deg);
    }
    .month{
      width:1.24rem;
      height:0.4rem;
      font-size:0.32rem;
      font-family:"AlibabaPuHuiTiR";
      color:rgba(157,161,166,1);
      line-height:0.44rem;
      margin: 0 0.14rem;
    }
    .right{
      margin-top: 0.01rem;
      display: block;
      width: 0.15rem;
      height: 0.15rem;
      border-top: 0.02rem solid #C8CCD3;
      border-right: 0.02rem solid #C8CCD3;
      transform: rotate(45deg);
    }
    .select_type{
      margin-left: 2.64rem;
      width: 0.88rem;
      height:0.4rem;
      line-height: 0.4rem;
      padding: 0;
      position: relative;
    }
    .select_type::before{
      content: '';
      display: block;
      position: absolute;
      right: 0.1rem;
      top: 0.1rem;
      width: 0.15rem;
      height: 0.15rem;
      border-top: 0.02rem solid #C8CCD3;
      border-right: 0.02rem solid #C8CCD3;
      transform: rotate(135deg);
    }
  }
  .bottom_button{
    display: block;
    margin: 0 auto;
    width:6.96rem;
    height:0.8rem;
    background:rgba(248,213,126,1);
    border-radius:0.16rem;
  }
}
/deep/ .van-field__control{
    height:0.4rem;
    font-size:0.24rem;
    font-family:"AlibabaPuHuiTiR";
    color:rgba(157,161,166,1);
    line-height:0.4rem;
}
/deep/ .van-tabs__line {
  background-color: #ffcf62;
}
/deep/ .van-tab--active {
  font-size: 0.32rem;
}
/deep/ .van-tab__text--ellipsis {
  font-size: 0.28rem;
}
</style>