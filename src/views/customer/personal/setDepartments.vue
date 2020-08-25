<template>
    <!-- 设置部门 -->
    <div class="setDepartments">
        <van-search v-model="value"
                    shape="round"
                    placeholder="当前企业的人名" />
        <div class="item">
            <div class="itemBox"
                 v-for="(item,index) in itemList"
                 :key="index"
                 @click="toAddMember(item.id,item.name,$event)">
                <div class="left">
                    <img :src="item.imgUrl"
                         alt />
                </div>
                <div class="right">{{item.name}}</div>
            </div>
            <div class="itemBox"
                 v-for="item in userList"
                 :key="item.id">
                <div class="left">
                    <img :src="item.avatar"
                         alt />
                </div>
                <div class="right">{{item.realName}}</div>
            </div>
        </div>
        <div class="remarks">注：添加子部门，可以是一个公司形式，也可以是部门形式</div>
        <div class="foot">
            <button class="add1"
                    @click="show = true"
                    style="background: rgba(248, 213, 126, 1);border:none;">添加部门</button>
            <button @click="addMember"
                    class="add2"
                    style="background:rgba(255,255,255,1);border:0.02rem solid rgba(213,213,222,1);">添加成员</button>
            <!-- 添加部门弹出框 -->
            <van-overlay :show="show"
                         @click="show = false">
                <div class="wrapper"
                     @click.stop
                     style="margin-top:3rem;">
                    <!-- <div class="block" /> -->
                    <div class="mini-member"
                         style="width:6.96rem;height:5.38rem;background:rgba(255,255,255,1);border-radius:0.08rem;margin:auto;">
                        <div class="title">添加子部门</div>
                        <input type="text"
                               placeholder="请输入部门名称"
                               v-model="name" />
                        <div class="remark">注：添加子部门，可以是一个公司形式，也可以是部门形式</div>
                        <button @click="show = false">取消</button>
                        <button class="ok"
                                @click="addChildDept">确认</button>
                    </div>
                </div>
            </van-overlay>
            <!-- <van-popup v-model="show">
        <div class="mini-member" style="width:6.96rem;height:5.38rem;background:rgba(255,255,255,1);border-radius:0.08rem;margin:auto;">
            <div class="title">添加子部门</div>
            <input type="text" placeholder="请输入部门名称" />
            <div class="remark">注：添加子部门，可以是一个公司形式，也可以是部门形式</div>
            <button @click="Popup">取消</button>
            <button @click="Popup">确认</button>
        </div>
            </van-popup>-->
        </div>
    </div>
</template>
<script>
import * as Api from '@/api/customer/personal'

export default {
    name: '',
    components: {},
    data () {
        return {
            itemList: [],  // 组织机构列表
            userList: [], // 用户列表
            value: '',
            show: false,
            name: '', // 子部门名称
            sysOrganizationId: this.$route.query.sysOrganizationId,
        }
    },
    created () {
        this.getChildren()
    },
    methods: {
        // 添加子部门
        addChildDept () {
            this.show = false
            let parentId = this.sysOrganizationId
            console.log('parentId', parentId)
            let params = {
                name: this.name,
                enterpriseId: sessionStorage.getItem('enterpriseId'),
                parentId: parentId,
            }
            Api.assChildDept(params).then((res) => {
                console.log('添加子部门:', res)
                let { code, data, msg, total } = res
                if (code == 200) {
                    this.getChildren()
                }
            })
        },
        // 返回添加成员
        toAddMember (id, name) {
            console.log('sysOrganizationId', id)
            this.$router.push({
                path: '/MTaddMember',
                query: {
                    sysOrganizationId: id,
                    name: name,
                },
            })
        },
        // 获取子部门

        getChildren () {
            console.log('sysOrganizationId', this.sysOrganizationId)
            Api.getChildDeptandUser(this.sysOrganizationId).then(
                (res) => {
                    console.log('获取子部门:', res)
                    let { code, data, msg, total } = res
                    if (code == 200) {
                        this.itemList = data.sysOrganizationList
                        this.userList = data.userList
                    }
                }
            )
        },
        // Popup() {
        //   this.show = false;
        // },
        // showPopup() {
        //   this.show = true;
        // },
        addMember () {
            this.$router.push({
                name: 'addMember',
                query: {
                    sysOrganizationId: this.sysOrganizationId
                }
            })
        },
    },
    mounted () {
        document.body.style.backgroundColor = '#eeeeee'
    },
}
</script>
<style lang='scss' scoped>
.setDepartments {
    width: 7.5rem;
    background-color: #fff;
    .item {
        padding-left: 0.28rem;
        .itemBox {
            display: flex;
            height: 1.46rem;
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
    .remarks {
        background: #eeeeee;
        padding-top: 0.32rem;
        text-align: center;
        font-size: 0.24rem;
        color: rgba(157, 161, 166, 1);
        line-height: 0.34rem;
        width: 7.5rem;
        padding-bottom: 2rem;
    }
    .foot {
        width: 7.5rem;
        height: 1.7rem;
        background: rgba(255, 255, 255, 1);
        border-radius: 0.04rem;
        // position: fixed;
        // bottom: 0;

        button {
            height: 0.8rem;
            border-radius: 0.16rem;
            font-size: 0.32rem;
            color: #313437;
            outline: none;
            margin-top: 0.4rem;
        }
        .add1 {
            width: 3.76rem;
            margin-left: 0.28rem;
        }
        .add2 {
            width: 3rem;
            margin-left: 0.2rem;
        }
        .mini-member {
            padding-left: 0.42rem;
            box-sizing: border-box;
            padding-top: 0.86rem;
            .title {
                // margin-top: 0.86rem;
                font-size: 0.36rem;
                color: rgba(49, 52, 55, 1);
                line-height: 0.48rem;
            }
            input {
                height: 0.6rem;
                width: 6.04rem;
                margin-top: 0.54rem;
                border: none;
                font-size: 0.3rem;
                border-bottom: 1px solid #d5d5de;
            }
            .remark {
                margin-top: 0.16rem;
                font-size: 0.24rem;
                color: rgba(157, 161, 166, 1);
                line-height: 0.34rem;
                margin-bottom: 0.8rem;
            }
            button {
                width: 2.92rem;
                height: 0.8rem;
                border-radius: 0.16rem;
                font-size: 0.32rem;
                color: rgba(49, 52, 55, 1);
                border: none;
                background-color: #fff;
                border: 1px solid #9da1a6;
            }
            .ok {
                border: none;
                background: rgba(248, 213, 126, 1);
                margin-left: 0.2rem;
            }
        }
    }
}
</style>