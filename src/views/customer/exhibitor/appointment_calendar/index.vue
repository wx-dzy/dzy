<template>
    <!--参展商主页-预约日历  -->
    <div class="appointment_calendar">
        <div class="top_header">
            <img :src="userInfo.avatar"
                 class="head_img"
                 alt />
            <p class="user_name">{{userInfo.realName}}</p>
            <p class="job_title">{{userInfo.postName}}</p>
        </div>
        <div class="year_month">
            <span class="left"
                  @click="pickPre"></span>
            <p class="month">{{ currentYear }}.{{ currentMonth }}</p>
            <span class="right"
                  @click="pickNext"></span>
            <!-- <van-field
      class="select_type"
      readonly
      clickable
      name="picker"
      :value="value1"
      @click="showPicker = true"
            />-->
        </div>
        <van-pull-refresh v-model="isLoading"
                          @refresh="onRefresh"
                          class="push_box">
            <div class="date">
                <!-- 日期 -->
                <ul class="days">
                    <!-- 星期 -->
                    <ul class="weekdays">
                        <li class="weekends"
                            v-for="(item,index) in weekListShow"
                            :key="index">
                            <div class="times">{{item.text}}</div>

                        </li>
                        <!-- <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
                        <li class="weekends">六</li>-->
                    </ul>
                    <li @click="pick(day.name,index,$event)"
                        v-for="(day, index) in days"
                        :key="index"
                        v-show="day.showDate">
                        <!--本月-->
                        <!-- <span v-if="day.getMonth()+ 1 != currentMonth" class="other-month">{{ day.getDate() }}</span> -->
                        <span>
                            <!-- <span v-else> -->
                            <!--今天-->
                            <!-- <span
                v-if="day.getFullYear() == new Date().getFullYear() && day.getMonth() == new Date().getMonth() && day.getDate() == new Date().getDate()"
                class="active"
                            >{{ day.getDate() }}</span>-->
                            <span :class="{'active':index==current}">{{ day.name }}</span>
                            <div class="status">{{day.interviewStatus == 0?'不可预约':day.interviewStatus == 1?'可预约':day.interviewStatus == 2?'约满':''}}</div>
                            <!-- <span v-else>{{ day.getDate() }}</span> -->
                        </span>
                        <!-- <p class="full" v-if="isFull">约满</p> -->
                    </li>
                </ul>
            </div>
            <div class="date_content"
                 v-show="showDate">
                <div :class=" [checkIndex == index?'checkActive':'item']"
                     v-for="(item,index) in todayData"
                     :key="index"
                     @click="check(index)">
                    <p class="item_top">{{item.interviewTime.substr(0,5)}}</p>
                    <p class="item_bottom">{{item.interviewStatus_1}}</p>
                </div>
            </div>
            <p class="refreshTip">
                <van-icon name="replay"
                          class="replay_icon" />下拉刷新
            </p>
        </van-pull-refresh>
        <van-button class="bottom_button"
                    v-show="status == 1"
                    @click="toOrder">预 约</van-button>
        <van-button class="bottom_button"
                    v-show="status == 2"
                    @click="cancleOrder">取 消 预 约</van-button>
        <i v-if="status == 0"></i>
        <van-popup v-model="showPicker"
                   position="bottom">
            <van-picker show-toolbar
                        :columns="columns"
                        @confirm="onConfirm"
                        @cancel="showPicker = false" />
        </van-popup>
    </div>
