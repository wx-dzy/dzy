// 编辑个人信息
<template>
  <div class="personal_editInfo">
    <router-view />
      <div class="fromList">
        <van-form>
          <div class="top">
            <van-field name="upPhoto" label="头像">
              <template #input>
                <img src="http://www.mfqqx.com/d/file/2011/07/65e6653c443b38b3c01515314bd296f9.jpg" alt="">
                <van-icon name="arrow" />
                <!-- <van-uploader v-model="uploader" />
                <van-icon class="photo" name="arrow" /> -->
              </template>
            </van-field>
            <van-field label="真实姓名" placeholder="请输入您的姓名" />
            <van-field name="radio" label="性别">
              <template #input>
                <van-radio-group v-model="radio" direction="horizontal">
                  <van-radio name="1">男</van-radio>
                  <van-radio name="2">女</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field label="出生日期" placeholder="请输入您的出生日期" />
            <van-field type="tel" label="联系电话"  placeholder="请输入电话号码" />
            <van-field type="model_tel" label="绑定电话"  placeholder="请输入电话号码" />
          </div>
          <!-- 工作经历 -->
          <div class="history">
            <div class="title">
              <div class="text">工作经历</div>
              <div class="add" @click="gotoEditCard">
                <van-icon name="plus" />
                新增
              </div>
            </div>
            <div class="itemBox">
              <div class="item" v-for="(item,index) in workingList" :key="index">
                <div class="image">
                  <img src="" alt="">
                </div>
                <div class="middle">
                  <div class="middleTop">
                    <span class="position">{{item.position}}</span>
                    <span class="status">{{item.status}}</span>
                  </div>
                  <div class="companyName">{{item.companyName}}</div>
                  <div class="date">
                    <span class="begin">{{item.dateBegin}}</span>-<span class="over">{{item.dateOver}}</span>
                  </div>
                  <div class="working">{{item.working}}</div>
                </div>
                <div class="right">
                  <van-icon name="arrow" />
                </div>
              </div>
            </div>
          </div>

          <div class="submit">保存</div>
        </van-form>
        
      </div>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/personal";
import visitingCard from "@/components/customer/visitingCard.vue";

export default {
  name: "personal_editInfo",
  components: {
    // 名片
    visitingCard
  },
  data() {
    return {
            workingList:[
        {
          // imgUrl:require(""),
          position:"销售经理",
          status:"在职",
          companyName:"好招数创（北京）科技有限公司",
          dateBegin:"2018.02",
          dateOver:"至今",
          working:"负责系统选型，等销售工作…"
        },
        {
          // imgUrl:require(""),
          position:"销售经理",
          status:"离职",
          companyName:"好招数创（北京）科技有限公司",
          dateBegin:"2016.02",
          dateOver:"2018.01",
          working:"负责系统选型，等销售工作…"
        },
        
        {
          // imgUrl:require(""),
          position:"销售经理",
          status:"离职",
          companyName:"好招数创（北京）科技有限公司",
          dateBegin:"2016.02",
          dateOver:"2018.01",
          working:"负责系统选型，等销售工作…"
        },
      ],
      radio: '1',
      uploader: [{ url: 'http://www.mfqqx.com/d/file/2011/07/65e6653c443b38b3c01515314bd296f9.jpg' }],

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
    gotoEditCard(){
      this.$router.push({
        name: "personal_editCard",
      });
    },
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
.personal_editInfo{
  width: 7.5rem;
  background-color: #f7f8fa;
  .fromList{
    .top{
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
    .history{
      .title{
        height: 1.36rem;
        line-height: 1.36rem;
        color: #313437;
        display: flex;
        margin: 0 0.34rem 0.28rem;
        font-weight: bold;
        .text{
          width: 5rem;
          font-size: 0.32rem;
        }
        .add{
          float: right;
          margin: auto 0;
          width:1.84rem;
          height:0.48rem;
          background:rgba(248,213,126,1);
          border-radius:0.24rem;
          font-size: 0.24rem;
          line-height: 0.48rem;
          text-align: center;
          
        }
      }
      .itemBox{
        // padding: 0 0.5rem 0.44rem;
        
        // background:rgba(255,255,255,1);
        .item{
          width:7.5rem;
          height:2.2rem;
          display: flex;
          padding: 0 0.5rem 0.44rem;
          box-sizing: border-box;
          background:rgba(255,255,255,1);
          margin-bottom: 0.12rem;
          .image{
            margin-top: 0.4rem;
            width: 1.4rem;
            height: 1.4rem;
            border:0.02rem solid rgba(233,233,233,1);
            img{
              width: 100%;
              height: 100%;
            }
          }
          .middle{
            margin-top: 0.26rem;
            margin-left: 0.36rem;
            .middleTop{
              span{
                display: inline-block;
              }
              .position{
                font-size: 0.28rem;
                font-weight: bold;
              }
              .status{
                width:0.8rem;
                height:0.32rem;
                background:rgba(248,213,126,1);
                border-radius:0.08rem;
                font-size:0.2rem;
                text-align: center;
                line-height:0.32rem;
                margin-left: 0.1rem;
              }
            }
            .companyName{
              font-size: 0.28rem;
              font-weight: bold;
            }
            .date,.working{
              font-size: 0.24rem;
              color: #9DA1A6;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
          .right{
            margin-left: 0.28rem;
            .van-icon{
              line-height: 2.2rem;
              color: #9DA1A6;
            }
          }
        }
      }
    }
    .submit{
      height: 0.8rem;
      width: 6.84rem;
      line-height: 0.8rem;
      text-align: center;
      margin:0.52rem 0.34rem;
      background:rgba(248,213,126,1);
      letter-spacing:0.2rem;
      border-radius: 0.08rem;
    }
  }  
  /deep/ .van-cell{
    height: 1.12rem;
    line-height: 1.12rem;
    padding: 0px 0.34rem;
  }
  /deep/ .van-radio-group--horizontal {
    // margin: auto 0;
    margin-top: 0.35rem;
}
}
</style>

