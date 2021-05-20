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
      :index="poem.id"
      :title="poem.title"
      :sub-title="poem.author"
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
      <view class="" slot="foot" >
        <u-icon
          class="card-foot-icon"
          color="orange"
          :name="[star ? 'star-fill' : 'star']"
          size="34"
          :label="`${starNum}人收藏`"
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
  /**
   * Object: {
   *  id: String,
   *  title: String,
   *  author: String,
   *  star: Boolean,
   *  starNum: Number,
   *  content: Array
   * }
   */
  props: {
    poem: Object,
    thumb: {
      type: Boolean,
      default: true,
    }, // 若为false，则显示诗的所有字
  },
  data() {
    return {
      star: false,
      starNum: 0,
    };
  },
  watch: {
	poem:{
		immediate:true,
		handler:function(val){
			this.star = val.star;
			this.starNum = val.starNum;
		}
	}
  },
  computed: {
    normalizedContent() {
      if (!this.poem) {
        return [];
      }
      if (!this.thumb) {
        return this.poem.content;
      }
      let firstItem = this.poem.content[0];
      let len = firstItem.length;
      if (len <= 12) {
        return this.poem.content;
      }
      let result = [];
      this.poem.content.forEach((sentence) => {
        result.push(sentence.slice(0, 12) + "...");
      });
      return result;
    },
  },
  methods: {
    cardClick(_) {
      this.$emit("routerChange", this.poem.id);
    },
    starClick(_) {
      this.star ? this.starNum-- : this.starNum++;
      this.star = !this.star;
      const poemId = this.poem.id;
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
