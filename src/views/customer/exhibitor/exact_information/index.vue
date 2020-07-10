<template>
  <div class="exact_information">
    <!-- <div> -->
      <div class="full" v-if="infomation != ''">
            <van-swipe class="my-swipe" :autoplay="0" indicator-color="white">
              <van-swipe-item style="width:100%;height: 800px" >
                <img
                  style="width: 100%;height: 100%"
                  :src="infomation[checked].imageUrl"
                  alt
                />
              </van-swipe-item>
            </van-swipe>
            <!-- </div> -->
            <div style="overflow-x: scroll;width: 100%">
              <ul
                style="display: flex;justify-content: space-around;margin-top: 5px;width: 120%;height: 60px"
              >
                <li v-for="(item,key) in infomation" :key="key" @click="choose(index,$event)">
                  <img style="width: 50px;height: 50px" :src="item.imageUrl" alt />
                </li>
              </ul>
            </div>
            <div style="display: flex;justify-content:space-around;margin-top: 10px">
              <van-button
                type="default"
                style="width: 150px;height: 40px;border-radius: 10px;border: 1px solid #000;background-color: #fff;text-align: center;letter-spacing: 10px;"
              >分享</van-button>
              <!-- <van-button
                type="default"
                style="width: 150px;height: 40px;border-radius: 10px;border: 1px solid #000;background-color: orange;letter-spacing: 10px;"
              >下载</van-button> -->
              <van-button
                type="default"
                style="width: 150px;height: 40px;border-radius: 10px;border: 1px solid #000;background-color: orange;letter-spacing: 10px;"
              >查看</van-button>
            </div>
      </div>
      <div class="none" v-if="infomation == ''">
        <img src="../../../../assets/images/exhibitor/infomation_none.png" alt="" >
      </div>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/exhibitor";
export default {
  name: "exact_information",
  data() {
    return { 
      enterpriseExhibitorsId: '', //展会id
      infomation: {},
      checked: 0, //当前选中的index
    };
  },

  created() {
    this.enterpriseExhibitorsId = this.$route.query.enterpriseExhibitorsId
    console.log('enterpriseExhibitorsId1111',this.enterpriseExhibitorsId);
    
    this.getCompanyInfomation()
  },
  components: {
    // [Swipe.name]: Swipe,
    // [SwipeItem.name]: SwipeItem,
    // [Button.name]: Button
  },
  methods: {
    // 选择图片
    choose (index) {
      this.checked = index
    },
    // 获取信息
    getCompanyInfomation () {
      Api.getInfomation(this.enterpriseExhibitorsId)
      .then( res => {
        console.log('索取资料成功',res);
        const {code, msg, data, total} = res
        if (code == 200) {
          this.infomation = data;
        }
        
      })
      .catch( err => {
        console.log('索取资料失败',err);
        
      })
    }
    
  }
};
</script>

<style lang='scss' scoped>
.my-swipe {
  .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
}
.none {
  width: 100%;
  margin-top: 2rem;
  img {
    width: 100%;
  }
}
</style>
