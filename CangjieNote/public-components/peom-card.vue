<template>
  <view class="u-card-wrap">
    <u-card
      @body-click="cardClick"
      @head-click="cardClick"
      :index="poemid"
      :title="title"
      :sub-title="author"
      margin="50rpx"
      padding="30"
      border="false"
      border-radius="20"
    >
      <view class="" slot="body">
        <view class="u-body-content">
          <p v-for="item in normalizedContent" :key="item.index">
            {{ item }}
          </p>
        </view>
      </view>
      <view class="" slot="foot">
        <u-icon
          class="card-foot-icon"
          color="orange"
          :name="[isStar ? 'star-fill' : 'star']"
          size="34"
          :label="`${nowStarNum}人收藏`"
          @click="starClick"
        ></u-icon>
      </view>
    </u-card>
  </view>
</template>

<script>
export default {
  props: {
    peomId: String,
    title: String,
    author: String,
    star: Boolean,
    starNum: Number,
    content: Array,
  },
  data() {
    return {
      isStar: this.star,
      nowStarNum: this.starNum,
    };
  },
  computed: {
    normalizedContent() {
      let firstItem = this.content[0];
      let len = firstItem.length;
      if (len <= 14) {
        return this.content;
      }
      let result = [];
      let mid;
      try {
        mid = len / 2;
        
        if (parseInt(mid) !== mid) {
          console.log(this.content);
          console.log("len:", len);
          console.log("mid:", mid);
          throw "mid不是整数";
        }
      } catch (error) {
        console.log(error);
        return null;
      }
      for (let i = 0; i < len; i++) {
        let str = this.content[i];
        result.push(str.slice(0, mid));
        result.push(str.slice(mid));
        if (result.length === 2) break;
      }
      result.push("...");
      return result;
    },
  },
  methods: {
    cardClick(index) {
      console.log(index);
      // this.$u.route({
      //   url: '/pages/detail/detal',
      //   animationType: 'slide-in-bottom'
      // })
      uni.navigateTo({
        url: '../../pages/detail/detail'
      })
      // 进入详情页
    },
    starClick(_) {
      
      this.isStar ? this.nowStarNum-- : this.nowStarNum++;
      this.isStar = !this.isStar;
      // 上传到服务器
    },
  },
};
</script>

<style scoped lang="scss">
.u-body-content p {
  font-size: 32rpx;
  color: #333;
  text-align: center;
}

.card-foot-icon {
  float: right;
}
</style>
