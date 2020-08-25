<template>
    <div class="addMember">
        <router-view />
        <div class="box1 box">
            <div class="leftBox">
                <i class="iconfont">&#xe66d;</i>
            </div>
            <div class="rightBox">
                <div class="title">微信邀请同事</div>
                <div class="remarks">发送加入邀请到微信</div>
            </div>
            <div class="icon">
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="box2 box">
            <div class="leftBox">
                <i class="iconfont">&#xe66a;</i>
            </div>
            <div class="rightBox">
                <div class="title">从微信/手机通讯录里添加</div>
                <div class="remarks">选择通讯录中的成员加入</div>
            </div>
            <div class="icon">
                <van-icon name="arrow" />
            </div>
        </div>
        <div class="box3 box"
             @click="goToAdd">
            <div class="leftBox">
                <i class="iconfont">&#xe66c;</i>
            </div>
            <div class="rightBox">
                <div class="title">手动输入添加</div>
                <div class="remarks">输入成员信息加入</div>
            </div>
            <div class="icon">
                <van-icon name="arrow" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: '',
    components: {},
    data () {
        return {
            sysOrganizationId: this.$route.query.sysOrganizationId
        }
    },
    created () {
        console.log('sysOrganizationId:', this.sysOrganizationId);
    },
    methods: {
        goToAdd () {
            this.$router.push({
                name: 'MTaddMember',
                query: {
                    sysOrganizationId: this.sysOrganizationId
                }
            })
        },
    },
}
</script>
<style lang='scss' scoped>
.addMember {
    .box {
        margin-left: 0.32rem;
        border-bottom: 1px solid #eeeeee;
        height: 1.72rem;
        display: flex;
        .leftBox {
            flex: 14%;
            width: 0.92rem;
            height: 0.92rem;
            background: rgba(248, 213, 126, 1);
            border-radius: 0.46rem;
            margin: auto 0.2rem;
            text-align: center;
            align-items: center;
            i {
                font-size: 0.44rem;
                line-height: 0.92rem;
                text-align: center;
                align-items: center;
            }
        }
        .rightBox {
            flex: 78%;
            margin-left: 0.16rem;
            .title {
                margin-top: 0.48rem;
                font-size: 0.32rem;
                color: #313437;
            }
            .remarks {
                color: #9da1a6;
                font-size: 0.24rem;
                margin-top: 0.08rem;
            }
        }
        .icon {
            flex: 8%;
            margin: auto 0;
            /deep/ .van-icon {
                line-height: 0.72rem;
                color: #d5d5de;
            }
        }
    }
}
</style>