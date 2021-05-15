<template>
  <view class="u-card-wrap">
    <u-card
      @click="cardClick"
      :index="poemId"
      :title="title"
      :sub-title="author"
      margin="50rpx"
      padding="30"
      border="false"
      border-radius="20"
    >
      <view class="" slot="body">
        <view class="u-body-content">
          <p v-for="item in content" :key="item.index">
            {{ item }}
          </p>
        </view>
      </view>
      <view class="" slot="foot">
        <u-icon
          class="card-foot-icon"
          color="orange"
          :name="[star ? 'star-fill' : 'star']"
          size="34"
          :label="{ starNum } + '人收藏'"
          @click="starClick"
        ></u-icon>
      </view>
    </u-card>
  </view>
</template>

<script>
export default {
  props: {
    poemId: String,
    title: String,
    author: String,
    star: Boolean,
    starNum: Number,
    content: Array,
  },
  data() {
    return {
      star: true,
      starNum: 100,
    };
  },
  methods: {
    cardClick(index) {
      console.log(index);
    },
    starClick(_) {
      this.star ? this.starNum-- : this.starNum++;
      this.star = !this.star;
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
