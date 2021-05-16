<!--
 * @FileDescription: 诗词展示卡片组件
 * @Author: 张祥玙
 * @Date: 2021.5.15 13:14
 * @LastEditors: 张祥玙
 * @LastEditTime: 2021.5.16 10:41
 -->
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
/**
 * @event routerChange: 定义卡片的点击事件，一般是跳转到指定页面
 */
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
    cardClick(_) {
      this.$emit("routerChange");
    },
    starClick(_) {
      this.isStar ? this.nowStarNum-- : this.nowStarNum++;
      this.isStar = !this.isStar;
      const poemId = this.poemId;
      console.log("id:", poemId);
      // 上传到服务器
      wx.cloud.callFunction({
        // 云函数名称
        name: "starPoem",
        // 传给云函数的参数
        data: {
          poemid: poemId,
        },
        success: function (res) {
          // res = {
          //   code: 0, // 请求成功为0，反之则为负数
          //   err: null, // 若请求有误则返回错误的字符串，反之则为null
          //   data: 10, // 整形，点赞后的点赞数，若poemid有误，则返回-1
          // };
          console.log("res:", res);
        },
        fail: console.error,
      });
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
