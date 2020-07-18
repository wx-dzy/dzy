<template>
  <!--参展商主页-公司详情  -->
  <div class="company_details" v-if="details != ''">
    <div class="top" v-if="details.enterprise">
      <div class="name">{{details.enterprise.name}}</div>
      <div class="middle">
        <span class="name_type">{{details.enterprise.enterpriseShowPlaceName}}</span>
        <i class="huiyuan">
          <van-icon class="icon iconfont yz-huiyuan" />
          <span v-show="details.enterprise.memberStatus == 1">会员</span>
          <span v-show="details.enterprise.memberStatus == 0">非会员</span>
        </i>
      </div>
      <div class="address">{{details.enterprise.addressDetail}}</div>
      <div class="type" v-show="details.followStatus == 1">
        <van-icon class="icon iconfont yz-guanzhu" />
        <div class="type_name">关注</div>
      </div>
	  <div class="type" v-show="details.followStatus == 0">
        <van-icon name="star-o" />
        <div class="type_name">未关注</div>
      </div>
    </div>
    <div class="details">
      <van-tabs v-model="active" class="tab" swipe-threshold="4" title-active-color="#000">
        <van-tab title="工商信息" class="vant_tabs">
          <div class="item" v-if="details.enterprise">
            <div class="company_name">企业名称：{{details.enterprise.name}}</div>
            <div class="company_address">企业住所：{{details.enterprise.addressDetail}}</div>
            <div class="company_people">企业法定代表人姓名：{{details.enterpriseBusiness.legalPerson}}</div>
            <div class="company_num">企业注册资本数额：{{details.enterpriseBusiness.registeredCapital}}万</div>
          </div>
        </van-tab>
        <van-tab title="服务承诺" class="vant_tabs">
			<div class="item">
				<p>服务承诺: {{ details.servicePromise }}</p>
			</div>
		</van-tab>
        <van-tab title="资质信息" class="vant_tabs_2">
			<div class="item" v-for="item in details.qualifications" :key="item.index">
				<div>资质名称: {{ item.qualificationName }}</div>
				<div>有效日期: {{ item.qualificationEndDate }}</div>
				<div>发放单位: {{ item.qualificationUnit }}</div>
        <div class="images">
          <img :src="item.qualification" alt="">
        </div>
        
			</div>
		</van-tab>
        <van-tab title="荣誉信息" class="vant_tabs_2">
			<div class="item" v-for="item in details.honours" :key="item.index">
				<div>证书名称: {{ item.qualificationName }}</div>
				<div>颁发机构: {{ item.qualificationUnit }}</div>
				<div class="images">
					<img :src="item.qualification" alt="">
				</div>
			</div>
		</van-tab>
      </van-tabs>
    </div>
    <div class="synopsis">
      <div class="title">简介</div>
      <!-- <div class="item_text">
        带领OPPO公司转型专攻智能手机市场，先后发布
        了X903、全球最薄的智能手机 Finder、以动态美颜
        引发手机自拍革命的“自拍神器”Uike2，首款搭
        载1080P高清屏幕的旗舰手机Find5、全球首款配
        旋转摄像头的大屏拍照手机N1，搭载全球充电最
        快最安全的vooC闪充技术、配备500万高清画质拍
        照技术的5.5英寸2K屏幕手机Find7，不断引领中
        国智能手机市场的新潮流。
      </div> -->
      <div class="imgs">
        <img :src="details.enterprise.introduction" alt />
      </div>
      <!-- <div class="item_text">
        带领OPPO公司转型专攻智能手机市场，先后发布
        了X903、全球最薄的智能手机 Finder、以动态美颜
        引发手机自拍革命的“自拍神器”Uike2，首款搭
        载1080P高清屏幕的旗舰手机Find5、全球首款配
        旋转摄像头的大屏拍照手机N1，搭载全球充电最
        快最安全的vooC闪充技术、配备500万高清画质拍
        照技术的5.5英寸2K屏幕手机Find7，不断引领中
        国智能手机市场的新潮流。
      </div> -->
    </div>

    <a class="button" href="tel:15810355372">拨打客服电话</a>
    <!-- <button  class="button">拨打客服电话</button> -->
  </div>