</template>
<script src="https://cdn.jsdelivr.net/npm/jutils-src"></script>
<script>
import { util } from '@/utils'
import * as Api from '@/api/customer/exhibitor'
import getDate from '@/store/getDate'
export default {
    name: 'appointment_calendar',
    components: {},
    data () {
        return {
            current: 0, // 选中的日期下标
            weekList: [
                { text: '日', value: 7 },
                { text: '一', value: 1 },
                { text: '二', value: 2 },
                { text: '三', value: 3 },
                { text: '四', value: 4 },
                { text: '五', value: 5 },
                { text: '六', value: 6 },
                { text: '日' },
                { text: '一' },
                { text: '二' },
                { text: '三' },
                { text: '四' },
                { text: '五' },
                { text: '六' },
                { text: '日' },
                { text: '一' },
                { text: '二' },
                { text: '三' },
                { text: '四' },
                { text: '五' },
                { text: '六' },
                { text: '日' },
                { text: '一' },
                { text: '二' },
                { text: '三' },
                { text: '四' },
                { text: '五' },
                { text: '六' },
                { text: '日' },
                { text: '一' },
                { text: '二' },
                { text: '三' },
                { text: '四' },
                { text: '五' },
                { text: '六' },
                { text: '日' },
                { text: '一' },
                { text: '二' },
                { text: '三' },
                { text: '四' },
                { text: '五' },
                { text: '六' },
            ],
            weekListShow: [],
            active: 0,
            isLoading: false,
            showPicker: false,
            value1: '一周',
            columns: ['一周', '一天'],
            currentYear: 1970, // 年份
            currentMonth: 1, // 月份
            currentDay: 1, // 日期
            currentWeek: 1, // 星期
            days: [],
            userInfo: {}, //用户信息
            userHeadUrl:
                'http://img4.imgtn.bdimg.com/it/u=1027245443,3552957153&fm=26&gp=0.jpg',
            enterpriseShowPeopleId: '', //展会企业人物ID
            weekData: [],
            weekIndex: 0, //当前选中日期的下标
            todayData: [], // 获取到的日数据
            status: 0, // 是否可以预约
            userPreInterviewDetailId: '', // 当前选中的预约明细id
            userPreInterviewId: '', //当前选中天的id
            monthLength: 0, // 当月有多少天
            startDate: 0, //周数据开始
            endDate: 0, // 周数据结束
            showDate: false, // 是否显示
            checkIndex: 0
        }
    },
    computed: {
        isFull (day) {
            // console.log(day);
            return 1
        },
    },

    created () {
        // let endtime = getDate.getToday().endtime;
        // //今日结束时间
        // let starttime = getDate.getToday().starttime;
        // console.log("获取时间今日时间");
        // console.log(getDate.getToday());
        // console.log(starttime);

        // 本周
        // let endtime = getDate.getCurrWeekDays().endtime;
        // let starttime = getDate.getCurrWeekDays().starttime;
        // console.log("获取时间本周时间");
        // console.log(getDate.getCurrWeekDays());
        // console.log(starttime);

        // 下个月
        let endtime = getDate.getNextMonthDays().endtime
        let starttime = getDate.getNextMonthDays().starttime
        // console.log('获取时间下月时间')
        // console.log(getDate.getNextMonthDays())
        // console.log(starttime)

        this.enterpriseShowPeopleId = this.$route.query.enterpriseShowPeopleId
        this.userHeadUrl = this.$route.query.avatar
        // console.log('enterpriseShowPeopleId', this.enterpriseShowPeopleId)
        this.getUserInfo()
        this.initData()
        this.getDaysofMonth()
        // this.getStartEnd()
        // //日数据-貌似是本人当前天
        // Api.getTodayData(1).then(res=>{
        //   console.log('日信息'+res);
        //   if (res.code == 200) {

        //   }
        // })
    },
    methods: {
        getUserInfo () {
            // 获取人物信息
            Api.getUserInfo(this.enterpriseShowPeopleId).then((res) => {
                const { code, msg, data, total } = res
                console.log('人物信息', data)
                if (res.code == 200) {
                    this.userInfo = res.data
                    this.getWeekInfo() //获取周数据
                    // this.initData(null);
                }
            })
        },
        // 取消预约
        cancleOrder () {
            Api.interview(this.userPreInterviewDetailId, 0).then((res) => {
                // console.log('预约', res)
                if ((res.code = 200)) {
                    util.success('取消预约成功')
                    this.getUserInfo()
                }
            })
        },
        //
        // 预约
        toOrder () {
            let params = {
                userPreInterviewDetailId: this.userPreInterviewDetailId,
                type: 1,
            }
            let type = 1
            Api.interview(this.userPreInterviewDetailId, type).then((res) => {
                // console.log('预约', res)
                if (res.code == 200) {
                    this.getUserInfo()
                    this.$toast('预约成功')
                }
            })
        },
        //  选择时间
        check (index) {
            this.checkIndex = index
            this.status = this.todayData[index].interviewStatus
            this.userPreInterviewDetailId = this.todayData[
                index
            ].userPreInterviewDetailId
            console.log(
                'userPreInterviewDetailId:',
                this.userPreInterviewDetailId
            )
        },
        // 获取日数据
        getDayInfo () {
            Api.getTodayData(this.userPreInterviewId).then((res) => {
                if (res.code == 200 && res.data != '') {
                    this.todayData = res.data
                    // console.log('todayData', this.todayData)
                    this.userPreInterviewDetailId = this.todayData[0].userPreInterviewDetailId

                    // console.log('获取日数据', this.todayData)
                    for (var i = 0; i < this.todayData.length; i++) {
                        if (this.todayData[i].interviewStatus == 0) {
                            this.todayData[i].interviewStatus_1 = '不可预约'
                        } else if (this.todayData[i].interviewStatus == 1) {
                            this.todayData[i].interviewStatus_1 = '可预约'
                        } else if (this.todayData[i].interviewStatus == 2) {
                            this.todayData[i].interviewStatus_1 = '已预约'
                        } else if (this.todayData[i].interviewStatus == 3) {
                            this.todayData[i].interviewStatus_1 = '预约其他'
                        }
                    }
                }
            })
        },
        // 获取周数据
        getWeekInfo () {
            // console.log('enterpriseShowPeopleId', this.enterpriseShowPeopleId)

            // var date = new Date()
            // var year = this.currentYear
            // var month = this.currentMonth
            // month < 10 ? (month = '0' + month) : (month = month)
            // var week = this.currentWeek

            // var lastDate = new Date(year, month, 0).getDate() //获得是标准时间,需要getDate()获得天数
            // lastDate < 10 ? (lastDate = '0' + lastDate) : (lastDate = lastDate)

            // this.currentDay < 10
            //     ? (this.currentDay = '0' + this.currentDay)
            //     : (this.currentDay = this.currentDay)

            // let startDate = `${year}-${month}-${this.currentDay}`
            // let endDate = `${year}-${month}-${lastDate}`

            // console.log('endDate', endDate)
            // console.log('startDate', startDate)
            let startDate = this.userInfo.interviewStartDate
            let endDate = this.userInfo.interviewEndDate
            const params = {
                enterpriseShowPeopleId: this.enterpriseShowPeopleId,

                startDate: startDate,
                endDate: endDate,
            }
            Api.getWeekData(params)
                .then((res) => {
                    // console.log('获取周数据', res.data)
                    const statusList = res.data
                    console.log('获取周数据', statusList);
                    if (res.code == 200 && res.data != '') {
                        this.weekData = res.data

                        this.userPreInterviewId = this.weekData[0].userPreInterviewId
                        this.getDayInfo()
                    } else if (res.code == 200 && res.data == '') {
                        this.$toast('没有可预约时间')
                    }
                })
                .catch((err) => {
                    console.log('获取周数据失败', err)
                })
        },

        // 获取当月有多少天
        getDaysofMonth () {
            var date = new Date()
            var year = this.currentYear
            var month = this.currentMonth
            var week = this.currentWeek
            var date = this.currentDay
            // console.log('date', date)

            this.weekListShow = this.weekList
            var line = ''

            for (var i = 0; i < this.weekListShow.length; i++) {
                if (this.weekListShow[i].value == week) {
                    line = i
                }
            }

            var lastDay = new Date(year, month, 0).getDate() //获得是标准时间,需要getDate()获得天数

            let totalWeek = line + (lastDay - date + 1)
            this.weekListShow = this.weekListShow.slice(line, totalWeek)


            let currentData = this.currentDay


            for (var i = currentData; i <= lastDay; i++) {

                this.days.push({ name: i, showDate: true, interviewStatus: 0 })
                i < 10 ? i = '0' + i : i
                let today = `${this.currentYear}-${this.currentMonth}-${i}`
                console.log('today:', today);
                for (var j = 0; j < this.weekData.length; j++) {
                    if (today == this.weekData[j].dateOfMonth) {
                        console.log('i', i);
                        console.log('j', j);
                        this.days[i - 1].interviewStatus = this.weekData[j].interviewStatus
                    }
                }
                // console.log('days', this.days);

                // this.days.push({ name: i, showDate: true, interviewStatus: interviewStatus })
            }
            // console.log(this.days[0]);
            // console.log(this.weekData);
            // 判断是否在展会时间段内，在，显示，不在，不显示  charAt
            // let strWeek = this.weekData[0].dateOfMonth
            // let strMounth = strWeek.substr(5, 2)
            // let strDate = strWeek.substr(8, 2)
            // let endWeek = this.weekData[this.weekData.length - 1].dateOfMonth
            // let endWeekDateDate = endWeek.substr(8, 2)
            // console.log('strMounth:', strMounth)
            // console.log('strDate:', strDate)
            // console.log('endWeekDateDate:', endWeekDateDate)

            // for (var i = 1; i <= this.days.length; i++) {
            //     if (
            //         (month = strMounth && i >= strDate && i <= endWeekDateDate)
            //     ) {
            //         this.days[i].showDate = true
            //     }
            // }
            // console.log('this.days:', this.days)
        },
        formatDate (year, month, day) {
            const y = year
            let m = month
            if (m < 10) m = `0${m}`
            let d = day
            if (d < 10) d = `0${d}`
            return `${y}-${m}-${d}`
        },
        // 初始化
        initData (cur) {
            let date = ''
            if (cur) {
                date = new Date(cur)
            } else {
                date = new Date()
            }
            this.currentDay = date.getDate() // 今日日期 几号

            this.currentYear = date.getFullYear() // 当前年份
            this.currentMonth = date.getMonth() + 1 // 当前月份
            this.currentMonth < 10 ? this.currentMonth = '0' + this.currentMonth : this.currentMonth
            this.startDate = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`
            this.endDate = `${this.currentYear}-${this.currentMonth}-${
                this.currentDay + 31
                }`
            this.currentWeek = date.getDay() // 1...6,0  // 星期几
            // console.log('currentWeek',this.currentWeek);
            if (this.currentWeek === 0) {
                this.currentWeek = 7
            }
            const str = this.formatDate(
                this.currentYear,
                this.currentMonth,
                this.currentDay
            )

            this.days.length = 0
        },

        // 上个星期
        weekPre () {
            const d = this.days[0] // 如果当期日期是7号或者小于7号
            d.setDate(d.getDate() - 7)
            this.initData(d)
        },

        // 下个星期
        weekNext () {
            const d = this.days[6] // 如果当期日期是7号或者小于7号
            d.setDate(d.getDate() + 7)
            this.initData(d)
        },

        // 上一個月  传入当前年份和月份
        pickPre (year, month) {
            const d = new Date(
                this.formatDate(this.currentYear, this.currentMonth, 1)
            )
            // console.log('d:', d)
            d.setDate(0)
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
            this.getDaysofMonth()
            this.getWeekInfo()
        },

        pickNext () {
            const d = new Date(
                this.formatDate(this.currentYear, this.currentMonth, 1)
            )
            // console.log(d);
            d.setDate(35)
            this.initData(this.formatDate(d.getFullYear(), d.getMonth() + 1, 1))
            this.getDaysofMonth()
            this.getWeekInfo()
        },

        // 当前选择日期
        pick (date, index) {
            // console.log('picker-index', index)
            // console.log('picker-date', date)
            this.current = index
            let checkData =
                this.currentYear + '-' + this.currentMonth + '-' + date
            // console.log('checkData', checkData)
            // console.log(this.weekData[index])
            // console.log(this.weekData)
            const canBooking = [] //把可预约的日期放进一个数组，截取日期几号进行判断
            for (var value of this.weekData) {
                canBooking.push(value.dateOfMonth.substr(8, 10))

            }
            // console.log(this.canBooking);
            if (canBooking.map(Number).includes(date)) {
                var dateindex = canBooking
                    .map(Number)
                    .findIndex((val, index) => {
                        return val == date
                    })

                this.userPreInterviewId = this.weekData[
                    dateindex
                ].userPreInterviewId
                this.getDayInfo()
                this.showDate = true
            } else {
                this.showDate = false
                util.error('暂无数据')
            }
        },
        onConfirm (value) {
            this.value1 = value
            this.showPicker = false
        },
        onRefresh () {
            setTimeout(() => {
                this.isLoading = false
                this.getWeekInfo()
                // console.log('刷新')
            }, 1000)
        },
    },
}
</script>
<style lang='scss' scoped>
.appointment_calendar {
    background-color: #fff;
    height: 100vh;
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
            // display: flex;
            // flex-wrap: wrap;
            // justify-content: space-around;
            // align-items: center;
            margin: 0.44rem auto 0;
            width: 6.96rem;
            height: 6.02rem;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
            border-radius: 0.1rem;
            // padding: 0.34rem  0.26rem;
            .item {
                float: left;
                text-align: center;
                // flex: 25%;
                width: 1.48rem;
                height: 0.94rem;
                border-radius: 0.1rem;
                border: 0.02rem solid rgba(248, 213, 126, 1);
                font-size: 0.26rem;
                margin: 0.12rem;
                .item_top {
                    color: #313437;
                }
                .item_bottom {
                    color: #9da1a6;
                }
            }
            .checkActive {
                float: left;
                text-align: center;
                // flex: 25%;
                width: 1.48rem;
                height: 0.94rem;
                border-radius: 0.1rem;
                border: 0.02rem solid rgba(248, 213, 126, 1);
                font-size: 0.26rem;
                margin: 0.12rem;
                background: #f8d57e;
                .item_top {
                    color: #313437;
                }
                .item_bottom {
                    color: #9da1a6;
                }
            }
            .date_content:nth-child(4) {
                margin: 0;
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
        // width: 100%;
        // height: 0.87rem;
        // overflow-x: scroll;
        // overflow-y: hidden;
        // white-space: nowrap;
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
            .status {
                font-size: 12px;
                color: #999;
                line-height: 1;
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