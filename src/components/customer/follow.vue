// 关注/取消关注组件
<!-- 名片组件 调用实例 
<follow
  :followType="1"
  :followId="details.enterprise.id"
  :followStatus.sync="details.followStatus"
  :showIndex="2"
  @successCBK="handleFollow"
/>
-->
<template>
  <div class="follow" v-if="followId">
    <div v-if="showIndex==1" class="sty1">
      <van-button
        v-show="!followStatus"
        icon="icon iconfont yz-guanzhu"
        type="default"
        class="btnNone"
        @click="handleIsFollow(1)"
      >未关注</van-button>

      <van-button
        v-show="followStatus"
        icon="icon iconfont yz-yiguanzhu"
        type="default"
        class="btnNone"
        @click="handleIsFollow(0)"
      >已关注</van-button>
    </div>

    <div v-if="showIndex==2" class="sty2">
      <div class="type" v-show="!followStatus" @click="handleIsFollow(1)">
        <van-icon class="icon iconfont yz-guanzhu" />
        <div class="type_name">未关注</div>
      </div>

      <div class="type" v-show="followStatus" @click="handleIsFollow(0)">
        <van-icon class="icon iconfont yz-yiguanzhu" />
        <div class="type_name">已关注</div>
      </div>
    </div>
  </div>
</template>

<script>
import { util } from "@/utils";
import * as Api from "@/api/customer/components";

export default {
  /**
   * 参数
   * @param  {Number} followType  1：关注企业，2：关注人物
   * @param  {String} followId    要关注的企业id或人物id
   * @param  {Number} followStatus followStatus 1表示关注，0表示取消关注
   * @param  {function} successCBK 成功回调函数 参数 返回当前关注状态status
   * @param  {String} showIndex    显示样式类型 1、2两种
   *
   */
  props: ["followType", "followId", "followStatus", "showIndex"],

  data() {
    return {};
  },
  components: {},

  watch: {},
  created() {
    // console.log(this.followId, "222");
  },
  methods: {
    // 关注/取消关注  followStatus 1表示关注，0表示取消关注
    handleIsFollow(followStatus) {
      let param = {
        // followStatus 1表示关注，0表示取消关注
        followStatus: followStatus || "",
        // 要关注的企业id或人物id
        followId: this.followId,
        // 1：关注企业，2：关注人物
        followType: this.followType,
        // 用户openId
        openId: "open"
      };
      Api.setIsFollow(param)
        .then(res => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            util.success(msg);
            // 更新父组件成功函数 function 类型
            this.$emit("successCBK", followStatus);
          }
        })
        .catch(err => {});
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.follow {
}
</style>
<style lang="scss" scoped>
.follow {
  display: inline-block;
  .sty1 {
    .btnNone {
      font-size: 0.28rem;
      color: #313437;
      line-height: 0.4rem;
      border: none;
      background: rgba(0, 0, 0, 0);
      .iconfont {
        color: #f8d57e;
      }
    }
  }
  .sty2 {
    .type .van-icon {
      width: 0.74rem;
      height: 0.34rem;
      text-align: center;
      color: #f8d57e;
    }
  }
}
</style>