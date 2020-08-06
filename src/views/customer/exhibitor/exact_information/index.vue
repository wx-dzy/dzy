<template>
    <div class="exact_information">
        <!-- <div> -->
        <div class="full" v-if="url">
            <!-- <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
            <van-swipe-item style="width:100%;height: 800px">-->
            <!-- <iframe style="width: 100;height: 100" :src="infomation.pdfUrl" alt></iframe> -->

            <!-- <object :data="infomation.pdfUrl" type="application/pdf" width="100%" height="100%"> -->
            <!-- <iframe :src="infomation.pdfUrl" width="100%" height="100%"> -->
            <div class="pdf" v-show="all">
                <!-- <pdf ref="pdf" :src="infomation.pdfUrl"></pdf> -->
                <pdf ref="pdf" :src="url" @num-pages="getPagesNum"></pdf>
            </div>
            <div v-show="!all" class="pdf">
                <pdf v-for="i in numPages" :key="i" :src="url" :page="i"></pdf>
            </div>
            <!-- </iframe> -->
            <!-- </object> -->
            <!-- </van-swipe-item>
            </van-swipe>-->
            <!-- </div> -->
            <!-- <div style="overflow-x: scroll;width: 100%">
                    <ul
                        style="display: flex;justify-content: space-around;margin-top: 5px;width: 120%;height: 60px"
                    >
                        <li
                            v-for="(item,key) in infomation"
                            :key="key"
                            @click="choose(index,$event)"
                        >
                            <img
                                style="width: 50px;height: 50px"
                                :src="infomation?item.pdfUrl:''"
                                alt
                            />
                        </li>
                    </ul>
            </div>-->
            <div style="display: flex;justify-content:space-around;margin-top: 10px">
                <van-button
                    type="default"
                    style="width: 150px;height: 40px;border-radius: 10px;border: 1px solid #000;background-color: #fff;text-align: center;letter-spacing: 10px;"
                    @click="showPop"
                >分享</van-button>
                <!-- <van-button
                type="default"
                style="width: 150px;height: 40px;border-radius: 10px;border: 1px solid #000;background-color: orange;letter-spacing: 10px;"
                >下载</van-button>-->
                <van-button
                    type="default"
                    style="width: 150px;height: 40px;border-radius: 10px;border: 1px solid #000;background-color: orange;letter-spacing: 10px;"
                    @click="checkAll"
                >查看</van-button>
            </div>
        </div>
        <div class="none" v-if="!url">
            <img src="../../../../assets/images/exhibitor/infomation_none.png" alt />
        </div>
        <!-- <van-popup v-model="show" style="font-size:18px;background:none;color:#fff">请点击右上角分享</van-popup> -->
        <!-- <van-share-sheet
                v-model="showShare"
                :options="option"
                @select="onSelect"
                :overlay="overlay"
        />-->
        <van-overlay :show="showShare" @click="showShare = false">
            <div class="share">
                <span>请点击右上角分享</span>
                <div class="img">
                    <img :src="shareImg" alt />
                </div>
            </div>
        </van-overlay>
    </div>
</template>




