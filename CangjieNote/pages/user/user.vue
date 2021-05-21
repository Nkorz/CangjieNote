<template>
  <view>
    <user-info @showCollections="isShow"></user-info>
    <u-line></u-line>
    <!-- 数据列表 -->
    <view v-for="(item,index) in userCollections" :key="index">
      <user-poem-card :poem="item" :thumb="true" @routerChange="toDetail"></user-poem-card>
    </view>
    <view class="menu" :class="{active:menuFlag}">
      <image src="../../static/navi.svg" class="menuTrigger" @tap="clickMenu"></image>
      <image src="../../static/home.svg" class="menuItem menuItem1" @tap="toHome"></image>
      <image src="../../static/user.svg" class="menuItem menuItem3" @tap="toUser"></image>
    </view>
  </view>
</template>

<script>
  import userInfo from "../../public-components/user-info.vue"
  import userPoemCard from "../../public-components/user-poem-card"
  export default {
    data() {
      return {
        mask: false,
        menuFlag: false,
        isShowCard: false,
        userCollections: []
      }
    },
    components: {
      userInfo,
      userPoemCard
    },
    onShow() {
      let that = this;
      let tmp = {};
      // 获取当前用户收藏的诗词信息
      wx.cloud.callFunction({
        name: 'getCollection',
        success: res => {
          console.log(res);
          let collections = res.result.data;
          // this.userCollections = res.result.data;
          collections.forEach(function(item, index) {
            tmp = {
              id: item._id,
              title: item.title,
              author: item.flag,
              star: true,
              starNum: item.stars,
              content: item.content
            }
            that.userCollections.push(tmp);
          })
          console.log(this.userCollections);
        }
      })
    },
    methods: {
      clickMenu() {
        this.menuFlag = !this.menuFlag;
      },
      toUser() {
        uni.reLaunch({
          url: "/pages/user/user",
        })
      },
      toHome() {
        uni.reLaunch({
          url: "/pages/main/main",
        });
      },
      isShow(data) {
        this.isShowCard = true;
      },
      toDetail(id) {
        this.$u.route({
          url: "/pages/detail/detail",
          animationType: "slide-in-bottom",
          params: {
            id: id
          },
        });
      },
    }

  }
</script>

<style>
  .menu {
    position: fixed;
    width: 110rpx;
    height: 110rpx;
    bottom: 120rpx;
    right: 44rpx;
    border-radius: 50%;
  }

  .menuTrigger {
    position: absolute;
    top: 0;
    left: 0;
    width: 80rpx;
    height: 80rpx;
    background-color: rgba(102, 175, 123, 0.2);
    border-radius: 50%;
    padding: 20rpx;
    cursor: pointer;
    transition: .35s ease;
  }

  .menuItem {
    position: absolute;
    width: 60rpx;
    height: 60rpx;
    top: 10rpx;
    left: 10rpx;
    padding: 20rpx;
    border-radius: 50%;
    background-color: rgba(133, 162, 175, 0.2);
    border: none;
    box-shadow: 0 0 5rpx 1rpx rgba(0, 0, 0, .05);
    z-index: -1000;
    opacity: 0;
  }

  .menuItem1 {
    transition: .35s ease;
  }

  .menuItem2 {
    transition: .35s ease .1s;
  }

  .menuItem3 {
    transition: .35s ease .2s;
  }

  .menu.active .menuTrigger {
    transform: rotateZ(225deg);
    background-color: rgba(102, 175, 123, 0.3);
  }

  .menu.active .menuItem1 {
    top: -106rpx;
    left: -120rpx;
    opacity: 1;
  }

  .menu.active .menuItem2 {
    top: 10rpx;
    left: -164rpx;
    opacity: 1;
  }

  .menu.active .menuItem3 {
    top: 126rpx;
    left: -120rpx;
    opacity: 1;
  }
</style>
