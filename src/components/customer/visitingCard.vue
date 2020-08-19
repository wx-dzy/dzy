// 名片组件 调用实例 <visitingCard :dataList.sync="dataList" :disabled="true" @successCBK="handleActive" />  回调函数返回当前索引

<template>
    <div class="visitingCard">
        <div class="cardWrap">
            <van-swipe :duration="100" @change="onChange">
                <!-- 内容 -->
                <!-- {{list}} -->
                <van-swipe-item v-for="(item, index) in list" :key="index">
                    <van-row
                        :class="index == current ? `${'carditem'+ index}` : `${'carditem'+ index} ${'zoom'}`"
                        class="carditem"
                    >
                        <div class="city">
                            <van-col span="6">
                                <img :src="item.companyLogo" alt class="photo" />
                            </van-col>
                            <!-- 中文 -->
                            <van-col span="18" v-if="isShow">
                                <h2 class="name">{{ item.userRealName}}<span style="margin-left:0.1rem;">{{item.postName}}</span></h2>
                                <p class="company">{{ item.enterpriseName }}</p>

                                <p v-show="item.phone" class="tel pad30">
                                    <i class="icon iconfont yz-dianhua"></i>
                                    {{ item.phone }}
                                </p>
                                <p v-show="item.email" class="mail pad30">
                                    <i class="icon iconfont yz-youjian"></i>
                                    {{ item.email }}
                                </p>
                                <p v-show="item.companyAddress" class="address pad30">
                                    <i class="icon iconfont yz-dizhi"></i>
                                    {{ item.companyAddress }}
                                </p>
                            </van-col>
                            <!-- 英文 -->
                            <van-col span="18" v-else>
                                <h2 class="name">{{ item.userRealNameEn}}<span style="margin-left:0.1rem;">{{item.postNameEn}}</span></h2>
                                <p class="company">{{ item.enterpriseNameEn }}</p>

                                <!-- <p v-show="item.phoneEn" class="tel pad30">
                                    <i class="icon iconfont yz-dianhua"></i>
                                    {{ item.phoneEn }}
                                </p>
                                <p v-show="item.emailEn" class="mail pad30">
                                    <i class="icon iconfont yz-youjian"></i>
                                    {{ item.emailEn }}
                                </p>
                                <p v-show="item.companyAddressEn" class="address pad30">
                                    <i class="icon iconfont yz-dizhi"></i>
                                    {{ item.companyAddressEn }}
                                </p> -->
                                <p v-show="item.phone" class="tel pad30">
                                    <i class="icon iconfont yz-dianhua"></i>
                                    {{ item.phone }}
                                </p>
                                <p v-show="item.email" class="mail pad30">
                                    <i class="icon iconfont yz-youjian"></i>
                                    {{ item.email }}
                                </p>
                                <p v-show="item.companyAddressEn" class="address pad30">
                                    <i class="icon iconfont yz-dizhi"></i>
                                    {{ item.companyAddressEn }}
                                </p>
                            </van-col>
                        </div>
                    </van-row>
                </van-swipe-item>
                <template #indicator>
                    <div class="custom-indicator">{{ current + 1 }} / {{list.length}}</div>
                </template>
            </van-swipe>
            <div v-show="disabled" class="btnWrap">
                <van-button
                    v-show="isShow"
                    round
                    type="default"
                    plain
                    :disabled="!list.length"
                    hairline
                    color="#F8D57E"
                    size="small"
                    @click="isShow = !isShow"
                >切换英文版名片</van-button>
                <van-button
                    v-show="!isShow"
                    round
                    :disabled="!list.length"
                    type="default"
                    plain
                    hairline
                    color="#F8D57E"
                    size="small"
                    @click="isShow = !isShow"
                >切换中文版名片</van-button>
                <van-button
                    round
                    :disabled="!list.length"
                    color="#F8D57E"
                    size="small"
                    @click="handleEdit"
                >编 辑</van-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // disabled 是否显切换 编辑按钮
    props: ['dataList', 'disabled'],

    data() {
        return {
            // 当前索引
            current: 0,
            list: [],
            // 当前名片ID
            activeId: '',
            isShow: true,
        }
    },
    components: {},

    watch: {},
    created() {
        this.init()
    },
    methods: {
        init() {
            this.list = this.dataList
            if (this.list.length) {
                // 更新父组件成功函数 function 类型
                this.$emit('successCBK', this.current)
                // 初始化编辑id
                this.activeId = this.list[0].id
            }
        },
        onChange(index) {
            this.current = index
            this.activeId = this.list[index].id
            // 更新父组件成功函数 function 类型
            this.$emit('successCBK', this.current)
        },

        // 编辑
        handleEdit() {
            console.log(this.activeId)
            this.$router.push({
                name: 'personal_editCard',
                query: {
                    // 名片ID
                    id: this.activeId,
                },
            })
        },
    },
    computed: {},
}
</script>
<style lang="scss">
.visitingCard {
}
</style>
<style lang="scss" scoped>
.visitingCard {
    // height: 3.64rem;

    .cardWrap {
        width: 100%;
        overflow: hidden;
        .van-swipe {
            width: 6.34rem;
            margin-left: 0.59rem;
            overflow: visible;

            .van-swipe-item {
                padding: 0 0.09rem;

                .photo {
                    width: 1.18rem;
                    height: 1.18rem;
                    border-radius: 0.04rem;
                    border: 0.02rem solid rgba(233, 233, 233, 1);
                }
                .pad30 {
                    padding: 0.05rem 0;
                }
                .name {
                    font-size: 0.28rem;
                    line-height: 0.4rem;
                }
                .company {
                    padding-bottom: 0.3rem;
                }
                // .tel {}
                // .mail {}
                // .address {}

                .carditem.zoom {
                    zoom: 0.9;
                    margin-top: 0.2rem;
                    padding: 0 0.8rem;
                    .city {
                        opacity: 0;
                    }
                }

                .carditem {
                    overflow: auto;
                    height: 3.64rem;
                    padding: 0.48rem 0.3rem 0;
                    box-shadow: 0rem 0.1rem 0.26rem 0rem
                        rgba(223, 227, 233, 0.51);
                    border-radius: 0.16rem;
                    background: linear-gradient(
                        316deg,
                        rgba(255, 255, 255, 1) 0%,
                        rgba(209, 209, 209, 1) 100%
                    );
                    font-size: 0.22rem;
                    line-height: 0.4rem;
                    color: rgba(49, 52, 55, 1);
                }
                .carditem0 {
                    background: linear-gradient(
                        316deg,
                        rgba(255, 255, 255, 1) 0%,
                        rgba(209, 209, 209, 1) 100%
                    );
                }
                .carditem1 {
                    background: linear-gradient(
                        136deg,
                        rgba(202, 196, 203, 1) 0%,
                        rgba(255, 243, 236, 1) 100%
                    );
                }
                .carditem2 {
                    background: linear-gradient(
                        136deg,
                        rgba(209, 220, 222, 1) 0%,
                        rgba(247, 242, 239, 1) 100%
                    );
                }
                .carditem3 {
                    background: linear-gradient(
                        136deg,
                        rgba(214, 209, 216, 1) 0%,
                        rgba(255, 248, 251, 1) 100%
                    );
                }
                .carditem4 {
                    background: linear-gradient(
                        136deg,
                        rgba(200, 200, 200, 1) 0%,
                        rgba(244, 245, 246, 1) 100%
                    );
                }
                .carditem5 {
                    background: linear-gradient(
                        136deg,
                        rgba(218, 225, 234, 1) 0%,
                        rgba(248, 246, 240, 1) 100%
                    );
                }
                .carditem6 {
                    background: linear-gradient(
                        136deg,
                        rgba(229, 237, 248, 1) 0%,
                        rgba(224, 224, 224, 1) 100%
                    );
                }
                .carditem7 {
                    background: linear-gradient(
                        136deg,
                        rgba(227, 217, 206, 1) 0%,
                        rgba(248, 246, 240, 1) 100%
                    );
                }
            }

            .custom-indicator {
                text-align: center;
                font-size: 0.24rem;
                color: rgba(157, 161, 166, 1);
                line-height: 0.8rem;
            }
        }
    }
    .btnWrap {
        text-align: center;
        .van-button {
            color: #313437 !important;
            padding: 0 0.18rem;
            margin: 0 0.08rem;
        }
    }
}
</style>