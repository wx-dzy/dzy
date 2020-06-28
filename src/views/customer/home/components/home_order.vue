// 参观预约 介绍 id=1272919606905835521
<template>
  <div class="home_order">
    <van-form :validate-first="true" label-width="2.32rem" @failed="onFailed">
      <p class="redWrap">
        <i class="red">*</i>必填项：
      </p>
      <van-field
        v-model="formData.realName"
        name="realName"
        label="姓名"
        placeholder="请输入您的姓名"
        :rules="[{ required: true, message: '请输入您的姓名' }]"
        clearable
      />

      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="formData.mobile"
        name="mobile"
        type="tel"
        label="手机号"
        placeholder="请输入您的手机号"
        :rules="[{ pattern, message: '请正确填写手机号' }]"
        clearable
      />

      <van-field
        v-model="formData.verifyCode"
        name="verifyCode"
        center
        label="验证码"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
        clearable
      >
        <template #button>
          <van-button
            v-show="!isSend"
            size="small"
            color="rgba(157,161,166,1)"
            type="primary"
            @click="handleTime"
          >获取验证码</van-button>

          <van-button
            v-show="isSend"
            size="small"
            color="rgba(157,161,166,1)"
            type="primary"
          >{{ sendNum ? sendNum + 's': '' }}</van-button>
        </template>
      </van-field>

      <van-field
        readonly
        clickable
        :value="formData.orderDate"
        name="calendar"
        label="预计参观日期"
        placeholder="点击选择日期"
        :rules="[{ required: true, message: '请选择日期' }]"
        @click="showCalendar = true"
      />
      <van-calendar v-model="showCalendar" @confirm="onConfirm" />

      <p class="redWrap">选填项：</p>

      <van-field name="card" label="名片" placeholder="（上传名片更多功能可使用）">
        <template #input>
          <uploaderImg :imgSrc.sync="imgSrc" :maxCount="1" />
          <!-- <van-uploader/> -->
        </template>
      </van-field>

      <van-field
        v-model="formData.businessName"
        name="businessName"
        label="企业名称"
        placeholder="请输入您当前所在企业的名称"
        clearable
      />
      <van-field
        v-model="formData.businessPost"
        name="businessPost"
        label="职   位"
        placeholder="请输入您当前所在企业的职位"
        clearable
      />
      <van-field
        v-model="formData.businessEmail"
        name="businessEmail"
        label="邮   箱"
        placeholder="请输入您当前所在企业的邮箱"
        clearable
      />

      <van-field
        v-model="formData.businessRemarks"
        name="businessRemarks"
        rows="1"
        autosize
        label="备   注"
        type="textarea"
        placeholder="请您留言"
        clearable
      />

      <div style="margin: 16px;">
        <van-button block type="info" color="#F8D57E" native-type="submit" @click="onSubmit">提 交</van-button>
      </div>
    </van-form>

    <van-overlay :show="loading">
      <div class="wrapper" @click.stop>
        <van-loading type="spinner" color="#1989fa" size="0.8rem" vertical>加载中...</van-loading>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/home";
// import VideoDemo from "@/components/customer/videoPlay/index.vue";
import uploaderImg from "@/components/customer/uploaderImg.vue";

export default {
  name: "home_order",
  components: {
    // VideoDemo, // 播放
    uploaderImg // 上传图片
  },
  data() {
    return {
      loading: false,
      // 日历
      showCalendar: false,
      formData: {
        // 活动id（展会id）
        enterpriseShowId: "", // 展会id
        realName: "", // 真实姓名
        mobile: "", // 手机号
        verifyCode: "", // 验证码
        orderDate: "", // 预计参观日期，格式yyyy-MM-dd
        card: '', // 名称地址url
        businessName: "", // 企业名称
        businessPost: "", // 职位
        businessEmail: "", // 邮箱
        businessRemarks: "" // 备注
      },
      // imgSrc: [{ url: "https://img.yzcdn.cn/vant/leaf.jpg" }], // 名称地址url
      imgSrc: [], // 名称地址url
      isSend: false,
      sendNum: 59,
      pattern: /^1[3456789]\d{9}$/
    };
  },
  created() {
    // 活动id（展会id）
    this.formData.enterpriseShowId = this.$route.query.enterpriseShowId;
    console.log(this.formData.enterpriseShowId, "活动id（展会id）");
  },
  methods: {
    // 日期转化
    onConfirm(date) {
      this.formData.orderDate = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
      this.showCalendar = false;
    },

    // 验证
    onFailed(errorInfo) {
      // console.log("failed", errorInfo);
      util.error("请输入必填项！！");
    },

    // 请求参数 params
    onSubmit(params) {
      this.loading = true;
      let param = Object.assign({}, this.formData);
      param.card = this.imgSrc.length ? this.imgSrc[0].url : "";
      this.loading = true;

      Api.setShowOrderAdd(param)
        .then(res => {
          this.loading = false;
          let { data, code, msg, total } = res;
          if (code == 200) {
            util.success("保存成功！！");
            setTimeout(() => {
              this.handleLook();
            }, 1500);
          }
        })
        .catch(err => {});
    },

    // 倒计时
    handleTime() {
      if (!this.pattern.test(this.formData.mobile)) {
        util.error("手机号码有误，请重填");
      } else {
        this.isSend = true;
        // 获取验证码
        this.handleSedMa();
        const timer = setInterval(() => {
          if (this.sendNum < 2) {
            this.isSend = false;
            this.sendNum = 59;
            clearInterval(timer);
          }
          this.sendNum--;
        }, 1000);
      }
    },

    //  获取验证码
    handleSedMa() {
      const reg = "";
      let param = {
        enterpriseShowId: this.formData.enterpriseShowId,
        mobile: this.formData.mobile
      };
      Api.getSendVerifyCode(param)
        .then(res => {
          let { data, code, msg, total } = res;
          if (code == 200) {
            util.success("验证码已发送" + param.mobile + "手机！");
          }
        })
        .catch(err => {});
    },

    // 查看详情
    handleLook() {
      this.$router.push({
        name: "home_details",
        query: {
          id: this.$route.query.id
        }
      });
    }
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
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .nullImg {
    width: 4rem;
    margin: 0.4rem 1.47rem;
  }
}
</style>

