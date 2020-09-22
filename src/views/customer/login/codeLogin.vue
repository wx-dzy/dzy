<template>
    <div class="login">
        <!-- <img src="@/assets/images/login/logo.png" alt="" class="logoImg"> -->
        <h1 class="title">大招云</h1>
        <!-- <p class="logoTitle">随时随地看展，时时刻刻参展。</p> -->
        <p class="logoTitle">随时随地选品，轻轻松松采购。</p>
        <!-- <p class="logoTitle">
      首次登陆请完成您的主体咖个人信息,
      <br />我们将为您提供更好的服务,快来完善吧!
        </p>-->
        <p class="logoTitle"></p>

        <div class="loginForm">
            <!-- <van-uploader
                class="upLoader"
                :max-count="1"
                accept="image/*"
                v-model="userImage"
                :deletable="deletable"
            >-->
            <div class="text-center" v-show="isDisabled">
                <img :src="headimgurl" alt class="userImg" />
                <p class="userName" style="line-height: 2;">{{nickname}}</p>
                <!-- <p class="userName">{{username}}</p> -->
            </div>
            <!-- </van-uploader> -->

            <!-- <van-field
        v-model="username"
        ref="username"
        clearable
        left-icon="icon iconfont iconaccount"
        placeholder="请输入您的账号"
        @click-right-icon="$toast('question')"
            />-->
            <!-- 注册 -->
            <van-form @submit="hanldSubClick" v-if="pwd">
                <van-field
                    v-model="password"
                    ref="password"
                    v-if="true"
                    clearable
                    right-icon="icon iconfont iconhide"
                    :type="lookPassword ? 'password' : 'text'"
                    @click-right-icon="handleLook"
                    placeholder="请输入昵称"
                />
                <van-field
                    v-model="password"
                    ref="password"
                    v-if="true"
                    clearable
                    right-icon="icon iconfont iconhide"
                    :type="lookPassword ? 'password' : 'text'"
                    @click-right-icon="handleLook"
                    placeholder="请输入您的密码"
                />
                <van-field
                    v-model="password"
                    ref="password"
                    v-if="true"
                    clearable
                    right-icon="icon iconfont iconhide"
                    :type="lookPassword ? 'password' : 'text'"
                    @click-right-icon="handleLook"
                    placeholder="请再次输入您的密码"
                />

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

            <!-- 验证码登录 -->
            <van-form @submit="hanldSubClick" v-if="!pwd">
                <van-field
                    v-model="mobile"
                    name="mobile"
                    ref="mobile"
                    v-if="true"
                    type="tel"
                    placeholder="请输入手机号"
                />
                <van-field
                    v-model="verification"
                    name="verification"
                    ref="verification"
                    v-if="true"
                    type="digit"
                    placeholder="请输入验证码"
                >
                    <template #button>
                        <van-button
                            v-show="!isBtn"
                            size="small"
                            type="primary"
                            native-type="button"
                            @click="getVerification"
                        >获取验证码</van-button>
                        <van-button
                            v-show="isBtn"
                            size="small"
                            type="primary"
                            disabled
                            native-type="button"
                            @click="getVerification"
                        >{{count}} s</van-button>
                    </template>
                </van-field>

                <!-- <van-checkbox
        v-model="KeepPassword"
        shape="square"
        checked-color="#D0111B"
        style="padding: 5px 10px;"
                >记住密码</van-checkbox>-->

                <van-button
                    class="submitBtn"
                    type="info"
                    loading-type="spinner"
                    loading-text="登 录 中..."
                    native-type="submit"
                >登 录</van-button>
            </van-form>
            <div class="otherLogin">其他登录方式</div>
            <div class="wechat" @click="wechatLogin">
                <img :src="wechatImg" alt />
            </div>
        </div>
    </div>
</template>

