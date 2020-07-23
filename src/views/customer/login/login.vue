<template>
    <div class="login">
        <!-- <img src="@/assets/images/login/logo.png" alt="" class="logoImg"> -->
        <h1 class="title">大招云</h1>

        <!-- <p class="logoTitle">随时随地看展 时时刻刻参展</p> -->
        <p class="logoTitle">随时随地选品，轻轻松松采购。</p>
        <p class="logoTitle"></p>

        <div class="loginForm">
            <div class="loginMiddle">
                <div class="text-avatar" style="text-align:left">
                    <img :src="avatar?avatar:portrait" alt class="userImg" />
                    <p class="userName">{{nickname?nickname:''}}</p>
                </div>
            </div>
            <!-- headimgurl?headimgurl: -->
            <!-- <van-field
        v-model="username"
        ref="username"
        clearable
        left-icon="icon iconfont iconaccount"
        placeholder="请输入您的账号"
        @click-right-icon="$toast('question')"
            />-->
            <!-- 注册 -->
            <van-form @submit="hanldSubClick">
                <van-field
                    v-model="password"
                    ref="password"
                    v-if="true"
                    clearable
                    placeholder="请输入您的密码"
                />
                <div class="mobile" @click="toCodeLogin">
                    手机登录
                    <van-icon name="arrow" size="14" />
                </div>
                <!-- <van-checkbox
        v-model="KeepPassword"
        shape="square"
        checked-color="#D0111B"
        style="padding: 5px 10px;"
                >记住密码</van-checkbox>-->

                <van-button
                    type="info"
                    loading-type="spinner"
                    loading-text="登 录 中..."
                    class="idea_btn submitBtn"
                    native-type="submit"
                >下一步</van-button>
            </van-form>
            <!-- <div class="wechat" @click="wechatLogin">
                    <img :src="wechatImg" alt />
            </div>-->
        </div>
    </div>
</template>

<script>
import * as Api from '@/api/customer/login'
import * as Api_1 from '@/api/customer/personal'
import { util } from '@/utils'
import {
    Field,
    Button,
    Toast,
    Checkbox,
    CheckboxGroup,
    Form,
    Uploader,
} from 'vant'
import { mapActions, mapGetters } from 'vuex'
import { setTimeout } from 'timers'
import codeLoginVue from './codeLogin.vue'

