<template>
    <div class="exact_information">
        <!-- <div> -->
        <div class="full">
            <div class="full" v-if="!infomation">
                <!-- <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
                <van-swipe-item style="width:100%;height: 800px">-->
                <!-- <iframe style="width: 100;height: 100" :src="infomation.pdfUrl" alt></iframe> -->

                <!-- <object :data="infomation.pdfUrl" type="application/pdf" width="100%" height="100%"> -->
                <!-- <iframe :src="infomation.pdfUrl" width="100%" height="100%"> -->
                <div class="pdf">
                    <pdf ref="pdf" :src="infomation.pdfUrl"></pdf>
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
                    >查看</van-button>
                </div>
            </div>
            <div class="none" v-if="infomation">
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
        }
    },

    created() {
        this.enterpriseExhibitorsId = this.$route.query.enterpriseExhibitorsId
        console.log('enterpriseExhibitorsId1111', this.enterpriseExhibitorsId)

        this.getCompanyInfomation()
        // this.src = pdf.createLoadingTask(this.src)
    },
    components: {
        // 分享按钮点击显示弹出层
        // [Swipe.name]: Swipe,
        // [SwipeItem.name]: SwipeItem,
        // [Button.name]: Button
    },
    methods: {
        // 分享
        onSelect(option) {
            this.$toast(option.name)
            this.showShare = false
        },
        showPop() {
            console.log('显示弹出层')

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
                        this.infomation = data
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
