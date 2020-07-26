<template>
    <!-- 企业管理员 -->
    <div class="enterprise_admins">
        <div class="top">
            <checkIdentity></checkIdentity>
        </div>
        <van-search v-model="value" shape="round" placeholder="当前企业的人名" />
        <div class="organizationStructure">
            <div class="title">
                <span>组织结构</span>
                <div class="fit">
                    <i class="iconfont">&#xe671;</i>
                    <span>设置</span>
                </div>
            </div>
            <div class="itemBox" v-for="(item,index) in companyList" :key="index">
                <div class="left">
                    <img :src="item.imgUrl" alt />
                </div>
                <div class="right">{{item.name}}</div>
            </div>
        </div>
        <div class="addMember" @click="addMember">
            <span
                style="display: inline-block;width:0.48rem;height:0.48rem;background:#F8D57E;border-radius:50%;text-align:center;font-size:0.34rem;line-height:0.48rem;"
            >+</span>
            <span style="margin-left:0.2rem;">添加成员</span>
        </div>
        <!-- 成员加入待确认 -->
        <div class="memberLoading">
            <div class="title">成员加入待确认</div>
            <div class="itemBox" v-for="(item,index) in memberList" :key="index">
                <div class="member_left">
                    <img :src="item.avatar" alt />
                </div>
                <div class="member_right">
                    <div class="name">{{item.realName}}</div>
                    <div class="btn">
                        <span class="ok">通过</span>
                        <span class="no">不通过</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 指定参观人员 -->
        <div class="appoint">
            <div class="title">指定参观人员</div>
            <div class="itemBox" v-for="(item,index) in appointList" :key="index">
                <div class="appointLeft">
                    <img :src="item.avatar" alt />
                </div>
                <div class="middle">
                    <div class="exhibitionName">{{item.enterpriseShowName}}</div>
                    <span
                        class="peopleName"
                        v-for="(peopleItem,index) in item.showPeopleList"
                        :key="index"
                    >{{peopleItem.realName}}</span>
                </div>
                <div class="appointRight">添加人员</div>
            </div>
        </div>
    </div>
</template>
<script>
import checkIdentity from '@/components/customer/checkIdentity.vue'
import * as Api from '@/api/customer/personal'

