<template>
  <view  id='card'>
    <view class="search">
      <u-search v-model="value" @change="change" @custom="custom" @search="search" shape="round" :clearabled="clearabled"
        :show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
    </view>
    <view class="menu" :class="{active:menuFlag}">
      <image src="../../static/navi.svg" class="menuTrigger" @tap="clickMenu"></image>
      <image src="../../static/home.svg" class="menuItem menuItem1" @tap="toHome"></image>
      <image src="../../static/user.svg" class="menuItem menuItem3" @tap="toUser"></image>
    </view>
    <HCard :cardDatas='data' v-if='isrefresh' @routerChange="addData">
    </HCard>
    
  </view>
</template>

<script>
  const app = getApp();
  import HCard from "@/components/hg-cards/hg-cards.vue";
  export default {
    components: {
      HCard,
    },
    data() {
      return {
        mask: false,
        menuFlag: false,
        value: '',
        isrefresh:true,
        data: [{
            name: '',
            color: '#aaff00'
          },
          {
            name: '',
            color: '#23ffde'
          },
          {
            name: '',
            color: '#78beff'
          },
          {
            name: '',
            color: '#d87dff'
          },
          {
            name: '',
            color: '#ffc39b'
          },
          {
            name: '',
            color: '#ffcef7'
          },
          {
            name: '',
            color: '#eaff9d'
          },
          {
            name: '',
            color: '#8c92ff'
          },
          {
            name: '',
            color: '#8c92ff'
          },
          {
            name: '',
            color: '#8c92ff'
          },
        ]
      }
    },
    onLoad() {
      wx.cloud.callFunction({
        name: 'login',
        success: res => {
          if (res) {
            app.globalData.openid = res.result.openid;
          }
        }
      });
    },
    onShow() {
      let that = this;
      wx.cloud.callFunction({
        // 云函数名称
        name: "poemCardView",
        // 传给云函数的参数
        data: {
          size: 10,
        },
        success: function(res) {
          // console.log(res.result)
          console.log(res.result.data); // 3
          that.data = res.result.data;
        },
        fail: console.error,
      });
      this.$forceUpdate();
    },
    methods: {
      clickMenu(){
      	this.menuFlag = !this.menuFlag;
      },
      toUser(){
        uni.reLaunch({
          url: "/pages/user/user",
        })
      },
      toHome(){
      	uni.reLaunch({
      	  url: "/pages/main/main",
      	});
      },
      search(value) {
        console.log(value)
        let that = this;
        if (value === '') {
          console.log('空')
        } else {
          wx.cloud.callFunction({
            // 云函数名称
            name: "search",
            // 传给云函数的参数
            data: {
              key: value,
              size: 5,
            },
            success: function(res) {
              console.log(value)
              console.log(res.result.data.list)
              that.data = res.result.data.list
              // that.$refs.loadRefresh.completed()
              // console.log(res.result.data); // 3
      
            },
            fail: console.error,
          });
      
        }
      },
      completed(){
        console.log('wc')
      },
      addData(){
        let that = this;
        wx.cloud.callFunction({
          // 云函数名称
          name: "poemCardView",
          // 传给云函数的参数
          data: {
            size: 10,
          },
          success: function(res) {
            // console.log(res.result)
            console.log(res.result.data); // 3
            that.data = that.data.concat(res.result.data)
          },
          fail: console.error,
        });
      },
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
      // 下拉刷新数据列表
      refresh() {
        console.log('下拉')
        let goDownFreshList = []
        wx.cloud.callFunction({
          // 云函数名称
          name: "poemCardView",
          // 传给云函数的参数
          data: {
            size: 100,
          },
          success: function(res) {
            // console.log(res.result)
            // console.log(res.result.data); // 3
            goDownFreshList = res.result.data;
            console.log('goDownFreshList')
            console.log(goDownFreshList)
          },
          fail: console.error,
        });
        // 模拟请求成功后的回调
        setTimeout(() => {
          console.log('tim下拉')
          this.list = goDownFreshList
          this.$refs.loadRefresh.completed()
          // 1. list重新赋值，应避免 this.list = [] 这种操作
          // 2. 更新当前页码 currentPage
          // 3. 调用completed()方法 this.$refs.loadRefresh.completed()
        }, 800)
      },

    }
  }
</script>

<style lang="scss">
  .menu {
    position: fixed;
    z-index: 999999;
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
    background-color:rgba(102, 175, 123, 0.2);
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
  
  .search {
    margin-left: 30rpx;
    margin-right: 30rpx;
  }
  
</style>
