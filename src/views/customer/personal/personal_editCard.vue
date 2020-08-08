<template>
    <!-- 编辑名片 -->
    <div class="personal_editCard">
        <router-view />
        <div class="box">
            <van-form @submit="saveCard">
                <van-field label="上传LOGO" @click="getPJ">
                    <template #input>
                        <img :src="companyLogo" />
                        <van-icon name="arrow" />
                    </template>
                </van-field>
                <!-- 公司/单位 -->
                <!-- <div class="Company"> -->
                <div class="title">
                    <span>公司/单位</span>
                    <span class="authentication" @click="gotoAuthentication">去认证</span>
                </div>
                <van-field
                    v-model="cardInfo.enterpriseName"
                    name="enterpriseName"
                    label="公司名称"
                    required
                    maxlength="40"
                    placeholder="请输入中文公司/单位名称"
                />
                <van-field
                    v-model="cardInfo.enterpriseNameEn"
                    name="enterpriseNameEn"
                    label="公司名称EN"
                    maxlength="80"
                    placeholder="请输入英文公司/单位名称"
                />
                <!-- </div> -->
                <!-- 姓名 -->
                <!-- <div class="name"> -->
                <div class="title">
                    <span>姓名</span>
                </div>
                <van-field
                    v-model="cardInfo.userRealName"
                    name="userRealName"
                    label="姓名"
                    required
                    placeholder="请输入中文名（必填）"
                    :rules="[{ required: true, message: '请输入中文名（必填）' }]"
                />
                <van-field
                    required
                    v-model="cardInfo.userRealNameEn"
                    name="userRealNameEn"
                    label="姓名EN"
                    maxlength="40"
                    placeholder="Patter"
                />
                <!-- </div> -->
                <!-- 职位/岗位 -->
                <!-- <div class="position"> -->
                <div class="title">
                    <span>职位/岗位</span>
                </div>
                <van-field
                    v-model="cardInfo.postName"
                    name="postName"
                    label="职位"
                    required
                    maxlength="20"
                    placeholder="请输入中文公司/单位名称"
                    :rules="[{ required: true, message: '请输入中文公司/单位名称' }]"
                />
                <van-field
                    v-model="cardInfo.postNameEn"
                    name="postNameEn"
                    label="职位EN"
                    required
                    placeholder="请输入英文公司/单位名称"
                    :rules="[{ required: true, message: '请输入英文文公司/单位名称' }]"
                />
                <!-- </div> -->
                <!-- 在职时间 -->
                <!-- <div class="time"> -->
                <div class="title">
                    <span>在职时间</span>
                    <span class="notes">（注：结束时间如果选择“至今”）</span>
                </div>
                <van-field
                    readonly
                    v-model="startDate"
                    name="startDate"
                    label="开始时间"
                    placeholder="请输入开始时间"
                    :rules="[{ required: true, message: '请输入开始时间' }]"
                    @click="showCalendar = true"
                />
                <!-- <van-calendar
                    v-model="showCalendar"
                    @confirm="onConfirm"
                    :min-date="minDate"
                    :max-date="maxDate"
                />-->
                <van-popup v-model="showCalendar" position="bottom" :style="{ height: '35%' }">
                    <van-datetime-picker
                        type="year-month"
                        title="选择年月"
                        @confirm="onConfirm"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :formatter="formatter"
                    />
                </van-popup>

                <van-field
                    readonly
                    v-model="endDate"
                    name="endDate"
                    label="结束时间"
                    placeholder="请输入结束时间"
                    @click="showCalendarEnd = true"
                />
                <!-- <van-calendar
                    v-model="showCalendarEnd"
                    @confirm="onConfirmEnd"
                    :min-date="minDate"
                    :max-date="maxDate"
                />-->

                <van-popup v-model="showCalendarEnd" position="bottom" :style="{ height: '35%' }">
                    <van-datetime-picker
                        type="date"
                        title="选择年月日"
                        @confirm="onConfirmEnd"
                        :min-date="minDate"
                        :max-date="maxDate"
                        :formatter="formatter"
                    />
                </van-popup>
                <!-- </div> -->
                <!-- 联系方式 -->
                <!-- <div class="position"> -->
                <div class="title">
                    <span>联系方式</span>
                </div>
                <van-field
                    name="phone"
                    v-model="cardInfo.phone"
                    required
                    label="电话号码"
                    placeholder="请输入电话号码"
                    :rules="[{ pattern, message: '请输入正确手机号' }]"
                    maxlength="11"
                />
                <van-field
                    v-model="cardInfo.email"
                    name="email"
                    required
                    label="邮箱地址"
                    placeholder="请输入邮箱地址"
                    :rules="[{ pattern_email, message: '请输入邮箱地址' }]"
                />
                <!-- </div> -->
                <!-- 公司所属行业 -->
                <!-- <div class="industry"> -->
                <div class="title">
                    <span>公司所属行业</span>
                </div>
                <van-field
                    v-model="cardInfo.industry"
                    label="行业"
                    placeholder="请输入中文名(必填)"
                    name="industry"
                />
                <van-field
                    v-model="cardInfo.industryEn"
                    name="industryEn"
                    label="行业EN"
                    placeholder="请输入英文名"
                />
                <!-- </div> -->
                <!-- 公司地址 -->
                <!-- <div class="industry"> -->
                <div class="title">
                    <span>公司地址</span>
                </div>
                <van-field
                    name="address"
                    v-model="address"
                    label="省市区"
                    placeholder="请选择省市区"
                    @click="chooseAdd"
                    readonly
                />
                <van-field
                    v-model="cardInfo.companyAddress"
                    label="详细地址"
                    placeholder="请输入详细地址"
                    name="companyAddress"
                />
                <van-field
                    v-model="cardInfo.companyAddressEn"
                    label="地址EN"
                    placeholder="请输入英文版地址"
                    name="companyAddressEn"
                />
                <van-action-sheet v-model="chooseAds" title>
                    <div class="content">
                        <van-area
                            title="请选择省市区"
                            :area-list="addressList"
                            class="chooseAdd"
                            @confirm="confirmAdd"
                            @cancel="cancelAdd"
                        />
                    </div>
                </van-action-sheet>
                <!-- </div> -->
                <!-- 工作描述1 -->
                <!-- <div class="describe_1"> -->
                <div class="title">
                    <span>工作描述1</span>
                </div>
                <van-field v-model="cardInfo.workDesc" placeholder name="workDesc">
                    <template #button>
                        <i size="small" type="default">...</i>
                    </template>
                </van-field>
                <!-- </div> -->
                <!-- 工作描述2 -->
                <!-- <div class="describe_1"> -->
                <!-- <div class="title">
                    <span>工作描述2</span>
                </div>
                <van-field v-model="describe_2" name="describe_2" placeholder>
                    <template #button>
                        <i size="small" type="default">...</i>
                    </template>
                </van-field>-->
                <!-- </div> -->
                <van-button type="info" native-type="submit" class="submit">保存</van-button>
            </van-form>
        </div>
    </div>