</template>
<script>
import VideoDemo from "@/components/customer/videoPlay";
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/exhibitor";
export default {
  name: "company_details",
  components: {},
  data() {
    return {
	  active: 0,
	  details: {}
    };
  },
  created() {
    this.handleGetCompnyDetail()
  },
  methods: {
    handleGetCompnyDetail () {
		console.log('enterpriseExhibitorsId:',this.enterpriseExhibitorsId);
		
      
      Api.getCompany_details(this.$route.query.enterpriseExhibitorsId)
      .then( (res) => {
		  let { code, msg, data, total } = res;
		  // console.log('参展公司详情',res);
		  if ( code == 200 ) {
			  this.details = data
		  }

	  })
	  .catch( (err) => {
		  console.log('err:',err);
		  
	  })
    }
  }
};
</script>
<style lang='scss' scoped>
.company_details {
  padding-left: 0.28rem;
  background-color: #fff;
  .top {
    .name {
      font-size: 0.4rem;
      margin-top: 0.38rem;
      font-weight: bold;
    }
    .middle {
      font-size: 0.24rem;
      margin-top: 0.18rem;
      .name_type {
        display: inline-block;
        width: 1.4rem;
        height: 0.36rem;
        text-align: center;
        margin: auto 0;
        background: #e5cc9d;
        border-radius: 0.04rem;
        color: #313437;
      }
      .icon {
        display: inline;
        color: #e5cc9d;
        margin-left: 0.26rem;
        margin-right: 0.14rem;
      }
    }
    .address {
      margin-top: 0.26rem;
      width: 5.66rem;
      font-size: 0.28rem;
      word-break: break-all;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .type {
      position: absolute;
      top: 0.64rem;
      right: 0.56rem;
      .van-icon {
        width: 0.74rem;
        height: 0.34rem;
        text-align: center;
        color: #c8ccd3;
        text-align: center;
      }
      .type_name {
        font-size: 0.24rem;
        width: 1 rem;
        margin: 0 auto;
      }
    }
  }
  .details {
    margin-top: 0.92rem;
    .tab {
        .vant_tabs {
          .item {
            height: 2.98rem;
            width: 6.96rem;
            margin-top: 0.35rem;
            padding: 0.46rem;
            box-sizing: border-box;
            font-size: 0.28rem;
            background-color: #f7f8fa;
          }
        }
        .vant_tabs_2{
			.item{
				// height: 5.98rem;
				width: 6.96rem;
				margin-top: 0.35rem;
				padding: 0.46rem;
				box-sizing: border-box;
				font-size: 0.28rem;
				background-color: #f7f8fa;
					.images {
					// width: 5rem;
					height: auto;
					// margin: 0.1rem auto;
					margin-top: 0.3rem;
					img {
						width: 100%;
						height: 100%;
					}
					}
			}
          
    }  
    
  }
    }
  
  .synopsis {
    margin-left: 0.2rem;
    margin-top: 0.62rem;
    .title {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .item_text {
      font-size: 0.28rem;
      margin-top: 0.32rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
    }
    .imgs {
      width: 7.5rem;
    //   height: 3.8rem;
	  margin: 0.5rem 0 0.5rem -0.5rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .button {
    display: block;
    width: 6.84rem;
    height: 0.8rem;
	line-height: 0.8rem;
	text-align: center;
    border: none;
    margin-bottom: 0.48rem;
    background-color: #f8d57e;
	border-radius: 0.08rem;
	color: #000;
  }
}
/deep/ .van-tabs__line {
  background-color: #ffcf62;
}
/deep/ .van-tab--active {
  font-size: 0.32rem;
}
/deep/ .van-tab__text--ellipsis {
  font-size: 0.28rem;
}
</style>