export default {
    name: '',
    components: {
        checkIdentity,
    },
    data() {
        return {
            value: '',
            appointList: [
                {
                    imgUrl: require('../../../assets/images/girl.png'),
                    exhibitionName: '秋季暖暖家装展',
                    name: '张明 王华 李达达 赵明明 张明 王华 李达达 赵明明',
                },
                {
                    imgUrl: require('../../../assets/images/girl.png'),
                    exhibitionName: '秋季暖暖家装展',
                    name: '张明 王华 李达达 赵明明',
                },
            ],
            memberList: [
                {
                    imgUrl: require('../../../assets/images/girl.png'),
                    name: '王晓红',
                },
                {
                    imgUrl: require('../../../assets/images/girl.png'),
                    name: '王晓红',
                },
            ],
            companyList: [
                {
                    imgUrl: require('../../../assets/images/girl.png'),
                    company: '风风火火有限公司',
                },
                {
                    imgUrl: require('../../../assets/images/girl.png'),
                    company: '风风火火有限公司',
                },
                {
                    imgUrl: require('../../../assets/images/girl.png'),
                    company: '王晓红',
                },
            ],
        }
    },
    created() {
        this.getInfo()
    },
    methods: {
        // 获取信息
        getInfo() {
            Api.indexAdmin().then((res) => {
                console.log('获取信息', res)
                let { code, data, msg, total } = res
                if (code == 200) {
                    this.companyList = data.deptList
                    this.memberList = data.userApplyList
                    this.appointList = data.showPeopleList
                }
            })
        },
        addMember() {
            console.log(1)
        },
    },
}
</script>
<style lang='scss' scoped>
.enterprise_admins {
    .top {
        padding: 0 0.32rem;
        box-sizing: border-box;
    }
    /deep/ .van-field__left-icon .van-icon {
        color: #9da1a6;
    }
    /deep/ .van-cell__value--alone {
        font-size: 0.24rem;
    }
    // 组织结构
    .organizationStructure {
        padding: 0.4rem 0.32rem;
        .title {
            display: flex;
            color: #313437;
            justify-content: space-between;
            span {
                font-size: 0.32rem;
                font-weight: 500;
            }
            .fit {
                display: inline-block;
                font-size: 0.24rem;
                padding: 0 0.4rem;
                background: rgba(248, 213, 126, 1);
                border-radius: 0.24rem;
                line-height: 0.48rem;
                i {
                    font-size: 0.24rem;
                }
                span {
                    font-weight: 500;
                    font-size: 0.24rem;
                }
            }
        }
        .itemBox {
            display: flex;
            height: 1.46rem;
            // border: 1px solid red;
            border-bottom: 0.02rem solid rgba(233, 233, 233, 1);
            .left {
                width: 0.96rem;
                height: 0.96rem;
                border-radius: 50%;
                margin: auto 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .right {
                padding-left: 0.3rem;
                line-height: 1.35rem;
                font-size: 0.32rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
    .addMember {
        padding: 0 0.32rem;
        font-size: 0.32rem;
        margin-bottom: 0.2rem;
    }
    .memberLoading {
        padding: 0.4rem 0.32rem;
        .title {
            font-size: 0.24rem;
            color: #9da1a6;
        }
        .itemBox {
            display: flex;
            border-bottom: 0.02rem solid rgba(233, 233, 233, 1);
            height: 1.46rem;
            .member_left {
                flex: 15%;
                width: 0.96rem;
                height: 0.96rem;
                border-radius: 50%;
                margin: auto 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .member_right {
                flex: 85%;
                // justify-content: space-between;
                padding-left: 0.3rem;
                display: flex;
                .name {
                    display: inline-block;
                    line-height: 1.35rem;
                    font-size: 0.32rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    width: 3rem;
                }
                .btn {
                    display: inline-block;
                    height: 1.35rem;
                    padding: 0.43rem 0;
                    margin-left: 0.2rem;
                    span {
                        display: inline-block;
                        padding: 0 0.24rem;
                        // height:0.34rem;
                        border-radius: 0.04rem;
                        border: 0.02rem solid rgba(213, 213, 222, 1);
                        font-size: 0.2rem;
                        line-height: 0.34rem;
                        align-items: center;
                        background-color: #fff;
                        // margin: auto 0;
                    }
                    .no {
                        border: 0.02rem solid rgba(248, 213, 126, 1);
                        margin-left: 0.2rem;
                    }
                }
            }
        }
    }
    .appoint {
        padding: 0.4rem 0.32rem;
        .title {
            font-size: 0.24rem;
            color: #9da1a6;
        }
        .itemBox {
            display: flex;
            height: 1.46rem;
            border-bottom: 0.02rem solid rgba(233, 233, 233, 1);
            .appointLeft {
                flex: 15%;
                width: 0.96rem;
                height: 0.96rem;
                border-radius: 50%;
                margin: auto 0;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .middle {
                flex: 65%;
                padding-left: 0.3rem;
                padding-top: 0.34rem;
                .exhibitionName {
                    font-size: 0.32rem;
                    color: rgba(49, 52, 55, 1);
                    line-height: 0.36rem;
                }
                .peopleName {
                    width: 3.14rem;
                    padding-top: 0.12rem;
                    line-height: 0.34rem;
                    font-size: 0.24rem;
                    color: rgba(157, 161, 166, 1);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-right: 0.25rem;
                }
            }
            .appointRight {
                flex: 20%;
                font-size: 0.24rem;
                color: #313437;
                // margin-left: 1.24rem;
                // float: right;
                // right: 0;
                margin-top: 0.5rem;
                width: 1.32rem;
                height: 0.48rem;
                border-radius: 0.24rem;
                border: 0.02rem solid rgba(248, 213, 126, 1);
                text-align: center;
            }
        }
    }
}
</style>