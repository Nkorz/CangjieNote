<!--
 * @FileDescription: 诗词展示卡片组件
 * @Author: 张祥玙
 * @Date: 2021.5.15 13:14
 * @LastEditors: 靳鑫
 * @LastEditTime: 2021.5.26 21:16
 -->
<template>
  <view class="u-card-wrap">
    <u-card class="card" @body-click="cardClick" @head-click="cardClick" :index="poem.id" :title="poem.title"
      :sub-title="poem.author" margin="40rpx" padding="30" :border="false" border-radius="20">
      <view class="" slot="body">
        <view class="u-body-content">
          <p v-for="item in normalizedContent" :key="item.index">
            {{ item }}
          </p>
        </view>
      </view>
      <view class="" slot="foot">
        <u-icon class="card-foot-icon" color="orange" :name="[star ? 'star-fill' : 'star']" size="34" :label="`${starNum}人收藏`"
          @click="starClick"></u-icon>
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
    mounted() {
      const url =
        'https://636c-cloud0-backend-7gnbnkiz459f6b99-1305918868.tcb.qcloud.la/%E5%8D%8E%E6%96%87%E6%A5%B7%E4%BD%93.ttf?sign=88ed0bcf734258193636a95983753717&t=1621774028'
      uni.loadFontFace({
        family: 'font-test',
        source: `url("${url}")`
      })
    },
    watch: {
      poem(val) {
        this.star = val.star;
        this.starNum = val.starNum;
      },
    },
    computed: {
      normalizedContent() {
        if (!this.poem) {
          return [];
        }
        if (!this.thumb) {
          return this.normalizedUnthumbedContent(this.poem.content);
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
        // console.log(this.poem.content)
        let len = this.poem.content.length
        let ran = parseInt(len * Math.random())
        let poemStr = this.poem.content[ran]
        this.$u.route({
          url: "/pages/game/game",
          animationType: "slide-in-bottom",
          params: {
            str: poemStr
          },
        });
        // this.$emit("routerChange", this.poem.id);
      },
      _isSign(char) {
        return char == "。" ||
          char == "，" ||
          char == "," ||
          char == "！" ||
          char == "？";
      },
      _splitSign(_sentences, sign) {
        var res = [];
        for (var i = 0; i < _sentences.length; ++i) {
          var sentence = _sentences[i];
          var sentences = sentence.split(sign);
          for (var j = 0; j < sentences.length;) {
            if (sentences[j] === "") {
              sentences.splice(j, 1);
            } else {
              if (!this._isSign(sentences[j][sentences[j].length - 1])) {
                sentences[j] = sentences[j] + sign;
              }
              ++j;
            }
          }
          res = res.concat(sentences);
        }
        return res;
      },
      splitFullStop(sentence) {
        var sentences = this._splitSign([sentence], "？");
        sentences = this._splitSign(sentences, "！");
        sentences = this._splitSign(sentences, "。");
        return sentences;
      },
      splitComma(sentence) {
        var sentences = this._splitSign([sentence], "，");
        sentences = this._splitSign(sentences, ",");
        return sentences;
      },
      normalizedUnthumbedContent(content) {
        const max_length = 17;
        console.log(content);
        var res = [];
        for (var i = 0; i < content.length; ++i) {
          if (content[i].length > max_length) {
            var temp = this.splitFullStop(content[i]);
            var temp_res = [];
            for (var j = 0; j < temp.length; ++j) {
              if (temp[j].length > max_length) {
                temp_res = temp_res.concat(this.splitComma(temp[j]));
              } else {
                temp_res.push(temp[j]);
              }
            }
            res = res.concat(temp_res);
          } else {
            res.push(content[i]);
          }
        }
        return res;
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
          success: function(res) {
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
  .u-card-wrap {
    background-color: white;
    margin: 40rpx;
    border-radius: 10rpx;
    box-shadow: 0rpx 0rpx 30rpx rgba(125, 125, 125, 0.4);
  }

  .u-body-content p {
    font-size: 32rpx;
    color: #333;
    text-align: center;
    font-family: font-test;
  }

  .card-foot-icon {
    float: right;
  }
</style>
