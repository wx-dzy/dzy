// 编辑名片
<template>
  <div class="personal_editCard">
    <!-- <router-view /> -->
      <div class="box">
        <van-field name="upPhoto" label="上传LOGO">
          <template #input>
            <img src="http://www.mfqqx.com/d/file/2011/07/65e6653c443b38b3c01515314bd296f9.jpg" alt="">
            <van-icon name="arrow" />
            <!-- <van-uploader v-model="uploader" />
            <van-icon class="photo" name="arrow" /> -->
          </template>
        </van-field>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
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
      username: '',
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
    onsubmt() {
      Api.getHomePage(params)
        .then(res => {
          let { code, msg, data, total } = res;
          // 加载状态结束
          this.loading = false;
          if (code == 200) {
          }
        })
        .catch(err => {
          console.log(err, "err");
        });
    },

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
.personal_editCard{
  .box{
    .van-field{
        width: 7.5rem;
        height: 1.12rem;
        // line-height: 1.12rem;
        font-size: 0.32rem;
        color: #313437;
        img{
          margin: auto 0;
          width: 0.96rem;
          height: 0.96rem;
          border-radius: 50%;
          margin-left: 3rem;
          margin-right: 0.3rem;
        }
      }
  }
}
/deep/ .van-cell{
  height: 1.12rem;
  line-height: 1.12rem;
  padding: 0px 0.34rem;
}
</style>

