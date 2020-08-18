<template>
  <!-- 我的页面-身份切换 -->
  <div class="checkIdentity">
    <!-- 下拉刷新 -->
    <div class="message">
      <van-col
        span="24"
        class="activeInfo clear"
        style="font-size:0.24rem;line-height:0.52rem;padding: 0 0.42rem;margin: 0.4rem 0 0.32rem;
        line-height: 0.8rem;background: linear-gradient(270deg,rgba(248, 213, 126, 0.32) 0%,rgba(229, 204, 157, 1) 100%
        );border-radius: 0.12rem;padding-top: 0.2rem;"
      >
        当前身份：{{identityList[identityIndex].identityName}}
        <van-button
          round
          size="mini"
          color="#F8D57E"
          class="switchInfo pull-right"
          @click="handleChangeIdentity"
        >切换身份</van-button>
        <div
          class="enter"
          style="display:flex;font-size:0.24rem;line-height:0.52rem;margin-top:0.2rem;margin-bottom:0.2rem;"
        >
          <div class="title" style="flex:20%;">当前企业：</div>
          <div style="flex:80%;" v-if="checkList.length">{{checkList[enterpriseIndex].enterpriseName}}</div>
        </div>
      </van-col>
    </div>
    <!-- 当前身份切换 -->
    <van-overlay :show="changeIdentity" class="changeIdentityWrap">
      <div class="wrapper" @click="changeIdentity = false">
        <div class="block">
          <div class="imgBox">
            <img src="@/assets/images/changeIdentity.png" alt class="topImg" />
          </div>

          <div class="fot">
            <div class="currentlySelectedEnterprise">
              <div class="title">选择当前企业</div>
              <van-radio-group v-model="enterpriseIndex">
                <van-radio
                  :name="enterpriseIndex"
                  v-for="(item,enterpriseIndex) in checkList"
                  :key="item.id"
                  @click="checkEnterprise(item.id)"
                >
                  {{item.enterpriseName}}
                  <template #icon="props">
                    <img class="success1" :src="props.checked ? activeIcon : inactiveIcon" />
                  </template>
                </van-radio>
              </van-radio-group>
            </div>

            <div class="currentlySelectedEnterprise">
              <div class="title">选择当前身份</div>
              <van-radio-group v-model="identityIndex">
                <van-radio
                  :name="identityIndex"
                  v-for="(item,identityIndex) in identityList"
                  :key="item.id"
                  @click="goto(identityIndex)"
                >
                  {{item.identityName}}
                  <template #icon="props">
                    <img class="success2" :src="props.checked ? activeIcon : inactiveIcon" />
                  </template>
                </van-radio>
              </van-radio-group>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
import * as Api from "@/api/customer/personal";