</template>
</script>
    <script>
import { util } from '@/utils'
import { mapGetters } from 'vuex'
import * as Api from '@/api/customer/personal'
import visitingCard from '@/components/customer/visitingCard.vue'
import AddressList from '@/assets/js/area'
import wx from 'weixin-js-sdk'
import { log } from 'pili-rtc-web'

export default {
    name: 'personal_editCard',
    components: {
        // 名片
        visitingCard,
    },
    data() {
        return {
            value1: 'Patter',
            // uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
            username: '',
            detail: {
                infoImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
                name: 'xiaogang0-0',
                status: 1,
                activeInfo: '参观房',
            },
            cardInfo: {},
            phone: '',
            pageSize: 10,
            pageNum: 1,
            // enterpriseName: '', // 公司名称
            // industry: '', // 公司所属行业
            // industry_en: '', // 公司所属行业英文
            chooseAds: false, // 是否显示选择地址
            addressList: AddressList, // 地址列表
            address: '', //地址
            addressDetail: '', //详细地址
            addressDetail_en: '', // 英文详细地址
            // describe_1: '负责系统维护工作…', // 工作描述1
            // describe_2: '负责系统维护工作…', // 工作描述2
            id: '', // 卡片id
            provinceId: '', // 省id
            provinceName: '', // 省名称
            cityId: '', // 市id
            cityName: '', // 市名称
            showCalendar: false, //选择日期日历
            showCalendarEnd: false, //选择日期日历
            startDate: '', // 开始日期
            endDate: '', // 开始日期
            minDate: new Date(2000, 0, 1), // 可选择的最小日期
            maxDate: new Date(), // 可选择的最大日期
            companyLogo: '', // 公司logo
            serverId: '', // 上传的logo  ID
            pattern: /^1[3456789]\d{9}$/, // 正则校验手机号
            pattern_email: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/,
        }
    },

    created() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.id = this.$route.query.id
        // console.log('this.id', this.id)
        if (this.id) {
            this.getCard()
        }
    },
    watch: {},
    methods: {
        formatter(type, val) {
            if (type === 'year') {
                return `${val}年`
            } else if (type === 'month') {
                return `${val}月`
            }
            return val
        },
        getPJ() {
            let _this = this
            let url = window.location.href
            let params = {
                url: url,
            }
            Api.getAppId(params)
                .then((res) => {
                    console.log('获取appid', res)
                    const { code, data, msg, total } = res
                    if (code == 200) {
                        wx.config({
                            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.appId, // 必填，公众号的唯一标识
                            timestamp: data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                            signature: data.signature, // 必填，签名
                            jsApiList: ['chooseImage', 'uploadImage'], // 必填，需要使用的JS接口列表
                        })
                        wx.ready(function () {
                            console.log('config成功') // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
                            _this.uploadImg()
                        })
                        wx.error(function (res) {
                            console.log('config失败', res) // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
                        })
                    } else {
                        _this.$toast('获取签名失败')
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                })
        },
        // 上传图片
        uploadImg() {
            let _this = this
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    console.log('选择图片', res)
                    var localIds = res.localIds // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    _this.companyLogo = localIds
                    console.log('companyLogo', _this.companyLogo)
                    wx.uploadImage({
                        localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            // console.log('上传图片', res)
                            // var serverId = res.serverId 返回图片的服务器端ID
                            _this.serverId = res.serverId
                        },
                    })
                },
            })
        },
        // 选择日期

        onConfirmEnd(picker) {
            // 结束日期
            console.log('picker', picker)
            // this.endDate = `${date.getFullYear()}-${
            //     date.getMonth() + 1
            // }-${date.getDate()}`
            let month = picker.getMonth() + 1
            let date = picker.getDate()
            month < 10 ? (month = '0' + month) : (month = month)
            date < 10 ? (date = '0' + date) : (date = date)
            this.endDate = picker.getFullYear() + '-' + month + '-' + month
            console.log('endDate', this.endDate)
            this.showCalendarEnd = false
        },
        onConfirm(picker) {
            //开始日期
            console.log('picker', picker)
            // this.startDate = `${date.getFullYear()}-${
            //     date.getMonth() + 1
            // }-${date.getDate()}`
            let month = picker.getMonth() + 1
            month < 10 ? (month = '0' + month) : (month = month)
            this.startDate = picker.getFullYear() + '-' + month
            console.log('startDate', this.startDate)
            this.showCalendar = false
        },
        // 保存
        saveCard(cardInfo) {
            // cardInfo.companyLogo = 'sfsdf'
            cardInfo.id = this.id
            cardInfo.cardUrl = localStorage.getItem('cardUrl')
                ? localStorage.getItem('cardUrl')
                : ''

            // cardInfo.cardUrl = '222222'
            cardInfo.provinceId = this.provinceId
            cardInfo.provinceName = this.provinceName
            cardInfo.cityId = this.cityId
            cardInfo.cityName = this.cityName
            cardInfo.companyLogo = this.serverId
            cardInfo.companyLogo = '1111'
            delete cardInfo.address
            delete cardInfo.undefined
            // cardInfo = JSON.stringify(cardInfo)
            console.log('保存名片', cardInfo)

            Api.editCardSave(cardInfo).then((res) => {
                console.log('保存', res)
                if (res.code == 200) {
                    this.$router.push({
                        name: 'personal_editInfo',
                    })
                }
            })
        },
        // 获取名片信息
        getCard() {
            let params = this.id
            console.log('cardid', this.id)
            if (this.id) {
                Api.editCardGetEdit(params).then((res) => {
                    console.log('获取名片信息-编辑', res)
                    if (res.code == 200) {
                        this.cardInfo = res.data
                        this.startDate = this.cardInfo.startDate
                        this.endDate = this.cardInfo.endDate
                    }
                })
            } else {
                Api.editCardGet().then((res) => {
                    console.log('获取名片信息-新增', res)
                    if (res.code == 200) {
                        this.cardInfo = res.data
                    }
                })
            }
        },
        // 去认证
        gotoAuthentication() {
            this.$router.push({
                name: 'personal_attestation',
            })
        },
        // 选择省市区点击取消按钮
        cancelAdd() {
            this.chooseAds = false
        },
        // 选择省市区点击确认按钮
        confirmAdd(e) {
            console.log('confirmAdd', e)
            this.address = e[0].name + ' ' + e[1].name + ' ' + e[2].name
            this.provinceId = e[0].code
            this.provinceName = e[0].name
            this.cityId = e[1].code
            this.cityName = e[1].name
            this.chooseAds = false
        },
        // 选择省市区
        chooseAdd() {
            console.log('123')
            this.chooseAds = true
        },
        onsubmt() {
            Api.getHomePage(params)
                .then((res) => {
                    let { code, msg, data, total } = res
                    // 加载状态结束
                    this.loading = false
                    if (code == 200) {
                    }
                })
                .catch((err) => {
                    console.log(err, 'err')
                })
        },

        handleSetInfo(row) {
            this.$router.push({
                name: 'personal_details',
                query: {
                    id: row.enterpriseId,
                },
            })
        },

        // 查看详情
        handleLook(row) {
            this.$router.push({
                name: 'personal_details',
                query: {
                    // 企业id
                    id: row.enterpriseId,
                    // title: row.enterpriseName
                },
            })
        },
    },

    computed: {},

    mounted() {
        this.$nextTick().then(() => {
            setTimeout(() => {
                window.scrollTo(0, 0)
            }, 0)
        })
    },
}
</script>

    <style lang="scss" scoped>
