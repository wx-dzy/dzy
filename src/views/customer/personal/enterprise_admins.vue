<template>
    <!-- 企业管理员 -->
    <div class="enterprise_admins">
        <div class="top">
            <checkIdentity></checkIdentity>
        </div>
        <van-search v-model="value"
                    shape="round"
                    placeholder="当前企业的人名" />
        <div class="organizationStructure">
            <div class="title">
                <span>组织结构</span>
                <div class="fit">
                    <i class="iconfont">&#xe671;</i>
                    <span @click="toSetDepartments('0',$event)">设置</span>
                </div>
            </div>
            <!-- 组织结构 -->
            <div class="itemBox"
                 v-for="(item,index) in companyList"
                 :key="index"
                 @click="toSetDepartments(item.id,$event,item.name)">
                <div class="left">
                    <img :src="item.imgUrl"
                         @error="logoErr(item)"
                         alt />
                </div>
                <div class="right">{{item.name}}</div>
            </div>
            <!-- 组织机构下人员列表 -->
            <div class="itemBox"
                 v-for="item in userList"
                 @click="editMember(item.id,$event)"
                 :key="item.id">
                <div class="left">
                    <img :src="item.avatar"
                         @error="avatarErr(item)"
                         alt />
                </div>
                <div class="right">{{item.realName}}</div>
            </div>
        </div>
        <div class="addMember"
             @click="addMember">
            <span style="display: inline-block;width:0.48rem;height:0.48rem;background:#F8D57E;border-radius:50%;text-align:center;font-size:0.34rem;line-height:0.48rem;">+</span>
            <span style="margin-left:0.2rem;">添加成员</span>
        </div>
        <!-- 成员加入待确认 -->
        <div class="memberLoading">
            <div class="title">成员加入待确认</div>
            <div class="itemBox"
                 v-for="(item,index) in memberList"
                 :key="index">
                <div class="member_left">
                    <img :src="item.avatar"
                         alt />
                </div>
                <div class="member_right">
                    <div class="name">{{item.realName}}</div>
                    <div class="btn">
                        <span class="ok"
                              @click="pass(item.id)">通过</span>
                        <span class="no"
                              @click="nopass(item.id)">不通过</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 指定参观人员 -->
        <div class="appoint">
            <div class="title">指定参观人员</div>
            <div v-for="(item,index) in appointList"
                 class="itemBox"
                 :key="index">

                <div class="appointLeft">
                    <img :src="item.logo"
                         @error="avatarErr(item)"
                         alt />
                </div>

                <!-- <div class="exhibition">展会

                </div> -->
                <div class="exhibition">{{item.enterpriseShowName}}</div>

                <div class="member">
                    <i class="peopleName"
                       v-for="(peopleItem,index) in item.showPeopleList"
                       :key="index">{{peopleItem.realName}}</i>
                </div>
                <div class="appointRight"
                     @click="addMember">添加人员</div>
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
    data () {
        return {
            value: '',
            appointList: [],  // 指定参观人员列表
            memberList: [],  // 成员加入待确认列表
            companyList: [],  // 组织机构列表
            userIdentity: {}, // 用户身份
            userList: {}, // 组织机构下人员列表
        }
    },
    created () {
        this.getInfo()
    },
    methods: {
        // 返回添加成员
        editMember (id) {
            console.log('userId:', id)
            this.$router.push({
                path: '/MTaddMember',
                query: {
                    userId: id,
                    sysOrganizationId: 0
                },
            })
        },
        // 部门头像加载失败
        logoErr () {
            item.imgUrl = require('../../../assets/images/nullCompany.png')
        },
        // 头像加载失败
        avatarErr (item) {
            item.avatar = require('../../../assets/images/nullPhoto.jpg')
            item.avatar = require('../../../assets/images/nullPhoto.jpg')
        },
        // 设置部门
        toSetDepartments (id,$event,sysOrganizationName) {
            this.$router.push({
                path: '/setDepartments',
                query: {
                    sysOrganizationId: id,
                    sysOrganizationName:sysOrganizationName,
                },
            })
        },
        // 不通过
        nopass (id) {
            console.log('userId', id)
            id ? (id = id) : 0
            let params = {
                userId: id,
                status: 0,
                remarks: '',
            }
            Api.applyUsertoEnterprise(params).then((res) => {
                console.log('不通过', res)
                if (res.code == 200) {
                    this.getInfo()
                }
            })
        },
        // 通过
        pass (id) {
            console.log('userId', id)
            let params = {
                userId: id,
                status: 1,
                remarks: '',
            }
            Api.applyUsertoEnterprise(params).then((res) => {
                console.log('通过', res)
                if (res.code == 200) {
                    this.getInfo()
                }
            })
        },
        // 获取信息
        getInfo () {
            Api.indexAdmin().then((res) => {
                console.log('获取信息', res)
                let { code, data, msg, total } = res
                if (code == 200) {
                    this.companyList = data.deptList   //组织机构列表
                    for (var i = 0; i < this.companyList.length; i++) {
                        this.companyList[i].imgUrl = require('../../../assets/images/nullCompany.png')
                    }


                    this.memberList = data.userApplyList    // 成员加入待确认列表
                    this.appointList = data.showPeopleList   // 指定参观人员列表
                    for (let i = 0; i < this.appointList.length; i++) {
                        this.appointList[i].logo = require('../../../assets/images/nullPhoto.jpg')

                    }
                    this.userIdentity = data.userIdentity   //用户身份
                    this.userList = data.userList   // 组织机构下人员列表
                }
            })
        },
        addMember () {
            this.$router.push({
                name: 'addMember',
            })
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
        position: relative;
        .title {
            font-size: 0.24rem;
            color: #9da1a6;
        }

        .itemBox {
            display: flex;
            width: 100%;
            height: 1.46rem;
            border-bottom: 0.02rem solid rgba(233, 233, 233, 1);
            position: relative;
            .appointLeft {
                flex: 15%;
                border-radius: 50%;
                margin: auto 0;
                img {
                    // width: 100%;
                    // height: 100%;
                    width: 0.96rem;
                    height: 0.96rem;
                }
            }
            .exhibition {
                flex: 65%;
                padding-top: 0.3rem;
                padding-left: 0.34rem;
                font-size: 16px;
                color: #000;
                box-sizing: border-box;
            }
            // .middle {
            //     flex: 65%;
            //     padding-left: 0.3rem;
            //     padding-top: 0.34rem;
            //     .exhibitionName {
            //         font-size: 0.32rem;
            //         color: rgba(49, 52, 55, 1);
            //         line-height: 0.36rem;
            //     }

            // }
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
                line-height: 0.48rem;
                border-radius: 0.24rem;
                border: 0.02rem solid rgba(248, 213, 126, 1);
                text-align: center;
            }
            .member {
                width: 50%;
                position: absolute;
                top: 0.85rem;
                left: 1.1rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                .peopleName {
                    line-height: 0.34rem;
                    font-size: 0.24rem;
                    color: rgba(157, 161, 166, 1);

                    margin-left: 0.25rem;
                }
            }
        }
    }
}
</style>