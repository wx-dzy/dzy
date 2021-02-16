// 新增/编辑地址
<template>
  <div class="editAddAddress">
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="refreshing" @refresh="handleDetail">
      <!-- 
        删除地址
        :show-delete="!!editId"
        @delete="onDelete"
       -->
      <van-address-edit
        :address-info="info"
        :area-list="areaList"
        show-postal
        show-set-default
        show-search-result
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @change-area="handleChangeArea"
      />
    </van-pull-refresh>
  </div>
</template>

<script>
import { util } from "@/utils";
import { mapGetters } from "vuex";
import * as Api from "@/api/customer/shoppingCart";
import citydata from "@/api/customer/citydata.json";
import citydata1 from "@/api/customer/citydataPc.json";

import footerNav from "@/components/customer/footerNav/index.vue";

export default {
  name: "editAddAddress",
  components: {
    footerNav,
  },
  data() {
    return {
      // 编辑id
      editId: "",
      info: {},
      refreshing: false,
      areaList: {},
      searchResult: [],
    };
  },

  created() {
    this.areaList = citydata;
    if (this.$route.query.addressId) {
      this.editId = this.$route.query.addressId;
      // 默认刷新列表
      this.handleDetail();
      // this.handleJson()
    }
  },
  watch: {},
  methods: {
    handleDetail() {
      Api.getMyEnterpriseAddress()
        .then((res) => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            let obj = data.find((item) => {
              return item.id == this.editId;
            });
            // 数据处理
            obj.name = obj.receiver || ""; // 收货人姓名
            obj.isDefault = !!obj.defAddr || ""; // 是否为默认地址	boolean
            obj.province = obj.provinceName || ""; // 省份
            obj.city = obj.cityName || ""; // 城市
            obj.county = obj.countyName || ""; // 区县
            obj.addressDetail = obj.addr || ""; // 详细地址
            obj.areaCode = `${obj.countyId}` || ""; // 地区编码，通过省市区选择获取（必填
            obj.postalCode = obj.zip || ""; // 邮政编码

            obj.provinceId = obj.provinceId || "";
            obj.cityId = obj.cityId || "";
            obj.countyId = obj.countyId || "";
            // console.log(obj);
            this.info = obj;
            // 上拉刷新
            this.refreshing = false;
          }
        })
        .catch((err) => {
          this.list = [];
          // 上拉刷新
          this.refreshing = false;
        });
    },

    handleChangeArea(val) {
      // console.log(val);
      // console.log(this.info);
      this.info.provinceId = val[0].code;
      this.info.cityId = val[1].code;
      this.info.countyId = val[2].code;
    },

    // 保存
    onSave(e) {
      // console.log(JSON.stringify(e));
      // util.info("save");
      let param = {
        receiver: e.name || "", // 收货人姓名
        defAddr: e.isDefault ? 1 : 0, // 是否默认地址，1是0否
        addr: e.addressDetail || "", // 详细地址，不带省市

        id: e.id || "", // 收货地址主键id，新增时传空，有值时为更新
        provinceId: this.info.provinceId || "", // 省id
        cityId: this.info.cityId || "", // 市id
        countyId: this.info.countyId || "", // 区县id
        tel: e.tel || "", // 收货人联系方式
        zip: e.postalCode || "", // 邮编
      };
      // debugger;
      Api.saveOrUpdateAddress(param)
        .then((res) => {
          let { code, msg, data, total } = res;
          if (code == 200) {
            util.success(msg);
            setTimeout(() => {
              this.$router.push({
                name: "addressPage",
                query: {
                  // 当前地址id
                  addressId: data.id,
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

    // onDelete() {
    //   util.info(`delete`);
    // },

    // pc地址json转换成vant地址json
    handleJson() {
      let _data = citydata1;
      let tag = {
        // 省
        province_list: {
          // "110000": "北京市",
        },
        // 市
        city_list: {},
        // 县
        county_list: {},
      };
      _data.forEach((AAA) => {
        tag.province_list[AAA.value] = AAA.label;
        if (AAA.children && AAA.children.length) {
          AAA.children.forEach((BBB) => {
            tag.city_list[BBB.value] = BBB.label;
            if (BBB.children && BBB.children.length) {
              BBB.children.forEach((CCC) => {
                tag.county_list[CCC.value] = CCC.label;
              });
            }
          });
        }
      });
      // console.log(JSON.stringify(tag));
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
.editAddAddress {
}
</style>
<style lang="scss" scoped>
@import "@/assets/styles/base/calc_vm.scss";
.editAddAddress {
}
</style>

