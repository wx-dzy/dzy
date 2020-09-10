<template>
  <!-- 手动添加成员 -->
  <div class="MTaddMember">
    <van-form @submit="addMember">
      <van-field
        v-model="userInfo.realName"
        name="realName"
        label="姓名"
        required
        placeholder="请输入姓名"
        :rules="[{ required: true, message: '请输入姓名' }]"
      />
      <van-field name="username" v-model="userInfo.username" label="账号" required placeholder="选填" />
      <van-field label="别名" name="nickname" placeholder="选填" v-model="userInfo.nickname" />
      <van-field name="sex" label="性别">
        <template #input>
          <van-radio-group direction="horizontal" v-model="userInfo.radio">
            <van-radio name="男">男</van-radio>
            <van-radio name="女">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <!-- 选填项 -->
      <div class="titleText">选填项：</div>
      <van-field
        type="tel"
        label="手机"
        name="mobile"
        required
        v-model="userInfo.mobile"
        placeholder="请输入手机号码"
      />
      <van-field type="tel" label="座机" name="phone" v-model="userInfo.phone" placeholder="选填" />
      <van-field label="邮箱地址" name="email" v-model="userInfo.email" placeholder="选填" />
      <van-field label="地址" placeholder="选填" name="address" v-model="userInfo.address" />
      <van-field name="sysPostName" label="职务" v-model="userInfo.sysPostName" placeholder="选填" />
      <div class="departments">
        <van-field
          label="部门"
          v-model="userInfo.sysOrganizationName"
          name="setDepartments"
          placeholder="选填"
          readonly
        />
        <van-button @click="setMem" native-type="button">设置部门</van-button>
        <!-- <van-button @click="showPopup" native-type="button">设置部门</van-button> -->
      </div>
      <van-overlay :show="IsSetMem" @click="IsSetMem = false" class="setMem">
        <div class="wrapper">
          <div class="block">
            <div class="setBox">
              <!-- <van-search v-model="value" shape="round" placeholder="搜索" /> -->
              <van-radio-group v-model="userInfo.setDepartments">
                <van-radio
                  :name="item.name"
                  v-for="(item,setIndex) in setList"
                  :key="setIndex"
                  @click="checkIndex(item.id,item.leaf,item.name,$event)"
                >
                  <span class="left_img">
                    <i class="iconfont">&#xe672;</i>
                  </span>
                  <span class="setText">{{item.name}}</span>

                  <template #icon="props">
                    <img class="success2" :src="props.checked ? activeIcon : inactiveIcon" />
                  </template>
                </van-radio>
              </van-radio-group>
            </div>
          </div>
        </div>
      </van-overlay>
      <van-button type="info" class="submit" native-type="submit">保存</van-button>
    </van-form>
  </div>
</template>
<script>
import * as Api from "@/api/customer/personal";