export default {
  name: "",
  components: {},
  data() {
    return {
      refreshing: false,
      // 选择当前企业
      checkList: [
        { id:1,text: "好招数创（北京）科技有限公司" },
        { id:2,text: "宝鸡有一群怀揣着梦想奇迹美好网络科技有限公司" },
        { id:3,text: "风风火火有限公司" },
      ],
      identityList: [
        { id:1,text: "参观人员" },
        { id:2,text: "企业管理员" },
        { id:3,text: "办展工作人员" },
      ],
      enterpriseIndex: 0, // 默认选择企业名
      identityIndex: sessionStorage.getItem("identityIndex")
        ? sessionStorage.getItem("identityIndex")
        : 0, // 默认选择身份
      // 切换身份弹窗
      changeIdentity: false,
      activeIcon: require("@/assets/images/ok.png"),
      inactiveIcon: require("@/assets/images/no.png"),
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    // 选择企业
    checkEnterprise(id) {
      console.log("id", id);
      this.enterpriseIndex = id;
      let enterpriseId = this.checkList[this.enterpriseIndex].enterpriseId;

      console.log("enterpriseId:", enterpriseId);
      sessionStorage.setItem("enterpriseId", enterpriseId);
    },
    goto(identityIndex) {
      console.log("identityIndex", identityIndex);
      sessionStorage.setItem("identityIndex", identityIndex);
      let params = {
        enterpriseId: this.checkList[this.enterpriseIndex].enterpriseId,
        identity: this.identityList[this.identityIndex].identity,
      };
      Api.changeIdentity(params).then((res) => {
        console.log("切换身份成功", res);
        if (this.identityIndex == 0) {
          this.$router.push({
            name: "personal",
          });
        } else if (this.identityIndex == 1) {
          this.$router.push({
            name: "enterprise_admins",
          });
        } else if (this.identityIndex == 2) {
          this.$router.push({
            name: "personal",
          });
        }
      });
    },
    // 切换身份 satus=1 '参展方'   satus=2 '参观方'
    handleChangeIdentity(satus) {
      this.changeIdentity = true;
      // console.log(satus, "-- 1参展方,2参观方");
    },
    getInfo() {
      let params = {};
      // return alert(satus + "暂无接口-- 1参展方,2参观方");
      // return alert(satus + '暂无接口-- 1参招方,2参观方')
      Api.setChangeIdentity(params)
        .then((res) => {
          console.log("切换身份", res);
          // this.changeIdentity = false
          let { code, data, msg, total } = res;
          if (code == 200) {
            this.checkList = data;
            let enterpriseId = this.checkList[this.enterpriseIndex]
              .enterpriseId;
            console.log("enterpriseId:", enterpriseId);
            sessionStorage.setItem("enterpriseId", enterpriseId);
            this.identityList = this.checkList[
              this.enterpriseIndex
            ].identityList;
            // this.handleDetail()
            util.success(msg);
          }
        })
        .catch((err) => {
          // this.changeIdentity = false
        });
    },
  },
};
</script>
<style lang='scss' scoped>
.info {
  padding: 0 0.27rem;

  .name {
    font-size: 0.36rem;
    color: rgba(49, 52, 55, 1);
    line-height: 0.5rem;
  }

  .status {
    display: inline-block;
    padding: 0 0.18rem;
    font-size: 0.2rem;
    color: rgba(49, 52, 55, 1);
    line-height: 0.36rem;
    border-radius: 0.08rem;
    border: 0.02rem solid rgba(255, 165, 165, 1);
  }

  .van-icon,
  .inffAll {
    display: inline-block;
    padding: 0;
    font-size: 0.24rem;
    color: rgba(49, 52, 55, 1);
    line-height: 0.84rem;
  }

  .van-icon {
    position: relative;
    top: 0.03rem;
  }

  /deep/ .activeInfo {
    padding: 0 0.42rem;
    margin: 0.4rem 0 0.32rem;
    line-height: 0.8rem;
    background: linear-gradient(
      270deg,
      rgba(248, 213, 126, 0.32) 0%,
      rgba(229, 204, 157, 1) 100%
    );

    border-radius: 0.12rem;
    padding-top: 0.2rem;
    .van-button {
      color: #313437 !important;
      // margin-top: 0.2rem;
      padding: 0 0.32rem;
    }
  }
}

.changeIdentityWrap {
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .block {
    margin-top: 3.5rem;
    width: 7.5rem;
    height: 12.2rem;
    background: rgba(255, 255, 255, 1);
    .imgBox {
      width: 2.82rem;
      height: 2.18rem;
      align-items: center;
      margin: 0 auto;
      margin-top: -0.48rem;
      .topImg {
        width: 100%;
      }
    }

    .fot {
      .currentlySelectedEnterprise {
        margin-bottom: 1rem;
      }
      .img-icon {
        height: 0.2rem;
      }
      .currentlySelectedEnterprise,
      .selectCurrentIdentity {
        margin-left: 0.28rem;
        .title {
          font-size: 0.32rem;
          color: rgba(49, 52, 55, 1);
          line-height: 0.44rem;
          font-weight: bold;
          font-family: AlibabaPuHuiTiM;
          padding-bottom: 0.2rem;
        }
        .checkList,
        .identityList {
          display: flex;
          border-bottom: 1px solid #ebedf0;
          i {
            color: #f8d57e;
            line-height: 0.8rem;
          }
        }
        .checkList:nth-last-child(1),
        .identityList:nth-last-child(1) {
          border: none;
        }

        /deep/ .van-radio-group {
          .van-radio {
            border-bottom: 1px solid #ebedf0;
            font-size: 0.24rem;
            .van-radio__label {
              color: #323233;
              line-height: 0.8rem;
            }
          }
          .fieldset,
          img {
            height: 0.5rem;
          }
        }
      }
    }
  }
}

.btnWrap {
  padding: 0 0.27rem;

  .item {
    position: relative;
    width: 3.36rem;
    height: 1.38rem;
    background: rgba(243, 237, 232, 1);
    box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
    border-radius: 0.08rem;
    user-select: none;

    .text {
      width: 1.8rem;
      font-size: 0.24rem;
      color: rgba(163, 118, 87, 1);
      line-height: 0.4rem;
      letter-spacing: 1px;
      padding-left: 0.4rem;
    }
    .pad30 {
      padding-top: 0.3rem;
    }
    .pad48 {
      padding-top: 0.48rem;
    }

    img {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0.94rem;
      height: 0.94rem;
    }
  }
}
</style>