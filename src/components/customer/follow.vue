// 关注/取消关注组件
// 名片组件 调用实例 <follow :dataList.sync="dataList" :disabled="true" @successCBK="handleActive" />  回调函数返回当前索引

<template>
  <div class="follow">
    <div class="cardWrap">
      
      <div v-show="disabled" class="btnWrap">
        <van-button
          v-show="isShow"
          round
          type="default"
          plain
          :disabled="!list.length"
          hairline
          color="#F8D57E"
          size="small"
          @click="isShow = !isShow"
        >切换英文版名片</van-button>
        <van-button
          v-show="!isShow"
          round
          :disabled="!list.length"
          type="default"
          plain
          hairline
          color="#F8D57E"
          size="small"
          @click="isShow = !isShow"
        >切换中文版名片</van-button>
        <van-button
          round
          :disabled="!list.length"
          color="#F8D57E"
          size="small"
          @click="handleEdit"
        >编 辑</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { axios } from '@/utils';
// 关注/取消关注企业（人物）  /c/user-follow/follow/{followStatus}
// export const setIsFollow = params => axios.post('/c/user-follow/follow', params);

export default {
  // disabled 是否显切换 编辑按钮
  props: ["dataList", "disabled"],

  data() {
    return {
      // 当前索引
      current: 0,
      list: [],
      // 当前名片ID
      activeId: "",
      isShow: true
    };
  },
  components: {},

  watch: {},
  created() {
    this.init();
  },
  methods: {
    
    init() {
      this.list = this.dataList;
      if (this.list.length) {
        // 更新父组件成功函数 function 类型
        this.$emit("successCBK", this.current);
        // 初始化编辑id
        this.activeId = this.list[0].id;
      }
    },
    onChange(index) {
      this.current = index;
      this.activeId = this.list[index].id;
      // 更新父组件成功函数 function 类型
      this.$emit("successCBK", this.current);
    },

    // 编辑
    handleEdit() {
      console.log(this.activeId);
      this.$router.push({
        name: "personal_editCard",
        query: {
          // 名片ID
          id: this.activeId
        }
      });
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
  
}
</style>