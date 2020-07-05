<template>
  <!--参展商主页-预约日历  -->
  <div class="appointment_calendar">
    <div class="top_header">
      <img :src="userHeadUrl" class="head_img" alt />
      <p class="user_name">{{userInfo.realName}}</p>
      <p class="job_title">{{userInfo.postName}}</p>
    </div>
    <div class="year_month">
      <span class="left" @click="weekPre"></span>
      <p class="month">{{ currentYear }}.{{ currentMonth }}</p>
      <span class="right" @click="pickNext"></span>
      <!-- <van-field
      class="select_type"
      readonly
      clickable
      name="picker"
      :value="value1"
      @click="showPicker = true"
      />-->
    </div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="push_box">
      <div class="date">
        <!-- 日期 -->
        <ul class="days">
          <!-- 星期 -->
          <ul class="weekdays">
            <li class="weekends" v-for="(item,index) in weekList" :key="index">{{item.text}}</li>
            <!-- <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
            <li class="weekends">六</li>-->
          </ul>
          <li @click="pick(day)" v-for="(day, index) in days" :key="index">
            <!--本月-->
            <span v-if="day.getMonth()+1 != currentMonth" class="other-month">{{ day.getDate() }}</span>
            <span v-else>
              <!--今天-->
              <span
                v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()"
                class="active"
              >{{ day.getDate() }}</span>
              <span v-else>{{ day.getDate() }}</span>
            </span>
            <p class="full" v-if="isFull">约满</p>
          </li>
        </ul>
      </div>
      <div class="date_content">
        <div class="item" v-for="(item,index) in todayList" :key="index">
          <p class="item_top">{{item.timeFrame}}{{item.interviewTime.substr(0,5)}}</p>
          <p class="item_bottom">{{item.interviewStatus==2?'已预约':''}}</p>
        </div>
      </div>
      <p class="refreshTip">
        <van-icon name="replay" class="replay_icon" />下拉刷新
      </p>
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
import * as Api from "@/api/customer/exhibitor";
export default {
  name: "appointment_calendar",
  components: {},
  data() {
    return {
      weekList: [
        {
          text: "日"
        },
        {
          text: "一"
        },
        {
          text: "二"
        },
        {
          text: "三"
        },
        {
          text: "四"
        },
        {
          text: "五"
        },
        {
          text: "六"
        }
      ],
      active: 0,
      isLoading: false,
      showPicker: false,
      value1: "一周",
      columns: ["一周", "一天"],
      currentYear: 1970, // 年份
      currentMonth: 1, // 月份
      currentDay: 1, // 日期
      currentWeek: 1, // 星期
      days: [],
      todayList: [], //当日预约情况
      userInfo: {}, //用户信息
      userHeadUrl:
        "http://img4.imgtn.bdimg.com/it/u=1027245443,3552957153&fm=26&gp=0.jpg"
    };
  },
  computed: {
    isFull(day) {
      // console.log(day);
      return 1;
    }
  },
  created() {
    Api.getUserInfo(1).then(res => {
      console.log("人物信息" + res);
      if (res.code == 200) {
        this.userInfo = res.data;
      }
    });
    // //日数据-貌似是本人当前天
    // Api.getTodayData(1).then(res=>{
    //   console.log('日信息'+res);
    //   if (res.code == 200) {

    //   }
    // })
    this.initData(null);
    this.initTodayList();
  },
  methods: {
    initTodayList() {
      let data = [
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "08:00:00",
          interviewStatus: 1
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "08:30:00",
          interviewStatus: 2
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "09:00:00",
          interviewStatus: 0
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "09:30:00",
          interviewStatus: 0
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "10:00:00",
          interviewStatus: 2
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "10:30:00",
          interviewStatus: 1
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "11:00:00",
          interviewStatus: 0
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "11:30:00",
          interviewStatus: 0
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "13:00:00",
          interviewStatus: 0
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "13:30:00",
          interviewStatus: 0
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "14:00:00",
          interviewStatus: 0
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "14:30:00",
          interviewStatus: 1
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "15:00:00",
          interviewStatus: 1
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "15:30:00",
          interviewStatus: 0
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "16:00:00",
          interviewStatus: 2
        },
        {
          userPreInterviewDetailId: "1276685523884294146",
          interviewTime: "16:30:00",
          interviewStatus: 1
        }
      ];
      data.forEach((item, index) => {
        if (item.interviewTime.substr(0, 2) * 1 < 12) {
          item.timeFrame = "上午";
        } else {
          item.timeFrame = "下午";
        }
      });
      this.todayList = data;
    },
    formatDate(year, month, day) {
      const y = year;
      let m = month;
      if (m < 10) m = `0${m}`;
      let d = day;
      if (d < 10) d = `0${d}`;
      return `${y}-${m}-${d}`;
    },
    initData(cur) {
      let date = "";
      if (cur) {
        date = new Date(cur);
      } else {
        date = new Date();
      }
      this.currentDay = date.getDate(); // 今日日期 几号
      this.currentYear = date.getFullYear(); // 当前年份
      this.currentMonth = date.getMonth() + 1; // 当前月份
      this.currentWeek = date.getDay(); // 1...6,0  // 星期几
      if (this.currentWeek === 0) {
        this.currentWeek = 7;
      }
      const str = this.formatDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      ); // 今日日期 年-月-日
      this.days.length = 0;
      // 今天是周日，放在第一行第7个位置，前面6个 这里默认显示一周，如果需要显示一个月，则第二个循环为 i<= 35- this.currentWeek
      /* eslint-disabled */
      for (let i = this.currentWeek - 1; i >= 0; i -= 1) {
        const d = new Date(str);
        d.setDate(d.getDate() - i - 1);
        // console.log(y:" + d.getDate())
        this.days.push(d);
        console.log(i, d);
      }
      for (let i = 1; i <= 32 - this.currentWeek; i += 1) {
        const d = new Date(str);
        d.setDate(d.getDate() + i - 1);
        this.days.push(d);

        console.log(i, d);
      }
    },

    // 上个星期
    weekPre() {
      const d = this.days[0]; // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() - 7);
      this.initData(d);
    },

    // 下个星期
    weekNext() {
      const d = this.days[6]; // 如果当期日期是7号或者小于7号
      d.setDate(d.getDate() + 7);
      this.initData(d);
    },

    // 上一個月  传入当前年份和月份
    pickPre(year, month) {
      const d = new Date(this.formatDate(year, month, 1));
      d.setDate(0);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    // 下一個月  传入当前年份和月份
    //  pickNext (year, month) {
    //   const d = new Date(this.formatDate(year, month, 1))
    //   d.setDate(35)
    //   this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    //  },
    pickNext() {
      const d = new Date(
        this.formatDate(this.currentYear, this.currentMonth, 1)
      );
      console.log(d);
      d.setDate(35);
      this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1));
    },

    // 当前选择日期
    pick(date) {
      console.log(
        this.formatDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
      );
    },
    onConfirm(value) {
      this.value1 = value;
      this.showPicker = false;
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
        console.log("刷新");
        this.initTodayList();
      }, 1000);
    }
  }
};
</script>
<style lang='scss' scoped>
.appointment_calendar {
  background-color: #fff;
  .top_header {
    margin-bottom: 0.48rem;
    transform: translateY(-0.82rem);
    width: 7.5rem;
    height: 3.68rem;
    overflow: hidden;
    .head_img {
      display: block;
      margin: 1.18rem auto 0;
      border-radius: 100%;
      width: 1.28rem;
      height: 1.28rem;
    }
    > p {
      margin-top: 0.12rem;
      color: rgba(49, 52, 55, 1);
      font-family: "AlibabaPuHuiTiM";
      text-align: center;
    }
    .user_name {
      text-align: center;
      height: 0.54rem;
      font-size: 0.4rem;
      font-family: "AlibabaPuHuiTiM";
      font-weight: bold;
      color: rgba(49, 52, 55, 1);
      line-height: 0.54rem;
    }
    .job_title {
      height: 0.34rem;
      font-size: 0.24rem;
      line-height: 0.34rem;
    }
  }
  .top_header::after {
    content: "";
    width: 130%;
    height: 100%;
    position: absolute;
    left: -15%;
    top: 0;
    z-index: -1;
    border-radius: 0 0 50% 50%;
    background: linear-gradient(
      180deg,
      rgba(248, 213, 126, 1) 0%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  .year_month {
    transform: translateY(-0.82rem);
    display: flex;
    padding: 0 0 0 1.08rem;
    align-items: center;
    margin-bottom: 0.56rem;
    .left {
      margin-top: 0.01rem;
      display: block;
      width: 0.15rem;
      height: 0.15rem;
      border-left: 0.02rem solid #c8ccd3;
      border-bottom: 0.02rem solid #c8ccd3;
      transform: rotate(45deg);
    }
    .month {
      height: 0.4rem;
      font-size: 0.32rem;
      font-family: "AlibabaPuHuiTiR";
      color: rgba(157, 161, 166, 1);
      line-height: 0.44rem;
      margin: 0 0.14rem;
    }
    .right {
      margin-top: 0.01rem;
      display: block;
      width: 0.15rem;
      height: 0.15rem;
      border-top: 0.02rem solid #c8ccd3;
      border-right: 0.02rem solid #c8ccd3;
      transform: rotate(45deg);
    }
    .select_type {
      margin-left: 2.64rem;
      width: 0.88rem;
      height: 0.4rem;
      line-height: 0.4rem;
      padding: 0;
      position: relative;
    }
    .select_type::before {
      content: "";
      display: block;
      position: absolute;
      right: 0.1rem;
      top: 0.1rem;
      width: 0.15rem;
      height: 0.15rem;
      border-top: 0.02rem solid #c8ccd3;
      border-right: 0.02rem solid #c8ccd3;
      transform: rotate(135deg);
    }
  }
  .push_box {
    transform: translateY(-0.82rem);
    .date_content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      align-items: center;
      margin: 0.44rem auto 0;
      width: 6.96rem;
      height: 6.02rem;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
      border-radius: 0.1rem;
      // padding: 0.34rem  0.26rem;
    }
    .date_content:nth-child(4) {
      margin: 0;
    }
    .item {
      text-align: center;
      // flex: 25%;
      width: 1.48rem;
      height: 0.94rem;
      border-radius: 0.1rem;
      border: 0.02rem solid rgba(248, 213, 126, 1);
      font-size: 0.26rem;
      .item_top {
        color: #313437;
      }
      .item_bottom {
        color: #9da1a6;
      }
    }
    .refreshTip {
      margin-top: 0.26rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0.34rem;
      font-size: 0.24rem;
      font-family: "AlibabaPuHuiTiR";
      color: rgba(74, 152, 247, 1);
      line-height: 0.34rem;
      .replay_icon {
      }
    }
  }
  .bottom_button {
    transform: translateY(-0.34rem);
    display: block;
    margin: 0 auto;
    width: 6.96rem;
    height: 0.8rem;
    background: rgba(248, 213, 126, 1);
    border-radius: 0.16rem;
  }
}
.date {
  color: #333;

  .month {
    text-align: center;
  }

  .weekdays {
    width: 100%;
    // height: 0.87rem;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    li {
      color: #c8ccd3;
      // flex: 1;
      display: inline-block;
      width: 1.07rem;
      text-align: center;
    }
    .weekends {
      color: #f4b860;
    }
  }

  .days {
    //  display: flex;
    //  background-color: pink;
    width: 100%;
    // height: 0.87rem;
    overflow-x: scroll;
    overflow-y: hidden;
    // flex-wrap: nowrap;
    white-space: nowrap;
    li {
      // flex: 15%;
      display: inline-block;
      width: 1.07rem;
      text-align: center;
      // border: 1px solid red;

      span {
        display: inline-block;
        font-size: 0.26rem;
        font-family: "AlibabaPuHuiTiR";
        color: #313437;
        line-height: 0.56rem;
        width: 0.56rem;
        height: 0.56rem;
      }
      .active {
        display: inline-block;
        font-size: 0.26rem;
        font-family: "AlibabaPuHuiTiR";
        color: rgba(49, 52, 55, 1);
        line-height: 0.56rem;
        width: 0.56rem;
        height: 0.56rem;
        background: rgba(248, 213, 126, 1);
        border-radius: 0.16rem;
      }
      .full {
        margin: 0 auto;
        width: 0.4rem;
        height: 0.28rem;
        font-size: 0.18rem;
        color: #9da1a6;
        border: 0.01rem dotted #000;
      }
      .other-month {
        color: #9da1a6;
      }
    }
  }
}
/deep/ .van-field__control {
  height: 0.4rem;
  font-size: 0.24rem;
  font-family: "AlibabaPuHuiTiR";
  color: rgba(157, 161, 166, 1);
  line-height: 0.4rem;
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