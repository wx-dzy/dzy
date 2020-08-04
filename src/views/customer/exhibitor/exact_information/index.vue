<template>
    <div class="exact_information">
        <!-- <div> -->
        <div class="full">
            <div class="full" v-if="infomation">
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
            <div class="none" v-if="!infomation">
                <img src="../../../../assets/images/exhibitor/infomation_none.png" alt />
            </div>
            <!-- <van-popup v-model="show" style="font-size:18px;background:none;color:#fff">请点击右上角分享</van-popup> -->
            <van-share-sheet
                v-model="showShare"
                title="立即分享给好友"
                :option="option"
                @select="onSelect"
                :overlay="overlay"
            />
        </div>
    </div>
</template>
<script>
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
                { name: '生成图片', icon: img1 },
                { name: '微信', icon: img2 },
                { name: '朋友圈', icon: img3 },
            ],
            overlay: false, //不显示遮罩层
            all: true, //是否显示全部
            numPages: [],
        }
    },
    created() {
        this.enterpriseExhibitorsId = this.$route.query.enterpriseExhibitorsId
        // console.log('enterpriseExhibitorsId1111', this.enterpriseExhibitorsId)
        this.getCompanyInfomation()
    },
    methods: {
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
        getPJ() {
            let url = location.href
            console.log('href', url)
            Api.getAppId(url)
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
                            jsApiList: ['updateAppMessageShareData'], // 必填，需要使用的JS接口列表
                        })
                        // wx.ready(function () {
                        //     console.log('config成功') // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中
                        // })
                        wx.ready(function () {
                            //需在用户可能点击分享按钮前就先调用
                            wx.updateAppMessageShareData({
                                title: '', // 分享标题
                                desc: '', // 分享描述
                                link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: '', // 分享图标
                                success: function () {
                                    // 设置成功
                                },
                            })
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
        // 分享
        onSelect(option) {
            this.$toast(option.name)
            this.showShare = false
        },
        showPop() {
            console.log('显示弹出层')

            this.showShare = true
            this.getPJ()
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
</style>