export default {
    name: 'login',
    components: {
        Field,
        Button,
        Toast,
        Checkbox,
        CheckboxGroup,
        Form,
        Uploader,
    },
    data() {
        return {
            portrait: require('@/assets/images/login/portrait.png'), // 空头像
            // portrait:require('@/assets/images/login/portrait.png'), // 空头像
            // 密码
            password: '',
            avatar: '',
            userImage: [], //上传的头像
            deletable: false, //是否显示删除按钮
            detail: {}, // 用户信息
            nickname: '',
            avatar: '',
            wechatImg: require('@/assets/images/login/wechat.png'),
        }
    },
    created() {
        this.handleDetail()
    },
    methods: {
        // 微信登录
        wechatLogin() {
            this.getPJ()
        },
        // 获取js配置
        getPJ() {
            Api.getAppId()
                .then((res) => {
                    console.log('获取appid', res)
                    this.appId = res.data.appId
                    console.log('appid', this.appId)
                    // 获取code
                    this.getCode()
                })
                .catch((err) => {
                    console.log('err', err)
                })
        },

        getCode() {
            console.log('getcode')
            const _this = this
            var code = _this.getUrlParam('code')
            // var local = 'http://192.168.31.221:9000/'

            if (code == null || code == '') {
                window.location.href =
                    'http://www.dzy315.com/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_userinfo&state=123&redirect_uri=http://www.dzy315.com/&response_type=code'
            } else {
                _this.code = code
                console.log('code', _this.code)
                var data = {
                    code: _this.code,
                }
                _this.getopenid_data(data)
            }
        },
        getUrlParam(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
            let url = window.location.href.split('#')[0]
            let search = url.split('?')[1]
            if (search) {
                var r = search.substr(0).match(reg)
                if (r !== null) return unescape(r[2])
                return null
            } else {
                return null
            }
        },
        //   手机号登陆
        toCodeLogin() {
            this.$router.push({
                path: '/codeLogin',
            })
        },
        // 获取用户信息
        handleDetail() {
            let token = util.getCookie('dzy_token')
            if (token) {
                Api_1.getUserMyIndex()
                    .then((res) => {
                        let { code, msg, data, total } = res
                        if (code == 200) {
                            this.detail = data
                            console.log('detail', this.detail)
                            this.nickname = data.userInfo.nickname
                            this.avatar = data.userInfo.avatar
                        }
                    })
                    .catch((err) => {
                        this.detail = {}
                    })
            }
        },
        //   上传头像
        // afterRead (file) {
        //     console.log('上传头像',file.file.path);
        //     this.avatarShow = false
        //     this.portrait = file.file.path
        // },
        //   选择头像
        // chooseImg_man () {
        //     this.portrait = this.portrait_man
        //     this.avatarShow = false
        // },
        // chooseImg_women () {
        //     this.portrait = this.portrait_women
        //     this.avatarShow = false

        // },

        // 查看密码
        // handleLook() {
        //   this.lookPassword = !this.lookPassword;
        // },

        // 点击登录登录
        hanldSubClick() {
            if (this.username == '') {
                util.error('请输入您的账号')
            } else if (this.password == '') {
                util.error('请输入您的密码')
            } else if (this.password.length < 6) {
                util.error('密码不能少于6位')
            } else {
                let params = {
                    password: this.password,
                    openId: util.getCookie('dzy_openId'),
                }
                // 请求登录
                this.onSubmt(params)
            }
        },
        // 请求登录
        onSubmt(params) {
            console.log(params)
            util.showLoading()
            Api.loginInit(params)
                .then((res) => {
                    console.log('res', res)
                    if (res.code == 200) {
                        let { access_token, username } = res.data
                        this.$router.push({
                            name: 'home',
                        })
                    } else {
                        this_.$message.error(res.message)
                    }
                    util.hideLoading()
                })
                .catch((err) => {
                    console.log(err)
                    util.hideLoading()
                })
        },
    },

    computed: {},

    mounted() {},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/base/calc_vm.scss';
@import './login.scss';
</style>

<style lang="scss">
@import '@/assets/styles/base/calc_vm.scss';
// 登录页图标样式
.login {
    .title {
        text-align: center;
    }
    .logoTitle {
        text-align: center;
        margin-top: 0 !important;
        line-height: 2;
    }
    .loginMiddle {
        display: flex;
        div {
            margin: 1.3rem auto 0;
            .userImg {
                width: 1.7rem !important;
                height: 1.7rem !important;
            }
            .userName {
                color: #9da1a6;
                margin-top: 0.15rem;
                text-align: center;
            }
        }
    }
    .mobile {
        color: #9da1a6ff;
        text-align: right;
        padding: 10px 0;
        margin: 0 15px;
        .van-icon {
            vertical-align: middle;
        }
    }

    .upLoader {
        width: 3rem;
        margin: 0 auto;
        display: block;
        .van-uploader__preview-image {
            width: 1.7rem;
            height: 1.7rem;
            border-radius: 50%;
        }
        .userName {
            margin-top: 0.1rem;
        }
        .van-uploader__input-wrapper {
            margin: 0 auto;
            display: block;
        }
        .van-uploader__preview {
            display: block;
            margin: 0 auto;
        }
    }
    .iconfont {
        font-size: vw(50);
        color: #dedede;
    }
    .van-checkbox__icon .van-icon {
        border: 1px solid #dedede;
    }
    .wechat {
        width: 0.7rem;
        height: 0.7rem;
        margin: 0 auto;
        img {
            max-width: 100%;
        }
    }
}
</style>

