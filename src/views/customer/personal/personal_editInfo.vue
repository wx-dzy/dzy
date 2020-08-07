// 编辑个人信息
<template>
    <div class="personal_editInfo">
        <router-view />
        <div class="fromList">
            <van-form @submit="saveInfo">
                <div class="top">
                    <van-field name="avatar" label="头像" @click="getPJ">
                        <template #input>
                            <img :src="avatar" />
                            <!-- <img :src="userInfo.avatar" /> -->
                            <van-icon name="arrow" />
                            <!-- <van-uploader v-model="uploader" />
                            <van-icon class="photo" name="arrow" />-->
                        </template>
                    </van-field>
                    <van-field
                        label="真实姓名"
                        placeholder="请输入您的姓名"
                        v-model="userInfo.realName"
                        name="realName"
                        v-if="userInfo.realName"
                    />
                    <van-field name="sex" label="性别">
                        <template #input>
                            <van-radio-group v-model="userInfo.sex" direction="horizontal">
                                <van-radio name="男">男</van-radio>
                                <van-radio name="女">女</van-radio>
                            </van-radio-group>
                        </template>
                    </van-field>
                    <van-field
                        readonly
                        label="出生日期"
                        placeholder="请输入您的出生日期"
                        v-model="userInfo.birthday"
                        name="birthday"
                        @click="showCalendar = true"
                    />
                    <van-calendar
                        v-model="showCalendar"
                        @confirm="onConfirm"
                        :min-date="minDate"
                        :max-date="maxDate"
                        color="rgba(248, 213, 126, 1)"
                    />
                    <van-field
                        type="tel"
                        label="联系电话"
                        placeholder="请输入电话号码"
                        v-model="userInfo.mobile"
                        name="contactPhone"
                        maxlength="11"
                        :rules="[{ pattern, message: '请输入正确手机号' }]"
                    />
                    <van-field
                        type="model_tel"
                        label="绑定电话"
                        placeholder="请输入电话号码"
                        v-model="userInfo.contactPhone"
                        name="mobile"
                    />
                    <!-- <van-field
                        type="model_tel"
                        label="验证码"
                        placeholder="请输入验证码"
                        v-model="userInfo.contactPhone"
                        name="verifyCode"
                    />-->
                </div>
                <!-- 工作经历 -->
                <div class="history">
                    <div class="title">
                        <div class="text">工作经历</div>
                        <div class="add" @click="gotoEditCardNew">
                            <van-icon name="plus" />新增
                        </div>
                    </div>
                    <div class="itemBox">
                        <div
                            class="item"
                            v-for="(item,index) in workingList"
                            :key="index"
                            @click="gotoEditCard(item.id,$event)"
                        >
                            <div class="image">
                                <img src alt />
                            </div>
                            <div class="middle">
                                <div class="middleTop">
                                    <span class="position">{{item.postName}}</span>
                                    <span class="status">{{item.onJob == '1'?'在职':'离职'}}</span>
                                </div>
                                <div class="companyName">{{item.enterpriseName}}</div>
                                <div class="date">
                                    <span class="begin">{{item.startDate}}</span>-
                                    <span class="over">{{item.endDate}}</span>
                                </div>
                                <div class="working">{{item.workDesc}}</div>
                            </div>
                            <div class="right">
                                <van-icon name="arrow" />
                            </div>
                        </div>
                    </div>
                </div>

                <van-button class="submit" native-type="submit">保存</van-button>
            </van-form>
        </div>
    </div>
</template>
\
<script>
import { util } from '@/utils'
import { mapGetters } from 'vuex'
import * as Api from '@/api/customer/personal'
import visitingCard from '@/components/customer/visitingCard.vue'
import wx from 'weixin-js-sdk'

