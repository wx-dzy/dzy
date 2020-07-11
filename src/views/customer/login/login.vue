<template>
  <div class="login">
    <!-- <img src="@/assets/images/login/logo.png" alt="" class="logoImg"> -->
    <h1 class="title">大招云</h1>
    <!-- <p class="logoTitle">随时随地看展 时时刻刻参展</p> -->
    <p class="logoTitle">
      首次登陆请完成您的主体咖个人信息,
      <br />我们将为您提供更好的服务,快来完善吧!
    </p>
    <p class="logoTitle"></p>
 
    <div class="loginForm">
      <van-uploader class="upLoader" :max-count="1" accept="image/*" v-model="userImage" :deletable=deletable>
        <div class="text-center">
          <img :src="userImg" alt class="userImg" />
          <p class="userName" @click="upUserImage">上传头像</p>
          <!-- <p class="userName">{{username}}</p> -->
        </div>
      </van-uploader>
      

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
          class="idea_btn"
          native-type="submit"
        >登 录</van-button>
      </van-form>

      <!-- 验证码登录 -->
      <van-form @submit="hanldSubClick" v-if="!pwd">
        <van-field v-model="mobile" name="mobile" ref="mobile" v-if="true" type="tel" placeholder="请输入手机号" />
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
              size="small"
              type="primary"
              native-type="button"
              @click="getVerification"
            >获取验证码</van-button>
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
    </div>
  </div>
</template>

<script>
import * as Api from "@/api/customer/login";
import { util } from "@/utils";
import { Field, Button, Toast, Checkbox, CheckboxGroup, Form, Uploader } from "vant";
import { mapActions, mapGetters } from "vuex";
import { setTimeout } from "timers";
import img3 from "@/assets/images/login/portrait.png";