@import '@/assets/styles/base/calc_vm.scss';
@import './personal.scss';
.nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
}
.personal_editCard {
    background: #f7f8faff;
    .box {
        .van-field {
            width: 7.5rem;
            height: 1.12rem;
            // line-height: 1.12rem;
            font-size: 0.32rem;
            color: #313437;
            img {
                margin: auto 0;
                width: 0.96rem;
                height: 0.96rem;
                border-radius: 50%;
                margin-left: 3rem;
                margin-right: 0.3rem;
            }
            i {
                color: #000 !important;
                padding: 0.1rem 0.4rem 0.1rem 0.4rem;
                background: #e9e9e9ff;
                font-weight: 700;
                border-radius: 10.5px;
            }
        }
        .title {
            padding: 0.2rem;
            color: #888888ff;
            .authentication {
                float: right;
                background: #f8d57e;
                padding: 0.05rem 0.1rem;
                border-radius: 0.05rem;
                color: #000;
            }
        }
        .submit {
            height: 0.8rem;
            width: 6.84rem;
            line-height: 0.8rem;
            text-align: center;
            margin: 0.52rem 0.34rem;
            background: rgba(248, 213, 126, 1);
            letter-spacing: 0.2rem;
            border-radius: 0.08rem;
        }
    }
}
/deep/ .van-cell {
    height: 1.12rem;
    line-height: 1.12rem;
    padding: 0px 0.34rem;
}
// 必选项位置
// /deep/ .van-cell--required::before {

// }
/deep/ .van-button--round {
    width: 6.84rem;
    margin: 0.8rem 0;
}
/deep/ .van-button--info {
    color: #313437;
    background-color: #f8d57e;
    border: 1px solid #f8d57e;
}
</style>

