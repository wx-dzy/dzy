// 地址选择-列表页
<template>
  <div class="addressPage">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="handleDetail">
      <div v-if="list.length">
        <van-address-list
          v-model="chosenAddressId"
          :list="list"
          default-tag-text="默认"
          @add="updataAddress"
          add-button-text="设置为收货地址"
          @edit="onEdit"
        >
          <template #top>
            <van-button
              icon="plus"
              plain
              hairline
              block
              size="small"
              @click="onAdd"
              type="info"
              >新增收货地址</van-button
            >
          </template>
        </van-address-list>
      </div>
      <!-- 占位图 -->
      <img
        v-else
        src="@/assets/images/nullImgText.png"
        style="width: 2.6rem; margin: 1.4rem 2rem"
        class="nullImg"
        alt
      />
    </van-pull-refresh>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/shoppingCart";
import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "addressPage",
  components: {
    footerNav,
  },
  data() {
    return {
      refreshing: false,
      chosenAddressId: "",
      list: [
        // {
        //   id: "1",
        //   name: "张三",
        //   tel: "13000000000",
        //   address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
        //   isDefault: true,
        // },
      ],
      // disabledList: [
      //   {
      //     id: "3",
      //     name: "王五",
      //     tel: "1320000000",
      //     address: "浙江省杭州市滨江区江南大道 15 号",
      //   },
      // ],
    };
  },

  created() {
    // this.chosenAddressId = this.$route.query.addressId;
    // 默认刷新列表
    this.handleDetail();
  },
  watch: {},
  methods: {
    handleDetail() {
      Api.getMyEnterpriseAddress()
        .then((res) => {
          this.chosenAddressId = this.$route.query.addressId;
          let { code, msg, data, total } = res;
          if (code == 200) {
            // 数据处理
            data.forEach((ele) => {
              ele.name = ele.receiver;
              // ele.id = ele.id;
              // ele.tel = ele.tel;
              ele.address = ele.addrDetail;
              ele.isDefault = !!ele.defAddr;
            });
            this.list = data;
            // // 上拉刷新
            this.refreshing = false;
          }
        })
        .catch((err) => {
          this.list = [];
          // 上拉刷新
          this.refreshing = false;
        });
    },
    // 新增地址
    onAdd() {
      // util.info(`新增地址${this.chosenAddressId}`);
      this.$router.push({
        name: "editAddAddress",
        // query: {
        // 当前地址id
        // addressId: this.chosenAddressId,
        // },
      });
    },

    // 编辑地址
    onEdit(item, index) {
      // util.success(`编辑地址${item.id}`);
      this.$router.push({
        name: "editAddAddress",
        query: {
          // 当前地址id
          addressId: item.id,
        },
      });
    },

    // 更新收货地址为使用中
    updataAddress() {
      let param = {
        // 收货地址主键id
        id: this.chosenAddressId,
        // 是否使用，1使用，0未使用
        inUse: 1,
      };
      Api.updateAddressActive(param)
        .then((res) => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            util.success(msg);
            setTimeout(() => {
              this.$router.push({
                name: "shoppingCart",
                query: {
                  // 当前地址id
                  addressId: this.chosenAddressId,
                },
              });
            }, 1000);
          }
        })
        .catch((err) => {
          this.list = [];
          // 上拉刷新
          this.refreshing = false;
        });
    },
  },

  computed: {},

  mounted() {
    this.$nextTick().then(() => {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    });
  },
};
</script>

<style lang="scss">
.addressPage {
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
.addressPage {
}
</style>