export default {
  name: "login",
  components: {
    Field,
    Button,
    Toast,
    Checkbox,
    CheckboxGroup,
    Form,
    Uploader
  },

  data() {
    return {
      pwd: false, //是否是密码登录
      mobile: '',// 手机号
      userImg: img3,
      verification: '', // 验证码
      // 记住密码
      KeepPassword: true,
      // 查看密码
      lookPassword: true,
      // 账户
      username: "",
      // 密码
      password: "",
      code:'',
      appId: '',
      userImage: [], //上传的头像
      deletable: false, //是否显示删除按钮
      // userInfo:{
      // access_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZS1pZCJdLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJwYXJlbnRVc2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTY5NDYxNzQ0LCJ1c2VySWQiOjEwMDksImF1dGhvcml0aWVzIjpbIjQ2NjNkMTkyLWI4N2ItNDhkMi04MzMwLWFkNTBhYWFiMjg1YiIsIi91c2VyL3N5cy91c2VyL3BhZ2UiLCJiNzVkNzA3ZS1hNDAxLTRiZDEtYWMzNC1jMTNiYWMwMjNlODEiLCIzZDE2YmU5Yy1mOGVlLTQ2MDQtOTk5Ny0yOGE5ZWQ2OGM5OWYiLCJST0xFX1VTRVIiLCIvdXNlci9zeXMvcm9sZS9wYWdlIiwicmZxOnF1b3RhdGlvbjptYW5hZ2U6cGFnZSIsIi9yZnEvcXVvdGF0aW9uL21hbmFnZS9wYWdlIiwic3lzOnVzZXI6YWxsIiwic3lzOnJvbGU6cGFnZSIsIjQyZjQ4MDNkLTkzMDEtNDAxMy05YTk2LTIxYTdjZmFlNDUzNSJdLCJqdGkiOiIzNTZlYTdmNy1hOGJjLTQyMzQtOTlhMS1mMjljY2ZhOGEyMWUiLCJwYXJlbnRJZCI6MTAwOSwiY2xpZW50X2lkIjoiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.2XH6gHkIvEqUMVitrIfCUP277nFw1VdMMUWusZjVWEo",
      // expires_in:2591998,
      // jti:"356ea7f7-a8bc-4234-99a1-f29ccfa8a21e",
      // parentId:1009,
      // parentUsername:"admin",
      // refresh_token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZS1pZCJdLCJ1c2VyX25hbWUiOiJhZG1pbiIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSJdLCJhdGkiOiIzNTZlYTdmNy1hOGJjLTQyMzQtOTlhMS1mMjljY2ZhOGEyMWUiLCJwYXJlbnRVc2VybmFtZSI6ImFkbWluIiwiZXhwIjoxNTY5NDYxNzQ0LCJ1c2VySWQiOjEwMDksImF1dGhvcml0aWVzIjpbIjQ2NjNkMTkyLWI4N2ItNDhkMi04MzMwLWFkNTBhYWFiMjg1YiIsIi91c2VyL3N5cy91c2VyL3BhZ2UiLCJiNzVkNzA3ZS1hNDAxLTRiZDEtYWMzNC1jMTNiYWMwMjNlODEiLCIzZDE2YmU5Yy1mOGVlLTQ2MDQtOTk5Ny0yOGE5ZWQ2OGM5OWYiLCJST0xFX1VTRVIiLCIvdXNlci9zeXMvcm9sZS9wYWdlIiwicmZxOnF1b3RhdGlvbjptYW5hZ2U6cGFnZSIsIi9yZnEvcXVvdGF0aW9uL21hbmFnZS9wYWdlIiwic3lzOnVzZXI6YWxsIiwic3lzOnJvbGU6cGFnZSIsIjQyZjQ4MDNkLTkzMDEtNDAxMy05YTk2LTIxYTdjZmFlNDUzNSJdLCJqdGkiOiI5ZjhkZGIzZi00NWIxLTQwYTQtODAzNy1lYjdjMzkyY2MxMDQiLCJwYXJlbnRJZCI6MTAwOSwiY2xpZW50X2lkIjoiaGx3bC1wbGF0Zm9ybS1yZXNvdXJjZSIsInVzZXJuYW1lIjoiYWRtaW4ifQ.avCxm4dtJsKKGq5cGTWm8F0aFA9rK3ThKcsUJH_DJXE",
      // scope:"read write",
      // token_type:"bearer",
      // userId:1009,
      // username:"admin",
      // },
    };
  },
    created() {
    this.getPJ()
    // this.getUrlParam()
    // 获取本地登录信息
    let username = util.getCookie("username");
    let password = util.getCookie("password");
    this.username = username;
    this.password = password;

    if (username && password) {
      // this.KeepPassword = true;
      setTimeout(() => {
        // this.hanldSubClick();
      }, 1000);
    }
  },
  methods: {
    // 获取openid
    getopenid_data(data) {
      console.log('data',this.code);
      
      let url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + this.appId + '&secret=SECRET&code=' + this.code + '&grant_type=authorization_code'
      Api.getOpenId(url).then( res => {
        console.log( 'openid',res);
        
      })
    },
    // 上传头像
    upUserImage () {
      
    },
    // 获取code
    getUrlParam () {
              var reg = new RegExp('(^|&)' + 'code' + '=([^&]*)(&|$)')
              console.log('reg',reg);
              
              let url = window.location.href.split('#')[0]
              console.log('url',url);
              
              let search = url.split('?')[1]
              if (search) {
                  var r = search.substr(0).match(reg)
                  if (r !== null) return unescape(r[2])
                  return null
              } else {
                  return null
              }
          },
    // 获取js配置
    getPJ () {
      Api.getAppId()
      .then(res => {
        console.log('获取appid',res)
        this.appId = res.data.appId
        console.log('appid',this.appId)
        // 获取code
        this.getCode()
      })
      .catch( err => {
        console.log('err',err);
        
      })
    },
    getCode () {
      const _this = this
            var code = _this.getUrlParam('code') 
            // var local = 'http://192.168.31.221:9000/'

            if (code == null || code == '') {
                window.location.href = 'http://121.196.122.19/get-weixin-code.html?appid=' + this.appId + '7                  &scope=snsapi_base&state=123&redirect_uri=http://127.0.0.1:9000&response_type=code&scope=snsapi_base&state=123'

            } else {
              _this.code = code
              console.log('code',_this.code);
              var data = {
                code: _this.code
              }
              _this.getopenid_data(data)
            }
        },
    getUrlParam (name) {
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
    getVerification () {
      console.log('获取验证码',this.mobile);
      Api.getMobile(this.mobile)
      .then( res=> {
        console.log('验证码',res);
        
      })
    },
    // 查看密码
    handleLook() {
      this.lookPassword = !this.lookPassword;
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
      if (this.mobile == "") {
        util.error("请输入您的手机号");
      } else if (this.verification == "") {
        util.error("请输入您的验证码");
      }else {
        let params = {
          username: this.username,
          password: this.password,
          moduleId: 4,
          code: this.$route.query.code ? this.$route.query.code : ""
          // "moduleId":1,
        };
        // 请求登录
        this.onSubmt(params);
      }
    },
    // 请求登录
    onSubmt(params) {
      console.log(params);
      util.showLoading();
      Api.loginInit(params)
        .then(res => {
          // console.log(res,'res')
          if (res.code == 417) {
            this_.$message.error(res.message);
          } else if (res.code == 200) {
            let { access_token, username } = res.data;

            // // 是否记住密码
            // if (this.KeepPassword) {
            //   // 本地缓存密码
            //   util.setCookie("password", this.password, 365);
            // } else {
            //   util.clearCookie("password");
            // }

            // 本地缓存
            localStorage.setItem("userInfo", JSON.stringify(res.data));
            util.setCookie("dzy_token", access_token, 365);
            util.setCookie("username", username, 365);
            this.$router.push({
              name: "home"
            });
            //  console.log(
            //     util.getCookie("dzy_token"),
            //     util.getCookie("username"),
            //     util.getCookie("password")
            // )
          }
          util.hideLoading();
        })
        .catch(err => {
          console.log(err);
          util.hideLoading();
        });
    }
  },

  computed: {},

  mounted() {
    if (this.mobile == "") {
      this.$refs.mobile.focus();
    } else if (this.verification == "") {
      this.$refs.verification.focus();
    }
  },


};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./login.scss";
</style>

<style lang="scss">
@import "@/assets/styles/base/calc_vm.scss";
// 登录页图标样式
.login {
  .upLoader {
    width: 3rem;
    margin: 0 auto;
    display: block;
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
}
</style>

