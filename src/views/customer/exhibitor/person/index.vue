// 企业人物
<template>
    <div class="person">
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <div class="topCard">
                <img :src="companyBaseInfo.logo" alt />
                <div class="name">{{companyBaseInfo.name}}</div>

                <div class="date">企业成立日期：{{companyBaseInfo.registerDate}}</div>
                <div class="huiyuan">
                    <van-icon class="icon iconfont yz-huiyuan" />
                    <span v-show="companyBaseInfo.memberStatus == 1">会员</span>
                    <span v-show="companyBaseInfo.memberStatus == 0">非会员</span>
                </div>
            </div>
            <!-- 上拉加载 -->
            <div v-if="personList?true:false" style="width:7.5rem;text-align:center;">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="----- 我是有底线的 -----"
                    error-text="请求失败，点击重新加载"
                    @load="onLoad"
                    class="contentList"
                >
                    <div
                        class="ItemContainer"
                        v-for="(item,index) in personList"
                        :key="index"
                        @click="toPersonDetail(item.id,$event)"
                    >
                        <img :src="item.avatar" alt />
                        <div class="center">
                            <div class="name">{{item.realName}}</div>
                            <div class="type">{{item.postName}}</div>
                        </div>
                        <!-- <button class="right">预约面试</button> -->
                        <van-icon name="arrow" />
                    </div>
                </van-list>
                <!-- <van-divider dashed>我是有底线的</van-divider> -->
            </div>
            <img
                src="@/assets/images/null.png"
                alt
                v-else
                style="width: 4rem;margin:0.4rem 1.47rem;"
            />
        </van-pull-refresh>
    </div>
</template>
<script>
import { util } from '@/utils'
import { mapGetters } from 'vuex'
import * as Api from '@/api/customer/exhibitor'
import nullImg from '@/assets/images/null.png'
export default {
    name: 'person',
    data() {
        return {
            loading: false,
            companyBaseInfo: {},
            finished: true,
            refreshing: false,
            pageNum: 1,
            pageSize: 10,
            personList: [],
            enterpriseExhibitorsId: this.$route.query.enterpriseExhibitorsId, //参展商id
        }
    },
    created() {
        this.getExhibitorsInfo()
        this.getPerson()
    },
    methods: {
        // 跳转至企业人物详情
        toPersonDetail(id) {
            let peopleId = id
            console.log('peopleId:', peopleId)

            this.$router.push({
                path: '/juridical_person',
                query: {
                    enterpriseShowPeopleId: id,
                },
            })
        },
        // 下拉刷新
        onRefresh() {
            this.getExhibitorsInfo()
            this.getPerson()
            this.loading = true
            this.refreshing = true
        },
        // 懒加载请求加载列表
        onLoad() {
            this.pageNum++
            this.getPerson()
            this.loading = true
        },

        // 获取企业基本信息
        getExhibitorsInfo() {
            Api.getExhibitorsInfo(this.enterpriseExhibitorsId).then((res) => {
                console.log('获取企业基本信息:', res)
                this.loading = false
                this.refreshing = false
                this.finished = true
                this.companyBaseInfo = res.data
            })
        },
        // 获取企业人物信息
        getPerson() {
            let enterpriseExhibitorsId = this.enterpriseExhibitorsId
            console.log('enterpriseExhibitorsId:', enterpriseExhibitorsId)

            Api.getPerson(enterpriseExhibitorsId, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            })
                .then((res) => {
                    console.log('获取企业人物', res)
                    this.loading = false
                    this.finished = true
                    this.refreshing = false
                    this.personList = res.data
                })
                .catch((err) => {
                    console.log('err', err)
                })
        },
    },
}
</script>
<style lang='scss' scoped>
.person {
    width: 7.5rem;
    height: 100%;
    background-color: #fff;
    padding-left: 0.28rem;
    box-sizing: border-box;
    .topCard {
        width: 6.96rem;
        height: 2.66rem;
        margin-top: 0.26rem;
        margin-bottom: 0.48rem;
        background: linear-gradient(
            300deg,
            rgba(74, 96, 119, 1) 0%,
            rgba(45, 72, 95, 1) 100%
        );
        color: #fff;
        border-radius: 0.16rem;
        position: relative;
        padding-left: 0.38rem;
        img {
            height: 1.6rem;
            width: 1.6rem;
            position: absolute;
            top: 0.32rem;
            right: 0.4rem;
        }
        .name {
            padding-top: 0.4rem;
            font-size: 0.4rem;
            font-weight: bold;
            margin-bottom: 0.05rem;
        }
        .date {
            margin-top: 0.18rem;
            font-size: 0.3rem;
        }
        .huiyuan {
            position: absolute;
            left: 0.28rem;
            bottom: 0.42rem;
            font-size: 0.32rem;
            .icon {
                display: inline;
                color: rgba(229, 204, 157, 1);
                margin-left: 0.26rem;
                margin-right: 0.14rem;
            }
            span {
                color: #ffffff;
            }
        }
    }
}

.ItemContainer {
    width: 6.96rem;
    height: 1.82rem;
    background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 1) 100%
    );
    box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
    border-radius: 0.16rem;
    position: relative;
    margin-bottom: 0.4rem;
    img {
        width: 1.44rem;
        height: 1.48rem;
        border-radius: 50%;
        border: 1px solid #9da1a6;
        position: absolute;
        left: 0.26rem;
        top: 0.16rem;
    }
    .center {
        position: absolute;
        top: 0.52rem;
        left: 2.1rem;
        .name {
            font-size: 0.32rem;
        }
        .type {
            font-size: 0.2rem;
            background-color: #fff;
            background-color: #9da1a6;
            // width: 0.8rem;
            height: 0.32rem;
            padding: 0 8px;
            line-height: 0.32rem;
            border-radius: 0.08rem;
            text-align: center;
            color: #fff;
        }
    }
    .right {
        width: 1.68rem;
        height: 0.6rem;
        background: rgba(248, 213, 126, 1);
        border-radius: 0.29rem;
        border: none;
        position: absolute;
        right: 0.4rem;
        bottom: 0.54rem;
    }
    .van-icon {
        position: absolute;
        top: 0.82rem;
        right: 0.3rem;
    }
}
/deep/ .van-divider {
    font-size: 0.24rem;
    margin-top: 1.42rem;
}
</style>