export default {
  name: "",
  components: {},
  data() {
    return {
      show: false,
      userInfo: {
        username: "",
        radio: "男",
        realName: "",
        mobile: "",
        phone: "",
        email: "",
        address: "",
        sysPostName: "",
        setDepartments: "",
        nickname: "", // 别名
        sysOrganizationName: this.$route.query.sysName,
      },
      IsSetMem: false,
      setIndex: 0,
      setList: [],
      activeIcon: require("@/assets/images/ok.png"),
      inactiveIcon: require("@/assets/images/no.png"),
      value: "",
      setDepartments: "",
      sysOrganizationId: this.$route.query.sysOrganizationId, //部门id
      // sysOrganizationName: this.$route.query.sysName,
      sysOrganizationId_2: this.$route.query.sysOrganizationId,
    };
  },
  created() {
    // this.sysOrganizationId = this.$route.query.sysOrganizationId
    //     ? this.$route.query.sysOrganizationId
    //     : 0
    // console.log('部门名'+this.$route.query.sysName);
    console.log("sysOrganizationId:", this.sysOrganizationId);
    // this.userInfo.sysOrganizationId = this.$route.query.sysOrganizationId
    this.userInfo.setDepartments = this.$route.query.name;
    this.userId = this.$route.query.userId;
    if (this.userId) {
      this.getDetails(this.userId);
    }
    this.getChildren();
  },
  methods: {
    setMem() {
      this.IsSetMem = true;
      this.setList = [];
      this.getChildren();
      // this.sysOrganizationName =
    },
    // showPopup() {
    //   this.show = true;
    //   this.setList = [];
    //   this.getChildren();
    // },
    // 选择的部门id
    checkIndex(id, leaf, name) {
      console.log("选择的部门id", id);
      console.log("选择的部门leaf", leaf);
      this.sysOrganizationId_2 = id;
      if (leaf != 1) {
        let enterpriseId = sessionStorage.getItem("enterpriseId");
        let sysOrganizationId = id;
        Api.getChildDept(enterpriseId, sysOrganizationId).then((res) => {
          console.log("获取子部门:", res);
          console.log(this.$route.query.bumenName);
          let { code, data, msg, total } = res;
          if (code == 200) {
            this.setList = data;
          }
        });
        this.userInfo.sysOrganizationName = this.userInfo.sysOrganizationName;
        // this.sysOrganizationName = name;
        this.IsSetMem = true;
      } else if (leaf == 1) {
        console.log("222222222222222:", name);
        this.userInfo.sysOrganizationName = name;
        this.IsSetMem = false;
      }
    },
    // 获取子部门
    getChildren() {
      let enterpriseId = sessionStorage.getItem("enterpriseId");
      console.log("sysOrganizationId", this.sysOrganizationId);
      let sysOrganizationId = this.sysOrganizationId;
      // this.sysOrganizationId
      //   ? (sysOrganizationId = this.sysOrganizationId)
      //   : (sysOrganizationId = 0);
      //   this.sysOrganizationId=0
      Api.getChildDept(enterpriseId, "0").then((res) => {
        console.log("获取子部门:", res);
        let { code, data, msg, total } = res;
        if (code == 200) {
          this.setList = data;
        }
      });
    },
    // 添加人员-获取人员详情
    getDetails(userId) {
      Api.getMemberDetail(userId).then((res) => {
        console.log("添加人员-获取人员详情", res);
        let { code, msg, data, total } = res;
        if (code == 200) {
          this.userInfo = data;
          this.sysOrganizationName = this.userInfo.sysOrganizationName;
        }
      });
    },
    // 添加成员
    addMember(e) {
      // console.log('添加成员', e)
      delete e.undefined;
      delete e.setDepartments;
      this.userId ? (e.userId = this.userId) : (e.userId = 0);

      e.sysOrganizationId = this.sysOrganizationId_2;
      console.log("e-----------------------");
      console.log(e);
      console.log("e-----------------------");
      let params = JSON.stringify(e);
      console.log("添加成员", params);
      Api.MTAddMember(params).then((res) => {
        console.log("添加成员:", res);
        if (res.code == 200) {
          // this.$router.go(-1);
          this.$router.push({
            path: "/enterprise_admins",
          });
        }
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.MTaddMember {
  background-color: #f7f8fa;
  padding-top: 0.84rem;
  .titleText {
    font-size: 0.32rem;
    color: #ccc;
    line-height: 0.6rem;
    margin-top: 0.28rem;
    margin-left: 0.36rem;
  }
  .departments {
    margin-top: 0.2rem;
    margin-bottom: 1.6rem;
    display: flex;
    background-color: #fff;
    .van-cell {
      // flex: 70%;
      width: 75%;
    }
    button {
      margin-right: 0.32rem;
      // flex: 30%;
      // width: 1.4rem;
      height: 0.48rem;
      background: rgba(248, 213, 126, 1);
      border-radius: 0.24rem;
      font-size: 0.24rem;
      color: rgba(49, 52, 55, 1);
      padding: 0 0.22rem;
      border: none;
      margin: auto;
    }
    .van-cell::after {
      border-bottom: none;
    }
  }
  .submit {
    height: 0.8rem;
    width: 6.84rem;
    line-height: 0.8rem;
    text-align: center;
    margin: 0.52rem 0.34rem;
    background: rgba(248, 213, 126, 1);
    letter-spacing: 0.2rem;
    border-radius: 0.08rem;
    border: none;
    color: #313437;
  }
  /deep/ .van-radio__icon--checked .van-icon {
    background-color: rgba(248, 213, 126, 1);
    border-color: rgba(248, 213, 126, 1);
  }
  // .wrapper{
  //     // position: absolute;
  //     // right: 0;

  // }
  .block {
    background-color: #fff;
    width: 7.5rem;
    // height: 6rem;
    margin: auto;
    .setBox {
      .img-icon {
        height: 0.2rem;
      }
      .fieldset,
      img {
        height: 0.4rem;
      }
    }
    /deep/ .van-radio {
      height: 1.36rem;
      //   border: 1px solid red;
      padding-left: 0.28rem;
      box-sizing: border-box;
    }
    /deep/ .van-radio__icon {
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 50%;
      border: 1px solid #eeeeee;
      padding-left: 0.05rem;
      box-sizing: border-box;
    }

    /deep/ .van-radio__label {
      display: inline-block;
      .left_img {
        //   justify-items: auto;
        //   justify-content: center;
        display: inline-block;
        width: 0.96rem;
        height: 0.96rem;
        border-radius: 50%;
        background: rgba(245, 245, 245, 1);
        i {
          color: rgba(248, 213, 126, 1);
          text-align: center;
          line-height: 0.96rem;
          margin-left: 0.3rem;
        }
      }
      .setText {
        margin-left: 0.3rem;
        display: inline-block;
        line-height: 1.36rem;
      }
    }
  }
}
/deep/ .van-overlay {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    overflow-y: scroll;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
}
</style>