<script>
import wxapi from '@/common/wxapi.js'
import pdf from 'vue-pdf'
import img1 from '@/assets/images/home/1.png'
import img2 from '@/assets/images/home/2.png'
import img3 from '@/assets/images/home/3.png'
import { util } from '@/utils'
import { mapGetters } from 'vuex'
import * as Api from '@/api/customer/exhibitor'
export default {
    // name: 'Pdf',
    components: {
        pdf,
    },
    data() {
        return {
            url: '',
            enterpriseExhibitorsId: '', //展会id
            infomation: {},
            checked: 0, //当前选中的index
            showShare: false, // 是否显示弹出层
            option: [
                { name: '分享到微信', icon: 'wechat' },
                { name: '分享到朋友圈', icon: 'poster' },
            ],
            overlay: true, //不显示遮罩层
            all: true, //是否显示全部
            numPages: [],
            shareImg: require('@/assets/images/exhibitor/share.png'),
        }
    },
    created() {
        this.enterpriseExhibitorsId = this.$route.query.enterpriseExhibitorsId
        // console.log('enterpriseExhibitorsId1111', this.enterpriseExhibitorsId)
        this.getCompanyInfomation()
    },
    mounted() {
        wxapi.wxRegister(this.wxRegCallback)
    },
    methods: {
        wxRegCallback() {
            // 用于微信JS-SDK回调
            this.wxShareTimeline()
            this.wxShareAppMessage()
        },
        wxShareTimeline() {
            console.log('11111111111')
            // 微信自定义分享到朋友圈
            let option = {
                title: '企业资料分享', // 分享标题, 请自行替换
                // link: window.location.href.split('#')[0], 分享链接，根据自身项目决定是否需要split
                link: window.location.href,
                imgUrl: '', // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    util.success('分享成功')
                },
                error: () => {
                    util.success('已取消分享')
                },
            }
            // 将配置注入通用方法
            wxapi.ShareTimeline(option)
        },
        wxShareAppMessage() {
            console.log('22222222222')
            // 微信自定义分享给朋友
            let option = {
                title: '企业资料分享', // 分享标题, 请自行替换
                desc: '企业资料分享', // 分享描述, 请自行替换
                // link: window.location.href.split('#')[0], 分享链接，根据自身项目决定是否需要split
                link: window.location.href,
                imgUrl: '', // 分享图标, 请自行替换，需要绝对路径
                success: () => {
                    util.success('分享成功')
                },
                error: () => {
                    util.success('已取消分享')
                },
            }
            // 将配置注入通用方法
            wxapi.ShareAppMessage(option)
        },

        // 查看
        checkAll() {
            this.all = !this.all
        },
        // 获取pdf页数
        getPagesNum(Number) {
            console.log('Number', Number)
            for (var i = 1; i <= Number; i++) {
                this.numPages.push(i)
            }
            console.log('numPages', this.numPages)
        },
        // getPJ() {
        //     let url = encodeURI(location.href)
        //     console.log(url)
        //     let params = {
        //         url: url,
        //     }
        //     Api.getAppId(params)
        //         .then((res) => {
        //             console.log('获取appid', res)
        //             const { code, data, msg, total } = res

        //             if (code == 200) {
        //                 wx.config({
        //                     debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        //                     appId: data.appId, // 必填，公众号的唯一标识
        //                     timestamp: data.timestamp, // 必填，生成签名的时间戳
        //                     nonceStr: data.nonceStr, // 必填，生成签名的随机串
        //                     signature: data.signature, // 必填，签名
        //                     jsApiList: ['updateAppMessageShareData'], // 必填，需要使用的JS接口列表
        //                 })
        //                 // wx.ready(function () {
        //                 //     console.log('config成功') // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
        //                 // })

        //                 wx.ready(function () {
        //                     //需在用户可能点击分享按钮前就先调用
        //                     wx.updateAppMessageShareData({
        //                         title: '企业资料分享', // 分享标题
        //                         desc: '企业资料分享', // 分享描述
        //                         link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //                         imgUrl: '', // 分享图标
        //                         success: function () {
        //                             // 设置成功
        //                         },
        //                     })
        //                 })
        //                 wx.error(function (res) {
        //                     console.log('config失败', res) // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名
        //                 })
        //             } else {
        //                 this.$toast('获取签名失败')
        //             }
        //         })
        //         .catch((err) => {
        //             console.log('err', err)
        //         })
        // },
        // 分享
        onSelect(option) {
            // this.$toast(option.name)
            this.showShare = false
            if (option.name == '分享到微信') {
                this.wxShareAppMessage()
            } else if (option.name == '分享到朋友圈') {
                this.wxShareTimeline()
            }
        },
        showPop() {
            // console.log('显示弹出层')

            this.showShare = true
        },
        // 选择图片
        choose(index) {
            this.checked = index
        },
        // 获取信息
        getCompanyInfomation() {
            Api.getInfomation(this.enterpriseExhibitorsId)
                .then((res) => {
                    console.log('索取资料成功', res)
                    const { code, msg, data, total } = res
                    if (code == 200) {
                        this.url = data.pdfUrl
                    }
                })
                .catch((err) => {
                    console.log('索取资料失败', err)
                })
        },
    },
}
</script>

<style lang='scss' scoped>
  .pdf {
    margin: 0 auto;
}
.main {
    position: relative;
    margin: 0 auto;
    width: 50%;
    height: 800px;
    overflow: scroll;
}
.my-swipe {
    .van-swipe-item {
        color: #fff;
        font-size: 20px;
        line-height: 150px;
        text-align: center;
        // background-color: #39a9ed;
    }
}
.none {
    width: 100%;
    margin-top: 2rem;
    img {
        width: 100%;
    }
}
.share {
    width: 90%;
    margin: 0 auto;
    color: #fff;
    font-size: 20px;
    padding-top: 1.5rem;
    box-sizing: border-box;
    text-align: center;
    .img {
        display: inline-block;
        width: 1rem;
        vertical-align: bottom;
        margin-left: 0.5rem;
        margin-top: -0.3rem;
        img {
            width: 100%;
        }
    }
}
</style>
