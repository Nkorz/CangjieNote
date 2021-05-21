<template>
  <view class="content">
    <view class="search">
      <u-search v-model="value" @change="change" @custom="custom" @search="search" shape="round" :clearabled="clearabled"
        :show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
    </view>
    <load-refresh ref="loadRefresh" :isRefresh="true" :currentPage="currentPage" :totalPages="totalPages" @loadMore="loadMore"
      @refresh="refresh">
      <view slot="content-list">
        <!-- 数据列表 -->
        <view v-for="(item,index) in list" :key="index">
          <poem-card :poem="item" @routerChange="toDetail"></poem-card>
        </view>
      </view>
    </load-refresh>
    <!-- <drag-button :isDock="true" :existTabBar="true" @btnClick="btnClick" @btnTouchstart="btnTouchstart" @btnTouchend="btnTouchend" /> -->
    <view class="menu" :class="{active:menuFlag}">
      <image src="../../static/navi.svg" class="menuTrigger" @tap="clickMenu"></image>
      <image src="../../static/home.svg" class="menuItem menuItem1" @tap="toHome"></image>
      <image src="../../static/user.svg" class="menuItem menuItem3" @tap="toUser"></image>
    </view>
  </view>
</template>

<script>
  import dragButton from "../../public-components/drag-button.vue";
  import poemCard from "../../public-components/poem-card.vue";
  import loadRefresh from '@/components/load-refresh/load-refresh.vue'
  const app = getApp();
  export default {
    components: {
      dragButton,
      poemCard,
      loadRefresh
    },
    data() {
      return {
        mask: false,
        menuFlag: false,
        value: '',
        list: [

        ], // 数据集
        currentPage: 1, // 当前页码
        totalPages: 2 // 总页数
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
          // console.log(res.result.data); // 3
          that.list = res.result.data;
        },
        fail: console.error,
      });
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
        // 搜索框内容变化时，会触发此事件，value值为输入框的内容
        //console.log(value);
      },
      custom(value) {
        //console.log(value);
        this.$u.toast("输入值为：" + value);
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
              that.list = res.result.data.list
              that.$refs.loadRefresh.completed()
              // console.log(res.result.data); // 3

            },
            fail: console.error,
          });

        }

        // this.$refs.uToast.show({
        //   title: "搜索内容为：" + value,
        //   type: "success",
        // });
      },
      clear() {
        // console.log(this.value);
      },
      btnClick() {
        this.$u.route({
          url: "/pages/user/user",
          animationType: "slide-in-bottom",
        });
        console.log('btnClick');
      },
      btnTouchstart() {
        console.log('btnTouchstart');
      },
      btnTouchend() {
        console.log('btnTouchend');
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

      // 上划加载更多
      loadMore() {
        console.log('上滑')
        let goUpFreshList = []
        wx.cloud.callFunction({
          // 云函数名称
          name: "poemCardView",
          // 传给云函数的参数
          data: {
            size: 10,
          },
          success: function(res) {
            // console.log(res.result)
            // console.log(res.result.data); // 3
            goUpFreshList = res.result.data;
            console.log('goUpFreshList')
            console.log(goUpFreshList)
          },
          fail: console.error,
        });
        // 模拟请求成功后的回调
        setTimeout(() => {
          console.log('tim上滑')
          this.list = this.list.concat(goUpFreshList)
          this.$refs.loadRefresh.completed()
          // 1. list数组添加新数据
          // 2. 更新当前页码 currentPage
          // 3. 调用completed()方法 this.$refs.loadRefresh.completed()
        }, 800)
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
            size: 10,
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
      // 后期可将loadMore()与refresh()合并成一个函数方法去处理，因为本质上这两个方法只有在list赋值上面有不同
      // 代码触发下拉刷新方法
      runRefresh() {
        this.$refs.loadRefresh.runRefresh()
      }
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
    padding: 30rpx;
  }

  .content {
    width: 100%;
    height: 100%;
  }
</style>
