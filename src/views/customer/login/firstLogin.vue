<template>
  <div class="login">
    <!-- <img src="@/assets/images/login/logo.png" alt="" class="logoImg"> -->
    <h1 class="title">大招云</h1>

    <p class="logoTitle">
      首次登陆请完成您的主体咖个人信息,
      <br />我们将为您提供更好的服务,快来完善吧!
    </p>
    <p class="logoTitle"></p>

    <div class="loginForm">
      <div class="loginMiddle">
        <div class="text-left" style="text-align:right" @click="chooseImg_man" v-show="avatarShow">
          <img :src="portrait_man" alt class="userImg" />
          <p class="userName"></p>
        </div>
        <div>
          <van-uploader
            class="upLoader"
            :max-count="1"
            accept="image/*"
            v-model="userImage"
            :deletable="deletable"
            :after-read="afterRead"
          >
            <div class="text-center">
              <img :src="portrait" class="userImg" />
              <p class="userName" v-show="avatarShow">上传头像</p>
              <!-- <p class="userName">{{username}}</p> -->
            </div>
          </van-uploader>
        </div>
        <div
          class="text-right"
          style="text-align:left"
          @click="chooseImg_women"
          v-show="avatarShow"
        >
          <img :src="portrait_women" alt class="userImg" />
          <p class="userName">{{nickname}}</p>
        </div>
      </div>

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
          v-model="nickname"
          ref="password"
          v-if="true"
          clearable
          placeholder="请输入昵称"
        />
        <van-field
          v-model="password"
          ref="password"
          v-if="true"
          clearable
          placeholder="请输入您的密码"
        />
        <van-field
          v-model="passwordConfirm"
          ref="password"
          v-if="true"
          clearable
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
    </div>
  </div>
</template>

<script>
import * as Api from "@/api/customer/login";
import { util } from "@/utils";
import {
  Field,
  Button,
  Toast,
  Checkbox,
  CheckboxGroup,
  Form,
  Uploader
} from "vant";
import { mapActions, mapGetters } from "vuex";
import { setTimeout } from "timers";

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
        portrait_man: require('@/assets/images/login/man.png'),
        portrait_women: require('@/assets/images/login/women.png'),
        avatarShow: true, // 是否显示左右两侧头像
        portrait:require('@/assets/images/login/portrait.png'), // 空头像
      
      // 昵称
      nickname: "",
      // 密码
      password: "",
      passwordConfirm:'', //确认密码
      avatar: '',
      userImage: [], //上传的头像
      deletable: false, //是否显示删除按钮
    };
  },
  created() {
  },
  methods: {
    //   上传头像
    afterRead (file) {
        console.log('上传头像',file.file.path);
        this.avatarShow = false
        this.portrait = file.file.path
    },
    //   选择头像
    chooseImg_man () {
        this.portrait = this.portrait_man
        this.avatarShow = false
    },
    chooseImg_women () {
        this.portrait = this.portrait_women
        this.avatarShow = false

    },

    // 查看密码
    handleLook() {
      this.lookPassword = !this.lookPassword;
    },

    // 点击登录登录
    hanldSubClick() {
      if (this.username == "") {
        util.error("请输入您的账号");
      } else if (this.password == "") {
        util.error("请输入您的密码");
      } else if (this.password.length < 6) {
        util.error("密码不能少于6位");
      } else if(this.passwordConfirm != this.password){
        util.error("确认密码错误");
      } else {
        let params = {
            id: sessionStorage.getItem('userId'),
          nickname: this.nickname,
          password: this.password,
          avatar: this.portrait,
        };
          // 请求登录
          this.onSubmt(params);
        }
    },
    // 请求登录
    onSubmt(params) {
      console.log(params);
      util.showLoading();
      Api.register(params)
        .then(res => {
          console.log("res", res);
          if (res.code == 417) {
            this_.$message.error(res.message);
          } else if (res.code == 200) {
            let { access_token, username } = res.data;
            this.$router.push({
              name: "home"
            });
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
  }
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
  .loginMiddle {
    display: flex;
    div {
      flex: 1;
      .userImg {
        width: 1.7rem !important;
        height: 1.7rem !important;
      }
      .userName {
        color: #9da1a6;
        margin-top: 0.15rem;
      }
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
}
</style>

