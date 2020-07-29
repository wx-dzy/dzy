<template>
    <!-- 手动添加成员 -->
    <div class="MTaddMember">
        <van-form @submit="addMember">
            <van-field
                v-model="realName"
                name="realName"
                label="姓名"
                placeholder="请输入姓名"
                :rules="[{ required: true, message: '请输入姓名' }]"
            />
            <van-field name="username" v-model="username" label="账号" placeholder="选填" />
            <van-field label="别名" placeholder="选填" />
            <van-field name="sex" label="性别">
                <template #input>
                    <van-radio-group direction="horizontal" v-model="radio">
                        <van-radio name="男">男</van-radio>
                        <van-radio name="女">女</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <!-- 选填项 -->
            <div class="titleText">选填项：</div>
            <van-field type="tel" label="手机" name="mobile" v-model="mobile" placeholder="请输入手机号码" />
            <van-field type="tel" label="座机" name="phone" v-model="phone" placeholder="选填" />
            <van-field label="邮箱地址" name="email" v-model="email" placeholder="选填" />
            <van-field label="地址" placeholder="选填" name="address" v-model="address" />
            <van-field name="sysPostName" label="职务" v-model="sysPostName" placeholder="选填" />
            <div class="departments">
                <van-field label="部门" v-model="username" placeholder="选填" />
                <button @click="goToSetDepartments">设置部门</button>
            </div>
            <van-button type="info" class="submit" native-type="submit">保存</van-button>
        </van-form>
    </div>
</template>
<script>
export default {
    name: '',
    components: {},
    data() {
        return {
            username: '',
            radio: '男',
            realName: '',
            mobile: '',
            phone: '',
            email: '',
            address: '',
            sysPostName: '',
        }
    },
    created() {},
    methods: {
        // 添加成员
        addMember(e) {
            console.log('添加成员', e)
        },
        goToSetDepartments() {
            this.$router.push({
                name: 'setDepartments',
            })
        },
    },
}
</script>
<style lang='scss' scoped>
.MTaddMember {
    background-color: #f7f8fa;
    padding-top: 0.84rem;
    .titleText {
        font-size: 0.32rem;
        color: #ccc;
        line-height: 0.6rem;
        margin-top: 0.28rem;
        margin-left: 0.36rem;
    }
    .departments {
        margin-top: 0.2rem;
        margin-bottom: 3rem;
        display: flex;
        background-color: #fff;
        .van-cell {
            // flex: 70%;
            width: 75%;
        }
        button {
            margin-right: 0.32rem;
            // flex: 30%;
            // width: 1.4rem;
            height: 0.48rem;
            background: rgba(248, 213, 126, 1);
            border-radius: 0.24rem;
            font-size: 0.24rem;
            color: rgba(49, 52, 55, 1);
            padding: 0 0.22rem;
            border: none;
            margin: auto;
        }
        .van-cell::after {
            border-bottom: none;
        }
    }
    .submit {
        height: 0.8rem;
        width: 6.84rem;
        line-height: 0.8rem;
        text-align: center;
        margin: 0.52rem 0.34rem;
        background: rgba(248, 213, 126, 1);
        letter-spacing: 0.2rem;
        border-radius: 0.08rem;
        border: none;
        color: #313437;
    }
    /deep/ .van-radio__icon--checked .van-icon {
        background-color: rgba(248, 213, 126, 1);
        border-color: rgba(248, 213, 126, 1);
    }
}
</style>