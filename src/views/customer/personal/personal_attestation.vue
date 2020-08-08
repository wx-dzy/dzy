// 职业身份认证
<template>
    <div class="personal_attestation">
        <router-view />
        <div class="top">
            <div class="top_title">
                请上传名片证明您的职业经历，
                <span style="color:#FA6400;">待人工审核</span>
            </div>
            <div class="push">
                <!-- <div class="image">
            <img :src="imgUrl_before" alt />
                </div>-->
                <!-- <van-field name="uploader">
                    <template #input>
                        <van-uploader v-model="uploader" />
                        <span class="upload" style="font-size:0.28rem;">上传名片</span>
                    </template>
                </van-field>-->
                <div class="upedImg" v-show="upedImg">
                    <img :src="upedImg" alt />
                </div>
                <div class="upImg" @click="getPJ">
                    <div class="add">+</div>
                    <div class="addName">上传名片</div>
                </div>
            </div>
        </div>
        <!-- 认证状态 -->
        <div class="attestation">
            <div class="itemBox" v-for="(item,index) in attestationList" :key="index">
                <div class="leftImg">
                    <img :src="item.companyLogo" alt />
                </div>
                <div class="rightText">
                    <div class="title">{{item.enterpriseName}}</div>
                    <div class="status">{{item.authStatus == 1?'已认证':'未认证'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { util } from '@/utils'
import { mapGetters } from 'vuex'
import * as Api from '@/api/customer/personal'
import visitingCard from '@/components/customer/visitingCard.vue'
import wx from 'weixin-js-sdk'

export default {
    name: 'personal_attestation',
    components: {
        // 名片
        visitingCard,
    },
    data() {
        return {
            attestationList: [
                {
                    // imgUrl: require('@/assets/images/myOrderBg1.png'),
                    // title: '好招数创（北京）科技有限公司',
                    // status: '企业超级管理员已认证',
                },
                {
                    // imgUrl: require('@/assets/images/myOrderBg1.png'),
                    // title: '好招数创（北京）科技有限公司',
                    // status: '企业超级管理员失败',
                },
            ],
            uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
            detail: {
                infoImg: 'https://img.yzcdn.cn/vant/cat.jpeg',
                name: 'xiaogang0-0',
                status: 1,
                activeInfo: '参观方',
            },
            pageSize: 10,
            pageNum: 1,
            upedImg: '', //上传的名片
            cardUrl: '',
        }
    },

    created() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.getDetails()
    },
    watch: {},
    methods: {
        getPJ() {
            let _this = this
            let url = encodeURI(window.location.href)
            console.log('url:', url)
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
                        this.$toast('获取签名失败')
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                })
        },
        // 上传头像
        uploadImg() {
            console.log('11111111111')
            let _this = this
            wx.chooseImage({
                count: 1, // 默认9
                sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                success: function (res) {
                    // console.log('选择图片', res)
                    var localIds = res.localIds[0] // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                    _this.upedImg = localIds
                    wx.uploadImage({
                        localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
                        isShowProgressTips: 1, // 默认为1，显示进度提示
                        success: function (res) {
                            // console.log('上传图片', res)
                            // var serverId = res.serverId 返回图片的服务器端ID
                            _this.cardUrl = res.serverId
                            localStorage.setItem('cardUrl', res.serverId)
                        },
                    })
                    // wx.getLocalImgData({
                    //     localId: localIds, // 图片的localID
                    //     success: function (res) {
                    //         console.log('getLocalImgData', res)
                    //         var localData = res.localData // localData是图片的base64数据，可以用img标签显示
                    //         _this.upedImg = localData
                    //     },
                    // })
                },
            })
        },
        // 获取列表
        getDetails() {
            Api.CardUrl().then((res) => {
                console.log('获取列表:', res)
                let { code, data, msg, total } = res
                if (code == 200) {
                    this.attestationList = data
                }
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
        document.body.style.backgroundColor = '#eeeeee'
    },
}
</script>

<style lang="scss" scoped>
// @import "@/assets/styles/base/calc_vm.scss";
// @import "./personal.scss";
.nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
}
.personal_attestation {
    background-color: #eee;
    padding-top: 0.24rem;
    .top {
        padding-top: 0.42rem;
        background-color: #fff;
        .top_title {
            padding-left: 0.6rem;
            font-size: 0.28rem;
            color: rgba(0, 0, 0, 0.9);
            line-height: 0.4rem;
            box-sizing: border-box;
        }
        .push {
            padding: 0.1rem;
            .upImg {
                display: inline-block;
                width: 1.42rem;
                height: 1.42rem;
                border: 1px dashed rgba(0, 0, 0, 0.15);
                margin-left: 0.4rem;
                text-align: center;
                .add {
                    color: rgba(0, 0, 0, 0.45);
                    margin-top: 0.2rem;
                    font-weight: 700;
                }
                .addName {
                    color: rgba(0, 0, 0, 0.45);
                    line-height: 2;
                    font-weight: 700;
                }
            }
            .upedImg {
                display: inline-block;
                width: 1.42rem;
                height: 1.42rem;
                img {
                    width: 100%;
                    max-height: 1.42rem;
                }
            }
        }
    }
    /deep/ .van-cell {
        margin-bottom: 0.24rem;
        width: 100%;
        // padding: 10px 16px;
        padding-left: 0.64rem;
        padding-top: 0.56rem;
        padding-bottom: 0.34rem;
        overflow: hidden;
        color: #323233;
        font-size: 14px;
        line-height: 24px;
        background-color: #fff;
        box-sizing: border-box;
    }
    .attestation {
        // margin-top: 0.24rem;
        .itemBox {
            width: 7.5rem;
            height: 2.2rem;
            display: flex;
            background: rgba(255, 255, 255, 1);
            padding-left: 0.5rem;
            box-sizing: border-box;
            // border: 1px solid #eeeeee;
            margin-bottom: 0.12rem;
        }
        .leftImg {
            width: 1.4rem;
            height: 1.4rem;
            margin: auto 0;
            border: 0.02rem solid rgba(233, 233, 233, 1);
            img {
                height: 100%;
                width: 100%;
            }
        }
        .rightText {
            padding-left: 0.36rem;
            font-size: 0.28rem;
            color: rgba(49, 52, 55, 1);
            line-height: 0.4rem;
            box-sizing: border-box;
            .title {
                padding-top: 0.32rem;
                padding-bottom: 0.18rem;
            }
        }
    }
}
</style>

