<template>
  <!-- 编辑名片 -->
  <div class="personal_editCard">
    <router-view />
    <div class="box">
      <van-field name="upPhoto" label="上传LOGO">
        <template #input>
          <img src="http://www.mfqqx.com/d/file/2011/07/65e6653c443b38b3c01515314bd296f9.jpg" alt />
          <van-icon name="arrow" />
        </template>
      </van-field>
      <!-- 公司/单位 -->
      <div class="Company">
        <div class="title">
          <span>公司/单位</span>
          <span class="authentication">去认证</span>
        </div>
        <van-field
          v-model="Company"
          name="公司名称"
          label="公司名称"
          required
          placeholder="请输入中文公司/单位名称"
          :rules="[{ required: true, message: '请输入中文公司/单位名称' }]"
        />
        <van-field
          v-model="Company"
          name="公司名称EN"
          label="公司名称EN"
          placeholder="请输入英文公司/单位名称"
          :rules="[{ required: true, message: '请输入英文公司/单位名称' }]"
        />
      </div>
      <!-- 姓名 -->
      <div class="name">
        <div class="title">
          <span>姓名</span>
        </div>
        <van-field
          v-model="username"
          name="姓名"
          label="姓名"
          required
          placeholder="请输入中文名（必填）"
          :rules="[{ required: true, message: '请输入中文名（必填）' }]"
        />
        <van-field v-model="value1" name="姓名EN" label="姓名EN" placeholder="Patter" />
      </div>
      <!-- 职位/岗位 -->
      <div class="position">
        <div class="title">
          <span>职位/岗位</span>
        </div>
        <van-field
          v-model="position"
          name="职位"
          label="职位"
          required
          placeholder="请输入中文公司/单位名称"
          :rules="[{ required: true, message: '请输入中文公司/单位名称' }]"
        />
        <van-field
          v-model="position"
          name="职位EN"
          label="职位EN"
          placeholder="请输入英文公司/单位名称"
          :rules="[{ required: true, message: '请输入英文文公司/单位名称' }]"
        />
      </div>
      <!-- 在职时间 -->
      <div class="time">
        <div class="title">
          <span>在职时间</span>
          <span class="notes">（注：结束时间如果选择“至今”）</span>
        </div>
        <van-field
          v-model="time"
          name="开始时间"
          label="开始时间"
          placeholder="请输入开始时间"
          :rules="[{ required: true, message: '请输入开始时间' }]"
        />
        <van-field
          v-model="time"
          name="结束时间"
          label="结束时间"
          placeholder="请输入结束时间"
          :rules="[{ required: true, message: '请输入结束时间' }]"
        />
      </div>
      <!-- 联系方式 -->
      <div class="tel">
        <div class="title">
          <span>联系方式</span>
        </div>
        <van-field
          v-model="phone"
          required
          label="电话号码"
          placeholder="请输入电话号码"
          :rules="[{ required: true, message: '电话号码格式错误' }]"
        />
        <van-field
          v-model="email"
          name="邮箱地址"
          required
          label="邮箱地址"
          placeholder="请输入邮箱地址"
          :rules="[{ required: true, message: '请输入邮箱地址' }]"
        />
      </div>
      <!-- 公司地址 -->
      <div class="address">
        <div class="title">
          <span>公司地址</span>
          <span class="location">定位</span>
        </div>
        <van-field
          readonly
          clickable
          name="area"
          :value="value"
          label="地区选择"
          placeholder="点击选择省市区"
          @click="showArea = true"
        />
        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="onConfirm" @cancel="showArea = false" />
        </van-popup>
        <van-field
          v-model="address"
          label="详细地址"
          placeholder="详细地址"
          :rules="[{ required: true, message: '请输入详细地址' }]"
        />
        <van-field
          v-model="address"
          name="地址EN"
          label="地址EN"
          placeholder="请输入英文版详细地址"
          :rules="[{ required: true, message: '请输入英文版详细地址' }]"
        />
      </div>
      <!-- 工作描述1 -->
      <div class="description1">
        <div class="title">
          <span>工作描述1</span>
        </div>
        <div class="box1">
        
        </div>
      </div>
      <!-- 工作描述2 -->
      <div class="description1">
        <div class="title">
          <span>工作描述2</span>
        </div>
        <div class="box2">
          
        </div>
      </div>
      <!-- 保存 -->
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/personal";
import visitingCard from "@/components/customer/visitingCard.vue";

export default {
  name: "personal_editCard",
  components: {
    // 名片
    visitingCard
  },
  data() {
    return {
      value: "",
      showArea: false,
      areaList: {}, // 数据格式见 Area 组件文档
      value1: "Patter",
      // uploader: [{ url: 'https://img.yzcdn.cn/vant/leaf.jpg' }],
      username: "",
      Company: "",
      position: "", // 职位
      time: "",
      phone: "",
      email: "",
      address: "",
      detail: {
        infoImg: "https://img.yzcdn.cn/vant/cat.jpeg",
        name: "xiaogang0-0",
        status: 1,
        activeInfo: "参观房"
      },
      pageSize: 10,
      pageNum: 1
    };
  },

  created() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  watch: {},
  methods: {
    onConfirm(values) {
      this.value = values.map(item => item.name).join("/");
      this.showArea = false;
    },
    // onsubmt() {
    //   Api.getHomePage(params)
    //     .then(res => {
    //       let { code, msg, data, total } = res;
    //       // 加载状态结束
    //       this.loading = false;
    //       if (code == 200) {
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err, "err");
    //     });
    // },

    handleSetInfo(row) {
      this.$router.push({
        name: "personal_details",
        query: {
          id: row.enterpriseId
        }
      });
    },

    // 查看详情
    handleLook(row) {
      this.$router.push({
        name: "personal_details",
        query: {
          // 企业id
          id: row.enterpriseId
          // title: row.enterpriseName
        }
      });
    }
  },

  computed: {},

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
@import "./personal.scss";
.nullImg {
  width: 4rem;
  margin: 0.4rem 1.47rem;
}
.personal_editCard {
  width: 7.5rem;
  .van-form,.box {
    // width: 7.5rem;
    padding-left: 0.34rem;
    padding-top: 0.22rem;
    box-sizing: border-box;
    /deep/ .van-field {
      width: 7.5rem;
      // height: 1.12rem;
      line-height: 1.12rem;
      // border: 1px solid red;
      font-size: 0.32rem;
      color: #313437;
      font-size: 0.3rem;
      img {
        margin: auto 0;
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
        margin-left: 3rem;
        margin-right: 0.3rem;
      }
    }
    .title{
        line-height: 0.56rem;
        padding-top: 0.26rem;
        color: #888888;
        font-size: 0.24rem;
        .location,.authentication{
          float: right;
          margin-right: 0.22rem;
        }
        .authentication{
          padding: 0 0.24rem;
          color: #313437;
          background:rgba(248,213,126,1);
          border-radius:0.24rem;
          font-size: 0.24rem;
        }
        .location{
          color: #4A98F7;
          font-size: 0.3rem;
        }
      }
  }
}
/deep/ .van-cell {
  height: 1.12rem;
  line-height: 1.12rem;
  padding: 0px 0.34rem;
}
// 必选项位置
// /deep/ .van-cell--required::before {

// }
/deep/ .van-button--round{
  width: 6.84rem;
  margin: 0.8rem 0;
}
/deep/ .van-button--info {
    color: #313437;
    background-color: #F8D57E;
    border: 1px solid #F8D57E;
}
</style>