<script>
import * as Api from '@/api/customer/login'
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
import img3 from '@/assets/images/login/portrait.png'

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
            pwd: false, //是否是首次
            mobile: '', // 手机号
            userImg: img3,
            verification: '', // 验证码
            // 记住密码
            KeepPassword: true,
            // 查看密码
            lookPassword: true,
            // 账户
            username: '',
            // 密码
            password: '',
            code: '',
            appId: '',
            userImage: [], //上传的头像
            deletable: false, //是否显示删除按钮
            // openId: localStorage.getItem('openId'),
            openId: localStorage.getItem('dzy_openId'),
            // headimgurl: localStorage.getItem("headimgurl"), // 用户头像
            // nickname: localStorage.getItem("nickname"), // 用户昵称
            headimgurl: '', // 用户头像
            nickname: '', // 用户昵称
            isBtn: false, // 是否显示禁用状态按钮
            count: 60, // 获取验证码倒计时
            timer: null,
            wechatImg: require('@/assets/images/login/wechat.png'),
            isDisabled: false,
        }
    },
    created() {
        console.log('进入手机号登陆')

        this.getPJ()
        console.log('openId', this.openId)
        // this.getInfo()
        // this.getUrlParam()
        // 获取本地登录信息
        let username = localStorage.getItem('username')
        let password = localStorage.getItem('password')
        this.username = username
        this.password = password

        if (username && password) {
            // this.KeepPassword = true;
            setTimeout(() => {
                // this.hanldSubClick();
            }, 1000)
        }
    },
    watch: {
        //tel 是data() 里面的数据tel，newVal是tel变化后的值，oldVal是tel变化前的值
        headimgurl: {
            handler(newVal, oldVal) {
                console.log(newVal, oldVal)
                if (newVal) {
                    this.isDisabled = true
                } else {
                    this.isDisabled = false
                }
            },
            // deep属性对对象进行深度监听
            // deep: true,
            // 这样使用watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值        发生改变才会执行。
            // 如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。比如当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true。
            immediate: true,
        },
    },
    methods: {
        // 微信登录
        wechatLogin() {
            // this.getPJ()
            let params = {
                openId: this.openId,
            }
            Api.loginInit(params)
                .then((res) => {
                    console.log('微信登录', res)
                    if (res.code == 200) {
                        let {
                            accessToken,
                            firstLogin,
                            userId,
                            username,
                        } = res.data
                        localStorage.setItem('dzy_token', accessToken, 7)
                        if (firstLogin == 1) {
                            this.$router.push({
                                name: 'firstLogin',
                            })
                        } else if (firstLogin == 0) {
                            this.$router.push({
                                name: 'home',
                            })
                        }
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
        // 获取code
        // getUrlParam () {
        //           var reg = new RegExp('(^|&)' + 'code' + '=([^&]*)(&|$)')
        //           console.log('reg',reg);

        //           let url = window.location.href.split('#')[0]
        //           console.log('url',url);7

        //           let search = url.split('?')[1]
        //           if (search) {
        //               var r = search.substr(0).match(reg)
        //               if (r !== null) return unescape(r[2])
        //               return null
        //           } else {
        //               return null
        //           }
        //       },
        // 获取js配置
        getPJ() {
            console.log('appId', this.appId)
            if (!this.appId) {
                Api.getAppId()
                    .then((res) => {
                        console.log('获取appid', res)
                        const { code, data, msg, total } = res
                        this.appId = data.appId
                        console.log('appid', this.appId)
                        // 获取code
                        this.getCode()
                    })
                    .catch((err) => {
                        console.log('err', err)
                    })
            } else {
                this.getCode()
            }
        },

        getCode() {
            const _this = this
            var code = _this.getUrlParam('code')
            // var local = 'http://192.168.31.221:9000/'
 
            if (!code) {
                // window.location.href =
                //     'https://www.dzy315.com/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_base&state=123&redirect_uri=http://192.168.0.101:9000/&response_type=code'
                // window.location.href =
                //     'https://www.dzy315.com/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_base&state=123&redirect_uri=http://192.168.31.72:9000/&response_type=code'
                // window.location.href = 'https://www.dzy315.com/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_base&state=123&redirect_uri=https://www.dzy315.com/codeLogin&response_type=code'
                // 本地公用地址
                window.location.href="https://www.dzy315.com/get-weixin-code.html?appid=wxc7ed228b39eec84c&scope=snsapi_base&state=123&redirect_uri=http://127.0.0.1:9000&response_type=code&scope=snsapi_base&state=123"
            } else {
                _this.code = code
                console.log('code', _this.code)
                var data = {
                    code: _this.code,
                }
                _this.getopenid_data(data)
            }
        },

        // 获取openid
        getopenid_data(data) {
            console.log('data', data)
            console.log('openId', this.openId)
            if (!this.openId) {
                console.log('code_1', this.code)
                Api.getOpenId(this.code).then((res) => {
                    console.log('获取openid', res)
                    if (res.code == 200) {
                        // "moduleId":1,
                        localStorage.setItem('dzy_openId', res.data.openId, 7)
                        // this.openId = util.getCookie('dzy_openId')
                        this.openId = res.data.openId

                        // localStorage.setItem('openId',res.data.openId)
                        // this.openId = localStorage.getItem('openId')
                        this.getInfo()
                    }
                })
            } else {
                this.getInfo()
            }
        },
        // 获取用户信息
        getInfo() {
            if (!this.headimgurl || !this.nickname) {
                Api.getUserInfo(this.openId).then((res) => {
                    console.log('获取用户信息', res)
                    if (res.code == 200) {
                        this.headimgurl = res.data.headimgurl
                        this.nickname = res.data.nickname
                        let wxInfo = {
                            headimgurl: res.data.headimgurl,
                            nickname: res.data.nickname,
                        }
                        localStorage.setItem(
                            'dzy_wxInfo',
                            JSON.stringify(wxInfo),
                            7
                        )
                        // location.reload()
                    }
                })
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
        // 获取验证码
        getVerification() {
            let _this = this
            console.log('获取验证码', this.mobile)
            if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
                this.$toast('请输入正确手机号')
            } else {
                Api.getMobile(_this.mobile)
                    // Api.getMobile(this.code,this.mobile)
                    .then((res) => {
                        console.log('验证码', res)
                        if (res.code == 200) {
                            this.isBtn = true
                            this.showTimer()
                            // this.$toast(res.msg)
                            this.$toast('验证吗发送成功！')
                        }
                    })
            }
        },
        // 获取验证码倒计时
        showTimer() {
            const TIME_COUNT = 59
            if (!this.timer) {
                this.count = TIME_COUNT
                //  this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--
                    } else {
                        this.isBtn = false
                        clearInterval(this.timer)
                        this.timer = null
                    }
                }, 1000)
            }
        },

        // 查看密码
        handleLook() {
            this.lookPassword = !this.lookPassword
        },

        // 点击登录登录
        hanldSubClick() {
            // if (this.username == "") {
            //   util.error("请输入您的账号");
            // } else if (this.password == "") {
            //   util.error("请输入您的密码");
            // } else if (this.password.length < 6) {
            //   util.error("密码不能少于6位");
            // } else {
            //   let params = {
            //     username: this.username,
            //     password: this.password,
            //     moduleId: 4,
            //     code: this.$route.query.code ? this.$route.query.code : ""
            //     // "moduleId":1,
            //   };
            if (this.mobile == '') {
                util.error('请输入您的手机号')
            } else if (this.verification == '') {
                util.error('请输入您的验证码')
            } else {
                if (this.pwd == true) {
                    let params = {
                        username: this.username,
                        password: this.password,
                        moduleId: 4,
                        code: this.$route.query.code
                            ? this.$route.query.code
                            : '',
                        // "moduleId":1,
                    }
                } else {
                    let params = {
                        verifyCode: this.verification,
                        mobile: this.mobile,
                        openId: this.openId,
                    }
                    console.log('params', params)

                    // 请求登录
                    this.onSubmt(params)
                }
            }
        },
        // 请求登录
        onSubmt(params) {
            console.log(params)
            util.showLoading()
            Api.codeInit(params)
                .then((res) => {
                    console.log('res', res)
                    let { code, data, msg, total } = res
                    if (res.code == 417) {
                        this_.$message.error(res.message)
                    } else if (res.code == 200) {
                        // localStorage.setItem("userId", res.data.userId);
                        localStorage.setItem(
                            'dzy_userInfo',
                            JSON.stringify(data),
                            7
                        )
                        localStorage.setItem('dzy_token', data.accessToken, 7)
                        // let { access_token, username } = res.data;
                        this.$router.push({
                            path: '/home',
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

    mounted() {
        if (this.mobile == '') {
            this.$refs.mobile.focus()
        } else if (this.verification == '') {
            this.$refs.verification.focus()
        }
    },
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
    .upLoader {
        width: 3rem;
        margin: 0 auto;
        display: block;
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
    .otherLogin {
        width: 100%;
        text-align: center;
        color: #9b9b9bff;
    }
    .wechat {
        width: 0.7rem;
        height: 0.7rem;
        margin: 0.2rem auto 0;
        img {
            max-width: 100%;
        }
    }
}
</style>