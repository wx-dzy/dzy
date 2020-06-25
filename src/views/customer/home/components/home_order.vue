// 参观预约 介绍 id=1272919606905835521
<template>
  <div class="home_order">
    <van-form :validate-first="true" label-width="100" @failed="onFailed">
      <van-field
        v-model="formData.name"
        lable="姓名"
        name="name"

        placeholder="请填写姓名"
        :rules="[{ required: true, message: '请填写姓名' }]"
        clearable
        :autofocus='true'
      />
      <!-- 通过 validatetel 进行正则校验 -->
      <van-field
        v-model="formData.tel"
        name="tel"
        type="tel"
        lable="手机号"
        placeholder="请填写手机号"
        :rules="[{ validatetel, message: '请正确填写手机号' }]"
      />

      <van-field v-model="formData.sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
      <!-- 通过 validator 进行函数校验 -->
      <van-field
        v-model="formData.value2"
        name="validator"
        placeholder="函数校验"
        :rules="[{ validator, message: '请输入正确内容' }]"
      />
      <!-- 通过 validator 进行异步函数校验 -->
      <van-field
        v-model="formData.value3"
        name="asyncValidator"
        placeholder="异步函数校验"
        :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
import VideoDemo from "@/components/customer/videoPlay/index.vue";

// import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "home_order",
  components: {
    VideoDemo // 播放
    // footerNav
  },
  data() {
    // const validatetel = (rule, value, callback) => {
    //   const reg = ;
    //   if (!reg.test(value)) {
    //     callback(new Error("手机号码有误，请重填"));
    //   } else {
    //     callback();
    //   }
    // };
    return {
      loading: false,
      id: "",
      formData: {
        name: "晓刚0-0",
        tel: "18801012566",
        sms: '',

        value2: "",
        value3: ""
      },
      validatetel: /^1[3456789]\d{9}$/,
      pattern: /\d{6}/
    };
  },
  created() {
    this.id = this.$route.query.id;
  },
  methods: {
    // 校验函数返回 true 表示校验通过，false 表示不通过
    validator(val) {
      return /1\d{10}/.test(val);
    },
    // 异步校验函数返回 Promise
    asyncValidator(val) {
      return new Promise(resolve => {
        Toast.loading("验证中...");

        setTimeout(() => {
          Toast.clear();
          resolve(/\d{6}/.test(val));
        }, 1000);
      });
    },
    onFailed(errorInfo) {
      console.log("failed", errorInfo);
    },

    // 请求参数 params
    onSubmit(params) {
      this.loading = true;

      Api.setShowOrderAdd(params)
        .then(res => {
          let { data, code, msg, total } = res;
          this.loading = false;
          // 数据全部加载完成
          if (code == 200) {
          }
          // }
        })
        .catch(err => {
          console.log(err, "err");
        });
    },

    // 查看详情
    // handleLook(_id) {
    //   this.$router.push({
    //     name: "toBeQuotedDetails",
    //     query: {
    //       inquiryId: _id
    //     }
    //   });
    // }
  },

  computed: {},

  beforeRouteLeave(to, from, next) {
    // 主页禁止返回
    if (to.fullPath == "/login") {
      next(false);
    } else {
      next();
    }
  },

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  }
};
</script>

<style lang="scss">
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "../home.scss";
.home_order {
  .nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
  }
}
</style>