export default {
    name: 'personal_editInfo',
    components: {
        // 名片
        visitingCard,
    },
    data() {
        return {
            workingList: [
                // {
                //     // imgUrl:require(""),
                //     position: '销售经理',
                //     status: '在职',
                //     companyName: '好招数创（北京）科技有限公司',
                //     dateBegin: '2018.02',
                //     dateOver: '至今',
                //     working: '负责系统选型，等销售工作…',
                // },
                // {
                //     // imgUrl:require(""),
                //     position: '销售经理',
                //     status: '离职',
                //     companyName: '好招数创（北京）科技有限公司',
                //     dateBegin: '2016.02',
                //     dateOver: '2018.01',
                //     working: '负责系统选型，等销售工作…',
                // },
                // {
                //     // imgUrl:require(""),
                //     position: '销售经理',
                //     status: '离职',
                //     companyName: '好招数创（北京）科技有限公司',
                //     dateBegin: '2016.02',
                //     dateOver: '2018.01',
                //     working: '负责系统选型，等销售工作…',
                // },
            ],
            radio: '1',
            uploader: [
                {
                    url:
                        'http://www.mfqqx.com/d/file/2011/07/65e6653c443b38b3c01515314bd296f9.jpg',
                },
            ],

            detail: {
                infoImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
                name: 'xiaogang0-0',
                status: 1,
                activeInfo: '参观房',
            },
            pageSize: 10,
            pageNum: 1,
            userInfo: {
                avatar: '', // 头像
                mobile: '', // 联系电话
            },
            avatar: '', // 头像
            serverId: '', // 上传头像id
            showCalendar: false, //选择出生日期时间控件
            minDate: new Date(1900, 0, 1), // 可选择的最小日期
            maxDate: new Date(), // 可选择的最大日期
            pattern: /^1[3456789]\d{9}$/, // 正则校验手机号
        }
    },
    created() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.getInfo()
    },
    watch: {},
    methods: {
        onConfirm(date) {
            //出生日期
            console.log('data', date)
            // this.startDate = `${date.getFullYear()}-${
            //     date.getMonth() + 1
            // }-${date.getDate()}`
            this.userInfo.birthday =
                date.getFullYear() +
                '-' +
                (date.getMonth() + 1) +
                '-' +
                date.getDate()
            console.log('userInfo.birthday', this.userInfo.birthday)
            this.showCalendar = false
        },
        getPJ() {
            let _this = this
            let params = {
                url: window.location.href,
            }
            console.log('params', params)
            Api.getAppId(params)
                .then((res) => {
                    console.log('获取appid', res)
                    const { code, data, msg, total } = res
                    console.log('appid', data.appId)
                    if (code == 200) {
                        wx.config({
                            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                            appId: data.appId, // 必填，公众号的唯一标识
                            timestamp: data.timestamp, // 必填，生成签名的时间戳
                            nonceStr: data.nonceStr, // 必填，生成签名的随机串
                            signature: data.signature, // 必填，签名
                            jsApiList: [
                                'chooseImage',
                                'uploadImage',
                                'downloadImage',
                                'getLocalImgData',
                            ], // 必填，需要使用的JS接口列表
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
        // 上传头像
        uploadImg() {
            console.log('11111')
            let _this = this
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // console.log('选择图片', res)
                    var localIds = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    this.avatar = localIds
                    wx.uploadImage({
                        localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            // console.log('上传图片', res)
                            // var serverId = res.serverId 返回图片的服务器端ID
                            _this.serverId = res.serverId
                        },
                    })
                    // wx.getLocalImgData({
                    //     localId: localIds, // 图片的localID
                    //     success: function (res) {
                    //         console.log('getLocalImgData', res)
                    //         var localData = res.localData // localData是图片的base64数据，可以用img标签显示
                    //         _this.avatar = localData
                    //     },
                    // })
                },
            })
        },
        // 保存
        saveInfo(info) {
            // info.sex == 1 ? (info.sex = '男') : (info.sex = '女')
            info.id = this.userInfo.id
            info.avatar = this.serverId
            console.log('保存个人信息', info)
            Api.saveUserInfo(info).then((res) => {
                console.log('保存成功', res)
                this.$router.push({
                    name: 'personal',
                })
            })
        },
        // 获取个人信息
        getInfo() {
            let _this = this
            Api.getUserInfo().then((res) => {
                console.log('获取个人信息', res)
                let { code, msg, data, total } = res
                if (code == 200) {
                    this.userInfo = data
                    this.workingList = data.workList
                    this.avatar = data.avatar
                    // wx.downloadImage({
                    //     serverId: data.avatar, // 需要下载的图片的服务器端ID，由uploadImage接口获得
                    //     isShowProgressTips: 1, // 默认为1，显示进度提示
                    //     success: function (res) {
                    //         console.log('downloadImage', res)
                    //         var localIds = res.localId // 返回图片下载后的本地ID
                    //         // console.log('11111111')
                    //         _this.avatar = res.localId
                    //         wx.getLocalImgData({
                    //             localId:
                    //                 'wxLocalResource://1237378768e7q8e7r8qwe', // 图片的localID
                    //             success: function (res) {
                    //                 console.log('getLocalImgData', res)
                    //                 var localData = res.localData // localData是图片的base64数据，可以用img标签显示
                    //                 _this.avatar = localData
                    //             },
                    //         })
                    //     },
                    // })
                    // this.workingList = data.workList
                }
            })
        },

        gotoEditCardNew() {
            this.$router.push({
                name: 'personal_editCard',
            })
        },
        gotoEditCard(id) {
            console.log('卡片id', id)
            let cardId = ''
            id ? (cardId = id) : (cardId = '')
            this.$router.push({
                name: 'personal_editCard',
                query: {
                    id: cardId,
                },
            })
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
.personal_editInfo {
    width: 7.5rem;
    background-color: #f7f8fa;
    .fromList {
        .top {
            margin-top: 0.2rem;
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
            }
        }
        .history {
            .title {
                height: 1.36rem;
                line-height: 1.36rem;
                color: #313437;
                display: flex;
                margin: 0 0.34rem 0.28rem;
                font-weight: bold;
                .text {
                    width: 5rem;
                    font-size: 0.32rem;
                }
                .add {
                    float: right;
                    margin: auto 0;
                    width: 1.84rem;
                    height: 0.48rem;
                    line-height: 0.48rem;
                    background: rgba(248, 213, 126, 1);
                    border-radius: 0.24rem;
                    font-size: 0.24rem;
                    line-height: 0.48rem;
                    text-align: center;
                }
            }
            .itemBox {
                // padding: 0 0.5rem 0.44rem;

                // background:rgba(255,255,255,1);
                .item {
                    width: 7.5rem;
                    height: 2.2rem;
                    display: flex;
                    padding: 0 0.5rem 0.44rem;
                    box-sizing: border-box;
                    background: rgba(255, 255, 255, 1);
                    margin-bottom: 0.12rem;
                    .image {
                        margin-top: 0.4rem;
                        width: 1.4rem;
                        height: 1.4rem;
                        border: 0.02rem solid rgba(233, 233, 233, 1);
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .middle {
                        margin-top: 0.26rem;
                        margin-left: 0.36rem;
                        .middleTop {
                            span {
                                display: inline-block;
                            }
                            .position {
                                font-size: 0.28rem;
                                font-weight: bold;
                            }
                            .status {
                                width: 0.8rem;
                                height: 0.32rem;
                                background: rgba(248, 213, 126, 1);
                                border-radius: 0.08rem;
                                font-size: 0.2rem;
                                text-align: center;
                                line-height: 0.32rem;
                                margin-left: 0.1rem;
                            }
                        }
                        .companyName {
                            font-size: 0.28rem;
                            font-weight: bold;
                        }
                        .date,
                        .working {
                            font-size: 0.24rem;
                            color: #9da1a6;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                    .right {
                        margin-left: 0.28rem;
                        .van-icon {
                            line-height: 2.2rem;
                            color: #9da1a6;
                        }
                    }
                }
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
    /deep/ .van-cell {
        height: 1.12rem;
        line-height: 1.12rem;
        padding: 0px 0.34rem;
    }
    /deep/ .van-radio-group--horizontal {
        // margin: auto 0;
        margin-top: 0.35rem;
    }
}
</style>

