<template>
  <div class="person">
    <div class="header">
      <img src="../../../../assets/images/logo1.jpg" alt />
      <div class="name">风风火火汽车电子公司</div>
      <div class="date">企业成立日期：2000.03.01</div>
      <div class="huiyuan">
        <van-icon class="icon iconfont yz-huiyuan" />
        <span>会员</span>
      </div>
    </div>
    <div class="ItemContainer" v-for="(item,index) in listItem" :key="index">
      <img src="item.src" alt />
      <div class="center">
        <div>{{item.name}}</div>
        <div>{{item.type}}</div>
      </div>
      <button class="right">预约面试</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "person",
  data() {
    return {
      listItem: [
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "李美美",
          type: "法人"
        },
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "李美美",
          type: "法人"
        },
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "李美美",
          type: "法人"
        },
        {
          src: "../../../../assets/images/logo1.jpg",
          name: "李美美",
          type: "法人"
        },
      ]
    };
  }
};
</script>
<style lang='scss' scoped>
* {
  margin: 0;
  padding: 0;
}
.person {
  background-color: #fff;
  .header {
    width: 7.5rem;
    margin: 0.4rem auto;
    text-align: center;
    img {
      height: 1.6rem;
      width: 1.6rem;
      margin: 0 auto;
    }
    .name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 0.05rem;
    }
    .date {
      text-align: center;
      color: #ccc;
      font-size: 14px;
    }
    .huiyuan {
      .icon {
        display: inline;
        color: rgba(229, 204, 157, 1);
        margin-left: 0.26rem;
        margin-right: 0.14rem;
      }
      span {
        color: #ccc;
      }
    }
  }
}

.ItemContainer {
  width: 6.96rem;
  height: 1.76rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0rem 0.1rem 0.26rem 0rem rgba(223, 227, 233, 0.51);
  border-radius: 0.16rem;
  margin-left: 0.28rem;
  position: relative;
  margin-bottom: 0.4rem;
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    position: absolute;
    left: 0.26rem;
    top: 0.06rem;
  }
  .center{
      position: absolute;
      top: 0.38rem;
      left: 2.06rem;
  }
  .right {
    width: 1.68rem;
    height: 0.6rem;
    background: rgba(248, 213, 126, 1);
    border-radius: 0.29rem;
    border: none;
    position: absolute;
    right: 0.4rem;
    bottom: 0.54rem;
  }
}
</style>