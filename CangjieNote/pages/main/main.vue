<template>
  <view class="wrap">
    <view class="search">
      <u-search
        v-model="value"
        @change="change"
        @custom="custom"
        @search="search"
        shape="round"
        :clearabled="clearabled"
        :show-action="showAction"
        :input-align="inputAlign"
        @clear="clear"
      ></u-search>
    </view>
    <view class="">
      <u-cell-group
        title-bg-color="rgb(243, 244, 246)"
        :title="item.groupName"
        v-for="(item, index) in list"
        :key="index"
      >
        <u-cell-item
          class="item"
          title-width="0rpx"
          v-for="(item1, index1) in item.list"
          :key="index1"
          :arrow="false"
        >
          <view class="">
            <poem-card
              :poem-id="item1.id"
              :title="item1.title"
              :author="item1.author"
              :star="item1.star"
              :star-num="item1.starNum"
              :content="item1.content"
              @routerChange="toDetail"
            ></poem-card>
          </view>
          <image
            slot="icon"
            class="u-cell-icon"
            :src="getIcon(item1.icon)"
            mode="widthFix"
          ></image>
        </u-cell-item>
      </u-cell-group>
    </view>
    <view>
      <u-button shape="square" :ripple="true" type="primary" @click="toUser"
        >User</u-button
      >
      <u-button shape="square" type="primary" @click="toDetail"
        >Detail</u-button
      >
    </view>
  </view>
</template>

<script>
import poemCard from "../../public-components/poem-card.vue";
export default {
  components: {
    poemCard,
  },
  data() {
    return {
      title: "课程首页",
      mode: "circle",
      text: "", // 优先级比src高
      size: "90",
      list: [
        {
          groupName: "诗歌列表",
          list: [],
        },
      ],
    };
  },
  onLoad() {
    let that = this;
    wx.cloud.callFunction({
      // 云函数名称
      name: "poemCardView",
      // 传给云函数的参数
      data: {
        size: 100,
      },
      success: function (res) {
        console.log(that.title);
        console.log(res.result.data); // 3
        that.list[0].list = res.result.data;
      },
      fail: console.error,
    });
  },
  computed: {
    getIcon() {
      return (path) => {
        return "https://cdn.uviewui.com/uview/example/" + path + ".png";
      };
    },
  },
  methods: {
    toDetail() {
      this.$u.route({
        url: "/pages/detail/detal",
        animationType: "slide-in-bottom",
      });
    },
    valueChange(index) {
      this.value = index == 0 ? "" : "天山雪莲";
    },
    shapeChange(index) {
      this.shape = index == 0 ? "round" : "square";
    },
    clearabledChange(index) {
      this.clearabled = index == 0 ? true : false;
    },
    showActionChange(index) {
      this.showAction = index == 0 ? true : false;
    },
    inputAlignChange(index) {
      this.inputAlign = index == 0 ? "left" : index == 1 ? "center" : "right";
    },
    change(value) {
      //try tapd
      //try tapd
      // 搜索框内容变化时，会触发此事件，value值为输入框的内容
      //console.log(value);
    },
    custom(value) {
      //console.log(value);
      this.$u.toast("输入值为：" + value);
    },
    search(value) {
      this.$refs.uToast.show({
        title: "搜索内容为：" + value,
        type: "success",
      });
    },
    clear() {
      // console.log(this.value);
    },
    toUser() {
      this.$u.route({
        url: "/pages/user/user",
        animationType: "slide-in-bottom",
      });
    },
    toDetail() {
      this.$u.route({
        url: "/pages/detail/detail",
        animationType: "slide-in-bottom",
      });
    },
  },
};
</script>

<style scoped lang="scss">
.wrap {
  padding: 30rpx;
}

.item {
  padding: 0rpx;
}

.search {
  padding: 20rpx;
}

.u-demo {
  padding-top: 0;
}

.u-card-wrap {
  background-color: $u-bg-color;
  padding: 1px;
}

.u-body-item {
  font-size: 32rpx;
  color: #333;
  padding: 20rpx 10rpx;
}

.u-body-item image {
  width: 120rpx;
  flex: 0 0 120rpx;
  height: 120rpx;
  border-radius: 8rpx;
  margin-left: 12rpx;
}

.u-cell-icon {
  height: 40rpx;
  width: 40rpx;
}

.addclass {
  display: inline-block;
}

.parent {
  display: inline-block;
}
</style>
